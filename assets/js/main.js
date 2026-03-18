document.addEventListener('DOMContentLoaded', () => {

  // ------------------------
  // MOBILE NAVBAR TOGGLE
  // ------------------------
  const burger = document.getElementById('burger');
  const menu = document.getElementById('navMenu');

  if (burger && menu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('is-active');
      menu.classList.toggle('is-active');
    });
  }

// ------------------------
// SPA NAVIGATION LOGIC
// ------------------------
const mainContainer = document.getElementById('site-sections');

// Load component directly by file name
function loadComponent(file) {
  if (!file) return;

  console.log("LOADING:", file); // debug

  fetch(`components/${file}`)
    .then(res => {
      if (!res.ok) throw new Error("Component not found");
      return res.text();
    })
    .then(html => {
      mainContainer.innerHTML = html;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      initGalleryScroll();
    })
    .catch(err => {
      console.error(`Failed to load ${file}: ${err.message}`);
    });
}

// ------------------------
// INIT NAV (RUN AFTER HEADER LOADS)
// ------------------------
window.initNav = function () {

  console.log("INIT NAV RUNNING"); // debug

  const burger = document.getElementById('burger');
  const menu = document.getElementById('navMenu');
  const headerLogo = document.querySelector('.navbar-item.logo');

  // 👇 KEY CHANGE: use data-file
  const navLinks = document.querySelectorAll('.navbar-item[data-file]');

  console.log("FOUND LINKS:", navLinks); // debug

  // Burger toggle
  if (burger && menu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('is-active');
      menu.classList.toggle('is-active');
    });
  }

  // Logo → landing
  if (headerLogo) {
    headerLogo.addEventListener('click', (e) => {
      e.preventDefault();
      loadComponent("1_landing.html");
    });
  }

  // Nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const file = link.dataset.file;

      console.log("CLICKED:", file); // debug

      loadComponent(file);
    });
  });
};


  // ------------------------
  // GALLERY HORIZONTAL SCROLL
  // ------------------------
  function initGalleryScroll() {
    const gallery = document.querySelector('#gallery');
    if (!gallery) return;

    const track = gallery.querySelector('.gallery-track');
    const scrollAmount = 300;

    const leftBtn = gallery.querySelector('.gallery-nav.left');
    const rightBtn = gallery.querySelector('.gallery-nav.right');

    if (leftBtn) leftBtn.onclick = () => track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    if (rightBtn) rightBtn.onclick = () => track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  // ------------------------
  // DEV UTILITY: COPY VISIBLE TEXT
  // ------------------------
  window.copyVisibleText = () => {
    const text = Array.from(document.querySelectorAll("body *"))
      .filter(el => el.children.length === 0 && el.innerText.trim().length > 0)
      .map(el => el.innerText.trim())
      .join("\n\n");

    navigator.clipboard.writeText(text).then(() => {
      console.log("Visible text copied to clipboard");
    });
  };

  // ------------------------
  // INITIAL LOAD: Landing Page
  // ------------------------
  loadComponent("Landing");

});
