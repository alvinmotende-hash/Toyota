document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------
  // Smooth scroll for internal anchors
  // -------------------------------
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // -------------------------------
  // Search functionality in gallery
  // -------------------------------
  document.querySelector("#searchbtn").addEventListener("click", () => {
    const query = document.querySelector("#searchInput").value.trim().toLowerCase();
    if (!query) return alert("Please enter a vehicle name to search.");

    let found = false;
    document.querySelectorAll(".gallery-grid img").forEach(img => {
      if (img.alt.toLowerCase().includes(query)) {
        img.scrollIntoView({ behavior: "smooth", block: "center" });
        img.style.border = "3px solid #ffcc00";
        setTimeout(() => (img.style.border = ""), 5000);
        found = true;
      }
    });

    if (!found) alert("No matching vehicle found in the gallery.");
  });

  // -------------------------------
  // Popup Modal for gallery images
  // -------------------------------
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const captionText = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");

  // Hide modal by default
  modal.style.display = "none";

  // Show modal only when an image is clicked
  document.querySelectorAll(".gallery-grid img").forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "flex";   // show popup centered
      modalImg.src = img.src;         // set clicked image
      captionText.innerHTML = img.alt; // show description beside image
    });
  });

  // Close popup when clicking the X
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close popup when clicking outside the modal box
  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // -------------------------------
  // Contact form submission
  // -------------------------------
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




