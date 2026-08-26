# Layout system

Read this reference when changing the poster’s canvas, composition, or typography.

## Default composition

The default landscape canvas is 1920 × 1080 pixels (16:9).

- Image stage: 68% of canvas width.
- Product information rail: 32%.
- Main product title begins around 28–33% of canvas height, higher than a conventional ecommerce page.
- Price, color, material, and care occupy the space below the title.
- A soft-white translucent information veil covers the lower 34–38% of the image stage. Start near 36% height with `rgba(248, 248, 245, 0.70)`, then use the lowest opacity that keeps the copy effortlessly readable without erasing the product beneath it.
- The manifesto sits large at the veil’s lower left. Its short object note sits at the lower right.
- The product's visual mass should sit near the center of the image stage, not the center of the full poster including the catalog rail.

The user’s reference intentionally moves the product name upward. Do not allow the title block to sink into the price area; material and care need their own readable space.

## Portrait feed composition

The portrait canvas is 1080 × 1350 pixels (4:5) for app and social feeds. It is a separate composition, not a scaled or cropped landscape poster.

- Image stage: about 58% of canvas height, full width.
- Catalog section: the remaining lower area, full width on the cool off-white surface.
- Keep the product centered in the image stage and make the full silhouette readable at phone-feed size.
- Put the manifesto and object note in one floating translucent rectangle near the upper-left or upper-right of the image stage. Keep roughly 40–50 px of breathing room from the top and chosen side at the 1080 px baseline.
- The portrait rectangle should occupy roughly 44–50% of the image width, size to its content, and never span the full image width or touch an edge.
- Choose the side with more negative space. Use `layout.portraitBlockSide: "left"` or `"right"`; do not move the product off-center merely to make room for the block.
- Place the fixed project mark at the top of the catalog section, followed by the product name and category.
- Arrange price, color, material, and care as a two-column grid. Stack each label above its value instead of reproducing the landscape label/value rows.
- Keep the fixed AI-parody safety disclosure, non-affiliation disclosure, and CTA at the bottom of the catalog section, in that order. The safety disclosure must be visibly stronger than the non-affiliation line and must not be treated as microtype.
- Shorten copy or make a locale-specific font adjustment before allowing the catalog section to overflow.

## Full-screen story composition

The story canvas is 1080 × 1920 pixels (9:16) for full-screen vertical placements. It shares the portrait hierarchy but uses the extra height for a larger image stage and safer edge spacing.

- Image stage: about 64–66% of canvas height, full width.
- Catalog section: the remaining lower area, with enough bottom padding to keep both disclosure lines and the CTA clear of platform controls.
- Keep the product's visual mass centered. Use a master image with enough negative space to survive the narrower crop without cutting off its silhouette or shadow.
- Put the floating manifesto rectangle near the upper-left or upper-right. Start around 64–88 px from the top and chosen side at the 1080 px baseline.
- Keep the rectangle around 36–42% of the canvas width. Shorten the object note before widening the rectangle across the product.
- Reuse the portrait two-column fact grid. The extra height is for the product image and safe spacing, not extra copy.

## Social export set

- `landscape`: 1920 × 1080 (16:9) for wide placements, article covers, and horizontal video surfaces.
- `portrait`: 1080 × 1350 (4:5) as the shared portrait-feed master.
- `story`: 1080 × 1920 (9:16) for full-screen vertical surfaces.
- Do not add a 2:3 Pinterest or 3:4 Instagram export by default. Add one only when the user names that platform or needs a platform-native crop.

## Typography

- Use a neutral sans-serif stack: Helvetica Neue, Helvetica, Arial, sans-serif.
- For Simplified Chinese, use PingFang SC, Hiragino Sans GB, Microsoft YaHei, then the neutral sans-serif fallback.
- Product name: heavy, tight, uppercase, 0.82–0.9 line height.
- Manifesto: large but lighter than the product name.
- Labels: small uppercase with restrained tracking.
- Values: medium or bold, never condensed into unreadable columns.
- AI-parody safety disclosure: bold secondary type, visibly stronger than the non-affiliation line and readable without zooming into the footer.
- Keep all text in HTML. The image-generation step must remain text-free.

Chinese does not use the English tracking values mechanically. Use a slightly looser line height, substantially less negative letter spacing, Chinese metadata labels, and natural Chinese line breaks. Chinese project mark, category, fact labels, fact values, object note, disclaimer, and CTA should be visibly larger than their English counterparts at the 1920 × 1080 baseline; do not treat them as microtype. The language variants should share composition and crop, but `variants.zh-CN.layout` and `variants.zh-CN.theme` may override title position and font sizes when glyph density requires it.

## Geometry

- All corners are square.
- No shadows, cards, pills, gradients, decorative lines, or fake luxury logos.
- The information rail uses one luminous paper-white surface; default to `#f3f3f0`. Avoid middle grey, which lowers contrast for secondary type, and avoid absolute white, which can feel harsher than the product image.
- The landscape image veil uses one flat soft-white translucent fill; default to `rgba(248, 248, 245, 0.70)`. It must not become glassmorphism or a dominant opaque block. Keep it only tall and opaque enough to support legibility.
- The smaller portrait manifesto rectangle needs stronger contrast than the landscape veil. Start near 84% opacity (roughly 80–86%) on the same soft-white base so its type reads immediately in a phone feed while the product still shows through.
- Keep 46–52 px outer margins at the 1920 × 1080 baseline.
- When a supporting person or animal remains in the product image, compose the object as the visual anchor. The price rail, product title, manifesto, and CTA must resolve toward the object rather than the living subject.
- Avoid a crop in which the object is small or obscured while a face or body becomes the hero image. If that ambiguity cannot be removed through crop and hierarchy, omit the model.

## Fit rules

- Break product names deliberately with `\n` in the JSON spec.
- Product name should use no more than three lines.
- Reduce `theme.productNameSize` before allowing any line to clip.
- Do not force Chinese to reproduce the English line breaks. A compact Chinese product name often fits on one line while English needs two or three.
- Keep the object fully visible in the image stage. Use `image.position` to adjust the crop.
- Begin with `image.position: "50% 50%"`. Move away from center only when the source silhouette or supporting model genuinely requires it.
- If care instructions exceed three lines, shorten the copy instead of shrinking it below legibility.
- For another aspect ratio, preserve the hierarchy rather than preserving exact percentages.
- Use `formats.<format>.variants.<locale>` for the rare adjustment that applies only to one language in one format. Do not distort the shared image or change product facts between formats.

## Export and QA

Render all six self-contained HTML files and PNGs with one run of `scripts/render-poster.mjs`. Inspect every output at full resolution and verify:

- exact canvas dimensions
- no text clipping or overlap
- subject still readable beneath the veil
- information rail and manifesto blocks read as soft white rather than middle grey, with clear dark-text contrast
- product visual mass is centered within the image stage
- veil remains subordinate to the product image and is no taller or more opaque than necessary
- product name begins above the metadata block
- material and care remain visible
- fixed project mark, button, AI-parody safety disclosure, and non-affiliation disclosure remain inside the safe area
- the safety disclosure is clearly legible and cannot be mistaken for a product attribute or hidden legal microtype
- no accidental browser scrollbars
- shared product facts and price match across languages
- Chinese punctuation, glyph fallback, and line breaks are natural
- Chinese secondary text remains comfortably readable at normal viewing size
- the named and priced merchandise is unmistakably an inanimate object
- any person or animal reads only as a supporting model, never as the referent of the price or CTA
- portrait output is exactly 1080 × 1350 and remains legible at phone-feed scale
- portrait facts form a balanced two-column grid without clipping or awkward empty cells
- portrait manifesto rectangle floats clear of the image edges and does not cover the product's defining details
- story output is exactly 1080 × 1920 and keeps essential text away from the top and bottom edges
- story crop preserves the product's full defining silhouette and grounding shadow
