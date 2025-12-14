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
