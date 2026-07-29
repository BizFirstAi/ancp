# TextSlider Component

A self-contained, scroll-driven (or auto-cycling) text slider Web Component.
Completely decoupled — works anywhere, no dependencies.

## Files

```
slider-content/
  slider-content.js   — Web Component definition
  slider-content.css  — Component styles (ts- prefix)
  slider-content.md   — This file
```

## Installation

```html
<link rel="stylesheet" href="./assets/slider-content/slider-content.css">
<script src="./assets/slider-content/slider-content.js"></script>
```

## Basic Usage

```html
<text-slider>
  <div class="ts-slide">
    <span class="ts-number">01 / 03</span>
    <span class="ts-label">Category Label</span>
    <h3 class="ts-title">Slide <em>Title Here</em></h3>
    <p class="ts-desc">Supporting description text goes here.</p>
  </div>

  <div class="ts-slide">
    <span class="ts-number">02 / 03</span>
    <span class="ts-label">Another Category</span>
    <h3 class="ts-title">Second <em>Slide</em></h3>
    <p class="ts-desc">Another description.</p>
  </div>

  <div class="ts-slide">
    <span class="ts-number">03 / 03</span>
    <span class="ts-label">Last Category</span>
    <h3 class="ts-title">Final <em>Slide</em></h3>
    <p class="ts-desc">Last description.</p>
  </div>
</text-slider>
```

Default mode: **auto-cycle** every 3 seconds.

---

## Scroll-Driven Mode

Tie slide progression to a tall scroll-driver element:

```html
<!-- Tall div that drives scroll -->
<div id="scrollDriver" style="height: 600vh; position: relative;">

  <!-- Sticky hero that stays fixed while user scrolls -->
  <div style="position: sticky; top: 0; height: 100vh;">

    <!-- Your hero content -->
    <octopus-hero-section></octopus-hero-section>

    <!-- Text slider overlaid absolutely on the right -->
    <text-slider
      scroll-driver="scrollDriver"
      class="ts-bordered"
      style="position: absolute; top: 0; right: 0; width: 280px; height: 100%;">
      <div class="ts-slide">...</div>
      <div class="ts-slide">...</div>
    </text-slider>

  </div>
</div>
```

The slider reads the scroll position of `#scrollDriver` and maps it to slide index automatically.

---

## Attributes

| Attribute         | Values            | Default  | Description                                         |
|-------------------|-------------------|----------|-----------------------------------------------------|
| `scroll-driver`   | element ID        | —        | When set, enables scroll mode using that element    |
| `mode`            | `scroll` / `auto` | `auto`   | Explicit mode override                              |
| `auto-interval`   | number (ms)       | `3000`   | Milliseconds between slides in auto mode            |

---

## CSS Classes

### Slide content (you write these inside `.ts-slide`):

| Class        | Purpose                        |
|--------------|-------------------------------|
| `.ts-number` | Step counter, e.g. "01 / 05"  |
| `.ts-label`  | Category label (uppercase)     |
| `.ts-title`  | Main slide title               |
| `.ts-title em` | Highlighted word in title    |
| `.ts-desc`   | Supporting description         |

### Component internals (auto-generated):

| Class              | Purpose                                    |
|--------------------|--------------------------------------------|
| `.ts-progress`     | Left-edge progress bar                     |
| `.ts-dots`         | Dot indicator container                    |
| `.ts-dot`          | Individual dot                             |
| `.ts-dot--active`  | Currently active dot (wider pill shape)    |
| `.ts-slide--active`| Currently visible slide                   |
| `.ts-slide--exit`  | Slide animating out                        |

### Optional host modifier:

| Class          | Effect                         |
|----------------|-------------------------------|
| `.ts-bordered` | Adds left border to component |

---

## Sizing & Positioning

The component is `display: block; position: relative` by default.
Control its size with CSS on the element:

```css
/* Fixed width panel on the right */
text-slider {
  position: absolute;
  top: 0;
  right: 0;
  width: 280px;
  height: 100%;
}
```

Or inline:
```html
<text-slider style="position: absolute; top: 0; right: 0; width: 280px; height: 100%;">
```

---

## Demo

See `demo.html` in this project for a working example integrating with the octopus hero.
