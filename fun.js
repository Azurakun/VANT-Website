// fun.js — chapter dial, secret codes, click surprises, active background, cursor and hovers.

import { quips } from './data.js';

const root = document.documentElement;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const touchFirst = matchMedia('(hover: none), (pointer: coarse)');
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

const store = {
    get(k, f) { try { const v = localStorage.getItem(k); return v === null ? f : JSON.parse(v); } catch { return f; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* unavailable */ } }
};

export function initFun({ t, getLang }) {
    const toast = $('#toast');
    const dial = $('#dial');

    /* ---------- Notes: queued, one at a time ---------- */

    const toastQueue = [];
    let toastBusy = false;
    function showToast(text) {
        toastQueue.push(text);
        if (!toastBusy) nextToast();
    }
    function nextToast() {
        const text = toastQueue.shift();
        if (!text) { toastBusy = false; return; }
        toastBusy = true;
        toast.textContent = text;
        toast.classList.add('is-on');
        setTimeout(() => {
            toast.classList.remove('is-on');
            setTimeout(nextToast, 450);
        }, Math.min(6000, 2600 + text.length * 35));
    }
    // a quip: the Japanese line, then the reader's language
    const quip = line => showToast(`${line.jp}  ${line[getLang()] || line.en}`);

    // a gentle hint after a quiet minute, once per visit
    let idle, hinted = false;
    const resetIdle = () => {
        clearTimeout(idle);
        if (hinted) return;
        idle = setTimeout(() => { hinted = true; quip(touchFirst.matches ? quips.idleTouch : quips.idle); }, 45000);
    };
    ['scroll', 'pointermove', 'keydown', 'touchstart'].forEach(ev => addEventListener(ev, resetIdle, { passive: true }));
    resetIdle();

    /* ---------- Chapter dial: reading progress, tap to go back to the top ---------- */

    const ring = $('.dial__progress', dial);
    const dialNum = $('.dial__num', dial);
    const dialLabel = $('.dial__label', dial);
    const RING = 2 * Math.PI * 22;
    ring.style.strokeDasharray = RING;
    const chapters = $$('#chapters a');
    const placeTicks = () => {
        const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
        $('.dial__ticks', dial).replaceChildren(...chapters.map(a => {
            const sec = $(a.getAttribute('href'));
            const p = Math.min(1, (sec.getBoundingClientRect().top + scrollY) / max);
            const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            const ang = p * Math.PI * 2 - Math.PI / 2;
            tick.setAttribute('x1', 26 + Math.cos(ang) * 18);
            tick.setAttribute('y1', 26 + Math.sin(ang) * 18);
            tick.setAttribute('x2', 26 + Math.cos(ang) * 26);
            tick.setAttribute('y2', 26 + Math.sin(ang) * 26);
            return tick;
        }));
    };
    const updateDial = () => {
        const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
        const p = Math.min(1, Math.max(0, scrollY / max));
        ring.style.strokeDashoffset = RING * (1 - p);
        const current = chapters.find(a => a.getAttribute('aria-current') === 'true');
        const num = current ? $('.chapters__tc', current).textContent : '00';
        const name = current ? $('span:not(.chapters__tc)', current).textContent : 'VANT';
        if (dialNum.textContent !== num) dialNum.textContent = num;
        dialLabel.textContent = name;
        dial.setAttribute('aria-label', `${t('dial-top')} · ${name} · ${Math.round(p * 100)}%`);
        dial.classList.toggle('is-shown', scrollY > innerHeight * .4);
    };
    addEventListener('scroll', () => requestAnimationFrame(updateDial), { passive: true });
    addEventListener('resize', () => { placeTicks(); updateDial(); });
    addEventListener('load', () => { placeTicks(); updateDial(); });
    setTimeout(() => { placeTicks(); updateDial(); }, 400);
    addEventListener('vant:lang', updateDial);

    /* ---------- Secrets ---------- */

    const SECRETS = ['konami', 'antima', 'logo', 'dizzy'];
    const found = new Set(store.get('vant-secrets', []).filter(s => SECRETS.includes(s)));

    function unlock(id) {
        const first = !found.has(id);
        found.add(id);
        store.set('vant-secrets', [...found]);
        if (first) { showToast(`${t('secret-found')} · ${found.size} / ${SECRETS.length}`); }
        if (first && found.size === SECRETS.length) setTimeout(() => { quip(quips.allFound); petals(140); }, 1600);
    }
    const spinDial = () => {
        if (reduceMotion.matches) return;
        dial.classList.remove('is-spin'); void dial.offsetWidth; dial.classList.add('is-spin');
    };

    function konami() {
        quip(quips.konami);
        petals(110);
        spinDial();
        unlock('konami');
    }
    function summon() {
        quip(quips.called);
        petals(40);
        unlock('antima');
    }

    // typed codes: the Konami code, or the words "antima" and "vibra"
    const KONAMI = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
    let keys = [];
    let typed = '';
    addEventListener('keydown', e => {
        if (e.target.closest?.('input, textarea, [contenteditable]')) return;
        const k = e.key.toLowerCase();
        keys = [...keys, k].slice(-KONAMI.length);
        if (keys.join() === KONAMI.join()) { keys = []; konami(); }
        if (k.length === 1) typed = (typed + k).slice(-6);
        if (typed.endsWith('antima')) { typed = ''; summon(); }
        if (typed.endsWith('vibra')) {
            typed = '';
            quip(quips.vibra);
            root.classList.add('is-simple');
            setTimeout(() => root.classList.remove('is-simple'), 2400);
        }
    });

    // the wordmark, clicked five times in a row
    let logoClicks = 0, logoTimer;
    $('.mark').addEventListener('click', () => {
        logoClicks++;
        clearTimeout(logoTimer);
        logoTimer = setTimeout(() => { logoClicks = 0; }, 1500);
        if (logoClicks === 5) {
            logoClicks = 0;
            const mark = $('.mark');
            mark.classList.remove('is-wobble'); void mark.offsetWidth; mark.classList.add('is-wobble');
            unlock('logo');
            showToast(t('dev-note'));
        }
    });

    // the dial: tap to go to the top; spin it (7 quick taps) or hold it for secrets
    let spins = 0, spinTimer, pressTimer, longPressed = false;
    dial.addEventListener('pointerdown', () => {
        longPressed = false;
        pressTimer = setTimeout(() => { longPressed = true; summon(); }, 700);
    });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => dial.addEventListener(ev, () => clearTimeout(pressTimer)));
    dial.addEventListener('contextmenu', e => e.preventDefault());
    dial.addEventListener('click', () => {
        if (longPressed) { longPressed = false; return; }
        spins++;
        clearTimeout(spinTimer);
        spinTimer = setTimeout(() => {
            // a single, unhurried tap is the everyday job: back to the top
            if (spins < 3) scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
            spins = 0;
        }, 320);
        if (spins >= 7) {
            spins = 0;
            clearTimeout(spinTimer);
            spinDial();
            quip(quips.dizzy);
            unlock('dizzy');
        }
    });

    /* ---------- Active background: the light follows you and stretches with scroll ---------- */

    const amb = $$('.ambient i');
    const spot = $('.ambient__spot');
    if (amb.length && !reduceMotion.matches) {
        let px = .5, py = .4, tx = .5, ty = .4, vel = 0, lastY = scrollY, lastT = performance.now();
        const setTarget = (x, y) => { tx = x / innerWidth; ty = y / innerHeight; root.classList.add('is-lit'); };
        addEventListener('pointermove', e => setTarget(e.clientX, e.clientY), { passive: true });
        addEventListener('touchmove', e => { const p = e.touches[0]; if (p) setTarget(p.clientX, p.clientY); }, { passive: true });
        addEventListener('pointerdown', e => { setTarget(e.clientX, e.clientY); vel = Math.min(1, vel + .5); }, { passive: true });
        const loop = now => {
            const dt = Math.max(1, now - lastT);
            const dy = scrollY - lastY;
            lastY = scrollY; lastT = now;
            vel += (Math.min(1, Math.abs(dy) / dt / 2.5) - vel) * .08;
            px += (tx - px) * .06;
            py += (ty - py) * .06;
            const ox = (px - .5), oy = (py - .5);
            amb[0].style.translate = `${ox * 34}vw ${oy * 30}vh`;
            amb[1].style.translate = `${-ox * 26}vw ${-oy * 24}vh`;
            amb[2].style.translate = `${ox * 16}vw ${-oy * 18}vh`;
            amb.forEach((el, i) => { el.style.scale = `${1 + vel * (.25 + i * .08)} ${1 - vel * .12}`; });
            if (spot) spot.style.transform = `translate3d(${px * innerWidth}px, ${py * innerHeight}px, 0)`;
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }

    /* ---------- Sakura petals ---------- */

    function petals(count = 90) {
        if (reduceMotion.matches) return;
        const canvas = document.createElement('canvas');
        canvas.className = 'petals';
        canvas.setAttribute('aria-hidden', 'true');
        document.body.append(canvas);
        const dpr = Math.min(2, devicePixelRatio || 1);
        canvas.width = innerWidth * dpr;
        canvas.height = innerHeight * dpr;
        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        const colors = ['#ffc2dc', '#ffb3d6', '#f7a1c4', '#ffd9e8', '#e88bb5'];
        const ps = Array.from({ length: count }, () => ({
            x: Math.random() * innerWidth,
            y: -20 - Math.random() * innerHeight * .6,
            r: 5 + Math.random() * 6,
            vx: -0.6 + Math.random() * 1.6,
            vy: 1.4 + Math.random() * 2.2,
            a: Math.random() * Math.PI * 2,
            va: -0.05 + Math.random() * 0.1,
            sway: Math.random() * Math.PI * 2,
            c: colors[(Math.random() * colors.length) | 0]
        }));
        const start = performance.now();
        const frame = now => {
            const elapsed = now - start;
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            ps.forEach(p => {
                p.sway += 0.03;
                p.x += p.vx + Math.sin(p.sway) * 0.8;
                p.y += p.vy;
                p.a += p.va;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.a);
                ctx.globalAlpha = Math.max(0, 1 - Math.max(0, elapsed - 3200) / 900);
                ctx.fillStyle = p.c;
                ctx.beginPath();
                ctx.moveTo(0, -p.r);
                ctx.bezierCurveTo(p.r, -p.r * .6, p.r * .8, p.r * .6, 0, p.r);
                ctx.bezierCurveTo(-p.r * .8, p.r * .6, -p.r, -p.r * .6, 0, -p.r);
                ctx.fill();
                ctx.restore();
            });
            if (elapsed < 4100) requestAnimationFrame(frame);
            else canvas.remove();
        };
        requestAnimationFrame(frame);
    }

    /* ---------- Touch: swipe code and tap ripples ---------- */

    const SWIPES = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right'];
    let swipes = [], taps = 0, sx = 0, sy = 0, st = 0;
    addEventListener('touchstart', e => { const p = e.touches[0]; sx = p.clientX; sy = p.clientY; st = performance.now(); }, { passive: true });
    addEventListener('touchend', e => {
        if (e.target.closest?.('dialog')) return;
        const p = e.changedTouches[0];
        const dx = p.clientX - sx, dy = p.clientY - sy;
        const dist = Math.hypot(dx, dy);
        if (dist < 12 && performance.now() - st < 300) {
            // a tap: counts as B, A after a full swipe sequence
            if (swipes.length === SWIPES.length && ++taps === 2) { swipes = []; taps = 0; konami(); }
            return;
        }
        if (dist < 40) return;
        const dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
        swipes = [...swipes, dir].slice(-SWIPES.length);
        taps = 0;
        if (swipes.join() !== SWIPES.slice(0, swipes.length).join()) {
            // keep the longest tail that still matches the start of the code
            while (swipes.length && swipes.join() !== SWIPES.slice(0, swipes.length).join()) swipes.shift();
        }
    }, { passive: true });

    if (touchFirst.matches && !reduceMotion.matches) {
        addEventListener('pointerdown', e => {
            if (e.pointerType === 'mouse') return;
            const r = document.createElement('span');
            r.className = 'tap';
            r.setAttribute('aria-hidden', 'true');
            r.style.left = e.clientX + 'px';
            r.style.top = e.clientY + 'px';
            if (e.target.closest('a, button, label')) r.classList.add('tap--link');
            document.body.append(r);
            setTimeout(() => r.remove(), 650);
        }, { passive: true });
    }

    /* ---------- Cursor, magnetic buttons, tilting frames (mouse only) ---------- */

    if (!finePointer.matches || reduceMotion.matches) return;

    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.innerHTML = '<span class="cursor__label"></span>';
    document.body.append(cursor);
    root.classList.add('has-cursor');
    const label = $('.cursor__label', cursor);
    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
    addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; cursor.classList.add('is-on'); }, { passive: true });
    document.addEventListener('pointerleave', () => cursor.classList.remove('is-on'));
    const follow = () => {
        cx += (mx - cx) * .2;
        cy += (my - cy) * .2;
        cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
        requestAnimationFrame(follow);
    };
    requestAnimationFrame(follow);

    document.addEventListener('pointerover', e => {
        const frame = e.target.closest('.work__frame, .work__thumbs button');
        const link = e.target.closest('a, button, label');
        cursor.classList.toggle('is-view', !!frame);
        cursor.classList.toggle('is-link', !!link && !frame);
        label.textContent = frame ? (getLang() === 'id' ? 'Lihat' : 'View') : '';
    });
    addEventListener('pointerdown', () => cursor.classList.add('is-down'));
    addEventListener('pointerup', () => cursor.classList.remove('is-down'));

    // buttons lean toward the pointer
    $$('.btn').forEach(btn => {
        btn.addEventListener('pointermove', e => {
            const r = btn.getBoundingClientRect();
            const dx = (e.clientX - r.left - r.width / 2) / r.width;
            const dy = (e.clientY - r.top - r.height / 2) / r.height;
            btn.style.translate = `${dx * 8}px ${dy * 6}px`;
        });
        btn.addEventListener('pointerleave', () => { btn.style.translate = ''; });
    });

    // screenshot frames tilt toward the pointer
    $$('.work__frame').forEach(frame => {
        frame.addEventListener('pointermove', e => {
            const r = frame.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - .5;
            const py = (e.clientY - r.top) / r.height - .5;
            frame.style.transform = `perspective(1100px) rotateY(${px * 6}deg) rotateX(${-py * 5}deg)`;
            frame.style.setProperty('--gx', `${(px + .5) * 100}%`);
            frame.style.setProperty('--gy', `${(py + .5) * 100}%`);
        });
        frame.addEventListener('pointerleave', () => { frame.style.transform = ''; });
    });
}
