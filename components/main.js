// ------------------------
// GALLERY
// ------------------------

const gallery = document.querySelector('#gallery');
const track = gallery.querySelector('.gallery-track');
const scrollAmount = 300;

gallery.querySelector('.gallery-nav.left').onclick = () => {
  track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
};

gallery.querySelector('.gallery-nav.right').onclick = () => {
  track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
};

// ------------------------
// DEV UTILITIES
// ------------------------

// Copies all visible text on the page to the clipboard
copy(
  Array.from(document.querySelectorAll("body *"))
    .filter(el =>
      el.children.length === 0 &&
      el.innerText &&
      el.innerText.trim().length > 0
    )
    .map(el => el.innerText.trim())
    .join("\n\n")
);
