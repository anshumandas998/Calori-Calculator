import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Calculator3DCanvas - Real-time 3D Calorie Torus Gauge for the Interactive Calculator
 *
 * Props:
 * @param {number} targetCalories - Daily target calories (e.g. 2150)
 * @param {number} tdee - Maintenance calories
 * @param {string} goal - "lose" | "maintain" | "gain"
 * @param {number} protein - Grams of protein
 * @param {number} carbs - Grams of carbs
 * @param {number} fat - Grams of fat
 */
export default function Calculator3DCanvas({
  targetCalories = 2000,
  tdee = 2200,
  goal = "maintain",
  protein = 150,
  carbs = 240,
  fat = 60,
  style,
}) {
  const containerRef = useRef(null);
  const targetCalRef = useRef(targetCalories);
  const goalRef = useRef(goal);

  useEffect(() => {
    targetCalRef.current = targetCalories;
    goalRef.current = goal;
  }, [targetCalories, goal]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL support
    try {
      const testCanvas = document.createElement("canvas");
      if (!Boolean(window.WebGLRenderingContext && (testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl")))) {
        return;
      }
    } catch (_) {
      return;
    }

    const scene = new THREE.Scene();
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) {
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // Lights
    const ambLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambLight);

    const dirLight1 = new THREE.DirectionalLight(0x237a44, 2.5);
    dirLight1.position.set(3, 4, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf59e0b, 1.8);
    dirLight2.position.set(-3, -2, 2);
    scene.add(dirLight2);

    const group = new THREE.Group();
    scene.add(group);

    // Main 3D Calorie Ring (Torus)
    const torusGeo = new THREE.TorusGeometry(1.5, 0.14, 32, 120);
    const torusMat = new THREE.MeshPhysicalMaterial({
      color: 0x237a44,
      emissive: 0x10b981,
      emissiveIntensity: 0.45,
      roughness: 0.2,
      metalness: 0.6,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    group.add(torusMesh);

    // Inner glowing ring
    const innerGeo = new THREE.TorusGeometry(1.28, 0.04, 20, 80);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.75,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    // 3 Orbiting Macro Spheres on Torus
    const pSphereGeo = new THREE.SphereGeometry(0.13, 20, 20);
    const pMat = new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x10b981, emissiveIntensity: 0.9 });
    const pSphere = new THREE.Mesh(pSphereGeo, pMat);
    group.add(pSphere);

    const cSphereGeo = new THREE.SphereGeometry(0.12, 20, 20);
    const cMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 0.9 });
    const cSphere = new THREE.Mesh(cSphereGeo, cMat);
    group.add(cSphere);

    const fSphereGeo = new THREE.SphereGeometry(0.11, 20, 20);
    const fMat = new THREE.MeshStandardMaterial({ color: 0xf43f5e, emissive: 0xf43f5e, emissiveIntensity: 0.9 });
    const fSphere = new THREE.Mesh(fSphereGeo, fMat);
    group.add(fSphere);

    // Subtle Particle Aura
    const auraCount = 50;
    const auraGeo = new THREE.BufferGeometry();
    const auraPositions = new Float32Array(auraCount * 3);
    for (let i = 0; i < auraCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 1.3 + Math.random() * 0.45;
      auraPositions[i * 3] = Math.cos(angle) * r;
      auraPositions[i * 3 + 1] = Math.sin(angle) * r;
      auraPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }
    auraGeo.setAttribute("position", new THREE.BufferAttribute(auraPositions, 3));
    const auraMat = new THREE.PointsMaterial({
      color: 0x10b981,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const aura = new THREE.Points(auraGeo, auraMat);
    group.add(aura);

    // Mouse Interaction
    let targetRotX = 0.3;
    let targetRotY = 0.2;
    const onMove = (e) => {
      const r = container.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      targetRotY = nx * 1.2;
      targetRotX = -ny * 1.2;
    };
    container.addEventListener("pointermove", onMove, { passive: true });

    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Dynamic color adjustment by goal
      const currentGoal = goalRef.current;
      if (currentGoal === "lose") {
        torusMat.color.setHex(0x237a44);
        torusMat.emissive.setHex(0x10b981);
      } else if (currentGoal === "gain") {
        torusMat.color.setHex(0xb45309);
        torusMat.emissive.setHex(0xf59e0b);
      } else {
        torusMat.color.setHex(0x237a44);
        torusMat.emissive.setHex(0x059669);
      }

      // Smooth rotate & mouse lag
      group.rotation.y += (targetRotY - group.rotation.y) * 0.05;
      group.rotation.x += (targetRotX - group.rotation.x) * 0.05;
      group.rotation.z = Math.sin(elapsed * 0.8) * 0.08;

      // Orbit macro spheres along the torus
      const pAngle = elapsed * 1.4;
      pSphere.position.set(Math.cos(pAngle) * 1.5, Math.sin(pAngle) * 1.5, 0);

      const cAngle = elapsed * 1.4 + 2.1;
      cSphere.position.set(Math.cos(cAngle) * 1.5, Math.sin(cAngle) * 1.5, 0);

      const fAngle = elapsed * 1.4 + 4.2;
      fSphere.position.set(Math.cos(fAngle) * 1.5, Math.sin(fAngle) * 1.5, 0);

      aura.rotation.z = elapsed * 0.2;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth || 320;
      const nh = container.clientHeight || 320;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("pointermove", onMove);
      ro.disconnect();
      if (renderer.domElement?.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      torusGeo.dispose();
      torusMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      pSphereGeo.dispose();
      pMat.dispose();
      cSphereGeo.dispose();
      cMat.dispose();
      fSphereGeo.dispose();
      fMat.dispose();
      auraGeo.dispose();
      auraMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: 280,
        position: "relative",
        cursor: "grab",
        userSelect: "none",
        touchAction: "none",
        ...style,
      }}
    />
  );
}
