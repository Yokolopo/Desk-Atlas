import "./cinematic-hero.css";

const mount = document.getElementById("cinematic-hero");
const boot = async () => {
  const [{ createRoot }, { default: CinematicHero }] = await Promise.all([
    import("react-dom/client"),
    import("./CinematicHero")
  ]);
  createRoot(mount).render(<CinematicHero />);
};

if ("requestIdleCallback" in window) window.requestIdleCallback(boot, { timeout: 1200 });
else window.setTimeout(boot, 200);
