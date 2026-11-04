/* ============================================================
   GELOMBANG AMAN - Shared JavaScript API Client & Utilities
   ============================================================ */

const API_BASE = 'http://localhost:3000/api';

// ===== API CLIENT =====
const api = {
  token: () => localStorage.getItem('ga_token'),

  headers(extra = {}) {
    const h = { 'Content-Type': 'application/json', ...extra };
    if (this.token()) h['Authorization'] = `Bearer ${this.token()}`;
    return h;
  },

  async get(path, params = {}) {
    const url = new URL(API_BASE + path, window.location.origin);
    Object.keys(params).forEach(k => { if (params[k] !== undefined && params[k] !== '') url.searchParams.set(k, params[k]); });
    const r = await fetch(url.toString(), { headers: this.headers() });
    return r.json();
  },

  async post(path, body) {
    const r = await fetch(API_BASE + path, { method: 'POST', headers: this.headers(), body: JSON.stringify(body) });
    return r.json();
  },

  async postForm(path, formData) {
    const h = {};
    if (this.token()) h['Authorization'] = `Bearer ${this.token()}`;
    const r = await fetch(API_BASE + path, { method: 'POST', headers: h, body: formData });
    return r.json();
  },

  async put(path, body) {
    const r = await fetch(API_BASE + path, { method: 'PUT', headers: this.headers(), body: JSON.stringify(body) });
    return r.json();
  },

  async patch(path, body) {
    const r = await fetch(API_BASE + path, { method: 'PATCH', headers: this.headers(), body: JSON.stringify(body) });
    return r.json();
  },

  async delete(path) {
    const r = await fetch(API_BASE + path, { method: 'DELETE', headers: this.headers() });
    return r.json();
  }
};

// ===== FORMATTERS =====
const fmt = {
  number: (n) => n == null ? '-' : Number(n).toLocaleString('id-ID'),
  date: (d) => d ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-',
  datetime: (d) => d ? new Date(d).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }) : '-',
  mag: (m) => m == null ? '-' : `M${parseFloat(m).toFixed(1)}`,
  wave: (h) => h == null ? '-' : `${parseFloat(h).toFixed(1)} m`,
  percent: (n, t) => t > 0 ? `${Math.round((n / t) * 100)}%` : '0%',
  province: (s) => s || '-',
  statusLabel(s) {
    const map = {
      'dalam_pencarian': '🔍 Dalam Pencarian',
      'ditemukan': '✅ Ditemukan',
      'teridentifikasi': '🔬 Teridentifikasi',
      'dipertemukan': '🤝 Dipertemukan',
      'ditutup': '🔒 Ditutup'
    };
    return map[s] || s;
  },
  statusClass(s) {
    return `status-${s?.replace('_', '-')}`;
  },
  riskLabel: (r) => ({ tinggi: '⛔ Tinggi', sedang: '⚠️ Sedang', rendah: '✅ Rendah' }[r] || r),
  riskClass: (r) => `risk-${r}`,
  magClass: (m) => m >= 7 ? 'high' : m >= 5 ? 'med' : 'low'
};

// ===== DOM HELPERS =====
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function setHtml(el, html) { if (el) el.innerHTML = html; }
function setText(el, text) { if (el) el.textContent = text; }
function show(el) { if (el) el.classList.remove('d-none'); }
function hide(el) { if (el) el.classList.add('d-none'); }
function toggle(el, condition) { el && (condition ? show(el) : hide(el)); }

function showLoading(container, msg = 'Memuat data...') {
  setHtml(container, `<div class="loading"><div class="spinner"></div><span>${msg}</span></div>`);
}

function showEmpty(container, title = 'Tidak ada data', desc = '') {
  setHtml(container, `
    <div class="empty-state">
      <div class="empty-icon">🌊</div>
      <h3>${title}</h3>
      ${desc ? `<p>${desc}</p>` : ''}
    </div>`);
}

function showError(container, msg = 'Gagal memuat data. Coba lagi.') {
  setHtml(container, `
    <div class="alert alert-danger">
      <span>⚠️</span>
      <div>${msg}</div>
    </div>`);
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info', duration = 4000) {
  const existing = document.querySelector('.ga-notification');
  if (existing) existing.remove();
  const el = document.createElement('div');
  const icons = { info: 'ℹ️', success: '✅', warning: '⚠️', danger: '❌' };
  el.className = `alert alert-${type} ga-notification`;
  el.style.cssText = 'position:fixed;top:80px;right:1.5rem;z-index:9999;max-width:380px;box-shadow:0 4px 20px rgba(0,0,0,0.15);animation:fadeIn 0.3s ease;';
  el.innerHTML = `<span>${icons[type] || '•'}</span><div>${message}</div>`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), duration);
}

// ===== MODAL =====
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('active');
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('active');
}
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) closeModal(e.target.id);
  if (e.target.classList.contains('modal-close')) {
    const modal = e.target.closest('.modal-overlay');
    if (modal) closeModal(modal.id);
  }
});

// ===== TABS =====
function initTabs(containerSel) {
  $$(containerSel + ' .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      $$(containerSel + ' .tab-btn').forEach(b => b.classList.remove('active'));
      $$(containerSel + ' .tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = $(containerSel + ' .tab-panel[data-tab="' + target + '"]');
      if (panel) panel.classList.add('active');
    });
  });
}

// ===== PAGINATION =====
function renderPagination(container, pagination, onPageChange) {
  if (!container || !pagination) return;
  const { page, totalPages } = pagination;
  if (totalPages <= 1) { container.innerHTML = ''; return; }
  let html = '';
  html += `<button class="page-btn" onclick="${onPageChange}(${page - 1})" ${page <= 1 ? 'disabled' : ''}>‹ Prev</button>`;
  for (let i = Math.max(1, page - 2); i <= Math.min(totalPages, page + 2); i++) {
    html += `<button class="page-btn ${i === page ? 'active' : ''}" onclick="${onPageChange}(${i})">${i}</button>`;
  }
  html += `<button class="page-btn" onclick="${onPageChange}(${page + 1})" ${page >= totalPages ? 'disabled' : ''}>Next ›</button>`;
  container.innerHTML = html;
}

// ===== NAVBAR TOGGLE =====
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.navbar-toggle');
  const nav = document.querySelector('.navbar-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }
  // Set active nav link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  $$('.navbar-nav a').forEach(a => {
    const href = a.getAttribute('href')?.split('/').pop() || '';
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
});

// ===== AUTH CHECK =====
function requireAdmin() {
  if (!localStorage.getItem('ga_token')) {
    window.location.href = '../pages/login.html';
    return false;
  }
  return true;
}

function isLoggedIn() { return !!localStorage.getItem('ga_token'); }

// ===== CHART DEFAULTS =====
if (typeof Chart !== 'undefined') {
  Chart.defaults.font.family = "'Inter', 'Segoe UI', system-ui, sans-serif";
  Chart.defaults.color = '#546e7a';
  Chart.defaults.plugins.legend.position = 'bottom';
}

// ===== WAVE ANIMATION SVG =====
function getWaveSVG() {
  return `<svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <path d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z" fill="rgba(255,255,255,0.08)"/>
    <path d="M0,80 C240,40 480,100 720,80 C960,60 1200,100 1440,80 L1440,120 L0,120 Z" fill="rgba(255,255,255,0.05)"/>
  </svg>`;
}
