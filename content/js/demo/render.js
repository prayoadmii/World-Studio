// 1. Get existing canvas and viewport container
const canvas = document.getElementById('renderer');
const viewport = canvas.parentElement;

// Get WebGL2 context
const gl = canvas.getContext('webgl2');

if (!gl) {
    console.error('WebGL 2 is not supported by your browser or hardware.');
}

// 2. Setup Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// 3. Setup Camera
const camera = new THREE.PerspectiveCamera(
    75,
    1,
    0.1,
    1000
);

camera.position.z = 3;

// 4. Setup Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    context: gl,
    antialias: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// 5. Add Demo Mesh
const geometry = new THREE.IcosahedronGeometry(1, 1);

const material = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    wireframe: true
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 6. Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// 7. Resize Renderer To Viewport
function resizeViewport() {
    const width = viewport.clientWidth;
    const height = viewport.clientHeight;

    if (width === 0 || height === 0) {
        return;
    }

    // Update canvas drawing buffer
    renderer.setSize(width, height, false);

    // Update camera
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

// Watch the actual viewport size
const resizeObserver = new ResizeObserver(() => {
    resizeViewport();
});

resizeObserver.observe(viewport);

// Initial size
resizeViewport();

// 8. Animation Loop
function animate() {
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();