# Performance Optimization - Apply to All Pages

## Quick Reference Guide

This guide helps you apply the same performance optimizations to all other HTML pages in your website.

## Critical CSS to Add to Each Page

Add this block immediately after the `<title>` tag and before any external stylesheets:

```html
<!-- Critical CSS Inlined for First Paint -->
<style>
  /* Critical Above-the-Fold CSS */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    background-color: #dfdedf;
    background-image: url("public/images/optimized/backgound-1280.avif");
    background-size: cover;
    background-attachment: fixed;
    min-height: 100vh;
  }
  body {
    line-height: 1;
    color: #000;
    font-family: Arial, Helvetica, sans-serif;
    font-display: swap;
    margin: 0;
    padding: 0;
    touch-action: manipulation;
  }
  .clear {
    clear: both;
  }
  #site-header {
    margin: 0;
    padding: 0;
  }
  #header-logo {
    display: inline-block;
    margin: 0.05rem 0 1rem 0;
    line-height: 0;
  }
  #header-logo picture,
  #header-logo img {
    display: block;
    filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.5))
      drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.3));
  }
  ul.cssmenu {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }
  .container_12 {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
  }
  .grid_9 {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
  }
</style>
```

## Resource Hints Template

Add these immediately after the critical CSS:

```html
<!-- Resource Hints for Performance -->
<link rel="preconnect" href="https://www.googletagmanager.com" crossorigin />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<!-- Preload critical resources -->
<link
  rel="preload"
  href="/public/images/optimized/headerLogo.avif"
  as="image"
  type="image/avif"
  fetchpriority="high"
/>
<link rel="preload" href="/public/components/header.js" as="script" />
```

**Note**: Adjust paths based on page location (use `../` for nested pages)

## Async CSS Loading Template

Replace blocking CSS links with async loading:

### Before:

```html
<link rel="stylesheet" href="public/css/base.css" />
<link rel="stylesheet" href="public/css/style2.css" />
```

### After:

```html
<!-- Async load non-critical CSS -->
<link
  rel="preload"
  href="/public/css/base.css"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>
<noscript><link rel="stylesheet" href="/public/css/base.css" /></noscript>
<link
  rel="preload"
  href="/public/css/style2.css"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>
<noscript><link rel="stylesheet" href="/public/css/style2.css" /></noscript>
```

## Image Optimization Checklist

For all images, ensure:

1. **Add explicit dimensions** to prevent layout shifts:

```html
<img src="image.avif" alt="Description" width="700" height="400" />
```

2. **Use appropriate loading attributes**:
   - `loading="eager" fetchpriority="high"` for hero/above-fold images
   - `loading="lazy"` for below-fold images

3. **Use responsive images**:

```html
<picture>
  <source
    media="(max-width: 400px)"
    type="image/avif"
    srcset="image-400.avif"
  />
  <source
    media="(max-width: 700px)"
    type="image/avif"
    srcset="image-700.avif"
  />
  <source type="image/avif" srcset="image-1280.avif" />
  <img
    src="image-1280.webp"
    alt="Description"
    width="700"
    height="400"
    loading="lazy"
  />
</picture>
```

## JavaScript Loading Best Practices

1. **Add `defer` to all scripts**:

```html
<script src="public/components/header.js" defer></script>
<script src="public/components/footer.js" defer></script>
```

2. **Keep Google Analytics async**:

```html
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
></script>
```

## Page-by-Page Optimization Status

- [x] [index.html](../index.html) - ✅ OPTIMIZED
- [ ] [view/about_us/index.html](../view/about_us/index.html) - Needs optimization
- [ ] [view/services/index.html](../view/services/index.html) - Needs optimization
- [ ] [view/contact_us/index.html](../view/contact_us/index.html) - Needs optimization
- [ ] [view/estimate/index.html](../view/estimate/index.html) - Needs optimization
- [ ] [view/install/index.html](../view/install/index.html) - Needs optimization
- [ ] [view/maintenance/index.html](../view/maintenance/index.html) - Needs optimization
- [ ] [view/careers/index.html](../view/careers/index.html) - Needs optimization
- [ ] [view/client_reference/index.html](../view/client_reference/index.html) - Needs optimization
- [ ] [view/training/index.html](../view/training/index.html) - Needs optimization
- [ ] [billing/index.html](../billing/index.html) - Needs optimization
- [ ] [commercial/index.html](../commercial/index.html) - Needs optimization
- [ ] [services/index.html](../services/index.html) - Needs optimization
- [ ] [contact/index.html](../contact/index.html) - Needs optimization

## Automated Optimization Script (Optional)

You can create a script to automate these changes. Here's a Node.js example:

```javascript
const fs = require('fs');
const path = require('path');

const criticalCSS = `<!-- Critical CSS... -->`;

function optimizeHTML(filePath) {
    let html = fs.readFileSync(filePath, 'utf8');

    // Insert critical CSS after <title>
    html = html.replace('</title>', '</title>\\n' + criticalCSS);

    // Convert blocking CSS to async
    html = html.replace(
        /<link rel="stylesheet" href="([^"]+\.css)"[^>]*>/g,
        '<link rel="preload" href="$1" as="style" onload="this.onload=null;this.rel=\\'stylesheet\\'">\\n<noscript><link rel="stylesheet" href="$1"></noscript>'
    );

    fs.writeFileSync(filePath, html);
}

// Run on all HTML files
// optimizeHTML('./view/about_us/index.html');
```

## Verification Steps

After optimizing each page:

1. Open Chrome DevTools
2. Run Lighthouse audit (Performance tab)
3. Check for:
   - Performance score > 90
   - No layout shift issues
   - No render-blocking resources
   - Proper caching headers

## Common Issues & Solutions

### Issue: Path problems in nested pages

**Solution**: Use absolute paths (`/public/...`) or correct relative paths (`../public/...`)

### Issue: Critical CSS conflicts

**Solution**: Only include truly critical above-the-fold styles in the inline CSS

### Issue: FOUC (Flash of Unstyled Content)

**Solution**: Ensure critical CSS covers all visible elements on page load

---

**Pro Tip**: Start with high-traffic pages first for maximum impact!
