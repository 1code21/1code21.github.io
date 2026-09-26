# 1code21.github.io

Personal portfolio of Ajay Dhanyasi — live at **https://1code21.github.io**

Plain HTML/CSS/JS, no build step. GitHub Pages serves it straight from `main`.

## Updating content

All content lives in **`data.js`** — skills, experience, featured projects and articles.
Edit, commit, push; the site updates in ~1 minute.

- **Articles:** add an object to `articles` with `source: "medium"` or `"linkedin"`.
- **GitHub repos:** loaded live from the GitHub API (`githubUser`). Forks and anything in `githubExclude` are hidden.
- **Photo / résumé:** drop files in `assets/` and set `avatar` / `resume` in `data.js`.

## Theme

Colors are CSS variables at the top of `assets/style.css` (light + dark). Change `--accent` to re-skin.

## Local preview

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```
