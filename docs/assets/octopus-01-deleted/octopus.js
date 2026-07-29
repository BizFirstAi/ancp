/**
 * octopus.js — BizFirstAi Octopus Animation Web Component
 * ─────────────────────────────────────────────────────────
 * Single-file self-contained Web Component. PNG lives alongside
 * this script as octopus-head.png (no base64, loads instantly).
 *
 * USAGE — two steps:
 *   1. Add this script once (in <head> or end of <body>):
 *        <script src="./path/to/octopus-01/octopus.js"></script>
 *
 *   2. Place the component wherever you need the section:
 *        <octopus-stage></octopus-stage>
 *
 * The component auto-loads its CSS sibling, builds the full sticky
 * scroll section (intro → canvas animation → outro), and manages
 * resize + scroll internally. No build step. No dependencies.
 * ─────────────────────────────────────────────────────────────────
 */
(function () {
  'use strict';

  // ── Resolve directory of this script at parse time ───────────
  // document.currentScript is only available during initial evaluation.
  const _scriptDir = (function () {
    const s = document.currentScript;
    if (s && s.src) return s.src.substring(0, s.src.lastIndexOf('/') + 1);
    return './';
  })();

  // ── Inject CSS link once ─────────────────────────────────────
  function _ensureCSS() {
    const cssHref = _scriptDir + 'octopus.css';
    if (!document.querySelector('link[href="' + cssHref + '"]')) {
      const link = document.createElement('link');
      link.rel  = 'stylesheet';
      link.href = cssHref;
      document.head.appendChild(link);
    }
    if (!document.querySelector('link[href*="fonts.googleapis.com"]')) {
      const gf = document.createElement('link');
      gf.rel  = 'stylesheet';
      gf.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
      document.head.appendChild(gf);
    }
  }

  // ── Products configuration ────────────────────────────────────
  const PRODUCTS = [
    { name: 'Flow',                  tag: 'Workflow automation',   angle: -Math.PI * 0.82 },
    { name: 'ANCP',                  tag: 'AI agent protocol',     angle: -Math.PI * 0.52 },
    { name: 'Atlas Forms',           tag: 'UI app builder',        angle: -Math.PI * 0.20 },
    { name: 'EdgeStream & Interact', tag: 'Unified UI workflow',   angle:  Math.PI * 0.10 },
    { name: 'Observe',               tag: 'Full-stack visibility', angle:  Math.PI * 0.36 },
    { name: 'Data Ocean',            tag: 'Unified data layer',    angle:  Math.PI * 0.62 },
    { name: 'Market Hub',            tag: 'Launch marketplace',    angle:  Math.PI * 0.86 },
    { name: 'Passport',              tag: 'Identity & security',   angle: -Math.PI * 0.98 },
  ];

  const STAGE_LABELS = ['Resting\u2026', 'Connecting\u2026', 'Orchestrating\u2026', 'Fully connected'];
  const STEPS        = 56;

  // ── Web Component ─────────────────────────────────────────────
  class OctopusStage extends HTMLElement {

    constructor() {
      super();
      this._W          = 0;
      this._H          = 0;
      this._cx         = 0;
      this._cy         = 0;
      this._T          = 0;
      this._scrollProg = 0;
      this._labelEls   = [];
      this._bubbles    = [];
      this._mouseX     = 0;
      this._mouseY     = 0;
      this._imgReady   = false;
      this._rafId      = null;

      this._octImg        = new Image();
      this._octImg.onload = () => { this._imgReady = true; };
      this._octImg.src    = _scriptDir + 'octopus-head.png';
    }

    connectedCallback() {
      _ensureCSS();
      this._build();
      this._bindEvents();
      this._resize();
      this._onScroll();
      this._render();
    }

    disconnectedCallback() {
      this._unbindEvents();
      if (this._rafId) cancelAnimationFrame(this._rafId);
    }

    _build() {
      this.innerHTML = '<div class="oct-pbar"></div>'
        + '<section class="oct-intro">'
        + '<div class="oct-eyebrow"><span></span>BizFirstAi \xB7 Orchestrate AI</div>'
        + '<h1>Meet<br/><em>Octopus</em></h1>'
        + '<p>The AI orchestration engine at the heart of every BizFirstAi product. Eight arms. Infinite reach.</p>'
        + '<div class="oct-scroll-cue">'
        + '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7"/></svg>'
        + 'Scroll to orchestrate</div></section>'
        + '<div class="oct-sticky-outer">'
        + '<div class="oct-sticky-stage">'
        + '<canvas class="oct-canvas"></canvas>'
        + '<div class="oct-stage-label">Resting\u2026</div>'
        + '<div class="oct-plabels"></div>'
        + '</div></div>'
        + '<section class="oct-outro">'
        + '<h2>One engine.<br/><em>Eight connections.</em><br/>Zero limits.</h2>'
        + '<p>Octopus reaches into every product in your stack \u2014 orchestrating flows, agents, data, and identity without writing a line of glue code.</p>'
        + '<a href="#" class="oct-outro-btn">Explore Octopus \u2192</a>'
        + '</section>';

      this._canvas  = this.querySelector('canvas');
      this._ctx     = this._canvas.getContext('2d');
      this._outer   = this.querySelector('.oct-sticky-outer');
      this._pbar    = this.querySelector('.oct-pbar');
      this._slbl    = this.querySelector('.oct-stage-label');
      this._plabels = this.querySelector('.oct-plabels');
    }

    _bindEvents() {
      this._onScrollBound = () => this._onScroll();
      this._onResizeBound = () => this._resize();
      this._onMouseBound  = function(e) { this._mouseX = e.clientX; this._mouseY = e.clientY; }.bind(this);
      window.addEventListener('scroll',    this._onScrollBound, { passive: true });
      window.addEventListener('resize',    this._onResizeBound);
      window.addEventListener('mousemove', this._onMouseBound);
    }

    _unbindEvents() {
      window.removeEventListener('scroll',    this._onScrollBound);
      window.removeEventListener('resize',    this._onResizeBound);
      window.removeEventListener('mousemove', this._onMouseBound);
    }

    _resize() {
      this._W  = this._canvas.width  = window.innerWidth;
      this._H  = this._canvas.height = window.innerHeight;
      this._cx = this._W * 0.5;
      this._cy = this._H * 0.5;
      this._buildLabels();
      this._resetBubbles();
    }

    _buildLabels() {
      this._plabels.innerHTML = '';
      this._labelEls = [];
      const R = Math.min(this._W, this._H) * 0.41;
      for (var i = 0; i < PRODUCTS.length; i++) {
        var p  = PRODUCTS[i];
        var lx = this._cx + Math.cos(p.angle) * R;
        var ly = this._cy + Math.sin(p.angle) * R;
        var d  = document.createElement('div');
        d.className  = 'oct-plabel';
        d.style.left = lx + 'px';
        d.style.top  = ly + 'px';
        d.innerHTML  = '<div class="oct-plabel__name">' + p.name + '</div>'
                     + '<div class="oct-plabel__tag">'  + p.tag  + '</div>';
        this._plabels.appendChild(d);
        this._labelEls.push(d);
      }
    }

    _onScroll() {
      var rect  = this._outer.getBoundingClientRect();
      var total = this._outer.offsetHeight - window.innerHeight;
      this._scrollProg = Math.max(0, Math.min(1, -rect.top / total));
      this._pbar.style.width = (this._scrollProg * 100) + '%';
      this._slbl.textContent = STAGE_LABELS[Math.min(3, Math.floor(this._scrollProg * 4))];
      for (var i = 0; i < PRODUCTS.length; i++) {
        var threshold = i / PRODUCTS.length * 0.72 + 0.04;
        if (this._labelEls[i]) {
          this._labelEls[i].classList.toggle('on', this._scrollProg >= threshold);
        }
      }
    }

    _resetBubbles() {
      this._bubbles = [];
      for (var i = 0; i < 28; i++) this._bubbles.push(this._newBubble(true));
    }

    _newBubble(init) {
      return {
        x:     this._cx + (Math.random() - .5) * this._W * 1.1,
        y:     init ? Math.random() * this._H : this._H + 12,
        r:     Math.random() * 2.2 + .4,
        vy:    Math.random() * .5  + .2,
        vx:    (Math.random() - .5) * .22,
        alpha: Math.random() * .1  + .03,
      };
    }

    _drawBubbles() {
      var ctx = this._ctx;
      for (var i = 0; i < this._bubbles.length; i++) {
        var b = this._bubbles[i];
        b.y -= b.vy; b.x += b.vx;
        if (b.y < -8) { var nb = this._newBubble(false); b.x=nb.x; b.y=nb.y; b.r=nb.r; b.vy=nb.vy; b.vx=nb.vx; b.alpha=nb.alpha; }
        ctx.save();
        ctx.globalAlpha = b.alpha;
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI*2);
        ctx.strokeStyle = '#2DD4BF'; ctx.lineWidth = .6; ctx.stroke();
        ctx.beginPath(); ctx.arc(b.x - b.r*.28, b.y - b.r*.28, b.r*.22, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fill();
        ctx.restore();
      }
    }

    _cubicBez(p0, p1, p2, p3, t) {
      var m = 1 - t;
      return {
        x: m*m*m*p0.x + 3*m*m*t*p1.x + 3*m*t*t*p2.x + t*t*t*p3.x,
        y: m*m*m*p0.y + 3*m*m*t*p1.y + 3*m*t*t*p2.y + t*t*t*p3.y,
      };
    }

    _tentacleEdges(p0, cp1, cp2, pe, baseHW) {
      var L = [], R = [], EPS = 0.001;
      for (var i = 0; i <= STEPS; i++) {
        var s   = i / STEPS;
        var pt  = this._cubicBez(p0, cp1, cp2, pe, s);
        var pt2 = this._cubicBez(p0, cp1, cp2, pe, Math.min(s + EPS, 1));
        var tx  = pt2.x - pt.x, ty = pt2.y - pt.y;
        var tl  = Math.sqrt(tx*tx + ty*ty) || 1;
        var nx  = -ty / tl, ny = tx / tl;
        var hw  = baseHW * Math.pow(1 - s, 0.72);
        L.push({ x: pt.x + nx*hw, y: pt.y + ny*hw, pt: pt, nx: nx, ny: ny, hw: hw });
        R.push({ x: pt.x - nx*hw, y: pt.y - ny*hw });
      }
      return { L: L, R: R };
    }

    _drawTentacle(idx) {
      var ctx   = this._ctx;
      var prod  = PRODUCTS[idx];
      var phase = idx / PRODUCTS.length * Math.PI * 2;
      var bodyR = 8;
      var tStart= idx / PRODUCTS.length * 0.66 + 0.02;
      var ext   = Math.max(0, Math.min(1, (this._scrollProg - tStart) / 0.32));
      var maxLen= Math.min(this._W, this._H) * 0.37;
      var reach = bodyR + (maxLen - bodyR) * (.15 + .85 * ext);
      var T     = this._T;
      var waveA = 72 * (1 - ext * 0.45);
      var waveV = Math.sin(2.2*T - 3.5*phase) * waveA * (0.5 + 0.5*ext);
      var perpX = -Math.sin(prod.angle);
      var perpY =  Math.cos(prod.angle);
      var mx    = (this._mouseX - this._cx) * 0.015 * ext;
      var my    = (this._mouseY - this._cy) * 0.015 * ext;
      var bx    = this._cx + Math.cos(prod.angle) * bodyR;
      var by    = this._cy + Math.sin(prod.angle) * bodyR;
      var ex    = this._cx + Math.cos(prod.angle) * reach + perpX * waveV * 0.12 + mx;
      var ey    = this._cy + Math.sin(prod.angle) * reach + perpY * waveV * 0.12 + my;
      var bendAmp = Math.sin(1.4*T + phase*1.7) * waveA * 1.4;
      var cp1   = { x: this._cx + Math.cos(prod.angle)*reach*0.32 + perpX*waveV,
                    y: this._cy + Math.sin(prod.angle)*reach*0.32 + perpY*waveV };
      var cp2   = { x: this._cx + Math.cos(prod.angle)*reach*0.68 + perpX*bendAmp*0.9,
                    y: this._cy + Math.sin(prod.angle)*reach*0.68 + perpY*bendAmp*0.9 };
      var p0    = { x: bx, y: by };
      var pe    = { x: ex, y: ey };
      var edges = this._tentacleEdges(p0, cp1, cp2, pe, 9);
      var L     = edges.L, R = edges.R;

      ctx.save();
      var grad = ctx.createLinearGradient(bx, by, ex, ey);
      grad.addColorStop(0,    'rgba(18, 95,  75, 0.96)');
      grad.addColorStop(0.35, 'rgba(14, 78,  60, 0.90)');
      grad.addColorStop(0.68, 'rgba(9,  54,  42, 0.65)');
      grad.addColorStop(1,    'rgba(5,  32,  26, 0.00)');
      ctx.beginPath(); ctx.moveTo(L[0].x, L[0].y);
      for (var i = 1; i < L.length; i++) ctx.lineTo(L[i].x, L[i].y);
      for (var j = R.length-1; j >= 0; j--) ctx.lineTo(R[j].x, R[j].y);
      ctx.closePath(); ctx.fillStyle = grad; ctx.fill();

      ctx.beginPath(); ctx.moveTo(L[0].x, L[0].y);
      for (var i = 1; i < L.length; i++) ctx.lineTo(L[i].x, L[i].y);
      ctx.strokeStyle = 'rgba(45,212,191,0.45)'; ctx.lineWidth = 1.2; ctx.stroke();

      ctx.beginPath(); ctx.moveTo(R[0].x, R[0].y);
      for (var i = 1; i < R.length; i++) ctx.lineTo(R[i].x, R[i].y);
      ctx.strokeStyle = 'rgba(45,212,191,0.30)'; ctx.lineWidth = 0.9; ctx.stroke();
      ctx.restore();

      if (ext > 0.05) {
        ctx.save();
        for (var i = 3; i < STEPS-4; i += 7) {
          var s  = i / STEPS;
          var pt = this._cubicBez(p0, cp1, cp2, pe, s);
          var hw = L[i] ? L[i].hw : 0;
          if (hw < 1.5) continue;
          var scatter = Math.sin(i*3.7 + phase*2.3) * hw * 0.45;
          ctx.beginPath();
          ctx.arc(pt.x + L[i].nx*scatter, pt.y + L[i].ny*scatter, (1-s)*1.6+0.3, 0, Math.PI*2);
          ctx.fillStyle = 'rgba(45,212,191,' + (0.35*(1-s)*ext).toFixed(2) + ')';
          ctx.fill();
        }
        ctx.restore();
      }

      if (ext > 0.08) {
        ctx.save(); ctx.globalAlpha = 0.7 * ext;
        for (var i = 4; i < STEPS-2; i += 5) {
          var pt = L[i], r = pt.hw * 0.48;
          if (r < 0.6) continue;
          var sx = pt.pt.x - pt.nx*pt.hw*0.6, sy = pt.pt.y - pt.ny*pt.hw*0.6;
          ctx.beginPath(); ctx.arc(sx, sy, r, 0, Math.PI*2);
          ctx.strokeStyle = 'rgba(45,212,191,0.38)'; ctx.lineWidth = .7; ctx.stroke();
          ctx.beginPath(); ctx.arc(sx, sy, r*.52, 0, Math.PI*2);
          ctx.fillStyle = 'rgba(5,28,22,0.92)'; ctx.fill();
        }
        ctx.restore();
      }
    }

    _drawBody() {
      if (!this._imgReady) return;
      var ctx  = this._ctx, W = this._W, H = this._H;
      var cx   = this._cx, cy = this._cy, T = this._T, sp = this._scrollProg;
      var dispSize = Math.min(W,H)*0.24, half = dispSize/2;
      var bob    = Math.sin(T*0.71)*5   + Math.sin(T*0.29)*3;
      var driftX = Math.sin(T*0.17)*10  + Math.sin(T*0.43)*5;
      var driftY = Math.sin(T*0.23)*7   + Math.cos(T*0.37)*4;
      var breathe= 1 + Math.sin(T*0.50)*0.018 + Math.sin(T*0.83)*0.008;
      var wobble = Math.sin(T*0.31)*0.016 + Math.sin(T*0.53)*0.009;
      var lean   = (this._mouseX - cx)*0.010;
      var tilt   = (this._mouseY - cy)*0.006;
      var finalS = breathe * (1 + sp*0.10);
      var connCount = 0;
      for (var i = 0; i < PRODUCTS.length; i++) {
        if (sp >= i/PRODUCTS.length*0.72+0.04) connCount++;
      }
      var glowAlpha  = 0.12 + connCount*0.025;
      var glowRadius = half*0.85 + connCount*6;

      ctx.save();
      ctx.translate(cx+lean+driftX, cy+bob+tilt+driftY);
      ctx.rotate(wobble);
      ctx.scale(finalS, finalS);
      var grd = ctx.createRadialGradient(0,0,half*0.1,0,0,glowRadius);
      grd.addColorStop(0,   'rgba(45,212,191,' + glowAlpha + ')');
      grd.addColorStop(0.5, 'rgba(13,148,136,' + (glowAlpha*0.4).toFixed(3) + ')');
      grd.addColorStop(1,   'rgba(13,148,136,0)');
      ctx.fillStyle = grd;
      ctx.beginPath(); ctx.arc(0,0,glowRadius*1.4,0,Math.PI*2); ctx.fill();
      ctx.drawImage(this._octImg, -half, -half, dispSize, dispSize);
      ctx.restore();
    }

    _drawAtmosphere() {
      var ctx = this._ctx, W = this._W, H = this._H;
      var cx  = this._cx, cy = this._cy, T = this._T;
      var v = ctx.createRadialGradient(cx, cy*.9, H*.06, cx, cy, H*.85);
      v.addColorStop(0, 'rgba(3,12,16,0)');
      v.addColorStop(1, 'rgba(1,5,8,.90)');
      ctx.fillStyle = v; ctx.fillRect(0,0,W,H);
      ctx.save(); ctx.globalAlpha = .007;
      for (var k = 0; k < 3; k++) {
        var lx = cx + Math.cos(T*.08+k*2.09)*W*.22;
        var ly = cy + Math.sin(T*.06+k*1.8) *H*.18;
        var cG = ctx.createRadialGradient(lx,ly,0,lx,ly,Math.max(W,H)*.55);
        cG.addColorStop(0,'rgba(45,212,191,.4)'); cG.addColorStop(1,'transparent');
        ctx.fillStyle = cG; ctx.fillRect(0,0,W,H);
      }
      ctx.restore();
    }

    _render() {
      this._T += 0.016;
      var ctx = this._ctx;
      ctx.fillStyle = '#030C10';
      ctx.fillRect(0, 0, this._W, this._H);
      this._drawAtmosphere();
      this._drawBubbles();
      for (var i = 0; i < PRODUCTS.length; i++) this._drawTentacle(i);
      this._drawBody();
      var self = this;
      this._rafId = requestAnimationFrame(function() { self._render(); });
    }
  }

  if (!customElements.get('octopus-stage')) {
    customElements.define('octopus-stage', OctopusStage);
  }

})();
