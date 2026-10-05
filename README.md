# Najiat Islam Rishad - e-portfolio

Static site (HTML, CSS, vanilla JS). No build step.
Live: https://munshi-rishad.github.io/najiat-rishad-portfolio/

## Structure
```
index.html  404.html  robots.txt  sitemap.xml
assets/
  css/style.css        js/main.js        fonts/        icons/
  images/
    profile/           hero slideshow photos (profile-1..3.webp)
    certificates/      certificate previews (open Drive link on click)
    graphic-design/    design thumbnails, 2022 (open Drive link on click)
    logos/             institute logos
    og-image.jpg       social share preview (1200x630)
```

## Editing
- Certificate / design Drive links: `href` of each card in `index.html`.
- Desktop default zoom is 90% (mouse + wide screens only): last block of `assets/css/style.css`. Delete it for 100%.
- Phones/tablets open the desktop layout automatically (`DESKTOP_W` in the `<head>` script). Add `?view=mobile` for the mobile layout.
- Visitor counter: Abacus API; change `key` in `assets/js/main.js` to restart the count.

## Run / deploy
```
python -m http.server 8000
git add -A && git commit -m "Update" && git push
```
Pages: Settings > Pages > `main` / `(root)`.
