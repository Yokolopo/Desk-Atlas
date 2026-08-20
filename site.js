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

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealTargets = document.querySelectorAll(
  ".section-head, .feature-card, .problem-card, .standard, .faq-grid, .shop-card, .pick, .desk-reset, .toppicks, .page-simple .content > *, .article-title, .article-hero"
);

if (!reducedMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-revealed");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8%", threshold: 0.08 });
  revealTargets.forEach((target) => {
    target.classList.add("reveal-ready");
    observer.observe(target);
  });
}

document.querySelectorAll(".mobile-nav a").forEach((link) => {
  link.addEventListener("click", () => link.closest("details")?.removeAttribute("open"));
});

document.querySelectorAll('a[rel~="sponsored"]').forEach((link) => {
  link.dataset.affiliate = "amazon";
  if (!link.getAttribute("aria-label")) {
    link.setAttribute("aria-label", `${link.textContent.trim()} — opens Amazon`);
  }
});
