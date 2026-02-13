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

  document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector(".gallery-grid");
  const allImages = gallery.querySelectorAll("img");
  const searchBtn = document.querySelector("#searchbtn");

  // Create hamburger button next to search button
  const menuBtn = document.createElement("button");
  menuBtn.textContent = "☰ Cars";
  menuBtn.style.marginLeft = "10px";
  menuBtn.style.cursor = "pointer";
  searchBtn.insertAdjacentElement("afterend", menuBtn);

  // Create popup overlay (hidden by default)
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(0,0,0,0.5)";
  overlay.style.display = "none";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.zIndex = "1000";
  document.body.appendChild(overlay);

  // Create popup box
  const popup = document.createElement("div");
  popup.style.background = "#fff";
  popup.style.padding = "15px";
  popup.style.width = "250px";
  popup.style.maxHeight = "300px";
  popup.style.overflowY = "auto";
  popup.style.borderRadius = "8px";
  popup.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
  overlay.appendChild(popup);

  // Fill popup with car names
  const list = document.createElement("ul");
  list.style.listStyle = "none";
  list.style.padding = "0";
  allImages.forEach(img => {
    const li = document.createElement("li");
    li.textContent = img.alt;
    li.style.cursor = "pointer";
    li.style.padding = "6px 0";
    li.style.borderBottom = "1px solid #eee";

    // Scroll to image when clicked
    li.addEventListener("click", () => {
      img.scrollIntoView({ behavior: "smooth", block: "center" });
      overlay.style.display = "none"; // close popup after selection
    });

    list.appendChild(li);
  });
  popup.appendChild(list);

  // Toggle popup when hamburger is clicked
  menuBtn.addEventListener("click", () => {
    overlay.style.display = "flex";
  });

  // Close popup when clicking outside the box
  overlay.addEventListener("click", e => {
    if (e.target === overlay) overlay.style.display = "none";
  });
});