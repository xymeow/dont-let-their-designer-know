# Image productization

Read this reference for the image-generation stage of the full workflow.

## Objective

Extract the intended inanimate object from the supplied photograph and restage it as a severe, high-fashion catalog object without erasing the fact that it began as an ordinary thing. The product image must remain text-free so HTML can handle exact typography later.

The default framing is a medium-long product shot, not a close-up hero crop. The object should feel deliberately small inside a controlled field of negative space, with its visual center near the center of the frame rather than pushed toward the bottom. Use a refined white or neutral-grey background selected to separate the subject's edges, plus a restrained contact shadow that grounds the object without becoming a visual effect.

## Living-subject gate

Decide the merchandise anchor before sending an image-generation prompt.

- The anchor must be inanimate. Being central, large, visually striking, or mentioned in a caption does not make a person or animal eligible.
- If a person or animal is incidental, remove them from the product image when practical.
- If a person or animal is deliberately modeling the object, retain them only when their presence explains scale, fit, use, or interaction. Keep the object sharp, complete, and visually primary.
- Do not isolate, relight, pedestalize, stylize, or create a hero cutout of a living subject as though they were merchandise.
- Do not alter a model's body, face, species traits, or identity to make the object look more luxurious.
- If the intended object cannot be identified without guessing, pause and ask the user to specify it.

## Source lock

Before generating, record the subject’s non-negotiable facts:

- silhouette and proportions
- number and placement of structural parts
- attachment points and topology
- material identity, including cheap or improvised materials
- meaningful wear, folds, joints, asymmetry, or construction errors
- viewpoint needed to recognize the object

Do not “improve” these facts into a conventional premium product. The contrast between ordinary construction and premium presentation is the point.

## Default path

Use the runtime's available image-generation or image-editing tool. Inspect a local source file with the runtime's image viewer before generating so the agent can verify the subject. Treat the uploaded photo as the edit target and source reference. If the runtime has no image tool, ask the user for a clean, text-free product image and return to the layout-only workflow.

Start with one direct restaging pass:

```text
Use case: precise-object-edit
Asset type: text-free product image for a luxury-catalog parody poster
Input images: Image 1: edit target and sole subject reference
Primary request: isolate only [SUBJECT] from Image 1 and restage it as a single collectible design object; preserve its exact silhouette, proportions, construction, attachment points, and recognizable improvised details
Scene/backdrop: seamless studio field selected for clear edge separation from the subject; use luminous off-white or pale cool grey for dark or saturated objects, and a refined neutral or cool mid-grey when a pale, translucent, or reflective object needs more contrast; no décor, visible corner, horizon line, or branded set
Style/medium: photorealistic deadpan luxury catalog photography; severe, quiet, industrial, commercially precise
Composition/framing: medium-long product shot with the object deliberately smaller than a conventional hero close-up; place its visual center at about 50% of frame width and 48–52% of frame height, not bottom-weighted; the object's maximum visual span should usually occupy about 58–68% of the corresponding frame dimension and never exceed 72% unless legibility genuinely requires it; keep at least about 14% clean breathing room around the full silhouette and shadow; slight three-quarter view unless the source requires a frontal view; compose one master image that can crop cleanly into the 16:9 landscape image stage, the 4:5 portrait feed card, and the narrower 9:16 story image stage; no aggressive crop
Lighting/mood: large diffused key light, quiet ambient fill, and a soft low-contrast contact shadow directly beneath or slightly behind the object; the shadow should ground the object without pulling it downward or becoming theatrical; retain any real internal light source
Color palette: preserve colors already present on the subject; choose a luminous off-white, pale cool grey, or refined neutral grey background for tonal separation rather than forcing every object onto the same grey
Materials/textures: preserve real material identity and imperfections; allow manufacturing detail to remain visible
Constraints: change only the setting and presentation; keep the inanimate object recognizable; remove people, animals, and incidental props by default; no words; no labels; no logos; no trademarks; no watermark
Avoid: oversized subject filling the frame, bottom-weighted ecommerce crop, cramped edges, pure-white highlight clipping, subject and background collapsing into the same tone, long dark theatrical shadows, gold plating, beige lifestyle interiors, decorative pedestals, invented components, false symmetry, excessive gloss, surreal melting, text overlays
```

Replace bracketed content with observed facts. Add only details that materially protect the source subject. Treat the scale and margin numbers as strong defaults rather than a reason to make a tiny or intricate object unreadable; relax them only when detail legibility or a necessary supporting model requires it.

When the user intentionally wants a person or animal to demonstrate the product, replace the default exclusion with a narrow model instruction:

```text
Supporting model: retain [PERSON OR ANIMAL] only as a natural model demonstrating [INANIMATE OBJECT]; the object is the sole merchandise anchor and must be fully visible, in focus, and visually dominant; do not isolate, label, price, pedestalize, or productize the model
```

Do not use a supporting model merely because a living subject happened to appear in the source.

## Two-pass recovery

Use two passes when a busy background causes drift or the subject edges are repeatedly lost:

1. **Background extraction:** request a genuinely transparent cutout, preserving all fine edges, holes, handles, cords, and gaps.
2. **Product restaging:** use the cutout as the subject reference and generate the cold studio catalog image.

Do not default to two passes. Each additional generation creates another opportunity for geometry drift.

## Acceptance check

- The object is recognizable without reading the poster copy.
- The object's visual mass sits near the horizontal and vertical center rather than drifting toward an edge, the catalog rail, or the bottom of the frame.
- The object reads as a medium-long product shot: its maximum visual span is usually about 58–68% of the corresponding frame dimension, never beyond 72% without a clear legibility reason, and roughly 14% or more clean breathing room survives around the silhouette and shadow.
- The background is luminous off-white, pale cool grey, or refined neutral grey chosen for visible edge contrast with this particular object; it does not clip pale highlights or swallow dark edges.
- A soft contact shadow grounds the object without creating a heavy base, dramatic spotlight, or bottom-weighted composition.
- The same master image can fill landscape, portrait, and story image stages without clipping the defining silhouette.
- A viewer can identify the inanimate object as the product without using the title.
- Any person or animal reads only as a model or scene participant. Removing the object would make the product proposition disappear.
- No crop, spotlight, pose, empty space, or product-page geometry makes a living subject look like the priced item.
- All structural connections still make physical sense.
- Cheap or improvised material remains visible.
- The frame does not crop handles, feet, cords, shadows, or other defining parts.
- The image contains no generated typography or brand marks.
- The result looks expensive because of lighting and presentation, not because the object was redesigned into a different product.
