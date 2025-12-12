// main.js - improved mobile dropdown placement (close on nav click / outside click)
(function() {
  const menuToggle = document.getElementById('menuToggle');
  const navWrap = document.getElementById('navWrap');
  const mainMenu = document.getElementById('mainMenu');
  
  function isMobile() { return window.innerWidth <= 1100; }
  
  function applyInitial() {
    if (!navWrap || !menuToggle) return;
    navWrap.classList.remove('mobile-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    // ensure navWrap has no inline styles that could force right-side
    navWrap.style.left = '';
    navWrap.style.right = '';
    navWrap.style.top = '';
  }
  applyInitial();
  window.addEventListener('resize', applyInitial);
  
  // Toggle mobile vertical dropdown
  menuToggle?.addEventListener('click', function(e) {
    if (!navWrap) return;
    if (isMobile()) {
      navWrap.classList.toggle('mobile-open');
      const expanded = navWrap.classList.contains('mobile-open');
      menuToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      if (expanded) {
        // ensure it's placed under the menu bar (CSS handles left/right/top)
        // focus first link for accessibility
        const first = navWrap.querySelector('.menu a');
        if (first) first.focus();
      }
    } else {
      // desktop fallback
      const curr = getComputedStyle(navWrap).display;
      navWrap.style.display = curr === 'none' ? 'block' : 'none';
    }
    e.stopPropagation();
  });
  
  // Close mobile menu when clicking a link (allow navigation) and on outside click
  mainMenu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', function() {
      if (isMobile()) {
        navWrap.classList.remove('mobile-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
      // navigation will continue (no preventDefault)
    });
  });
  
  document.addEventListener('click', function(e) {
    if (!isMobile()) return;
    if (!navWrap) return;
    const clickedOnMenu = e.target.closest('#navWrap') || e.target.closest('#menuToggle');
    if (!clickedOnMenu) {
      navWrap.classList.remove('mobile-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
  
  // gallery images open full size
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.gallery-item img').forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => window.open(img.src, '_blank'));
    });
    
    const form = document.getElementById('quickEnquiry');
    form?.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you! Your enquiry has been noted. We will contact you shortly.');
      form.reset();
    });
  });
})();
