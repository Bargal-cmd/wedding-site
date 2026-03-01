/* ══════════════════════════════════════════
   ROYAL INDIAN WEDDING — script.js
   Shital ❤ Sunil | 17 March 2025
══════════════════════════════════════════ */

// ─── AOS INIT ──────────────────────────────
AOS.init({
  duration: 900,
  once: true,
  easing: 'ease-out-cubic',
  offset: 80
});

// ─── FLOATING PETALS ──────────────────────
function createPetals(containerId, count) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const colors = ['#C9A84C','#E85D75','#F5E6B8','#8B1A2A','#E8C96A','#FFB6C1'];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('petal');
    p.style.left            = Math.random() * 100 + '%';
    p.style.animationDuration  = (Math.random() * 8 + 6) + 's';
    p.style.animationDelay     = (Math.random() * 10) + 's';
    p.style.backgroundColor    = colors[Math.floor(Math.random() * colors.length)];
    p.style.width  = (Math.random() * 10 + 8) + 'px';
    p.style.height = (Math.random() * 10 + 8) + 'px';
    p.style.opacity = (Math.random() * 0.5 + 0.3).toString();
    container.appendChild(p);
  }
}
createPetals('entry-petals', 20);
createPetals('site-petals', 18);

// ─── ENTRY SCREEN ─────────────────────────
const entryScreen = document.getElementById('entry-screen');
const mainSite    = document.getElementById('main-site');
const enterBtn    = document.getElementById('enter-btn');
const bgMusic     = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const musicIcon   = document.getElementById('music-icon');
let musicPlaying  = false;

enterBtn.addEventListener('click', () => {
  // Start music
  bgMusic.volume = 0.4;
  bgMusic.play().then(() => {
    musicPlaying = true;
    musicIcon.textContent = '🔇';
  }).catch(() => {});

  entryScreen.classList.add('fade-out');
  setTimeout(() => {
    entryScreen.style.display = 'none';
    mainSite.classList.remove('hidden');
    musicToggle.classList.remove('hidden');
    initHero();
    AOS.refreshHard();
  }, 900);
});

// Music Toggle
musicToggle.addEventListener('click', () => {
  if (musicPlaying) {
    bgMusic.pause();
    musicIcon.textContent = '🎵';
    musicPlaying = false;
  } else {
    bgMusic.play().catch(() => {});
    musicIcon.textContent = '🔇';
    musicPlaying = true;
  }
});

// ─── COUNTDOWN TIMER ──────────────────────
const WEDDING_DATE = new Date('2025-03-17T00:00:00');

function updateCountdown() {
  const now  = new Date();
  const diff = WEDDING_DATE - now;

  // Wedding date is in the past — show "days married" counter
  if (diff <= 0) {
    const elapsed     = now - WEDDING_DATE;
    const daysPassed  = Math.floor(elapsed / (1000 * 60 * 60 * 24));
    const hoursPassed = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minsPassed  = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    const secsPassed  = Math.floor((elapsed % (1000 * 60)) / 1000);

    document.getElementById('cd-days').textContent  = String(daysPassed).padStart(2,'0');
    document.getElementById('cd-hours').textContent = String(hoursPassed).padStart(2,'0');
    document.getElementById('cd-mins').textContent  = String(minsPassed).padStart(2,'0');
    document.getElementById('cd-secs').textContent  = String(secsPassed).padStart(2,'0');

    // Update labels to reflect "days married"
    const labels = document.querySelectorAll('.countdown-item small');
    if (labels.length === 4 && labels[0].textContent === 'Days') {
      labels[0].textContent = 'Days';
      labels[1].textContent = 'Hours';
      labels[2].textContent = 'Minutes';
      labels[3].textContent = 'Seconds';
    }

    // Show celebration message once
    if (!document.getElementById('cd-married-label')) {
      const wrap = document.querySelector('.countdown-wrap');
      if (wrap) {
        const msg = document.createElement('p');
        msg.id = 'cd-married-label';
        msg.style.cssText = `
          width: 100%;
          text-align: center;
          font-family: 'Great Vibes', cursive;
          font-size: clamp(1.3rem, 3vw, 1.8rem);
          color: #E8C96A;
          margin-top: 12px;
          letter-spacing: 1px;
          text-shadow: 0 0 20px rgba(201,168,76,0.5);
        `;
        msg.textContent = '✦ Happily Married ✦';
        wrap.appendChild(msg);
      }
    }
    return;
  }

  // Wedding is upcoming — countdown
  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('cd-days').textContent  = String(days).padStart(2,'0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2,'0');
  document.getElementById('cd-mins').textContent  = String(minutes).padStart(2,'0');
  document.getElementById('cd-secs').textContent  = String(seconds).padStart(2,'0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ─── TSPARTICLES FIREWORKS ─────────────────
function initHero() {
  if (typeof tsParticles === 'undefined') return;

  tsParticles.load('particles-hero', {
    fullScreen: { enable: false },
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    particles: {
      number: { value: 0 },
      color: {
        value: ['#C9A84C','#E8C96A','#F5E6B8','#E85D75','#FF6B8A','#fff']
      },
      shape: { type: 'circle' },
      opacity: {
        value: { min: 0.3, max: 1 },
        animation: { enable: true, speed: 1, destroy: 'min' }
      },
      size: {
        value: { min: 2, max: 5 },
        animation: { enable: false }
      },
      life: {
        duration: { sync: true, value: 3 },
        count: 1
      },
      move: {
        enable: true,
        gravity: { enable: true, acceleration: 9.8 },
        speed: { min: 10, max: 30 },
        decay: 0.1,
        direction: 'none',
        random: true,
        straight: false,
        outModes: { default: 'destroy', top: 'none' }
      },
      rotate: {
        value: { min: 0, max: 360 },
        direction: 'random',
        animation: { enable: true, speed: 60 }
      },
      tilt: {
        direction: 'random',
        enable: true,
        value: { min: 0, max: 360 },
        animation: { enable: true, speed: 60 }
      },
      wobble: {
        distance: 20,
        enable: true,
        speed: { min: -15, max: 15 }
      }
    },
    emitters: [
      {
        life: { count: 0, delay: 0, duration: 0.1 },
        rate: { delay: 0.15, quantity: 30 },
        position: { x: 30, y: 40 },
        size: { width: 0, height: 0 }
      },
      {
        life: { count: 0, delay: 0.4, duration: 0.1 },
        rate: { delay: 0.15, quantity: 30 },
        position: { x: 70, y: 40 },
        size: { width: 0, height: 0 }
      },
      {
        life: { count: 0, delay: 0.8, duration: 0.1 },
        rate: { delay: 0.15, quantity: 20 },
        position: { x: 50, y: 30 },
        size: { width: 0, height: 0 }
      }
    ]
  }).catch(() => {});
}

// ─── GALLERY LIGHTBOX ─────────────────────
function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  img.src = src;
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});
// Expose globally
window.openLightbox  = openLightbox;
window.closeLightbox = closeLightbox;

// ─── SHARE MODAL & INVITATION CARD ────────

function openShareModal() {
  const modal = document.getElementById('share-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  // Wait for fonts then draw
  document.fonts.ready.then(() => drawInviteCard());
}

function closeShareModal(e) {
  if (e && e.target !== document.getElementById('share-modal')) return;
  document.getElementById('share-modal').classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.getElementById('share-modal').classList.remove('active');
    document.body.style.overflow = '';
  }
});
window.openShareModal  = openShareModal;
window.closeShareModal = closeShareModal;

// ─── DRAW CANVAS INVITATION CARD ──────────
function drawInviteCard() {
  const canvas = document.getElementById('invite-canvas');
  if (!canvas) return;

  const W = 720, H = 960;
  canvas.width  = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // ── Background gradient (deep maroon) ──
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0,   '#3B0512');
  bg.addColorStop(0.4, '#5A0A18');
  bg.addColorStop(0.7, '#3B0512');
  bg.addColorStop(1,   '#1E030A');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // ── Radial glow center ──
  const glow = ctx.createRadialGradient(W/2, H/2, 60, W/2, H/2, 460);
  glow.addColorStop(0,   'rgba(201,168,76,0.10)');
  glow.addColorStop(1,   'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // ── Outer gold border ──
  roundRect(ctx, 18, 18, W-36, H-36, 28, null, '#C9A84C', 2.5);

  // ── Inner border (thin) ──
  roundRect(ctx, 32, 32, W-64, H-64, 20, null, 'rgba(201,168,76,0.4)', 1);

  // ── Corner ornaments ──
  drawCornerOrnament(ctx, 50, 50);
  drawCornerOrnament(ctx, W-50, 50,   Math.PI/2);
  drawCornerOrnament(ctx, W-50, H-50, Math.PI);
  drawCornerOrnament(ctx, 50,   H-50, -Math.PI/2);

  // ── Top band ──
  ctx.fillStyle = 'rgba(201,168,76,0.08)';
  roundRect(ctx, 32, 32, W-64, 140, 20, 'rgba(201,168,76,0.08)');

  // ── Auspicious text ──
  ctx.textAlign = 'center';
  ctx.fillStyle = '#E8C96A';
  ctx.font = '500 22px "Poppins", sans-serif';
  ctx.globalAlpha = 0.8;
  ctx.fillText('॥ शुभ विवाह ॥', W/2, 88);
  ctx.globalAlpha = 1;

  // ── Divider line top ──
  goldLine(ctx, W/2, 105, 200);

  // ── WITH BLESSINGS label ──
  ctx.fillStyle = '#C9A84C';
  ctx.font = '400 14px "Poppins", sans-serif';
  ctx.letterSpacing = '4px';
  ctx.fillText('WITH DIVINE BLESSINGS', W/2, 148);
  ctx.letterSpacing = '0px';

  // ── Floral divider ──
  flowerRow(ctx, W/2, 180);

  // ── Names ──
  ctx.fillStyle = '#F5E6B8';
  ctx.font = 'italic 700 86px "Playfair Display", serif';
  ctx.shadowColor = 'rgba(201,168,76,0.5)';
  ctx.shadowBlur  = 30;
  ctx.fillText('Shital', W/2, 295);
  ctx.shadowBlur = 0;

  // Heart
  ctx.font = '42px serif';
  ctx.fillStyle = '#E85D75';
  ctx.shadowColor = 'rgba(232,93,117,0.6)';
  ctx.shadowBlur  = 20;
  ctx.fillText('❤', W/2, 358);
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#F5E6B8';
  ctx.font = 'italic 700 86px "Playfair Display", serif';
  ctx.shadowColor = 'rgba(201,168,76,0.5)';
  ctx.shadowBlur  = 30;
  ctx.fillText('Sunil', W/2, 450);
  ctx.shadowBlur = 0;

  // ── Together Forever ──
  ctx.fillStyle = '#E8C96A';
  ctx.font = 'italic 400 28px "Playfair Display", serif';
  ctx.fillText('Together Forever', W/2, 500);

  // ── Gold divider ──
  goldLine(ctx, W/2, 526, 260);

  // ── YOU ARE INVITED ──
  ctx.fillStyle = 'rgba(245,230,184,0.75)';
  ctx.font = '300 16px "Poppins", sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillText('YOU ARE CORDIALLY INVITED', W/2, 572);
  ctx.letterSpacing = '0px';

  // ── Event details box ──
  roundRect(ctx, 100, 596, W-200, 230, 16, 'rgba(201,168,76,0.07)', 'rgba(201,168,76,0.3)', 1);

  ctx.textAlign = 'center';

  // Mehndi row
  eventRow(ctx, W/2, 638, '🌿', 'Mehndi Ceremony', '15 March · Evening · At Home');

  // divider
  ctx.strokeStyle = 'rgba(201,168,76,0.2)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(140, 660); ctx.lineTo(W-140, 660); ctx.stroke();

  // Haldi row
  eventRow(ctx, W/2, 702, '💛', 'Haldi Ceremony', '16 March · Morning · At Home');

  ctx.beginPath(); ctx.moveTo(140, 724); ctx.lineTo(W-140, 724); ctx.stroke();

  // Wedding row
  ctx.fillStyle = '#E8C96A';
  ctx.font = '700 20px "Playfair Display", serif';
  ctx.fillText('💍  Wedding Ceremony', W/2, 760);
  ctx.fillStyle = '#C9A84C';
  ctx.font = '400 14px "Poppins", sans-serif';
  ctx.fillText('17 March 2025  ·  Auspicious Muhurat', W/2, 784);
  ctx.fillStyle = 'rgba(201,168,76,0.8)';
  ctx.font      = '400 12px "Poppins", sans-serif';
  ctx.fillText('Maharashtra, India', W/2, 804);

  // ── Bottom divider ──
  flowerRow(ctx, W/2, 852);

  // ── Family ──
  ctx.fillStyle = 'rgba(245,230,184,0.55)';
  ctx.font = '300 14px "Poppins", sans-serif';
  ctx.fillText('— Bargal Family', W/2, 890);

  // ── Watermark ──
  ctx.fillStyle = 'rgba(201,168,76,0.25)';
  ctx.font = 'italic 400 13px "Poppins", sans-serif';
  ctx.fillText(window.location.hostname || 'Wedding Invitation', W/2, 930);
}

// ─── Canvas helpers ─────────────────────

function roundRect(ctx, x, y, w, h, r, fill, stroke, lineW) {
  ctx.beginPath();
  ctx.moveTo(x+r, y);
  ctx.lineTo(x+w-r, y);
  ctx.quadraticCurveTo(x+w, y, x+w, y+r);
  ctx.lineTo(x+w, y+h-r);
  ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
  ctx.lineTo(x+r, y+h);
  ctx.quadraticCurveTo(x, y+h, x, y+h-r);
  ctx.lineTo(x, y+r);
  ctx.quadraticCurveTo(x, y, x+r, y);
  ctx.closePath();
  if (fill)  { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke){ ctx.strokeStyle = stroke; ctx.lineWidth = lineW||1; ctx.stroke(); }
}

function goldLine(ctx, cx, y, halfW) {
  const g = ctx.createLinearGradient(cx-halfW, y, cx+halfW, y);
  g.addColorStop(0,   'transparent');
  g.addColorStop(0.3, '#C9A84C');
  g.addColorStop(0.5, '#E8C96A');
  g.addColorStop(0.7, '#C9A84C');
  g.addColorStop(1,   'transparent');
  ctx.strokeStyle = g;
  ctx.lineWidth   = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx-halfW, y);
  ctx.lineTo(cx+halfW, y);
  ctx.stroke();
  // diamond
  ctx.fillStyle = '#E8C96A';
  ctx.save();
  ctx.translate(cx, y);
  ctx.rotate(Math.PI/4);
  ctx.fillRect(-4, -4, 8, 8);
  ctx.restore();
}

function flowerRow(ctx, cx, y) {
  const symbols = ['✦', '❧', '✦'];
  ctx.fillStyle = '#C9A84C';
  ctx.font      = '16px serif';
  ctx.textAlign = 'center';
  ctx.globalAlpha = 0.75;
  ctx.fillText(symbols.join('  '), cx, y);
  ctx.globalAlpha = 1;
}

function eventRow(ctx, cx, y, icon, title, sub) {
  ctx.textAlign  = 'center';
  ctx.fillStyle  = '#F5E6B8';
  ctx.font       = '600 18px "Playfair Display", serif';
  ctx.fillText(icon + '  ' + title, cx, y);
  ctx.fillStyle  = '#C9A84C';
  ctx.font       = '400 13px "Poppins", sans-serif';
  ctx.fillText(sub, cx, y+20);
}

function drawCornerOrnament(ctx, x, y, angle = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.strokeStyle = '#C9A84C';
  ctx.lineWidth   = 1.5;
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.moveTo(0, 0); ctx.lineTo(28, 0);
  ctx.moveTo(0, 0); ctx.lineTo(0, 28);
  ctx.stroke();
  ctx.fillStyle = '#E8C96A';
  ctx.beginPath();
  ctx.arc(0, 0, 4, 0, Math.PI*2);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.restore();
}

// ─── WHATSAPP SHARE ────────────────────────
function shareOnWhatsApp() {
  const url = window.location.href;
  const msg = `✨ *Wedding Invitation* ✨\n\n💍 *Shital & Sunil* are getting married!\n\n📅 *17 March 2025*\n🌿 Mehndi – 15 March · At Home\n💛 Haldi – 16 March · At Home\n💍 Wedding – 17 March · Maharashtra\n\n🔗 View Invitation: ${url}\n\n— Bargal Family 🙏`;
  window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank');
}
window.shareOnWhatsApp = shareOnWhatsApp;

// ─── DOWNLOAD CARD ─────────────────────────
function downloadCard() {
  drawInviteCard();
  const canvas = document.getElementById('invite-canvas');
  const link   = document.createElement('a');
  link.download = 'Shital_Sunil_Wedding_Invitation.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}
window.downloadCard = downloadCard;

// ─── SMOOTH REVEAL for main-site on load ──
document.addEventListener('DOMContentLoaded', () => {
  // Observe entry screen mutation — if main site is shown, refresh AOS
  const obs = new MutationObserver(() => {
    if (!mainSite.classList.contains('hidden')) {
      AOS.refreshHard();
      obs.disconnect();
    }
  });
  obs.observe(mainSite, { attributes: true, attributeFilter: ['class'] });
});

// ─── LAZY VIDEO ─────────────────────────────
window.addEventListener('load', () => {
  const video = document.getElementById('hero-video');
  if (video && video.readyState < 3) {
    video.load();
  }
});
