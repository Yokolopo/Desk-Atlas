import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import CameraRig from "./CameraRig";
import DeskObjects from "./DeskObjects";

function Lighting({ progress }) {
  const key = useRef();
  useFrame(() => { if (key.current) key.current.intensity = 1.25 + progress.current.value * 0.5; });
  return <><ambientLight intensity={0.42} color="#b5cfbd" /><hemisphereLight args={["#789e87", "#35221a", 0.55]} /><directionalLight ref={key} position={[4.5, 6, 4.2]} intensity={1.25} color="#ffe0ae" castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} /><pointLight position={[0.55, 2.2, -0.15]} intensity={1.2} color="#64d0ae" distance={4.5} /><pointLight position={[-2.8, 2.0, 1.1]} intensity={0.55} color="#d69563" distance={4} /></>;
}

export default function DeskScene({ progress, pointer, reducedMotion, onReady }) {
  return <Canvas className="desk-experience__canvas" shadows dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "high-performance" }} camera={{ fov: 39, near: 0.1, far: 60 }} onCreated={onReady}>
    <color attach="background" args={["#112019"]} />
    <fog attach="fog" args={["#112019", 10, 26]} />
    <Lighting progress={progress} />
    <DeskObjects />
    <CameraRig progress={progress} pointer={pointer} reducedMotion={reducedMotion} />
  </Canvas>;
}
