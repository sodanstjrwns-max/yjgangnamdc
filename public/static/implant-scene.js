// ===== Photorealistic 3D Molar Tooth — Three.js r137 + GLTFLoader =====
(function () {
  'use strict';

  function waitForThree(cb, tries) {
    if (typeof THREE !== 'undefined' && typeof THREE.GLTFLoader !== 'undefined') return cb();
    if (tries > 200) {
      console.warn('[Molar3D] Three.js or GLTFLoader not available after 200 retries');
      return;
    }
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
    renderer.toneMappingExposure = 1.6;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.physicallyCorrectLights = true;
    container.appendChild(renderer.domElement);
    renderer.domElement.style.cursor = 'grab';
    renderer.domElement.style.touchAction = 'none';

    var scene = new THREE.Scene();
    scene.background = null;

    // ——— Camera ———
    var camera = new THREE.PerspectiveCamera(30, W / H, 0.1, 100);
    camera.position.set(0, 0.4, 4.2);
    camera.lookAt(0, 0, 0);

    // ——— Studio Environment Map ———
    var pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();

    var envScene = new THREE.Scene();
    envScene.add(new THREE.HemisphereLight(0xe8f4f4, 0x404050, 1.0));

    // Softbox panels
    var panels = [
      { pos: [3, 4, 2], color: 0xffffff, size: [6, 6] },
      { pos: [-3, 2, -2], color: 0xd8f0ef, size: [5, 5] },
      { pos: [0, 6, 0], color: 0xf0f8ff, size: [8, 4] },
      { pos: [0, -3, 0], color: 0x303040, size: [10, 10] }
    ];
    panels.forEach(function (p) {
      var m = new THREE.Mesh(
        new THREE.PlaneGeometry(p.size[0], p.size[1]),
        new THREE.MeshBasicMaterial({ color: p.color, side: THREE.DoubleSide })
      );
      m.position.set(p.pos[0], p.pos[1], p.pos[2]);
      m.lookAt(0, 0, 0);
      envScene.add(m);
    });

    var envMap = pmrem.fromScene(envScene, 0, 0.1, 50).texture;
    scene.environment = envMap;

    // ——— Lights ———
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    var keyLight = new THREE.DirectionalLight(0xfff5e8, 3.0);
    keyLight.position.set(4, 6, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.radius = 4;
    scene.add(keyLight);

    var fillLight = new THREE.DirectionalLight(0x80d8d8, 1.0);
    fillLight.position.set(-4, 3, -3);
    scene.add(fillLight);

    var rimLight = new THREE.DirectionalLight(0xffffff, 1.5);
    rimLight.position.set(0, 4, -6);
    scene.add(rimLight);

    var bottomLight = new THREE.DirectionalLight(0xa0c0c0, 0.4);
    bottomLight.position.set(0, -3, 2);
    scene.add(bottomLight);

    // Spot light for dramatic highlight
    var spotLight = new THREE.SpotLight(0xffffff, 2.0, 12, Math.PI / 6, 0.5, 1);
    spotLight.position.set(2, 5, 3);
    spotLight.target.position.set(0, 0, 0);
    scene.add(spotLight);
    scene.add(spotLight.target);

    // ——— Porcelain Crown Material (override GLB material) ———
    var crownMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf2ead8,
      metalness: 0.0,
      roughness: 0.22,
      transmission: 0.08,
      thickness: 1.0,
      clearcoat: 0.9,
      clearcoatRoughness: 0.06,
      envMapIntensity: 1.4,
      sheen: 0.6,
      sheenRoughness: 0.25,
      sheenColor: new THREE.Color(0xfff5e6),
      ior: 1.5,
      reflectivity: 0.5,
    });

    // Root material — slightly different tone
    var rootMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf0e2c8,
      metalness: 0.0,
      roughness: 0.45,
      clearcoat: 0.2,
      clearcoatRoughness: 0.3,
      envMapIntensity: 0.8,
    });

    // ——— Load GLB Model ———
    var toothGroup = new THREE.Group();
    scene.add(toothGroup);

    var loader = new THREE.GLTFLoader();
    loader.load(
      '/static/molar-tooth.glb',
      function (gltf) {
        var model = gltf.scene;

        // Apply porcelain material to all meshes
        model.traverse(function (child) {
          if (child.isMesh) {
            // Apply different materials to different parts based on Y position
            var bbox = new THREE.Box3().setFromObject(child);
            var centerY = (bbox.min.y + bbox.max.y) / 2;

            if (centerY < -0.2) {
              // Root area
              child.material = rootMaterial;
            } else {
              // Crown area
              child.material = crownMaterial;
            }

            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        // Scale and position
        var box = new THREE.Box3().setFromObject(model);
        var size = box.getSize(new THREE.Vector3());
        var maxDim = Math.max(size.x, size.y, size.z);
        var scale = 2.2 / maxDim;
        model.scale.setScalar(scale);

        // Re-center after scaling
        box.setFromObject(model);
        var center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        // Slight tilt for dynamic presentation
        model.rotation.x = 0.15;
        model.rotation.z = 0.05;

        toothGroup.add(model);

        console.log('[Molar3D] GLB model loaded successfully');

        // Hide loading hint if any
        var hint = document.getElementById('dragHint');
        if (hint) hint.textContent = '드래그하여 회전';
      },
      function (progress) {
        if (progress.total > 0) {
          var pct = Math.round((progress.loaded / progress.total) * 100);
          console.log('[Molar3D] Loading: ' + pct + '%');
        }
      },
      function (error) {
        console.error('[Molar3D] GLB load error:', error);
        // Fallback: create a simple procedural tooth
        createFallbackTooth(toothGroup, crownMaterial);
      }
    );

    // ——— Fallback procedural tooth ———
    function createFallbackTooth(group, mat) {
      // Simple molar shape
      var pts = [];
      for (var i = 0; i <= 32; i++) {
        var t = i / 32;
        var y = t * 1.8 - 0.9;
        var r;
        if (t < 0.3) r = 0.15 + t * 0.8;
        else if (t < 0.7) r = 0.39 + Math.sin((t - 0.3) / 0.4 * Math.PI) * 0.04;
        else {
          var tt = (t - 0.7) / 0.3;
          r = 0.40 * (1 - tt * tt * 0.7);
        }
        pts.push(new THREE.Vector2(Math.max(r, 0.01), y));
      }
      pts.push(new THREE.Vector2(0, 0.92));
      var geom = new THREE.LatheGeometry(pts, 48);
      var mesh = new THREE.Mesh(geom, mat);
      mesh.castShadow = true;
      group.add(mesh);
      console.log('[Molar3D] Fallback procedural tooth created');
    }

    // ——— Interaction ———
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
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(function () { userActive = false; }, 3000);
    }

    renderer.domElement.addEventListener('pointerdown', onDown);
    renderer.domElement.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('pointermove', onMove);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('touchend', onUp);

    // ——— Animation ———
    var clock = new THREE.Clock();
    var elapsed = 0;

    function animate() {
      requestAnimationFrame(animate);
      var dt = clock.getDelta();
      elapsed += dt;

      if (!isDragging) {
        velocity.x *= 0.94;
        velocity.y *= 0.94;
      }

      toothGroup.rotation.y += velocity.y;
      toothGroup.rotation.x += velocity.x;

      if (!userActive && !isDragging) {
        toothGroup.rotation.y += autoSpeed;
      }

      toothGroup.rotation.x = Math.max(-0.8, Math.min(0.8, toothGroup.rotation.x));

      // Gentle floating
      toothGroup.position.y = Math.sin(elapsed * 0.6) * 0.05;

      // Subtle light movement
      keyLight.position.x = 4 + Math.sin(elapsed * 0.3) * 0.5;
      spotLight.position.x = 2 + Math.cos(elapsed * 0.25) * 0.3;

      renderer.render(scene, camera);
    }
    animate();

    // ——— Responsive ———
    var resizeTO;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTO);
      resizeTO = setTimeout(function () {
        var w = container.clientWidth;
        var h = container.clientHeight;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }, 150);
    });

    console.log('[Molar3D] Scene initialized, loading GLB...');
  });
})();
