import { useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { cameraPath, targetPath } from "./camera-path";

const desiredPosition = new THREE.Vector3();
const desiredTarget = new THREE.Vector3();
const actualTarget = new THREE.Vector3();

export default function CameraRig({ progress, pointer, reducedMotion }) {
  const { camera } = useThree();
  const initialized = useRef(false);
  useFrame((state, delta) => {
    const p = reducedMotion ? 0 : THREE.MathUtils.damp(progress.current.value, progress.current.target, 7.5, delta);
    progress.current.value = p;
    cameraPath.getPointAt(p, desiredPosition);
    targetPath.getPointAt(p, desiredTarget);
    if (!reducedMotion) { desiredPosition.x += pointer.current.x * 0.12; desiredPosition.y -= pointer.current.y * 0.08; }
    if (!initialized.current) { camera.position.copy(desiredPosition); actualTarget.copy(desiredTarget); initialized.current = true; }
    camera.position.lerp(desiredPosition, 1 - Math.exp(-delta * 4.6));
    actualTarget.lerp(desiredTarget, 1 - Math.exp(-delta * 5.2));
    camera.lookAt(actualTarget);
  });
  return null;
}
