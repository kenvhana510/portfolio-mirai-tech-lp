'use strict';

/* =====================================================================
   株式会社ミライテック 採用LP — main.js
   構成：1.モバイルナビ 2.スクロール時フェードアップ 3.数字カウントアップ
        4.応募フォーム（モック送信） 5.reduced-motion対応
===================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. モバイルナビ（ハンバーガーメニュー） ---------- */
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');

  function openNav() {
    mobileNav.hidden = false;
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'メニューを閉じる');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    mobileNav.hidden = true;
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'メニューを開く');
    document.body.style.overflow = '';
  }
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeNav() : openNav();
    });
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeNav);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        closeNav();
        navToggle.focus();
      }
    });
    // デスクトップ幅にリサイズされた場合はモバイルメニューを閉じておく
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && navToggle.getAttribute('aria-expanded') === 'true') {
        closeNav();
      }
    });
  }

  /* ---------- 2. スクロール時フェードアップ（IntersectionObserver） ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ---------- 3. 数字カウントアップ ---------- */
  const countEls = document.querySelectorAll('.js-count');

  function animateCount(el) {
    const target = parseFloat(el.dataset.target || '0');
    const decimals = parseInt(el.dataset.decimal || '0', 10);
    const duration = 1400;
    const start = performance.now();

    if (prefersReducedMotion) {
      el.textContent = target.toFixed(decimals);
      return;
    }

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      const current = target * eased;
      el.textContent = current.toFixed(decimals);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target.toFixed(decimals);
      }
    }
    requestAnimationFrame(tick);
  }

  if (countEls.length) {
    if (!('IntersectionObserver' in window)) {
      countEls.forEach(animateCount);
    } else {
      const countObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      countEls.forEach((el) => countObserver.observe(el));
    }
  }

  /* ---------- 4. 応募フォーム（ポートフォリオ用モック送信） ---------- */
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
