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
  const headerLogo = document.querySelector('.navbar-item.logo');
  const navLinks = document.querySelectorAll('.navbar-item:not(.logo)');

  // Mapping nav items to numbered component files
  const componentMap = {
    "Landing": "1_landing.html",
    "About": "2_about.html",
    "Services": "3_services.html",
    "Gallery": "4_gallery.html",
    "Contact": "5_contact.html"
  };

  // Utility: Load component file into main container
  function loadComponent(name) {
    const file = componentMap[name];
    if (!file) return;

    fetch(`components/${file}`)
      .then(res => {
        if (!res.ok) throw new Error("Component not found");
        return res.text();
      })
      .then(html => {
        mainContainer.innerHTML = html;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        initGalleryScroll(); // re-init gallery controls if present
      })
      .catch(err => {
        console.error(`Failed to load ${file}: ${err.message}`);
        mainContainer.innerHTML = `<section class="section"><div class="container"><p>Content unavailable.</p></div></section>`;
      });
  }
  // ------------------------
  // INIT NAV (RUN AFTER HEADER LOADS)
  // ------------------------
  window.initNav = function () {

    const burger = document.getElementById('burger');
    const menu = document.getElementById('navMenu');
    const headerLogo = document.querySelector('.navbar-item.logo');
    const navLinks = document.querySelectorAll('.navbar-item[data-page]');

    // Burger toggle
    if (burger && menu) {
      burger.addEventListener('click', () => {
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
      });
    }
    
  // ------------------------
  // NAVIGATION EVENTS
  // ------------------------
  // Logo click → Landing
    if (headerLogo) {
      headerLogo.addEventListener('click', (e) => {
        e.preventDefault();
        loadComponent("Landing");
      });
    }

    // Nav links
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.dataset.page;
        loadComponent(page);
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
