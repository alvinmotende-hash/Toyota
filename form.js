document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector("#contactForm");
  const confirmation = document.createElement("p");
  confirmation.style.color = "green";
  contactForm.appendChild(confirmation);

  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#message").value.trim();

    if (name && email && message) {
      confirmation.textContent = `Thank you, ${name}! Your message has been sent.`;
      e.target.reset();
    } else {
      confirmation.style.color = "red";
      confirmation.textContent = "Please fill in all fields before submitting.";
    }
  });
});