# How to Use the Octopus Hero Animation Library

A step-by-step guide for integrating the Octopus Hero component into your project.

## Quick Start (5 minutes)

### Step 1: Include the Files

Copy these 4 files to your project:
```
your-project/
└── assets/
    └── octopus-hero/
        ├── octopus-hero.js
        ├── octopus-hero.css
        └── octopus-head.png
```

### Step 2: Add Script & CSS to HTML

In your HTML file's `<head>`:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Octopus Hero CSS -->
  <link rel="stylesheet" href="./assets/octopus-hero/octopus-hero.css">
  
  <!-- Your other styles -->
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', -apple-system, sans-serif; }
  </style>
</head>
<body>

  <!-- Octopus Hero Script (before closing body) -->
  <script src="./assets/octopus-hero/octopus-hero.js"></script>
</body>
</html>
```

### Step 3: Add the Component

Simply add this single line in your HTML `<body>`:

```html
<octopus-hero-section></octopus-hero-section>
```

**Complete minimal example:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Page with Octopus</title>
  
  <link rel="stylesheet" href="./assets/octopus-hero/octopus-hero.css">
</head>
<body>
  <!-- Your octopus hero section -->
  <octopus-hero-section></octopus-hero-section>

  <script src="./assets/octopus-hero/octopus-hero.js"></script>
</body>
</html>
```

**That's it!** Open the HTML in your browser and you should see the full octopus hero animation.

---

## Detailed Integration Guide

### For Existing Projects

If you're adding the octopus to an existing website:

#### 1. Directory Setup

```
your-website/
├── index.html
├── about.html
├── assets/
│   └── octopus-hero/           ← Create this folder
│       ├── octopus-hero.js
│       ├── octopus-hero.css
│       └── octopus-head.png
└── css/
    └── styles.css
```

#### 2. Update Your HTML Header

```html
<head>
  <!-- Existing meta tags -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Google Fonts (optional, but recommended) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- Octopus Hero CSS (add this line) -->
  <link rel="stylesheet" href="./assets/octopus-hero/octopus-hero.css">
  
  <!-- Your existing styles -->
  <link rel="stylesheet" href="./css/styles.css">
</head>
```

#### 3. Add Component to Body

```html
<body>
  <!-- Place octopus hero at the top of your page -->
  <octopus-hero-section></octopus-hero-section>

  <!-- Rest of your page content -->
  <section class="features">
    <!-- Your content here -->
  </section>

  <!-- Octopus script (end of body) -->
  <script src="./assets/octopus-hero/octopus-hero.js"></script>
</body>
```

---

## Customization Guide

### Changing Background

The octopus renders on a **transparent canvas**, so you can fully control the background via CSS.

Use the **`.oct-background`** class to customize:

#### Simple Solid Color
```css
octopus-hero-section .oct-background {
  background: #1a1a2e;
}
```

#### Gradient Background
```css
octopus-hero-section .oct-background {
  background: linear-gradient(135deg, #080F08, #16A34A);
}
```

#### Image Background
```css
octopus-hero-section .oct-background {
  background-image: url('./assets/bg-pattern.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;  /* Optional: parallax effect */
}
```

#### Transparent/Overlay
```css
octopus-hero-section .oct-background {
  background: rgba(8, 15, 8, 0.5);  /* Semi-transparent dark */
}
```

#### Complex Background (Multiple layers)
```css
octopus-hero-section .oct-background {
  background: 
    linear-gradient(135deg, rgba(22, 163, 74, 0.1), rgba(13, 148, 136, 0.05)),
    url('./assets/texture.png');
  background-size: cover;
}
```

#### Default Background
If you don't customize, it defaults to:
```css
octopus-hero-section .oct-background {
  background: #080F08;  /* Dark green-black */
}
```

---

### Changing Colors

Edit `octopus-hero.js` and find the `CONFIG` object (around line 50):

```javascript
COLORS: {
  OCTOPUS: '#2DD4BF',           // Octopus body color
  TENTACLE: '#16A34A',          // Tentacle color
  GLOW: 'rgba(13, 148, 136, 0.4)' // Glow effect color
}
```

Change the hex codes to your colors:

```javascript
COLORS: {
  OCTOPUS: '#FF6B9D',           // Pink octopus
  TENTACLE: '#C06C84',          // Mauve tentacles
  GLOW: 'rgba(255, 107, 157, 0.3)' // Pink glow
}
```

### Adjusting Animation Speed

In the `CONFIG` object:

```javascript
TENTACLES: {
  WAVE_FREQUENCY: 0.25,    // Lower = slower wave motion
  BEND_FREQUENCY: 0.3,     // Lower = slower bending
  BASE_AMPLITUDE: 40       // Lower = smaller waves
}

OCTOPUS_BODY: {
  BOB_FREQ1: 0.35,         // Lower = slower bobbing
  BOB_AMP1: 3              // Lower = less vertical movement
}
```

**Example - Slower, Calmer Animation:**

```javascript
TENTACLES: {
  WAVE_FREQUENCY: 0.15,    // Slower waves
  BEND_FREQUENCY: 0.15,    // Slower bending
  BASE_AMPLITUDE: 25       // Smaller waves
}
```

### Changing Canvas Background

```javascript
CANVAS: {
  BACKGROUND: '#080F08',   // Dark green-black
  // Change to your color:
  // BACKGROUND: '#1a1a2e',   // Dark blue
  // BACKGROUND: '#0f0f0f',   // Pure black
}
```

### Adjusting Tentacle Count

```javascript
TENTACLES: {
  COUNT: 8,      // Change to 6, 10, 12, etc.
  // ... other settings
}
```

---

## CSS Customization

You can override styles in your own CSS file. Add these after the octopus CSS link:

```html
<link rel="stylesheet" href="./assets/octopus-hero/octopus-hero.css">
<link rel="stylesheet" href="./css/octopus-overrides.css">
```

**Example overrides (octopus-overrides.css):**

```css
/* Change header background */
octopus-hero-section .oct-header {
  background: rgba(20, 20, 40, 0.95) !important;
}

/* Change hero headline font size */
octopus-hero-section .oct-hero__headline {
  font-size: clamp(32px, 5vw, 56px) !important;
}

/* Change section background */
octopus-hero-section .oct-section-1 {
  background: linear-gradient(135deg, #1a1a2e, #16213e) !important;
}
```

---

## Common Integration Scenarios

### Scenario 1: Landing Page Only

Use the octopus as your hero section:

```html
<body>
  <octopus-hero-section></octopus-hero-section>
  
  <!-- Rest of landing page -->
  <section class="features">...</section>
  <section class="pricing">...</section>
</body>
```

### Scenario 2: Multiple Page Website

**index.html (Home page):**
```html
<head>
  <link rel="stylesheet" href="./assets/octopus-hero/octopus-hero.css">
</head>
<body>
  <octopus-hero-section></octopus-hero-section>
  <!-- Home content -->
  <script src="./assets/octopus-hero/octopus-hero.js"></script>
</body>
```

**about.html (About page):**
```html
<!-- No octopus on other pages, just normal content -->
<h1>About Us</h1>
<!-- Regular content without octopus -->
```

### Scenario 3: With Navigation Bar

If you have a persistent navigation:

```html
<body>
  <!-- Navigation bar (optional, appears over octopus) -->
  <nav class="navbar">
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </nav>

  <!-- Octopus hero section -->
  <octopus-hero-section></octopus-hero-section>

  <!-- Rest of content -->
  <script src="./assets/octopus-hero/octopus-hero.js"></script>
</body>
```

---

## Troubleshooting

### Problem: No octopus appears

**Solution 1: Check file paths**
- Verify `octopus-hero.js` path is correct
- Check browser console (F12) for 404 errors
- Make sure all file names match exactly

**Solution 2: Check CSS is loaded**
- Open DevTools (F12) → Elements tab
- Look for `<octopus-hero-section>` tag
- Check if it has a blue border (means element exists)

**Solution 3: Wait for load**
- Sometimes animation takes a moment to initialize
- Try refreshing the page (Ctrl+F5)
- Check console for JavaScript errors

### Problem: Animation is choppy/stuttering

**Solution 1: Check browser performance**
- Close other browser tabs/applications
- Try in a different browser
- Check if other JavaScript is running

**Solution 2: Reduce animation complexity**
- Lower `BASE_AMPLITUDE` value
- Reduce `WAVE_FREQUENCY`
- Lower `COUNT` (fewer tentacles)

**Solution 3: Hardware acceleration**
- Ensure GPU acceleration is enabled
- Check browser settings for hardware acceleration

### Problem: Colors don't match my brand

**Solution:** Edit the `COLORS` object in `octopus-hero.js`
- Use a color picker to get your brand colors
- Convert RGB to hex: use [this converter](https://www.rapidtables.com/convert/color/rgb-to-hex.html)
- Update all three color properties

### Problem: Animation too fast/slow

**Solution:** Adjust frequency values in `CONFIG`
- Lower frequency = slower animation (try 0.1)
- Higher frequency = faster animation (try 0.5)
- Start with small changes (±0.05) to find the right speed

### Problem: Can't see octopus on mobile

**Note:** The component is optimized for desktop viewing. On mobile:
- It may appear smaller or less smooth
- Consider disabling on devices < 768px width:

```javascript
// Add this check before including octopus-hero.js
if (window.innerWidth >= 768) {
  const script = document.createElement('script');
  script.src = './assets/octopus-hero/octopus-hero.js';
  document.body.appendChild(script);
}
```

---

## Testing Your Integration

### Checklist Before Going Live

- [ ] Files copied to correct location
- [ ] CSS link is in `<head>` tag
- [ ] Script loaded before closing `</body>` tag
- [ ] Component tag added: `<octopus-hero-section></octopus-hero-section>`
- [ ] Octopus appears when page loads
- [ ] Animation is smooth (60fps)
- [ ] Colors match brand guidelines
- [ ] Works in Chrome, Firefox, and Safari
- [ ] Responsive on different screen sizes
- [ ] No JavaScript errors in console

### Quick Test

Open your page and:

1. **Visual check** — See the octopus animation
2. **Interaction check** — Scroll the page, watch animation respond
3. **Console check** — Press F12, ensure no red errors
4. **Performance check** — Open DevTools → Performance, record scroll

---

## Advanced Usage

### JavaScript API

The component exposes minimal API. To access the component:

```javascript
const octopusSection = document.querySelector('octopus-hero-section');

// Component lifecycle methods available:
// - connectedCallback() - when added to DOM
// - disconnectedCallback() - when removed from DOM
```

### Dynamic Color Changes (JavaScript)

To change colors at runtime:

```javascript
// Modify octopus-hero.js CONFIG before the component initializes
// Then reinitialize the page
```

### Removing the Component

```javascript
// Remove the octopus from the page
const octopus = document.querySelector('octopus-hero-section');
octopus.remove();
```

---

## Performance Tips

1. **Minimize other animations** — Disable other animations on the same page
2. **Use modern browser** — Older browsers may struggle
3. **High-refresh monitor** — Looks best on 60Hz+ displays
4. **GPU-friendly** — Ensure hardware acceleration is enabled
5. **Reduce animation complexity** — Lower wave frequency/amplitude on slow devices

---

## Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 76+ | ✅ Full |
| Firefox | 63+ | ✅ Full |
| Safari | 12+ | ✅ Full |
| Edge | 79+ | ✅ Full |
| IE 11 | - | ❌ Not supported |

---

## Next Steps

1. **Copy the files** to your project
2. **Follow the Quick Start** (5 minutes)
3. **Customize colors** to match your brand
4. **Test** in your browser
5. **Deploy!**

---

## Need Help?

**Common issues and solutions:**
- Check the README.md for technical details
- Review the demo.html file for a working example
- Inspect browser console for error messages
- Check that all file paths are correct

---

## File Reference

| File | Size | Purpose |
|------|------|---------|
| octopus-hero.js | 24 KB | Main component |
| octopus-hero.css | 11 KB | All styling |
| octopus-head.png | 1.3 MB | Asset image |
| demo.html | 613 B | Test/demo |
| README.md | - | Technical docs |
| USAGE.md | - | This guide |

---

**Happy animating!** 🐙

Last updated: April 2026
