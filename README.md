# Image Delivery Optimization

This project includes a helper script to generate responsive, compressed image variants to address Lighthouse's "Improve image delivery" recommendations (reduce bytes and serve correctly sized assets).

## Quick Steps (Windows PowerShell)

```powershell
# From the repository root
npm init -y
npm install sharp
node tools/image-optimize.js
```

Outputs are written to `public/images/optimized`. Variants are generated for common widths and formats (WebP + AVIF). You can adjust widths/quality in `tools/image-optimize.js`.

## Swap HTML to Responsive Images

For the homepage banner, replace a simple `img` with `picture` + `srcset` so the browser picks the smallest asset for the 700px-wide container:

```html
<picture>
  <source
    type="image/avif"
    srcset="
      /public/images/optimized/CollinsFront-400.avif   400w,
      /public/images/optimized/CollinsFront-700.avif   700w,
      /public/images/optimized/CollinsFront-1280.avif 1280w
    "
    sizes="(max-width: 700px) 100vw, 700px"
  />
  <source
    type="image/webp"
    srcset="
      /public/images/optimized/CollinsFront-400.webp   400w,
      /public/images/optimized/CollinsFront-700.webp   700w,
      /public/images/optimized/CollinsFront-1280.webp 1280w
    "
    sizes="(max-width: 700px) 100vw, 700px"
  />
  <img
    src="/public/images/CollinsFront.webp"
    alt="Collins Front"
    width="700"
    height="400"
    loading="eager"
    decoding="async"
    fetchpriority="high"
  />
  ></picture
>
```

For non-LCP slides, keep `loading="lazy"` to avoid unnecessary downloads.

For the header logo, serve the exact displayed dimensions and use modern formats with a PNG fallback:

```html
<picture>
  <source type="image/avif" srcset="/public/images/optimized/logo2-150.avif" />
  <source type="image/webp" srcset="/public/images/optimized/logo2-150.webp" />
  <img
    src="/public/images/optimized/logo2-150.png"
    alt="ProScapes of Atlanta Logo"
    width="150"
    height="60"
    decoding="async"
    loading="eager"
    fetchpriority="high"
  />
</picture>
```

## Tips

- Use `width` and `height` to reserve space and reduce CLS.
- Set `loading="eager"` + `fetchpriority="high"` only for the LCP/hero image; use `loading="lazy"` elsewhere.
- Target WebP quality ~60–70 and AVIF quality ~45–55 for good savings with minimal visual loss.
- If you prefer CLI tools: `cwebp`, `squoosh-cli`, or `ImageMagick` can produce similar outputs.

After swapping to responsive images, re-run Lighthouse. You should see reduced image transfer sizes and improved LCP.
