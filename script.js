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
    const email = formData.get('email');
    const company = formData.get('company');
    const interest = formData.get('interest');
    const message = formData.get('message');
    const subject = `Headquters enquiry from ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || 'Not provided'}`,
      `Topic: ${interest}`,
      '',
      message,
    ].join('\n');

    window.location.href = `mailto:hello@headquters.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (status) {
      status.textContent = 'Your email app is opening with the message ready to send.';
    }
    setTimeout(() => {
      contactForm.reset();
    }, 150);
  });
}

const portalMenu = document.querySelector('#portal-menu');
const portalSidebar = document.querySelector('#portal-sidebar');

if (portalMenu && portalSidebar) {
  portalMenu.addEventListener('click', () => {
    portalSidebar.classList.toggle('open');
  });
}

const passwordToggle = document.querySelector('#password-toggle');
const passwordInput = document.querySelector('#login-password');

if (passwordToggle && passwordInput) {
  passwordToggle.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    passwordToggle.textContent = isPassword ? 'Hide' : 'Show';
    passwordToggle.setAttribute('aria-label', `${isPassword ? 'Hide' : 'Show'} password`);
  });
}

const loginForm = document.querySelector('#login-form');

if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!loginForm.checkValidity()) {
      loginForm.reportValidity();
      return;
    }

    const status = document.querySelector('#login-status');
    status.textContent = 'Demo login accepted. Opening your portal...';
    window.setTimeout(() => {
      window.location.href = 'portal.html';
    }, 500);
  });
}

const signupForm = document.querySelector('#signup-form');

if (signupForm) {
  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!signupForm.checkValidity()) {
      signupForm.reportValidity();
      return;
    }

    const password = document.querySelector('#signup-password').value;
    const passwordIsAllowed =
      password.length >= 8 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[^A-Za-z0-9]/.test(password);

    if (!passwordIsAllowed) {
      const status = document.querySelector('#signup-status');
      status.textContent = 'Use 8+ characters with uppercase, lowercase, a number, and a special character.';
      return;
    }

    const status = document.querySelector('#signup-status');
    status.textContent = 'Account created in demo mode. Opening your portal...';
    window.setTimeout(() => {
      window.location.href = 'portal.html';
    }, 500);
  });
}

const socialButtons = document.querySelectorAll('[data-provider]');

socialButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const provider = button.dataset.provider;
    const status = button.closest('.auth-card').querySelector('.form-status');
    status.textContent = `${provider} sign-in is ready for OAuth configuration.`;
  });
});

const requestForm = document.querySelector('#request-form');

if (requestForm) {
  requestForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!requestForm.checkValidity()) {
      requestForm.reportValidity();
      return;
    }

    const status = document.querySelector('#request-status');
    status.textContent = 'Request submitted. Your Headquters team will follow up shortly.';
    requestForm.reset();
  });
}
