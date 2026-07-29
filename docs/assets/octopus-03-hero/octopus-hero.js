/**
 * octopus-hero.js — BizFirstAi Home Page with Rotating Octopus Hero
 * ─────────────────────────────────────────────────────────────────
 * Web Component for home page:
 *   Section 1: Octopus centered, hero headline
 *   Section 2: Octopus rotates right + moves left as user scrolls
 *   Section 3+: Content sections
 *
 * REFACTORED: Single Responsibility Principle, extracted configuration
 */
(function () {
  'use strict';

  // ── Configuration Constants ────────────────────────────────────
  const CONFIG = {
    CANVAS: {
      BACKGROUND: '#080F08',
      STEPS_PER_TENTACLE: 56,
    },
    TENTACLES: {
      COUNT: 8,
      MAX_LENGTH_RATIO: 0.127,
      LENGTH_MULTIPLIER: 1.2,
      BODY_RADIUS: 8,
      BASE_AMPLITUDE: 40,
      WAVE_FREQUENCY: 0.25,
      WAVE_PHASE_OFFSET: 2.2,
      BEND_FREQUENCY: 0.3,
      BEND_AMPLITUDE_MULT: 1.4,
      EXTENSION_MIN: 0.5,
      EXTENSION_SCROLL_MULT: 0.2,
      REACH_RATIO_MIN: 0.2,
      REACH_RATIO_MAX: 0.8,
      AMPLITUDE_REDUCTION: 0.2,
      WAVE_AMPLITUDE_MULT: 0.4,
      EXTENSION_AMPLITUDE_MULT: 0.3,
    },
    OCTOPUS_BODY: {
      SIZE_RATIO: 0.096,
      OFFSET_X_RATIO: 0.25,
      BOB_FREQ1: 0.35,
      BOB_AMP1: 3,
      BOB_FREQ2: 0.15,
      BOB_AMP2: 2,
      DRIFT_X_FREQ1: 0.12,
      DRIFT_X_AMP1: 5,
      DRIFT_X_FREQ2: 0.25,
      DRIFT_X_AMP2: 3,
      DRIFT_Y_FREQ1: 0.18,
      DRIFT_Y_AMP1: 4,
      DRIFT_Y_FREQ2: 0.22,
      DRIFT_Y_AMP2: 2,
      SCALE_SCROLL_MULT: 0.05,
      GLOW_RADIUS_BASE: 0.85,
      GLOW_SCROLL_MULT: 6,
    },
    ANIMATION: {
      BASE_OFFSET_Y_MULT: 0.3,
      BASE_OFFSET_X_MULT: 0.25,
      PULSE1_FREQ: Math.PI * 0.7,
      PULSE1_AMP: 0.04,
      PULSE2_FREQ: Math.PI * 0.5,
      PULSE2_AMP: 0.03,
      DRIFT1_FREQ: Math.PI * 0.6,
      DRIFT1_AMP: 0.025,
      DRIFT2_FREQ: Math.PI * 0.8,
      DRIFT2_AMP: 0.02,
      MOVEMENT_RESPONSE: 0.05,
      BASE_SCROLL_PROG: 0.3,
      BASE_SCROLL_MULT: 0.4,
    },
    SCROLL: {
      SECTION2_START_RATIO: 1.0,
      VISIBILITY_THRESHOLD_SECTION1: 0.3,
      VISIBILITY_THRESHOLD_SECTION2: 0.4,
    },
    SCROLL_PATH: {
      // Fraction of canvas dimensions to travel on full scroll
      MAX_X: 0.30,   // moves left  (0 = none, 1 = full canvas width)
      MAX_Y: 0.32,   // moves down  (0 = none, 1 = full canvas height)
      // X uses easeInCubic  (slow start → fast finish) → t³
      // Y uses easeOutCubic (fast start → slow finish) → 1-(1-t)³
      // Their mismatch is what creates the curved arc
    },
  };

  const COLORS = {
    TENTACLE_GRADIENT: [
      'rgba(18, 95, 75, 0.96)',
      'rgba(14, 78, 60, 0.90)',
      'rgba(9, 54, 42, 0.65)',
      'rgba(5, 32, 26, 0.00)',
    ],
    TENTACLE_STROKE_LEFT: 'rgba(45,212,191,0.55)',
    TENTACLE_STROKE_RIGHT: 'rgba(45,212,191,0.40)',
    TENTACLE_STROKE_WIDTH_LEFT: 2.2,
    TENTACLE_STROKE_WIDTH_RIGHT: 1.6,
    GLOW: 'rgba(45,212,191,0.2)',
    GLOW_MID: 'rgba(13,148,136,0.1)',
    GLOW_END: 'rgba(13,148,136,0)',
    BUBBLE_STROKE: '#2DD4BF',
    BUBBLE_FILL: 'rgba(255,255,255,.4)',
  };

  // ── Resolve script directory ───────────────────────────────────
  const _scriptDir = (function () {
    const s = document.currentScript;
    if (s && s.src) return s.src.substring(0, s.src.lastIndexOf('/') + 1);
    return './';
  })();

  // ── Inject Dependencies ────────────────────────────────────────
  function _ensureDependencies() {
    _ensureStylesheet(_scriptDir + 'octopus-hero.css');
    _ensureStylesheet('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
  }

  function _ensureStylesheet(href) {
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }
  }

  class OctopusHeroSection extends HTMLElement {
    constructor() {
      super();
      // ── Viewport & positioning ────────────────────────────────
      this._W = 0;
      this._H = 0;
      this._cx = 0;
      this._cy = 0;

      // ── Animation state ────────────────────────────────────────
      this._T = 0;
      this._scrollProg = 0;
      this._lastScrollTop = 0;

      // ── Bubbles ────────────────────────────────────────────────
      this._bubbles = [];

      // ── Image assets ───────────────────────────────────────────
      this._imgReady = false;
      this._octImg = new Image();
      this._octImg.onload = () => { this._imgReady = true; };
      this._octImg.src = _scriptDir + 'octopus-head.png';

      // ── Animation frame ────────────────────────────────────────
      this._rafId = null;

      // ── DOM References ────────────────────────────────────────
      this._canvases = [];
      this._section1 = null;
      this._section2 = null;
      this._pbar = null;
      this._heroSubheading = null;
      this._section2Content = null;
    }

    connectedCallback() {
      _ensureDependencies();
      this._build();
      this._setupCanvases();
      this._bindEvents();
      this._resize();
      this._render();
    }

    disconnectedCallback() {
      this._unbindEvents();
      if (this._rafId) cancelAnimationFrame(this._rafId);
    }

    // ── DOM Building (Single Responsibility: Structure only) ──────
    _build() {
      this.innerHTML = this._buildHTML();
      this._cacheDOM();
    }

    _buildHTML() {
      return '<div class="oct-background"></div>'
        + '<div class="oct-progress"></div>'
        + '<div class="oct-canvas-container"><canvas></canvas></div>';
    }

    _cacheDOM() {
      const canvases = this.querySelectorAll('canvas');
      canvases.forEach((canvas) => {
        this._canvases.push({
          element: canvas,
          ctx: canvas.getContext('2d'),
        });
      });
      this._pbar = this.querySelector('.oct-progress');
    }

    _setupCanvases() {
      const rect = this.getBoundingClientRect();
      this._W = rect.width || window.innerWidth;
      this._H = rect.height || window.innerHeight;
      this._cx = this._W * 0.5;
      this._cy = this._H * 0.5;
      this._canvases.forEach((canvas) => {
        canvas.element.width = this._W;
        canvas.element.height = this._H;
      });
    }

    // ── Event Handling ─────────────────────────────────────────────
    _bindEvents() {
      this._onScrollBound = () => this._onScroll();
      this._onResizeBound = () => this._resize();
      window.addEventListener('scroll', this._onScrollBound, { passive: true });
      window.addEventListener('resize', this._onResizeBound);
    }

    _unbindEvents() {
      window.removeEventListener('scroll', this._onScrollBound);
      window.removeEventListener('resize', this._onResizeBound);
    }

    _onScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      this._scrollProg = docHeight > 0 ? scrollTop / docHeight : 0;
      this._lastScrollTop = scrollTop;

      this._pbar.style.width = (this._scrollProg * 100) + '%';
    }

    _resize() {
      this._setupCanvases();
      this._resetBubbles();
    }

    // ── Bubble System ──────────────────────────────────────────────
    _resetBubbles() {
      this._bubbles = [];
      for (let i = 0; i < 28; i++) {
        this._bubbles.push(this._newBubble(true));
      }
    }

    _newBubble(init) {
      return {
        x: this._cx + (Math.random() - 0.5) * this._W * 1.1,
        y: init ? Math.random() * this._H : this._H + 12,
        r: Math.random() * 2.2 + 0.4,
        vy: Math.random() * 0.5 + 0.2,
        vx: (Math.random() - 0.5) * 0.22,
        alpha: Math.random() * 0.1 + 0.03,
      };
    }

    _drawBubbles(ctx) {
      for (let i = 0; i < this._bubbles.length; i++) {
        const b = this._bubbles[i];
        b.y -= b.vy;
        b.x += b.vx;

        if (b.y < -8) {
          const nb = this._newBubble(false);
          b.x = nb.x;
          b.y = nb.y;
          b.r = nb.r;
          b.vy = nb.vy;
          b.vx = nb.vx;
          b.alpha = nb.alpha;
        }

        ctx.save();
        ctx.globalAlpha = b.alpha;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = COLORS.BUBBLE_STROKE;
        ctx.lineWidth = 0.6;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(b.x - b.r * 0.28, b.y - b.r * 0.28, b.r * 0.22, 0, Math.PI * 2);
        ctx.fillStyle = COLORS.BUBBLE_FILL;
        ctx.fill();
        ctx.restore();
      }
    }

    // ── Canvas Rendering ──────────────────────────────────────────
    _renderCanvasPane(ctx, options = {}) {
      const { drawOctopus = false, offsetX = 0, offsetY = 0, rotation = 0, scrollProg = 0 } = options;

      // Clear canvas (transparent background)
      ctx.clearRect(0, 0, this._W, this._H);
      this._drawBubbles(ctx);

      if (drawOctopus) {
        this._drawOctopus(ctx, offsetX, offsetY, rotation, scrollProg);
      }
    }

    // ── Octopus Animation ──────────────────────────────────────────
    _cubicBez(p0, p1, p2, p3, t) {
      const m = 1 - t;
      return {
        x: m * m * m * p0.x + 3 * m * m * t * p1.x + 3 * m * t * t * p2.x + t * t * t * p3.x,
        y: m * m * m * p0.y + 3 * m * m * t * p1.y + 3 * m * t * t * p2.y + t * t * t * p3.y,
      };
    }

    _tentacleEdges(p0, cp1, cp2, pe, baseHW) {
      const L = [];
      const R = [];
      const EPS = 0.001;

      for (let i = 0; i <= CONFIG.CANVAS.STEPS_PER_TENTACLE; i++) {
        const s = i / CONFIG.CANVAS.STEPS_PER_TENTACLE;
        const pt = this._cubicBez(p0, cp1, cp2, pe, s);
        const pt2 = this._cubicBez(p0, cp1, cp2, pe, Math.min(s + EPS, 1));

        const tx = pt2.x - pt.x;
        const ty = pt2.y - pt.y;
        const tl = Math.sqrt(tx * tx + ty * ty) || 1;
        const nx = -ty / tl;
        const ny = tx / tl;
        const hw = baseHW * Math.pow(1 - s, 0.72);

        L.push({ x: pt.x + nx * hw, y: pt.y + ny * hw, pt, nx, ny, hw });
        R.push({ x: pt.x - nx * hw, y: pt.y - ny * hw });
      }

      return { L, R };
    }

    _drawTentacles(ctx, tentacleAngles, offsetX, offsetY, scrollProg) {
      tentacleAngles.forEach((tentAngle, idx) => {
        const phase = idx / CONFIG.TENTACLES.COUNT * Math.PI * 2;
        const bodyR = CONFIG.TENTACLES.BODY_RADIUS;
        const maxLen = Math.min(this._W, this._H) * CONFIG.TENTACLES.MAX_LENGTH_RATIO * CONFIG.TENTACLES.LENGTH_MULTIPLIER;
        const ext = CONFIG.TENTACLES.EXTENSION_MIN + scrollProg * CONFIG.TENTACLES.EXTENSION_SCROLL_MULT;
        const reach = bodyR + (maxLen - bodyR) * (CONFIG.TENTACLES.REACH_RATIO_MIN + CONFIG.TENTACLES.REACH_RATIO_MAX * ext);

        const waveA = CONFIG.TENTACLES.BASE_AMPLITUDE * (1 - ext * CONFIG.TENTACLES.AMPLITUDE_REDUCTION);
        const waveV = Math.sin(CONFIG.TENTACLES.WAVE_FREQUENCY * this._T - CONFIG.TENTACLES.WAVE_PHASE_OFFSET * phase) * waveA * (CONFIG.TENTACLES.WAVE_AMPLITUDE_MULT + CONFIG.TENTACLES.EXTENSION_AMPLITUDE_MULT * ext);

        const perpX = -Math.sin(tentAngle);
        const perpY = Math.cos(tentAngle);

        const bx = this._cx + offsetX + Math.cos(tentAngle) * bodyR;
        const by = this._cy + offsetY + Math.sin(tentAngle) * bodyR;
        const ex = this._cx + offsetX + Math.cos(tentAngle) * reach + perpX * waveV * 0.12;
        const ey = this._cy + offsetY + Math.sin(tentAngle) * reach + perpY * waveV * 0.12;

        const bendAmp = Math.sin(CONFIG.TENTACLES.BEND_FREQUENCY * this._T + phase * 1.7) * waveA * CONFIG.TENTACLES.BEND_AMPLITUDE_MULT;
        const cp1 = {
          x: this._cx + offsetX + Math.cos(tentAngle) * reach * 0.32 + perpX * waveV,
          y: this._cy + offsetY + Math.sin(tentAngle) * reach * 0.32 + perpY * waveV,
        };
        const cp2 = {
          x: this._cx + offsetX + Math.cos(tentAngle) * reach * 0.68 + perpX * bendAmp * 0.9,
          y: this._cy + offsetY + Math.sin(tentAngle) * reach * 0.68 + perpY * bendAmp * 0.9,
        };

        const p0 = { x: bx, y: by };
        const pe = { x: ex, y: ey };
        const edges = this._tentacleEdges(p0, cp1, cp2, pe, 9);
        const { L, R } = edges;

        ctx.save();

        // ── Tentacle Glow Effect ────────────────────────────────
        // Create a glowing halo around extended tentacles
        if (ext > 0.15) {
          const glowGrad = ctx.createLinearGradient(bx, by, ex, ey);
          const glowAlpha = ext * 0.3;
          glowGrad.addColorStop(0, `rgba(45,212,191,${glowAlpha * 0.4})`);
          glowGrad.addColorStop(0.5, `rgba(45,212,191,${glowAlpha * 0.2})`);
          glowGrad.addColorStop(1, 'rgba(45,212,191,0)');

          ctx.beginPath();
          ctx.moveTo(L[0].x, L[0].y);
          for (let j = 1; j < L.length; j++) ctx.lineTo(L[j].x, L[j].y);
          for (let j = R.length - 1; j >= 0; j--) ctx.lineTo(R[j].x, R[j].y);
          ctx.closePath();
          ctx.fillStyle = glowGrad;
          ctx.fill();
        }

        // Tentacle body gradient
        const grad = ctx.createLinearGradient(bx, by, ex, ey);
        COLORS.TENTACLE_GRADIENT.forEach((color, idx) => {
          grad.addColorStop(idx / (COLORS.TENTACLE_GRADIENT.length - 1), color);
        });

        ctx.beginPath();
        ctx.moveTo(L[0].x, L[0].y);
        for (let j = 1; j < L.length; j++) ctx.lineTo(L[j].x, L[j].y);
        for (let j = R.length - 1; j >= 0; j--) ctx.lineTo(R[j].x, R[j].y);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();

        // Left edge highlight
        ctx.beginPath();
        ctx.moveTo(L[0].x, L[0].y);
        for (let j = 1; j < L.length; j++) ctx.lineTo(L[j].x, L[j].y);
        ctx.strokeStyle = COLORS.TENTACLE_STROKE_LEFT;
        ctx.lineWidth = COLORS.TENTACLE_STROKE_WIDTH_LEFT;
        ctx.stroke();

        // Right edge shadow
        ctx.beginPath();
        ctx.moveTo(R[0].x, R[0].y);
        for (let j = 1; j < R.length; j++) ctx.lineTo(R[j].x, R[j].y);
        ctx.strokeStyle = COLORS.TENTACLE_STROKE_RIGHT;
        ctx.lineWidth = COLORS.TENTACLE_STROKE_WIDTH_RIGHT;
        ctx.stroke();

        ctx.restore();

        // ── Suction Cup Details ──────────────────────────────────
        // Scatter effect (when extended)
        if (ext > 0.05) {
          ctx.save();
          const stepsPerTentacle = CONFIG.CANVAS.STEPS_PER_TENTACLE;
          for (let i = 3; i < stepsPerTentacle - 4; i += 7) {
            const s = i / stepsPerTentacle;
            const pt = this._cubicBez(p0, cp1, cp2, pe, s);
            const hw = L[i] ? L[i].hw : 0;
            if (hw < 1.5) continue;
            const scatter = Math.sin(i * 3.7 + phase * 2.3) * hw * 0.45;
            ctx.beginPath();
            ctx.arc(pt.x + L[i].nx * scatter, pt.y + L[i].ny * scatter, (1 - s) * 1.6 + 0.3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(45,212,191,${(0.35 * (1 - s) * ext).toFixed(2)})`;
            ctx.fill();
          }
          ctx.restore();
        }

        // Additional suction cup rings (when well extended)
        if (ext > 0.08) {
          ctx.save();
          ctx.globalAlpha = 0.7 * ext;
          const stepsPerTentacle = CONFIG.CANVAS.STEPS_PER_TENTACLE;
          for (let i = 4; i < stepsPerTentacle - 2; i += 5) {
            const pt = L[i];
            const r = pt.hw * 0.48;
            if (r < 0.6) continue;
            const sx = pt.pt.x - pt.nx * pt.hw * 0.6;
            const sy = pt.pt.y - pt.ny * pt.hw * 0.6;
            ctx.beginPath();
            ctx.arc(sx, sy, r, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(45,212,191,0.38)';
            ctx.lineWidth = 0.7;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(sx, sy, r * 0.52, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(5,28,22,0.92)';
            ctx.fill();
          }
          ctx.restore();
        }
      });
    }

    _drawOctopus(ctx, offsetX, offsetY, rotation, scrollProg) {
      if (!this._imgReady) return;

      const T = this._T;
      const baseOctopusAngle = 0;
      const angle = baseOctopusAngle + rotation;

      // Tentacles point backwards as user scrolls down
      const backwardRotation = scrollProg * Math.PI;

      // Draw 8 tentacles evenly spread on all sides (360°)
      const tentacleAngles = [];
      for (let ti = 0; ti < CONFIG.TENTACLES.COUNT; ti++) {
        tentacleAngles.push(angle + backwardRotation + ti * Math.PI / 4);
      }

      this._drawTentacles(ctx, tentacleAngles, offsetX, offsetY, scrollProg);

      // Draw octopus body (PNG)
      const dispSize = Math.min(this._W, this._H) * CONFIG.OCTOPUS_BODY.SIZE_RATIO;
      const half = dispSize / 2;
      const bob = Math.sin(T * CONFIG.OCTOPUS_BODY.BOB_FREQ1) * CONFIG.OCTOPUS_BODY.BOB_AMP1 + Math.sin(T * CONFIG.OCTOPUS_BODY.BOB_FREQ2) * CONFIG.OCTOPUS_BODY.BOB_AMP2;
      const driftX = Math.sin(T * CONFIG.OCTOPUS_BODY.DRIFT_X_FREQ1) * CONFIG.OCTOPUS_BODY.DRIFT_X_AMP1 + Math.sin(T * CONFIG.OCTOPUS_BODY.DRIFT_X_FREQ2) * CONFIG.OCTOPUS_BODY.DRIFT_X_AMP2;
      const driftY = Math.sin(T * CONFIG.OCTOPUS_BODY.DRIFT_Y_FREQ1) * CONFIG.OCTOPUS_BODY.DRIFT_Y_AMP1 + Math.cos(T * CONFIG.OCTOPUS_BODY.DRIFT_Y_FREQ2) * CONFIG.OCTOPUS_BODY.DRIFT_Y_AMP2;
      const finalS = 1 + scrollProg * CONFIG.OCTOPUS_BODY.SCALE_SCROLL_MULT;

      ctx.save();
      ctx.translate(this._cx + offsetX + driftX, this._cy + offsetY + bob + driftY);
      ctx.rotate(rotation);
      ctx.scale(finalS, finalS);

      // Draw glow
      const glowRadius = half * CONFIG.OCTOPUS_BODY.GLOW_RADIUS_BASE + scrollProg * CONFIG.OCTOPUS_BODY.GLOW_SCROLL_MULT;
      const grd = ctx.createRadialGradient(0, 0, half * 0.1, 0, 0, glowRadius);
      grd.addColorStop(0, COLORS.GLOW);
      grd.addColorStop(0.5, COLORS.GLOW_MID);
      grd.addColorStop(1, COLORS.GLOW_END);
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(0, 0, glowRadius * 1.4, 0, Math.PI * 2);
      ctx.fill();

      // Draw body image
      ctx.drawImage(this._octImg, -half, -half, dispSize, dispSize);
      ctx.restore();
    }

    // ── Main Render Loop ───────────────────────────────────────────
    _render() {
      this._T += 0.016;

      // Scroll tracking
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollProg = Math.max(0, Math.min(1, scrollTop / this._H));

      // Organic non-linear movement driven by scroll
      const pulse1 = Math.sin(scrollProg * CONFIG.ANIMATION.PULSE1_FREQ) * this._H * CONFIG.ANIMATION.PULSE1_AMP;
      const pulse2 = Math.cos(scrollProg * CONFIG.ANIMATION.PULSE2_FREQ) * this._H * CONFIG.ANIMATION.PULSE2_AMP;
      const drift1 = Math.sin(scrollProg * CONFIG.ANIMATION.DRIFT1_FREQ) * this._W * CONFIG.ANIMATION.DRIFT1_AMP;
      const drift2 = Math.cos(scrollProg * CONFIG.ANIMATION.DRIFT2_FREQ) * this._W * CONFIG.ANIMATION.DRIFT2_AMP;

      const movementIntensity = Math.abs(pulse1) + Math.abs(pulse2) + Math.abs(drift1) + Math.abs(drift2);
      const scrollProgFinal = CONFIG.ANIMATION.BASE_SCROLL_PROG + scrollProg * CONFIG.ANIMATION.BASE_SCROLL_MULT
        + movementIntensity * CONFIG.ANIMATION.MOVEMENT_RESPONSE;

      // ── Curved scroll path: down-left arc ─────────────────────────
      // X: easeInCubic  → slow at top, accelerates leftward as scroll deepens
      // Y: easeOutCubic → fast at top, decelerates as it sinks down
      // The phase difference between the two curves traces a natural arc
      const t = scrollProg;
      const pathX = -(t * t * t) * this._W * CONFIG.SCROLL_PATH.MAX_X;
      const pathY = (1 - Math.pow(1 - t, 3)) * this._H * CONFIG.SCROLL_PATH.MAX_Y;

      // Single canvas — draws bubbles + octopus
      this._renderCanvasPane(this._canvases[0].ctx, {
        drawOctopus: true,
        offsetX: drift1 + drift2 + pathX,
        offsetY: pulse1 + pulse2 + pathY,
        rotation: 0,
        scrollProg: scrollProgFinal,
      });

      // Schedule next frame
      const self = this;
      this._rafId = requestAnimationFrame(() => { self._render(); });
    }
  }

  if (!customElements.get('octopus-hero-section')) {
    customElements.define('octopus-hero-section', OctopusHeroSection);
  }
})();
