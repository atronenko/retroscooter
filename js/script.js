// Callback Form Start
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('callbackForm');
    const messageEl = document.getElementById('formMessage');
  
    if (!form || !messageEl) return;
  
    const lang = window.location.pathname.includes("/ua") ? "ua" : "en";
  
    const messages = {
      ua: {
        sending: "Надсилаємо...",
        success: "✅ Дякуємо! Ми скоро вам зателефонуємо.",
        error: "❌ Щось пішло не так. Спробуйте ще раз.",
        invalid: "❌ Введіть коректний номер телефону.",
        connection: "❌ Не вдалося надіслати. Перевірте з'єднання.",
      },
      en: {
        sending: "Sending...",
        success: "✅ Thank you! We'll call you soon.",
        error: "❌ Something went wrong. Please try again.",
        invalid: "❌ Please enter a valid phone number.",
        connection: "❌ Could not send. Check your connection.",
      }
    };
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const phone = form.phone.value.trim();
  
      // NEW: allow general number-like patterns
      if (!/^[\d\s()+-]{7,20}$/.test(phone)) {
        messageEl.textContent = messages[lang].invalid;
        messageEl.style.color = "red";
        return;
      }
  
      const formData = new FormData(form);
      messageEl.textContent = messages[lang].sending;
      messageEl.style.color = "#333";
  
      fetch(form.action, {
        method: 'POST',
        body: formData
      })
      .then(res => res.text())
      .then(data => {
        if (data.includes("success")) {
          messageEl.textContent = messages[lang].success;
          messageEl.style.color = "green";
          form.reset();
        } else {
          messageEl.textContent = messages[lang].error;
          messageEl.style.color = "red";
        }
      })
      .catch(() => {
        messageEl.textContent = messages[lang].connection;
        messageEl.style.color = "red";
      });
    });
  });
// Callback Form End

// Simple scroll animation for .anim-on-scroll
window.addEventListener('DOMContentLoaded', function() {
  const elements = document.querySelectorAll('.anim-on-scroll');
  if (!('IntersectionObserver' in window)) {
    // Fallback: show all
    elements.forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  elements.forEach(el => observer.observe(el));
  // Fallback: after 2 seconds, force all to visible if still hidden
  setTimeout(() => {
    elements.forEach(el => {
      if (!el.classList.contains('visible')) {
        el.classList.add('visible');
      }
    });
  }, 2000);
});
