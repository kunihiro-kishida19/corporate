/* ═══════════════════════════
   Balcony — Shared JS
   ═══════════════════════════ */

(function() {
  'use strict';

  // NAV scroll
  var nav = document.getElementById('main-nav');
  if (nav) {
    window.addEventListener('scroll', function() {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  // Hamburger
  var ham = document.getElementById('hamburger');
  var mob = document.getElementById('mobile-menu');
  if (ham && mob) {
    ham.addEventListener('click', function() {
      ham.classList.toggle('open');
      mob.classList.toggle('open');
      document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
    });
  }
  window.closeMenu = function() {
    if (ham) ham.classList.remove('open');
    if (mob) mob.classList.remove('open');
    document.body.style.overflow = '';
  };

  // Nav active (current page highlight)
  var path = window.location.pathname;
  document.querySelectorAll('.nav-links a[data-page], .mobile-menu a[data-page]').forEach(function(link) {
    var page = link.dataset.page;
    var isActive = (page === 'home' && (path === '/' || path.endsWith('/index.html') && path.split('/').length <= 3))
      || (page !== 'home' && path.includes('/' + page));
    if (isActive) link.classList.add('active');
  });

  // Scroll reveal
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(function(el) { obs.observe(el); });

  // Hero bg load animation
  var heroBg = document.querySelector('.page-hero-bg');
  if (heroBg) {
    var img = new Image();
    img.onload = function() { heroBg.classList.add('loaded'); };
    var bg = window.getComputedStyle(heroBg).backgroundImage;
    var match = bg.match(/url\(["']?([^"')]+)["']?\)/);
    if (match) img.src = match[1];
  }

  // Floating CTA
  var floatCta = document.getElementById('float-contact');
  if (floatCta && !path.includes('/contact')) {
    window.addEventListener('scroll', function() {
      floatCta.classList.toggle('visible', window.scrollY > 200);
    });
  }

  // Contact form (Formspree — same mechanism as security LP)
  var form = document.getElementById('contact-form');
  if (form) {
    var FORMSPREE_ID = 'xwvnnqjj';
    var lastSubmitTime = 0;
    var RATE_LIMIT_MS = 30000; // 30 seconds between submissions

    function showToast() {
      var popup = document.getElementById('toast-popup');
      if (!popup) return;
      popup.classList.remove('hide');
      popup.classList.add('show');
      var bar = popup.querySelector('.toast-bar');
      if (bar) {
        bar.style.animation = 'none';
        void bar.offsetWidth;
        bar.style.animation = '';
      }
      setTimeout(function() {
        popup.classList.add('hide');
        setTimeout(function() { popup.classList.remove('show', 'hide'); }, 350);
      }, 2500);
    }

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = document.getElementById('submit-btn');

      // Honeypot check — bots fill hidden fields
      var honeypot = form.querySelector('[name="website"]');
      if (honeypot && honeypot.value) return;

      // Rate limiting — prevent rapid-fire submissions
      var now = Date.now();
      if (now - lastSubmitTime < RATE_LIMIT_MS) {
        alert('送信間隔が短すぎます。しばらく待ってから再度お試しください。');
        return;
      }
      lastSubmitTime = now;

      // ボタンを送信中状態に
      btn.textContent = '送信中…';
      btn.disabled = true;
      btn.style.opacity = '0.7';

      var data = new FormData(form);
      // Remove custom honeypot from data sent to Formspree
      data.delete('website');

      fetch('https://formspree.io/f/' + FORMSPREE_ID, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      })
      .then(function(res) {
        if (res.ok) {
          // 送信成功
          form.reset();
          btn.textContent = '送信しました ✓';
          btn.style.opacity = '1';
          showToast();
        } else {
          // サーバーエラー
          return res.json().then(function(json) {
            throw new Error(json.errors ? json.errors.map(function(e){return e.message;}).join(', ') : '送信エラー');
          });
        }
      })
      .catch(function(err) {
        btn.textContent = '送信する';
        btn.disabled = false;
        btn.style.opacity = '1';
        alert('送信に失敗しました。時間をおいて再度お試しいただくか、メールにてお問い合わせください。\n\nsales@balcony.co.jp');
        console.error(err);
      });
    });
  }

})();
