/**
 * slider-content.js — TextSlider Web Component (3D Carousel)
 * ─────────────────────────────────────────────────────────────────
 * Shows prev / center / next slides simultaneously.
 * Flanking slides are rotated 45° on the Y-axis (depth perspective).
 * Completely decoupled — no dependency on octopus or any other component.
 *
 * USAGE:
 *   <text-slider scroll-driver="myScrollDriverId">
 *     <div class="ts-slide">
 *       <span class="ts-label">Category</span>
 *       <h3 class="ts-title">Slide <em>Title</em></h3>
 *       <p class="ts-desc">Optional description.</p>
 *     </div>
 *     ...more .ts-slide divs...
 *   </text-slider>
 *
 * ATTRIBUTES:
 *   scroll-driver="elementId"  — enables scroll-driven mode
 *   auto-interval="3000"       — ms between slides in auto mode (default 3000)
 *   mode="scroll|auto"         — explicit override; scroll-driver attr implies scroll
 */
(function () {
  'use strict';

  class TextSlider extends HTMLElement {
    constructor() {
      super();
      this._slides    = [];
      this._dots      = [];
      this._current   = 0;
      this._progressBar  = null;
      this._dotsWrap     = null;
      this._track        = null;
      this._autoTimer    = null;
      this._scrollHandler = null;
    }

    connectedCallback() {
      this._collectSlides();
      this._buildChrome();
      this._buildDots();
      this._applySlideClasses();

      const mode = this._resolveMode();
      if (mode === 'scroll') {
        this._startScrollMode();
      } else {
        this._startAutoMode();
      }
    }

    disconnectedCallback() {
      if (this._scrollHandler) window.removeEventListener('scroll', this._scrollHandler);
      if (this._autoTimer)    clearInterval(this._autoTimer);
    }

    // ── Setup ──────────────────────────────────────────────────────

    _resolveMode() {
      if (this.hasAttribute('scroll-driver')) return 'scroll';
      return this.getAttribute('mode') === 'scroll' ? 'scroll' : 'auto';
    }

    _collectSlides() {
      this._slides = Array.from(this.querySelectorAll('.ts-slide'));
    }

    _buildChrome() {
      // Wrap slides in a perspective track
      this._track = document.createElement('div');
      this._track.className = 'ts-track';
      this._slides.forEach(s => this._track.appendChild(s));
      this.appendChild(this._track);

      // Progress bar
      this._progressBar = document.createElement('div');
      this._progressBar.className = 'ts-progress';
      this.insertBefore(this._progressBar, this.firstChild);

      // Dots
      this._dotsWrap = document.createElement('div');
      this._dotsWrap.className = 'ts-dots';
      this.appendChild(this._dotsWrap);
    }

    _buildDots() {
      this._slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'ts-dot' + (i === 0 ? ' ts-dot--active' : '');
        dot.addEventListener('click', () => this._goTo(i));
        this._dotsWrap.appendChild(dot);
      });
      this._dots = Array.from(this._dotsWrap.querySelectorAll('.ts-dot'));
    }

    // ── Slide state ────────────────────────────────────────────────

    _applySlideClasses() {
      const total = this._slides.length;
      const prev  = (this._current - 1 + total) % total;
      const next  = (this._current + 1) % total;

      this._slides.forEach((slide, i) => {
        slide.classList.remove('ts-slide--prev', 'ts-slide--active', 'ts-slide--next');
        if      (i === this._current) slide.classList.add('ts-slide--active');
        else if (i === prev)          slide.classList.add('ts-slide--prev');
        else if (i === next)          slide.classList.add('ts-slide--next');
      });
    }

    _goTo(index) {
      if (index === this._current) return;
      this._current = index;
      this._applySlideClasses();
      this._dots.forEach((d, i) => d.classList.toggle('ts-dot--active', i === this._current));
    }

    _updateProgress(ratio) {
      if (this._progressBar) {
        this._progressBar.style.width = (ratio * 100) + '%';
      }
    }

    // ── Scroll mode ────────────────────────────────────────────────

    _startScrollMode() {
      const driverId = this.getAttribute('scroll-driver');
      const driver   = driverId ? document.getElementById(driverId) : null;

      if (!driver) {
        console.warn('[text-slider] scroll-driver element not found:', driverId);
        this._startAutoMode();
        return;
      }

      const total = this._slides.length;
      this._scrollHandler = () => {
        const rect     = driver.getBoundingClientRect();
        const scrolled = Math.max(0, -rect.top);
        const maxScroll = driver.offsetHeight - window.innerHeight;
        const progress  = Math.min(1, scrolled / Math.max(1, maxScroll));
        const index     = Math.min(total - 1, Math.floor(progress * total));

        this._updateProgress(progress);
        this._goTo(index);
      };

      window.addEventListener('scroll', this._scrollHandler, { passive: true });
      this._scrollHandler();
    }

    // ── Auto mode ──────────────────────────────────────────────────

    _startAutoMode() {
      const interval = parseInt(this.getAttribute('auto-interval') || '3000', 10);
      const total    = this._slides.length;

      this._autoTimer = setInterval(() => {
        const next = (this._current + 1) % total;
        this._updateProgress((next + 1) / total);
        this._goTo(next);
      }, interval);
    }
  }

  if (!customElements.get('text-slider')) {
    customElements.define('text-slider', TextSlider);
  }
})();
