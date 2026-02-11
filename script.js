document.addEventListener("DOMContentLoaded", () => {

  // Smooth scroll only for internal anchors
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: "smooth" });
      }
      // If href is "about.html" or "https://example.com", 
      // browser will redirect normally
    });
  });

  // Search functionality
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

  // Contact form submission
  document.querySelector("#Contact form").addEventListener("submit", e => {
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

});
