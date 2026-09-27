(function () {
  const S = window.SITE || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Cinematic poster artwork (deterministic per title) ----------
  const ARTS = [
    ["#8e0e00", "#1f1c18"], ["#0f2027", "#2c5364"], ["#42275a", "#734b6d"], ["#1d4350", "#a43931"],
    ["#200122", "#6f0000"], ["#134e5e", "#3f8f6a"], ["#3a1c71", "#b0505b"], ["#141e30", "#35577d"],
    ["#5c258d", "#3a7a94"], ["#8a2a6b", "#c24a5f"], ["#c31432", "#240b36"], ["#0b486b", "#b8480f"],
  ];
  const hash = (s) => [...String(s)].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
  const art = (seed, i) => {
    const [a, b] = ARTS[(i ?? hash(seed)) % ARTS.length];
    const ang = 110 + (hash(seed + "a") % 90);
    return `background: radial-gradient(circle at ${20 + (hash(seed + "x") % 60)}% ${10 + (hash(seed + "y") % 50)}%, rgba(255,255,255,.14), transparent 45%), linear-gradient(${ang}deg, ${a}, ${b});`;
  };

  const ICONS = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4.5v15a1 1 0 0 0 1.5.86l12.4-7.5a1 1 0 0 0 0-1.72L7.5 3.64A1 1 0 0 0 6 4.5z"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="9.5"/><path d="M12 11v6M12 7.5v.01"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6c.5-.9 1.7-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.5V9h3.6v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z"/></svg>',
    medium: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 12a6.8 6.8 0 1 1-13.5 0 6.8 6.8 0 0 1 13.5 0zm7.4 0c0 3.5-1.5 6.4-3.4 6.4s-3.4-2.9-3.4-6.4 1.5-6.4 3.4-6.4 3.4 2.9 3.4 6.4zM24 12c0 3.2-.5 5.7-1.2 5.7s-1.2-2.5-1.2-5.7.5-5.7 1.2-5.7S24 8.8 24 12z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
    briefcase: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 21.5A2.5 2.5 0 0 1 6.5 19H20v3H6.5"/></svg>',
    compass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.5"/><path d="m15.5 8.5-2 5-5 2 2-5z"/></svg>',
  };

  // ---------- Who's viewing? ----------
  const PROFILES = [
    { id: "recruiter", name: "Recruiter", hint: "Experience & résumé", color: "#e50914", icon: "briefcase", go: "#experience" },
    { id: "engineer", name: "Engineer", hint: "Architecture & projects", color: "#2b6fd6", icon: "code", go: "#projects" },
    { id: "reader", name: "Reader", hint: "Articles", color: "#1f9d55", icon: "book", go: "#writing" },
    { id: "explorer", name: "Just browsing", hint: "Start at the top", color: "#d69e00", icon: "compass", go: "#main" },
  ];
  const gate = $("#gate"), navProfile = $("#nav-profile");
  const store = { get: (k) => { try { return sessionStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { sessionStorage.setItem(k, v); } catch (e) {} } };
  const setNavProfile = (p) => { navProfile.style.background = p.color; navProfile.innerHTML = ICONS[p.icon]; navProfile.title = `Viewing as ${p.name} — switch`; };
  $("#profiles").innerHTML = PROFILES.map((p) => `
    <li><button class="profile" type="button" data-id="${p.id}">
      <span class="pic" style="background:${p.color}">${ICONS[p.icon]}</span>
      <span>${esc(p.name)}</span><small>${esc(p.hint)}</small>
    </button></li>`).join("");
  const closeGate = (p, jump) => {
    if (p) { store.set("viewer", p.id); setNavProfile(p); }
    document.body.style.overflow = "";
    const done = () => { gate.hidden = true; gate.classList.remove("leaving"); if (p && jump && p.go !== "#main") $(p.go)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }); };
    if (reduceMotion) done(); else { gate.classList.add("leaving"); setTimeout(done, 430); }
  };
  const openGate = () => { gate.hidden = false; document.body.style.overflow = "hidden"; setTimeout(() => $(".profile", gate)?.focus(), 50); };
  $$(".profile", gate).forEach((b) => b.addEventListener("click", () => closeGate(PROFILES.find((p) => p.id === b.dataset.id), true)));
  $("#gate-skip").addEventListener("click", () => closeGate(PROFILES[3], false));
  gate.addEventListener("keydown", (e) => { if (e.key === "Escape") closeGate(PROFILES[3], false); });
  navProfile.addEventListener("click", openGate);
  const saved = PROFILES.find((p) => p.id === store.get("viewer"));
  if (saved) setNavProfile(saved);
  else { setNavProfile(PROFILES[3]); if (!/bot|crawl|spider|lighthouse/i.test(navigator.userAgent) && !location.hash) openGate(); }

  // ---------- Billboard ----------
  const parts = (S.name || "").trim().split(/\s+/);
  $("#bb-title").innerHTML = parts.length > 2 ? `${esc(parts.slice(0, -1).join(" "))}<br>${esc(parts.at(-1))}` : esc(S.name);
  $("#bb-role").textContent = S.role || "";
  if (S.avatar) $("#bb-art").insertAdjacentHTML("beforeend", `<img src="${esc(S.avatar)}" alt="">`);
  const exp = S.experience || [];
  const firstYear = (exp.at(-1)?.start || "").match(/\d{4}/)?.[0];
  $("#bb-meta").innerHTML = [
    `<span class="match">Open to opportunities</span>`,
    firstYear ? `<span>${firstYear}–Present</span>` : "",
    `<span class="badge">5+ YRS</span>`,
    exp.length ? `<span>${exp.length} Seasons</span>` : "",
    `<span class="badge">HD</span>`,
  ].join("");
  $("#bb-desc").textContent = S.tagline || "";
  $("#bb-actions").innerHTML =
    (S.resume ? `<a class="btn btn-play" href="${esc(S.resume)}" download>${ICONS.play}Download résumé</a>` : "") +
    `<a class="btn btn-info" href="#about">${ICONS.info}More info</a>`;
  const bc = [];
  if (S.location) bc.push(`<span>${esc(S.location)}</span>`);
  if (S.email) bc.push(`<a href="mailto:${esc(S.email)}">${esc(S.email)}</a>`);
  if (S.phone) bc.push(`<a href="tel:${esc(S.phone.replace(/\s+/g, ""))}">${esc(S.phone)}</a>`);
  $("#bb-contact").innerHTML = bc.join("");
  $("#bb-rating").textContent = "AWS · GCP";
  if (S.resume) $("#nav-resume").href = S.resume; else $("#nav-resume").remove();

  // ---------- About the series ----------
  $("#about-body").innerHTML = (S.about || []).map((p) => `<p>${esc(p)}</p>`).join("");
  const facts = [
    ["Cast", exp.map((e) => e.company).join(", ")],
    ["Genres", (S.skills || []).slice(0, 5).map((g) => g.group).join(", ")],
    ["This profile is", "Real-time, Cost-cutting, Reliable"],
    ["Filmed in", S.location],
    ["Education", (S.education || []).map((e) => `${e.degree}, ${e.school}`).join("; ")],
  ].filter((f) => f[1]);
  $("#about-facts").innerHTML = facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("");

  // ---------- Top wins (Top-10 style) ----------
  $("#impact-track").innerHTML = (S.impact || []).map((t, i) => `
    <article class="rank" aria-label="Number ${i + 1}: ${esc(t.value + (t.suffix || ""))} ${esc(t.label)}">
      <span class="rank-num" aria-hidden="true">${i + 1}</span>
      <div class="rank-card" style="${art(t.label, i)}">
        <span class="rank-where">${esc(t.where || "")}</span>
        <div class="rank-val">${t.kind === "reduction" ? '<span class="arrow" aria-hidden="true">↓</span>' : ""}<span class="count" data-to="${Number(t.value)}">${Number(t.value)}</span>${esc(t.suffix || "")}</div>
        <div class="rank-label">${esc(t.label)}</div>
        <p class="rank-ctx">${esc(t.context || "")}</p>
      </div>
    </article>`).join("");

  // ---------- Seasons & episodes ----------
  const splitBullet = (b) => {
    const m = b.match(/^(.{25,110}?)(?:,\s| — )(.+)$/);
    if (!m) return [b.replace(/\.$/, ""), ""];
    return [m[1], m[2].charAt(0).toUpperCase() + m[2].slice(1)];
  };
  const initials = (c) => c.split(/\s+/).filter((w) => /^[A-Z]/.test(w)).map((w) => w[0]).join("").slice(0, 3) || c.slice(0, 2);
  function renderSeason(idx) {
    const e = exp[idx], season = exp.length - idx;
    $$(".season-tab").forEach((t, i) => t.setAttribute("aria-selected", String(i === idx)));
    $("#season-sub").innerHTML = `<b>Season ${season}</b> · ${esc(e.title)} at <b>${esc(e.company)}</b> · ${esc(e.start)} – ${esc(e.end)}${e.location ? " · " + esc(e.location) : ""}<span class="badge">${e.points.length} episodes</span>`;
    $("#episodes").innerHTML = e.points.map((p, i) => {
      const [title, text] = splitBullet(p);
      return `
      <li class="episode" style="animation-delay:${i * 40}ms">
        <span class="ep-num">${i + 1}</span>
        <div class="ep-thumb" style="${art(e.company + i, (hash(e.company) + i) % ARTS.length)}" aria-hidden="true"><span>${esc(e.company.replace(/ Consultancy Services/, " (TCS)").replace(/^Tata \(TCS\)$/, "TCS"))}</span></div>
        <div>
          <p class="ep-title">${esc(title)}</p>
          ${text ? `<p class="ep-text">${esc(text)}</p>` : ""}
        </div>
      </li>`;
    }).join("") + (e.tags?.length ? `<li class="ep-tags"><b>Tech in this season:</b> ${e.tags.map(esc).join(" · ")}</li>` : "");
  }
  $("#season-tabs").innerHTML = exp.map((e, i) => `<button class="season-tab" type="button" role="tab" data-i="${i}">S${exp.length - i} · ${esc(e.company.replace(/ Consultancy Services/, " (TCS)"))}</button>`).join("");
  $$(".season-tab").forEach((t) => t.addEventListener("click", () => renderSeason(+t.dataset.i)));
  if (exp.length) renderSeason(0);

  // ---------- Modal ----------
  const modal = $("#modal");
  const openModal = (html, artStyle, title) => {
    $("#modal-art").setAttribute("style", artStyle);
    $("#modal-art").innerHTML = `<h2 id="modal-title">${esc(title)}</h2>`;
    $("#modal-body").innerHTML = html;
    modal.showModal(); modal.scrollTop = 0;
  };
  $("#modal-close").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });

  // ---------- Projects ----------
  const projects = S.projects || [];
  $("#projects-track").innerHTML = projects.map((p, i) => `
    <button class="poster" type="button" data-p="${i}" style="" aria-haspopup="dialog">
      <span class="poster-art" style="${art(p.name)}"></span>
      <span class="poster-glyph" aria-hidden="true">${esc(p.name[0])}</span>
      ${i === 0 ? '<span class="poster-tag">New season</span>' : p.tags?.includes("Open Source") ? '<span class="poster-tag alt">Open source</span>' : ""}
      <span class="poster-title">${esc(p.name)}</span>
    </button>`).join("");
  $$("#projects-track .poster").forEach((el) => el.addEventListener("click", () => {
    const p = projects[+el.dataset.p];
    openModal(`
      <div>
        <div class="meta"><span class="match">Production-grade</span>${p.tags?.[0] ? `<span>${esc(p.tags[0])}</span>` : ""}<span class="badge">HD</span></div>
        <p>${esc(p.desc)}</p>
        ${p.flow ? `<p class="flow">${esc(p.flow)}</p>` : ""}
        ${p.arch ? `<h3>Architecture</h3><p>${esc(p.arch)}</p>` : ""}
        <div class="modal-actions">
          ${p.demo ? `<a class="btn btn-play" href="${esc(p.demo)}" target="_blank" rel="noopener">${ICONS.play}${/medium\.com/.test(p.demo) ? "Read write-up" : "Live demo"}</a>` : ""}
          ${p.repo ? `<a class="btn btn-info" href="${esc(p.repo)}" target="_blank" rel="noopener">${ICONS.github}Code</a>` : ""}
        </div>
      </div>
      <div class="modal-side">
        ${p.tags?.length ? `<div><span>Stack: </span>${p.tags.map(esc).join(", ")}</div>` : ""}
        <div><span>Built by: </span>${esc(S.name)}</div>
      </div>`, art(p.name), p.name);
  }));

  // ---------- Writing ----------
  const fmt = (d) => { const x = new Date(d + "T00:00:00"); return isNaN(x) ? "" : x.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }); };
  const articles = (S.articles || []).slice().sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  $("#writing-count").textContent = articles.length ? `${articles.length} articles` : "";
  if (articles.some((a) => a.source === "linkedin")) $("#writing-h").firstChild.textContent = "Trending now ";
  $("#writing-track").innerHTML = articles.map((a, i) => `
    <a class="poster article has-sub" href="${esc(a.url)}" target="_blank" rel="noopener" title="${esc(a.title)}">
      <span class="poster-art" style="${art(a.title)}"></span>
      <span class="poster-glyph" aria-hidden="true">${esc((a.tags?.[0] || a.title)[0])}</span>
      <span class="poster-tag ${i < 3 ? "" : "alt"}">${i < 3 ? "New" : esc(a.source)}</span>
      <span class="poster-title">${esc(a.title)}</span>
      <span class="poster-sub">${esc(fmt(a.date))}${a.tags?.length ? " · " + esc(a.tags.slice(0, 2).join(" · ")) : ""}</span>
    </a>`).join("") || `<p class="row-empty">No articles yet.</p>`;

  // ---------- Skills as genres ----------
  $("#genres").innerHTML = (S.skills || []).map((g, i) => `
    <div class="genre reveal" style="${art(g.group, (i * 5) % ARTS.length)}">
      <h3>${esc(g.group)}</h3>
      <ul>${g.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
    </div>`).join("");

  // ---------- Credentials ----------
  const creds = [
    ...(S.achievements || []).map((a) => ({ kind: "Award", t: a.title, d: a.detail })),
    ...(S.certifications || []).map((c) => ({ kind: "Certification", t: c.title, d: c.issuer })),
    ...(S.education || []).map((e) => ({ kind: "Education", t: e.degree, d: `${e.school} · ${e.start}–${e.end}` })),
  ];
  $("#cred-track").innerHTML = creds.map((c) => `<div class="cred"><span class="cred-kind">${esc(c.kind)}</span><strong>${esc(c.t)}</strong><span>${esc(c.d || "")}</span></div>`).join("");

  // ---------- GitHub (live, with timeout + cache + fallback) ----------
  async function loadRepos() {
    const sec = $("#github"), box = $("#gh-track"), status = $("#gh-status");
    if (!S.githubUser) return sec.remove();
    const profile = `https://github.com/${encodeURIComponent(S.githubUser)}?tab=repositories`;
    const KEY = "gh-repos:" + S.githubUser;
    let data = null;
    try { const c = JSON.parse(store.get(KEY) || "null"); if (c && Date.now() - c.t < 36e5) data = c.d; } catch (e) {}
    if (!data) {
      const ctrl = new AbortController(); const timer = setTimeout(() => ctrl.abort(), 6000);
      try {
        const res = await fetch(`https://api.github.com/users/${encodeURIComponent(S.githubUser)}/repos?per_page=100&sort=updated`, { signal: ctrl.signal });
        if (!res.ok) throw new Error(res.status);
        data = (await res.json()).map((r) => ({ name: r.name, html_url: r.html_url, description: r.description, language: r.language, stargazers_count: r.stargazers_count, pushed_at: r.pushed_at, fork: r.fork, archived: r.archived }));
        store.set(KEY, JSON.stringify({ t: Date.now(), d: data }));
      } catch (e) {
        clearTimeout(timer);
        $(".slider", sec).outerHTML = `<p class="row-empty">Couldn't reach GitHub just now — <a href="${profile}" target="_blank" rel="noopener">browse my repositories →</a></p>`;
        return;
      }
      clearTimeout(timer);
    }
    const featured = new Set(projects.map((p) => p.name.toLowerCase()));
    const exclude = new Set((S.githubExclude || []).map((n) => n.toLowerCase()));
    const repos = data
      .filter((r) => !(S.githubHideForks && r.fork) && !r.archived && !exclude.has(r.name.toLowerCase()) && !featured.has(r.name.toLowerCase()))
      .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at))
      .slice(0, 12);
    if (!repos.length) return sec.remove();
    status.textContent = `${repos.length} repos`;
    box.innerHTML = repos.map((r) => `
      <a class="poster has-sub" href="${esc(r.html_url)}" target="_blank" rel="noopener" title="${esc(r.description || r.name)}">
        <span class="poster-art" style="${art(r.name)}"></span>
        ${r.language ? `<span class="poster-tag alt">${esc(r.language)}</span>` : ""}
        <span class="poster-title">${esc(r.name)}</span>
        <span class="poster-sub">${r.stargazers_count ? "★ " + r.stargazers_count + " · " : ""}Updated ${new Date(r.pushed_at).toLocaleDateString(undefined, { month: "short", year: "numeric" })}</span>
      </a>`).join("");
    initSlider($(".slider", sec));
  }

  // ---------- Contact ----------
  if (S.email) {
    const link = $("#contact-email"); link.textContent = S.email; link.href = "mailto:" + S.email;
    const btn = $("#copy-email"), label = $("span", btn), live = $("#copy-status");
    btn.addEventListener("click", async () => {
      let ok = false;
      try { await navigator.clipboard.writeText(S.email); ok = true; }
      catch (e) {
        const r = document.createRange(); r.selectNodeContents(link);
        const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
        try { ok = document.execCommand("copy"); } catch (_) {}
        sel.removeAllRanges();
      }
      label.textContent = ok ? "Copied ✓" : "Press ⌘/Ctrl+C";
      live.textContent = ok ? "Email address copied to clipboard" : "";
      btn.classList.toggle("done", ok);
      setTimeout(() => { label.textContent = "Copy email"; btn.classList.remove("done"); live.textContent = ""; }, 2200);
    });
  } else $(".email-bar").remove();
  const L = S.links || {};
  $("#contact-links").innerHTML = [
    S.resume && `<a class="chip-link" href="${esc(S.resume)}" download>${ICONS.download}Résumé (PDF)</a>`,
    S.phone && `<a class="chip-link" href="tel:${esc(S.phone.replace(/\s+/g, ""))}">${ICONS.phone}${esc(S.phone)}</a>`,
    L.linkedin && `<a class="chip-link" href="${esc(L.linkedin)}" target="_blank" rel="noopener">${ICONS.linkedin}LinkedIn</a>`,
    L.github && `<a class="chip-link" href="${esc(L.github)}" target="_blank" rel="noopener">${ICONS.github}GitHub</a>`,
    L.medium && `<a class="chip-link" href="${esc(L.medium)}" target="_blank" rel="noopener">${ICONS.medium}Medium</a>`,
  ].filter(Boolean).join("");

  // ---------- Footer ----------
  $("#footer-links").innerHTML = [
    ["Top wins", "#impact"], ["Seasons", "#experience"], ["Projects", "#projects"], ["Writing", "#writing"],
    ["Skills", "#skills"], ["Credentials", "#credentials"], ["Résumé (PDF)", S.resume], ["Contact", "#contact"],
    ["LinkedIn", L.linkedin], ["GitHub", L.github], ["Medium", L.medium], ["Email", S.email && "mailto:" + S.email],
  ].filter((x) => x[1]).map(([t, h]) => `<a href="${esc(h)}"${/^https?:/.test(h) ? ' target="_blank" rel="noopener"' : ""}>${esc(t)}</a>`).join("");
  $("#year").textContent = new Date().getFullYear();
  $("#footer-name").textContent = S.name || "";

  // ---------- Sliders ----------
  function initSlider(sl) {
    const track = $(".track", sl), prev = $(".prev", sl), next = $(".next", sl);
    if (!track || !prev) return;
    const update = () => {
      prev.disabled = track.scrollLeft < 8;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
    };
    prev.onclick = () => track.scrollBy({ left: -track.clientWidth * 0.85, behavior: reduceMotion ? "auto" : "smooth" });
    next.onclick = () => track.scrollBy({ left: track.clientWidth * 0.85, behavior: reduceMotion ? "auto" : "smooth" });
    track.addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    update();
  }
  $$("[data-slider]").forEach(initSlider);
  loadRepos();

  // ---------- Count-up for top wins ----------
  const countIO = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    countIO.unobserve(e.target);
    const c = e.target, to = +c.dataset.to;
    if (reduceMotion || to <= 1) return;
    const t0 = performance.now();
    const step = (now) => { const k = Math.min(1, (now - t0) / 1100); c.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
    c.textContent = "0"; requestAnimationFrame(step);
  }), { threshold: 0.6 });
  $$(".count").forEach((c) => countIO.observe(c));

  // ---------- Nav: solid on scroll + active section ----------
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("solid", scrollY > 40);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  const links = $$(".nav-links a");
  const spy = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    const id = e.target.id === "about" || e.target.classList.contains("billboard") ? "main" : e.target.id;
    links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  [$(".billboard"), ...$$(".rows > section")].forEach((s) => s && spy.observe(s));

  // ---------- Reveal ----------
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.08 });
  $$(".reveal").forEach((el) => io.observe(el));
})();
