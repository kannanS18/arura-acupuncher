import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * 🧘 ZenAuraCanvas — Three.js 3D Meridian & Energetic Qi Visualizer
 * Brother 2 (Motion Physics) & Brother 6 (Spatial WebGL)
 * 60 FPS Hardware-Accelerated Ambient Healing Sphere
 */
export default function ZenAuraCanvas({ scrollProgress = 0 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // 2. Core Meridian Aura Geometry (Multi-layered torus knots & particle rings)
    const group = new THREE.Group();
    scene.add(group);

    // Inner Radiant Energy Core
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 3);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x66478d,
      emissive: 0xed3373,
      emissiveIntensity: 0.35,
      roughness: 0.2,
      metalness: 0.1,
      transmission: 0.8,
      thickness: 1.2,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // Meridian Orbital Rings (Acupuncture Meridian Circuits)
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0xed3373, transparent: true, opacity: 0.6, wireframe: true });
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x8a6fa9, transparent: true, opacity: 0.5, wireframe: true });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.02, 16, 100), ringMat1);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.015, 16, 100), ringMat2);
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.01, 16, 100), ringMat1);

    ring1.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    ring3.rotation.z = Math.PI / 6;

    group.add(ring1, ring2, ring3);

    // Floating Acupoints (Glowing Point Nodes along meridians)
    const nodeCount = 18;
    const nodeGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const nodes = [];

    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      const theta = (i / nodeCount) * Math.PI * 2;
      const radius = 1.8;
      node.position.set(
        Math.cos(theta) * radius,
        Math.sin(theta) * radius * Math.cos(Math.PI / 3),
        Math.sin(theta) * radius * Math.sin(Math.PI / 3)
      );
      group.add(node);
      nodes.push({ mesh: node, baseTheta: theta, speed: 0.01 + (i % 3) * 0.005 });
    }

    // Floating Qi Energy Particle Dust (Aura mist)
    const particleCount = 160;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorPurple = new THREE.Color(0x66478d);
    const colorPink = new THREE.Color(0xed3373);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const r = 2.0 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);

      const mixed = colorPurple.clone().lerp(colorPink, Math.random());
      colors[i] = mixed.r;
      colors[i + 1] = mixed.g;
      colors[i + 2] = mixed.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    const pointLight1 = new THREE.PointLight(0xed3373, 2.5, 20);
    pointLight1.position.set(4, 3, 4);
    const pointLight2 = new THREE.PointLight(0x66478d, 2.0, 20);
    pointLight2.position.set(-4, -3, -2);

    scene.add(ambientLight, pointLight1, pointLight2);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = currentMount.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / height) * 2 - 1);
      targetX = x * 0.4;
      targetY = y * 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Scroll Reactive Zoom / Rotation
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY || window.pageYOffset;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Dynamic rotations influenced by scroll
      const scrollRotationMultiplier = 1 + Math.min(scrollY * 0.001, 2.5);
      group.rotation.y += 0.003 * scrollRotationMultiplier;
      group.rotation.x = mouseY + Math.sin(elapsed * 0.5) * 0.1;
      group.rotation.z = mouseX + Math.cos(elapsed * 0.3) * 0.05;

      // Counter-rotating rings
      ring1.rotation.z += 0.005;
      ring2.rotation.x -= 0.004;
      ring3.rotation.y += 0.003;

      // Pulsing acupoints
      nodes.forEach((node, idx) => {
        const pulse = 1 + Math.sin(elapsed * 3 + idx) * 0.35;
        node.mesh.scale.set(pulse, pulse, pulse);
      });

      // Subtle breathing scale
      const breath = 1 + Math.sin(elapsed * 0.8) * 0.03;
      coreMesh.scale.set(breath, breath, breath);

      // Camera responsive subtle float
      camera.position.y = Math.sin(elapsed * 0.4) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px] flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing" />
      {/* Floating subtle overlay label */}
      <div className="absolute bottom-4 right-4 z-10 pointer-events-none bg-white/70 backdrop-blur-md px-3 py-1 rounded-full border border-purple-100 shadow-sm text-[10px] font-semibold text-[#66478d] flex items-center space-x-1.5">
        <span className="w-2 h-2 rounded-full bg-[#581c87] animate-ping" />
        <span>Live 3D Meridian Simulation • Touch Reactive</span>
      </div>
    </div>
  );
}
