document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contactForm");
  const msg = document.createElement("p");
  form.appendChild(msg);

  form.addEventListener("submit", e => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (name && email && message) {
      msg.style.color = "green";
      msg.textContent = `Thank you, ${name}! Your message has been sent.`;
      form.reset();
    } else {
      msg.style.color = "red";
      msg.textContent = "Please fill in all fields before submitting.";
    }
  });
});