# 1code21.github.io

Portfolio of Ajay Babu Dhanyasi — Senior Data Platform Engineer. Live at **https://1code21.github.io**

Plain HTML/CSS/JS, no build step. GitHub Pages serves it straight from `main`.

## Updating content

Everything lives in **`data.js`**:

| Key | What it drives |
|---|---|
| `impact` | Impact tiles under the hero (Action + System + Result). `kind: "reduction"` adds a before→after bar |
| `experience` | Timeline |
| `projects` | Featured cards — `flow` (data path), `arch` (2-sentence architecture), `demo`, `repo` |
| `articles` | Writing list — `source: "medium"` or `"linkedin"` |
| `resume` | Path to the PDF used by every résumé button |

Replace the résumé by overwriting `assets/Ajay_Dhanyasi_Resume.pdf` (keep the name).

## SEO / social

- Social preview image: `og-image.jpg` (1200×630). Meta tags are in `index.html`.
- `favicon.svg`, `apple-touch-icon.png`, `robots.txt`, `sitemap.xml`, and JSON-LD Person data.
- After deploying, refresh LinkedIn's cached preview at https://www.linkedin.com/post-inspector/

## Local preview

```bash
python3 -m http.server 8000   # open http://localhost:8000
```
