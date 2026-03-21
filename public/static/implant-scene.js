// ===== Photorealistic 3D Dental Implant — Three.js Procedural =====
// Features: Realistic titanium screw, abutment, porcelain crown
//           HDRI-like environment, physically-based materials, drag+auto rotation

(function () {
  'use strict';

  function waitForThree(cb, tries) {
    if (typeof THREE !== 'undefined') return cb();
    if (tries > 200) return console.warn('[Implant3D] Three.js failed to load after 200 retries');
    setTimeout(function () { waitForThree(cb, (tries || 0) + 1); }, 150);
  }

  waitForThree(function initScene() {
    var container = document.getElementById('implant3DContainer');
    if (!container) return;

    // ——— Renderer ———
    var W = container.clientWidth || 460;
    var H = container.clientHeight || 560;

    var renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    renderer.domElement.style.cursor = 'grab';
    renderer.domElement.style.touchAction = 'none';

    var scene = new THREE.Scene();
    scene.background = null;

    // ——— Camera ———
    var camera = new THREE.PerspectiveCamera(28, W / H, 0.1, 100);
    camera.position.set(0, 0.3, 5.8);
    camera.lookAt(0, -0.1, 0);

    // ——— Environment Map (procedural studio HDRI) ———
    var pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();

    // Create a studio-like environment
    var envScene = new THREE.Scene();
    var envHemi = new THREE.HemisphereLight(0xe8f4f4, 0x404050, 0.8);
    envScene.add(envHemi);
    // Soft box lights
    var softBox1 = new THREE.Mesh(
      new THREE.PlaneGeometry(6, 6),
      new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
    );
    softBox1.position.set(3, 3, 2);
    softBox1.lookAt(0, 0, 0);
    envScene.add(softBox1);
    var softBox2 = new THREE.Mesh(
      new THREE.PlaneGeometry(4, 4),
      new THREE.MeshBasicMaterial({ color: 0xd0f0ef, side: THREE.DoubleSide })
    );
    softBox2.position.set(-3, 2, -2);
    softBox2.lookAt(0, 0, 0);
    envScene.add(softBox2);
    var softBox3 = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 3),
      new THREE.MeshBasicMaterial({ color: 0xf0f8ff, side: THREE.DoubleSide })
    );
    softBox3.position.set(0, 5, 0);
    softBox3.lookAt(0, 0, 0);
    envScene.add(softBox3);
    // Floor reflection
    var floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshBasicMaterial({ color: 0x303040, side: THREE.DoubleSide })
    );
    floor.position.set(0, -4, 0);
    floor.rotation.x = -Math.PI / 2;
    envScene.add(floor);

    var envMap = pmrem.fromScene(envScene, 0, 0.1, 50).texture;
    scene.environment = envMap;
    envScene.traverse(function (obj) { if (obj.geometry) obj.geometry.dispose(); });

    // ——— Lights ———
    var ambLight = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambLight);

    // Key light (warm white)
    var keyLight = new THREE.DirectionalLight(0xfff8f0, 2.2);
    keyLight.position.set(4, 6, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.radius = 4;
    scene.add(keyLight);

    // Fill light (cool teal)
    var fillLight = new THREE.DirectionalLight(0x80d8d8, 0.8);
    fillLight.position.set(-4, 3, -3);
    scene.add(fillLight);

    // Rim light (from behind)
    var rimLight = new THREE.DirectionalLight(0xffffff, 1.2);
    rimLight.position.set(0, 4, -6);
    scene.add(rimLight);

    // Bottom fill (subtle)
    var bottomLight = new THREE.DirectionalLight(0xa0c0c0, 0.3);
    bottomLight.position.set(0, -3, 2);
    scene.add(bottomLight);

    // ——— Materials ———
    // Titanium — realistic brushed metal
    var titaniumMat = new THREE.MeshPhysicalMaterial({
      color: 0x9ea5ad,
      metalness: 0.95,
      roughness: 0.28,
      envMapIntensity: 1.8,
      clearcoat: 0.1,
      clearcoatRoughness: 0.4
    });

    // Polished titanium (abutment)
    var abutmentMat = new THREE.MeshPhysicalMaterial({
      color: 0xb0b8c0,
      metalness: 0.92,
      roughness: 0.15,
      envMapIntensity: 2.0,
      clearcoat: 0.3,
      clearcoatRoughness: 0.2
    });

    // Porcelain Crown — translucent ceramic
    var crownMat = new THREE.MeshPhysicalMaterial({
      color: 0xf0e8d8,
      metalness: 0.0,
      roughness: 0.25,
      transmission: 0.12,
      thickness: 1.2,
      clearcoat: 0.8,
      clearcoatRoughness: 0.08,
      envMapIntensity: 0.9,
      sheen: 0.5,
      sheenRoughness: 0.3,
      sheenColor: new THREE.Color(0xfff5e6),
      ior: 1.5,
      specularIntensity: 0.6,
      specularColor: new THREE.Color(0xffffff)
    });

    // Thread highlight
    var threadMat = new THREE.MeshPhysicalMaterial({
      color: 0x8a9199,
      metalness: 0.96,
      roughness: 0.35,
      envMapIntensity: 1.5
    });

    // ——— Build Implant ———
    var implantGroup = new THREE.Group();

    // ==== FIXTURE (Screw) ====
    var fixtureGroup = new THREE.Group();

    // Tapered screw body via LatheGeometry
    var bodyProfile = [];
    var bodyLen = 2.2;
    var rTop = 0.27;
    var rBot = 0.16;
    var segs = 40;
    for (var i = 0; i <= segs; i++) {
      var t = i / segs;
      // Slight curve for more realism
      var r = rTop + (rBot - rTop) * (t * t * 0.3 + t * 0.7);
      bodyProfile.push(new THREE.Vector2(r, -t * bodyLen));
    }
    // Tapered point
    bodyProfile.push(new THREE.Vector2(0.06, -bodyLen - 0.08));
    bodyProfile.push(new THREE.Vector2(0.02, -bodyLen - 0.14));
    bodyProfile.push(new THREE.Vector2(0, -bodyLen - 0.16));

    var bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
    var bodyMesh = new THREE.Mesh(bodyGeom, titaniumMat);
    bodyMesh.castShadow = true;
    fixtureGroup.add(bodyMesh);

    // Thread — realistic helical thread using torus segments
    var threadTurns = 16;
    for (var tt = 0; tt < threadTurns; tt++) {
      var frac = tt / threadTurns;
      var ty = -frac * bodyLen;
      var localR = rTop + (rBot - rTop) * (frac * frac * 0.3 + frac * 0.7);
      var threadOuterR = localR + 0.07 * (1 - frac * 0.4);
      var tubeR = 0.022 * (1 - frac * 0.3);

      var torusGeom = new THREE.TorusGeometry(threadOuterR, tubeR, 6, 64);
      var torusMesh = new THREE.Mesh(torusGeom, threadMat);
      torusMesh.position.y = ty;
      torusMesh.rotation.x = Math.PI / 2;
      // Helical tilt
      torusMesh.position.y += (tt % 2 === 0 ? 0.003 : -0.003);
      torusMesh.castShadow = true;
      fixtureGroup.add(torusMesh);
    }

    // Internal hex socket
    var hexShape = new THREE.Shape();
    var hexR = 0.11;
    for (var hi = 0; hi < 6; hi++) {
      var ha = (hi / 6) * Math.PI * 2 - Math.PI / 6;
      var hx = Math.cos(ha) * hexR;
      var hz = Math.sin(ha) * hexR;
      if (hi === 0) hexShape.moveTo(hx, hz);
      else hexShape.lineTo(hx, hz);
    }
    hexShape.closePath();
    var hexGeom = new THREE.ExtrudeGeometry(hexShape, { depth: 0.12, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.01, bevelSegments: 2 });
    var hexMesh = new THREE.Mesh(hexGeom, new THREE.MeshPhysicalMaterial({
      color: 0x606068,
      metalness: 0.95,
      roughness: 0.4,
      envMapIntensity: 1.0
    }));
    hexMesh.rotation.x = -Math.PI / 2;
    hexMesh.position.y = 0.06;
    fixtureGroup.add(hexMesh);

    // Platform/collar ring at top of fixture
    var platformGeom = new THREE.CylinderGeometry(0.29, 0.27, 0.06, 48);
    var platform = new THREE.Mesh(platformGeom, abutmentMat);
    platform.position.y = 0.03;
    platform.castShadow = true;
    fixtureGroup.add(platform);

    fixtureGroup.position.y = -0.55;
    implantGroup.add(fixtureGroup);

    // ==== ABUTMENT ====
    var abutmentGroup = new THREE.Group();

    // Base cylinder (connects to fixture)
    var abutBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.27, 0.18, 48),
      abutmentMat
    );
    abutBase.position.y = 0.09;
    abutBase.castShadow = true;
    abutmentGroup.add(abutBase);

    // Collar/transition ring
    var collarGeom = new THREE.CylinderGeometry(0.30, 0.30, 0.05, 48);
    var collar = new THREE.Mesh(collarGeom, abutmentMat);
    collar.position.y = 0.20;
    collar.castShadow = true;
    abutmentGroup.add(collar);

    // Machined marks — subtle ring grooves
    for (var ri = 0; ri < 3; ri++) {
      var ringY = 0.24 + ri * 0.04;
      var ringGeom = new THREE.TorusGeometry(0.255 - ri * 0.01, 0.004, 8, 48);
      var ringMesh = new THREE.Mesh(ringGeom, new THREE.MeshPhysicalMaterial({
        color: 0x909098,
        metalness: 0.95,
        roughness: 0.5
      }));
      ringMesh.position.y = ringY;
      ringMesh.rotation.x = Math.PI / 2;
      abutmentGroup.add(ringMesh);
    }

    // Tapered upper post
    var postProfile = [];
    var postSteps = 24;
    for (var pi = 0; pi <= postSteps; pi++) {
      var pt = pi / postSteps;
      var pr = 0.25 - pt * 0.10; // taper 0.25 → 0.15
      postProfile.push(new THREE.Vector2(pr, pt * 0.55));
    }
    var postGeom = new THREE.LatheGeometry(postProfile, 48);
    var postMesh = new THREE.Mesh(postGeom, abutmentMat);
    postMesh.position.y = 0.22;
    postMesh.castShadow = true;
    abutmentGroup.add(postMesh);

    // Retention grooves (vertical)
    for (var gi = 0; gi < 6; gi++) {
      var ga = (gi / 6) * Math.PI * 2;
      var groove = new THREE.Mesh(
        new THREE.BoxGeometry(0.012, 0.45, 0.012),
        new THREE.MeshPhysicalMaterial({ color: 0x808088, metalness: 0.95, roughness: 0.4 })
      );
      groove.position.set(Math.cos(ga) * 0.21, 0.47, Math.sin(ga) * 0.21);
      abutmentGroup.add(groove);
    }

    abutmentGroup.position.y = -0.42;
    implantGroup.add(abutmentGroup);

    // ==== CROWN (Porcelain) ====
    var crownGroup = new THREE.Group();

    // Realistic molar crown profile
    var cpSteps = 48;
    var crownPts = [];
    // Base connection
    crownPts.push(new THREE.Vector2(0.14, 0));
    crownPts.push(new THREE.Vector2(0.17, 0.01));
    // Curved body
    for (var ci = 0; ci <= cpSteps; ci++) {
      var ct = ci / cpSteps;
      var cy = ct * 0.95;
      var cr;
      if (ct < 0.08) {
        // Cervical margin (narrow, expanding)
        cr = 0.17 + ct * 2.8;
      } else if (ct < 0.2) {
        // Shoulder
        cr = 0.39 + Math.sin((ct - 0.08) / 0.12 * Math.PI * 0.5) * 0.06;
      } else if (ct < 0.65) {
        // Widest body (anatomical bulge)
        var bodyT = (ct - 0.2) / 0.45;
        cr = 0.44 + Math.sin(bodyT * Math.PI) * 0.04;
      } else if (ct < 0.85) {
        // Tapering toward occlusal
        var tapT = (ct - 0.65) / 0.2;
        cr = 0.44 - tapT * 0.08;
      } else {
        // Rounded occlusal surface
        var occT = (ct - 0.85) / 0.15;
        cr = 0.36 * Math.cos(occT * Math.PI * 0.5);
      }
      crownPts.push(new THREE.Vector2(Math.max(cr, 0.001), cy));
    }
    crownPts.push(new THREE.Vector2(0, 0.96));

    var crownGeom = new THREE.LatheGeometry(crownPts, 64);
    var crownMesh = new THREE.Mesh(crownGeom, crownMat);
    crownMesh.castShadow = true;
    crownMesh.receiveShadow = true;
    crownGroup.add(crownMesh);

    // Cusps — subtle bumps on top to mimic molar occlusal anatomy
    var cuspPositions = [
      { x: 0.12, z: 0.12, s: 0.09 },
      { x: -0.12, z: 0.12, s: 0.08 },
      { x: 0.12, z: -0.10, s: 0.085 },
      { x: -0.12, z: -0.10, s: 0.075 },
      { x: 0, z: 0, s: 0.06 }
    ];
    cuspPositions.forEach(function (cp) {
      var cuspGeom = new THREE.SphereGeometry(cp.s, 16, 12);
      var cuspMesh = new THREE.Mesh(cuspGeom, crownMat);
      cuspMesh.position.set(cp.x, 0.88, cp.z);
      cuspMesh.scale.y = 0.6;
      cuspMesh.castShadow = true;
      crownGroup.add(cuspMesh);
    });

    // Subtle incisal/enamel glow ring
    var glowRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.30, 0.008, 8, 64),
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0.3,
        transmission: 0.4,
        opacity: 0.3,
        transparent: true,
        envMapIntensity: 0.5
      })
    );
    glowRing.position.y = 0.80;
    glowRing.rotation.x = Math.PI / 2;
    crownGroup.add(glowRing);

    crownGroup.position.y = 0.32;
    implantGroup.add(crownGroup);

    // Center vertically
    implantGroup.position.y = 0.25;
    implantGroup.rotation.x = 0.08; // slight tilt for dynamic look
    scene.add(implantGroup);

    // ——— Interaction (manual drag rotation) ———
    var isDragging = false;
    var prevMouse = { x: 0, y: 0 };
    var velocity = { x: 0, y: 0 };
    var autoSpeed = 0.003;
    var userActive = false;
    var resumeTimer = null;

    function onDown(e) {
      isDragging = true;
      var pt = e.touches ? e.touches[0] : e;
      prevMouse.x = pt.clientX;
      prevMouse.y = pt.clientY;
      renderer.domElement.style.cursor = 'grabbing';
      userActive = true;
      clearTimeout(resumeTimer);
      var hint = document.getElementById('dragHint');
      if (hint) hint.style.opacity = '0';
    }
    function onMove(e) {
      if (!isDragging) return;
      e.preventDefault();
      var pt = e.touches ? e.touches[0] : e;
      var dx = pt.clientX - prevMouse.x;
      var dy = pt.clientY - prevMouse.y;
      velocity.y = dx * 0.007;
      velocity.x = dy * 0.003;
      prevMouse.x = pt.clientX;
      prevMouse.y = pt.clientY;
    }
    function onUp() {
      isDragging = false;
      renderer.domElement.style.cursor = 'grab';
      // Resume auto-rotate after 3 seconds
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(function () { userActive = false; }, 3000);
    }

    renderer.domElement.addEventListener('pointerdown', onDown);
    renderer.domElement.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('pointermove', onMove);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('touchend', onUp);

    // ——— Animation Loop ———
    var clock = new THREE.Clock();
    var elapsedTotal = 0;

    function animate() {
      requestAnimationFrame(animate);
      var dt = clock.getDelta();
      elapsedTotal += dt;

      // Damping momentum
      if (!isDragging) {
        velocity.x *= 0.94;
        velocity.y *= 0.94;
      }

      // Apply velocity
      implantGroup.rotation.y += velocity.y;
      implantGroup.rotation.x += velocity.x;

      // Auto-rotate when not user active
      if (!userActive && !isDragging) {
        implantGroup.rotation.y += autoSpeed;
      }

      // Clamp X rotation
      implantGroup.rotation.x = Math.max(-0.6, Math.min(0.6, implantGroup.rotation.x));

      // Gentle floating motion
      implantGroup.position.y = 0.25 + Math.sin(elapsedTotal * 0.6) * 0.06;

      // Subtle light animation
      keyLight.position.x = 4 + Math.sin(elapsedTotal * 0.3) * 0.5;
      fillLight.position.z = -3 + Math.cos(elapsedTotal * 0.4) * 0.3;

      renderer.render(scene, camera);
    }
    animate();

    // ——— Responsive ———
    var resizeTimeout;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function () {
        var w = container.clientWidth;
        var h = container.clientHeight;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }, 150);
    });

    console.log('[Implant3D] Photorealistic 3D implant scene initialized');
  });
})();
