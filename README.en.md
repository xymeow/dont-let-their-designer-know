# Don't Let Their Designer Know

English | [简体中文](README.md)

[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC_BY--NC_4.0-777777.svg)](https://creativecommons.org/licenses/by-nc/4.0/)

> “People pay for this? At that price?”
>
> “You wouldn’t understand. It’s art.”

With **Don't Let Their Designer Know**, you give an ordinary object a white studio, a solemn materials story, and a price nobody dares ask you to explain. Wrap a USB cable in kraft paper, surround it with generous whitespace and one museum-grade shadow, and it acquires provenance, scarcity, and four-figure confidence.

An agent following this Skill turns one ordinary-object photo into a six-image English-and-Chinese speculative luxury catalog. You can use the finished set to poke fun at the pricing magic of postmodern art and luxury retail, and test how long viewers keep asking about the price before they decide they may not understand art.

It works with Codex, Claude Code, claude.ai custom Skills, and other runtimes that support the `SKILL.md` format.

Current release: **1.0.0**

Source photo → productized image:

![Source photo and productized kraft-bound charging cable](assets/examples/kraft-bound-charge-cable.before-after.png)

| English | 简体中文 |
| --- | --- |
| ![English kraft-bound charging cable poster](assets/examples/kraft-bound-charge-cable.en.png) | ![中文纸束充电线海报](assets/examples/kraft-bound-charge-cable.zh-CN.png) |

## What it makes

One source photo becomes one text-free product image and six finished catalog images:

| Format | English | Simplified Chinese | Intended use |
| --- | --- | --- | --- |
| 1920 × 1080, 16:9 | `<name>.en.png` | `<name>.zh-CN.png` | Wide social and editorial placements |
| 1080 × 1350, 4:5 | `<name>.portrait.en.png` | `<name>.portrait.zh-CN.png` | Portrait feeds |
| 1080 × 1920, 9:16 | `<name>.story.en.png` | `<name>.story.zh-CN.png` | Stories, Reels, and other full-screen placements |

The output directory also contains self-contained HTML files, the shared JSON spec, the productized image, and the exact image-generation prompt.

## Requirements

- Node.js 18 or newer
- Chrome, Chromium, or Microsoft Edge for PNG export
- A source photo of an identifiable inanimate object
- An image-generation or image-editing tool for the full photo-to-poster workflow

Codex can use its built-in image-generation tool. Claude Code and other agents need an image tool exposed through their environment. Without one, provide a clean, text-free product image and use layout-only mode.

## Install

### Codex

The easiest option is to paste this into Codex:

```text
Use $skill-installer to install the Skill at the repository root of https://github.com/xymeow/dont-let-their-designer-know. Name it dont-let-their-designer-know and install it in $HOME/.agents/skills.
```

For a manual user-wide installation:

```bash
mkdir -p "$HOME/.agents/skills"
git clone --depth 1 https://github.com/xymeow/dont-let-their-designer-know.git "$HOME/.agents/skills/dont-let-their-designer-know"
```

To keep the Skill inside one repository instead:

```bash
mkdir -p .agents/skills
git submodule add https://github.com/xymeow/dont-let-their-designer-know.git .agents/skills/dont-let-their-designer-know
```

Codex reads personal Skills from `$HOME/.agents/skills` and repository Skills from `.agents/skills`. If it does not appear immediately, restart Codex. See the [OpenAI Skills documentation](https://learn.chatgpt.com/docs/build-skills#where-to-save-skills).

The fastest path is to select **Don't Let Their Designer Know**, attach one photo, and send without typing anything. The Skill immediately runs the full bilingual six-image workflow with its defaults and saves the results to `output/`.

The equivalent explicit prompt is:

```text
Use $dont-let-their-designer-know to turn the inanimate object in this photo into the full English and Simplified Chinese catalog set. Save the results to output/.
```

### Claude Code

Install it for your user account:

```bash
mkdir -p "$HOME/.claude/skills"
git clone --depth 1 https://github.com/xymeow/dont-let-their-designer-know.git "$HOME/.claude/skills/dont-let-their-designer-know"
```

Or add it to one project as a Git submodule:

```bash
mkdir -p .claude/skills
git submodule add https://github.com/xymeow/dont-let-their-designer-know.git .claude/skills/dont-let-their-designer-know
```

Claude Code reads personal Skills from `$HOME/.claude/skills` and project Skills from `.claude/skills`. Run `/skills` to confirm that it loaded; restart Claude Code if you created the top-level directory during the current session. See the [Claude Code Skills documentation](https://code.claude.com/docs/en/slash-commands#where-skills-live).

Put the source image in your working directory, then run:

```text
/dont-let-their-designer-know Turn the inanimate object in ./photo.jpg into the full English and Simplified Chinese catalog set. Save the results to ./output.
```

### claude.ai

Create a clean ZIP with `SKILL.md` at its root:

```bash
git clone https://github.com/xymeow/dont-let-their-designer-know.git
cd dont-let-their-designer-know
git archive --format=zip --output=../dont-let-their-designer-know.zip HEAD
```

Upload the ZIP from **Settings → Features → Skills**, then attach a source photo and ask Claude to use `dont-let-their-designer-know`. Custom Skills require a supported plan with code execution enabled. See Anthropic's [Agent Skills overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview).

claude.ai can load the instructions, but full PNG export still requires Node.js, a Chromium browser, and an image tool in its runtime. If one of those is unavailable, ask Claude to prepare the image prompt, copy, and JSON spec, then run the renderer on your computer.

### Claude agents and API

The repository root is a standard Agent Skill directory: `SKILL.md` is the entry point, and the adjacent `assets/`, `references/`, and `scripts/` directories are its resources. Mount or copy the whole repository into the Skills location configured by your agent runtime, or upload the same ZIP through the Skills API. No Claude-specific adapter is required. Runtime requirements still apply.

## How the image is generated

1. The agent identifies one inanimate product and records the construction details it must preserve.
2. An image tool restages that object as a centered, text-free studio product photograph with generous negative space.
3. The agent writes one fact sheet and separate English and Simplified Chinese catalog copy.
4. The agent creates a JSON spec and runs the HTML renderer for all three aspect ratios.
5. The agent inspects all six PNG files for crop, type, contrast, and factual consistency.

The image model creates the product photograph only. The renderer adds all typography, facts, price, CTA, a fixed `AI-GENERATED PARODY · NOT A REAL PRODUCT · FOR ENTERTAINMENT ONLY` safety disclosure, and the non-affiliation disclosure in HTML so the text stays editable and sharp.

## Layout-only mode

Use this mode when your agent has no image-generation tool or you already have a clean product image:

```text
/dont-let-their-designer-know Use layout-only mode with ./product.png. Create the full bilingual catalog set and save it to ./output.
```

Codex users can replace the leading slash command with `$dont-let-their-designer-know`.

## Render the included example

```bash
npm run render:example
```

The command renders the kraft-bound charging-cable example into `assets/examples/`. Set `POSTER_BROWSER_BIN` if the browser executable is outside the paths checked by the renderer.

Render another JSON spec with:

```bash
node scripts/render-poster.mjs --spec path/to/spec.json --out-dir output
```

Add `--html-only` when Chromium is unavailable and you only need the editable layouts.

Start from [`assets/examples/kraft-bound-charge-cable.json`](assets/examples/kraft-bound-charge-cable.json) when you need a schema example. The same directory includes the [source photo](assets/examples/kraft-bound-charge-cable-source.jpg), [productized image](assets/examples/kraft-bound-charge-cable-product.png), and [before/after comparison](assets/examples/kraft-bound-charge-cable.before-after.png).

## Merchandise boundary

Choose an inanimate object as the product. A person or animal may demonstrate it, but the catalog name, price, materials, care instructions, and purchase button must refer to the object. The skill removes fashion-house marks and adds a visible AI-parody/not-a-real-product safety disclosure plus an independent-design disclosure to each layout.

## Contributing and forks

PRs are welcome. I do not subscribe to every AI coding tool, so I cannot test each runtime myself. If you use OpenCode, Kimi Code, or another agent runtime, compatibility fixes, setup notes, renderer fixes, and tested examples are useful contributions. In your PR, name the tool or runtime and version, explain the change, and describe how you tested it. Please preserve the inanimate-merchandise boundary, the visible AI-parody safety disclosure, and the non-affiliation disclosure.

You are also welcome to fork the project and adapt it to your own workflow. If you share your fork or another adaptation, follow [CC BY-NC 4.0](LICENSE): keep the use noncommercial, credit `xymeow`, link to the license, and identify your changes. Only contribute or redistribute source photos, generated images, code, and other material that you have the right to use. [NOTICE](NOTICE) explains the limits around trademarks, product designs, likenesses, source images, and other third-party material.

## License and third-party rights

This repository is licensed under [Creative Commons Attribution-NonCommercial 4.0 International](LICENSE) (`CC BY-NC 4.0`). You may share and adapt the licensed project materials for noncommercial purposes with appropriate credit, a link to the license, and an indication of changes. The license does not permit commercial use.

The license applies to the repository's original Skill instructions, prompt and copy systems, scripts, templates, documentation, and example materials only to the extent that the licensor owns them. It does not grant rights to third-party names, trademarks, logos, trade dress, product designs, likenesses, source images, or other protected material. This independent project is not affiliated with or endorsed by any fashion house or other brand. The project is intended for parody and entertainment; its license does not certify generated outputs as cleared for advertising, product sales, or other commercial uses. You are responsible for reviewing the source material, generated output, and intended use. See [NOTICE](NOTICE) for the complete project notice.

Because the license restricts commercial use, this project is source-available rather than OSI-approved open source.
