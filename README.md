# Najiat Islam Rishad - e-portfolio

Static site (HTML, CSS, vanilla JS). No build step, no dependencies.
Live: https://munshi-rishad.github.io/najiat-rishad-portfolio/

## Structure
```
index.html            single-page site
404.html              not-found page
robots.txt, sitemap.xml, .nojekyll
assets/
  css/style.css       tokens, layout, components, performance layer
  js/main.js          theme, nav, animations, filters, copy-email
  images/             profile/campus slideshow, certificate previews, logos, og-image
  icons/              favicon, apple-touch-icon, skills/*.svg
  docs/certificates/  original certificate PDFs
```

## Layout on phones
`index.html` has a small script in `<head>` that makes touch devices narrower than 980px open the
full desktop layout automatically (like Chrome "Desktop site"). Change `DESKTOP_W` there to tune it.
Add `?view=mobile` to the URL to see the responsive mobile layout instead.

## Performance notes
- Looping animations are paused when off-screen; heavy effects (blur, backdrop-filter, glow) are off on touch devices.
- Fonts load without blocking first paint; images are WebP with width/height set.

## Run locally
```
python -m http.server 8000
```
then open http://localhost:8000

## Deploy (GitHub Pages)
```
git add -A
git commit -m "Restructure, mobile desktop layout, performance"
git push
```
Settings > Pages > Source: Deploy from a branch > `main` / `(root)`.
