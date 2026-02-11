document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll
  document.querySelectorAll("nav a[href^='#']").forEach(link =>
    link.addEventListener("click", e => {
      e.preventDefault();
      document.querySelector(link.getAttribute("href"))?.scrollIntoView({ behavior: "smooth" });
    })
  );

  // Search + toggle
  const allImages = document.querySelectorAll(".gallery-grid img");
  document.querySelector("#searchbtn").addEventListener("click", () => {
    const q = document.querySelector("#searchInput").value.trim().toLowerCase();
    if (!q) return alert("Please enter a vehicle name to search.");

    let found = false;
    allImages.forEach(img => {
      const match = img.alt.toLowerCase().includes(q);
      img.style.display = match ? "inline-block" : "none";
      if (match) found = true;
    });

    const groups = [
      { imgs: Array.from(allImages).slice(0, 20), h: "Explore our signature models", p: "Take a look at some of our finest designs" },
      { imgs: Array.from(allImages).slice(20), h: "Take a look at some innovation", p: "Electric cars are transforming" }
    ];
    groups.forEach(g => toggle(g.imgs, g.h, g.p));

    if (!found) {
      alert("No matching vehicle found.");
      allImages.forEach(img => (img.style.display = "inline-block"));
      document.querySelectorAll("h2, p").forEach(el => (el.style.display = "block"));
    }
  });

  const toggle = (imgs, hText, pText) => {
    const visible = imgs.some(img => img.style.display !== "none");
    document.querySelectorAll("h2").forEach(h => h.textContent.includes(hText) && (h.style.display = visible ? "block" : "none"));
    document.querySelectorAll("p").forEach(p => p.textContent.includes(pText) && (p.style.display = visible ? "block" : "none"));
  };

  // Popup modal
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const caption = document.getElementById("caption");

  modal.style.display = "none";
  allImages.forEach(img =>
    img.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = img.src;
      caption.textContent = img.alt;
    })
  );

  document.querySelector(".close").addEventListener("click", () => (modal.style.display = "none"));
  modal.addEventListener("click", e => e.target === modal && (modal.style.display = "none"));
});