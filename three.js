// App.js
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { createMainObject } from "./MainObject.js";

function init() {
  const scene = new THREE.Scene();

  // Lights and other scene setup
  const light = new THREE.DirectionalLight(0xffffff, 2, 50);
  light.position.set(0, 10, 10);
  scene.add(light);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
  dirLight.position.set(0, 0, 1).normalize();
  scene.add(dirLight);

  // Add Main Object to the Scene
  const mainObject = createMainObject();
  scene.add(mainObject);

  // Camera setup
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
  camera.position.z = 20;
  scene.add(camera);

  // Renderer setup
  const canvas = document.querySelector(".webgl");
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(2);
  renderer.render(scene, camera);

  // OrbitControls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 5;

  // Resize listener
  window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
  });

  // Animation loop
  const animate = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
  };

  animate();
}
init();
