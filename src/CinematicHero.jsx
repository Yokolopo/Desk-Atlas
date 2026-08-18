import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DeskScene from "./desk-experience/DeskScene";
import { deskProducts } from "./desk-experience/data";
import heroPoster from "../hero-shared-workspace.png";
import "./cinematic-hero.css";

gsap.registerPlugin(ScrollTrigger);

export default function CinematicHero() {
  const stage = useRef();
  const progress = useRef({ target: 0, value: 0 });
  const pointer = useRef({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglReady, setWebglReady] = useState(false);
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync(); media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  useLayoutEffect(() => {
    if (reducedMotion) return undefined;
    const state = { progress: 0 };
    const context = gsap.context(() => {
      gsap.to(state, { progress: 1, ease: "none", scrollTrigger: {
        trigger: stage.current, start: "top top", end: "bottom bottom", scrub: 0.9,
        onUpdate: () => {
          progress.current.target = state.progress;
          const active = deskProducts.find((item) => state.progress >= item.start && state.progress < item.end);
          setProduct((current) => current?.id === active?.id ? current : active ?? null);
        }
      }});
    }, stage);
    return () => context.revert();
  }, [reducedMotion]);
  return <section ref={stage} className="desk-experience" aria-label="A cinematic shared workspace exploration">
    <div className="desk-experience__sticky" onPointerMove={(event) => { pointer.current = { x: event.clientX / window.innerWidth - 0.5, y: event.clientY / window.innerHeight - 0.5 }; }}>
      <img className={"desk-experience__poster " + (webglReady ? "is-ready" : "")} src={heroPoster} width="1672" height="941" alt="" fetchPriority="high" />
      {!reducedMotion && <DeskScene progress={progress} pointer={pointer} reducedMotion={reducedMotion} onReady={() => setWebglReady(true)} />}
      <div className="desk-experience__atmosphere" aria-hidden="true" />
      <div className="wrap desk-experience__copy"><p className="desk-experience__kicker">A shared workspace, thoughtfully built</p><h1>Build your workspace.<br /><em>Build what’s next.</em></h1><p>For professionals, creators, developers, and AI builders who want a calmer place to turn ideas into real projects.</p><div className="desk-experience__actions"><a className="button" href="shop.html">Explore the setup <span>→</span></a><a className="desk-experience__link" href="declutter-desk-accessories.html">See how we choose</a></div></div>
      <div className={"desk-experience__product " + (product ? "is-visible" : "")} aria-live="polite">{product && <><span>{product.number}</span><strong>{product.label}</strong><a href={product.href}>View pick <span aria-hidden="true">→</span></a></>}</div>
      <p className="desk-experience__scroll">Scroll to enter the workspace <span aria-hidden="true">↓</span></p>
    </div>
  </section>;
}
