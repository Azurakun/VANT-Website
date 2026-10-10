// app.js — intro, subtitles, colour moods, scroll-driven chapters, works, viewer.

import { translations, projects } from './data.js';
import { initFun } from './fun.js';
import { playIntro } from './intro.js';

const root = document.documentElement;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
// pinned chapters run on every screen size; only reduced motion gets the static layout
const staticMode = reduceMotion;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

const store = {
    get(k, f) { try { const v = localStorage.getItem(k); return v === null ? f : JSON.parse(v); } catch { return f; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* unavailable */ } }
};

const browserLang = (navigator.language || 'en').toLowerCase().startsWith('id') ? 'id' : 'en';
let lang = store.get('vant-lang', browserLang);
const t = k => translations[lang]?.[k] ?? translations.en[k] ?? '';

/* ---------- Subtitle lines: the translation fades in under its Japanese caption ---------- */

function translateLine(vis, animate = true) {
    vis.textContent = t(vis.dataset.mirror);
    vis.dataset.done = '1';
    if (!animate || reduceMotion.matches) return;
    vis.classList.remove('is-entering');
    void vis.offsetWidth;
    vis.classList.add('is-entering');
}

/* ---------- Language ---------- */

function applyLanguage(next, animate = false) {
    lang = next in translations ? next : 'en';
    root.lang = lang;
    document.title = t('meta-title');
    $$('[data-i18n]').forEach(el => { const v = t(el.dataset.i18n); if (v) el.textContent = v; });
    $$('.cc__btn').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    $$('.sub__vis').forEach(vis => {
        const sub = vis.closest('.sub');
        const visible = vis.dataset.done && (!sub.closest('.lines') || sub.classList.contains('is-active') || root.classList.contains('no-pin'));
        if (visible) translateLine(vis, animate);
        else vis.textContent = t(vis.dataset.mirror);
    });
    store.set('vant-lang', lang);
    if (typeof buildJumpMenu === 'function' && jumpMenu) buildJumpMenu();
    if (animate) dispatchEvent(new CustomEvent('vant:lang', { detail: lang }));
}
$$('.cc__btn').forEach(b => b.addEventListener('click', () => applyLanguage(b.dataset.lang, true)));

/* ---------- Intro ---------- */

const intro = $('#intro');
let introDone = false;

let introPlayer = null;
function finishIntro(fast) {
    if (introDone) return;
    if (!fast && introPlayer) return introPlayer.skip();
    endIntro();
}
function endIntro() {
    if (introDone) return;
    introDone = true;
    try { sessionStorage.setItem('vant-intro', '1'); } catch { /* ignore */ }
    intro.classList.add('is-done');
    root.style.overflow = '';
    startStage();
}

function runIntro() {
    let seen = false;
    try { seen = sessionStorage.getItem('vant-intro') === '1'; } catch { /* ignore */ }
    if (seen || reduceMotion.matches || !intro.animate) return endIntro();
    root.style.overflow = 'hidden';
    introPlayer = playIntro(intro, { onDone: endIntro });

    $('#intro-skip').addEventListener('click', () => finishIntro(false));
    addEventListener('keydown', e => {
        if (e.key === 'Escape') return finishIntro(false);
        if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest?.('button')) finishIntro(false);
    });
    addEventListener('wheel', () => finishIntro(false), { once: true, passive: true });
    // only a real swipe skips; the small wobble of a tap does not
    let ty0 = null;
    addEventListener('touchstart', e => { ty0 = e.touches[0]?.clientY ?? null; }, { passive: true });
    addEventListener('touchmove', e => {
        const y = e.touches[0]?.clientY;
        if (ty0 !== null && y !== undefined && Math.abs(y - ty0) > 40) finishIntro(false);
    }, { passive: true });
}

/* ---------- Stage: the opening settles in once the intro clears ---------- */

let stageStarted = false;
function startStage() {
    if (stageStarted) return;
    stageStarted = true;
    requestAnimationFrame(() => root.classList.add('is-ready'));
}

/* ---------- Scroll-driven chapters ---------- */

const bar = $('.bar');
const subPin = $('.pin--subs');
const subLines = $$('.lines .sub', subPin);
const subTicks = $$('.pin__progress i', subPin);
const convergePin = $('.pin--converge');
let lastStep = -1;

/* Chapter moods: still tracked (the dial and secrets listen for them), no longer recolour the page */
const MOODS = { stage: 1, mission: 1, members: 1, antima: 1, teaflow: 1, gaia: 1, next: 1, credits: 1, contact: 1 };
let mood = '';
function setMood(name) {
    if (!MOODS[name] || name === mood) return;
    mood = name;
    dispatchEvent(new CustomEvent('vant:mood', { detail: name }));
}
const moodSections = $$('[data-mood]');
let hoverMood = null;
$$('[data-mood-hover]').forEach(a => {
    a.addEventListener('mouseenter', () => { hoverMood = a.dataset.moodHover; setMood(hoverMood); });
    a.addEventListener('mouseleave', () => { hoverMood = null; update(); });
});
const pinProgress = el => {
    const r = el.getBoundingClientRect();
    return clamp(-r.top / Math.max(1, r.height - innerHeight));
};

function layout() {
    root.classList.toggle('no-pin', staticMode.matches);
    if (staticMode.matches) {
        subLines.forEach(s => { s.classList.add('is-active'); s.classList.remove('is-past'); });
        convergePin.classList.add('is-met');
    } else {
        lastStep = -1;
    }
    update();
}

function update() {
    const y = scrollY;
    bar.classList.toggle('is-scrolled', y > 8);

    if (!staticMode.matches) {
        // 01: subtitle lines, one at a time
        const p = pinProgress(subPin);
        const step = p < .3 ? 0 : p < .62 ? 1 : 2;
        if (step !== lastStep) {
            subLines.forEach((s, i) => {
                s.classList.toggle('is-active', i === step);
                s.classList.toggle('is-past', i < step);
            });
            subTicks.forEach((tk, i) => tk.classList.toggle('is-on', i <= step));
            translateLine($('.sub__vis', subLines[step]));
            lastStep = step;
        }

        // 02: two shots converge
        const c = pinProgress(convergePin);
        const cp = clamp(c / .55);
        convergePin.style.setProperty('--p', (1 - Math.pow(1 - cp, 3)).toFixed(4));
        convergePin.classList.toggle('is-met', cp >= 1);
    }

    // current chapter and its colour mood (the innermost mood under the reading line wins)
    const mid = innerHeight * .5;
    let moodName = 'stage';
    moodSections.forEach(sec => {
        const r = sec.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) moodName = sec.dataset.mood;
    });
    // between two projects, keep the colour of the one just read
    const works = $('#works');
    const wr = works.getBoundingClientRect();
    if (wr.top <= mid && wr.bottom > mid) {
        $$('[data-mood]', works).forEach(el => { if (el.getBoundingClientRect().top <= mid) moodName = el.dataset.mood; });
    }
    if (!hoverMood) setMood(moodName);

    let active = null;
    chapterLinks.forEach(a => {
        const sec = $(a.getAttribute('href'));
        const r = sec.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) active = a;
    });
    chapterLinks.forEach(a => a.setAttribute('aria-current', String(a === active)));
    $('#now').textContent = active ? $('span:not(.chapters__tc)', active).textContent : t('jump-label');
    $$('#jump-menu a').forEach((a, i) => a.setAttribute('aria-current', String(chapterLinks[i] === active)));
}

let queued = false;
addEventListener('scroll', () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; update(); });
}, { passive: true });
addEventListener('resize', () => requestAnimationFrame(layout));
staticMode.addEventListener('change', layout);

/* ---------- Chapters (and the phone chapter menu) ---------- */

const chapterLinks = $$('#chapters a');
const jumpBtn = $('#jump-btn');
const jumpMenu = $('#jump-menu');

function buildJumpMenu() {
    jumpMenu.replaceChildren(...chapterLinks.map(src => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = src.getAttribute('href');
        a.innerHTML = '<span class="jump__n"></span><span class="jump__t"></span>';
        $('.jump__n', a).textContent = $('.chapters__tc', src).textContent;
        $('.jump__t', a).textContent = $('span:not(.chapters__tc)', src).textContent;
        a.addEventListener('click', e => {
            e.preventDefault();
            setJump(false);
            const target = $(a.getAttribute('href'));
            scrollTo({ top: target.getBoundingClientRect().top + scrollY, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
        });
        li.append(a);
        return li;
    }));
}
function setJump(open) {
    jumpMenu.hidden = !open;
    jumpBtn.setAttribute('aria-expanded', String(open));
    $('#jump').classList.toggle('is-open', open);
}
jumpBtn.addEventListener('click', () => setJump(jumpMenu.hidden));
document.addEventListener('click', e => { if (!e.target.closest('#jump')) setJump(false); });
addEventListener('keydown', e => { if (e.key === 'Escape') setJump(false); });

$$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const target = $(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = a.getAttribute('href') === '#main' ? 0 : target.offsetTop;
    scrollTo({ top, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
}));

/* ---------- Reveals & one-shot subtitles ---------- */

const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.classList.contains('reveal')) el.classList.add('is-in');
        if (el.matches('.sub--contact') || (root.classList.contains('no-pin') && el.closest('.lines'))) {
            const vis = $('.sub__vis', el);
            if (!vis.dataset.done) translateLine(vis);
        }
        io.unobserve(el);
    });
}, { rootMargin: '0px 0px -12% 0px' });
$$('.reveal, .sub--contact, .lines .sub').forEach(el => io.observe(el));
// never leave content hidden if the observer is slow or unavailable
setTimeout(() => $$('.reveal').forEach(el => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('is-in'); }), 2500);

/* ---------- Screenshot viewer ---------- */

const viewer = $('#viewer');
const viewerImg = $('#viewer-img');
let shot = { id: null, index: 0 };

function showShot() {
    const { images, name } = projects[shot.id];
    shot.index = (shot.index + images.length) % images.length;
    viewerImg.src = images[shot.index];
    viewerImg.alt = `${name} ${shot.index + 1} / ${images.length}`;
    $('#viewer-cap').textContent = `${name} — ${String(shot.index + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}`;
}
$$('[data-gallery]').forEach(b => b.addEventListener('click', () => {
    shot = { id: b.dataset.gallery, index: Number(b.dataset.index) || 0 };
    showShot();
    viewer.showModal();
}));
$('#viewer-prev').addEventListener('click', () => { shot.index--; showShot(); });
$('#viewer-next').addEventListener('click', () => { shot.index++; showShot(); });
$('#viewer-close').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', e => { if (e.target === viewer) viewer.close(); });
// swipe between screenshots on touch screens
let swipeX = null;
viewer.addEventListener('touchstart', e => { swipeX = e.touches[0].clientX; }, { passive: true });
viewer.addEventListener('touchend', e => {
    if (swipeX === null) return;
    const dx = e.changedTouches[0].clientX - swipeX;
    swipeX = null;
    if (Math.abs(dx) < 40) return;
    shot.index += dx < 0 ? 1 : -1;
    showShot();
});
viewer.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { shot.index--; showShot(); }
    if (e.key === 'ArrowRight') { shot.index++; showShot(); }
});

/* ---------- Init ---------- */

applyLanguage(lang);
layout();
addEventListener('load', layout);
document.fonts?.ready.then(layout);
runIntro();
initFun({ t, getLang: () => lang });
