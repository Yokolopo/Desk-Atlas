const root = document.documentElement;
root.classList.add("has-js");

const progress = document.createElement("div");
progress.className = "reading-progress";
progress.setAttribute("aria-hidden", "true");
document.body.prepend(progress);

const updateProgress = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.setProperty("--reading-progress", max > 0 ? scrollY / max : 0);
};

let ticking = false;
addEventListener("scroll", () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    updateProgress();
    ticking = false;
  });
}, { passive: true });
updateProgress();

document.querySelectorAll(".mobile-nav a").forEach((link) => {
  link.addEventListener("click", () => link.closest("details")?.removeAttribute("open"));
});

document.querySelectorAll('a[rel~="sponsored"]').forEach((link) => {
  link.dataset.affiliate = "amazon";
  if (!link.getAttribute("aria-label")) {
    link.setAttribute("aria-label", `${link.textContent.trim()} — opens Amazon`);
  }
});
