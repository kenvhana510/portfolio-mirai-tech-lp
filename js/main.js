'use strict';

/* =====================================================================
   株式会社ミライテック 採用LP — main.js v2 (redesign/v2)
   構成：1.ヘッダー/モバイルナビ 2.ヒーロー 3.GSAP演出（reveal/parallax/
        kicker/count-up/ring/step line/横ピンスクロール）4.カルーセル
        5.マグネットボタン 6.応募フォーム（モック送信・挙動は旧版と同一）
   方針：GSAPが読めない／reduced-motion の場合は全要素を即表示する。
===================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  const animate = hasGsap && !reduceMotion;

  /* ---------- 1. ヘッダー / モバイルナビ ---------- */
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');

  function updateHeader() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  function openNav() {
    mobileNav.hidden = false;
    requestAnimationFrame(() => mobileNav.classList.add('is-open'));
    header.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'メニューを閉じる');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    mobileNav.classList.remove('is-open');
    header.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'メニューを開く');
    document.body.style.overflow = '';
    const delay = reduceMotion ? 0 : 700;
    window.setTimeout(() => { if (!mobileNav.classList.contains('is-open')) mobileNav.hidden = true; }, delay);
  }
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeNav() : openNav();
    });
    mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        closeNav();
        navToggle.focus();
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && navToggle.getAttribute('aria-expanded') === 'true') closeNav();
    });
  }

  /* ---------- 2. ヒーロー（見出しスタガー／スクロール連動） ---------- */
  const hero = document.querySelector('.hero');
  if (hero) {
    // 行ごとのスタガーはCSS transitionで実行（is-ready付与で開始）
    requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('is-ready')));
  }

  /* ---------- 3. 全要素即表示（フォールバック） ---------- */
  const revealEls = document.querySelectorAll('.rv');
  const showAll = () => {
    revealEls.forEach((el) => el.classList.add('is-visible'));
    document.querySelectorAll('.step-line__item').forEach((el) => el.classList.add('is-visible'));
    document.querySelectorAll('.ring').forEach((ring) => {
      ring.style.setProperty('--p', String(parseFloat(ring.dataset.ring || '60') / 100));
      ring.classList.add('is-done');
    });
    document.querySelectorAll('.js-count').forEach((el) => {
      el.textContent = parseFloat(el.dataset.target || '0').toFixed(parseInt(el.dataset.decimal || '0', 10));
    });
    const prog = document.getElementById('stepProgress');
    if (prog) prog.style.transform = 'none';
  };

  if (!animate) {
    showAll();
  } else {
    gsap.registerPlugin(ScrollTrigger);

    /* reveal：セクション内で順番にスタガー */
    const groups = new Map();
    revealEls.forEach((el) => {
      const sec = el.closest('section, footer') || document.body;
      if (!groups.has(sec)) groups.set(sec, []);
      groups.get(sec).push(el);
    });
    ScrollTrigger.batch('.rv', {
      start: 'top 88%',
      once: true,
      onEnter: (batch) => {
        batch.forEach((el, i) => {
          window.setTimeout(() => el.classList.add('is-visible'), i * 90);
        });
      }
    });

    /* ヒーロー：スクロールで見出しが上に流れ、背景は遅れて動く */
    gsap.to('.hero__content', {
      y: -80, opacity: 0, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
    gsap.to('.hero__img', {
      y: 120, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });

    /* 巨大キッカーのパララックス */
    document.querySelectorAll('[data-kicker]').forEach((el) => {
      gsap.fromTo(el, { y: 80 }, {
        y: -80, ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1.2 }
      });
    });

    /* 画像パララックス（±40px以内） */
    document.querySelectorAll('[data-parallax]').forEach((img) => {
      const amount = Math.max(-40, Math.min(40, parseFloat(img.dataset.parallax || '30')));
      gsap.fromTo(img, { y: -amount }, {
        y: amount, ease: 'none',
        scrollTrigger: { trigger: img.closest('section') || img, start: 'top bottom', end: 'bottom top', scrub: 0.8 }
      });
    });

    /* カウントアップ＋リング */
    document.querySelectorAll('.stat-card').forEach((card) => {
      const num = card.querySelector('.js-count');
      const ring = card.querySelector('.ring');
      ScrollTrigger.create({
        trigger: card, start: 'top 85%', once: true,
        onEnter: () => {
          if (num) {
            const target = parseFloat(num.dataset.target || '0');
            const decimals = parseInt(num.dataset.decimal || '0', 10);
            const obj = { v: 0 };
            gsap.to(obj, { v: target, duration: 1.6, ease: 'power3.out', onUpdate: () => { num.textContent = obj.v.toFixed(decimals); } });
          }
          if (ring) {
            ring.style.setProperty('--p', String(parseFloat(ring.dataset.ring || '60') / 100));
            ring.classList.add('is-done');
          }
        }
      });
    });

    /* 成長STEP：ラインがスクロールに追従して伸びる */
    const prog = document.getElementById('stepProgress');
    if (prog) {
      const horizontal = () => window.innerWidth >= 1024;
      gsap.fromTo(prog, { scaleX: horizontal() ? 0 : 1, scaleY: horizontal() ? 1 : 0 }, {
        scaleX: 1, scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: '.step-line', start: 'top 75%', end: 'bottom 60%', scrub: 0.6, invalidateOnRefresh: true }
      });
      document.querySelectorAll('.step-line__item').forEach((item) => {
        ScrollTrigger.create({ trigger: item, start: 'top 72%', once: true, onEnter: () => item.classList.add('is-visible') });
      });
    }

    /* 1日の流れ：PCは横ピンスクロール（シグネチャ演出） */
    const dayTrack = document.getElementById('dayTrack');
    const dayPin = document.querySelector('.day__pin');
    if (dayTrack && dayPin) {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        const getDistance = () => Math.max(0, dayTrack.scrollWidth - dayPin.clientWidth + 32);
        const tween = gsap.to(dayTrack, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: '.day',
            start: 'top top',
            end: () => '+=' + (getDistance() + 200),
            pin: dayPin,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1
          }
        });
        return () => { tween.kill(); };
      });
    }

    /* ヘッダー縮小はscrollイベント側で処理済み。画像読み込み後にレイアウトを再計測 */
    window.addEventListener('load', () => ScrollTrigger.refresh());
  }

  /* ---------- 4. 社員の声カルーセル（scroll-snap、ライブラリ不使用） ---------- */
  const track = document.getElementById('voiceTrack');
  const dotsWrap = document.getElementById('voiceDots');
  const prevBtn = document.getElementById('voicePrev');
  const nextBtn = document.getElementById('voiceNext');
  if (track && dotsWrap) {
    const cards = Array.from(track.children);
    const dots = cards.map((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'carousel__dot';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', (i + 1) + '人目の社員の声');
      b.addEventListener('click', () => scrollToCard(i));
      dotsWrap.appendChild(b);
      return b;
    });
    let current = 0;
    function cardOffset(i) {
      const first = cards[0].offsetLeft;
      return cards[i].offsetLeft - first;
    }
    function scrollToCard(i) {
      const idx = Math.max(0, Math.min(cards.length - 1, i));
      track.scrollTo({ left: cardOffset(idx), behavior: reduceMotion ? 'auto' : 'smooth' });
    }
    function sync() {
      const left = track.scrollLeft;
      let best = 0, bestDist = Infinity;
      cards.forEach((_, i) => {
        const d = Math.abs(cardOffset(i) - left);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      current = best;
      dots.forEach((d, i) => d.setAttribute('aria-selected', i === current ? 'true' : 'false'));
      const maxLeft = track.scrollWidth - track.clientWidth - 2;
      if (prevBtn) prevBtn.disabled = left <= 2;
      if (nextBtn) nextBtn.disabled = left >= maxLeft;
    }
    let raf = 0;
    track.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(sync); }, { passive: true });
    window.addEventListener('resize', sync);
    if (prevBtn) prevBtn.addEventListener('click', () => scrollToCard(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => scrollToCard(current + 1));
    sync();
  }

  /* ---------- 5. マグネットボタン（ホバー可能なデバイスのみ） ---------- */
  if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.btn--magnet').forEach((btn) => {
      const strength = 0.25;
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * strength;
        const dy = (e.clientY - (r.top + r.height / 2)) * strength;
        btn.style.transform = 'translate(' + dx.toFixed(1) + 'px,' + (dy - 2).toFixed(1) + 'px)';
      });
      btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---------- 6. 応募フォーム（ポートフォリオ用モック送信・旧版と同一挙動） ---------- */
  const applyForm = document.getElementById('applyForm');
  const applySuccess = document.getElementById('applySuccess');
  const applyReset = document.getElementById('applyReset');

  if (applyForm && applySuccess) {
    applyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!applyForm.checkValidity()) {
        applyForm.reportValidity();
        return;
      }
      // 実送信は行わない（ポートフォリオ用UIサンプル）
      applyForm.hidden = true;
      applySuccess.hidden = false;
      applySuccess.setAttribute('tabindex', '-1');
      applySuccess.focus();
    });

    if (applyReset) {
      applyReset.addEventListener('click', () => {
        applyForm.reset();
        applySuccess.hidden = true;
        applyForm.hidden = false;
      });
    }
  }
});
