import Snake from "./Snake";

const s = new Snake("#snake", 500, 500, 25);

const nextEl = document.querySelector<HTMLButtonElement>("#next")!;
nextEl.addEventListener("click", () => {
  s.render();
});
