# Najiat Islam Rishad - e-portfolio

Static site (HTML, CSS, vanilla JS). No build step.
Live: https://munshi-rishad.github.io/najiat-rishad-portfolio/

## Structure
```
index.html, 404.html, robots.txt, sitemap.xml
assets/  css/  js/  fonts/  images/  icons/  docs/certificates/
```

## Phone layout
Touch devices under 980px open the desktop layout automatically (script in `index.html` `<head>`, `DESKTOP_W`).
Add `?view=mobile` to the URL for the mobile layout.

## Run / deploy
```
python -m http.server 8000
git add -A && git commit -m "Update" && git push
```
Pages: Settings > Pages > `main` / `(root)`.
