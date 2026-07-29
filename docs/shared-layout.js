/**
 * Shared Layout Injector — ANCP by BizFirstAi
 * Dynamically injects header and footer into all ANCP pages.
 */

const SHARED_HEADER = `
<style>
  .b-mobile-menu { display: flex; flex-direction: column; overflow: hidden; }
  .b-mobile-nav { overflow-y: auto; flex: 1; }
</style>
<nav class="b-navbar">
  <div class="b-navbar-container">

    <a href="https://bizfirstai.com" class="b-navbar-logo" target="_blank" rel="noopener">
      <img src="https://bizfirstai.com/website/assets/Logo/logo.png" alt="ANCP by BizFirstAi" class="b-logo-image">
    </a>

    <ul class="b-navbar-menu">

      <!-- Home -->
      <li><a href="./index.html" class="b-nav-link">Home</a></li>

      <!-- Features -->
      <li><a href="./features.html" class="b-nav-link">Features</a></li>

      <!-- Getting Started (dropdown — items horizontal) -->
      <li class="b-dropdown">
        <a href="./ANCP-gettingStarted.html" class="b-nav-link b-dropdown-toggle" target="_blank" rel="noopener">
          Getting Started
        </a>
        <div class="b-mega-panel">
          <div class="b-mega-panel__inner" style="grid-template-columns: repeat(4, auto); justify-content: start; gap: var(--b-space-4);">

            <div class="b-mega-col">
              <div class="b-mega-item">
                <a href="./ANCP-gettingStarted.html" class="b-mega-item__name" target="_blank" rel="noopener">Getting Started Guide</a>
                <span class="b-mega-item__desc">Installation, React hooks &amp; C# node handlers</span>
              </div>
            </div>

            <div class="b-mega-col">
              <div class="b-mega-item">
                <a href="./docs.html" class="b-mega-item__name">Documentation</a>
                <span class="b-mega-item__desc">Full API reference &amp; messaging patterns</span>
              </div>
            </div>

            <div class="b-mega-col">
              <div class="b-mega-item">
                <a href="./changelog.html" class="b-mega-item__name">Changelog</a>
                <span class="b-mega-item__desc">Release notes &amp; version history</span>
              </div>
            </div>

            <div class="b-mega-col">
              <div class="b-mega-item">
                <a href="https://community.bizfirstai.com/tag/ancp" class="b-mega-item__name" target="_blank" rel="noopener">Community</a>
                <span class="b-mega-item__desc">Ask questions &amp; discuss ANCP</span>
              </div>
            </div>

          </div>
        </div>
      </li>

      <!-- Architecture (dropdown — items horizontal) -->
      <li class="b-dropdown">
        <a href="./ANCP-architecture.html" class="b-nav-link b-dropdown-toggle">
          Architecture
        </a>
        <div class="b-mega-panel">
          <div class="b-mega-panel__inner" style="grid-template-columns: repeat(3, auto); justify-content: start; gap: var(--b-space-4);">

            <div class="b-mega-col">
              <div class="b-mega-item">
                <a href="./ANCP-architecture.html" class="b-mega-item__name">ANCP Architecture</a>
                <span class="b-mega-item__desc">The Intelligent Neural Mesh — full architecture PDF</span>
              </div>
            </div>

            <div class="b-mega-col">
              <div class="b-mega-item">
                <a href="./ANCP-Specification.html" class="b-mega-item__name" target="_blank" rel="noopener">Specification</a>
                <span class="b-mega-item__desc">Protocol spec v1.0.2 — envelope schema &amp; transport rules</span>
              </div>
            </div>

            <div class="b-mega-col">
              <div class="b-mega-item">
                <a href="./a2a-vs-ancp.html" class="b-mega-item__name" target="_blank" rel="noopener">A2A vs ANCP</a>
                <span class="b-mega-item__desc">Side-by-side comparison with Google A2A protocol</span>
              </div>
            </div>

          </div>
        </div>
      </li>

    </ul>

    <div class="b-navbar-cta">
      <a href="https://bizfirstai.com/website/contact.html" class="b-btn b-btn-primary">Get Started</a>
    </div>

    <button class="b-hamburger" id="b-hamburger" aria-label="Open menu" aria-expanded="false">
      <span class="b-hamburger__line"></span>
      <span class="b-hamburger__line"></span>
      <span class="b-hamburger__line"></span>
    </button>

  </div>
</nav>

<!-- Mobile backdrop -->
<div class="b-mobile-backdrop" id="b-mobile-backdrop"></div>

<!-- Mobile drawer -->


<div class="b-mobile-menu" id="b-mobile-menu" aria-hidden="true">
  <div class="b-mobile-menu__header">
    <a href="./index.html">
      <img src="https://bizfirstai.com/website/assets/Logo/logo.png" alt="ANCP by BizFirstAi" style="height:32px;width:auto;">
    </a>
    <button class="b-mobile-menu__close" id="b-mobile-close" aria-label="Close menu">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
  </div>

  <nav class="b-mobile-nav">
    <a href="./index.html" class="b-mobile-nav__link">Home</a>
    <a href="./features.html" class="b-mobile-nav__link">Features</a>

    <!-- Getting Started accordion -->
    <div class="b-mobile-products" id="b-mobile-gs">
      <button class="b-mobile-products__toggle" id="b-mobile-gs-toggle" aria-expanded="false">
        Getting Started
        <svg class="b-mobile-products__chevron" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 6l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="b-mobile-products__body" id="b-mobile-gs-body">
        <div class="b-mobile-cat">
          <div class="b-mobile-cat__items">
            <div class="b-mobile-cat__item">
              <a href="./ANCP-gettingStarted.html" class="b-mobile-cat__link" target="_blank" rel="noopener">Getting Started Guide</a>
            </div>
            <div class="b-mobile-cat__item">
              <a href="./docs.html" class="b-mobile-cat__link">Documentation</a>
            </div>
            <div class="b-mobile-cat__item">
              <a href="./changelog.html" class="b-mobile-cat__link">Changelog</a>
            </div>
            <div class="b-mobile-cat__item">
              <a href="https://community.bizfirstai.com/tag/ancp" class="b-mobile-cat__link" target="_blank" rel="noopener">Community</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Architecture accordion -->
    <div class="b-mobile-products" id="b-mobile-arch">
      <button class="b-mobile-products__toggle" id="b-mobile-arch-toggle" aria-expanded="false">
        Architecture
        <svg class="b-mobile-products__chevron" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 6l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="b-mobile-products__body" id="b-mobile-arch-body">
        <div class="b-mobile-cat">
          <div class="b-mobile-cat__items">
            <div class="b-mobile-cat__item">
              <a href="./ANCP-architecture.html" class="b-mobile-cat__link">ANCP Architecture</a>
            </div>
            <div class="b-mobile-cat__item">
              <a href="./ANCP-Specification.html" class="b-mobile-cat__link" target="_blank" rel="noopener">Specification</a>
            </div>
            <div class="b-mobile-cat__item">
              <a href="./a2a-vs-ancp.html" class="b-mobile-cat__link" target="_blank" rel="noopener">A2A vs ANCP</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <div class="b-mobile-menu__cta">
    <a href="https://bizfirstai.com/website/contact.html" class="b-btn b-btn-primary">Get Started</a>
  </div>

</div>
`;

const SHARED_FOOTER = `
<div class="b-footer-container">

  <div class="b-footer-section">
    <div class="b-footer-brand">
      <img src="https://bizfirstai.com/website/assets/Logo/logo.png" alt="ANCP by BizFirstAi" style="height: 32px; width: auto; margin-bottom: 1rem;">
      <p class="b-footer-tagline">The communication protocol for agentic AI systems.</p>
    </div>
  </div>

  <div class="b-footer-section">
    <h4>Getting Started</h4>
    <ul>
      <li><a href="./index.html">Home</a></li>
      <li><a href="./features.html">Features</a></li>
      <li><a href="./ANCP-gettingStarted.html" target="_blank" rel="noopener">Getting Started Guide</a></li>
      <li><a href="./docs.html">Documentation</a></li>
      <li><a href="./changelog.html">Changelog</a></li>
      <li><a href="https://community.bizfirstai.com/tag/ancp" target="_blank" rel="noopener">Community</a></li>
    </ul>
  </div>

  <div class="b-footer-section">
    <h4>Architecture</h4>
    <ul>
      <li><a href="./ANCP-architecture.html">ANCP Architecture</a></li>
      <li><a href="./ANCP-Specification.html" target="_blank" rel="noopener">Specification</a></li>
      <li><a href="./a2a-vs-ancp.html" target="_blank" rel="noopener">A2A vs ANCP</a></li>
    </ul>
  </div>

  <div class="b-footer-section">
    <h4>BizFirstAi Platform</h4>
    <ul>
      <li><a href="https://bizfirstai.com" target="_blank" rel="noopener">bizfirstai.com</a></li>
      <li><a href="https://bizfirstai.com/website/platform.html">Platform Overview</a></li>
      <li><a href="https://bizfirstai.com/website/pricing.html">Platform Pricing</a></li>
      <li><a href="https://bizfirstai.com/website/contact.html">Contact Sales</a></li>
    </ul>
  </div>

</div>

<div class="b-footer-bottom">
  <p>&copy; 2026 BizFirst LLC &middot; <a href="https://bizfirstai.com" target="_blank" rel="noopener">Back to BizFirstAi &#8599;</a></p>
</div>
`;

/**
 * Set active nav link based on current page
 */
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.b-navbar-menu .b-nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (
      href === `./${currentPage}` ||
      (currentPage === '' && href === './index.html')
    ) {
      link.classList.add('b-active');
    } else {
      link.classList.remove('b-active');
    }
  });
}

/**
 * Wire up desktop mega/dropdown menus.
 * Uses cursor-tracking so the panel stays open while the cursor travels
 * from the nav trigger down into the panel (avoids the mouseleave gap).
 */
function initMegaMenu() {
  let cursorX = 0;
  let cursorY = 0;
  document.addEventListener('mousemove', e => {
    cursorX = e.clientX;
    cursorY = e.clientY;
  });

  document.querySelectorAll('.b-dropdown').forEach(dropdown => {
    const panel = dropdown.querySelector('.b-mega-panel');
    if (!panel) return;

    let hideTimer = null;

    const open = () => {
      clearTimeout(hideTimer);
      dropdown.classList.add('b-dropdown--open');
    };

    const isOverPanel = () => {
      const r = panel.getBoundingClientRect();
      return cursorX >= r.left && cursorX <= r.right &&
             cursorY >= r.top  && cursorY <= r.bottom;
    };

    const isOverTrigger = () => {
      const r = dropdown.getBoundingClientRect();
      return cursorX >= r.left && cursorX <= r.right &&
             cursorY >= r.top  && cursorY <= r.bottom;
    };

    const scheduleClose = () => {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        if (isOverPanel() || isOverTrigger()) {
          scheduleClose();
        } else {
          dropdown.classList.remove('b-dropdown--open');
        }
      }, 120);
    };

    dropdown.addEventListener('mouseenter', open);
    dropdown.addEventListener('mouseleave', scheduleClose);
    panel.addEventListener('mouseenter', open);
    panel.addEventListener('mouseleave', scheduleClose);
  });
}

/**
 * Wire up mobile hamburger, backdrop, close button,
 * and the Getting Started + Architecture accordions.
 */
function initMobileNav() {
  const hamburger  = document.getElementById('b-hamburger');
  const mobileMenu = document.getElementById('b-mobile-menu');
  const backdrop   = document.getElementById('b-mobile-backdrop');
  const closeBtn   = document.getElementById('b-mobile-close');

  if (!hamburger || !mobileMenu || !backdrop) return;

  function openMenu() {
    hamburger.classList.add('b-hamburger--open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('b-mobile-menu--open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    backdrop.classList.add('b-mobile-backdrop--visible');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('b-hamburger--open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('b-mobile-menu--open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    backdrop.classList.remove('b-mobile-backdrop--visible');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('b-mobile-menu--open');
    isOpen ? closeMenu() : openMenu();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });

  // Wire up each accordion independently
  [
    { toggleId: 'b-mobile-gs-toggle',   panelId: 'b-mobile-gs'   },
    { toggleId: 'b-mobile-arch-toggle', panelId: 'b-mobile-arch' },
  ].forEach(({ toggleId, panelId }) => {
    const toggle = document.getElementById(toggleId);
    const panel  = document.getElementById(panelId);
    if (!toggle || !panel) return;
    toggle.addEventListener('click', () => {
      const isOpen = panel.classList.contains('b-mobile-products--open');
      panel.classList.toggle('b-mobile-products--open', !isOpen);
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  // Close drawer when any link inside is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// Inject on page load
document.addEventListener('DOMContentLoaded', () => {
  const headerContainer = document.getElementById('header-container');
  if (headerContainer) {
    headerContainer.innerHTML = SHARED_HEADER;
  }

  const footerContainer = document.getElementById('footer-container');
  if (footerContainer) {
    footerContainer.innerHTML = SHARED_FOOTER;
  }

  setActiveNavLink();
  initMegaMenu();
  initMobileNav();
});
