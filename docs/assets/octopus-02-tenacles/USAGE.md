# Octopus Component — Integration Guide

A complete guide for adding the Octopus orchestration visualization to your BizFirstAi project.

## Quick Start (2 minutes)

### Step 1: Copy the script

```html
<script src="./path/to/octopus-02-tenacles/octopus.js"></script>
```

### Step 2: Add the component

```html
<octopus-stage></octopus-stage>
```

Done! The component auto-loads CSS, fonts, and builds itself.

---

## Full Integration Guide

### For New Projects

**1. Create a simple HTML file:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BizFirstAi — Octopus Engine</title>
</head>
<body style="margin:0; padding:0; background:#030C10;">

  <!-- The octopus component -->
  <octopus-stage></octopus-stage>

  <!-- Load the component (auto-loads CSS and fonts) -->
  <script src="./octopus-02-tenacles/octopus.js"></script>

</body>
</html>
```

**2. Ensure files are in correct location:**

```
your-project/
├── index.html
└── octopus-02-tenacles/
    ├── octopus.js
    ├── octopus.css
    ├── octopus-head.png
    └── demo.html
```

**3. Open in browser and verify:**
- Octopus displays with 8 tentacles
- Tentacles wave smoothly
- Products visible around the octopus

---

### For Existing Projects

**1. Copy the octopus-02-tenacles folder:**

```
your-website/
├── index.html
├── about.html
├── assets/
│   ├── images/
│   ├── css/
│   └── octopus-02-tenacles/    ← Copy here
│       ├── octopus.js
│       ├── octopus.css
│       ├── octopus-head.png
│       └── demo.html
└── js/
```

**2. Add to your existing HTML pages:**

```html
<head>
  <!-- Your existing styles -->
  <link rel="stylesheet" href="./assets/css/main.css">
</head>

<body>
  <!-- Add octopus at the top -->
  <octopus-stage></octopus-stage>

  <!-- Rest of your content -->
  <section class="features">
    <!-- ... -->
  </section>

  <!-- Load octopus at end of body -->
  <script src="./assets/octopus-02-tenacles/octopus.js"></script>

  <!-- Your other scripts -->
  <script src="./assets/js/app.js"></script>
</body>
```

**3. Verify CSS doesn't conflict:**

The component is scoped to `octopus-stage`, so it won't interfere with your existing styles.

---

## How It Auto-Loads

The octopus component automatically:

1. **Finds its directory** — Uses `document.currentScript` to locate itself
2. **Loads CSS** — Injects `octopus.css` stylesheet into `<head>`
3. **Loads fonts** — Injects Google Fonts Inter if not already present
4. **Builds HTML** — Creates full DOM structure (intro, canvas, outro, labels)
5. **Initializes animation** — Starts requestAnimationFrame loop

You only need to include the `<script>` tag. Everything else happens automatically.

---

## Customization

### Changing Colors (Product Octopus Colors)

Edit `octopus.js` and find `_drawTentacle()` method:

```javascript
// Around line 272
var grad = ctx.createLinearGradient(bx, by, ex, ey);
grad.addColorStop(0,    'rgba(18, 95,  75, 0.96)');  // Start
grad.addColorStop(0.35, 'rgba(14, 78,  60, 0.90)');  // Mid
grad.addColorStop(0.68, 'rgba(9,  54,  42, 0.65)');  // Fade
grad.addColorStop(1,    'rgba(5,  32,  26, 0.00)');  // Transparent
```

Change the RGB values to your brand colors.

Also find `_drawBody()` (around line 346) and update glow colors:

```javascript
var grd = ctx.createRadialGradient(0,0,half*0.1,0,0,glowRadius);
grd.addColorStop(0,   'rgba(45,212,191,' + glowAlpha + ')');   // Inner glow
grd.addColorStop(0.5, 'rgba(13,148,136,' + (glowAlpha*0.4).toFixed(3) + ')');
grd.addColorStop(1,   'rgba(13,148,136,0)');  // Outer fade
```

### Changing Product Information

Edit the `PRODUCTS` array (line 48):

```javascript
const PRODUCTS = [
  { name: 'Your Product 1',  tag: 'Your tag',        angle: -Math.PI * 0.82 },
  { name: 'Your Product 2',  tag: 'Your tag',        angle: -Math.PI * 0.52 },
  { name: 'Your Product 3',  tag: 'Your tag',        angle: -Math.PI * 0.20 },
  { name: 'Your Product 4',  tag: 'Your tag',        angle:  Math.PI * 0.10 },
  { name: 'Your Product 5',  tag: 'Your tag',        angle:  Math.PI * 0.36 },
  { name: 'Your Product 6',  tag: 'Your tag',        angle:  Math.PI * 0.62 },
  { name: 'Your Product 7',  tag: 'Your tag',        angle:  Math.PI * 0.86 },
  { name: 'Your Product 8',  tag: 'Your tag',        angle: -Math.PI * 0.98 },
];
```

**Angle Guide:**
- `-Math.PI * 0.98` = Top (almost directly up)
- `-Math.PI * 0.82` = Top-left
- `-Math.PI * 0.52` = Left
- `-Math.PI * 0.20` = Bottom-left
- `0` = Right
- `Math.PI * 0.10` = Bottom-right
- `Math.PI * 0.36` = Bottom
- `Math.PI * 0.62` = Bottom-left corner
- `Math.PI * 0.86` = Top-right

### Changing Background Color

Find `_render()` method (around line 377):

```javascript
ctx.fillStyle = '#030C10';  // Change this color
ctx.fillRect(0, 0, this._W, this._H);
```

### Adjusting Animation Speed

Find `_drawTentacle()` and modify:

```javascript
var waveV = Math.sin(2.2*T - 3.5*phase) * waveA * (0.5 + 0.5*ext);
                    ^^^ change 2.2 to slower (1.5) or faster (3.0)
                          change 3.5 to slower (2.0) or faster (5.0)
```

### Changing Text (Stage Labels, Section Text)

Edit these constants:

```javascript
// Line 59
const STAGE_LABELS = ['Resting…', 'Connecting…', 'Orchestrating…', 'Fully connected'];
```

### Changing Scroll Behavior

Modify how tentacles extend based on scroll:

```javascript
// Around line 246
var tStart= idx / PRODUCTS.length * 0.66 + 0.02;  // Start threshold
var ext   = Math.max(0, Math.min(1, (this._scrollProg - tStart) / 0.32));  // 0.32 = duration
```

Increase `0.32` to make extension happen over longer scroll distance.

---

## CSS Customization

### Overriding Styles

The component auto-loads `octopus.css`, which is scoped to `octopus-stage`. If you need to override styles, add your own stylesheet AFTER the octopus loads:

```html
<script src="./octopus-02-tenacles/octopus.js"></script>

<style>
  /* Override octopus colors */
  :root {
    --oct-bg: #000000;
    --oct-teal-bright: #FF00FF;
  }
  
  /* Change text styles */
  octopus-stage .oct-intro h1 {
    font-size: 72px;
    color: #FFFFFF;
  }
</style>
```

### Available CSS Variables

Edit `octopus.css` to change these:

```css
:root {
  --oct-bg:          #030C10;         /* Canvas background */
  --oct-teal:        #0D9488;         /* Primary teal */
  --oct-teal-bright: #2DD4BF;         /* Bright teal */
  --oct-teal-glow:   rgba(45,212,191,0.22);  /* Glow */
  --oct-text:        #F0FDFA;         /* Text color */
  --oct-dimmed:      #134E4A;         /* Muted text */
  --oct-vdimmed:     #042F2E;         /* Very muted */
  --oct-font:        'Inter', -apple-system, sans-serif;
}
```

---

## Troubleshooting

### Problem: No octopus appears

**Cause 1: Script not loading**
- Check browser console (F12) for 404 errors
- Verify script path is correct relative to HTML file
- Try absolute path instead of relative

**Cause 2: Image not found**
- Ensure `octopus-head.png` is in same folder as `octopus.js`
- Check browser console for image 404 errors
- The component won't render until image loads

**Cause 3: CSS not loading**
- Component auto-loads CSS, but check console for errors
- Try refreshing page (Ctrl+F5) to clear cache
- Check if CSS file exists in same directory

**Solution:**
```html
<!-- Check these paths match your file structure -->
<script src="./octopus-02-tenacles/octopus.js"></script>
<!-- Ensure these files exist in same folder:
  - octopus.css
  - octopus-head.png
-->
```

### Problem: Animation is choppy

**Cause 1: Other heavy JavaScript**
- Close other browser tabs
- Disable browser extensions
- Check DevTools Performance tab

**Cause 2: Slow device**
- Try reducing animation complexity by modifying `waveA` calculation
- Reduce particle count (28 bubbles)
- Use faster device or browser

**Cause 3: Vsync issues**
- Ensure monitor refresh rate is at least 60Hz
- Check browser hardware acceleration is enabled
- Try different browser

### Problem: Products aren't lighting up on scroll

**Cause 1: Not scrolling far enough**
- The component has a tall viewport (5x viewport height)
- Scroll slowly to watch products light up gradually
- Each product lights up at different scroll thresholds

**Cause 2: Scroll progress not calculating**
- Check browser console for errors
- Verify scroll event is firing (add `console.log()` to `_onScroll()`)
- Try in different browser

**Solution:**
In `_onScroll()` method, the scroll progress calculation:
```javascript
var rect  = this._outer.getBoundingClientRect();
var total = this._outer.offsetHeight - window.innerHeight;
this._scrollProg = Math.max(0, Math.min(1, -rect.top / total));
```

### Problem: Colors don't match my brand

**Solution 1: Update PRODUCTS array names**
```javascript
{ name: 'Your Product Name',  tag: 'Your tag',  angle: ... }
```

**Solution 2: Update gradient colors in _drawTentacle()**
```javascript
grad.addColorStop(0, 'rgba(R,G,B,A)');  // Your color
```

**Solution 3: Update CSS variables**
```css
--oct-teal-bright: #YOUR_HEX_COLOR;
--oct-bg: #YOUR_BACKGROUND;
```

---

## Testing Checklist

- [ ] Files copied to correct location
- [ ] Script tag added to HTML
- [ ] `octopus-head.png` in same directory as script
- [ ] Page loads with no console errors (F12)
- [ ] Octopus renders with 8 tentacles
- [ ] Tentacles wave smoothly (60fps)
- [ ] Scroll to see tentacles extend
- [ ] Products light up as you scroll
- [ ] Mouse movement affects tentacles
- [ ] Progress bar at top shows scroll progress
- [ ] Works in Chrome, Firefox, Safari
- [ ] Mobile: Component still displays (may be smaller)

---

## Performance Considerations

The component is optimized for 60fps but keeps in mind:

1. **Canvas rendering** — Single full-screen canvas
2. **Particle count** — 28 bubbles (moderate)
3. **Animation frequency** — 60fps via requestAnimationFrame
4. **DOM updates** — Only progress bar and labels updated on scroll

### Tips for Slow Devices

1. Reduce PRODUCTS array length (fewer tentacles = less computation)
2. Reduce bubble count (edit `STEPS = 56` and bubble loop count)
3. Simplify gradient calculations in `_drawTentacle()`
4. Disable some animation effects

---

## Integration Examples

### Single Page (Hero Section)

```html
<!DOCTYPE html>
<html>
<head>
  <title>BizFirstAi</title>
</head>
<body>
  <octopus-stage></octopus-stage>
  <script src="./assets/octopus-02-tenacles/octopus.js"></script>
</body>
</html>
```

### Multi-Page Site (Home Only)

**home.html:**
```html
<octopus-stage></octopus-stage>
<script src="./assets/octopus-02-tenacles/octopus.js"></script>
```

**about.html, contact.html, etc:**
```html
<!-- No octopus on other pages -->
```

### With Navigation Overlay

```html
<nav class="navbar">
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<octopus-stage></octopus-stage>

<script src="./assets/octopus-02-tenacles/octopus.js"></script>
```

Navigation z-index will appear over the octopus automatically (if not, add `z-index: 100` to nav CSS).

---

## File Reference

| File | Size | Purpose |
|------|------|---------|
| octopus.js | ~13 KB | Main component (monolithic) |
| octopus.css | ~4 KB | Styling (auto-loaded) |
| octopus-head.png | 1.3 MB | Octopus image (auto-loaded) |
| demo.html | ~400 B | Working example |
| README.md | - | Technical documentation |
| USAGE.md | - | This guide |

---

## Next Steps

1. Copy `octopus-02-tenacles` folder to your project
2. Add `<script>` tag to your HTML
3. Add `<octopus-stage></octopus-stage>` tag
4. Customize products and colors as needed
5. Test in multiple browsers
6. Deploy!

---

**Last Updated:** April 2026  
**Component Version:** 1.0  
**Status:** Production Ready
