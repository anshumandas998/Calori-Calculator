import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Hero3DCanvas - Interactive 3D WebGL Canvas for the Landing Page Hero
 *
 * Features:
 * - 3D Glassmorphic Apple / Nutrition Core with transmission & specular sheen
 * - 3 Concentric Orbiting Macro Rings (Protein Emerald, Carbs Gold, Fats Coral)
 * - Orbiting Nutrient Microspheres with dynamic physics
 * - Ambient 3D floating energy particles
 * - Mouse-driven camera damping and interactive tilt
 * - High-DPI support, automatic cleanup, and 60fps performance
 */
export default function Hero3DCanvas({ className, style }) {
  const containerRef = useRef(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL support
    try {
      const testCanvas = document.createElement("canvas");
      if (!Boolean(window.WebGLRenderingContext && (testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl")))) {
        setIsSupported(false);
        return;
      }
    } catch (_) {
      setIsSupported(false);
      return;
    }

    // ─── 1. Scene & Camera Setup ───
    const scene = new THREE.Scene();

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0, width < 480 ? 10.8 : width < 768 ? 9.8 : 9);

    // ─── 2. Renderer Setup ───
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch (e) {
      console.warn("WebGL renderer creation failed:", e);
      setIsSupported(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // ─── 3. Lighting Setup ───
    const ambientLight = new THREE.AmbientLight(0xfffbf5, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x237a44, 2.5);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf59e0b, 1.8);
    fillLight.position.set(-6, -3, 4);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x10b981, 2.0, 15);
    rimLight.position.set(0, 4, -3);
    scene.add(rimLight);

    const softPoint = new THREE.PointLight(0xffedd5, 1.5, 10);
    softPoint.position.set(0, 0, 5);
    scene.add(softPoint);

    // ─── 4. 3D Model Hierarchy ───
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Core Glass Apple Mesh
    const appleShape = new THREE.SphereGeometry(1.35, 48, 48);
    // Slight vertical deformation to give an organic apple taper
    const pos = appleShape.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const x = pos.getX(i);
      const z = pos.getZ(i);
      // Indent top and bottom slightly
      if (y > 0.9) {
        pos.setY(i, y - 0.12 * Math.sin((y - 0.9) * 3));
      } else if (y < -0.9) {
        pos.setY(i, y + 0.15 * Math.sin((-y - 0.9) * 3));
      }
      // Widen upper-middle
      if (y > 0 && y < 1.0) {
        const factor = 1.05 + 0.08 * (1 - Math.abs(y - 0.5));
        pos.setX(i, x * factor);
        pos.setZ(i, z * factor);
      }
    }
    appleShape.computeVertexNormals();

    const appleMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x237a44,
      emissive: 0x0f3d1f,
      emissiveIntensity: 0.25,
      roughness: 0.18,
      metalness: 0.08,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      transmission: 0.55,
      ior: 1.45,
      transparent: true,
      opacity: 0.92,
    });
    const appleMesh = new THREE.Mesh(appleShape, appleMaterial);
    mainGroup.add(appleMesh);

    // Stem (Curved Cylinder)
    const stemCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(0, 1.25, 0),
      new THREE.Vector3(0.08, 1.5, 0),
      new THREE.Vector3(0.18, 1.7, 0.05),
      new THREE.Vector3(0.25, 1.85, 0.1)
    );
    const stemGeo = new THREE.TubeGeometry(stemCurve, 20, 0.065, 12, false);
    const stemMat = new THREE.MeshStandardMaterial({
      color: 0x6b4f2c,
      roughness: 0.6,
      metalness: 0.1,
    });
    const stemMesh = new THREE.Mesh(stemGeo, stemMat);
    mainGroup.add(stemMesh);

    // Leaf (Rotated Ellipsoid)
    const leafGeo = new THREE.SphereGeometry(0.35, 24, 16);
    leafGeo.scale(1.2, 0.35, 0.6);
    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      roughness: 0.3,
      metalness: 0.15,
      emissive: 0x064e3b,
      emissiveIntensity: 0.2,
    });
    const leafMesh = new THREE.Mesh(leafGeo, leafMat);
    leafMesh.position.set(0.32, 1.65, 0.05);
    leafMesh.rotation.set(0.3, -0.4, 0.6);
    mainGroup.add(leafMesh);

    // ─── 5. Orbiting 3D Macro Rings ───
    const rings = [];

    // Ring 1: Protein (Emerald Green)
    const ring1Geo = new THREE.TorusGeometry(2.15, 0.048, 24, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.7,
      roughness: 0.25,
      metalness: 0.8,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    mainGroup.add(ring1);
    rings.push({ mesh: ring1, rotSpeedX: 0.004, rotSpeedY: 0.007 });

    // Ring 2: Carbs (Gold / Amber)
    const ring2Geo = new THREE.TorusGeometry(2.55, 0.045, 24, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.85,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 5;
    mainGroup.add(ring2);
    rings.push({ mesh: ring2, rotSpeedX: -0.005, rotSpeedZ: 0.006 });

    // Ring 3: Fats (Coral / Ruby)
    const ring3Geo = new THREE.TorusGeometry(2.95, 0.04, 24, 100);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      emissive: 0xe11d48,
      emissiveIntensity: 0.5,
      roughness: 0.3,
      metalness: 0.75,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.y = Math.PI / 2.5;
    ring3.rotation.z = -Math.PI / 6;
    mainGroup.add(ring3);
    rings.push({ mesh: ring3, rotSpeedY: 0.006, rotSpeedZ: -0.004 });

    // ─── 6. Orbiting Satellites / Micronutrient Spheres ───
    const satellites = [];
    const satColors = [0x10b981, 0xf59e0b, 0xf43f5e, 0x06b6d4, 0x8b5cf6];
    for (let i = 0; i < 5; i++) {
      const satGeo = new THREE.SphereGeometry(0.12, 20, 20);
      const satMat = new THREE.MeshStandardMaterial({
        color: satColors[i % satColors.length],
        emissive: satColors[i % satColors.length],
        emissiveIntensity: 0.9,
        roughness: 0.1,
        metalness: 0.9,
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      mainGroup.add(satMesh);
      satellites.push({
        mesh: satMesh,
        radius: 2.2 + i * 0.22,
        speed: 0.015 + i * 0.004,
        angle: (i * Math.PI * 2) / 5,
        inclination: (i * 0.45) - 0.9,
      });
    }

    // ─── 7. Floating 3D Nutrient Star Dust (Particles) ───
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 12;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      particleScales[i] = Math.random() * 0.05 + 0.02;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x237a44,
      size: 0.08,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // ─── 8. Mouse & Pointer Interaction ───
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      targetMouseX = (x - 0.5) * 2;
      targetMouseY = (y - 0.5) * 2;
    };

    const onTouchMove = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];
      const rect = container.getBoundingClientRect();
      const x = (touch.clientX - rect.left) / rect.width;
      const y = (touch.clientY - rect.top) / rect.height;
      targetMouseX = (x - 0.5) * 2.2;
      targetMouseY = (y - 0.5) * 2.2;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchstart", onTouchMove, { passive: true });

    // ─── 9. Animation Loop ───
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Damped mouse follow
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      // Group orientation
      mainGroup.rotation.y = elapsed * 0.25 + currentMouseX * 0.45;
      mainGroup.rotation.x = Math.sin(elapsed * 0.3) * 0.12 - currentMouseY * 0.45;
      mainGroup.position.y = Math.sin(elapsed * 0.9) * 0.12;

      // Rotate individual macro rings
      rings.forEach((r) => {
        if (r.rotSpeedX) r.mesh.rotation.x += r.rotSpeedX;
        if (r.rotSpeedY) r.mesh.rotation.y += r.rotSpeedY;
        if (r.rotSpeedZ) r.mesh.rotation.z += r.rotSpeedZ;
      });

      // Orbit satellites
      satellites.forEach((sat) => {
        sat.angle += sat.speed;
        sat.mesh.position.x = Math.cos(sat.angle) * sat.radius;
        sat.mesh.position.z = Math.sin(sat.angle) * sat.radius;
        sat.mesh.position.y = Math.sin(sat.angle * 2 + sat.inclination) * 0.7;
      });

      // Gentle floating particle sway
      particleSystem.rotation.y = elapsed * 0.03;
      particleSystem.rotation.x = Math.sin(elapsed * 0.05) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // ─── 10. Resize Observer ───
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || 500;
      const newHeight = container.clientHeight || 500;
      camera.aspect = newWidth / newHeight;
      camera.position.z = newWidth < 480 ? 10.8 : newWidth < 768 ? 9.8 : 9;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // ─── 11. Cleanup ───
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchstart", onTouchMove);
      resizeObserver.disconnect();

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }

      // Dispose resources
      appleShape.dispose();
      appleMaterial.dispose();
      stemGeo.dispose();
      stemMat.dispose();
      leafGeo.dispose();
      leafMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!isSupported) {
    // Graceful fallback: high-res logo with glowing aura
    return (
      <div
        className={className}
        style={{
          width: "100%",
          height: "100%",
          minHeight: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          ...style,
        }}
      >
        <img
          src="/apple-gauge-logo.svg"
          alt="Calory 3D Core"
          style={{ width: 180, height: 180, filter: "drop-shadow(0 20px 40px rgba(35,122,68,0.3))" }}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        minHeight: 420,
        position: "relative",
        cursor: "grab",
        userSelect: "none",
        touchAction: "none",
        ...style,
      }}
    />
  );
}
