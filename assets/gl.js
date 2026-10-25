(() => {
  const cv = document.getElementById("gl");
  if (
    !cv ||
    !window.THREE ||
    matchMedia("(prefers-reduced-motion:reduce)").matches
  )
    return;
  const mob = innerWidth < 760,
    N = mob ? 1400 : 3600,
    R = () => Math.random() * 2 - 1;
  const r = new THREE.WebGLRenderer({
    canvas: cv,
    alpha: true,
    antialias: false,
  });
  r.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  const sc = new THREE.Scene(),
    cam = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  cam.position.z = 9;
  const mk = (f) => {
    const a = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) a.set(f(i / N, i), i * 3);
    return a;
  };
  const cloud = mk((t, i) => {
    const y = 1 - 2 * t,
      radius = Math.sqrt(1 - y * y) * (3.5 + Math.sin(i * 12.99) * 0.3),
      angle = i * 2.39996;
    return [
      radius * Math.cos(angle),
      y * 3.5,
      radius * Math.sin(angle),
    ];
  });
  const spiral = mk((t, i) => {
    const arm = i % 3,
      radius = 0.25 + Math.sqrt(t) * 5.2,
      angle = t * 18.85 + arm * 2.094;
    return [
      Math.cos(angle) * radius,
      Math.sin(i * 0.17) * 0.18 + R() * 0.08,
      Math.sin(angle) * radius,
    ];
  });
  const wave = mk((t, i) => {
    const cols = Math.ceil(Math.sqrt(N)),
      rows = Math.ceil(N / cols),
      x = ((i % cols) / (cols - 1) - 0.5) * 13,
      z = ((i / cols) | 0) / (rows - 1) * 10 - 5;
    return [
      x,
      Math.sin(x * 0.8 + z * 0.35) * 0.9 +
        Math.cos(z * 0.75 - x * 0.25) * 0.55,
      z,
    ];
  });
  const helix = mk((t, i) => {
    const angle = t * 25.13 + (i % 2) * Math.PI,
      radius = 1.8 + Math.sin(t * Math.PI * 6) * 0.45;
    return [
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      (t - 0.5) * 9,
    ];
  });
  const orbit = mk((t, i) => {
    const ring = i % 6,
      radius = 1.05 + ring * 0.62,
      angle = t * Math.PI * 2;
    return [
      Math.cos(angle) * radius,
      Math.sin(angle) * radius * Math.cos(ring * 0.28),
      Math.sin(angle) * radius * Math.sin(ring * 0.28) + (ring - 2.5) * 0.18,
    ];
  });
  const K = [cloud, spiral, wave, helix, orbit],
    pos = new Float32Array(cloud),
    g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(
    g,
    new THREE.PointsMaterial({
      size: mob ? 0.05 : 0.04,
      color: 0xc9f26b,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  sc.add(pts);
  const ico = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.4, 1),
    new THREE.MeshBasicMaterial({
      color: 0xeceae2,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    }),
  );
  ico.position.set(mob ? 2.2 : 4.6, 1, -1);
  sc.add(ico);
  const tor = new THREE.Mesh(
    new THREE.TorusGeometry(1.1, 0.02, 8, 90),
    new THREE.MeshBasicMaterial({
      color: 0xc9f26b,
      transparent: true,
      opacity: 0.45,
    }),
  );
  tor.position.set(mob ? -2.2 : -4.8, -1.5, -1);
  sc.add(tor);
  let sp = 0,
    mx = 0,
    my = 0,
    T = 0;
  addEventListener("pointermove", (e) => {
    mx = e.clientX / innerWidth - 0.5;
    my = e.clientY / innerHeight - 0.5;
  });
  const rs = () => {
    r.setSize(innerWidth, innerHeight, false);
    cam.aspect = innerWidth / innerHeight;
    cam.updateProjectionMatrix();
  };
  rs();
  addEventListener("resize", rs);
  (function loop() {
    requestAnimationFrame(loop);
    if (document.hidden) return;
    T += 0.016;
    const h = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    sp += (Math.min(1, scrollY / h) - sp) * 0.07;
    const f = sp * (K.length - 1),
      a = Math.min(K.length - 2, f | 0),
      m = f - a,
      e = m * m * (3 - 2 * m),
      A = K[a],
      B = K[a + 1];
    for (let i = 0; i < N * 3; i++)
      pos[i] += (A[i] + (B[i] - A[i]) * e - pos[i]) * 0.06;
    g.attributes.position.needsUpdate = true;
    pts.rotation.y = sp * 6.28 + T * 0.08 + mx * 0.6;
    pts.rotation.x = my * 0.35 + Math.sin(sp * 6) * 0.2;
    ico.rotation.x = T * 0.3 + sp * 8;
    ico.rotation.y = T * 0.2;
    ico.position.y = 1 + Math.sin(T) * 0.3 - sp * 3;
    tor.rotation.x = sp * 10 + T * 0.4;
    tor.rotation.y = T * 0.3;
    cam.position.x += (mx * 1.6 - cam.position.x) * 0.05;
    cam.position.y += (-my * 1.1 - cam.position.y) * 0.05;
    cam.lookAt(0, 0, 0);
    r.render(sc, cam);
  })();
})();
