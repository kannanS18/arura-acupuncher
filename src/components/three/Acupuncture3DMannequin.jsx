import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RotateCw, ZoomIn, Info, CheckCircle2, Sparkles } from 'lucide-react';

/**
 * 🧘 Acupuncture3DMannequin — Interactive 3D Meridian Anatomy
 * Built with Three.js & OrbitControls
 * Brother 2 (Motion Physics), Brother 6 (3D Spatial Master)
 */
export const ACUPOINTS = [
  { id: 'gv20', name: 'GV20 (Baihui)', location: 'Crown of Head', position: [0, 2.55, 0], heals: 'Chronic Migraines, Severe Anxiety, Insomnia & Stroke Recovery', meridian: 'Governing Vessel' },
  { id: 'gb20', name: 'GB20 (Fengchi)', location: 'Base of Skull', position: [0.35, 2.15, -0.4], heals: 'Cervical Neck Stiffness, Tension Headaches & Sinusitis', meridian: 'Gallbladder Channel' },
  { id: 'cv17', name: 'CV17 (Danzhong)', location: 'Center of Chest', position: [0, 1.35, 0.55], heals: 'Emotional Burnout, Anxiety Panic, Palpitations & Asthma', meridian: 'Conception Vessel' },
  { id: 'cv12', name: 'CV12 (Zhongwan)', location: 'Upper Abdomen', position: [0, 0.85, 0.52], heals: 'Gastritis, GERD Acidity, Indigestion & Chronic Bloating', meridian: 'Conception Vessel' },
  { id: 'cv4', name: 'CV4 (Guanyuan)', location: 'Lower Abdomen', position: [0, 0.25, 0.48], heals: 'Menstrual Cramps, Infertility, Reproductive & Bladder Qi', meridian: 'Conception Vessel' },
  { id: 'li4', name: 'LI4 (Hegu)', location: 'Hand Webbing (Right)', position: [1.25, 0.35, 0.2], heals: 'Facial Pain, Toothache, Acute Headaches & Stress Relief', meridian: 'Large Intestine' },
  { id: 'pc6', name: 'PC6 (Neiguan)', location: 'Inner Wrist (Left)', position: [-1.15, 0.55, 0.25], heals: 'Nausea, Motion Sickness, Sleep Deprivation & Heart Rest', meridian: 'Pericardium' },
  { id: 'st36', name: 'ST36 (Zusanli)', location: 'Below Knee (Right)', position: [0.45, -1.35, 0.45], heals: 'Low Immunity, Chronic Fatigue, Digestion & Joint Strength', meridian: 'Stomach Channel' },
  { id: 'sp6', name: 'SP6 (Sanyinjiao)', location: 'Lower Leg (Left)', position: [-0.4, -2.15, 0.35], heals: 'Hormonal Imbalance, Dysmenorrhea & Pelvic Inflammation', meridian: 'Spleen Channel' },
  { id: 'bl23', name: 'BL23 (Shenshu)', location: 'Lower Back', position: [0.35, 0.7, -0.5], heals: 'Lower Back Pain, Sciatica, Kidney Vitality & Knee Weakness', meridian: 'Bladder Channel' }
];

export default function Acupuncture3DMannequin({ onSelectAcupoint, activeAcupointId }) {
  const mountRef = useRef(null);
  const [selectedPoint, setSelectedPoint] = useState(ACUPOINTS[0]);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const controlsRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 6.2);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    currentMount.appendChild(renderer.domElement);

    // 2. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 9;
    controls.minDistance = 3.5;
    controls.autoRotate = isAutoRotate;
    controls.autoRotateSpeed = 1.2;
    controls.target.set(0, 0.2, 0);
    controlsRef.current = controls;

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const purpleLight = new THREE.PointLight(0x66478d, 4.5, 20);
    purpleLight.position.set(5, 5, 5);
    scene.add(purpleLight);

    const magentaLight = new THREE.PointLight(0xed3373, 5.0, 20);
    magentaLight.position.set(-5, -2, 5);
    scene.add(magentaLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.5);
    rimLight.position.set(0, 8, -6);
    scene.add(rimLight);

    // 4. Mannequin Body Group (Stylized Aesthetic Anatomical Silhouette)
    const mannequinGroup = new THREE.Group();
    scene.add(mannequinGroup);

    // Obsidian/Silk Material
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x181422,
      emissive: 0x241538,
      roughness: 0.25,
      metalness: 0.15,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      transparent: true,
      opacity: 0.92
    });

    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x8a6fa9,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });

    // Head
    const headGeo = new THREE.SphereGeometry(0.55, 32, 32);
    headGeo.scale(0.85, 1.1, 0.9);
    const head = new THREE.Mesh(headGeo, bodyMaterial);
    head.position.y = 2.0;
    mannequinGroup.add(head);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.22, 0.28, 0.35, 24);
    const neck = new THREE.Mesh(neckGeo, bodyMaterial);
    neck.position.y = 1.5;
    mannequinGroup.add(neck);

    // Torso (Upper Chest)
    const chestGeo = new THREE.CylinderGeometry(0.7, 0.55, 0.9, 24);
    chestGeo.scale(1.2, 1, 0.7);
    const chest = new THREE.Mesh(chestGeo, bodyMaterial);
    chest.position.y = 1.0;
    mannequinGroup.add(chest);

    // Abdomen & Pelvis
    const pelvisGeo = new THREE.CylinderGeometry(0.55, 0.58, 0.9, 24);
    pelvisGeo.scale(1.05, 1, 0.75);
    const pelvis = new THREE.Mesh(pelvisGeo, bodyMaterial);
    pelvis.position.y = 0.2;
    mannequinGroup.add(pelvis);

    // Arms
    const armGeo = new THREE.CylinderGeometry(0.18, 0.12, 1.6, 16);
    const leftArm = new THREE.Mesh(armGeo, bodyMaterial);
    leftArm.position.set(-1.05, 0.6, 0.1);
    leftArm.rotation.z = Math.PI / 12;
    mannequinGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, bodyMaterial);
    rightArm.position.set(1.05, 0.6, 0.1);
    rightArm.rotation.z = -Math.PI / 12;
    mannequinGroup.add(rightArm);

    // Legs
    const legGeo = new THREE.CylinderGeometry(0.25, 0.16, 2.2, 20);
    const leftLeg = new THREE.Mesh(legGeo, bodyMaterial);
    leftLeg.position.set(-0.4, -1.25, 0.05);
    mannequinGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, bodyMaterial);
    rightLeg.position.set(0.4, -1.25, 0.05);
    mannequinGroup.add(rightLeg);

    // Meridian Glowing Lines (Splines along Central Ren & Du Meridians)
    const curvePoints1 = [
      new THREE.Vector3(0, 2.55, 0),
      new THREE.Vector3(0, 2.0, 0.5),
      new THREE.Vector3(0, 1.35, 0.55),
      new THREE.Vector3(0, 0.85, 0.52),
      new THREE.Vector3(0, 0.25, 0.48),
      new THREE.Vector3(0, -0.3, 0.35)
    ];
    const curve1 = new THREE.CatmullRomCurve3(curvePoints1);
    const meridianTubeGeo1 = new THREE.TubeGeometry(curve1, 64, 0.018, 8, false);
    const meridianTubeMat = new THREE.MeshBasicMaterial({ color: 0xed3373 });
    const meridian1 = new THREE.Mesh(meridianTubeGeo1, meridianTubeMat);
    mannequinGroup.add(meridian1);

    // Glowing Acupoint Nodes
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const pointMeshes = [];

    ACUPOINTS.forEach((pt) => {
      // Glow Core Sphere
      const sphereGeo = new THREE.SphereGeometry(0.065, 16, 16);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xed3373,
        emissiveIntensity: 3.0,
        roughness: 0.1
      });
      const mesh = new THREE.Mesh(sphereGeo, sphereMat);
      mesh.position.set(...pt.position);
      mesh.userData = pt;
      mannequinGroup.add(mesh);
      pointMeshes.push(mesh);

      // Pulsing Halo Ring
      const ringGeo = new THREE.RingGeometry(0.08, 0.12, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xed3373,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(...pt.position);
      ring.position.z += 0.02;
      mannequinGroup.add(ring);
      mesh.userData.halo = ring;
    });

    // Click handler for 3D Pins
    const handleCanvasClick = (e) => {
      const rect = currentMount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(pointMeshes);

      if (intersects.length > 0) {
        const pt = intersects[0].object.userData;
        setSelectedPoint(pt);
        if (onSelectAcupoint) onSelectAcupoint(pt);
      }
    };

    currentMount.addEventListener('click', handleCanvasClick);

    // Particle Aura Halo Dust
    const particleCount = 120;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 3.5;
      pPos[i + 1] = (Math.random() - 0.5) * 5.0;
      pPos[i + 2] = (Math.random() - 0.5) * 3.0;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xed3373,
      size: 0.035,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(pGeo, pMat);
    mannequinGroup.add(particles);

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      controls.update();

      // Pulse halos
      pointMeshes.forEach((p, idx) => {
        if (p.userData.halo) {
          const s = 1 + Math.sin(elapsed * 4 + idx) * 0.3;
          p.userData.halo.scale.set(s, s, s);
          p.userData.halo.lookAt(camera.position);
        }
      });

      // Subtle breathing
      particles.rotation.y = elapsed * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      currentMount.removeEventListener('click', handleCanvasClick);
      window.removeEventListener('resize', handleResize);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isAutoRotate]);

  return (
    <div className="relative w-full h-[520px] lg:h-[620px] bg-gradient-to-b from-[#14101e] to-[#0c0a12] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
      {/* 3D Canvas */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating 3D Controls */}
      <div className="absolute top-4 left-4 z-20 flex items-center space-x-2">
        <button
          onClick={() => setIsAutoRotate(!isAutoRotate)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border transition-all flex items-center space-x-1.5 ${
            isAutoRotate ? 'bg-[#581c87] text-white border-pink-400/50' : 'bg-black/40 text-gray-300 border-white/10'
          }`}
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>{isAutoRotate ? 'Orbit: ON' : 'Orbit: PAUSED'}</span>
        </button>
        <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-gray-300 border border-white/10 text-xs">
          <ZoomIn className="w-3.5 h-3.5 text-[#581c87]" />
          <span>Drag to 360° Rotate • Click Nodes</span>
        </div>
      </div>

      {/* Selected Acupoint Detail Panel (Live Interactive HUD) */}
      {selectedPoint && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-20 p-5 rounded-2xl bg-[#1b1726]/95 backdrop-blur-xl border border-[#581c87]/30 shadow-2xl text-white space-y-3 animate-slideUp">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#581c87] animate-ping" />
              <strong className="text-sm font-bold text-white tracking-wide">{selectedPoint.name}</strong>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-purple-900/50 text-purple-200 border border-purple-700/40">
              {selectedPoint.meridian}
            </span>
          </div>

          <div className="text-xs text-gray-300 space-y-1">
            <div><span className="text-gray-400 font-medium">Anatomical Locus:</span> {selectedPoint.location}</div>
            <div>
              <span className="text-[#581c87] font-bold">Clinical Action:</span> {selectedPoint.heals}
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
            <span className="flex items-center space-x-1 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Sterile Needling Safe</span>
            </span>
            <span className="text-gray-400 ">Arura Clinical Map</span>
          </div>
        </div>
      )}
    </div>
  );
}
