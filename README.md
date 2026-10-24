# Varnio website (static, no build step)

## Structure

```text
.
├── index.html
├── what-we-do.html
├── projects.html
├── about.html
├── 404.html
├── components/
│   ├── contact.html
│   ├── footer.html
│   └── loading-screen.html
├── robots.txt
├── sitemap.xml
└── assets/
    ├── style.css
    ├── components.js
    ├── contact.js
    ├── main.js
    ├── hero.js
    ├── gl.js
    └── loading-screen.js
```

Keep page routes, deployment metadata, and the sitemap at the repository root for GitHub Pages. `assets/` contains shared styles and scripts only.

Preview locally: `python3 -m http.server 8000` then open http://localhost:8000

## Deploy: GitHub Pages
1. Create a repo, push all files to `main` (root).
2. Settings → Pages → Deploy from branch → `main` / root.
3. Custom domain: add a file named `CNAME` containing `varnio.co.in`, then at your DNS add A records to 185.199.108.153, .109.153, .110.153, .111.153 and a CNAME `www` → `<user>.github.io`. Enable "Enforce HTTPS".

## Deploy: GoDaddy (cPanel hosting)
1. cPanel → File Manager → `public_html`.
2. Upload and extract the zip so index.html sits directly in `public_html`.
3. Enable the free SSL (AutoSSL) in cPanel, then force HTTPS.

## Editing
Copy lives in the HTML files. Colors/type in `assets/style.css` (:root variables). Contact form opens the visitor's email app (mailto). To store submissions instead, set the form action to a Formspree/Getform endpoint.

## Notes
- Pages: index, what-we-do, projects, about, 404. Shared motion/3D code: assets/gl.js (Three.js r128 from cdnjs, needs internet), assets/hero.js, assets/main.js.
- Shared footer and contact markup live in `components/` and are inserted by `assets/components.js`; the standalone loading screen is displayed in an iframe and dismissed by `assets/loading-screen.js`. The contact form behavior is in `assets/contact.js`.
- The 3D scene is skipped automatically for visitors with reduced-motion enabled; the site still works without it.
- Project metrics shown are portfolio scope only. Add measured results (leads, traffic, conversion) once analytics baselines exist.
