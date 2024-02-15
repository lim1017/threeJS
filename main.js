import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./style.css";

import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

const scene = new THREE.Scene();
const loader = new FontLoader();

loader.load("fonts/helvetiker_regular.typeface.json", function (font) {
  console.log(font, "loaded");
  // const geometry = new TextGeometry("TOMMY", {
  //   font: font,
  //   size: 180,
  //   height: 5,
  //   curveSegments: 12,
  //   bevelEnabled: true,
  //   bevelThickness: 10,
  //   bevelSize: 8,
  //   bevelOffset: 0,
  //   bevelSegments: 5,
  // });

  // geometry.computeBoundingBox();

  // Creating sphere
  const geometry = new THREE.SphereGeometry(5, 64, 64);
  const material = new THREE.PointsMaterial({
    color: "#00ff83",
    size: 0.05,
  });
  // const materials = [
  //   new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
  //   new THREE.MeshPhongMaterial({ color: 0xffffff }), // side
  // ];

  const mesh = new THREE.Points(geometry, material);
  scene.add(mesh);

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const light = new THREE.DirectionalLight(0xffffff, 2, 50);
  light.position.set(0, 10, 10);
  scene.add(light);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
  dirLight.position.set(0, 0, 1).normalize();
  scene.add(dirLight);

  const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
  camera.position.z = 20;
  scene.add(camera);

  // Render
  const canvas = document.querySelector(".webgl");
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(2);
  renderer.render(scene, camera);

  //controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 5;

  // Resize
  window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
  });

  // Animate
  const loop = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
  };

  loop();

  //Timeline animations
  // const timeline = gsap.timeline({ defaults: { duration: 1 } });
  // timeline.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
  // timeline.fromTo("nav", { y: "-100%" }, { y: "0%" });
  // timeline.fromTo(".title", { opacity: 0 }, { opacity: 1 }, { seconds: 1.5 });

  //Mouse Animation
  // let mouseDown = false;
  // let rgb = [12, 33, 55];
  // window.addEventListener("mousedown", () => (mouseDown = true));
  // window.addEventListener("mouseup", () => (mouseDown = false));

  // window.addEventListener("mousemove", (e) => {
  //   if (mouseDown) {
  //     rgb = [
  //       Math.round((e.pageX / sizes.width) * 255),
  //       Math.round((e.pageY / sizes.height) * 255),
  //       Math.round((e.pageX / sizes.width) * 255),
  //     ];
  //   }
  //   let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
  //   gsap.to(mesh.material.color, {
  //     r: newColor.r,
  //     g: newColor.g,
  //     b: newColor.b,
  //   });
  // });
});
