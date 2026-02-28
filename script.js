document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     SMOOTH SCROLL
  =============================== */
  document.querySelectorAll("nav a[href^='#']").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      document.querySelector(link.getAttribute("href"))
        ?.scrollIntoView({ behavior: "smooth" });
    });
  });


  /* ===============================
     GALLERY + SEARCH
  =============================== */
  const gallery = document.querySelector(".gallery-grid");
  const allImages = gallery.querySelectorAll("img");
  const searchBtn = document.querySelector("#searchbtn");
  const searchInput = document.querySelector("#searchInput");

  searchBtn.addEventListener("click", () => {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) return alert("Please enter a vehicle name to search.");

    let found = false;

    allImages.forEach(img => {
      const match = img.alt.toLowerCase().includes(q);
      img.parentElement.style.display = match ? "inline-block" : "none";
      if (match) found = true;
    });

    if (!found) {
      alert("No matching vehicle found.");
      allImages.forEach(img => {
        img.parentElement.style.display = "inline-block";
      });
    }

    localStorage.setItem("lastSearch", q);
  });

  // Load saved search
  const savedSearch = localStorage.getItem("lastSearch");
  if (savedSearch) {
    searchInput.value = savedSearch;
  }


  /* ===============================
     IMAGE OVERLAY (HOVER DETAILS)
  =============================== */
  allImages.forEach(img => {

    img.setAttribute("data-details", img.alt);

    const overlay = document.createElement("div");
    overlay.textContent = img.getAttribute("data-details");

    Object.assign(overlay.style, {
      position: "absolute",
      bottom: "0",
      left: "0",
      right: "0",
      background: "rgba(0,0,0,0.7)",
      color: "#fff",
      padding: "8px",
      display: "none",
      fontSize: "14px",
      zIndex: "5"
    });

    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    wrapper.style.display = "inline-block";
    wrapper.style.margin = "10px";

    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(img);
    wrapper.appendChild(overlay);

    wrapper.addEventListener("mouseenter", () => {
      overlay.style.display = "block";
    });

    wrapper.addEventListener("mouseleave", () => {
      overlay.style.display = "none";
    });
  });


  /* ===============================
     MODAL POPUP (FIXED)
  =============================== */
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const caption = document.getElementById("caption");
  const closeBtn = modal.querySelector(".close"); // FIXED

  modal.style.display = "none";

  allImages.forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = img.src;
      caption.textContent = img.alt;
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


  /* ===============================
     HAMBURGER CARS MENU
  =============================== */
  const menuBtn = document.createElement("button");
  menuBtn.textContent = "☰ Cars";
  menuBtn.style.marginLeft = "10px";
  menuBtn.style.cursor = "pointer";
  searchBtn.insertAdjacentElement("afterend", menuBtn);

  const overlayMenu = document.createElement("div");
  Object.assign(overlayMenu.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "none",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "2000"
  });

  document.body.appendChild(overlayMenu);

  const popup = document.createElement("div");
  Object.assign(popup.style, {
    background: "#fff",
    padding: "15px",
    width: "250px",
    maxHeight: "300px",
    overflowY: "auto",
    borderRadius: "8px"
  });

  overlayMenu.appendChild(popup);

  const list = document.createElement("ul");
  list.style.listStyle = "none";
  list.style.padding = "0";

  allImages.forEach(img => {
    const li = document.createElement("li");
    li.textContent = img.alt;
    li.style.cursor = "pointer";
    li.style.padding = "6px 0";
    li.style.borderBottom = "1px solid #eee";

    li.addEventListener("click", () => {
      img.scrollIntoView({ behavior: "smooth", block: "center" });
      overlayMenu.style.display = "none";
    });

    list.appendChild(li);
  });

  popup.appendChild(list);

  menuBtn.addEventListener("click", () => {
    overlayMenu.style.display = "flex";
  });

  overlayMenu.addEventListener("click", e => {
    if (e.target === overlayMenu) {
      overlayMenu.style.display = "none";
    }
  });

});