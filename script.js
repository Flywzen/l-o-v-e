/* ============================================================
   BIRTHDAY WEBSITE — script.js
   All interaction logic: confetti, typewriter, countdown,
   gallery slider, envelope, coupons, floating hearts
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ── ✦ CONFIGURATION ────────────────────────────────────── */
  const CONFIG = {
    name:            'Hanna Tamara',   
    birthdayDate:    '2026-05-24',     // Birthdate (YYYY-MM-DD)
    togetherSince:   '2023-06-14',     // Anniversary (YYYY-MM-DD)
    countdownMode:   'together',       // Mode: 'together' (count up) or 'birthday' (count down)
    typewriterLines: [
      `May this auspicious day blossom as radiant as your smile`,
      `You are the beacon of my life, the spark in my heart, and the thunder to my soul`,
      `I await with profound yearning for the endless horizons we shall traverse`,
    ],
  };

  /* ── ✦ 1. HERO NAME ─────────────────────────────────────── */
  const heroNameEl = document.getElementById('heroName');
  if (heroNameEl) heroNameEl.textContent = CONFIG.name + ' 💖 ';

  /* ── ✦ 2. TYPEWRITER ────────────────────────────────────── */
  (() => {
    const el    = document.getElementById('typewriter');
    if (!el) return;

    const lines = CONFIG.typewriterLines;
    let lineIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let pauseTicks = 0;

    const TYPING_SPEED  = 65;
    const DELETE_SPEED  = 35;
    const PAUSE_AFTER   = 22;  
    const PAUSE_BEFORE  = 8;   

    function tick() {
      const current = lines[lineIdx];

      if (!deleting && charIdx <= current.length) {
        el.textContent = current.slice(0, charIdx);
        charIdx++;
        if (charIdx > current.length) {
          deleting = true;
          pauseTicks = PAUSE_AFTER;
        }
        setTimeout(tick, TYPING_SPEED);

      } else if (deleting && pauseTicks > 0) {
        pauseTicks--;
        setTimeout(tick, TYPING_SPEED);

      } else if (deleting && charIdx >= 0) {
        el.textContent = current.slice(0, charIdx);
        charIdx--;
        if (charIdx < 0) {
          deleting  = false;
          pauseTicks = PAUSE_BEFORE;
          lineIdx   = (lineIdx + 1) % lines.length;
          charIdx   = 0;
        }
        setTimeout(tick, DELETE_SPEED);

      } else {
        pauseTicks--;
        setTimeout(tick, TYPING_SPEED);
      }
    }

    tick();
  })();

  /* ── ✦ 3. COUNTDOWN TIMER ───────────────────────────────── */
  (() => {
    const labelEl = document.getElementById('countdownLabel');
    const daysEl  = document.getElementById('cdDays');
    const hrsEl   = document.getElementById('cdHours');
    const minsEl  = document.getElementById('cdMins');
    const secsEl  = document.getElementById('cdSecs');
    if (!daysEl) return;

    function pad(n, len = 2) { return String(n).padStart(len, '0'); }

    function update() {
      const now = new Date();

      if (CONFIG.countdownMode === 'birthday') {
        labelEl.textContent = '⚡ Towards the Dawn of Thy Presence 🎂';
        let bday = new Date(CONFIG.birthdayDate);
        bday.setFullYear(now.getFullYear());
        if (bday < now) bday.setFullYear(now.getFullYear() + 1);
        const diff = bday - now;
        const d  = Math.floor(diff / 86400000);
        const h  = Math.floor((diff % 86400000) / 3600000);
        const m  = Math.floor((diff % 3600000)  / 60000);
        const s  = Math.floor((diff % 60000)    / 1000);
        daysEl.textContent  = pad(d, 3);
        hrsEl.textContent   = pad(h);
        minsEl.textContent  = pad(m);
        secsEl.textContent  = pad(s);

      } else {
        labelEl.textContent = '⚡ The Infinity We Have Woven Together ⚡';
        const since = new Date(CONFIG.togetherSince);
        const diff  = now - since;
        const d  = Math.floor(diff / 86400000);
        const h  = Math.floor((diff % 86400000) / 3600000);
        const m  = Math.floor((diff % 3600000)  / 60000);
        const s  = Math.floor((diff % 60000)    / 1000);
        daysEl.textContent  = pad(d, 3);
        hrsEl.textContent   = pad(h);
        minsEl.textContent  = pad(m);
        secsEl.textContent  = pad(s);
      }
    }

    update();
    setInterval(update, 1000);
  })();

  /* ── ✦ 4. FLOATING HEARTS CANVAS ───────────────────────── */
  (() => {
    const canvas = document.getElementById('heartsCanvas');
    if (!canvas) return;
    const ctx    = canvas.getContext('2d');

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const EMOJIS  = ['⚡', '🩷', '⚡', '💖', '✨', '🌸', '💗'];
    const COUNT   = window.innerWidth < 600 ? 18 : 20;
    const hearts  = [];

    function rand(min, max) { return Math.random() * (max - min) + min; }

    for (let i = 0; i < COUNT; i++) {
      hearts.push({
        x:       rand(0, window.innerWidth),
        y:       rand(window.innerHeight, window.innerHeight * 2),
        size:    rand(14, 32),
        speed:   rand(0.35, 1.0),
        drift:   rand(-0.4, 0.4),
        opacity: rand(0.3, 0.85),
        emoji:   EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        wobble:  rand(0, Math.PI * 2),
        wobbleSpeed: rand(0.01, 0.03),
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hearts.forEach(h => {
        h.y      -= h.speed;
        h.wobble += h.wobbleSpeed;
        h.x      += Math.sin(h.wobble) * 0.6 + h.drift;
        if (h.y < -60) {
          h.y      = canvas.height + 60;
          h.x      = rand(0, canvas.width);
          h.opacity = rand(0.3, 0.85);
        }
        ctx.globalAlpha = h.opacity;
        ctx.font        = `${h.size}px serif`;
        ctx.fillText(h.emoji, h.x, h.y);
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }
    draw();
  })();

  /* ── ✦ 5. LAUNCH CONFETTI (page load) ───────────────────── */
  (() => {
    if (typeof confetti !== 'function') return;

    const defaults = {
      particleCount: 3,
      spread: 60,
      colors: ['#f43f5e', '#fda4af', '#c9a96e', '#ffe4e6', '#fff', '#f7e9d3'],
    };

    function launchLeft() {
      confetti({ ...defaults, angle: 60,  origin: { x: 0, y: 0.65 } });
    }
    function launchRight() {
      confetti({ ...defaults, angle: 120, origin: { x: 1, y: 0.65 } });
    }

    confetti({
      particleCount: 140,
      spread: 100,
      origin: { y: 0.6 },
      colors: defaults.colors,
      startVelocity: 38,
    });

    const interval = setInterval(() => {
      launchLeft();
      launchRight();
    }, 180);
    setTimeout(() => clearInterval(interval), 3000);
  })();

  function burstAt(el) {
    if (typeof confetti !== 'function') return;
    const rect = el.getBoundingClientRect();
    confetti({
      particleCount: 90,
      spread: 80,
      origin: {
        x: (rect.left + rect.width  / 2) / window.innerWidth,
        y: (rect.top  + rect.height / 2) / window.innerHeight,
      },
      colors: ['#f43f5e', '#fda4af', '#c9a96e', '#fff', '#ffe4e6', '#ffd700'],
      startVelocity: 30,
    });
  }

  /* ── ✦ 6. GALLERY SLIDER (LOOP w/o empty space) ─────────── */
  (() => {
    const slider   = document.getElementById('gallerySlider');
    const prevBtn  = document.getElementById('galleryPrev');
    const nextBtn  = document.getElementById('galleryNext');
    const dotsWrap = document.getElementById('galleryDots');
    if (!slider) return;

    // Original slides (real content)
    const originalSlides = Array.from(slider.querySelectorAll('.gallery-slide'));
    const total = originalSlides.length;
    if (total < 2) return;

    let current = 0; // 0..total-1 (real index)
    let autoTimer = null;

    // Build dots (based on real slides)
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

    // Clone slides to create infinite-loop illusion
    // We'll have: [tail clones][head clones]
    // Start in the middle group.
    function decideCloneTimes() {
      const w = window.innerWidth;
      // show count-ish => helps avoid visible gaps on fast swipe/resize
      if (w >= 1024) return 3;
      if (w >= 600) return 2;
      return 1;
    }

    let cloneCount = decideCloneTimes();

    // Clear slider and re-render clones + originals
    const slideHTML = originalSlides.map(s => s.outerHTML);
    slider.innerHTML = '';

    // We create three groups: [tail][original][head]
    // tail/head are derived from original slides.
    function addGroup(fromIdx, count) {
      for (let i = 0; i < count; i++) {
        const idx = (fromIdx + i) % total;
        const tmp = document.createElement('div');
        tmp.innerHTML = slideHTML[idx];
        slider.appendChild(tmp.firstElementChild);
      }
    }

    // After cloning, total rendered slides = total * 3
    addGroup(total - (total * cloneCount % total), total); // tail
    addGroup(0, total); // middle
    addGroup(0, total); // head

    const renderedSlides = Array.from(slider.querySelectorAll('.gallery-slide'));

    function getSlideMetrics() {
      const first = renderedSlides[0];
      const slideWidth = first.getBoundingClientRect().width;
      // gap in your CSS is 1.5rem = 24px (gallery-slider gap: 1.5rem)
      const gap = 24;
      return { slideWidth: slideWidth + gap };
    }

    // internal position index within rendered slides
    // middle group starts at index = total
    let internalIndex = total; // corresponds to current real index 0

    function applyTransform({ animate }) {
      const { slideWidth } = getSlideMetrics();
      if (animate) {
        slider.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
      } else {
        slider.style.transition = 'none';
      }
      slider.style.transform = `translateX(-${internalIndex * slideWidth}px)`;
    }

    function syncDots() {
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function goTo(idx) {
      // idx is real index
      const nextReal = ((idx % total) + total) % total;
      const diff = nextReal - current;

      // Move by exactly 1 step in the direction to keep animation consistent
      // (buttons/dots already pass single-step or direct index)
      // For direct index jumps, just update real index and set internal index accordingly.
      current = nextReal;
      internalIndex = total + current;
      applyTransform({ animate: true });
      syncDots();

      // safety: after transition, ensure we stay in middle group range
      // (jump back to middle if we somehow drifted)
      window.setTimeout(() => {
        // constrain internal index back to middle group equivalent
        // if internal index lands in tail/head, normalize it.
        if (internalIndex < total) internalIndex += total;
        if (internalIndex >= total * 2) internalIndex -= total;
        applyTransform({ animate: false });
      }, 520);
    }

    slider.style.display = 'flex';
    slider.style.overflow = 'visible';
    slider.parentElement.style.overflow = 'hidden';

    function step(dir) {
      // dir: +1 next, -1 prev
      internalIndex += dir;
      current = (current + dir + total) % total;
      applyTransform({ animate: true });
      syncDots();

      // If we cross into clone group boundaries, instantly normalize position
      // so there is never a 'blank end'.
      window.setTimeout(() => {
        // tail group range: [0 .. total-1]
        // middle group: [total .. 2*total-1]
        // head group: [2*total .. 3*total-1]
        if (internalIndex < total) {
          internalIndex += total;
          applyTransform({ animate: false });
        } else if (internalIndex >= total * 2) {
          internalIndex -= total;
          applyTransform({ animate: false });
        }
      }, 520);
    }

    prevBtn.addEventListener('click', () => {
      step(-1);
      resetAuto();
    });
    nextBtn.addEventListener('click', () => {
      step(+1);
      resetAuto();
    });

    // Touch / swipe
    let touchStartX = 0;
    slider.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    slider.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) {
        dx < 0 ? step(+1) : step(-1);
        resetAuto();
      }
    });

    function startAuto() {
      autoTimer = setInterval(() => step(+1), 4000);
    }
    function resetAuto() {
      clearInterval(autoTimer);
      startAuto();
    }

    // Init
    internalIndex = total + current;
    applyTransform({ animate: false });
    syncDots();
    startAuto();

    window.addEventListener('resize', () => {
      // Recompute transform with same internal index
      applyTransform({ animate: false });
    });
  })();

  /* ── ✦ 7. ENVELOPE / LETTER ─────────────────────────────── */
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
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.5 },
            colors: ['#f43f5e', '#fda4af', '#fff', '#c9a96e'],
          });
        }
      }, 700);

      wrapper.style.cursor = 'default';
    }

    wrapper.addEventListener('click', openEnvelope);
    wrapper.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openEnvelope(); }
    });
  })();

  /* ── ✦ 8. COUPONS ───────────────────────────────────────── */
  (() => {
    const modal     = document.getElementById('couponModal');
    const modalEmoj = document.getElementById('modalEmoji');
    const modalTitle = document.getElementById('modalTitle');
    const modalClose = document.getElementById('modalClose');
    if (!modal) return;

    document.querySelectorAll('.coupon-card').forEach(card => {
      const btn = card.querySelector('.coupon-btn');
      if (!btn) return;

      btn.addEventListener('click', e => {
        e.stopPropagation();

        const emoji = card.dataset.emoji  || '🎁';
        const label = card.dataset.label  || 'Gift';

        burstAt(btn);

        modalEmoj.textContent  = emoji;
        modalTitle.textContent = label;
        modal.classList.add('open');

        card.classList.add('used');
        btn.textContent = '✓ Vow Manifested';
      });
    });

    function closeModal() { modal.classList.remove('open'); }
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  })();

  /* ── ✦ 9. MOBILE NAV ────────────────────────────────────── */
  (() => {
    const menuBtn   = document.getElementById('mobileMenuBtn');
    const menu      = document.getElementById('mobileMenu');
    const closeBtn  = document.getElementById('mobileMenuClose');
    if (!menuBtn || !menu) return;

    function openMenu()  { menu.classList.add('open'); document.body.style.overflow = 'hidden'; }
    function closeMenu() { menu.classList.remove('open'); document.body.style.overflow = ''; }

    menuBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);

    menu.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  })();

  /* ── ✦ 10. SCROLL REVEAL ────────────────────────────────── */
  (() => {
    const sections = document.querySelectorAll('section');

    sections.forEach(sec => {
      const children = sec.querySelectorAll(
        '.section-heading, .gallery-slider-wrapper, .video-container, ' +
        '.envelope-wrapper, .coupon-card, #galleryDots'
      );
      children.forEach(el => el.classList.add('reveal'));
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  })();

  /* ── ✦ 11. COUPON STAGGERED ENTRANCE ────────────────────── */
  (() => {
    const cards = document.querySelectorAll('.coupon-card');
    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 0.08}s`;
    });
  })();

  /* ── ✦ 12. THUNDER GIF REVEAL ───────────────────────────── */
  (() => {
    const thunder = document.querySelector('.thunder-gif-wrapper');
    if (!thunder) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          thunder.classList.add('show');

          if (typeof confetti === 'function') {
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#ffd700', '#fff8dc', '#ffe066'],
            });
          }

          io.disconnect();
        }
      });
    }, { threshold: 0.35 });

    io.observe(thunder);
  })();

});