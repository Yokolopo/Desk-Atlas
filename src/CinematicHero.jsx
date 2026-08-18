import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { deskProducts } from "./desk-products";
import "./cinematic-hero.css";
import heroPoster from "../hero-shared-workspace.png";

function Scene({ reducedMotion, pointer }) {
  const group = useRef();
  const key = useRef();
  useFrame((state) => {
    if (!group.current || reducedMotion) return;
    const targetX = pointer.current.x * 0.09;
    const targetY = pointer.current.y * 0.05;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetX, 3, state.clock.getDelta());
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -targetY, 3, state.clock.getDelta());
    key.current.intensity = 0.6 + Math.sin(state.clock.elapsedTime * 0.55) * 0.08;
  });

  return (
    <group ref={group} position={[1.3, -0.1, 0]}>
      <ambientLight intensity={0.28} color="#b6d0bd" />
      <pointLight ref={key} position={[1.4, 1.8, 1.8]} intensity={0.62} color="#e3b969" distance={5} />
      <pointLight position={[1.55, 0.55, 0.85]} intensity={0.38} color="#b9e1d0" distance={3} />
      {deskProducts.map((product) => (
        <mesh key={product.id} position={product.position} rotation={product.rotation} scale={product.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={product.id === "light-bar" ? "#cba04d" : "#202825"} metalness={0.8} roughness={0.32} transparent opacity={0.24} />
        </mesh>
      ))}
      <mesh position={[1.55, 0.35, -1.22]} rotation={[0, -0.2, 0]}>
        <planeGeometry args={[1.4, 0.78]} />
        <meshBasicMaterial color="#9ec9b7" transparent opacity={0.14} />
      </mesh>
    </group>
  );
}

export default function CinematicHero() {
  const pointer = useRef({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <section className="cinematic-hero" aria-labelledby="cinematic-title">
      <img className="cinematic-hero__poster" src={heroPoster} width="1672" height="941" alt="" fetchPriority="high" />
      <div className="cinematic-hero__veil" aria-hidden="true" />
      {!reducedMotion && <Canvas className="cinematic-hero__canvas" dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} camera={{ position: [0, 0, 4.8], fov: 43 }} onPointerMove={(event) => { pointer.current = { x: event.clientX / window.innerWidth - 0.5, y: event.clientY / window.innerHeight - 0.5 }; }}>
        <Scene pointer={pointer} reducedMotion={reducedMotion} />
      </Canvas>}
      <div className="wrap cinematic-hero__content">
        <p className="cinematic-hero__kicker">A shared workspace, thoughtfully built</p>
        <h1 id="cinematic-title">Build your workspace.<br /><em>Build what’s next.</em></h1>
        <p>For professionals, creators, developers, and AI builders who want a calmer place to turn ideas into real projects.</p>
        <div className="cinematic-hero__actions"><a className="button" href="shop.html">Explore the setup <span>→</span></a><a className="cinematic-hero__link" href="declutter-desk-accessories.html">See how we choose</a></div>
        <p className="cinematic-hero__note">Designed for focused work—together or apart.</p>
      </div>
    </section>
  );
}
