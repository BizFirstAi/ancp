/**
 * octopus-minimal.js — Minimal Octopus Canvas Component
 * Extracts pure canvas rendering from octopus-03-hero with full styling
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
      SIZE_RATIO: 0.15,
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
  };

  class OctopusMinimal extends HTMLElement {
    constructor() {
      super();
      this.canvas = null;
      this.ctx = null;
      this.animationId = null;
      this.octImg = null;
      this.imgReady = false;
      this.T = 0;
      this.W = 0;
      this.H = 0;
      this.cx = 0;
      this.cy = 0;
    }

    connectedCallback() {
      this.style.display = 'block';
      this.style.width = '100%';
      this.style.height = '100%';
      this.style.background = CONFIG.CANVAS.BACKGROUND;

      this.canvas = document.createElement('canvas');
      this.canvas.style.width = '100%';
      this.canvas.style.height = '100%';
      this.canvas.style.display = 'block';
      this.appendChild(this.canvas);

      this.ctx = this.canvas.getContext('2d');
      this.resizeCanvas();

      window.addEventListener('resize', () => this.resizeCanvas());
      this.loadImage();
      this.animate();
    }

    disconnectedCallback() {
      if (this.animationId) cancelAnimationFrame(this.animationId);
    }

    resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      const rect = this.getBoundingClientRect();
      this.canvas.width = rect.width * dpr;
      this.canvas.height = rect.height * dpr;
      this.ctx.scale(dpr, dpr);
      this.W = rect.width;
      this.H = rect.height;
      this.cx = this.W / 2;
      this.cy = this.H / 2;
    }

    loadImage() {
      this.octImg = new Image();
      this.octImg.onload = () => { this.imgReady = true; };
      this.octImg.onerror = () => console.error('Failed to load octopus image');
      this.octImg.src = '../octopus-03-hero/octopus-head.png';
    }

    animate = () => {
      this.T += 0.016;
      this.draw();
      this.animationId = requestAnimationFrame(this.animate);
    }

    draw() {
      this.ctx.clearRect(0, 0, this.W, this.H);

      const scrollProg = 0; // Always show extended tentacles in hero section
      const ext = CONFIG.TENTACLES.EXTENSION_MIN + 0.3; // Fixed extension for nice display

      this.drawTentacles(ext);
      this.drawBody(ext);
    }

    drawTentacles(ext) {
      const tentacleAngles = [];
      for (let ti = 0; ti < CONFIG.TENTACLES.COUNT; ti++) {
        tentacleAngles.push(ti * Math.PI / 4);
      }

      tentacleAngles.forEach((tentAngle, idx) => {
        const phase = idx / CONFIG.TENTACLES.COUNT * Math.PI * 2;
        const bodyR = CONFIG.TENTACLES.BODY_RADIUS;
        const maxLen = Math.min(this.W, this.H) * CONFIG.TENTACLES.MAX_LENGTH_RATIO * CONFIG.TENTACLES.LENGTH_MULTIPLIER;
        const reach = bodyR + (maxLen - bodyR) * (CONFIG.TENTACLES.REACH_RATIO_MIN + CONFIG.TENTACLES.REACH_RATIO_MAX * ext);

        const waveA = CONFIG.TENTACLES.BASE_AMPLITUDE * (1 - ext * CONFIG.TENTACLES.AMPLITUDE_REDUCTION);
        const waveV = Math.sin(CONFIG.TENTACLES.WAVE_FREQUENCY * this.T - CONFIG.TENTACLES.WAVE_PHASE_OFFSET * phase) * waveA * (CONFIG.TENTACLES.WAVE_AMPLITUDE_MULT + CONFIG.TENTACLES.EXTENSION_AMPLITUDE_MULT * ext);

        const perpX = -Math.sin(tentAngle);
        const perpY = Math.cos(tentAngle);

        const bx = this.cx + Math.cos(tentAngle) * bodyR;
        const by = this.cy + Math.sin(tentAngle) * bodyR;
        const ex = this.cx + Math.cos(tentAngle) * reach + perpX * waveV * 0.12;
        const ey = this.cy + Math.sin(tentAngle) * reach + perpY * waveV * 0.12;

        const bendAmp = Math.sin(CONFIG.TENTACLES.BEND_FREQUENCY * this.T + phase * 1.7) * waveA * CONFIG.TENTACLES.BEND_AMPLITUDE_MULT;
        const cp1 = {
          x: this.cx + Math.cos(tentAngle) * reach * 0.32 + perpX * waveV,
          y: this.cy + Math.sin(tentAngle) * reach * 0.32 + perpY * waveV,
        };
        const cp2 = {
          x: this.cx + Math.cos(tentAngle) * reach * 0.68 + perpX * bendAmp * 0.9,
          y: this.cy + Math.sin(tentAngle) * reach * 0.68 + perpY * bendAmp * 0.9,
        };

        const p0 = { x: bx, y: by };
        const pe = { x: ex, y: ey };
        const edges = this.tentacleEdges(p0, cp1, cp2, pe, 9);
        const { L, R } = edges;

        this.ctx.save();

        // Tentacle Glow
        if (ext > 0.15) {
          const glowGrad = this.ctx.createLinearGradient(bx, by, ex, ey);
          const glowAlpha = ext * 0.3;
          glowGrad.addColorStop(0, `rgba(45,212,191,${glowAlpha * 0.4})`);
          glowGrad.addColorStop(0.5, `rgba(45,212,191,${glowAlpha * 0.2})`);
          glowGrad.addColorStop(1, 'rgba(45,212,191,0)');

          this.ctx.beginPath();
          this.ctx.moveTo(L[0].x, L[0].y);
          for (let j = 1; j < L.length; j++) this.ctx.lineTo(L[j].x, L[j].y);
          for (let j = R.length - 1; j >= 0; j--) this.ctx.lineTo(R[j].x, R[j].y);
          this.ctx.closePath();
          this.ctx.fillStyle = glowGrad;
          this.ctx.fill();
        }

        // Tentacle gradient
        const grad = this.ctx.createLinearGradient(bx, by, ex, ey);
        COLORS.TENTACLE_GRADIENT.forEach((color, idx) => {
          grad.addColorStop(idx / (COLORS.TENTACLE_GRADIENT.length - 1), color);
        });

        this.ctx.beginPath();
        this.ctx.moveTo(L[0].x, L[0].y);
        for (let j = 1; j < L.length; j++) this.ctx.lineTo(L[j].x, L[j].y);
        for (let j = R.length - 1; j >= 0; j--) this.ctx.lineTo(R[j].x, R[j].y);
        this.ctx.closePath();
        this.ctx.fillStyle = grad;
        this.ctx.fill();

        // Left edge highlight
        this.ctx.beginPath();
        this.ctx.moveTo(L[0].x, L[0].y);
        for (let j = 1; j < L.length; j++) this.ctx.lineTo(L[j].x, L[j].y);
        this.ctx.strokeStyle = COLORS.TENTACLE_STROKE_LEFT;
        this.ctx.lineWidth = COLORS.TENTACLE_STROKE_WIDTH_LEFT;
        this.ctx.stroke();

        // Right edge shadow
        this.ctx.beginPath();
        this.ctx.moveTo(R[0].x, R[0].y);
        for (let j = 1; j < R.length; j++) this.ctx.lineTo(R[j].x, R[j].y);
        this.ctx.strokeStyle = COLORS.TENTACLE_STROKE_RIGHT;
        this.ctx.lineWidth = COLORS.TENTACLE_STROKE_WIDTH_RIGHT;
        this.ctx.stroke();

        this.ctx.restore();

        // Suction cup details
        if (ext > 0.05) {
          this.ctx.save();
          const stepsPerTentacle = CONFIG.CANVAS.STEPS_PER_TENTACLE;
          for (let i = 3; i < stepsPerTentacle - 4; i += 7) {
            const s = i / stepsPerTentacle;
            const pt = this.cubicBez(p0, cp1, cp2, pe, s);
            const hw = L[i] ? L[i].hw : 0;
            if (hw < 1.5) continue;
            const scatter = Math.sin(i * 3.7 + phase * 2.3) * hw * 0.45;
            this.ctx.beginPath();
            this.ctx.arc(pt.x + L[i].nx * scatter, pt.y + L[i].ny * scatter, (1 - s) * 1.6 + 0.3, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(45,212,191,${(0.35 * (1 - s) * ext).toFixed(2)})`;
            this.ctx.fill();
          }
          this.ctx.restore();
        }

        // Suction cup rings
        if (ext > 0.08) {
          this.ctx.save();
          this.ctx.globalAlpha = 0.7 * ext;
          const stepsPerTentacle = CONFIG.CANVAS.STEPS_PER_TENTACLE;
          for (let i = 4; i < stepsPerTentacle - 2; i += 5) {
            const pt = L[i];
            const r = pt.hw * 0.48;
            if (r < 0.6) continue;
            const sx = pt.pt.x - pt.nx * pt.hw * 0.6;
            const sy = pt.pt.y - pt.ny * pt.hw * 0.6;
            this.ctx.beginPath();
            this.ctx.arc(sx, sy, r, 0, Math.PI * 2);
            this.ctx.strokeStyle = 'rgba(45,212,191,0.38)';
            this.ctx.lineWidth = 0.7;
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.arc(sx, sy, r * 0.52, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(5,28,22,0.92)';
            this.ctx.fill();
          }
          this.ctx.restore();
        }
      });
    }

    drawBody(ext) {
      if (!this.imgReady) return;

      const dispSize = Math.min(this.W, this.H) * CONFIG.OCTOPUS_BODY.SIZE_RATIO;
      const half = dispSize / 2;
      const bob = Math.sin(this.T * CONFIG.OCTOPUS_BODY.BOB_FREQ1) * CONFIG.OCTOPUS_BODY.BOB_AMP1 + Math.sin(this.T * CONFIG.OCTOPUS_BODY.BOB_FREQ2) * CONFIG.OCTOPUS_BODY.BOB_AMP2;
      const driftX = Math.sin(this.T * CONFIG.OCTOPUS_BODY.DRIFT_X_FREQ1) * CONFIG.OCTOPUS_BODY.DRIFT_X_AMP1 + Math.sin(this.T * CONFIG.OCTOPUS_BODY.DRIFT_X_FREQ2) * CONFIG.OCTOPUS_BODY.DRIFT_X_AMP2;
      const driftY = Math.sin(this.T * CONFIG.OCTOPUS_BODY.DRIFT_Y_FREQ1) * CONFIG.OCTOPUS_BODY.DRIFT_Y_AMP1 + Math.cos(this.T * CONFIG.OCTOPUS_BODY.DRIFT_Y_FREQ2) * CONFIG.OCTOPUS_BODY.DRIFT_Y_AMP2;
      const finalS = 1 + 0 * CONFIG.OCTOPUS_BODY.SCALE_SCROLL_MULT;

      this.ctx.save();
      this.ctx.translate(this.cx + driftX, this.cy + bob + driftY);
      this.ctx.scale(finalS, finalS);

      // Glow
      const glowRadius = half * CONFIG.OCTOPUS_BODY.GLOW_RADIUS_BASE + 0 * CONFIG.OCTOPUS_BODY.GLOW_SCROLL_MULT;
      const grd = this.ctx.createRadialGradient(0, 0, half * 0.1, 0, 0, glowRadius);
      grd.addColorStop(0, COLORS.GLOW);
      grd.addColorStop(0.5, COLORS.GLOW_MID);
      grd.addColorStop(1, COLORS.GLOW_END);
      this.ctx.fillStyle = grd;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, glowRadius * 1.4, 0, Math.PI * 2);
      this.ctx.fill();

      // Body image
      this.ctx.drawImage(this.octImg, -half, -half, dispSize, dispSize);
      this.ctx.restore();
    }

    // Helper methods
    cubicBez(p0, p1, p2, p3, t) {
      const m = 1 - t;
      return {
        x: m * m * m * p0.x + 3 * m * m * t * p1.x + 3 * m * t * t * p2.x + t * t * t * p3.x,
        y: m * m * m * p0.y + 3 * m * m * t * p1.y + 3 * m * t * t * p2.y + t * t * t * p3.y,
      };
    }

    tentacleEdges(p0, cp1, cp2, pe, baseHW) {
      const L = [];
      const R = [];
      const EPS = 0.001;

      for (let i = 0; i <= CONFIG.CANVAS.STEPS_PER_TENTACLE; i++) {
        const s = i / CONFIG.CANVAS.STEPS_PER_TENTACLE;
        const pt = this.cubicBez(p0, cp1, cp2, pe, s);
        const pt2 = this.cubicBez(p0, cp1, cp2, pe, Math.min(s + EPS, 1));

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
  }

  customElements.define('octopus-minimal', OctopusMinimal);
})();
