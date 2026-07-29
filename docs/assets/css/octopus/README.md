# Octopus Shared CSS Library

A unified CSS system for all BizFirstAi octopus animation components.

## Overview

The octopus CSS library provides:

- **Variables** — Shared color palette, spacing, typography, animation timing
- **Animations** — Common keyframe animations used across components
- **Base Styles** — Foundation styles for buttons, progress bars, typography
- **Utilities** — Helpful utility classes for layout and effects

This eliminates duplication and ensures consistency across all octopus components.

## Quick Start

### 1. Link the Shared Library

In your HTML `<head>`, include the octopus CSS library:

```html
<link rel="stylesheet" href="./assets/css/octopus/index.css">
```

This automatically loads:
- `octopus-variables.css` — Theme variables
- `octopus-animations.css` — Animations
- `octopus-base.css` — Base styles

### 2. Include Component CSS

Then include your specific octopus component CSS:

```html
<!-- Add after the shared library -->
<link rel="stylesheet" href="./assets/octopus-02-tenacles/octopus.css">
```

### Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Octopus Components</title>

  <!-- Shared octopus CSS library (base + variables + animations) -->
  <link rel="stylesheet" href="./assets/css/octopus/index.css">

  <!-- Component-specific CSS -->
  <link rel="stylesheet" href="./assets/octopus-02-tenacles/octopus.css">
</head>
<body>
  <octopus-stage></octopus-stage>
  <script src="./assets/octopus-02-tenacles/octopus.js"></script>
</body>
</html>
```

## File Organization

```
css/octopus/
├── index.css                    ← Import this file (orchestrator)
├── octopus-variables.css        ← Color, spacing, typography variables
├── octopus-animations.css       ← Shared animations & keyframes
├── octopus-base.css             ← Base styles (progress bar, typography, etc.)
└── README.md                    ← This file
```

## What's Shared

### Variables (`octopus-variables.css`)

All components can use these CSS custom properties:

```css
/* Colors */
--oct-bg              /* Primary background #030C10 */
--oct-teal            /* Muted teal #0D9488 */
--oct-teal-bright     /* Bright teal #2DD4BF */
--oct-green           /* Primary green #16A34A */
--oct-text            /* Light text #F0FDF4 */
--oct-dimmed          /* Dimmed text #6B7280 */

/* Typography */
--oct-font            /* 'Inter', -apple-system, sans-serif */
--oct-weight-bold     /* 700 */
--oct-weight-extrabold /* 800 */

/* Spacing */
--oct-spacing-xs      /* 4px */
--oct-spacing-md      /* 16px */
--oct-spacing-lg      /* 32px */

/* Animation */
--oct-duration-fast   /* 0.2s */
--oct-duration-slow   /* 0.8s */
--oct-easing-bounce   /* cubic-bezier(0.34, 1.56, 0.64, 1) */

/* And more... */
```

### Animations (`octopus-animations.css`)

Pre-built keyframe animations:

```css
@keyframes oct-pulse { }          /* Fading pulse */
@keyframes oct-fade-in { }        /* Fade in effect */
@keyframes oct-slide-in-left { }  /* Slide from left */
@keyframes oct-scale-in { }       /* Grow into view */
@keyframes oct-float { }          /* Subtle bobbing */
@keyframes oct-bounce { }         /* Bouncing effect */
/* ... and 12+ more animations */
```

Use with utility classes:

```html
<div class="oct-animate-pulse">Pulsing element</div>
<div class="oct-animate-float">Floating element</div>
<div class="oct-animate-fade-in">Fading in element</div>
```

### Base Styles (`octopus-base.css`)

Common styles applied to all octopus components:

- **Progress Bar** — `.oct-progress` (fixed top bar)
- **Typography** — `h1`, `h2`, `p` defaults
- **Buttons** — `.oct-btn`, `.oct-cta` styles
- **Canvas** — `canvas` base styling
- **Eyebrow Labels** — `.oct-eyebrow` styling
- **Scroll Cue** — `.oct-scroll-cue` animation
- **Utilities** — `.oct-text-center`, `.oct-no-scroll`, etc.

## Customization

### Override Variables

Create your own CSS and override variables:

```css
/* your-styles.css */
:root {
  --oct-primary: #FF00FF;        /* New primary color */
  --oct-text: #FFFFFF;           /* New text color */
  --oct-duration-slow: 1.2s;     /* Slower animations */
}
```

Then include it AFTER the octopus library:

```html
<link rel="stylesheet" href="./assets/css/octopus/index.css">
<link rel="stylesheet" href="./your-styles.css">
```

### Override Component Styles

Component CSS can override shared styles:

```css
/* octopus-02-tenacles/octopus.css */

/* Override the base progress bar */
octopus-stage .oct-progress {
  background: var(--oct-teal-bright);  /* Different color */
  height: 3px;                          /* Different size */
}
```

### Add Custom Animations

Add custom animations to your component CSS:

```css
/* octopus-03-hero/octopus-hero.css */

@keyframes oct-custom-glow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.oct-element {
  animation: oct-custom-glow 2s infinite;
}
```

## CSS Variable Reference

### Colors

| Variable | Value | Use Case |
|----------|-------|----------|
| `--oct-bg` | #030C10 | Primary background |
| `--oct-teal` | #0D9488 | Muted accent color |
| `--oct-teal-bright` | #2DD4BF | Bright highlights |
| `--oct-green` | #16A34A | CTA buttons |
| `--oct-text` | #F0FDF4 | Primary text |
| `--oct-dimmed` | #6B7280 | Secondary text |

### Spacing

| Variable | Value | Use Case |
|----------|-------|----------|
| `--oct-spacing-xs` | 4px | Tiny gaps |
| `--oct-spacing-sm` | 8px | Small gaps |
| `--oct-spacing-md` | 16px | Medium gaps |
| `--oct-spacing-lg` | 32px | Large padding |
| `--oct-spacing-xl` | 60px | Section padding |

### Animation Timing

| Variable | Value | Use Case |
|----------|-------|----------|
| `--oct-duration-fast` | 0.2s | Quick transitions |
| `--oct-duration-normal` | 0.3s | Standard transitions |
| `--oct-duration-slow` | 0.8s | Slow animations |
| `--oct-duration-very-slow` | 2.2s | Very slow animations |

### Border Radius

| Variable | Value | Use Case |
|----------|-------|----------|
| `--oct-radius-sm` | 7px | Buttons, small elements |
| `--oct-radius-md` | 10px | Medium buttons |
| `--oct-radius-lg` | 12px | Cards, containers |
| `--oct-radius-full` | 99px | Pill-shaped elements |

## Best Practices

### ✅ Do This

```css
/* Use CSS variables */
.oct-element {
  background: var(--oct-bg);
  color: var(--oct-text);
  padding: var(--oct-spacing-lg);
  transition: opacity var(--oct-duration-normal);
}

/* Use shared animations */
.oct-element {
  animation: oct-pulse var(--oct-duration-very-slow) infinite;
}

/* Use utility classes */
<div class="oct-animate-fade-in">Content</div>
```

### ❌ Don't Do This

```css
/* Hard-coded colors */
.oct-element {
  background: #030C10;  /* Use variable instead */
  color: #F0FDF4;       /* Use variable instead */
}

/* Custom animations instead of shared */
@keyframes my-pulse {   /* Use oct-pulse instead */
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
```

## Animations Quick Reference

| Name | Duration | Effect |
|------|----------|--------|
| `oct-pulse` | 2.2s | Fading pulse effect |
| `oct-fade-in` | 0.3s | Fade in from transparent |
| `oct-slide-in-left` | 0.3s | Slide in from left |
| `oct-slide-in-right` | 0.3s | Slide in from right |
| `oct-scale-in` | 0.3s | Grow into view |
| `oct-float` | 2.2s | Subtle up/down movement |
| `oct-bounce` | default | Bouncing effect |
| `oct-rotate` | 2s | Full rotation |
| `oct-wave` | default | Horizontal wave |
| `oct-cue` | 2.2s | Scroll cue animation |

## Browser Support

- Chrome/Edge 76+
- Firefox 63+
- Safari 12+
- Requires CSS Custom Properties (CSS Variables)

## File Sizes

| File | Size | Purpose |
|------|------|---------|
| `octopus-variables.css` | ~3 KB | Theme variables |
| `octopus-animations.css` | ~4 KB | Animations |
| `octopus-base.css` | ~5 KB | Base styles |
| `index.css` | <1 KB | Import orchestrator |
| **Total** | **~12 KB** | Combined shared CSS |

## Troubleshooting

### Styles not applying?

1. **Check import order** — Shared CSS must come BEFORE component CSS
2. **Check specificity** — Component CSS selector might be more specific
3. **Check variable names** — Verify you're using correct `--oct-*` names
4. **Check browser cache** — Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Variables not working?

- Ensure `octopus-variables.css` is imported
- Verify CSS custom properties are supported (IE11 doesn't support)
- Check `--oct-*` variable names are spelled correctly

### Animations stuttering?

- Check browser performance (DevTools → Performance)
- Reduce animation complexity
- Try `transform` instead of `left`/`top` for better performance

## Contributing

To add a new shared animation or variable:

1. Add to `octopus-variables.css` (variables) or `octopus-animations.css` (animations)
2. Document it in the relevant Reference section in this README
3. Update both octopus components to use it if applicable
4. Test in all target browsers

## File Locations

```
C:\CoWork\WebSite\src\assets\css\octopus\
├── index.css
├── octopus-variables.css
├── octopus-animations.css
├── octopus-base.css
└── README.md

C:\CoWork\WebSite\src\assets\octopus-02-tenacles\
├── octopus.js
├── octopus.css          (component-specific styles)
├── octopus-head.png
├── demo.html
└── ...

C:\CoWork\WebSite\src\assets\octopus-03-hero\
├── octopus-hero.js
├── octopus-hero.css     (component-specific styles)
├── octopus-head.png
├── demo.html
└── ...
```

## Version

**Version:** 1.0  
**Last Updated:** April 2026  
**Status:** Production Ready

---

For more information, see:
- [Component Pattern Guide](../OCTOPUS-COMPONENT-PATTERN.md)
- [Comparison & Unification](../OCTOPUS-COMPARISON.md)
- Individual component READMEs
