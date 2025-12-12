// main.js
// Mobile horizontal menu toggle + gallery lightbox + enquiry stub + small helpers

(function() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileMenuClose');
  const mobileScroll = document.getElementById('mobileMenuScroll');
  const navWrap = document.getElementById('navWrap');
  
  function isMobile() { return window.innerWidth <= 1100; }
  
  // Initialize desktop vs mobile nav visibility
  function applyInitialNav() {
    if (!navWrap || !menuToggle) return;
    if (isMobile()) {
      navWrap.style.display = 'none';
      menuToggle.setAttribute('aria-expanded', 'false');
    } else {
      navWrap.style.display = 'block';
      menuToggle.setAttribute('aria-expanded', 'true');
      // ensure mobile overlay closed
      if (mobileMenu) mobileMenu.classList.remove('open');
    }
  }
  applyInitialNav();
  
  // Handle window resize
  window.addEventListener('resize', function() {
    applyInitialNav();
  });
  
  // Simple desktop fallback toggle (keeps existing behavior)
  menuToggle?.addEventListener('click', function(e) {
    if (!menuToggle) return;
    if (isMobile()) {
      // open mobile overlay
      openMobileMenu();
    } else {
      // desktop: toggle navWrap visibility (keeps old behavior for small desktop)
      if (!navWrap) return;
      const currently = getComputedStyle(navWrap).display;
      if (currently === 'none') {
        navWrap.style.display = 'block';
        menuToggle.setAttribute('aria-expanded', 'true');
      } else {
        navWrap.style.display = 'none';
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    }
    e.stopPropagation();
  });
  
  // Mobile menu open/close using history state for back button behavior
  function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    // push state so user can press Back to close overlay
    try { history.pushState({ mobileMenuOpen: true }, ''); } catch (e) {}
    // focus first link
    const first = mobileMenu.querySelector('.mobile-link');
    if (first) first.focus();
  }
  
  function closeMobileMenu(navigateBack = false) {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    // If the last history entry is our push, go back one to keep history clean
    if (navigateBack) {
      try {
        if (history.state && history.state.mobileMenuOpen) {
          history.back();
        }
      } catch (e) {}
    }
    if (menuToggle) menuToggle.focus();
  }
  
  mobileClose?.addEventListener('click', function(e) {
    closeMobileMenu(true);
    e.stopPropagation();
  });
  
  // close when clicking backdrop
  mobileMenu?.addEventListener('click', function(e) {
    if (e.target === mobileMenu) closeMobileMenu(true);
  });
  
  // Ensure popstate closes overlay if open
  window.addEventListener('popstate', function(e) {
    if (mobileMenu && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Mobile links: allow navigation, but close overlay quickly for smooth UX
  document.querySelectorAll('.mobile-link').forEach(a => {
    a.addEventListener('click', function(e) {
      // close overlay (navigation will occur)
      if (mobileMenu) mobileMenu.classList.remove('open');
      mobileMenu?.setAttribute('aria-hidden', 'true');
      menuToggle?.setAttribute('aria-expanded', 'false');
      // small delay to let browser start navigation
      setTimeout(() => {
        if (mobileMenu) mobileMenu.classList.remove('open');
      }, 120);
    });
  });
  
  // Lightbox: click gallery image to open full-size in new tab
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.gallery-item img').forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => {
        window.open(img.src, '_blank');
      });
    });
    
    // Enquiry form submit handler (demo)
    const form = document.getElementById('quickEnquiry');
    form?.addEventListener('submit', function(e) {
      e.preventDefault();
      // Simple visual feedback
      alert('Thank you! Your enquiry has been noted. We will contact you shortly.');
      form.reset();
      // If you use a server endpoint, send via fetch here.
    });
    
    // Make sure the View My Projects button stays just after the gallery in the flow
    // (Design: no extra JS needed. This is a placeholder if you want sticky behavior.)
  });
  
  // Close mobile menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
      closeMobileMenu(true);
    }
  });
  
})();
