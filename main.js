// инициализация
const canvas = document.getElementById("hero-canvas");
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0e27);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// создаём 3D объект
const geometry = new THREE.IcosahedronGeometry(2, 4);
const material = new THREE.MeshPhongMaterial({
  color: 0x6c5ce7,
  emissive: 0x6c5ce7,
  shininess: 100
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// свет
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(5, 5, 5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// переменные для курсора
let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", (event) => {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = (event.clientY / window.innerHeight) * 2 - 1;
});

// адаптивность
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// анимация
function animate() {
  requestAnimationFrame(animate);

  // вращение объекта
  mesh.rotation.x += 0.005;
  mesh.rotation.y += 0.008;

  // реакция на курсор
  mesh.rotation.x += mouseY * 0.5;
  mesh.rotation.y += mouseX * 0.5;

  renderer.render(scene, camera);
}

animate();
