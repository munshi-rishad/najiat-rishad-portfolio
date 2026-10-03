(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- nav: mobile menu, progress, active link ---------- */
  const nav = $('.nav');
  const burger = $('#burger');
  const setMenu = open => {
    nav.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    burger.querySelector('use').setAttribute('href', open ? '#i-close' : '#i-menu');
  };
  burger.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  $$('.menu a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  document.addEventListener('click', e => { if (!nav.contains(e.target)) setMenu(false); });

  const bar = $('.progress');
  const toTop = $('#to-top');
  let ticking = false;
  let max = 0;
  const measure = () => { max = root.scrollHeight - innerHeight; };
  measure();
  addEventListener('resize', measure, { passive: true });
  if ('ResizeObserver' in window) new ResizeObserver(measure).observe(document.body);
  const onScroll = () => {
    bar.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;
    toTop.classList.toggle('show', scrollY > 600);
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
  toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));

  const links = new Map($$('.menu a').map(a => [a.getAttribute('href').slice(1), a]));
  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      links.forEach(a => a.classList.remove('active'));
      const a = links.get(en.target.id);
      if (a) a.classList.add('active');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main > section').forEach(s => spy.observe(s));

  /* ---------- typewriter name ---------- */
  const typedName = $('#typed-name');
  if (typedName) {
    const fullName = typedName.dataset.text || 'Najiat Islam Rishad';
    if (reduce) {
      typedName.textContent = fullName;
    } else {
      typedName.textContent = '';
      let i = 0;
      const typeName = () => {
        i += 1;
        typedName.textContent = fullName.slice(0, i);
        if (i < fullName.length) setTimeout(typeName, 86);
        else { const c = $('.name-caret'); if (c) c.hidden = true; }
      };
      setTimeout(typeName, 450);
    }
  }

  /* ---------- typewriter role (type, hold, erase, loop) ---------- */
  const roleEl = $('#typed-role');
  if (roleEl && !reduce) {
    const full = roleEl.dataset.text;
    let n = 0, dir = 1;
    roleEl.textContent = '';
    const heroEl = $('.hero');
    const tick = () => {
      if (document.hidden || (heroEl && heroEl.classList.contains('is-off'))) { setTimeout(tick, 600); return; }
      n += dir;
      roleEl.textContent = full.slice(0, n);
      let d = dir > 0 ? 70 : 32;
      if (dir > 0 && n === full.length) { dir = -1; d = 1900; }
      else if (dir < 0 && n === 0) { dir = 1; d = 450; }
      setTimeout(tick, d);
    };
    setTimeout(tick, 2400);
  }


  /* ---------- profile photo: shuffled campus slideshow ---------- */
  (() => {
    const box = $('.pslides');
    if (!box) return;
    const imgs = $$('.slide', box);
    const names = box.dataset.slides.split(',').map(n => `assets/images/campus/${n.trim()}.webp`);
    if (imgs.length < 2 || names.length < 2) return;
    const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
    let queue = [], shown = imgs[0].getAttribute('src'), cur = 0, timer;
    const next = () => {
      if (!queue.length) {
        queue = shuffle(names.slice());
        if (queue[0] === shown) queue.push(queue.shift()); // never repeat the photo just shown
      }
      return queue.shift();
    };
    const step = () => {
      const src = next(), nxt = imgs[1 - cur], pre = new Image();
      pre.onload = () => {
        nxt.src = src; shown = src;
        imgs[cur].classList.remove('on'); nxt.classList.add('on');
        imgs[cur].setAttribute('aria-hidden', 'true'); imgs[cur].alt = '';
        nxt.setAttribute('aria-hidden', 'false'); nxt.alt = 'Portrait of Najiat Islam Rishad';
        cur = 1 - cur;
      };
      pre.src = src;
    };
    const start = () => { clearInterval(timer); timer = setInterval(step, 3800); };
    document.addEventListener('visibilitychange', () => document.hidden ? clearInterval(timer) : start());
    start();
  })();

  /* ---------- portrait tilt (mouse devices only) ---------- */
  if (fine && !reduce) {
    const pw = $('.portrait-wrap'), pc = $('.portrait-card');
    if (pw && pc) {
      pw.addEventListener('pointermove', e => {
        const r = pw.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        pc.style.transform = `perspective(700px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) rotate(2deg)`;
      });
      pw.addEventListener('pointerleave', () => { pc.style.transform = ''; });
    }
  }

  /* ---------- tech marquee built from the skill chips ---------- */
  const m = $('.marquee');
  if (m) {
    const seen = new Set(), items = [];
    $$('#skills .chip').forEach(c => {
      const im = c.querySelector('img'), t = c.textContent.trim();
      if (!im || seen.has(im.getAttribute('src'))) return;
      seen.add(im.getAttribute('src'));
      items.push(`<span class="mq-item"><img src="${im.getAttribute('src')}" alt="" width="28" height="28">${t}</span>`);
    });
    m.innerHTML = `<div class="mq-track">${items.join('')}${items.join('')}</div>`;
    // start scrolling only after fonts are ready, so item widths never change mid-animation
    const go = () => requestAnimationFrame(() => m.classList.add('run'));
    (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(go);
    setTimeout(go, 2500);
  }

  /* ---------- scroll reveal (staggered) ---------- */
  $$('[data-stagger]').forEach(g => [...g.children].forEach((el, i) => {
    el.classList.add('reveal');
    el.style.setProperty('--i', i % 6);
  }));
  $$('.chips').forEach(g => [...g.children].forEach((chip, i) => chip.style.setProperty('--c', i)));
  const reveal = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      el.classList.add('in');
      reveal.unobserve(el);
      setTimeout(() => el.style.setProperty('--i', 0), 1400); // drop stagger delay so filters/hover stay snappy
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
  $$('.reveal').forEach(el => reveal.observe(el));

  /* ---------- counters (real numbers only) ---------- */
  const counters = $$('[data-count]');
  const run = el => {
    const end = parseFloat(el.dataset.count), dec = +el.dataset.dec || 0;
    if (reduce) { el.textContent = end.toFixed(dec); return; }
    const t0 = performance.now(), dur = 1200;
    const step = now => {
      const p = Math.min((now - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = (end * e).toFixed(dec);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const cio = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { run(en.target); cio.unobserve(en.target); }
  }), { threshold: 0.6 });
  counters.forEach(el => { if (!reduce) el.textContent = (0).toFixed(+el.dataset.dec || 0); cio.observe(el); });

  /* ---------- cursor glow + magnetic primary buttons (desktop only) ---------- */
  if (fine) {
    document.addEventListener('pointermove', e => {
      const card = e.target.closest && e.target.closest('.card');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    }, { passive: true });
    if (!reduce) {
      $$('.btn-primary').forEach(b => {
        b.addEventListener('pointermove', e => {
          const r = b.getBoundingClientRect();
          const x = (e.clientX - r.left - r.width / 2) / r.width;
          const y = (e.clientY - r.top - r.height / 2) / r.height;
          b.style.translate = `${x * 8}px ${y * 6}px`;
        });
        b.addEventListener('pointerleave', () => { b.style.translate = ''; });
      });
    }
  }

  /* ---------- filters ---------- */
  const setupFilter = (bar, items) => {
    const status = $('.sr', bar.parentElement);
    bar.addEventListener('click', e => {
      const btn = e.target.closest('button');
      if (!btn) return;
      $$('button', bar).forEach(b => b.setAttribute('aria-pressed', b === btn));
      const f = btn.dataset.filter;
      let shown = 0;
      items.forEach(it => {
        const match = f === 'all' || it.dataset.cat.split(' ').includes(f);
        if (match) {
          shown++;
          it.hidden = false;
          it.classList.add('in');
          requestAnimationFrame(() => requestAnimationFrame(() => it.classList.remove('out')));
        } else {
          it.classList.add('out');
          setTimeout(() => { if (it.classList.contains('out')) it.hidden = true; }, reduce ? 0 : 230);
        }
      });
      if (status) status.textContent = `${shown} item${shown === 1 ? '' : 's'} shown`;
    });
  };
  $$('.filters').forEach(bar => setupFilter(bar, $$(bar.dataset.target)));

  /* ---------- copy email + toast ---------- */
  const toast = $('#toast');
  let toastTimer;
  const showToast = msg => {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
  };
  $$('[data-copy]').forEach(btn => btn.addEventListener('click', async () => {
    const text = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (e2) { showToast('Copy failed. Select the email manually.'); ta.remove(); return; }
      ta.remove();
    }
    showToast('Copied');
  }));

  /* ---------- pause looping animations that are off-screen ---------- */
  const pauser = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('is-off', !e.isIntersecting)), { rootMargin: '120px' });
  $$('.hero, .marquee, .timeline').forEach(el => pauser.observe(el));

  $('#year').textContent = new Date().getFullYear();
})();
