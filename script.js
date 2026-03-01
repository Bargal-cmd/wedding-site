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
function updateCountdown() {
  const weddingDate = new Date('2026-03-17T00:00:00').getTime();
  const now = Date.now();
  const diff = weddingDate - now;

  if (diff <= 0) {
    document.getElementById('cd-days').textContent  = '00';
    document.getElementById('cd-hours').textContent = '00';
    document.getElementById('cd-mins').textContent  = '00';
    document.getElementById('cd-secs').textContent  = '00';
    return;
  }

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

// ─── WHATSAPP SHARE ────────────────────────
function setupWhatsApp() {
  const url     = window.location.href;
  const msg     = `You are invited to Shital & Sunil's wedding on 17 March 2025. Visit: ${url}`;
  const encoded = encodeURIComponent(msg);
  document.getElementById('whatsapp-float').href = `https://wa.me/?text=${encoded}`;
}
setupWhatsApp();

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
