# Octopus Component Pattern Guide

## Standard Pattern for BizFirstAi Octopus Components

This guide defines the unified standard for all octopus animation components in the BizFirstAi codebase.

---

## 1. Naming Convention

### Component Element Name

```javascript
// Pattern: <octopus-[purpose]>
// Examples:
<octopus-stage>              // Orchestration engine (octopus-02)
<octopus-hero-section>       // Hero section (octopus-03)
<octopus-loader>             // Loading animation
<octopus-background>         // Background effect
```

**Rules:**
- Always use `octopus-` prefix
- Use kebab-case for multi-word names
- Name should describe primary purpose
- Avoid abbreviations

### CSS Class Prefix

```css
/* Pattern: .oct-[element][__modifier][--variant] */

/* ✅ Good */
.oct-canvas-container { }
.oct-progress-bar { }
.oct-header__logo { }
.oct-button--primary { }

/* ❌ Avoid */
.octopus-container { }  /* Too verbose */
.oct { }                /* Too short */
.oh-background { }      /* Wrong prefix */
```

**Rules:**
- All octopus components use `oct-` prefix
- Follow BEM syntax for modifiers and variants
- Use `__` for child elements
- Use `--` for variants/states
- Never use `oh-` (legacy octopus-03)

### CSS Custom Properties

```css
/* Pattern: --oct-[category]-[variant] */

:root {
  /* Colors */
  --oct-primary:      #2DD4BF;
  --oct-primary-dark: #0D9488;
  --oct-glow:         rgba(45,212,191,0.22);
  
  /* Spacing */
  --oct-spacing-xs:   4px;
  --oct-spacing-sm:   8px;
  --oct-spacing-md:   16px;
  
  /* Animation */
  --oct-duration-fast: 0.3s;
  --oct-duration-norm: 0.8s;
  --oct-easing: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

**Rules:**
- Use `--oct-` prefix
- Group by category (colors, spacing, animation)
- Use descriptive names (not `--oct-c1`, `--oct-s1`)
- Provide fallback colors in CSS

---

## 2. File Organization

### Standard Directory Structure

```
octopus-[name]/
├── octopus-[name].js           Main component file
├── octopus-[name].css          Styling (scoped)
├── [asset-name].png            Image assets
├── demo.html                   Working demo/test
├── README.md                   Technical documentation
├── USAGE.md                    Integration guide
└── [optional docs]
```

### Filename Pattern

```javascript
// ✅ Good
octopus-stage.js
octopus-hero-section.js
octopus-loader.js

// ❌ Avoid
octopus.js              // Too generic
octopusStage.js         // Use kebab-case
octopus_stage.js        // Use kebab-case
component.js            // Needs octopus prefix
```

---

## 3. JavaScript Code Structure

### Class Definition

```javascript
class OctopusComponentName extends HTMLElement {
  constructor() {
    super();
    // Initialize properties
    this._canvas = null;
    this._ctx = null;
    this._rafId = null;
  }

  connectedCallback() {
    // Setup: build DOM, bind events, start animation
    this._build();
    this._bindEvents();
    this._resize();
    this._render();
  }

  disconnectedCallback() {
    // Cleanup: remove listeners, cancel animation
    this._unbindEvents();
    if (this._rafId) cancelAnimationFrame(this._rafId);
  }

  // ── DOM Building ───────────────────────
  _build() { }
  _buildHTML() { }
  _cacheDOM() { }

  // ── Event Handling ─────────────────────
  _bindEvents() { }
  _unbindEvents() { }
  _onScroll() { }
  _onResize() { }

  // ── Animation & Rendering ─────────────
  _render() { }
  _drawContent() { }
  _updateState() { }

  // ── Utilities ──────────────────────────
  _calculateValue() { }
  _resetState() { }
}

// Register component
if (!customElements.get('octopus-[name]')) {
  customElements.define('octopus-[name]', OctopusComponentName);
}
```

### Method Naming Convention

```javascript
// Pattern: _verb + noun

// Building methods
_build()          // Main setup
_buildHTML()      // Construct HTML string
_cacheDOM()       // Store DOM references

// Event handlers
_bindEvents()     // Attach listeners
_unbindEvents()   // Remove listeners
_onScroll()       // Handle scroll event
_onResize()       // Handle resize event
_onMouseMove()    // Handle mouse move

// Rendering
_render()         // Main animation loop
_drawShape()      // Draw specific shape
_updateState()    // Update internal state
_calculateValue() // Pure calculation

// Utilities
_reset()          // Reset to initial state
_cleanup()        // Cleanup resources
```

### Configuration Pattern

```javascript
// All animation parameters in CONFIG object
const CONFIG = {
  CANVAS: {
    BACKGROUND: '#030C10',
    STEPS_PER_TENTACLE: 56,
  },
  ANIMATION: {
    WAVE_FREQUENCY: 0.25,
    BASE_AMPLITUDE: 40,
    DURATION: 0.8,
  },
  SCROLL: {
    THRESHOLD_SECTION1: 0.3,
    THRESHOLD_SECTION2: 0.6,
  },
};
```

**Rules:**
- All constants in CONFIG object
- Group related settings
- Use UPPER_CASE for keys
- Document unit/range (frequency, amplitude, duration)
- Easy to customize without changing logic

### Module Pattern Options

Choose one approach for your component:

**Option A: Direct Class Definition (Recommended)**
```javascript
class OctopusStage extends HTMLElement { }
customElements.define('octopus-stage', OctopusStage);
```

Pros: Modern, clean, testable  
Cons: Requires module context

**Option B: IIFE Wrapper (Legacy Support)**
```javascript
(function() {
  class OctopusStage extends HTMLElement { }
  customElements.define('octopus-stage', OctopusStage);
})();
```

Pros: Namespace isolation, no module needed  
Cons: Less modern, harder to debug

---

## 4. CSS Styling

### Structure

```css
/*
 * octopus-[name].css — Description
 * Scoped to <octopus-[name]> custom element.
 */

/* ── CSS Custom Properties ────────────── */
:root {
  --oct-primary: #2DD4BF;
  /* ... more variables */
}

/* ── Host Element ─────────────────────── */
octopus-[name] {
  display: block;
  font-family: var(--oct-font);
  -webkit-font-smoothing: antialiased;
}

/* ── Section 1 ────────────────────────── */
octopus-[name] .oct-section-1 {
  position: relative;
  height: 100vh;
}

/* ── Section 2 ────────────────────────── */
octopus-[name] .oct-section-2 {
  position: relative;
  height: 100vh;
}

/* ── Footer ───────────────────────────── */
octopus-[name] .oct-footer {
  padding: 60px 32px;
  text-align: center;
}
```

### Key Rules

```css
/* ✅ Do This */
octopus-[name] .oct-element { }       /* Scoped to component */
:root { --oct-color: #value; }        /* Use CSS variables */
transition: transform 0.8s ease;      /* Use easing functions */
transform-origin: center center;      /* Explicit origins */

/* ❌ Don't Do This */
.oct-element { }                      /* Not scoped, leaks styles */
color: #RGB;                          /* Hard-coded colors */
animation: auto;                      /* Vague animations */
transform: scale(1.5);                /* No origin specified */
```

### Animation Patterns

```css
/* Smooth transitions */
octopus-[name] .oct-element {
  transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-property: transform, opacity;
  transition-duration: 0.8s, 0.3s;
}

/* Keyframe animations */
@keyframes oct-pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.3; }
}

octopus-[name] .oct-element {
  animation: oct-pulse 2s ease-in-out infinite;
}
```

---

## 5. Documentation

### README.md Template

```markdown
# Octopus [Component Name]

## Overview
Brief description of what the component does and why.

## Purpose
1. Primary use case
2. Secondary use case
3. Unique features

## Key Features
- Feature 1
- Feature 2
- Feature 3

## How It Works
### Architecture
(Diagram or text description)

### Animation
(How animation works, key methods)

### Performance
(Optimization techniques)

## Usage
### Basic Setup
Two-step integration

### Complete Example
Full HTML example

## Customization
- Changing colors
- Adjusting speeds
- Modifying data

## File Structure
Directory layout with descriptions

## Technical Details
Deep dive into implementation

## Browser Support
Compatibility table

## Credits
Version, date, team info
```

### USAGE.md Template

```markdown
# [Component Name] — Integration Guide

## Quick Start
2-minute setup

## Full Integration Guide
Detailed setup for new/existing projects

## Customization
- Colors
- Animation speeds
- Configuration options

## CSS Customization
CSS variable overrides

## Troubleshooting
Common problems and solutions

## Testing Checklist
Verification steps

## Performance Tips
Optimization advice

## Integration Examples
Real-world use cases

## File Reference
Size and purpose of each file

## Next Steps
Getting started guide
```

### CODE-REVIEW.md (Optional)

For complex components:
- Code quality assessment
- Performance analysis
- Refactoring recommendations
- Action items prioritized

---

## 6. Canvas Rendering

### Pattern for Canvas Setup

```javascript
_setupCanvases() {
  this._canvases = [];
  const canvases = this.querySelectorAll('canvas');
  
  canvases.forEach((canvas) => {
    canvas.width = this._W;
    canvas.height = this._H;
    
    this._canvases.push({
      element: canvas,
      ctx: canvas.getContext('2d'),
      // Optional: store purpose or section info
    });
  });
}
```

### Transparent Canvas Pattern

```javascript
// For flexible background control via CSS
_render() {
  // Clear canvas (transparent)
  ctx.clearRect(0, 0, this._W, this._H);
  
  // Draw octopus/content
  this._drawContent();
  
  // Background controlled via CSS .oct-background container
}
```

### Opaque Canvas Pattern

```javascript
// For complete control via canvas
_render() {
  // Fill with background color
  ctx.fillStyle = '#030C10';
  ctx.fillRect(0, 0, this._W, this._H);
  
  // Draw octopus/content
  this._drawContent();
}
```

**Choose one approach consistently:**
- **Transparent:** More flexible, easier CSS customization
- **Opaque:** More control, fewer dependencies

---

## 7. Performance Guidelines

### Do

✅ Use requestAnimationFrame for animations  
✅ Cache DOM references in variables  
✅ Minimize state changes per frame  
✅ Use efficient math operations  
✅ Debounce resize events  
✅ Lazy-load images  
✅ Cancel RAF on component removal  

### Don't

❌ Manipulate DOM in animation loop  
❌ Query DOM repeatedly (cache references)  
❌ Use expensive calculations per frame  
❌ Create objects in animation loop  
❌ Use setInterval/setTimeout for animation  
❌ Leak memory with event listeners  

### Example: Efficient Animation Loop

```javascript
_render() {
  // Update time
  this._T += 0.016;  // ~60fps
  
  // Update state
  const scrollTop = window.pageYOffset;  // Cache
  this._updateState(scrollTop);
  
  // Render
  this._drawFrame();
  
  // Schedule next frame
  this._rafId = requestAnimationFrame(() => this._render());
}
```

---

## 8. Responsive Design

### Viewport Handling

```javascript
_resize() {
  this._W = window.innerWidth;
  this._H = window.innerHeight;
  this._cx = this._W * 0.5;
  this._cy = this._H * 0.5;
  
  // Update canvases
  this._setupCanvases();
  
  // Reset state based on new dimensions
  this._resetState();
}
```

### Mobile Considerations

```javascript
const isMobile = window.innerWidth < 768;

if (!isMobile) {
  // Full experience
  this._render();
} else {
  // Simplified or disabled
  // This component is desktop-optimized
}
```

---

## 9. Testing

### Browser Support

Target modern browsers:
```
Chrome/Edge 76+
Firefox 63+
Safari 12+
Requires: ES6 classes, Canvas, requestAnimationFrame
```

### Verification Checklist

- [ ] Component renders without errors
- [ ] Animation is smooth (60fps)
- [ ] No memory leaks (DevTools Memory)
- [ ] Responsive to window resize
- [ ] Scroll events handled correctly
- [ ] Works in target browsers
- [ ] CSS is properly scoped
- [ ] No console errors

---

## 10. Example Components

### octopus-02-tenacles

**Pattern Used:**
- IIFE module pattern
- Opaque canvas rendering
- Single full-screen canvas
- Product-focused configuration

**Key Characteristics:**
- Monolithic single-file design
- Auto-loads CSS and fonts
- 8 product connections
- Atmospheric effects

**Naming:**
- Component: `<octopus-stage>`
- CSS prefix: `oct-`
- Classes: `.oct-intro`, `.oct-canvas`, etc.

### octopus-03-hero

**Pattern Used:**
- Direct class definition
- Transparent canvas rendering
- Multi-canvas pane system
- Scroll-interactive configuration

**Key Characteristics:**
- Modular separate files
- External CSS/fonts
- Hero section focused
- Comprehensive documentation

**Naming:**
- Component: `<octopus-hero-section>`
- CSS prefix: `oct-` (unified)
- Classes: `.oct-section-1`, `.oct-hero`, etc.

---

## 11. Migration Guide (Legacy → Standard)

If updating an older component:

### 1. Class Naming
```javascript
// Old
class OctopusHero extends HTMLElement { }

// New
class OctopusHeroSection extends HTMLElement { }

// Update custom element too
customElements.define('octopus-hero-section', OctopusHeroSection);
```

### 2. CSS Prefix
```css
/* Old */
.oh-background { }
--oh-primary: #value;

/* New */
.oct-background { }
--oct-primary: #value;
```

### 3. Documentation
Add README.md and USAGE.md if missing.

### 4. File Organization
Ensure all files in consistent directory structure.

---

## Quick Checklist for New Components

- [ ] Component element: `<octopus-[purpose]>`
- [ ] Class name: `Octopus[PurposeName]`
- [ ] CSS prefix: `.oct-`
- [ ] CSS variables: `--oct-`
- [ ] Directory: `octopus-[name]/`
- [ ] Files: `.js`, `.css`, `.png`, `demo.html`, `README.md`, `USAGE.md`
- [ ] Configuration: CONFIG object with all parameters
- [ ] Method names: `_verb + noun` pattern
- [ ] Documentation: README + USAGE + optional CODE-REVIEW
- [ ] Scoped CSS: All selectors prefixed with `octopus-[name]`
- [ ] Performance: RAF, cached DOM, efficient math
- [ ] Testing: Works in Chrome, Firefox, Safari

---

## Examples

### Create a New Component

```bash
mkdir octopus-loader
cd octopus-loader

# Create files
touch octopus-loader.js
touch octopus-loader.css
touch demo.html
touch README.md
touch USAGE.md
```

### Component Boilerplate

See example implementations:
- `octopus-02-tenacles/octopus.js` — IIFE pattern
- `octopus-03-hero/octopus-hero.js` — Modern pattern

---

## Versioning

Track changes for each component:

```javascript
// In octopus-[name].js
const COMPONENT_VERSION = '1.0';
const LAST_UPDATED = 'April 2026';
```

Update README.md:
```markdown
## Version History

### 1.0 (April 2026)
- Initial release
- 8 tentacles
- Scroll interaction
```

---

## Reference

**Related Documents:**
- OCTOPUS-COMPARISON.md — Comparison analysis
- octopus-02-tenacles/README.md — Example implementation
- octopus-03-hero/README.md — Example implementation

**Standards Applied:**
- Web Components (ES6 Custom Elements)
- BEM CSS methodology
- Semantic versioning
- Feature parity across components

---

**Last Updated:** April 2026  
**Version:** 1.0  
**Status:** Standard Pattern
