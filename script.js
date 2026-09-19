const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

reveals.forEach((element) => revealObserver.observe(element));

const contactForm = document.querySelector('#contact-form');

if (contactForm) {
  const status = document.querySelector('#form-status');

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const company = formData.get('company');
    const interest = formData.get('interest');
    const message = formData.get('message');
    const subject = `Headquters enquiry from ${name}`;
    const body = [
      `Name: ${name}`,
      `Company: ${company || 'Not provided'}`,
      `Topic: ${interest}`,
      '',
      message,
    ].join('\n');

    window.location.href = `mailto:hello@headquters.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = 'Your email app is opening with the message ready to send.';
    contactForm.reset();
  });
}
