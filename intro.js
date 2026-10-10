// intro.js — the 7-second title sequence: screentone field, kinetic type, manga panels.

const LILAC = '#FF5A36', MINT = '#4FB89A', GOLD = '#F3EEE6', PINK = '#FF5A36';   // Ink & Vermilion palette
const OUT = 'cubic-bezier(.16, 1, .3, 1)';
const SNAP = 'cubic-bezier(.7, 0, .2, 1)';
const BACK = 'cubic-bezier(.34, 1.56, .64, 1)';

export function playIntro(intro, { onDone }) {
    const $ = s => intro.querySelector(s);
    const $$ = s => [...intro.querySelectorAll(s)];
    const anims = [];
    const timers = [];
    let done = false;

    // one helper for every keyframed move on the timeline
    const play = (el, frames, start, duration, easing = OUT, fill = 'both') => {
        if (!el) return;
        const a = el.animate(frames, { delay: start, duration, easing, fill });
        anims.push(a);
        return a;
    };
    const at = (ms, fn) => timers.push(setTimeout(() => { if (!done) fn(); }, ms));

    /* ---------- Background: a living screentone field with manga speed lines ---------- */

    const canvas = $('.intro__bg');
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(2, devicePixelRatio || 1);
    let W = 0, H = 0;
    const size = () => {
        W = innerWidth; H = innerHeight;
        canvas.width = W * dpr; canvas.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    addEventListener('resize', size);

    let kick = 0;              // a short swell of the dots on every hit
    let tint = '242, 241, 238';
    let speed = null;          // { color, until } while speed lines are drawn
    let lines = [];
    const t0 = performance.now();

    const draw = now => {
        if (done) return;
        const t = (now - t0) / 1000;
        kick *= 0.93;
        ctx.clearRect(0, 0, W, H);

        const gap = W < 600 ? 12 : 15;
        ctx.fillStyle = `rgba(${tint}, ${0.075 + kick * 0.1})`;
        ctx.beginPath();
        const cx = W / 2, cy = H / 2;
        for (let y = gap / 2; y < H; y += gap) {
            for (let x = gap / 2; x < W; x += gap) {
                const d = Math.hypot(x - cx, y - cy);
                const wave = Math.sin(d * 0.018 - t * 3.2) * 0.5 + 0.5;
                const r = 0.5 + wave * (1.6 + kick * 2.4);
                ctx.moveTo(x + r, y);
                ctx.arc(x, y, r, 0, Math.PI * 2);
            }
        }
        ctx.fill();

        if (speed && now < speed.until) {
            if (Math.random() < 0.5 || !lines.length) {
                lines = Array.from({ length: 70 }, () => ({
                    a: Math.random() * Math.PI * 2,
                    r0: Math.min(W, H) * (0.22 + Math.random() * 0.12),
                    w: 0.6 + Math.random() * 2.2
                }));
            }
            ctx.strokeStyle = speed.color;
            ctx.globalAlpha = 0.22;
            const far = Math.hypot(W, H);
            lines.forEach(l => {
                ctx.lineWidth = l.w;
                ctx.beginPath();
                ctx.moveTo(cx + Math.cos(l.a) * l.r0, cy + Math.sin(l.a) * l.r0);
                ctx.lineTo(cx + Math.cos(l.a) * far, cy + Math.sin(l.a) * far);
                ctx.stroke();
            });
            ctx.globalAlpha = 1;
        }
        requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
    const hit = (strength = 1, color) => { kick = Math.min(1.4, kick + strength); if (color) tint = color; };
    const rgb = hex => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16)).join(', ');

    /* ---------- Scene A · 0–1.7s: 語 slams in, V A N T punches through colour ---------- */

    const scA = $('.sc-a');
    play(scA, [{ opacity: 1 }, { opacity: 1 }], 0, 1);
    play($('.kanji'), [
        { opacity: 0, transform: 'scale(2.8)', filter: 'blur(18px)' },
        { opacity: 1, transform: 'scale(1)', filter: 'blur(0)', offset: .55 },
        { opacity: 1, transform: 'scale(1.03)' }
    ], 0, 520, OUT);
    at(260, () => hit(1.2, rgb(LILAC)));
    play($('.kanji'), [{ opacity: 1, transform: 'scale(1.03)' }, { opacity: 0, transform: 'scale(1.5)', filter: 'blur(8px)' }], 760, 300, SNAP, 'forwards');

    $$('.vant .L').forEach((letter, i) => {
        const s = 860 + i * 95;
        const block = letter.querySelector('i');
        play(block, [{ transform: 'scaleY(0)', transformOrigin: 'bottom' }, { transform: 'scaleY(1)', transformOrigin: 'bottom' }], s, 170, SNAP);
        play(block, [{ transform: 'scaleY(1)', transformOrigin: 'top' }, { transform: 'scaleY(0)', transformOrigin: 'top' }], s + 230, 220, SNAP, 'forwards');
        play(letter.querySelector('em'), [{ transform: 'translateY(105%)' }, { transform: 'translateY(0)' }], s + 120, 420, BACK);
        at(s + 120, () => hit(.35));
    });
    play($('.sc-a__sub'), [{ opacity: 0, transform: 'translateY(10px)', letterSpacing: '.6em' }, { opacity: 1, transform: 'none', letterSpacing: '.24em' }], 1280, 500);
    play(scA, [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-6%) skewY(-4deg)' }], 1620, 230, SNAP, 'forwards');

    /* ---------- Scene B · 1.7–3.4s: "Learn languages through" + anime / comics / games ---------- */

    const scB = $('.sc-b');
    play(scB, [{ opacity: 0 }, { opacity: 1 }], 1700, 1);
    play($('.sc-b__learn'), [{ clipPath: 'inset(0 100% 0 0)', transform: 'translateX(-4%)' }, { clipPath: 'inset(0 0 0 0)', transform: 'none' }], 1720, 480, OUT);
    at(1740, () => hit(.6, '242, 241, 238'));
    play($('.sc-b__through'), [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], 2020, 320);
    play($('.sc-b__tate'), [{ clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0 0)' }], 1900, 900, OUT);

    const words = $$('.sc-b__slot span');
    const colors = [LILAC, MINT, GOLD];
    words.forEach((w, i) => {
        const s = 2200 + i * 380;
        play(w, [{ transform: 'translateY(110%) skewY(8deg)', opacity: 1 }, { transform: 'none', opacity: 1 }], s, 200, OUT);
        if (i < words.length - 1) play(w, [{ transform: 'none' }, { transform: 'translateY(-110%) skewY(-8deg)' }], s + 300, 160, SNAP, 'forwards');
        at(s, () => { hit(.9, rgb(colors[i])); speed = { color: colors[i], until: performance.now() + 360 }; });
    });
    play(scB, [{ transform: 'none', opacity: 1 }, { transform: 'scaleY(.02)', opacity: 1, offset: .8 }, { transform: 'scaleY(.02) scaleX(0)', opacity: 0 }], 3330, 300, SNAP, 'forwards');

    /* ---------- Scene C · 3.6–5.6s: the works as slanted manga panels ---------- */

    const scC = $('.sc-c');
    play(scC, [{ opacity: 0 }, { opacity: 1 }], 3600, 1);
    const panels = $$('.panel');
    // stacked on phones, side by side on wider screens: panels travel along the axis that never crosses another panel
    const narrow = innerWidth < 900;
    const from = narrow
        ? ['translateX(-120%)', 'translateX(120%)', 'translateX(-120%)']
        : ['translateY(-110%)', 'translateY(110%)', 'translateY(-110%)'];
    panels.forEach((p, i) => {
        const s = 3620 + i * 170;
        play(p, [{ transform: from[i] }, { transform: 'none' }], s, 520, OUT);
        at(s + 120, () => hit(.7, rgb(colors[i])));
        const name = p.querySelector('b');
        play(name, [{ color: 'transparent', letterSpacing: '.18em' }, { color: 'transparent', offset: .45 }, { color: getComputedStyle(p).getPropertyValue('--c').trim() || '#fff', letterSpacing: '.02em' }], s + 260, 760, OUT);
        play(p.querySelector('.panel__jp'), [{ clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0 0)' }], s + 180, 700, OUT);
        play(p.querySelector('span'), [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], s + 560, 380);
    });
    const away = narrow
        ? ['translateX(120%)', 'translateX(-120%)', 'translateX(120%)']
        : ['translateY(110%)', 'translateY(-110%)', 'translateY(110%)'];
    panels.forEach((p, i) => play(p, [{ transform: 'none', opacity: 1 }, { transform: away[i], opacity: 0 }], 5240 + i * 50, 300, SNAP, 'forwards'));

    /* ---------- Scene D · 5.6–6.4s: the lockup ---------- */

    const scD = $('.sc-d');
    play(scD, [{ opacity: 0 }, { opacity: 1 }], 5600, 1);
    play($('.lock'), [{ opacity: 0, letterSpacing: '.45em', transform: 'scale(.94)' }, { opacity: 1, letterSpacing: '.06em', transform: 'none' }], 5620, 650, OUT);
    at(5640, () => hit(1, rgb(PINK)));
    play($('.lock__rule'), [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], 5800, 500, OUT);
    play($('.lock__tag'), [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], 5950, 400);

    /* ---------- Exit · 6.4–7.0s: a diagonal shutter opens onto the site ---------- */

    const progress = $('.intro__progress i');
    play(progress, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], 0, 6400, 'linear');

    const exit = (delay, duration) => {
        const a = play(intro, [
            { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
            { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 -25%)' }
        ], delay, duration, SNAP, 'forwards');
        a.onfinish = finish;
    };
    exit(6400, 600);

    function finish() {
        if (done) return;
        done = true;
        timers.forEach(clearTimeout);
        removeEventListener('resize', size);
        onDone();
    }

    return {
        elapsed: () => performance.now() - t0,
        skip() {
            if (done) return;
            anims.forEach(a => { if (a.effect?.target === intro) a.cancel(); });
            exit(0, 450);
        }
    };
}
