document.addEventListener("DOMContentLoaded", () => {
  
  // Stats Counter Animation
  const counters = document.querySelectorAll(".stat-number");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.dataset.target;
        let count = 0;
        const speed = target / 50;
        
        const update = () => {
          if (count < target) {
            count += speed;
            counter.innerText = Math.ceil(count);
            setTimeout(update, 35);
          } else {
            counter.innerText = target;
          }
        };
        update();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.8 });
  
  counters.forEach(c => observer.observe(c));
  
  // Smooth Scroll for Internal Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});
