document.addEventListener("DOMContentLoaded", () => {
  // Contact form submission
  const contactForm = document.querySelector("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.querySelector("#name").value.trim();
      const email = document.querySelector("#email").value.trim();
      const message = document.querySelector("#message").value.trim();

      if (name && email && message) {
        alert(`Thank you, ${name}! Your message has been sent.`);
        e.target.reset();
      } else {
        alert("Please fill in all fields before submitting.");
      }
    });
  }
});
