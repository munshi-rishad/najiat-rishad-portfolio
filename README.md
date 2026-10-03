# Najiat Islam Rishad - e-portfolio

Static site (HTML, CSS, vanilla JS). No build step, no dependencies.

## Structure
```
portfolio/
  index.html, 404.html, .nojekyll
  css/style.css
  js/script.js
  assets/images/   campus/ (5 profile photos, 3:4, shuffled slideshow), certificates/ previews, og-image.jpg
  assets/icons/    favicon.svg, apple-touch-icon.png
```

## Theme
Colors come from `profile1.jpg` (k-means on the subject) and live as CSS variables in `:root` and `:root[data-theme="dark"]`.

| Color | Hex | Source in photo | Used for |
|---|---|---|---|
| Navy | `#1B4D75` | lanyard | primary buttons, links, light-theme accent, GitHub band |
| Sky | `#5EA3CE` | lanyard highlight | photo frame gradient, glow, dark-theme accent (`#7DB9DE` lightened) |
| Rose | `#EEC5C5` / `#D4A3A1` | shirt | tags, nav active pill, gradient end, bullets, hover border |
| Bronze | `#B37959` (text `#86503C`) | skin tone | role line, dates (darkened for AA contrast) |
| Bone | `#F3E8E4` / `#FBF6F3` | shirt highlights | light backgrounds |
| Ink | `#33393D` | hair | text, dark-theme backgrounds |

## Run locally
Open `index.html`, or:
```
python -m http.server 8000
```
then visit http://localhost:8000

## Upload to GitHub
```
cd portfolio
git init
git add .
git commit -m "Add portfolio website"
git branch -M main
git remote add origin https://github.com/munshi-rishad/<repo-name>.git
git push -u origin main
```
Update later:
```
git add .
git commit -m "Update portfolio"
git push
```

## Deploy
- **GitHub Pages:** repo Settings > Pages > Source: Deploy from a branch > `main` / `(root)` > Save. The site appears at `https://munshi-rishad.github.io/<repo-name>/`.
- **Netlify:** drag the `portfolio` folder onto app.netlify.com/drop, or connect the repo (no build command, publish directory `.`).
- **Vercel:** import the repo, framework preset "Other", no build command, output directory `.`.

After deploying, add the live URL to `og:image` / `og:url` in `index.html` as absolute links so social previews work.
