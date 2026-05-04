document.addEventListener('DOMContentLoaded', () => {

  const container = document.getElementById('site-sections');

  // ------------------------
  // LOAD COMPONENT
  // ------------------------
  function load(file) {
    fetch(`components/${file}`)
      .then(res => res.text())
      .then(html => {
        container.innerHTML = html;
        window.scrollTo(0, 0);
        initGallery();
      });
  }

  // ------------------------
  // INIT NAV (after header loads)
  // ------------------------
  window.initNav = () => {
    const burger = document.getElementById('burger');
    const menu = document.getElementById('navMenu');

    if (burger && menu) {
      burger.onclick = () => {
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
      };
    }

    document.querySelectorAll('[data-file]').forEach(link => {
      link.onclick = (e) => {
        e.preventDefault();
        load(link.dataset.file);
      };
    });
  };

  // ------------------------
  // GALLERY SCROLL
  // ------------------------
  function initGallery() {
    const track = document.querySelector('.gallery-track');
    if (!track) return;

    document.querySelector('.gallery-nav.left')?.onclick =
      () => track.scrollBy({ left: -300, behavior: 'smooth' });

    document.querySelector('.gallery-nav.right')?.onclick =
      () => track.scrollBy({ left: 300, behavior: 'smooth' });
  }

  // ------------------------
  // LOAD STATIC PARTS
  // ------------------------
  fetch('components/header.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('site-header').innerHTML = html;
      window.initNav();
    });

  fetch('components/footer.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('site-footer').innerHTML = html;
    });

  // Initial page
  load('1_landing.html');

});