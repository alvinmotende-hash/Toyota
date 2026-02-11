// Wait until DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  
  // Smooth scroll for nav links
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Search functionality
  const searchBtn = document.getElementById("searchbtn");
  const searchInput = document.getElementById("searchInput");

  searchBtn.addEventListener("click", () => {
    const query = searchInput.value.toLowerCase();
    if (!query) {
      alert("Please enter a vehicle name to search.");
      return;
    }

    // Search through gallery images alt text
    const images = document.querySelectorAll(".gallery-grid img");
    let found = false;
    images.forEach(img => {
      if (img.alt.toLowerCase().includes(query)) {
        img.scrollIntoView({ behavior: "smooth", block: "center" });
        img.style.border = "3px solid #ffcc00";
        setTimeout(() => (img.style.border = ""), 5000); // highlight briefly
        found = true;
      }
    });

    if (!found) {
      alert("No matching vehicle found in the gallery.");
    }
  });

  // Contact form submission
  const form = document.querySelector("#Contact form");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name && email && message) {
      alert(`Thank you, ${name}! Your message has been sent.`);
      form.reset();
    } else {
      alert("Please fill in all fields before submitting.");
    }
  });

});
