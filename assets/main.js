(function () {
  const S = window.SITE || {};
  const $ = (s) => document.querySelector(s);
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const ICONS = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6c.5-.9 1.7-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.5V9h3.6v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z"/></svg>',
    medium: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 12a6.8 6.8 0 1 1-13.5 0 6.8 6.8 0 0 1 13.5 0zm7.4 0c0 3.5-1.5 6.4-3.4 6.4s-3.4-2.9-3.4-6.4 1.5-6.4 3.4-6.4 3.4 2.9 3.4 6.4zM24 12c0 3.2-.5 5.7-1.2 5.7s-1.2-2.5-1.2-5.7.5-5.7 1.2-5.7S24 8.8 24 12z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/></svg>',
    star: '<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" style="vertical-align:-1px"><path d="m12 2 3 6.9 7.5.7-5.7 5 1.7 7.4L12 18l-6.5 4 1.7-7.4-5.7-5 7.5-.7z"/></svg>',
  };

  const linkButtons = (primaryFirst) => {
    const L = S.links || {};
    const out = [];
    if (S.resume) out.push(`<a class="btn primary" href="${esc(S.resume)}" target="_blank" rel="noopener">${ICONS.file}Résumé</a>`);
    if (L.github) out.push(`<a class="btn" href="${esc(L.github)}" target="_blank" rel="noopener">${ICONS.github}GitHub</a>`);
    if (L.linkedin) out.push(`<a class="btn" href="${esc(L.linkedin)}" target="_blank" rel="noopener">${ICONS.linkedin}LinkedIn</a>`);
    if (L.medium) out.push(`<a class="btn" href="${esc(L.medium)}" target="_blank" rel="noopener">${ICONS.medium}Medium</a>`);
    if (S.email) out.push(`<a class="btn" href="mailto:${esc(S.email)}">${ICONS.mail}Email</a>`);
    if (S.phone && !primaryFirst) out.push(`<a class="btn" href="tel:${esc(S.phone.replace(/\s+/g, ""))}">${ICONS.phone}${esc(S.phone)}</a>`);
    if (primaryFirst && !S.resume && out.length) out[0] = out[0].replace('class="btn"', 'class="btn primary"');
    return out.join("");
  };

  // ---------- Hero ----------
  const first = (S.name || "").split(" ")[0] || "me";
  const nameParts = (S.name || "").split(/\s+/);
  $("#brand-name").textContent = first.toLowerCase();
  $("#hero-role").textContent = S.role || "";
  $("#hero-name").textContent = S.name || "";
  $("#hero-tagline").textContent = S.tagline || "";
  $("#hero-links").innerHTML = linkButtons(true);
  $("#contact-links").innerHTML = linkButtons(false);
  $("#footer-name").textContent = S.name || "";
  $("#year").textContent = new Date().getFullYear();
  const initials = (nameParts[0][0] + (nameParts[nameParts.length - 1][0] || "")).toUpperCase();
  $("#avatar").innerHTML = S.avatar ? `<img src="${esc(S.avatar)}" alt="${esc(S.name)}">` : esc(initials);

  // ---------- Hero contact line ----------
  const hc = [];
  if (S.location) hc.push(`<span>${esc(S.location)}</span>`);
  if (S.email) hc.push(`<a href="mailto:${esc(S.email)}">${esc(S.email)}</a>`);
  if (S.phone) hc.push(`<a href="tel:${esc(S.phone.replace(/\s+/g, ""))}">${esc(S.phone)}</a>`);
  $("#hero-contact").innerHTML = hc.join("");

  // ---------- Impact tiles ----------
  const impactEl = $("#impact");
  if (S.impact?.length) {
    impactEl.innerHTML = S.impact.map((t) => {
      const red = t.kind === "reduction";
      return `
      <article class="tile reveal">
        <span class="tile-where">${esc(t.where || "")}</span>
        <div class="tile-num">${red ? '<span class="arrow" aria-hidden="true">↓</span>' : ""}<span class="count" data-to="${Number(t.value)}">${Number(t.value)}</span><span class="sfx">${esc(t.suffix || "")}</span></div>
        <div class="tile-label">${esc(t.label)}</div>
        <p class="tile-ctx">${esc(t.context || "")}</p>
        ${red ? `<div class="bars" role="img" aria-label="Before 100%, after ${100 - t.value}%">
          <div class="bar before"><span>before</span><div class="bar-track"><div class="bar-fill" data-w="100"></div></div></div>
          <div class="bar after"><span>after</span><div class="bar-track"><div class="bar-fill" data-w="${Math.max(2, 100 - t.value)}"></div></div></div>
        </div>` : ""}
      </article>`;
    }).join("");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animate = (tile) => {
      tile.querySelectorAll(".bar-fill").forEach((b) => (b.style.width = b.dataset.w + "%"));
      const c = tile.querySelector(".count"); const to = +c.dataset.to;
      if (reduce || to <= 1) return;
      const t0 = performance.now(), dur = 1200;
      const step = (now) => { const k = Math.min(1, (now - t0) / dur); c.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
      c.textContent = "0"; requestAnimationFrame(step);
    };
    const tio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { animate(e.target); tio.unobserve(e.target); } }), { threshold: 0.4 });
    impactEl.querySelectorAll(".tile").forEach((t) => tio.observe(t));
  } else impactEl.closest("section").remove();

  // ---------- Credentials ----------
  const li = (t, d) => `<li class="reveal"><strong>${esc(t)}</strong>${d ? `<span>${esc(d)}</span>` : ""}</li>`;
  $("#achievements").innerHTML = (S.achievements || []).map((a) => li(a.title, a.detail)).join("");
  $("#certifications").innerHTML = (S.certifications || []).map((c) => li(c.title, c.issuer)).join("");
  $("#education").innerHTML = (S.education || []).map((e) => li(e.degree, `${e.school} · ${e.start}–${e.end}`)).join("");

  // ---------- About ----------
  $("#about-body").innerHTML = (S.about || []).map((p) => `<p>${esc(p)}</p>`).join("");

  // ---------- Skills ----------
  $("#skills-grid").innerHTML = (S.skills || [])
    .map((g) => `<div class="skill-card reveal"><h3>// ${esc(g.group)}</h3><ul class="tags">${g.items.map((i) => `<li class="tag">${esc(i)}</li>`).join("")}</ul></div>`)
    .join("");

  // ---------- Experience ----------
  $("#timeline").innerHTML = (S.experience || [])
    .map((e) => `
      <li class="tl-item reveal">
        <div class="tl-head">
          <h3>${esc(e.title)} <span class="at">@ ${esc(e.company)}</span></h3>
          <span class="tl-date">${esc(e.start)} — ${esc(e.end)}${e.location ? " · " + esc(e.location) : ""}</span>
        </div>
        ${e.points?.length ? `<ul>${e.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>` : ""}
        ${e.tags?.length ? `<ul class="tags">${e.tags.map((t) => `<li class="tag accent">${esc(t)}</li>`).join("")}</ul>` : ""}
      </li>`)
    .join("");

  // ---------- Featured projects ----------
  $("#projects-featured").innerHTML = (S.projects || [])
    .map((p) => `
      <article class="card reveal">
        <h3>${esc(p.name)}</h3>
        <p>${esc(p.desc)}</p>
        ${p.tags?.length ? `<ul class="tags">${p.tags.map((t) => `<li class="tag">${esc(t)}</li>`).join("")}</ul>` : ""}
        <div class="card-links">
          ${p.repo ? `<a href="${esc(p.repo)}" target="_blank" rel="noopener">code →</a>` : ""}
          ${p.demo ? `<a href="${esc(p.demo)}" target="_blank" rel="noopener">read / demo →</a>` : ""}
        </div>
      </article>`)
    .join("");

  // ---------- Live GitHub repos ----------
  const LANG_COLORS = { Python: "#3572A5", JavaScript: "#f1e05a", TypeScript: "#3178c6", HCL: "#844FBA", Shell: "#89e051", Go: "#00ADD8", HTML: "#e34c26", Dockerfile: "#384d54", Java: "#b07219" };
  async function loadRepos() {
    const box = $("#projects-github"), status = $("#gh-status");
    if (!S.githubUser) { box.closest("section").querySelector(".sub-title").remove(); return; }
    status.textContent = "loading…";
    try {
      const res = await fetch(`https://api.github.com/users/${encodeURIComponent(S.githubUser)}/repos?per_page=100&sort=updated`);
      if (!res.ok) throw new Error(res.status);
      const featured = new Set((S.projects || []).map((p) => p.name.toLowerCase()));
      const exclude = new Set((S.githubExclude || []).map((n) => n.toLowerCase()));
      const repos = (await res.json())
        .filter((r) => !(S.githubHideForks && r.fork) && !r.archived && !exclude.has(r.name.toLowerCase()) && !featured.has(r.name.toLowerCase()))
        .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at))
        .slice(0, 9);
      status.textContent = repos.length ? `· ${repos.length} repos` : "";
      box.innerHTML = repos.length
        ? repos.map((r) => `
          <a class="card" href="${esc(r.html_url)}" target="_blank" rel="noopener">
            <h3>${esc(r.name)}</h3>
            <p>${esc(r.description || "No description yet.")}</p>
            <div class="meta">
              ${r.language ? `<span><i class="lang-dot" style="background:${LANG_COLORS[r.language] || "var(--accent)"}"></i>${esc(r.language)}</span>` : ""}
              ${r.stargazers_count ? `<span>${ICONS.star} ${r.stargazers_count}</span>` : ""}
              <span>${new Date(r.pushed_at).toLocaleDateString(undefined, { month: "short", year: "numeric" })}</span>
            </div>
          </a>`).join("")
        : "";
      if (!repos.length) box.closest("section").querySelector(".sub-title").style.display = "none";
    } catch (e) {
      status.textContent = "";
      box.innerHTML = `<p class="empty">Couldn't load repos right now — <a href="https://github.com/${esc(S.githubUser)}?tab=repositories" style="color:var(--accent)">see them on GitHub →</a></p>`;
    }
  }
  loadRepos();

  // ---------- Articles ----------
  const articles = (S.articles || []).slice().sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  const fmt = (d) => { const x = new Date(d + "T00:00:00"); return isNaN(x) ? "" : x.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }); };
  function renderArticles(filter) {
    const list = articles.filter((a) => filter === "all" || a.source === filter);
    $("#articles").innerHTML = list.length
      ? list.map((a) => `
        <li class="article">
          <a href="${esc(a.url)}" target="_blank" rel="noopener">
            <time datetime="${esc(a.date)}">${fmt(a.date)}</time>
            <div>
              <h3>${esc(a.title)}</h3>
              ${a.summary ? `<p>${esc(a.summary)}</p>` : ""}
              ${a.tags?.length ? `<ul class="tags">${a.tags.map((t) => `<li class="tag">${esc(t)}</li>`).join("")}</ul>` : ""}
            </div>
            <span class="src ${esc(a.source)}">${esc(a.source)}</span>
          </a>
        </li>`).join("")
      : `<li class="empty">No ${esc(filter)} articles yet.</li>`;
  }
  document.querySelectorAll(".chip").forEach((c) =>
    c.addEventListener("click", () => {
      document.querySelectorAll(".chip").forEach((x) => x.classList.toggle("active", x === c));
      renderArticles(c.dataset.filter);
    })
  );
  renderArticles("all");

  // ---------- Theme toggle ----------
  $("#theme-toggle").addEventListener("click", () => {
    const root = document.documentElement;
    const cur = root.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = cur === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // ---------- Scroll reveal + active nav ----------
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  const navLinks = [...document.querySelectorAll(".nav-links a")];
  const spy = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-40% 0px -55% 0px" });
  document.querySelectorAll("main section[id]").forEach((s) => spy.observe(s));
})();
