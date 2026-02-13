document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contactForm");

  // Create feedback element dynamically
  const feedback = document.createElement("p");
  feedback.id = "feedback";
  form.appendChild(feedback);

  form.addEventListener("submit", e => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (name && email && message) {
      feedback.style.color = "green";
      feedback.textContent = `Thank you, ${name}! Your message has been sent.`;
      form.reset();
    } else {
      feedback.style.color = "red";
      feedback.textContent = "Please fill in all fields before submitting.";
    }
  });
});