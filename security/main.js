// ── SCROLL REVEAL ──
var revealObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(function(el) { revealObs.observe(el); });

// ── NAV SCROLL-SPY & COMPACT ──
var navLinks = document.querySelectorAll('.nav-links a[data-section]');
var sectionIds = ['hero', 'diff', 'services', 'ai', 'deliverables', 'free-diag', 'faq', 'contact'];
var spyObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      var id = entry.target.id;
      navLinks.forEach(function(link) {
        link.classList.toggle('active', link.dataset.section === id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sectionIds.forEach(function(id) {
  var el = document.getElementById(id);
  if (el) spyObs.observe(el);
});
window.addEventListener('scroll', function() {
  document.getElementById('main-nav').classList.toggle('compact', scrollY > 60);
});

// ── FLOATING CTA ──
var floatCta = document.getElementById('float-cta');
var heroSection = document.getElementById('hero');
var contactSection = document.getElementById('contact');
var floatObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.target === heroSection && !e.isIntersecting) {
      floatCta.classList.add('visible');
    } else if (e.target === heroSection && e.isIntersecting) {
      floatCta.classList.remove('visible');
    }
    if (e.target === contactSection && e.isIntersecting) {
      floatCta.classList.remove('visible');
    }
  });
}, { threshold: 0.1 });
if (heroSection) floatObs.observe(heroSection);
if (contactSection) floatObs.observe(contactSection);

// ── HAMBURGER MENU ──
var hamburger = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', function() {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
function closeMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

// ── ALIGN TERMINAL TO SUBTITLE ──
function alignTerminal() {
  var subtitle = document.getElementById('hero-subtitle');
  var termWrap = document.getElementById('hero-terminal-wrap');
  if (!subtitle || !termWrap) return;
  var heroContent = document.querySelector('.hero-content');
  if (window.innerWidth <= 1280) { termWrap.style.paddingTop = '0px'; return; }
  var contentTop = heroContent.getBoundingClientRect().top;
  var subtitleTop = subtitle.getBoundingClientRect().top;
  var offset = subtitleTop - contentTop;
  if (offset > 0) termWrap.style.paddingTop = offset + 'px';
}

document.fonts.ready.then(function() {
  setTimeout(function() { alignTerminal(); }, 150);
});
window.addEventListener('resize', function() { alignTerminal(); });

// ── TERMINAL TYPEWRITER ──
(function() {
  var lines = document.querySelectorAll('#terminal-body .t-line');
  lines.forEach(function(line, i) {
    line.style.opacity = '0';
    line.style.transform = 'translateX(-8px)';
    setTimeout(function() {
      line.style.transition = 'opacity 0.3s, transform 0.3s';
      line.style.opacity = '1';
      line.style.transform = 'translateX(0)';
    }, 1200 + i * 280);
  });
})();

// ── FORM SUBMIT (Formspree) ──
// 【設定手順】
//   1. https://formspree.io にアクセスし、sales@balcony.co.jp でアカウント登録
//   2. 「New Form」を作成し、送信先に sales@balcony.co.jp を設定
//   3. 発行された Form ID（例: xabc1234）を下の FORMSPREE_ID に貼り付け
var FORMSPREE_ID = 'xwvnnqjj'; // ← ここを差し替えてください
var lastSubmitTime = 0;
var RATE_LIMIT_MS = 30000; // 30 seconds between submissions

function showToast() {
  var popup = document.getElementById('toast-popup');
  popup.classList.remove('hide');
  popup.classList.add('show');
  // toast-bar のアニメーションをリセットして再実行
  var bar = popup.querySelector('.toast-bar');
  bar.style.animation = 'none';
  void bar.offsetWidth; // reflow
  bar.style.animation = '';
  setTimeout(function() {
    popup.classList.add('hide');
    setTimeout(function() { popup.classList.remove('show', 'hide'); }, 350);
  }, 2000);
}

function handleSubmit(e) {
  e.preventDefault();
  var form = e.target;
  var btn = document.getElementById('submit-btn');

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
      btn.style.background = 'var(--c4)';
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
    btn.textContent = '送信する →';
    btn.disabled = false;
    btn.style.opacity = '1';
    alert('送信に失敗しました。時間をおいて再度お試しいただくか、メールにてお問い合わせください。\n\nsales@balcony.co.jp');
    console.error(err);
  });
}

// ── FAQ ──
document.querySelectorAll('.faq-q').forEach(function(el) {
  el.addEventListener('click', function() {
    var item = el.closest('.faq-item');
    var isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(function(i) { i.classList.remove('open'); });
    if (!isOpen) item.classList.add('open');
  });
});

// ── FORM SUBMIT バインド ──
var contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', handleSubmit);
}

// ── MOBILE MENU リンクのクローズ ──
document.querySelectorAll('.mobile-menu a').forEach(function(a) {
  a.addEventListener('click', closeMenu);
});
