# ChatGPT 轻量版配置

[English setup](#english-setup)

这个目录提供一份可以直接粘贴到 Custom GPT Builder 的轻量配置。它不需要外部 Action，也不替代仓库根目录的完整 Skill。

已经发布的版本：[在 ChatGPT 中打开 **Don't Let Their Designer Know**](https://chatgpt.com/g/g-6835710d0b688191b3bf4e1b7139da06-don-t-let-their-designer-know)。

## 默认体验

用户附上一张普通物件照片，不输入任何文字，直接发送。GPT 应当生成两张独立的 16:9 横版海报：英文一张、简体中文一张，不做拼图、分屏或中英双语合版。

两张图共享商品、价格、裁切、背景、68/32 构图和遮盖关系。英文与中文从同一语义设定分别创作，保持相同概念节拍，不逐字翻译。文案采用一本正经、克制、略显荒谬的奢侈品口吻，把物件的一项可见事实写成重大命题。背景采用低饱和色块、轻微渐变和柔和阴影。普通低价物件的虚构价格不得低于 USD $1,000 或 CNY ¥8,000。默认优先提供 PNG；用户明确要求 JPG/JPEG 时再提供该格式。

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

## 发布前测试

- 只上传一张主体明确的物件照片，不输入文字，确认它直接开始生成。
- 确认最终得到两张独立的 16:9 横版图，英文一张、简体中文一张，没有拼图、分屏或上下叠放。
- 检查物件的接口、形状、材料和特殊结构有没有被随意改写。
- 检查每张图片只使用一种语言，两张图的商品事实、价格、裁切、构图和概念节拍一致。
- 检查背景是否由低饱和色块、轻微渐变和柔和阴影组成，没有台面、墙地交界、真实场景、明显纹理或强烈聚光。
- 检查左侧商品图场约占 68%，右侧纸白商品栏约占 32%，商品在左侧图场内居中。
- 检查半透明信息幕只覆盖左侧图场下部约 35%，商品下半部仍然透过信息幕可见，识别轮廓没有被抹掉。
- 检查宣言和物件短注位于信息幕内，项目标、商品名、品类、价格、事实信息、声明和按钮按顺序进入右栏。
- 检查普通低价物件的价格至少达到 USD $1,000 或 CNY ¥8,000，并且明显荒谬而非合理溢价。
- 检查真实品牌名称、Logo、吉祥物、包装文案和标志性商业外观是否已经去除。
- 检查排版层级完整但不拥挤，而且商品仍是画面焦点。
- 检查英文和中文文案是否分别自然成篇，语气冷淡、深沉、一本正经，并且仍然基于物件的可见事实。
- 上传只有人物或动物的照片，确认它不会把生命主体当作商品。
- 上传含多个同等显眼物件的照片，确认它会先询问要处理哪一个。
- 提出商业广告或真实销售用途，确认它说明本项目只允许非商业使用。
- 分别要求 PNG 和 JPG，检查当前运行环境实际交付的下载文件格式。

## 已知限制

Custom GPT 的图像生成界面不一定在每次运行中严格保证精确比例、遮盖关系、文件格式、背景风格或图中文字。这里的 Instructions 会把 68/32 分栏、下部信息幕、英中成对、每张单语言和荒谬价格设为拒收条件，并在失败时重试一次。如果仍然失败，它会交付对应语言的干净横版产品图，并在消息中给出可复制的准确文案。

需要固定的 1920 × 1080 输出、清晰可编辑的文字、完整三种长宽比或批量文件时，请使用仓库根目录的完整 Skill。OpenAI 的图像生成工具支持尺寸、格式和压缩等选项；PNG 是默认格式，透明背景不支持 JPEG。详见 [OpenAI 图像生成工具选项](https://developers.openai.com/api/docs/guides/tools-image-generation#tool-options)。

## 许可

这份配置沿用仓库的 [CC BY-NC 4.0](../LICENSE) 许可与 [NOTICE](../NOTICE)。只可用于非商业目的；分享或修改时请注明 `xymeow`、链接许可证并说明改动。不要上传、贡献或再分发你无权使用的照片和其他材料。

## English setup

This directory contains a lightweight configuration for Custom GPT Builder. It requires no external Action and does not replace the full Skill at the repository root.

Published version: [open **Don't Let Their Designer Know** in ChatGPT](https://chatgpt.com/g/g-6835710d0b688191b3bf4e1b7139da06-don-t-let-their-designer-know).

The default experience is one photo with no typed prompt. The GPT should immediately create two separate 16:9 landscape posters: one English and one Simplified Chinese, never a bilingual composite. Both share the same object, price, crop, visual direction, 68/32 composition, and translucent veil. The copy treats a visible physical fact with cold, over-serious luxury-campaign gravity; the two languages are native sibling pieces, not literal translations.

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

Test the same cases listed above in Preview before publishing. For deterministic 1920 × 1080 output, editable typography, all three aspect ratios, or batch files, use the full repository Skill.
