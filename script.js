// Zero Construction — English-only, interactive features

document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const headerNav = document.querySelector('.header-nav');

  if (menuBtn && headerNav) {
    menuBtn.addEventListener('click', () => {
      headerNav.classList.toggle('mobile-open');
      menuBtn.classList.toggle('active');
    });
  }

  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! We will contact you within 24–48 hours.');
      contactForm.reset();
    });
  }

  const header = document.querySelector('.header-unified');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 50
        ? '0 4px 20px rgba(0, 0, 0, 0.3)'
        : 'none';
    });
  }
});
