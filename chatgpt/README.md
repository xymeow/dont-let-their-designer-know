# ChatGPT 轻量版配置

[English setup](#english-setup)

这个目录提供一份可以直接粘贴到 Custom GPT Builder 的轻量配置。它不需要外部 Action，也不替代仓库根目录的完整 Skill。

已经发布的版本：[在 ChatGPT 中打开 **Don't Let Their Designer Know**](https://chatgpt.com/g/g-6835710d0b688191b3bf4e1b7139da06-don-t-let-their-designer-know)。

## 默认体验

用户附上一张普通物件照片，不输入任何文字，直接发送。GPT 会进行两次独立生图：先生成一张纯英文 16:9 横版海报，再生成一张纯中文 16:9 横版海报。它不会用一次请求生成两个候选，也不会做拼图、分屏或双语合版。

两张图共享商品、价格、裁切、背景和大致版式。英文与中文从同一语义设定分别创作，不逐字翻译。左下信息幕用物件的可见事实写一条深沉哲学句；右栏固定为尺寸、材质、颜色、使用方式和养护。尺寸、材质、颜色保持真实，使用方式和养护则把正常用途改写成「贵到不能轻易用」的荒谬限制。项目名或 `DLTDK` 是右上角的小号品牌彩蛋，使用常规字重；品牌无关联声明缩成页脚注释级小字。普通低价物件的虚构价格不得低于 USD $1,000 或 CNY ¥8,000。

## Builder 设置

- **名称**：`Don't Let Their Designer Know`
- **描述**：`把一张普通物件照片变成一组中英成对的虚构奢侈品横版海报。非真实商品，仅供非商业戏仿与娱乐。`
- **头像**：上传 [`avatar.png`](avatar.png)，保留普通线材、极简文案与 `$1,690` 的荒谬价格
- **Instructions**：完整粘贴 [`GPT_INSTRUCTIONS.md`](GPT_INSTRUCTIONS.md)
- **Image Generation**：开启
- **Code Interpreter & Data Analysis**：建议开启，便于在运行环境支持时转换 PNG 与 JPG/JPEG
- **Web Search**：这个流程不需要，可以关闭
- **Actions**：不需要

建议添加一条对话开场白：

```text
上传一张普通物件照片。可以不输入任何文字。
```

先在 Preview 中测试，再决定是否发布。GPT 的可见范围和发布选项取决于你的 ChatGPT 账号及工作区设置。

## 快速测试

- 只上传一张主体明确的物件照片，不输入文字，确认它直接开始生成。
- 确认先得到一张纯英文横版图，再得到一张纯中文横版图，没有两个英文候选或双语合版。
- 确认两张图使用同一物件、概念和离谱价格，并保留左图右栏与半透明信息幕的基本骨架。
- 确认真实品牌已经移除，声明清晰可见，商品仍是画面焦点。
- 确认中英文文案分别自然、冷淡、故作深沉，而不是逐字翻译。
- 确认右栏按顺序显示尺寸、材质、颜色、使用方式和养护；后两项没有照抄物件的正常用途。
- 确认右上项目名或 `DLTDK` 使用常规字重、小号字号，没有变成第二个标题。
- 确认品牌无关联声明是可读的页脚小注，没有抢过商品名、价格或事实字段。
- 上传人物戴帽子或动物戴项圈的照片，确认它会抽取帽子或项圈继续生成；只有找不到可用的非生命物件、会把人物或动物本体当商品时才拒绝。

## 已知限制

Custom GPT 的图像生成界面不一定在每次运行中严格保证比例、遮盖关系、文件格式或图中文字。轻量版不做复杂验收和自动返工；它优先保证快速交付两次独立生图，并通过分开调用减少两张都变成英文候选的概率。

需要固定的 1920 × 1080 输出、清晰可编辑的文字、完整三种长宽比或批量文件时，请使用仓库根目录的完整 Skill。OpenAI 的图像生成工具支持尺寸、格式和压缩等选项；PNG 是默认格式，透明背景不支持 JPEG。详见 [OpenAI 图像生成工具选项](https://developers.openai.com/api/docs/guides/tools-image-generation#tool-options)。

## 许可

这份配置沿用仓库的 [CC BY-NC 4.0](../LICENSE) 许可与 [NOTICE](../NOTICE)。只可用于非商业目的；分享或修改时请注明 `xymeow`、链接许可证并说明改动。不要上传、贡献或再分发你无权使用的照片和其他材料。

## English setup

This directory contains a lightweight configuration for Custom GPT Builder. It requires no external Action and does not replace the full Skill at the repository root.

Published version: [open **Don't Let Their Designer Know** in ChatGPT](https://chatgpt.com/g/g-6835710d0b688191b3bf4e1b7139da06-don-t-let-their-designer-know).

The default experience is one photo with no typed prompt. The GPT makes two separate image calls in sequence: one English-only 16:9 poster, then one Simplified-Chinese-only 16:9 poster. It never asks one call for two variants or creates a bilingual composite. Both share the same object, price, crop, and visual direction. The lower-left veil carries fact-based philosophical copy. The right rail always contains size, material, color, use, and care; use and care turn the former everyday purpose into an absurd restriction. The project name or `DLTDK` stays small and regular-weight in the upper right, and the non-affiliation line stays in small footer type. The two languages are native sibling pieces, not literal translations.

Use these Builder settings:

- **Name**: `Don't Let Their Designer Know`
- **Description**: `Turn one ordinary-object photo into paired English and Simplified Chinese landscape posters for a fictional luxury product. Noncommercial parody and entertainment only.`
- **Avatar**: upload [`avatar.png`](avatar.png), which pairs the ordinary cable with minimal copy and the absurd `$1,690` price
- **Instructions**: paste all of [`GPT_INSTRUCTIONS.md`](GPT_INSTRUCTIONS.md)
- **Image Generation**: on
- **Code Interpreter & Data Analysis**: recommended for PNG and JPG/JPEG conversion when the runtime supports it
- **Web Search**: not required
- **Actions**: none

Suggested conversation starter:

```text
Upload one ordinary-object photo. You do not need to type anything.
```

Run the short test above in Preview before publishing. The Lite version intentionally skips detailed validation and automatic rework. For deterministic 1920 × 1080 output, editable typography, all three aspect ratios, or batch files, use the full repository Skill.
