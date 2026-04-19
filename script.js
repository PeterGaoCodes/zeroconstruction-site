// Zero Construction — English-only, interactive features

// Contact form: FormSubmit AJAX — mail goes to info@zeroconstruction.ca (Zoho or any host is fine; no extra code needed).
// First time only: FormSubmit may email that address to confirm before deliveries work.
const FORMSUBMIT_EMAIL = 'info@zeroconstruction.ca';

document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const headerNav = document.querySelector('.header-nav');

  if (menuBtn && headerNav) {
    menuBtn.addEventListener('click', () => {
      headerNav.classList.toggle('mobile-open');
      menuBtn.classList.toggle('active');
    });
  }

  const contactForm = document.getElementById('contact-form');
  const contactStatus = document.getElementById('contact-form-status');
  const contactSubmit = document.getElementById('contact-form-submit');

  function setContactStatus(message, variant) {
    if (!contactStatus) return;
    contactStatus.hidden = false;
    contactStatus.textContent = message;
    contactStatus.classList.remove('contact-form-status--success', 'contact-form-status--error');
    if (variant === 'success') contactStatus.classList.add('contact-form-status--success');
    if (variant === 'error') contactStatus.classList.add('contact-form-status--error');
  }

  function clearContactStatus() {
    if (!contactStatus) return;
    contactStatus.hidden = true;
    contactStatus.textContent = '';
    contactStatus.classList.remove('contact-form-status--success', 'contact-form-status--error');
  }

  if (contactForm && contactSubmit) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearContactStatus();

      const botcheck = contactForm.querySelector('[name="botcheck"]');
      if (botcheck && botcheck.value) {
        return;
      }

      const fd = new FormData(contactForm);
      const firstName = (fd.get('firstName') || '').toString().trim();
      const lastName = (fd.get('lastName') || '').toString().trim();
      const serviceSelect = contactForm.querySelector('[name="service"]');
      let serviceLabel = 'Not specified';
      if (serviceSelect && serviceSelect.value) {
        serviceLabel = serviceSelect.options[serviceSelect.selectedIndex].text;
      }

      const payload = {
        _subject: 'New estimate request — Zero Construction website',
        _template: 'table',
        _captcha: false,
        name: `${firstName} ${lastName}`.trim() || 'Website visitor',
        email: fd.get('email'),
        phone: fd.get('phone'),
        address: fd.get('address'),
        service_type: serviceLabel,
        message: fd.get('message') || '',
      };

      const originalLabel = contactSubmit.textContent;
      contactSubmit.disabled = true;
      contactSubmit.textContent = 'Sending…';

      try {
        const url = `https://formsubmit.co/ajax/${encodeURIComponent(FORMSUBMIT_EMAIL)}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => ({}));
        const failed =
          data.success === false ||
          data.success === 'false' ||
          (data.message && String(data.message).toLowerCase().includes('error'));

        if (res.ok && !failed) {
          setContactStatus('Thank you! We will contact you within 24–48 hours.', 'success');
          contactForm.reset();
        } else {
          setContactStatus(
            data.message ||
              'Something went wrong. Please try again, email info@zeroconstruction.ca directly, or call (905) 922-7868.',
            'error'
          );
        }
      } catch {
        setContactStatus(
          'Network error. Please try again or call (905) 922-7868.',
          'error'
        );
      } finally {
        contactSubmit.disabled = false;
        contactSubmit.textContent = originalLabel;
      }
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
