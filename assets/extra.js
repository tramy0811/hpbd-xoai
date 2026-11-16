// Phần nâng cấp thêm cho bản gốc: pháo hoa, confetti, thổi nến, tên, lá thư, nút nhạc
(function () {
    'use strict';
    var C = window.config || {};
    var NAME = C.name || '';
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Canvas pháo hoa + confetti ---------- */
    var cv = document.getElementById('fx'), ctx = cv.getContext('2d'), parts = [], W, H, dpr;
    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr;
        cv.style.width = innerWidth + 'px'; cv.style.height = innerHeight + 'px';
    }
    resize(); window.addEventListener('resize', resize);
    var COLORS = ['#FFB627', '#FF8A1F', '#FF5E5B', '#FFE27A', '#3FA34D', '#ffffff', '#FF9EC4', '#8377E4', '#20CFB4'];
    function pick(a) { return a[(Math.random() * a.length) | 0]; }
    var k = reduced ? .3 : 1;

    function firework(x, y) {
        x = (x == null ? innerWidth * (.15 + Math.random() * .7) : x) * dpr;
        y = (y == null ? innerHeight * (.1 + Math.random() * .35) : y) * dpr;
        var c1 = pick(COLORS), c2 = pick(COLORS), n = Math.round(80 * k);
        for (var i = 0; i < n; i++) {
            var a = Math.PI * 2 * i / n, sp = (2 + Math.random() * 3.5) * dpr;
            parts.push({ t: 's', x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, g: .045 * dpr, d: .985,
                life: 1, dec: .011 + Math.random() * .01, r: 2.3 * dpr, c: Math.random() < .7 ? c1 : c2 });
        }
    }
    function confetti(n) {
        n = Math.round((n || 160) * k);
        for (var i = 0; i < n; i++) {
            parts.push({ t: 'c', x: Math.random() * W, y: -20 * dpr - Math.random() * H * .5,
                vx: (Math.random() - .5) * 2 * dpr, vy: (2 + Math.random() * 3) * dpr, g: .02 * dpr, d: .995,
                life: 1, dec: .0025, w: (6 + Math.random() * 6) * dpr, h: (8 + Math.random() * 8) * dpr,
                rot: Math.random() * 6, vr: (Math.random() - .5) * .3, c: pick(COLORS) });
        }
    }
    (function tick() {
        ctx.clearRect(0, 0, W, H);
        for (var i = parts.length - 1; i >= 0; i--) {
            var p = parts[i];
            p.vx *= p.d; p.vy = p.vy * p.d + p.g; p.x += p.vx; p.y += p.vy; p.life -= p.dec;
            if (p.life <= 0 || p.y > H + 40) { parts.splice(i, 1); continue; }
            ctx.globalAlpha = Math.max(0, Math.min(1, p.life * 1.4));
            ctx.fillStyle = p.c;
            if (p.t === 's') { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill(); }
            else {
                p.rot += p.vr;
                ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.scale(1, Math.cos(p.rot * 2));
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
            }
        }
        ctx.globalAlpha = 1;
        requestAnimationFrame(tick);
    })();
    var showTimer;
    function fireworkShow(ms, every) {
        clearInterval(showTimer);
        var end = Date.now() + ms;
        firework();
        showTimer = setInterval(function () {
            if (Date.now() > end) return clearInterval(showTimer);
            firework(); if (Math.random() < .4) firework();
        }, every || 650);
    }

    /* ---------- Tim + xoài bay lên ở màn kết ---------- */
    function startFloaters() {
        var box = document.getElementById('floaters');
        if (box.childNodes.length) return;
        var icons = ['♥', '🥭', '♥', '💛', '♥', '🎈'];
        for (var i = 0; i < 16; i++) {
            var f = document.createElement('span');
            f.className = 'floater';
            f.textContent = icons[i % icons.length];
            f.style.left = Math.random() * 96 + '%';
            f.style.fontSize = (18 + Math.random() * 22) + 'px';
            f.style.animationDuration = (9 + Math.random() * 8) + 's';
            f.style.animationDelay = (-Math.random() * 15) + 's';
            box.appendChild(f);
        }
        box.classList.add('on');
    }

    /* ---------- Tên ---------- */
    // Tách tên thành từng chữ: mỗi chữ có hoạ tiết xoài trắng, vài chữ có lá mọc trên đầu
    var TILTS = [-4, 3, -2, 4, -3, 2];
    function buildMangoWord(el, withBadge) {
        var chars = Array.from(String(NAME).normalize('NFC').toUpperCase());
        var leafAt = {};
        leafAt[Math.min(1, chars.length - 1)] = 'right';
        if (chars.length > 2) leafAt[chars.length - 1] = 'left';
        el.innerHTML = '';
        chars.forEach(function (ch, i) {
            var cell = document.createElement('span');
            cell.className = 'cell';
            cell.style.setProperty('--i', i);
            cell.style.setProperty('--r', TILTS[i % TILTS.length] + 'deg');
            var s = document.createElement('span');
            s.className = 'ch';
            s.textContent = ch;
            cell.appendChild(s);
            if (leafAt[i]) {
                var leaf = document.createElement('i');
                leaf.className = 'leaf' + (leafAt[i] === 'left' ? ' left' : '');
                cell.appendChild(leaf);
            }
            el.appendChild(cell);
        });
        if (withBadge && C.ageBadge) {
            var b = document.createElement('span');
            b.className = 'age-badge';
            b.textContent = C.ageBadge;
            el.appendChild(b);
        }
    }
    $(function () {
        buildMangoWord(document.getElementById('ten_xoai'), true);
        buildMangoWord(document.getElementById('intro_name'), false);
        $('#cake_brand').text(String(NAME).toLowerCase());
        document.title = 'Chúc mừng sinh nhật ' + NAME + ' 🎂';
    });
    $('#bannar_coming').on('click', function () {
        setTimeout(function () {
            var el = $('#ten_xoai').addClass('is-open')[0];
            setTimeout(function () {
                var r = el.getBoundingClientRect();
                firework(r.left + r.width * .25, r.top + r.height * .3);
                setTimeout(function () { firework(r.left + r.width * .75, r.top + r.height * .2); }, 350);
            }, 1300);
        }, 2200);
    });
    // chạm vào chữ thì chữ nhảy
    $(document).on('click', '.ten-xoai.is-open .cell', function () {
        var s = this;
        s.classList.remove('boing'); void s.offsetWidth; s.classList.add('boing');
        setTimeout(function () { s.classList.remove('boing'); }, 650);
    });

    /* ---------- Màn chờ ---------- */
    $(function () {
        var sky = document.getElementById('intro_sky');
        for (var i = 0; i < 90; i++) {
            var st = document.createElement('span');
            var size = Math.random() < .15 ? 3 : (Math.random() < .5 ? 2 : 1.5);
            st.className = 'intro-star';
            st.style.cssText = 'left:' + Math.random() * 100 + '%;top:' + Math.random() * 100 + '%;width:' + size + 'px;height:' + size + 'px;' +
                '--d:' + (2 + Math.random() * 3) + 's;--dl:' + (-Math.random() * 4) + 's';
            sky.appendChild(st);
        }
        for (var j = 0; j < 16; j++) {
            var ff = document.createElement('span');
            ff.className = 'firefly';
            ff.style.cssText = 'left:' + Math.random() * 100 + '%;top:' + (35 + Math.random() * 65) + '%;' +
                '--d:' + (5 + Math.random() * 6) + 's;--dl:' + (-Math.random() * 6) + 's;' +
                '--x:' + (Math.random() * 160 - 80) + 'px;--y:' + (Math.random() * 160 - 80) + 'px';
            sky.appendChild(ff);
        }
    });
    $('#intro_switch').on('click', function () {
        $('#intro').addClass('off');
        $('#turn_on').trigger('click');
    });

    /* ---------- Nút nhạc ---------- */
    var song = $('.song')[0];
    $('#play').on('click', function () { $('#music_toggle').addClass('on'); });
    $('#music_toggle').on('click', function () {
        if (song.paused) { song.play(); $(this).removeClass('off'); }
        else { song.pause(); $(this).addClass('off'); }
    });

    /* ---------- Thổi nến ---------- */
    var lit = false, blown = false, stream = null, actx = null;
    function blowOut() {
        if (!lit || blown) return;
        blown = true;
        stopMic();
        $('.candle-flames').removeClass('wind').addClass('out');
        $('.candle-flames .flame').stop(true).fadeOut(300);
        $('#blow_hint, #blow_candle').stop(true).fadeOut('slow');
        song.volume = 1;
        confetti(200);
        fireworkShow(3500, 450);
        setTimeout(function () { $('#wish_message').fadeIn('slow'); }, 1800);
    }
    function stopMic() {
        if (stream) { stream.getTracks().forEach(function (t) { t.stop(); }); stream = null; }
        if (actx) { actx.close(); actx = null; }
    }
    // chạm vào nến / bánh cũng thổi được
    $('.cake').on('click', blowOut);
    $('#blow_candle').on('click', function () {
        var btn = $(this);
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return blowOut();
        btn.prop('disabled', true).html('Đang nghe… thổi mạnh vào micro nè 💨');
        navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } })
            .then(function (s) {
                stream = s;
                actx = new (window.AudioContext || window.webkitAudioContext)();
                var an = actx.createAnalyser();
                an.fftSize = 1024;
                actx.createMediaStreamSource(s).connect(an);
                var buf = new Float32Array(an.fftSize), strong = 0;
                song.volume = .25;
                (function listen() {
                    if (blown || !stream) return;
                    an.getFloatTimeDomainData(buf);
                    var sum = 0;
                    for (var i = 0; i < buf.length; i++) sum += buf[i] * buf[i];
                    var rms = Math.sqrt(sum / buf.length);
                    $('.candle-flames').toggleClass('wind', rms > .05);
                    if (rms > .13) { if (++strong > 12) return blowOut(); } else strong = Math.max(0, strong - 1);
                    requestAnimationFrame(listen);
                })();
            })
            .catch(function () {
                btn.prop('disabled', false).html('Không mở được micro — chạm vào nến để thổi nhé');
                btn.off('click').on('click', blowOut);
            });
    });

    /* ---------- Lá thư ---------- */
    $(function () {
        // Thiệp: hiện nguyên văn lời chúc, không tự thêm tiêu đề
        if (C.letterTitle) $('#letter_title').text(C.letterTitle); else $('#letter_title').remove();
        $('<p class="wish-full">').text(String(C.letter || '')).appendTo('#letter_body');
        $('#letter_sign').text(C.signature ? '— ' + C.signature : '');
    });
    $('#open_letter').on('click', function () {
        $('#letter_overlay').addClass('is-open');
        $('#envelope').removeClass('open').show();
        $('#letter').removeClass('is-open');
    });
    $('#envelope').on('click', function () {
        var env = $(this);
        if (env.hasClass('open')) return;
        env.addClass('open');
        setTimeout(function () { env.hide(); $('#letter').addClass('is-open'); }, 1500);
    });
    $('#close_letter').on('click', function () {
        $('#letter_overlay').removeClass('is-open');
        // đóng thiệp -> màn kết: bánh hiện lại, pháo hoa, tim & xoài bay
        $('.cake').fadeIn('slow');
        if (C.loveText) $('.love_text').css('display', 'block');
        confetti(240);
        fireworkShow(reduced ? 3000 : 1e9, 1200);
        startFloaters();
    });
    function openCard() {
        $('#letter_overlay').addClass('is-open');
        $('#envelope').removeClass('open').show();
        $('#letter').removeClass('is-open');
    }

    /* ---------- Trang trí: dây cờ HAPPY / BIRTHDAY ---------- */
    var FLAG_COLORS = [
        { c: '#FFB627' }, { c: '#F6BDAE', light: true }, { c: '#9CCB6B' }, { c: '#F3DD9A', light: true }, { c: '#FF8A5B' }, { c: '#FFF1D2', light: true }
    ];
    function buildBuntingRow(word, colorOffset) {
        var letters = Array.from(word);
        var vw = Math.min(window.innerWidth, 900);
        var fw = Math.max(26, Math.min(48, (vw - 40) / (letters.length * 1.25)));
        var W = letters.length * fw * 1.22 + fw * .6, sag = fw * .55;
        var row = document.createElement('div');
        row.className = 'bunting-row';
        row.style.width = W + 'px';
        row.style.height = (sag + fw * 1.35) + 'px';
        row.innerHTML = '<svg width="' + W + '" height="' + (sag * 2) + '"><path d="M0 2 Q ' + (W / 2) + ' ' + (sag * 2 + 2) + ' ' + W + ' 2"/></svg>';
        letters.forEach(function (ch, i) {
            var t = (i + .75) / (letters.length + .5);
            var x = t * W, y = 2 + 4 * sag * t * (1 - t);
            var ang = Math.atan(4 * sag * (1 - 2 * t) / W) * 180 / Math.PI;
            var col = FLAG_COLORS[(i + colorOffset) % FLAG_COLORS.length];
            var wrap = document.createElement('div');
            wrap.className = 'flag-wrap';
            wrap.style.cssText = 'left:' + (x - fw / 2) + 'px;top:' + y + 'px;transform:rotate(' + ang.toFixed(1) + 'deg)';
            var f = document.createElement('span');
            f.className = 'flag' + (col.light ? ' light' : '');
            f.textContent = ch;
            f.style.setProperty('--fw', fw + 'px');
            f.style.setProperty('--c', col.c);
            f.style.setProperty('--d', (.5 + (colorOffset ? .45 : 0) + i * .09) + 's');
            wrap.appendChild(f);
            row.appendChild(wrap);
        });
        return row;
    }
    $(function () {
        var b = document.getElementById('bunting');
        b.appendChild(buildBuntingRow('HAPPY', 0));
        b.appendChild(buildBuntingRow('BIRTHDAY', 3));
    });

    /* ---------- Trang trí: đồ treo trên trần ---------- */
    var MANGO_SVG = '<svg viewBox="0 0 100 110" width="100%" height="100%"><path d="M52 18c26-2 42 22 40 50-2 26-24 40-46 38C22 104 6 84 10 60 14 36 28 20 52 18z" fill="#FFB627"/><path d="M52 18c26-2 42 22 40 50-2 26-24 40-46 38" fill="none" stroke="#FF8A1F" stroke-width="6" opacity=".5"/><ellipse cx="34" cy="44" rx="8" ry="13" fill="#fff" opacity=".4" transform="rotate(25 34 44)"/><path d="M52 19c0-6 1-10 4-14" stroke="#6B4A1E" stroke-width="4" stroke-linecap="round" fill="none"/><path d="M56 8c10-8 26-8 34 0-10 8-24 9-34 0z" fill="#5DB845"/></svg>';
    var STAR_SVG = '<svg viewBox="0 0 24 24" width="100%" height="100%"><path d="M12 1.8l3 6.6 7.2.8-5.4 4.9 1.5 7.1L12 17.6l-6.3 3.6 1.5-7.1L1.8 9.2 9 8.4z" fill="#FFD25A" stroke="#F2B132" stroke-width="1" stroke-linejoin="round"/></svg>';
    function buildHangers() {
        var box = document.getElementById('hangers');
        var specs = [
            { x: 3, len: 110, kind: 'honey', s: 46, c: '#F6BDAE' },
            { x: 9, len: 190, kind: 'mango', s: 42 },
            { x: 15, len: 70, kind: 'star', s: 30, inner: true },
            { x: 21, len: 150, kind: 'fan', s: 50, c: '#9CCB6B', inner: true },
            { x: 79, len: 140, kind: 'fan', s: 50, c: '#F6BDAE', inner: true },
            { x: 85, len: 80, kind: 'star', s: 30, inner: true },
            { x: 91, len: 180, kind: 'mango', s: 42 },
            { x: 97, len: 100, kind: 'honey', s: 46, c: '#F3DD9A' }
        ];
        specs.forEach(function (sp, i) {
            var h = document.createElement('div');
            h.className = 'hanger' + (sp.inner ? ' side-inner' : '');
            h.style.left = 'calc(' + sp.x + '% - ' + sp.s / 2 + 'px)';
            h.style.width = sp.s + 'px';
            h.style.setProperty('--d', ((i % 4) * .12 + (i > 3 ? .06 : 0)) + 's');
            h.style.setProperty('--sw', (2.2 + Math.random() * 1.6).toFixed(2) + 's');
            var orn;
            if (sp.kind === 'mango') orn = '<span class="orn" style="width:' + sp.s + 'px;height:' + sp.s * 1.1 + 'px">' + MANGO_SVG + '</span>';
            else if (sp.kind === 'star') orn = '<span class="orn" style="width:' + sp.s + 'px;height:' + sp.s + 'px">' + STAR_SVG + '</span>';
            else orn = '<span class="orn orn-' + sp.kind + '" style="--s:' + sp.s + 'px;--c:' + sp.c + '"></span>';
            h.innerHTML = '<span class="line" style="height:' + sp.len + 'px"></span>' + orn;
            box.appendChild(h);
        });
    }
    $(buildHangers);

    /* ---------- Trang trí: bướm bay (cùng màu bướm trên bánh) ---------- */
    var bflies = [], flutterOn = false;
    function startButterflies() {
        if (flutterOn || reduced) return;
        flutterOn = true;
        var box = document.getElementById('flutter');
        var pal = [['#F6BDAE', '#F3DD9A'], ['#F3DD9A', '#F6BDAE'], ['#FBD9CF', '#FFE27A'], ['#F6BDAE', '#FFF1D2']];
        var n = innerWidth < 600 ? 4 : 7;
        for (var i = 0; i < n; i++) {
            var el = document.createElement('div');
            var p = pal[i % pal.length];
            el.className = 'bf';
            el.style.setProperty('--c1', p[0]);
            el.style.setProperty('--c2', p[1]);
            el.innerHTML = '<span class="w l"></span><span class="w r"></span><span class="body"></span>';
            el.querySelectorAll('.w').forEach(function (w) { w.style.animationDuration = (.22 + Math.random() * .12).toFixed(2) + 's'; });
            box.appendChild(el);
            var dir = Math.random() < .5 ? 1 : -1;
            bflies.push({ el: el, x: dir > 0 ? -40 - Math.random() * 300 : innerWidth + 40 + Math.random() * 300,
                y: 60 + Math.random() * (innerHeight * .6), vx: dir * (.6 + Math.random() * .8),
                ph: Math.random() * 6, amp: 20 + Math.random() * 30, sc: .7 + Math.random() * .6 });
        }
        (function move() {
            var t = performance.now() / 1000;
            bflies.forEach(function (b) {
                b.x += b.vx;
                if (b.vx > 0 && b.x > innerWidth + 60) { b.x = -60; b.y = 60 + Math.random() * innerHeight * .6; }
                if (b.vx < 0 && b.x < -60) { b.x = innerWidth + 60; b.y = 60 + Math.random() * innerHeight * .6; }
                var yy = b.y + Math.sin(t * 1.6 + b.ph) * b.amp;
                var tilt = Math.cos(t * 1.6 + b.ph) * 18 + (b.vx > 0 ? 70 : -70);
                b.el.style.transform = 'translate(' + b.x + 'px,' + yy + 'px) rotate(' + tilt + 'deg) scale(' + b.sc + ')';
            });
            requestAnimationFrame(move);
        })();
    }
    $('#bannar_coming').on('click', function () {
        $('#hangers').addClass('on');
        $('#bunting').addClass('on');
        confetti(80);
        setTimeout(startButterflies, 2600);
    });

    /* ---------- API cho effect.js gọi ---------- */
    window.HPBD = {
        candlesLit: function () { lit = true; },
        confetti: confetti,
        openCard: openCard,
    };
})();
