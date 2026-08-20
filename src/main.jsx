import "./cinematic-hero.css";

const mount = document.getElementById("cinematic-hero");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const compactViewport = window.matchMedia("(max-width: 900px)").matches;
const saveData = navigator.connection?.saveData === true;
const boot = async () => {
  const [{ createRoot }, { default: CinematicHero }] = await Promise.all([
    import("react-dom/client"),
    import("./CinematicHero")
  ]);
  createRoot(mount).render(<CinematicHero />);
};

// The semantic HTML hero remains fully usable without the decorative 3D layer.
// Avoid downloading its large WebGL bundle where it would be hidden or wasteful.
if (mount && !compactViewport && !prefersReducedMotion && !saveData) {
  if ("requestIdleCallback" in window) window.requestIdleCallback(boot, { timeout: 1200 });
  else window.setTimeout(boot, 200);
}
