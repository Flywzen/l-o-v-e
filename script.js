/* ============================================================
   BIRTHDAY WEBSITE — script.js (UPGRADED v2)
   21st.dev style interactions + Framer Motion-inspired
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ── CONFIG ─────────────────────────────────────────────── */
  const CONFIG = {
    name:          'Hanna Tamara',
    birthdayDate:  '2026-05-24',
    togetherSince: '2023-07-14',
    countdownMode: 'together',
    typewriterLines: [
      `May this auspicious day blossom as radiant as your smile`,
      `You are the beacon of my life, the spark in my heart, and the thunder to my soul`,
      `I await with profound yearning for the endless horizons we shall traverse`,
      `Every day with you is a gift I treasure beyond measure ⚡`,
    ],
  };

  /* ── 1. HERO NAME ─────────────────────────────────────── */
  const heroNameEl = document.getElementById('heroName');
  if (heroNameEl) heroNameEl.textContent = CONFIG.name;

  /* ── 2. TYPEWRITER ────────────────────────────────────── */
  (() => {
    const el = document.getElementById('typewriter');
    if (!el) return;
    const lines = CONFIG.typewriterLines;
    let lineIdx = 0, charIdx = 0, deleting = false, pauseTicks = 0;
    const TYPING_SPEED = 65, DELETE_SPEED = 35, PAUSE_AFTER = 22, PAUSE_BEFORE = 8;
    function tick() {
      const current = lines[lineIdx];
      if (!deleting && charIdx <= current.length) {
        el.textContent = current.slice(0, charIdx++);
        if (charIdx > current.length) { deleting = true; pauseTicks = PAUSE_AFTER; }
        setTimeout(tick, TYPING_SPEED);
      } else if (deleting && pauseTicks > 0) {
        pauseTicks--;
        setTimeout(tick, TYPING_SPEED);
      } else if (deleting && charIdx >= 0) {
        el.textContent = current.slice(0, charIdx--);
        if (charIdx < 0) { deleting = false; pauseTicks = PAUSE_BEFORE; lineIdx = (lineIdx + 1) % lines.length; charIdx = 0; }
        setTimeout(tick, DELETE_SPEED);
      } else { pauseTicks--; setTimeout(tick, TYPING_SPEED); }
    }
    tick();
  })();

  /* ── 3. COUNTDOWN + STATS ─────────────────────────────── */
  (() => {
    const labelEl  = document.getElementById('countdownLabel');
    const daysEl   = document.getElementById('cdDays');
    const hrsEl    = document.getElementById('cdHours');
    const minsEl   = document.getElementById('cdMins');
    const secsEl   = document.getElementById('cdSecs');
    const statM    = document.getElementById('statMonths');
    const statW    = document.getElementById('statWeeks');
    const statD2   = document.getElementById('statDays2');
    if (!daysEl) return;
    function pad(n, len = 2) { return String(n).padStart(len, '0'); }
    function update() {
      const now = new Date();
      const since = new Date(CONFIG.togetherSince);
      const diff  = now - since;
      const totalDays = Math.floor(diff / 86400000);
      if (labelEl) labelEl.textContent = '⚡ The Infinity We Have Woven Together ⚡';
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      daysEl.textContent = pad(d, 3);
      hrsEl.textContent  = pad(h);
      minsEl.textContent = pad(m);
      secsEl.textContent = pad(s);
      if (statM) statM.textContent = Math.floor(totalDays / 30);
      if (statW) statW.textContent = Math.floor(totalDays / 7);
      if (statD2) statD2.textContent = totalDays;
    }
    update();
    setInterval(update, 1000);
  })();

  /* ── 4. FLOATING PARTICLES ────────────────────────────── */
  (() => {
    const canvas = document.getElementById('heartsCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);
    const EMOJIS = ['⚡', '🩷', '⚡', '💖', '✨', '🌸', '💛', '⚡'];
    const COUNT  = window.innerWidth < 600 ? 15 : 22;
    const hearts = [];
    function rand(a, b) { return Math.random() * (b - a) + a; }
    for (let i = 0; i < COUNT; i++) {
      hearts.push({ x: rand(0, window.innerWidth), y: rand(window.innerHeight, window.innerHeight * 2), size: rand(12, 28), speed: rand(0.3, 0.9), drift: rand(-0.35, 0.35), opacity: rand(0.25, 0.75), emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)], wobble: rand(0, Math.PI * 2), wobbleSpeed: rand(0.01, 0.025) });
    }
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hearts.forEach(h => {
        h.y -= h.speed; h.wobble += h.wobbleSpeed; h.x += Math.sin(h.wobble) * 0.5 + h.drift;
        if (h.y < -60) { h.y = canvas.height + 60; h.x = rand(0, canvas.width); h.opacity = rand(0.25, 0.75); }
        ctx.globalAlpha = h.opacity; ctx.font = `${h.size}px serif`; ctx.fillText(h.emoji, h.x, h.y);
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }
    draw();
  })();

  /* ── 5. CONFETTI ──────────────────────────────────────── */
  (() => {
    if (typeof confetti !== 'function') return;
    const defaults = { particleCount: 3, spread: 60, colors: ['#f5c518', '#ffe066', '#fff8dc', '#f43f5e', '#fff', '#ffd700'] };
    function launchLeft() { confetti({ ...defaults, angle: 60, origin: { x: 0, y: 0.65 } }); }
    function launchRight() { confetti({ ...defaults, angle: 120, origin: { x: 1, y: 0.65 } }); }
    confetti({ particleCount: 140, spread: 100, origin: { y: 0.6 }, colors: defaults.colors, startVelocity: 38 });
    const interval = setInterval(() => { launchLeft(); launchRight(); }, 180);
    setTimeout(() => clearInterval(interval), 3000);
  })();

  function burstAt(el) {
    if (typeof confetti !== 'function') return;
    const rect = el.getBoundingClientRect();
    confetti({ particleCount: 90, spread: 80, origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight }, colors: ['#f5c518', '#ffe066', '#f43f5e', '#fff', '#ffd700'], startVelocity: 30 });
  }

  /* ── 6. SPOTLIGHT CARDS ───────────────────────────────── */
  document.querySelectorAll('.spotlight-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
      card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
    });
  });

  /* ── 7. PROGRESS BARS ANIMATE ─────────────────────────── */
  const progressObserver = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.querySelectorAll('.love-progress-fill').forEach(f => f.classList.add('animate')); progressObserver.unobserve(e.target); } });
  }, { threshold: 0.3 });
  document.querySelectorAll('.timeline-content').forEach(c => progressObserver.observe(c));

  /* ── 8. GALLERY SLIDER ────────────────────────────────── */
  (() => {
    const slider   = document.getElementById('gallerySlider');
    const prevBtn  = document.getElementById('galleryPrev');
    const nextBtn  = document.getElementById('galleryNext');
    const dotsWrap = document.getElementById('galleryDots');
    if (!slider) return;
    const originalSlides = Array.from(slider.querySelectorAll('.gallery-slide'));
    const total = originalSlides.length;
    if (total < 2) return;
    let current = 0;
    let autoTimer = null;
    const dots = [];
    dotsWrap.innerHTML = '';
    originalSlides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });
    const slideHTML = originalSlides.map(s => s.outerHTML);
    slider.innerHTML = '';
    function addGroup(fromIdx, count) {
      for (let i = 0; i < count; i++) {
        const idx = (fromIdx + i) % total;
        const tmp = document.createElement('div');
        tmp.innerHTML = slideHTML[idx];
        slider.appendChild(tmp.firstElementChild);
      }
    }
    addGroup(total - (total % total || total), total);
    addGroup(0, total);
    addGroup(0, total);
    const renderedSlides = Array.from(slider.querySelectorAll('.gallery-slide'));
    function getSlideMetrics() { return { slideWidth: renderedSlides[0].getBoundingClientRect().width + 24 }; }
    let internalIndex = total;
    function applyTransform({ animate }) {
      const { slideWidth } = getSlideMetrics();
      slider.style.transition = animate ? 'transform 0.5s cubic-bezier(0.4,0,0.2,1)' : 'none';
      slider.style.transform = `translateX(-${internalIndex * slideWidth}px)`;
    }
    function syncDots() { dots.forEach((d, i) => d.classList.toggle('active', i === current)); }
    function goTo(idx) {
      current = ((idx % total) + total) % total;
      internalIndex = total + current;
      applyTransform({ animate: true });
      syncDots();
      window.setTimeout(() => { if (internalIndex < total) internalIndex += total; if (internalIndex >= total * 2) internalIndex -= total; applyTransform({ animate: false }); }, 520);
    }
    slider.style.display = 'flex'; slider.style.overflow = 'visible';
    slider.parentElement.style.overflow = 'hidden';
    function step(dir) {
      internalIndex += dir; current = (current + dir + total) % total;
      applyTransform({ animate: true }); syncDots();
      window.setTimeout(() => { if (internalIndex < total) { internalIndex += total; applyTransform({ animate: false }); } else if (internalIndex >= total * 2) { internalIndex -= total; applyTransform({ animate: false }); } }, 520);
    }
    prevBtn.addEventListener('click', () => { step(-1); resetAuto(); });
    nextBtn.addEventListener('click', () => { step(+1); resetAuto(); });
    let touchStartX = 0;
    slider.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - touchStartX; if (Math.abs(dx) > 40) { dx < 0 ? step(+1) : step(-1); resetAuto(); } });
    function startAuto() { autoTimer = setInterval(() => step(+1), 4500); }
    function resetAuto() { clearInterval(autoTimer); startAuto(); }
    internalIndex = total + current;
    applyTransform({ animate: false }); syncDots(); startAuto();
    window.addEventListener('resize', () => applyTransform({ animate: false }));
  })();

  /* ── 9. ENVELOPE ──────────────────────────────────────── */
  (() => {
    const wrapper = document.getElementById('envelopeWrapper');
    const flap    = document.getElementById('envelopeFlap');
    const env     = document.getElementById('envelope');
    const reveal  = document.getElementById('letterReveal');
    if (!wrapper) return;
    let opened = false;
    function openEnvelope() {
      if (opened) return;
      opened = true;
      flap.classList.add('open');
      env.classList.add('opened');
      setTimeout(() => {
        reveal.classList.add('open');
        if (typeof confetti === 'function') {
          confetti({ particleCount: 60, spread: 70, origin: { y: 0.5 }, colors: ['#f5c518', '#ffe066', '#f43f5e', '#fff'] });
        }
      }, 700);
      wrapper.style.cursor = 'default';
    }
    wrapper.addEventListener('click', openEnvelope);
    wrapper.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openEnvelope(); } });
  })();

  /* ── 10. COUPONS ──────────────────────────────────────── */
  (() => {
    const modal      = document.getElementById('couponModal');
    const modalEmoj  = document.getElementById('modalEmoji');
    const modalTitle = document.getElementById('modalTitle');
    const modalClose = document.getElementById('modalClose');
    if (!modal) return;
    document.querySelectorAll('.coupon-card').forEach(card => {
      const btn = card.querySelector('.coupon-btn');
      if (!btn) return;
      btn.addEventListener('click', e => {
        e.stopPropagation();
        burstAt(btn);
        modalEmoj.textContent  = card.dataset.emoji || '🎁';
        modalTitle.textContent = card.dataset.label || 'Gift';
        modal.classList.add('open');
        card.classList.add('used');
        btn.textContent = '✓ Now Manifested';
      });
    });
    function closeModal() { modal.classList.remove('open'); }
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  })();

  /* ── 11. MOBILE NAV ───────────────────────────────────── */
  (() => {
    const menuBtn  = document.getElementById('mobileMenuBtn');
    const menu     = document.getElementById('mobileMenu');
    const closeBtn = document.getElementById('mobileMenuClose');
    if (!menuBtn || !menu) return;
    function openMenu()  { menu.classList.add('open'); document.body.style.overflow = 'hidden'; }
    function closeMenu() { menu.classList.remove('open'); document.body.style.overflow = ''; }
    menuBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    menu.querySelectorAll('.mobile-nav-link').forEach(l => l.addEventListener('click', closeMenu));
  })();

  /* ── 12. SCROLL REVEAL ────────────────────────────────── */
  (() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  })();

  /* ── 13. BENTO GALLERY TILT ───────────────────────────── */
  document.querySelectorAll('.bento-item').forEach(item => {
    item.addEventListener('mousemove', e => {
      const rect = item.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = ((e.clientY - cy) / (rect.height / 2)) * 3;
      const ry = (-(e.clientX - cx) / (rect.width / 2)) * 3;
      item.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
    });
    item.addEventListener('mouseleave', () => { item.style.transform = ''; });
  });

  /* ── 14. MAGNETIC BUTTONS ─────────────────────────────── */
  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.25;
      const dy = (e.clientY - cy) * 0.25;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  /* ── 15. STAGGER COUPON ENTRANCE ─────────────────────── */
  document.querySelectorAll('.coupon-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
  });

});
