const canvas = document.getElementById('hero-canvas');
if (canvas && window.THREE) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 6);

  const resize = () => {
    const { width, height } = canvas.getBoundingClientRect();
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const light = new THREE.DirectionalLight(0xffffff, 0.85);
  light.position.set(2, 2, 4);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, 0.45));

  const geometry = new THREE.IcosahedronGeometry(1.1, 1);
  const colors = [0x5bbd92, 0xc9d7ff, 0xf6e4c8, 0xa7d9c4];

  const blobs = Array.from({ length: 5 }).map((_, i) => {
    const material = new THREE.MeshStandardMaterial({
      color: colors[i % colors.length],
      metalness: 0.15,
      roughness: 0.35,
      transparent: true,
      opacity: 0.55,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(Math.sin(i) * 1.6, Math.cos(i) * 0.9, -i * 0.25);
    mesh.scale.setScalar(0.75 + i * 0.15);
    scene.add(mesh);
    return mesh;
  });

  const mouse = { x: 0, y: 0 };
  const onMove = (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  };

  canvas.addEventListener('mousemove', onMove);
  window.addEventListener('resize', resize);
  resize();

  const tick = () => {
    blobs.forEach((b, i) => {
      b.rotation.x += 0.003 + i * 0.0006;
      b.rotation.y += 0.002 + i * 0.0007;
      b.position.x += (mouse.x * 0.8 - b.position.x) * 0.02;
      b.position.y += (mouse.y * 0.5 - b.position.y) * 0.02;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };

  tick();
}
