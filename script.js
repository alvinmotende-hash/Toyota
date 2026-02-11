document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll for internal anchors
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

  
  // Search functionality with auto section toggling
  document.querySelector("#searchbtn").addEventListener("click", () => {
    const query = document.querySelector("#searchInput").value.trim().toLowerCase();
    const allImages = document.querySelectorAll(".gallery-grid img");

    if (!query) {
      alert("Please enter a vehicle name to search.");
      return;
    }

    let found = false;

    // Filter images
    allImages.forEach(img => {
      if (img.alt.toLowerCase().includes(query)) {
        img.style.display = "inline-block";
        found = true;
      } else {
        img.style.display = "none";
      }
    });

    // Grouping by DOM order (adjust slice sizes to match your HTML)
    const signatureImages = Array.from(allImages).slice(0, 20); // first group
    const electricImages = Array.from(allImages).slice(20);     // second group

    // Toggle headings/paragraphs based on visibility
    toggleSection(signatureImages, "Explore our signature models", "Take a look at some of our finest designs");
    toggleSection(electricImages, "Take a look at some innovation", "Electric cars are transforming");

    if (!found) {
      alert("No matching vehicle found.");
      // Reset: show all images and headings again
      allImages.forEach(img => (img.style.display = "inline-block"));
      document.querySelectorAll("h2, p").forEach(el => el.style.display = "block");
    }
  });

  function toggleSection(images, headingText, paragraphText) {
    const hasVisible = images.some(img => img.style.display !== "none");
    document.querySelectorAll("h2").forEach(h => {
      if (h.textContent.includes(headingText)) h.style.display = hasVisible ? "block" : "none";
    });
    document.querySelectorAll("p").forEach(p => {
      if (p.textContent.includes(paragraphText)) p.style.display = hasVisible ? "block" : "none";
    });
  }

  // Popup Modal for gallery images
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const captionText = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");

  modal.style.display = "none";

  document.querySelectorAll(".gallery-grid img").forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = img.src;
      captionText.innerHTML = img.alt;
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

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
