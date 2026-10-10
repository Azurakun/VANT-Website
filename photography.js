// photography.js — VANT Photography: event filters, masonry wall, full-screen viewer.

import { events, photos, copy } from './photos.js';

const root = document.documentElement;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

let lang = 'en';
try { lang = JSON.parse(localStorage.getItem('vant-lang')) || 'en'; } catch { /* default */ }
if (!(lang in copy)) lang = 'en';
const t = k => copy[lang][k] ?? copy.en[k] ?? '';
const tr = v => (v && typeof v === 'object') ? (v[lang] || v.en || '') : (v || '');
const eventOf = id => events.find(e => e.id === id);
const evName = ev => tr(ev?.name);
const titleOf = photo => tr(photo.title) || evName(eventOf(photo.event));

const fmtDate = iso => {
    if (!iso) return '';
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};
const ratioCss = r => r.replace(':', ' / ');

let filter = 'all';
let visible = photos.map((_, i) => i);

/* ---------- placeholder frame (an honest empty slot in the photo's real shape) ---------- */

function frame(photo) {
    const ev = eventOf(photo.event);
    const el = document.createElement('div');
    el.className = 'ph-frame';
    el.style.aspectRatio = ratioCss(photo.ratio);
    el.style.setProperty('--c', ev?.tint || '#FF5A36');
    const [rw, rh] = photo.ratio.split(':').map(Number);
    el.style.setProperty('--r', (rw / rh).toFixed(4));
    el.innerHTML = `<span class="ph-frame__tag"></span>
        <span class="ph-frame__mark"><svg aria-hidden="true"><use href="#i-camera"/></svg><span class="ph-frame__ratio"></span></span>`;
    $('.ph-frame__tag', el).textContent = t('placeholder');
    $('.ph-frame__ratio', el).textContent = photo.ratio;
    return el;
}

function media(photo, eager = false, full = false) {
    if (!photo.src) return frame(photo);
    const img = document.createElement('img');
    img.src = full ? photo.src : (photo.thumb || photo.src);
    img.alt = `${titleOf(photo)}, ${t('by').toLowerCase()} ${photo.by?.name || ''}`.trim();
    img.loading = eager ? 'eager' : 'lazy';
    img.decoding = 'async';
    img.style.aspectRatio = ratioCss(photo.ratio);
    return img;
}

/* ---------- filters ---------- */

function renderFilters() {
    const track = $('#ph-filters');
    const chip = (id, label, date, n, tint) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'chip';
        b.dataset.filter = id;
        b.setAttribute('aria-pressed', String(filter === id));
        if (tint) b.style.setProperty('--c', tint);
        b.innerHTML = '<span class="chip__name"></span>' + (date ? '<span class="chip__date"></span>' : '') + '<span class="chip__n"></span>';
        $('.chip__name', b).textContent = label;
        if (date) $('.chip__date', b).textContent = date;
        $('.chip__n', b).textContent = n;
        b.addEventListener('click', () => setFilter(id));
        return b;
    };
    track.replaceChildren(
        chip('all', t('all'), '', photos.length),
        ...events.map(ev => chip(ev.id, evName(ev), fmtDate(ev.date), photos.filter(p => p.event === ev.id).length, ev.tint))
    );
}

function setFilter(id) {
    if (id === filter) return;
    const apply = () => {
        filter = id;
        visible = photos.map((p, i) => [p, i]).filter(([p]) => id === 'all' || p.event === id).map(([, i]) => i);
        $$('.tile').forEach(tile => tile.classList.toggle('is-hidden', !visible.includes(Number(tile.dataset.i))));
        $$('.chip').forEach(c => c.setAttribute('aria-pressed', String(c.dataset.filter === id)));
    };
    if (document.startViewTransition && !reduceMotion.matches) document.startViewTransition(apply);
    else apply();
}

/* ---------- wall ---------- */

function renderWall() {
    const wall = $('#wall');
    wall.replaceChildren(...photos.map((photo, i) => {
        const ev = eventOf(photo.event);
        const li = document.createElement('li');
        li.className = 'tile';
        li.dataset.i = i;
        li.style.viewTransitionName = `tile-${i}`;
        li.classList.toggle('is-hidden', !visible.includes(i));
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'tile__btn';
        btn.style.setProperty('--c', ev?.tint || '#FF5A36');
        btn.setAttribute('aria-label', `${t('open')}: ${titleOf(photo)} · ${fmtDate(photo.date || ev?.date)}`);
        btn.append(media(photo));
        const cap = document.createElement('span');
        cap.className = 'tile__cap';
        cap.innerHTML = '<span class="tile__title"></span><span class="tile__by"></span><span class="tile__ev"></span>';
        const title = $('.tile__title', cap), by = $('.tile__by', cap);
        title.textContent = titleOf(photo);
        by.textContent = photo.by?.name ? `${t('by')} ${photo.by.name}` : `${t('by')} · ${t('photographer')}`;
        by.classList.toggle('is-ph', !photo.by?.name);
        $('.tile__ev', cap).textContent = ev ? [photo.place || ev.place, fmtDate(photo.date || ev.date)].filter(Boolean).join(' · ') : '';
        btn.append(cap);
        btn.addEventListener('click', () => openViewer(i));
        li.append(btn);
        return li;
    }));
    reveal();
}

const io = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
}, { rootMargin: '0px 0px -8% 0px' }) : null;
function reveal() {
    $$('.tile').forEach((tile, n) => {
        tile.style.transitionDelay = `${(n % 4) * 60}ms`;
        if (io && !reduceMotion.matches) io.observe(tile); else tile.classList.add('is-in');
    });
}

/* ---------- full-screen viewer ---------- */

const lightbox = $('#lightbox');
let current = 0;

function row(label, value, placeholder = false, href = '') {
    const div = document.createElement('div');
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');
    dt.textContent = label;
    if (href) {
        const a = document.createElement('a');
        a.href = href; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.textContent = value;
        dd.append(a);
    } else dd.textContent = value;
    if (placeholder) dd.classList.add('is-ph');
    div.append(dt, dd);
    return div;
}

function showPhoto() {
    const i = visible[current];
    const photo = photos[i];
    const ev = eventOf(photo.event);
    $('#lb-stage').replaceChildren(media(photo, true, true));
    $('#lb-count').textContent = `${String(current + 1).padStart(2, '0')} / ${String(visible.length).padStart(2, '0')}`;
    const title = $('#lb-title');
    title.textContent = titleOf(photo);
    const caption = $('#lb-caption');
    caption.textContent = tr(photo.caption);
    caption.hidden = !photo.caption;

    $('#lb-meta').replaceChildren(
        row(t('by'), photo.by?.name || t('photographer'), !photo.by?.name, photo.by?.url || ''),
        ...(photo.title && ev ? [row(t('event'), evName(ev))] : []),
        ...(photo.place || ev?.place ? [row(t('place'), photo.place || ev.place)] : []),
        row(t('date'), fmtDate(photo.date || ev?.date) || '—')
    );

    const cam = photo.camera || {};
    const settings = [cam.focal, cam.aperture, cam.shutter && `${cam.shutter}s`, cam.iso && `ISO ${cam.iso}`].filter(Boolean).join(' · ');
    const box = $('#lb-camera');
    box.innerHTML = '<h3><svg aria-hidden="true"><use href="#i-camera"/></svg><span></span></h3>';
    $('h3 span', box).textContent = t('camera');
    [[t('camera'), cam.body], [t('lens'), cam.lens], [t('settings'), settings]].forEach(([label, value]) => {
        const p = document.createElement('p');
        p.innerHTML = '<span></span><span class="mono"></span>';
        p.firstChild.textContent = label;
        p.lastChild.textContent = value || '—';
        if (!value) p.lastChild.classList.add('is-ph');
        box.append(p);
    });
}

function preload() {
    [1, -1].forEach(d => { const p = photos[visible[(current + d + visible.length) % visible.length]]; if (p?.src) new Image().src = p.src; });
}
function openViewer(i) {
    current = Math.max(0, visible.indexOf(i));
    showPhoto();
    lightbox.showModal();
    preload();
}
const step = d => { current = (current + d + visible.length) % visible.length; showPhoto(); preload(); };
$('#lb-prev').addEventListener('click', () => step(-1));
$('#lb-next').addEventListener('click', () => step(1));
$('#lb-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
});
let sx = null;
lightbox.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
lightbox.addEventListener('touchend', e => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx;
    sx = null;
    if (Math.abs(dx) > 45) step(dx < 0 ? 1 : -1);
});

/* ---------- language ---------- */

function applyLanguage(next) {
    lang = next in copy ? next : 'en';
    root.lang = lang;
    document.title = t('meta-title');
    $$('[data-i18n]').forEach(el => { const v = t(el.dataset.i18n); if (v) el.textContent = v; });
    $$('.cc__btn').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    $('#ph-stats').textContent = t('stats').replace('{photos}', photos.length).replace('{events}', events.length);
    $('#ph-preview').hidden = !photos.some(p => !p.src);
    try { localStorage.setItem('vant-lang', JSON.stringify(lang)); } catch { /* ignore */ }
    renderFilters();
    renderWall();
    if (lightbox.open) showPhoto();
}
$$('.cc__btn').forEach(b => b.addEventListener('click', () => applyLanguage(b.dataset.lang)));

addEventListener('scroll', () => $('.bar').classList.toggle('is-scrolled', scrollY > 8), { passive: true });

applyLanguage(lang);
