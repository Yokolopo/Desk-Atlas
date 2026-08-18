import * as THREE from "three";

export const cameraPath = new THREE.CatmullRomCurve3([
  new THREE.Vector3(7.2, 4.3, 10.2),
  new THREE.Vector3(5.4, 3.3, 7.2),
  new THREE.Vector3(2.6, 2.25, 4.5),
  new THREE.Vector3(-1.8, 2.05, 3.8),
  new THREE.Vector3(-2.2, 4.8, 6.2)
]);

export const targetPath = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0.6, 0.25, -0.1),
  new THREE.Vector3(0.8, 0.2, -0.45),
  new THREE.Vector3(0.7, 0.3, -0.8),
  new THREE.Vector3(-0.8, 0.15, -0.1),
  new THREE.Vector3(0.1, 0.2, -0.1)
]);
