#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, extname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const skillRoot = resolve(scriptDir, "..");

function parseArgs(argv) {
  const result = { htmlOnly: false };
  const valueArgs = new Map([
    ["--spec", "spec"],
    ["--out", "out"],
    ["--html-out", "htmlOut"],
    ["--out-dir", "outDir"],
    ["--locale", "locale"],
    ["--format", "format"],
  ]);

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--html-only") {
      result.htmlOnly = true;
      continue;
    }
    if (!valueArgs.has(arg)) throw new Error(`Unknown argument: ${arg}`);
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`Missing value for ${arg}`);
    result[valueArgs.get(arg)] = value;
    index += 1;
  }
  return result;
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function deepMerge(base, override) {
  if (!isPlainObject(base) || !isPlainObject(override)) return override;
  const result = { ...base };
  for (const [key, value] of Object.entries(override)) {
    result[key] = isPlainObject(value) && isPlainObject(result[key])
      ? deepMerge(result[key], value)
      : value;
  }
  return result;
}

function validateMerchandiseBoundary(rootSpec, variants) {
  const subject = rootSpec.subject;
  if (!isPlainObject(variants) && !isPlainObject(subject)) return;
  if (!isPlainObject(subject)) {
    throw new Error(
      'Paired specs require subject.kind="inanimate-object", subject.name, and subject.livingPresence',
    );
  }
  if (subject.kind !== "inanimate-object") {
    throw new Error(
      "Merchandise must be an inanimate object. No person, animal, or other living thing may be the product; people and animals may appear only as supporting models.",
    );
  }
  if (typeof subject.name !== "string" || !subject.name.trim()) {
    throw new Error("Paired specs require a plain inanimate object name in subject.name");
  }
  if (!["none", "supporting-model"].includes(subject.livingPresence)) {
    throw new Error('subject.livingPresence must be "none" or "supporting-model"');
  }
}

function clampNumber(value, fallback, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, number));
}

function safeHex(value, fallback) {
  return typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value) ? value : fallback;
}

function safeFilePart(value, fallback) {
  const cleaned = String(value ?? "")
    .trim()
    .replace(/[^a-z0-9._-]+/gi, "-")
    .replace(/^-+|-+$/g, "");
  return cleaned || fallback;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function paragraphsHtml(lines) {
  return lines.map((line) => `<p>${escapeHtml(line)}</p>`).join("");
}

function dataUrlForImage(imagePath) {
  const extension = extname(imagePath).toLowerCase();
  const mime = {
    ".avif": "image/avif",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
  }[extension];
  if (!mime) throw new Error(`Unsupported image extension: ${extension}`);
  return `data:${mime};base64,${readFileSync(imagePath).toString("base64")}`;
}

function findBrowser() {
  const candidates = [
    process.env.POSTER_BROWSER_BIN,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate;
  }

  for (const command of ["google-chrome", "chromium", "chromium-browser", "microsoft-edge"]) {
    const lookup = spawnSync("which", [command], { encoding: "utf8" });
    if (lookup.status === 0 && lookup.stdout.trim()) return lookup.stdout.trim();
  }
  return null;
}

function renderTemplate(template, values) {
  return template.replace(/\{\{([A-Z0-9_]+)\}\}/g, (match, key) => {
    if (!(key in values)) throw new Error(`Template value not provided: ${key}`);
    return values[key];
  });
}

function localeDefaults(locale) {
  if (locale.toLowerCase().startsWith("zh")) {
    return {
      projectMark: "别让他们的设计师知道",
      category: "物件",
      manifesto: "一个普通物件\n被永久保留。",
      safetyDisclaimer: "AI 生成戏仿 · 非真实商品 · 仅供娱乐",
      projectDisclaimer: "独立概念设计，与任何时装品牌无关。",
      cta: "加入购物袋",
      unspecified: "未指定",
      labels: { price: "价格", color: "颜色", material: "材质", care: "养护" },
    };
  }
  return {
    projectMark: "DON'T LET THEIR DESIGNER KNOW",
    category: "OBJECT",
    manifesto: "AN ORDINARY OBJECT\nMADE PERMANENT.",
    safetyDisclaimer: "AI-GENERATED PARODY · NOT A REAL PRODUCT · FOR ENTERTAINMENT ONLY",
    projectDisclaimer: "Independent speculative design. Not affiliated with any fashion house.",
    cta: "ADD TO BAG",
    unspecified: "UNSPECIFIED",
    labels: { price: "PRICE", color: "COLOR", material: "MATERIAL", care: "CARE" },
  };
}

function templateValues(spec, locale, specDir, format) {
  if (!spec.product?.name || !spec.product?.price) {
    throw new Error(`Variant ${locale} requires product.name and product.price`);
  }

  const imagePath = resolve(specDir, spec.image?.src ?? "");
  if (!existsSync(imagePath)) throw new Error(`Product image not found: ${imagePath}`);

  const defaultCanvas = {
    landscape: { width: 1920, height: 1080 },
    portrait: { width: 1080, height: 1350 },
    story: { width: 1080, height: 1920 },
  }[format] ?? { width: 1920, height: 1080 };
  const width = clampNumber(spec.canvas?.width, defaultCanvas.width, 800, 4096);
  const height = clampNumber(spec.canvas?.height, defaultCanvas.height, 600, 4096);
  const defaults = localeDefaults(locale);
  const labels = { ...defaults.labels, ...(spec.labels ?? {}) };
  const theme = spec.theme ?? {};
  const copy = spec.copy ?? {};
  const portraitBlockSide = spec.layout?.portraitBlockSide === "right" ? "right" : "left";
  const portraitBlockInset = clampNumber(spec.layout?.portraitBlockInset, 42, 24, 96);
  const portraitBlockWidth = clampNumber(spec.layout?.portraitBlockWidth, 500, 360, 720);
  const portraitBlockMaxWidth = Math.max(320, width - (portraitBlockInset * 2));
  const defaultPriceSize = format === "landscape" ? 48 : 36;

  return {
    width,
    height,
    values: {
      LANG: escapeHtml(locale),
      LOCALE: escapeHtml(locale),
      FORMAT: escapeHtml(format),
      PORTRAIT_BLOCK_SIDE: portraitBlockSide,
      CANVAS_WIDTH: width,
      CANVAS_HEIGHT: height,
      DOCUMENT_TITLE: escapeHtml(`${spec.product.name.replaceAll("\n", " ")} — ${defaults.projectMark}`),
      IMAGE_PANE_PERCENT: clampNumber(spec.layout?.imagePanePercent, 68, 55, 78),
      OVERLAY_HEIGHT_PERCENT: clampNumber(spec.layout?.overlayHeightPercent, 36, 28, 52),
      PORTRAIT_IMAGE_HEIGHT_PERCENT: clampNumber(spec.layout?.portraitImageHeightPercent, 58, 45, 72),
      PORTRAIT_BLOCK_INSET: portraitBlockInset,
      PORTRAIT_BLOCK_WIDTH: portraitBlockWidth,
      PORTRAIT_BLOCK_MAX_WIDTH: portraitBlockMaxWidth,
      PRODUCT_TOP_GAP: clampNumber(spec.layout?.productTopGap, 242, 80, 420),
      FACTS_TOP_GAP: clampNumber(spec.layout?.factsTopGap, 74, 24, 110),
      PORTRAIT_FACTS_TOP_GAP: clampNumber(spec.layout?.portraitFactsTopGap, 28, 16, 60),
      PRODUCT_NAME_SIZE: clampNumber(theme.productNameSize, 76, 42, 108),
      MANIFESTO_SIZE: clampNumber(theme.manifestoSize, 91, 48, 120),
      PRICE_SIZE: clampNumber(theme.priceSize, defaultPriceSize, 24, 84),
      IMAGE_POSITION: escapeHtml(spec.image?.position ?? "50% 50%"),
      IMAGE_DATA_URL: dataUrlForImage(imagePath),
      IMAGE_ALT: escapeHtml(spec.image?.alt ?? spec.product.name.replaceAll("\n", " ")),
      RAIL_BACKGROUND: safeHex(theme.railBackground, "#f3f3f0"),
      IMAGE_BACKGROUND: safeHex(theme.imageBackground, "#5a5d5f"),
      OVERLAY_BACKGROUND: theme.overlayBackground ?? "rgba(248, 248, 245, 0.70)",
      PORTRAIT_OVERLAY_BACKGROUND: theme.portraitOverlayBackground ?? "rgba(248, 248, 245, 0.84)",
      INK: safeHex(theme.ink, "#17191a"),
      MUTED_INK: safeHex(theme.mutedInk, "#626667"),
      MANIFESTO_INK: safeHex(theme.manifestoInk, "#363a3b"),
      CTA_BACKGROUND: safeHex(theme.ctaBackground, "#17191a"),
      CTA_INK: safeHex(theme.ctaInk, "#f0f1ee"),
      PROJECT_MARK: escapeHtml(defaults.projectMark),
      PRODUCT_NAME: escapeHtml(spec.product.name),
      CATEGORY: escapeHtml(spec.product.category ?? defaults.category),
      PRICE_LABEL: escapeHtml(labels.price),
      COLOR_LABEL: escapeHtml(labels.color),
      MATERIAL_LABEL: escapeHtml(labels.material),
      CARE_LABEL: escapeHtml(labels.care),
      PRICE: escapeHtml(spec.product.price),
      COLOR: escapeHtml(spec.product.color ?? defaults.unspecified),
      MATERIAL: escapeHtml(spec.product.material ?? defaults.unspecified),
      CARE: escapeHtml((spec.product.care ?? []).join("\n")),
      MANIFESTO: escapeHtml(copy.manifesto ?? defaults.manifesto),
      OBJECT_NOTE_HTML: paragraphsHtml(copy.objectNote ?? []),
      SAFETY_DISCLAIMER: escapeHtml(defaults.safetyDisclaimer),
      PROJECT_DISCLAIMER: escapeHtml(defaults.projectDisclaimer),
      CTA: escapeHtml(spec.cta ?? defaults.cta),
    },
  };
}

function screenshot(browser, htmlPath, outputPath, width, height) {
  mkdirSync(dirname(outputPath), { recursive: true });
  const browserResult = spawnSync(browser, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    `--window-size=${width},${height}`,
    `--screenshot=${outputPath}`,
    "--run-all-compositor-stages-before-draw",
    "--virtual-time-budget=1200",
    pathToFileURL(htmlPath).href,
  ], { encoding: "utf8" });

  if (browserResult.status !== 0 || !existsSync(outputPath)) {
    const detail = browserResult.stderr?.trim() || browserResult.stdout?.trim() || "unknown browser error";
    throw new Error(`Poster screenshot failed: ${detail}`);
  }
}

const args = parseArgs(process.argv.slice(2));
if (!args.spec) {
  throw new Error("Usage: node scripts/render-poster.mjs --spec <spec.json> --out-dir <directory> [--locale <locale>] [--format <format>] [--html-only]");
}
if (args.outDir && (args.out || args.htmlOut)) {
  throw new Error("Use --out-dir for named variant outputs, or --out/--html-out for a single output, not both");
}

const specPath = resolve(args.spec);
const specDir = dirname(specPath);
const rootSpec = JSON.parse(readFileSync(specPath, "utf8"));
const {
  variants,
  formats,
  defaultFormat: configuredDefaultFormat,
  ...sharedSpec
} = rootSpec;
const defaultFormat = configuredDefaultFormat ?? "landscape";
validateMerchandiseBoundary(rootSpec, variants);
let variantEntries = isPlainObject(variants)
  ? Object.entries(variants)
  : [[rootSpec.locale ?? "en", {}]];
let formatEntries = isPlainObject(formats)
  ? Object.entries(formats)
  : [[defaultFormat, {}]];

if (variantEntries.length === 0) throw new Error("Spec variants must not be empty");
if (formatEntries.length === 0) throw new Error("Spec formats must not be empty");
if (isPlainObject(formats) && !(defaultFormat in formats)) {
  throw new Error(`defaultFormat ${defaultFormat} is not present in spec.formats`);
}

if (args.locale) {
  variantEntries = variantEntries.filter(([locale]) => locale === args.locale);
  if (variantEntries.length === 0) {
    const available = isPlainObject(variants) ? Object.keys(variants).join(", ") : rootSpec.locale ?? "en";
    throw new Error(`Locale ${args.locale} not found. Available: ${available}`);
  }
}

if (args.format) {
  formatEntries = formatEntries.filter(([format]) => format === args.format);
  if (formatEntries.length === 0) {
    const available = isPlainObject(formats) ? Object.keys(formats).join(", ") : defaultFormat;
    throw new Error(`Format ${args.format} not found. Available: ${available}`);
  }
}

if ((variantEntries.length > 1 || formatEntries.length > 1) && !args.outDir) {
  throw new Error("Multi-locale or multi-format specs require --out-dir");
}
if (variantEntries.length === 1 && !args.outDir && !args.out && !args.htmlOnly) {
  throw new Error("--out is required for single output unless --out-dir or --html-only is set");
}
if (variantEntries.length === 1 && args.htmlOnly && !args.outDir && !args.htmlOut) {
  throw new Error("--html-out or --out-dir is required with --html-only");
}

const template = readFileSync(resolve(skillRoot, "assets/poster-template.html"), "utf8");
const browser = args.htmlOnly ? null : findBrowser();
if (!args.htmlOnly && !browser) {
  throw new Error("No Chromium browser found. Set POSTER_BROWSER_BIN or use --html-only.");
}

const baseName = safeFilePart(
  rootSpec.outputBaseName,
  basename(specPath, extname(specPath)),
);
const outputLines = [];

for (const [format, rawFormatSpec] of formatEntries) {
  const { variants: formatVariants, ...formatSpec } = rawFormatSpec;

  for (const [locale, variantSpec] of variantEntries) {
    const localeFormatSpec = isPlainObject(formatVariants)
      ? formatVariants[locale] ?? {}
      : {};
    let resolvedSpec = deepMerge(sharedSpec, variantSpec);
    resolvedSpec = deepMerge(resolvedSpec, formatSpec);
    resolvedSpec = deepMerge(resolvedSpec, localeFormatSpec);

    const { width, height, values } = templateValues(resolvedSpec, locale, specDir, format);
    const html = renderTemplate(template, values);
    const localePart = safeFilePart(locale, "default");
    const formatPart = format === defaultFormat
      ? ""
      : `.${safeFilePart(format, "format")}`;

    const htmlPath = args.outDir
      ? resolve(args.outDir, `${baseName}${formatPart}.${localePart}.html`)
      : resolve(args.htmlOut ?? args.out.replace(/\.[^.]+$/, ".html"));
    const outputPath = args.outDir
      ? resolve(args.outDir, `${baseName}${formatPart}.${localePart}.png`)
      : args.out
        ? resolve(args.out)
        : null;

    mkdirSync(dirname(htmlPath), { recursive: true });
    writeFileSync(htmlPath, html);
    outputLines.push(`HTML [${format}/${locale}]: ${htmlPath}`);

    if (!args.htmlOnly) {
      screenshot(browser, htmlPath, outputPath, width, height);
      outputLines.push(`PNG [${format}/${locale}]: ${outputPath}`);
    }
  }
}

process.stdout.write(`${outputLines.join("\n")}\n`);
