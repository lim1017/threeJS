// MainObject.js
import * as THREE from "three";

export function createMainObject() {
  // Creating sphere
  const geometry = new THREE.SphereGeometry(5, 64, 64);
  const material = new THREE.PointsMaterial({
    color: "#00ff83",
    size: 0.05,
  });

  const mesh = new THREE.Points(geometry, material);

  return mesh;
}
