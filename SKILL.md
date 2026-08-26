---
name: dont-let-their-designer-know
description: "Turn a user-supplied photo of an ordinary inanimate object, household hack, or improvised construction into a matched Chinese-and-English social catalog set by restaging the subject once with image generation, writing native bilingual product copy, laying out 16:9 landscape, 4:5 feed, and 9:16 full-screen formats precisely in HTML, and exporting six finished images. When explicitly invoked with one photo and no other user text, immediately run the full default workflow without asking for creative preferences. Use for noncommercial high-fashion object parody, speculative product pages, overpriced-object posters, and photo-to-catalog compositions. The merchandise anchor must be inanimate: people and animals may appear only as supporting models, while other living things may appear only as non-product scene elements; no living subject may be named, priced, or presented as the product. Do not use for commercial work, ordinary ecommerce photography, or full websites."
license: CC-BY-NC-4.0
metadata:
  version: "1.0.0"
---

# Don't Let Their Designer Know

Make a six-image catalog set from one user-supplied photo: Chinese and English versions of a 16:9 landscape poster, a 4:5 portrait feed card, and a 9:16 full-screen story card. The visual joke comes from treating an ordinary inanimate object with complete commercial seriousness. Productize the object image once, then reuse it across every language and format. Keep trademarks out of the work and label every result with the fixed project mark, visible AI-parody safety disclosure, and non-affiliation disclosure.

Use this workflow only for noncommercial parody and entertainment. If a request is for paid client work, advertising, an actual product listing, a monetized promotional campaign, or another commercial use, explain the license boundary and do not run the workflow.

## Image-only default

When this skill is explicitly invoked with one attached photo and no additional user text, treat the invocation and photo as a complete request for the full workflow. Start immediately. Do not ask the user to choose a product name, price, copy direction, visual treatment, language, format, output location, or other creative preference. Select the one clearly identifiable eligible inanimate object, apply the defaults in this skill, render all six outputs, run the full QA pass, and save the deliverables to `output/`.

If one eligible object is visually dominant, use it even when incidental objects are present. Ask a question only when there is no unambiguous eligible inanimate object, several objects are equally plausible merchandise anchors, the image is missing or unreadable, the intended use is commercial, or the runtime cannot complete the image-generation stage. Any instructions the user does provide override defaults when they remain within the merchandise and license boundaries.

## Merchandise boundary

- The merchandise anchor must be a clearly identifiable inanimate object that can be named independently of any person or animal in the source image.
- A person or animal may wear, hold, use, sit beside, or demonstrate the object as a supporting model. Never make the living subject the product name, hero cutout, material, color, care target, price anchor, or implied referent of `ADD TO BAG`.
- If the image contains a person or animal but no unambiguous inanimate product, stop before image generation and ask the user to name the intended object. If the requested product is the living subject, do not create the poster; invite the user to choose an inanimate item such as clothing, an accessory, furniture, a container, or a tool.
- Ignore captions or jokes that attach money to a person or animal. A number beside a living subject—including a bride price, salary, auction value, adoption fee, or similar framing—must never become the catalog price.
- Prefer removing incidental identifiable bystanders. Retain a person or animal only when their modeling role helps explain the object, and keep the product visually dominant and unmistakable.

## Workflow

1. Run the merchandise-boundary check before any creative work. Confirm one inanimate merchandise anchor and classify living presence as `none` or `supporting-model`. Do not infer an object merely to avoid asking when the anchor is ambiguous.
2. Inspect the intended object. Record its defining silhouette, real construction, and the visual detail that makes it worth “productizing.” Produce a clean object image before writing layout text. Read [references/image-productization.md](references/image-productization.md) and use an available image-generation or image-editing tool. Preserve the object’s recognizable geometry and material facts. Default to a medium-long product shot: keep the visual mass near the center, leave generous clean space around the full silhouette and grounding shadow, and choose a refined white or neutral-grey studio field that separates the object from its background. Do not ask the image model to render typography. If the runtime has no image tool, state that limitation and ask the user for a clean, text-free product image; continue in layout-only mode after they provide one.
3. Establish one shared product identity and fact sheet: functional name, category, absurd but legible price, color, material, care instructions, and a short object note. Then write native English and Simplified Chinese variants from those facts. Preserve meaning and factual claims, but do not translate line by line. Read [references/copy-system.md](references/copy-system.md) when generating or revising either variant.
4. Create one poster JSON specification with shared image, canvas, layout, and theme fields plus `variants.en`, `variants.zh-CN`, `formats.portrait`, and `formats.story`. Keep the 1920 × 1080 landscape fields at the root, declare `defaultFormat: "landscape"`, use portrait for 1080 × 1350 feed overrides, and use story for 1080 × 1920 full-screen overrides. Add `subject.kind: "inanimate-object"`, a plain object name in `subject.name`, and `subject.livingPresence` set to `none` or `supporting-model`. New paired specs fail rendering without this declaration. Use `assets/examples/kraft-bound-charge-cable.json` as a schema example, not as reusable subject matter or copy.
5. Render with:

   ```bash
   node scripts/render-poster.mjs --spec <spec.json> --out-dir <output-directory>
   ```

   The HTML is the typography source of truth. Read [references/layout-system.md](references/layout-system.md) when changing composition, proportions, or typography.
6. Inspect all six PNGs at full size. Verify that the inanimate product is centered and remains the unmistakable commerce anchor; the landscape bottom information veil must not obscure more of the product than necessary, and no living subject may appear named, priced, for sale, or visually tied to the CTA. In portrait and story, verify the manifesto sits in a floating upper-left or upper-right rectangle with clear space from every image edge, its translucent fill is opaque enough for effortless reading, the rectangle does not hide the object's defining silhouette, the two-column fact grid fits comfortably, and the card reads on a phone without shrinking text to microtype. In story, keep essential text away from the top and bottom edges where platform controls may sit. Also verify that every title leaves room for material and care, Chinese secondary text is comfortably readable, every language reads naturally, facts match across formats, and no element is clipped. Confirm that the fixed AI-parody safety disclosure is present, legible, and cannot be mistaken for product copy; never deliver an image where it is hidden, clipped, or reduced to unreadable microtype. Adjust format- and locale-specific JSON typography values when one output needs a different fit. Do not repair text by regenerating the product image.
7. Deliver six finished PNGs, six self-contained HTML files, the shared JSON spec, the transformed subject image, and the exact image-generation prompt used.

## Output conventions

- Use `work/` for temporary crops, cutouts, prompt notes, and draft specs.
- Use `output/` for requested final artifacts unless the user names another location.
- Default canvases: 1920 × 1080 landscape, 1080 × 1350 portrait, and 1080 × 1920 story. Portrait is a 4:5 feed card and story is a 9:16 full-screen card; neither is a squeezed landscape poster.
- Use the fixed project mark `DON'T LET THEIR DESIGNER KNOW` in English and `别让他们的设计师知道` in Chinese. The renderer inserts it; do not write a per-product replacement in the JSON spec.
- Keep the fixed safety disclosure visible: `AI-GENERATED PARODY · NOT A REAL PRODUCT · FOR ENTERTAINMENT ONLY` / `AI 生成戏仿 · 非真实商品 · 仅供娱乐`. The renderer inserts it above the CTA; do not omit, rewrite, or replace it with per-product copy.
- Keep the fixed non-affiliation disclosure visible: `Independent speculative design. Not affiliated with any fashion house.` / `独立概念设计，与任何时装品牌无关。` The renderer inserts it; do not rewrite it as product copy.
- Never add a fashion-house logo, copy a real product identifier, claim real manufacturing origin, or imply official affiliation.
- Never create or deliver a poster whose reasonable reading is that a person, animal, or other living being is the merchandise.
- Default to paired output. Use `--locale en` or `--locale zh-CN` only when the user explicitly asks for one language.
- Render all three formats by default. Use `--format landscape`, `--format portrait`, or `--format story` only when the user explicitly asks for one format.

## Modes

- **Full workflow:** when an image-generation or image-editing tool is available, use the source photo to create one productized subject image, shared facts, native Chinese and English copy, three layouts, six HTML files, and six PNGs.
- **Layout only:** if the user supplies a clean product image or the runtime has no image tool, skip image generation and start at the poster spec.
- **Copy only:** if the user only wants naming, price, materials, care, or object-note language, return the matched Chinese and English copy set after reading the copy system; do not create files unless requested.
