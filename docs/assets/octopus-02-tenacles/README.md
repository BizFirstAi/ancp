# Octopus Orchestration Engine

## Overview

The **Octopus** is a premium animated web component that visualizes BizFirstAi's orchestration capabilities. It features a central octopus with 8 dynamically connected arms, each representing one of BizFirstAi's core products. The component is fully interactive with mouse following, scroll responsiveness, and smooth animations.

## Purpose

The octopus visualization demonstrates:

1. **Product Connectivity** — 8 tentacles represent 8 interconnected products
2. **AI Orchestration** — Shows how products connect and flow together
3. **Visual Engagement** — Captures attention with smooth, organic animations
4. **Interactivity** — Responds to mouse movement and scroll position

## Key Features

- **8 Product Tentacles** — Each product labeled and positioned around the octopus
- **Mouse Following** — Tentacles respond to cursor position
- **Scroll Interaction** — Products light up as user scrolls
- **Atmospheric Effects** — Radial gradients and bubble particles
- **Suction Cup Details** — Realistic tentacle texturing with scatter and ring effects
- **Smooth Animation** — 60fps requestAnimationFrame-based rendering
- **Responsive** — Works across all modern browsers

## How It Works

### Canvas Rendering

The component uses HTML5 Canvas for all animations:

```
<octopus-stage>
  ├─ Progress bar (top, fixed)
  ├─ Intro section (hero content)
  ├─ Sticky canvas container
  │  └─ Canvas (full screen animation)
  ├─ Product labels (positioned around canvas)
  └─ Outro section (content below)
```

**Canvas Features:**
- Single responsive canvas filling the viewport
- Opaque background (#030C10) managed via canvas fill
- Atmospheric gradient effects for depth
- Bubble particles for visual interest

### Animation Architecture

**Components:**
1. **Octopus Body** — Central image with glow effects
   - Breathing animation
   - Drift movements
   - Lean response to mouse position
   - Wobble rotation
   - Scale changes with scroll progress

2. **Tentacles** — 8 curved appendages
   - Cubic Bezier curve paths
   - Wave animations
   - Extension based on scroll position
   - Suction cup scatter effects
   - Detail ring rendering

3. **Products** — Product labels orbiting the octopus
   - Positioned at angles around body
   - Appear/disappear based on scroll progress
   - Stage-based visibility (Resting → Connecting → Orchestrating → Fully connected)

4. **Bubbles** — 28 animated particles
   - Rise upward over time
   - Float with horizontal drift
   - Responsive opacity
   - Auto-respawn at bottom

5. **Atmosphere** — Background effects
   - Radial gradient for depth
   - Subtle light animation
   - Creates immersive ocean feeling

### Scroll Synchronization

The component tracks scroll position and:
- Updates progress bar (top of page)
- Changes stage label (Resting → Connecting → Orchestrating → Fully connected)
- Lights up product labels in sequence
- Extends tentacles gradually
- Changes octopus scale

### Performance Optimization

1. **Canvas Rendering** — Uses requestAnimationFrame (60fps cap)
2. **Efficient Drawing** — Minimal state changes between frames
3. **Precalculated Values** — Tentacle edges computed once, reused
4. **32 Bubbles** — Limited particle count for performance
5. **Debounced Resize** — Prevents excessive recalculations

### Browser Compatibility

- Chrome/Edge 76+
- Firefox 63+
- Safari 12+
- Requires HTML5 Canvas support
- Works best with hardware acceleration enabled

## Usage

### Basic Setup (2 steps)

**1. Add the script to your HTML:**
```html
<script src="./path/to/octopus-02-tenacles/octopus.js"></script>
```

**2. Place the component:**
```html
<octopus-stage></octopus-stage>
```

That's it! The component:
- Auto-loads its CSS stylesheet
- Auto-loads Google Fonts (Inter)
- Builds its entire DOM structure
- Manages all animation and interactions

### Complete Minimal Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Octopus Orchestration Engine</title>
</head>
<body style="margin:0;padding:0;">

  <!-- Single component tag -->
  <octopus-stage></octopus-stage>

  <!-- Load the component -->
  <script src="./octopus-02-tenacles/octopus.js"></script>

</body>
</html>
```

## Customization

### Changing Colors

Edit `octopus.js` and modify the gradient colors in `_drawTentacle()` and `_drawBody()`:

```javascript
// In _drawTentacle() method (around line 272)
var grad = ctx.createLinearGradient(bx, by, ex, ey);
grad.addColorStop(0,    'rgba(18, 95,  75, 0.96)');  // Start color
grad.addColorStop(0.35, 'rgba(14, 78,  60, 0.90)');  // Mid color
grad.addColorStop(0.68, 'rgba(9,  54,  42, 0.65)');  // End color
grad.addColorStop(1,    'rgba(5,  32,  26, 0.00)');  // Fade out
```

### Adjusting Animation Speed

Modify these constants in `octopus.js`:

```javascript
// Wave motion speed (line 251)
var waveV = Math.sin(2.2*T - 3.5*phase) * waveA * (0.5 + 0.5*ext);
// Change 2.2 and 3.5 to adjust wave speed

// Bend animation (line 261)
var bendAmp = Math.sin(1.4*T + phase*1.7) * waveA * 1.4;
// Change 1.4 and 1.7 to adjust bend speed

// Body bobbing (line 327)
var bob = Math.sin(T*0.71)*5 + Math.sin(T*0.29)*3;
// Change 0.71 and 0.29 for different bobbing rates
```

### Changing Product Data

Modify the `PRODUCTS` array (line 48):

```javascript
const PRODUCTS = [
  { name: 'Flow',                  tag: 'Workflow automation',   angle: -Math.PI * 0.82 },
  { name: 'ANCP',                  tag: 'AI agent protocol',     angle: -Math.PI * 0.52 },
  // ... more products
];
```

**Angle Reference:**
- `-Math.PI * 0.82` = top-left
- `-Math.PI * 0.52` = left
- `0` = right
- `Math.PI * 0.36` = bottom-right

### Changing Canvas Background

Modify the background color (line 377):

```javascript
// In _render() method
ctx.fillStyle = '#030C10';  // Change this hex code
ctx.fillRect(0, 0, this._W, this._H);
```

### Changing Tentacle Count

Edit the `PRODUCTS` array length. Currently has 8 products, which draws 8 tentacles.

## File Structure

```
octopus-02-tenacles/
├── octopus.js           ← Main component (monolithic, ~390 lines)
├── octopus.css          ← Styling (scoped to octopus-stage)
├── octopus-head.png     ← Octopus image asset (1.3 MB)
├── demo.html            ← Working example
└── README.md            ← This file
```

## Technical Implementation

### Canvas Architecture

The component renders to a single full-screen canvas:

```javascript
// Canvas setup (line 144-146)
this._canvas  = this.querySelector('canvas');
this._ctx     = this._canvas.getContext('2d');
this._W  = this._canvas.width  = window.innerWidth;
this._H  = this._canvas.height = window.innerHeight;
```

### Tentacle Rendering

Tentacles use cubic Bezier curves for smooth paths:

```javascript
_cubicBez(p0, p1, p2, p3, t) {
  // Calculates point on cubic Bezier curve
  var m = 1 - t;
  return {
    x: m*m*m*p0.x + 3*m*m*t*p1.x + 3*m*t*t*p2.x + t*t*t*p3.x,
    y: m*m*m*p0.y + 3*m*m*t*p1.y + 3*m*t*t*p2.y + t*t*t*p3.y,
  };
}
```

### Tentacle Edges (Left/Right)

For each tentacle, left and right edges are calculated to create width:

```javascript
_tentacleEdges(p0, cp1, cp2, pe, baseHW) {
  // Returns L[] and R[] arrays
  // L = left edge points (with normals for scatter effects)
  // R = right edge points
  // baseHW = half-width that tapers toward tentacle tip
}
```

### Suction Cup Effects

Two rendering passes create detailed tentacle appearance:

```javascript
// Scatter effect (line 291-305)
if (ext > 0.05) {
  // Small floating circles along tentacle
}

// Suction cup rings (line 307-319)
if (ext > 0.08) {
  // Detailed ring structures on tentacle surface
}
```

## Performance Tips

1. **Close other tabs** — Reduces browser load
2. **Use modern browser** — Chrome/Firefox/Safari latest
3. **Enable hardware acceleration** — Browser settings
4. **Monitor DevTools** — Performance tab shows FPS
5. **Reduce animation on slower devices** — Modify animation constants

## Browser DevTools Debugging

**Check FPS:**
1. Open DevTools (F12)
2. Go to Performance tab
3. Record while scrolling
4. Check for frame rate (target: 60fps)

**Check console for errors:**
```
F12 → Console → Look for red error messages
```

**Monitor memory:**
```
F12 → Memory → Take heap snapshot
Look for memory growth during animation
```

## Common Issues

**Issue: No octopus appears**
- Check browser console (F12) for errors
- Verify script path is correct
- Ensure octopus-head.png is in same directory
- Try refreshing page (Ctrl+F5)

**Issue: Animation is choppy/stuttering**
- Close other browser tabs
- Try in a different browser
- Check if other heavy JS is running
- Reduce animation complexity (modify constants)

**Issue: Products not lighting up on scroll**
- Scroll down page (should happen gradually)
- Check scroll distance (needs full viewport height to trigger)
- Verify scroll event is firing (F12 console)

## API Reference

### Custom Element
```javascript
<octopus-stage></octopus-stage>
```

### Component Lifecycle
```javascript
// Triggered when added to DOM
connectedCallback() { }

// Triggered when removed from DOM
disconnectedCallback() { }
```

### No public API methods
This component is self-contained. All animations and interactions are internal.

## Testing

Open `demo.html` in a browser:

```
file:///path/to/octopus-02-tenacles/demo.html
```

Verify:
- Octopus renders with 8 tentacles
- Tentacles wave smoothly
- Scroll to see tentacles extend
- Product labels appear as you scroll
- Hover/move mouse to see tentacle response
- Progress bar at top shows scroll progress
- No console errors (F12)

## Future Enhancements

Potential improvements:

- **Touch gesture support** for mobile
- **WebGL renderer** for advanced effects
- **Particle effects** during tentacle extension
- **Sound effects** coordination with animation
- **Configurable product count** (6, 8, 10, etc.)
- **Theme variations** (dark/light modes)
- **Performance profiling** utilities
- **Unit tests** for calculation methods

## Credits

**Component:** Octopus Orchestration Engine  
**Technology:** HTML5 Canvas + Web Components  
**For:** BizFirstAi Platform  
**Version:** 1.0  
**Last Updated:** April 2026

---

*This component is part of the BizFirstAi marketing website, designed to visualize the platform's orchestration capabilities with engaging animations and interactivity.*
