/* ============================================================
   BIRTHDAY WEBSITE — script.js
   All interaction logic: confetti, typewriter, countdown,
   gallery slider, envelope, coupons, floating hearts
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ── ✦ CONFIGURATION (edit these!) ──────────────────────── */
  const CONFIG = {
    name:            'Hanna Tamara',        // ← Your girlfriend's name
    birthdayDate:    '2025-05-24',     // ← Her birthday  YYYY-MM-DD
    togetherSince:   '2023-06-14',     // ← Your anniversary YYYY-MM-DD
    countdownMode:   'together',       // 'birthday' or 'together'
    typewriterLines: [
      `Happy Birthday, Sayang! 🎉`,
      `You mean the world to me 💖`,
      `Today is all about YOU ✨`,
      `I love you more every day 🌹`,
    ],
  };

  /* ── ✦ 1. HERO NAME ─────────────────────────────────────── */
  const heroNameEl = document.getElementById('heroName');
  if (heroNameEl) heroNameEl.textContent = CONFIG.name + ' 💖';

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
    const PAUSE_AFTER   = 22;  // ticks to wait before deleting
    const PAUSE_BEFORE  = 8;   // ticks to wait before typing next

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
        /* Count down to NEXT birthday */
        labelEl.textContent = 'Countdown to Her Birthday 🎂';
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
        /* Count up from anniversary */
        labelEl.textContent = 'Days We\'ve Been Together 🥂';
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

    const EMOJIS  = ['❤️', '🩷', '💕', '💖', '✨', '🌸', '💗'];
    const COUNT   = window.innerWidth < 600 ? 18 : 30;
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

    // Initial burst
    confetti({
      particleCount: 140,
      spread: 100,
      origin: { y: 0.6 },
      colors: defaults.colors,
      startVelocity: 38,
    });

    // Continuous light shower for 3 seconds
    const interval = setInterval(() => {
      launchLeft();
      launchRight();
    }, 180);
    setTimeout(() => clearInterval(interval), 3000);
  })();

  /* Helper: burst confetti from element */
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

  /* ── ✦ 6. GALLERY SLIDER ────────────────────────────────── */
  (() => {
    const slider   = document.getElementById('gallerySlider');
    const prevBtn  = document.getElementById('galleryPrev');
    const nextBtn  = document.getElementById('galleryNext');
    const dotsWrap = document.getElementById('galleryDots');
    if (!slider) return;

    const slides    = slider.querySelectorAll('.gallery-slide');
    const total     = slides.length;
    let   current   = 0;
    let   autoTimer = null;

    /* Build dots */
    const dots = [];
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className   = 'gallery-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });

    function getVisibleCount() {
      return window.innerWidth >= 1024 ? 3
           : window.innerWidth >= 600  ? 2
           : 1;
    }

    function goTo(idx) {
      current = Math.max(0, Math.min(idx, total - 1));
      const slideWidth = slides[0].offsetWidth + 24; // gap = 1.5rem = 24px
      slider.style.transform = `translateX(-${current * slideWidth}px)`;
      slider.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';

      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    /* Override slider overflow with transform approach */
    slider.style.display    = 'flex';
    slider.style.overflow   = 'visible';
    slider.style.transform  = 'translateX(0)';
    slider.parentElement.style.overflow = 'hidden';

    prevBtn.addEventListener('click', () => {
      goTo(current > 0 ? current - 1 : total - 1);
      resetAuto();
    });
    nextBtn.addEventListener('click', () => {
      goTo(current < total - 1 ? current + 1 : 0);
      resetAuto();
    });

    /* Touch / swipe */
    let touchStartX = 0;
    slider.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend',   e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) {
        dx < 0 ? goTo(current + 1) : goTo(current - 1);
        resetAuto();
      }
    });

    /* Auto-play */
    function startAuto() { autoTimer = setInterval(() => goTo((current + 1) % total), 4000); }
    function resetAuto()  { clearInterval(autoTimer); startAuto(); }
    startAuto();

    window.addEventListener('resize', () => goTo(current));
    goTo(0);
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
        // Small confetti burst when letter appears
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

        // Confetti burst
        burstAt(btn);

        // Show modal
        modalEmoj.textContent  = emoji;
        modalTitle.textContent = label;
        modal.classList.add('open');

        // Mark card as used (optional visual)
        card.classList.add('used');
        btn.textContent = '✓ Redeemed';
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

    /* Add .reveal class to direct children of sections */
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

});
