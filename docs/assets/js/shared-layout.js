/**
 * Shared Layout Injector — BizFirstAi
 * Dynamically injects header and footer into all pages.
 */

const SHARED_HEADER = `
<style>
  .b-mobile-menu { display: flex; flex-direction: column; overflow: hidden; }
  .b-mobile-nav { overflow-y: auto; flex: 1; }
</style>
<nav class="b-navbar">
  <div class="b-navbar-container">

    <a href="./index.html" class="b-navbar-logo">
      <img src="./assets/Logo/logo.png" alt="BizFirstAi" class="b-logo-image">
    </a>

    <ul class="b-navbar-menu">
      <li><a href="./index.html" class="b-nav-link">Home</a></li>

      <li class="b-dropdown">
        <a href="./products.html" class="b-nav-link b-dropdown-toggle">Products</a>

        <div class="b-mega-panel">
          <div class="b-mega-panel__inner">

            <div class="b-mega-col">
              <div class="b-mega-col__label">Build &amp; UI</div>
              <div class="b-mega-item">
                <a href="./products.html#atlas-forms" class="b-mega-item__name">Atlas Forms</a>
                <span class="b-mega-item__desc">Drag-and-drop form builder for any workflow</span>
                <div class="b-mega-item__links">
                  <a href="https://atlasforms.bizfirstai.com" class="b-mega-item__link" target="_blank" rel="noopener">Visit Site</a>
                  <a href="https://community.bizfirstai.com/tag/atlas-forms" class="b-mega-item__link" target="_blank" rel="noopener">Community</a>
                </div>
              </div>
              <div class="b-mega-item">
                <a href="./products.html#edge-interact" class="b-mega-item__name">Edge Interact</a>
                <span class="b-mega-item__desc">Embeddable chat &amp; interaction widgets</span>
                <div class="b-mega-item__links">
                  <a href="https://www.bizfirstai.com/website/index.html" class="b-mega-item__link" target="_blank" rel="noopener">Visit Site</a>
                  <a href="https://community.bizfirstai.com/tag/edge-interact" class="b-mega-item__link" target="_blank" rel="noopener">Community</a>
                </div>
              </div>
            </div>

            <div class="b-mega-col">
              <div class="b-mega-col__label">Orchestrate AI</div>
              <div class="b-mega-item">
                <a href="./products.html#flow" class="b-mega-item__name">Flow</a>
                <span class="b-mega-item__desc">Visual AI workflow automation engine</span>
                <div class="b-mega-item__links">
                  <a href="https://flow.bizfirstai.com" class="b-mega-item__link" target="_blank" rel="noopener">Visit Site</a>
                  <a href="https://community.bizfirstai.com/tag/flow" class="b-mega-item__link" target="_blank" rel="noopener">Community</a>
                </div>
              </div>
              <div class="b-mega-item">
                <a href="./products.html#edge-stream" class="b-mega-item__name">Edge Stream</a>
                <span class="b-mega-item__desc">Real-time data streaming and processing</span>
                <div class="b-mega-item__links">
                  <a href="https://edgestream.bizfirstai.com" class="b-mega-item__link" target="_blank" rel="noopener">Visit Site</a>
                  <a href="https://community.bizfirstai.com/tag/edge-stream" class="b-mega-item__link" target="_blank" rel="noopener">Community</a>
                </div>
              </div>
              <div class="b-mega-item">
                <a href="./products.html#octopus" class="b-mega-item__name">Octopus</a>
                <span class="b-mega-item__desc">Multi-agent orchestration framework</span>
                <div class="b-mega-item__links">
                  <a href="https://octopus.bizfirstai.com" class="b-mega-item__link" target="_blank" rel="noopener">Visit Site</a>
                  <a href="https://community.bizfirstai.com/tag/octopus" class="b-mega-item__link" target="_blank" rel="noopener">Community</a>
                </div>
              </div>
            </div>

            <div class="b-mega-col">
              <div class="b-mega-col__label">Secure &amp; Govern</div>
              <div class="b-mega-item">
                <a href="./products.html#passport" class="b-mega-item__name">Passport</a>
                <span class="b-mega-item__desc">Identity, auth &amp; access management</span>
                <div class="b-mega-item__links">
                  <a href="https://passport.bizfirstai.com" class="b-mega-item__link" target="_blank" rel="noopener">Visit Site</a>
                  <a href="https://community.bizfirstai.com/tag/passport" class="b-mega-item__link" target="_blank" rel="noopener">Community</a>
                </div>
              </div>
              <div class="b-mega-item">
                <a href="./products.html#ancp" class="b-mega-item__name">ANCP</a>
                <span class="b-mega-item__desc">API network control &amp; policy enforcement</span>
                <div class="b-mega-item__links">
                  <a href="https://ancp.bizfirstai.com" class="b-mega-item__link" target="_blank" rel="noopener">Visit Site</a>
                  <a href="https://community.bizfirstai.com/tag/ancp" class="b-mega-item__link" target="_blank" rel="noopener">Community</a>
                </div>
              </div>
            </div>

            <div class="b-mega-col">
              <div class="b-mega-col__label">Launch SaaS</div>
              <div class="b-mega-item">
                <a href="./products.html#markethub" class="b-mega-item__name">MarketHub</a>
                <span class="b-mega-item__desc">App marketplace &amp; distribution platform</span>
                <div class="b-mega-item__links">
                  <a href="https://markethub.bizfirstai.com" class="b-mega-item__link" target="_blank" rel="noopener">Visit Site</a>
                  <a href="https://community.bizfirstai.com/tag/market-hub" class="b-mega-item__link" target="_blank" rel="noopener">Community</a>
                </div>
              </div>
              <div class="b-mega-item">
                <a href="./products.html#install-hub" class="b-mega-item__name">Install Hub</a>
                <span class="b-mega-item__desc">One-click deployment &amp; provisioning</span>
                <div class="b-mega-item__links">
                  <a href="https://installhub.bizfirstai.com" class="b-mega-item__link" target="_blank" rel="noopener">Visit Site</a>
                  <a href="https://community.bizfirstai.com/tag/install-hub" class="b-mega-item__link" target="_blank" rel="noopener">Community</a>
                </div>
              </div>
              <div class="b-mega-item">
                <a href="./products.html#operateai" class="b-mega-item__name">OperateAi</a>
                <span class="b-mega-item__desc">AI-powered operations &amp; monitoring</span>
                <div class="b-mega-item__links">
                  <a href="https://operateai.bizfirstai.com" class="b-mega-item__link" target="_blank" rel="noopener">Visit Site</a>
                  <a href="https://community.bizfirstai.com/tag/operate-ai" class="b-mega-item__link" target="_blank" rel="noopener">Community</a>
                </div>
              </div>
            </div>

            <div class="b-mega-col">
              <div class="b-mega-col__label">Data</div>
              <div class="b-mega-item">
                <a href="./products.html#data-ocean" class="b-mega-item__name">Data Ocean</a>
                <span class="b-mega-item__desc">Unified data lake &amp; analytics layer</span>
                <div class="b-mega-item__links">
                  <a href="https://dataocean.bizfirstai.com" class="b-mega-item__link" target="_blank" rel="noopener">Visit Site</a>
                  <a href="https://community.bizfirstai.com/tag/data-ocean" class="b-mega-item__link" target="_blank" rel="noopener">Community</a>
                </div>
              </div>
              <div class="b-mega-item">
                <a href="./products.html#bizfirst-observe" class="b-mega-item__name">BizFirst Observe</a>
                <span class="b-mega-item__desc">Observability, logs &amp; tracing across all modules</span>
                <div class="b-mega-item__links">
                  <a href="https://observe.bizfirstai.com" class="b-mega-item__link" target="_blank" rel="noopener">Visit Site</a>
                  <a href="https://community.bizfirstai.com/c/observe" class="b-mega-item__link" target="_blank" rel="noopener">Community</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </li>

      <li><a href="./platform.html" class="b-nav-link">Platform</a></li>
      <li><a href="./pricing.html" class="b-nav-link">Pricing</a></li>
      <li><a href="./about.html" class="b-nav-link">About</a></li>
      <li><a href="./docs.html" class="b-nav-link">Docs</a></li>
    </ul>

    <div class="b-navbar-cta">
      <a href="./contact.html" class="b-btn b-btn-primary">Get Demo</a>
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
      <img src="./assets/Logo/logo.png" alt="BizFirstAi" style="height:32px;width:auto;">
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

    <div class="b-mobile-products" id="b-mobile-products">
      <button class="b-mobile-products__toggle" id="b-mobile-products-toggle" aria-expanded="false">
        Products
        <svg class="b-mobile-products__chevron" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 6l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <div class="b-mobile-products__body" id="b-mobile-products-body">

        <div class="b-mobile-cat">
          <div class="b-mobile-cat__label">Build &amp; UI</div>
          <div class="b-mobile-cat__items">
            <div class="b-mobile-cat__item">
              <a href="./products.html#atlas-forms" class="b-mobile-cat__link">Atlas Forms</a>
              <div class="b-mobile-cat__item-links">
                <a href="https://atlasforms.bizfirstai.com" class="b-mobile-cat__item-link" target="_blank" rel="noopener">Visit Site</a>
                <a href="https://community.bizfirstai.com/tag/atlas-forms" class="b-mobile-cat__item-link" target="_blank" rel="noopener">Community</a>
              </div>
            </div>
            <div class="b-mobile-cat__item">
              <a href="./products.html#edge-interact" class="b-mobile-cat__link">Edge Interact</a>
              <div class="b-mobile-cat__item-links">
                <a href="https://www.bizfirstai.com/website/index.html" class="b-mobile-cat__item-link" target="_blank" rel="noopener">Visit Site</a>
                <a href="https://community.bizfirstai.com/tag/edge-interact" class="b-mobile-cat__item-link" target="_blank" rel="noopener">Community</a>
              </div>
            </div>
          </div>
        </div>

        <div class="b-mobile-cat">
          <div class="b-mobile-cat__label">Orchestrate AI</div>
          <div class="b-mobile-cat__items">
            <div class="b-mobile-cat__item">
              <a href="./products.html#flow" class="b-mobile-cat__link">Flow</a>
              <div class="b-mobile-cat__item-links">
                <a href="https://flow.bizfirstai.com" class="b-mobile-cat__item-link" target="_blank" rel="noopener">Visit Site</a>
                <a href="https://community.bizfirstai.com/tag/flow" class="b-mobile-cat__item-link" target="_blank" rel="noopener">Community</a>
              </div>
            </div>
            <div class="b-mobile-cat__item">
              <a href="./products.html#edge-stream" class="b-mobile-cat__link">Edge Stream</a>
              <div class="b-mobile-cat__item-links">
                <a href="https://edgestream.bizfirstai.com" class="b-mobile-cat__item-link" target="_blank" rel="noopener">Visit Site</a>
                <a href="https://community.bizfirstai.com/tag/edge-stream" class="b-mobile-cat__item-link" target="_blank" rel="noopener">Community</a>
              </div>
            </div>
            <div class="b-mobile-cat__item">
              <a href="./products.html#octopus" class="b-mobile-cat__link">Octopus</a>
              <div class="b-mobile-cat__item-links">
                <a href="https://octopus.bizfirstai.com" class="b-mobile-cat__item-link" target="_blank" rel="noopener">Visit Site</a>
                <a href="https://community.bizfirstai.com/tag/octopus" class="b-mobile-cat__item-link" target="_blank" rel="noopener">Community</a>
              </div>
            </div>
          </div>
        </div>

        <div class="b-mobile-cat">
          <div class="b-mobile-cat__label">Secure &amp; Govern</div>
          <div class="b-mobile-cat__items">
            <div class="b-mobile-cat__item">
              <a href="./products.html#passport" class="b-mobile-cat__link">Passport</a>
              <div class="b-mobile-cat__item-links">
                <a href="https://passport.bizfirstai.com" class="b-mobile-cat__item-link" target="_blank" rel="noopener">Visit Site</a>
                <a href="https://community.bizfirstai.com/tag/passport" class="b-mobile-cat__item-link" target="_blank" rel="noopener">Community</a>
              </div>
            </div>
            <div class="b-mobile-cat__item">
              <a href="./products.html#ancp" class="b-mobile-cat__link">ANCP</a>
              <div class="b-mobile-cat__item-links">
                <a href="https://ancp.bizfirstai.com" class="b-mobile-cat__item-link" target="_blank" rel="noopener">Visit Site</a>
                <a href="https://community.bizfirstai.com/tag/ancp" class="b-mobile-cat__item-link" target="_blank" rel="noopener">Community</a>
              </div>
            </div>
          </div>
        </div>

        <div class="b-mobile-cat">
          <div class="b-mobile-cat__label">Launch SaaS</div>
          <div class="b-mobile-cat__items">
            <div class="b-mobile-cat__item">
              <a href="./products.html#markethub" class="b-mobile-cat__link">MarketHub</a>
              <div class="b-mobile-cat__item-links">
                <a href="https://markethub.bizfirstai.com" class="b-mobile-cat__item-link" target="_blank" rel="noopener">Visit Site</a>
                <a href="https://community.bizfirstai.com/tag/market-hub" class="b-mobile-cat__item-link" target="_blank" rel="noopener">Community</a>
              </div>
            </div>
            <div class="b-mobile-cat__item">
              <a href="./products.html#install-hub" class="b-mobile-cat__link">Install Hub</a>
              <div class="b-mobile-cat__item-links">
                <a href="https://installhub.bizfirstai.com" class="b-mobile-cat__item-link" target="_blank" rel="noopener">Visit Site</a>
                <a href="https://community.bizfirstai.com/tag/install-hub" class="b-mobile-cat__item-link" target="_blank" rel="noopener">Community</a>
              </div>
            </div>
            <div class="b-mobile-cat__item">
              <a href="./products.html#operateai" class="b-mobile-cat__link">OperateAi</a>
              <div class="b-mobile-cat__item-links">
                <a href="https://operateai.bizfirstai.com" class="b-mobile-cat__item-link" target="_blank" rel="noopener">Visit Site</a>
                <a href="https://community.bizfirstai.com/tag/operate-ai" class="b-mobile-cat__item-link" target="_blank" rel="noopener">Community</a>
              </div>
            </div>
          </div>
        </div>

        <div class="b-mobile-cat">
          <div class="b-mobile-cat__label">Data</div>
          <div class="b-mobile-cat__items">
            <div class="b-mobile-cat__item">
              <a href="./products.html#data-ocean" class="b-mobile-cat__link">Data Ocean</a>
              <div class="b-mobile-cat__item-links">
                <a href="https://dataocean.bizfirstai.com" class="b-mobile-cat__item-link" target="_blank" rel="noopener">Visit Site</a>
                <a href="https://community.bizfirstai.com/tag/data-ocean" class="b-mobile-cat__item-link" target="_blank" rel="noopener">Community</a>
              </div>
            </div>
            <div class="b-mobile-cat__item">
              <a href="./products.html#bizfirst-observe" class="b-mobile-cat__link">BizFirst Observe</a>
              <div class="b-mobile-cat__item-links">
                <a href="https://observe.bizfirstai.com" class="b-mobile-cat__item-link" target="_blank" rel="noopener">Visit Site</a>
                <a href="https://community.bizfirstai.com/c/observe" class="b-mobile-cat__item-link" target="_blank" rel="noopener">Community</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <a href="./platform.html" class="b-mobile-nav__link">Platform</a>
    <a href="./pricing.html" class="b-mobile-nav__link">Pricing</a>
    <a href="./about.html" class="b-mobile-nav__link">About</a>
    <a href="./docs.html" class="b-mobile-nav__link">Docs</a>
  </nav>

  <div class="b-mobile-menu__cta">
    <a href="./contact.html" class="b-btn b-btn-primary">Get Demo</a>
  </div>

</div>
`;

const SHARED_FOOTER = `
<div class="b-footer-container">

  <div class="b-footer-section">
    <div class="b-footer-brand">
      <img src="./assets/Logo/logo.png" alt="BizFirstAi" style="height: 32px; width: auto; margin-bottom: 1rem;">
      <p class="b-footer-tagline">One platform. Every capability. Zero lock-in.</p>
    </div>
  </div>

  <div class="b-footer-section">
    <h4>Products</h4>
    <ul>
      <li><a href="./products.html#atlas-forms">Atlas Forms</a></li>
      <li><a href="./products.html#flow">Flow</a></li>
      <li><a href="./products.html#octopus">Octopus</a></li>
      <li><a href="./products.html#passport">Passport</a></li>
      <li><a href="./products.html#data-ocean">Data Ocean</a></li>
      <li><a href="./products.html">All Products &rarr;</a></li>
    </ul>
  </div>

  <div class="b-footer-section">
    <h4>Company</h4>
    <ul>
      <li><a href="./about.html">About Us</a></li>
      <li><a href="./contact.html">Contact</a></li>
      <li><a href="#">Careers</a></li>
      <li><a href="#">Blog</a></li>
    </ul>
  </div>

  <div class="b-footer-section">
    <h4>Resources</h4>
    <ul>
      <li><a href="./docs.html">Documentation</a></li>
      <li><a href="./platform.html">Platform</a></li>
      <li><a href="./pricing.html">Pricing</a></li>
      <li><a href="#">Changelog</a></li>
    </ul>
  </div>

  <div class="b-footer-section">
    <h4>Legal</h4>
    <ul>
      <li><a href="#">Privacy Policy</a></li>
      <li><a href="#">Terms of Service</a></li>
      <li><a href="#">Cookie Policy</a></li>
      <li><a href="#">Security</a></li>
    </ul>
  </div>

</div>

<div class="b-footer-bottom">
  <p>&copy; 2026 BizFirst LLC. All rights reserved.</p>
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
    if (href === `./${currentPage}` || (currentPage === '' && href === './index.html')) {
      link.classList.add('b-active');
    } else {
      link.classList.remove('b-active');
    }
  });
}

/**
 * Wire up desktop mega menu.
 *
 * Why not pure CSS :hover?
 *   The mega panel is position:fixed, which puts it outside the <li>'s
 *   layout box. Browsers fire mouseleave on the <li> when the cursor enters
 *   the fixed child, even though it is a DOM descendant. Pure :hover or a
 *   naive mouseleave-with-delay both break because the panel can also appear
 *   *under* a stationary cursor without triggering mouseenter.
 *
 * Fix: track cursor position via mousemove. Before hiding, confirm the
 *   cursor is not over the panel. If it is, reschedule the check.
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
          // Cursor is still in the interactive area — keep open and recheck
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
 * Wire up mobile hamburger, backdrop, and products accordion
 */
function initMobileNav() {
  const hamburger   = document.getElementById('b-hamburger');
  const mobileMenu  = document.getElementById('b-mobile-menu');
  const backdrop    = document.getElementById('b-mobile-backdrop');
  const closeBtn    = document.getElementById('b-mobile-close');
  const prodToggle  = document.getElementById('b-mobile-products-toggle');
  const prodPanel   = document.getElementById('b-mobile-products');

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

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });

  // Products accordion
  if (prodToggle && prodPanel) {
    prodToggle.addEventListener('click', () => {
      const isOpen = prodPanel.classList.contains('b-mobile-products--open');
      prodPanel.classList.toggle('b-mobile-products--open', !isOpen);
      prodToggle.setAttribute('aria-expanded', String(!isOpen));
    });
  }

  // Close drawer when a link inside it is clicked
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
