# Design System Document

## 1. Overview & Creative North Star
### The Creative North Star: "Midnight in Lima"
This design system captures the raw, kinetic energy of Lima’s street culture and translates it into a high-end, editorial digital experience. It is not a template; it is a curated atmosphere. We move beyond the "grid-block" aesthetic by utilizing intentional asymmetry, deep tonal layering, and high-contrast typography that mirrors the high-end nightlife of an urban Peruvian eatery. 

The goal is to feel **authoritative yet underground**. We achieve this by breaking the rigid boundaries of traditional web design—using large-scale typography that overlaps high-fidelity photography and a "shadow-first" architecture that creates a physical sense of depth and mystery.

---

## 2. Colors: The Tonal Palette
The palette is rooted in the `surface` (#131313), a deep, obsidian base that provides the stage for our "urban gold" (`primary`: #f2ca50) and earthy accents.

### The "No-Line" Rule
To maintain a premium feel, **1px solid borders for sectioning are strictly prohibited.** Boundaries must be defined through background color shifts. For instance, a `surface-container-low` section sitting against a `surface` background provides a sophisticated, "soft-edge" transition that feels architectural rather than digital.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the Material `surface-container` tiers to create depth:
*   **Background Layer:** `surface` (#131313).
*   **Secondary Content Areas:** `surface-container-low` (#1c1b1b).
*   **Interactive Cards:** `surface-container-high` (#2a2a2a) to create a subtle lift.
*   **Overlays & Modals:** `surface-container-highest` (#353534).

### The "Glass & Gradient" Rule
Floating elements (like navigation bars or hovering image captions) should utilize a **Glassmorphism** approach. Combine a semi-transparent `surface-variant` with a `backdrop-blur` of 12px–20px. This allows the vibrant food photography to bleed through the UI, softening the interface.

### Signature Textures
Main CTAs and Hero accents should utilize a subtle linear gradient from `primary` (#f2ca50) to `primary-container` (#d4af37) at a 135-degree angle. This adds a "metallic" soul to the gold accents, mimicking the way light hits brass fixtures in a dimly lit bar.

---

## 3. Typography: Editorial Authority
Our typography is a conversation between the old world (Serif) and the new urban landscape (Sans-Serif).

*   **Display & Headline (Noto Serif):** These are your "billboard" elements. Use `display-lg` and `headline-lg` with tight letter-spacing (-0.02em) to create impact. These should often be used in a "Hero" context, overlapping image edges to break the container.
*   **Title & Body (Manrope):** Clean, geometric, and highly legible. Manrope provides the "street" balance to the sophisticated serif. Use `body-lg` for descriptions to ensure the menu items feel as premium as the price point.
*   **Labels (Manrope):** Use `label-md` in all-caps with a +0.05em tracking for category tags (e.g., "STREET FOOD LATINO"). This adds an air of curated classification.

---

## 4. Elevation & Depth
In this system, depth is felt, not seen. We avoid harsh drop shadows in favor of **Tonal Layering**.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section. This 2% shift in brightness is enough to signify importance without cluttering the visual field.
*   **Ambient Shadows:** For elements that truly float (like a "Reserve Now" button), use a shadow with a blur radius of `32px` at `8%` opacity, using a tinted version of `on-secondary-container`. It should look like an ambient glow, not a drop shadow.
*   **The "Ghost Border" Fallback:** If accessibility requires a container edge, use the `outline-variant` token at **15% opacity**. This creates a "breath" of a border that guides the eye without trapping the content.
*   **Photography Integration:** Food images should not be mere boxes. Use large border radii (`xl`: 0.75rem) or asymmetrical crops where one corner is `none` and the opposite is `xl` to create a custom, editorial feel.

---

## 5. Components

### Buttons
*   **Primary:** Gradient fill (`primary` to `primary-container`), black text (`on-primary`), `md` corner radius.
*   **Secondary:** Ghost style. `outline-variant` (20% opacity) border with `primary` text.
*   **Interaction:** On hover, the primary button should "glow"—increase the `surface-tint` intensity slightly.

### Cards (The "Menu Tile")
*   **Structure:** No dividers. Separate the "Dish Name" from "Price" using a horizontal `6` (2rem) spacing gap.
*   **Background:** Use `surface-container-low`.
*   **Visual:** Integrate a "Label" chip at the top left using `secondary-container` to highlight "Chef's Choice" or "Trending."

### Input Fields
*   **Style:** Minimalist. Only a bottom border using `outline` at 30% opacity. 
*   **Focus State:** The bottom border transforms into a 2px solid `primary` line.

### Lists & Dividers
*   **Rule:** Forbid the use of line-based dividers. 
*   **Execution:** Use the Spacing Scale `3` (1rem) or `4` (1.4rem) to create clear "islands" of content. High-contrast typography serves as the separator.

### Signature Component: The "Spotlight" Carousel
A high-end component for featured cocktails. Use a `surface-bright` background for the active card, while inactive cards fade into `surface-dim` at 50% opacity, creating a visual "spotlight" effect on the center item.

---

## 6. Do's and Don'ts

### Do:
*   **Do** overlap typography over images to create a layered, magazine-style layout.
*   **Do** use `primary` gold sparingly as an accent—it should feel like jewelry on a black dress.
*   **Do** use the `16` (5.5rem) and `20` (7rem) spacing tokens for vertical section breathing room to emphasize "high-end" luxury.

### Don't:
*   **Don't** use 100% white (#FFFFFF). Use `on-surface` (#e5e2e1) for text to prevent "eye-bleed" on dark backgrounds.
*   **Don't** use standard "Box Shadows." If it looks like a standard web shadow, it's too heavy.
*   **Don't** align everything to a center axis. Use the spacing scale to create intentional left-heavy or right-heavy asymmetrical compositions.