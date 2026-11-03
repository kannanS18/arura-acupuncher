import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  Maximize2, 
  Minimize2, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Sparkles, 
  Check, 
  Flame, 
  Hand,
  Activity,
  Layers,
  ZoomIn
} from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';

// Authentic Web Audio Synthesizer (Snap Pop + Ethereal Wind Whoosh + 528Hz Harmonic Chime)
function playAcuSound(type, isMuted) {
  if (isMuted || typeof window === 'undefined') return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === 'snap') {
      // 1. Crisp Thanos Finger Snap Pop
      const snapOsc = ctx.createOscillator();
      const snapGain = ctx.createGain();
      snapOsc.type = 'triangle';
      snapOsc.frequency.setValueAtTime(1450, ctx.currentTime);
      snapOsc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.08);

      snapGain.gain.setValueAtTime(0.7, ctx.currentTime);
      snapGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

      snapOsc.connect(snapGain);
      snapGain.connect(ctx.destination);
      snapOsc.start();
      snapOsc.stop(ctx.currentTime + 0.09);

      // 2. Wind / Ash Dissolve Ethereal Whoosh
      const bufferSize = ctx.sampleRate * 1.5;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(950, ctx.currentTime + 0.04);
      filter.frequency.exponentialRampToValueAtTime(260, ctx.currentTime + 1.3);
      filter.Q.value = 3.2;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.01, ctx.currentTime);
      noiseGain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.12);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      whiteNoise.start(ctx.currentTime + 0.04);
      whiteNoise.stop(ctx.currentTime + 1.5);

      // 3. Harmonic 528 Hz Healing Tone
      setTimeout(() => {
        try {
          const toneOsc = ctx.createOscillator();
          const toneGain = ctx.createGain();
          toneOsc.type = 'sine';
          toneOsc.frequency.value = 528;
          toneGain.gain.setValueAtTime(0.2, ctx.currentTime);
          toneGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);
          toneOsc.connect(toneGain);
          toneGain.connect(ctx.destination);
          toneOsc.start();
          toneOsc.stop(ctx.currentTime + 1.4);
        } catch (_) {}
      }, 250);

    } else if (type === 'pickup') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);

    } else if (type === 'tap') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    }
  } catch (_) {}
}

// 3 Clinical Pathologies located in the 3D Tissue Block
const PATHOLOGIES = [
  {
    id: 'knot',
    name: 'Spastic Motor Knot',
    layer: 'Deep Skeletal Muscle',
    depthStr: '12.0 mm',
    targetTool: 'needle',
    toolName: '0.18mm Acupuncture Needle',
    problemDesc: 'Hyper-contracted motor endplate nodule trapping micro-nerves in deep muscle fibers.',
    cureAction: 'Plunge Needle to 12mm',
    reliefHeadline: 'Motor Endplate Decompressed',
    reliefDetail: 'Spastic knot vaporized into ash. Muscle fibers relax into parallel alignment. Zero tension.'
  },
  {
    id: 'adhesion',
    name: 'Fascial Adhesion',
    layer: 'Subcutaneous Fascia',
    depthStr: '5.5 mm',
    targetTool: 'cup',
    toolName: 'Glass Fire Cupping',
    problemDesc: 'Tangled fibrotic fascial matrix restricting dermal mobility and lymph flow.',
    cureAction: 'Apply Vacuum Cupping Cup',
    reliefHeadline: 'Myofascial Adhesion Unlocked',
    reliefDetail: 'Negative pressure de-glues stuck fascia. Lymphatic flow surges +380%.'
  },
  {
    id: 'stasis',
    name: 'Cold Damp Stasis',
    layer: 'Epidermis & Dermis',
    depthStr: '2.0 mm',
    targetTool: 'moxa',
    toolName: 'Pure Herbal Moxa Cigar',
    problemDesc: 'Cold micro-vascular constriction causing localized ischemia and chronic dull ache.',
    cureAction: 'Apply 43°C Infrared Moxa',
    reliefHeadline: 'Micro-Vascular Cold Stagnation Cleared',
    reliefDetail: 'Warm infrared penetration dilates capillaries. Deep soothing thermal wave active.'
  }
];

export default function TissueDepthSimulator({ onOpenBooking }) {
  const mountRef = useRef(null);
  const [selectedPathologyIndex, setSelectedPathologyIndex] = useState(0);
  const [activeTool, setActiveTool] = useState('needle'); // 'needle', 'cup', 'moxa'
  const [isDisintegrated, setIsDisintegrated] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  
  // 3D Meshes References
  const tissueBlockGroupRef = useRef(null);
  const knotMeshRef = useRef(null);
  const adhesionMeshRef = useRef(null);
  const stasisMeshRef = useRef(null);

  // Active Tool 3D Models in Scene
  const activeNeedleRef = useRef(null);
  const activeCupRef = useRef(null);
  const activeMoxaRef = useRef(null);

  // 3D Particles Disintegration
  const particlesRef = useRef(null);

  const currentProblem = PATHOLOGIES[selectedPathologyIndex];

  // Initialize Three.js 3D Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 560;

    // 1. Scene & Camera (Isometric Ortho-like Perspective)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06080d);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(2.8, 3.2, 3.8);
    cameraRef.current = camera;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. OrbitControls (Mouse drag to orbit 360, scroll to zoom)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 7.5;
    controls.minDistance = 2.0;
    controls.target.set(0, 0.2, 0);
    controlsRef.current = controls;

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5ee, 1.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(4, 6, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.1);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    const softFloorLight = new THREE.PointLight(0x10b981, 0.9, 8);
    softFloorLight.position.set(0, -0.6, 0);
    scene.add(softFloorLight);

    // 5. Build 3D Stratified Anatomical Human Tissue Block (Isometric Cutaway)
    const tissueGroup = new THREE.Group();
    tissueGroup.position.set(-0.55, 0, 0);
    scene.add(tissueGroup);
    tissueBlockGroupRef.current = tissueGroup;

    const blockWidth = 2.2;
    const blockDepth = 2.2;

    // Load biological cross section texture
    const textureLoader = new THREE.TextureLoader();
    const cutawayTexture = textureLoader.load(getAssetUrl('tissue_cross_section_clean.jpg'));
    cutawayTexture.wrapS = THREE.RepeatWrapping;
    cutawayTexture.wrapT = THREE.RepeatWrapping;

    // Layer 1: Deep Striated Skeletal Muscle (Bottom Layer, 9–15mm)
    const muscleGeo = new THREE.BoxGeometry(blockWidth, 0.6, blockDepth);
    const muscleMat = new THREE.MeshStandardMaterial({
      color: 0x881337, // Rich deep muscle crimson
      map: cutawayTexture,
      roughness: 0.55,
      metalness: 0.05
    });
    const muscleMesh = new THREE.Mesh(muscleGeo, muscleMat);
    muscleMesh.position.y = -0.3;
    muscleMesh.castShadow = true;
    muscleMesh.receiveShadow = true;
    tissueGroup.add(muscleMesh);

    // Muscle fiber striated ridges
    for (let i = -4; i <= 4; i++) {
      const fiberGeo = new THREE.BoxGeometry(blockWidth + 0.01, 0.02, 0.08);
      const fiberMat = new THREE.MeshBasicMaterial({ color: 0x9f1239 });
      const fiber = new THREE.Mesh(fiberGeo, fiberMat);
      fiber.position.set(0, -0.15 - Math.abs(i) * 0.03, i * 0.22);
      tissueGroup.add(fiber);
    }

    // Layer 2: Subcutaneous Fascia & Adipose (Middle Layer, 4–8mm)
    const fasciaGeo = new THREE.BoxGeometry(blockWidth, 0.45, blockDepth);
    const fasciaMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a, // Fascial connective matrix
      roughness: 0.8,
      metalness: 0.02
    });
    const fasciaMesh = new THREE.Mesh(fasciaGeo, fasciaMat);
    fasciaMesh.position.y = 0.225;
    fasciaMesh.castShadow = true;
    fasciaMesh.receiveShadow = true;
    tissueGroup.add(fasciaMesh);

    // Adipose / Fat globules (Yellow clusters)
    for (let i = 0; i < 28; i++) {
      const fatGeo = new THREE.SphereGeometry(0.065 + Math.random() * 0.03, 12, 10);
      const fatMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.5 });
      const fat = new THREE.Mesh(fatGeo, fatMat);
      const fx = (Math.random() - 0.5) * 1.8;
      const fz = (Math.random() - 0.5) * 1.8;
      const fy = 0.12 + Math.random() * 0.22;
      fat.position.set(fx, fy, fz);
      tissueGroup.add(fat);
    }

    // Layer 3: Epidermis & Dermis (Top Skin Surface, 0–3mm)
    const skinGeo = new THREE.BoxGeometry(blockWidth, 0.25, blockDepth);
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xe0a98f, // Natural human skin tone
      roughness: 0.45,
      metalness: 0.02
    });
    const skinMesh = new THREE.Mesh(skinGeo, skinMat);
    skinMesh.position.y = 0.575;
    skinMesh.castShadow = true;
    skinMesh.receiveShadow = true;
    tissueGroup.add(skinMesh);

    // 6. PATHOLOGIES INSIDE 3D TISSUE (Positioned at cutaway front edge for full visibility)
    const cutawayX = -0.65;
    const cutawayZ = 0.72;

    // A: Spastic Motor Knot (Inside deep muscle, y = -0.25)
    const knotGroup = new THREE.Group();
    knotGroup.position.set(cutawayX, -0.22, cutawayZ);
    scene.add(knotGroup);
    knotMeshRef.current = knotGroup;

    const knotCoreGeo = new THREE.DodecahedronGeometry(0.18, 2);
    const knotCoreMat = new THREE.MeshStandardMaterial({
      color: 0xff1e46,
      emissive: 0xcc0033,
      emissiveIntensity: 1.5,
      roughness: 0.35
    });
    const knotCore = new THREE.Mesh(knotCoreGeo, knotCoreMat);
    knotGroup.add(knotCore);

    const knotRingGeo = new THREE.TorusGeometry(0.26, 0.018, 12, 32);
    const knotRingMat = new THREE.MeshBasicMaterial({ color: 0xff2b56, transparent: true, opacity: 0.85 });
    const knotRing = new THREE.Mesh(knotRingGeo, knotRingMat);
    knotRing.rotation.x = Math.PI / 2;
    knotGroup.add(knotRing);

    // Target callout beacon line
    const beaconGeo = new THREE.RingGeometry(0.08, 0.12, 24);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0x10b981, side: THREE.DoubleSide });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.rotation.x = -Math.PI / 2;
    beacon.position.set(cutawayX, 0.71, cutawayZ);
    scene.add(beacon);

    // B: Fascial Adhesion (Inside fascia, y = 0.22)
    const adhesionGroup = new THREE.Group();
    adhesionGroup.position.set(cutawayX, 0.24, cutawayZ);
    scene.add(adhesionGroup);
    adhesionMeshRef.current = adhesionGroup;
    adhesionGroup.visible = false;

    const adhGeo = new THREE.TorusKnotGeometry(0.14, 0.04, 48, 8);
    const adhMat = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0x7e22ce,
      emissiveIntensity: 1.3,
      roughness: 0.4
    });
    const adhMesh = new THREE.Mesh(adhGeo, adhMat);
    adhesionGroup.add(adhMesh);

    // C: Cold Stasis (Near skin surface, y = 0.6)
    const stasisGroup = new THREE.Group();
    stasisGroup.position.set(cutawayX, 0.71, cutawayZ);
    scene.add(stasisGroup);
    stasisMeshRef.current = stasisGroup;
    stasisGroup.visible = false;

    const stasisGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.02, 24);
    const stasisMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 1.4,
      roughness: 0.3
    });
    const stasisMesh = new THREE.Mesh(stasisGeo, stasisMat);
    stasisGroup.add(stasisMesh);

    // 7. 3D INSTRUMENT TRAY NEXT TO TISSUE BLOCK
    const trayGroup = new THREE.Group();
    trayGroup.position.set(1.45, -0.2, 0);
    scene.add(trayGroup);

    // Stainless steel procedure tray
    const trayBaseGeo = new THREE.BoxGeometry(1.0, 0.05, 1.8);
    const trayMat = new THREE.MeshStandardMaterial({
      color: 0xdde3ed,
      roughness: 0.2,
      metalness: 0.92
    });
    const trayBase = new THREE.Mesh(trayBaseGeo, trayMat);
    trayBase.castShadow = true;
    trayBase.receiveShadow = true;
    trayGroup.add(trayBase);

    // Tray sterile cloth liner
    const linerGeo = new THREE.BoxGeometry(0.92, 0.01, 1.72);
    const linerMat = new THREE.MeshStandardMaterial({ color: 0xecfdf5, roughness: 0.85 });
    const liner = new THREE.Mesh(linerGeo, linerMat);
    liner.position.y = 0.03;
    trayGroup.add(liner);

    // 3D Needle on Tray
    const trayNeedle = new THREE.Group();
    trayNeedle.position.set(-0.25, 0.08, -0.45);
    trayNeedle.rotation.z = Math.PI / 2;
    const tHandle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 0.2, 16),
      new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.95, roughness: 0.2 })
    );
    tHandle.position.y = 0.15;
    trayNeedle.add(tHandle);
    const tShaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.007, 0.002, 0.45, 12),
      new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.98, roughness: 0.05 })
    );
    tShaft.position.y = -0.12;
    trayNeedle.add(tShaft);
    trayGroup.add(trayNeedle);

    // 3D Moxa Cigar on Tray
    const trayMoxa = new THREE.Group();
    trayMoxa.position.set(0.15, 0.08, -0.35);
    trayMoxa.rotation.x = Math.PI / 2;
    const mBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 0.45, 16),
      new THREE.MeshStandardMaterial({ color: 0x44352a, roughness: 0.9 })
    );
    trayMoxa.add(mBody);
    const mTip = new THREE.Mesh(
      new THREE.CylinderGeometry(0.048, 0.048, 0.04, 16),
      new THREE.MeshStandardMaterial({ color: 0xff4500, emissive: 0xff3b10, emissiveIntensity: 1.4 })
    );
    mTip.position.y = 0.23;
    trayMoxa.add(mTip);
    trayGroup.add(trayMoxa);

    // 3D Glass Fire Cup on Tray
    const trayCup = new THREE.Group();
    trayCup.position.set(-0.1, 0.14, 0.4);
    const cDome = new THREE.Mesh(
      new THREE.SphereGeometry(0.15, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.65),
      new THREE.MeshPhysicalMaterial({ color: 0x67e8f9, transmission: 0.95, opacity: 0.5, transparent: true, roughness: 0.05 })
    );
    cDome.rotation.x = Math.PI;
    trayCup.add(cDome);
    trayGroup.add(trayCup);

    // 8. ACTIVE IN-ACTION 3D TOOLS (HOVERING ABOVE TISSUE CUTAWAY)
    // Active Needle
    const activeNeedle = new THREE.Group();
    activeNeedle.position.set(cutawayX, 1.15, cutawayZ);
    scene.add(activeNeedle);
    activeNeedleRef.current = activeNeedle;

    const aHandle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 0.28, 16),
      new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.95, roughness: 0.2 })
    );
    aHandle.position.y = 0.38;
    activeNeedle.add(aHandle);

    const aShaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.007, 0.002, 0.62, 12),
      new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.98, roughness: 0.05 })
    );
    aShaft.position.y = 0.02;
    activeNeedle.add(aShaft);

    // Guide tube
    const aTube = new THREE.Mesh(
      new THREE.CylinderGeometry(0.028, 0.028, 0.5, 16),
      new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 0.9, opacity: 0.45, transparent: true, roughness: 0.1 })
    );
    aTube.position.y = 0.15;
    activeNeedle.add(aTube);

    // Active Glass Cup
    const activeCup = new THREE.Group();
    activeCup.position.set(cutawayX, 1.35, cutawayZ);
    scene.add(activeCup);
    activeCupRef.current = activeCup;
    activeCup.visible = false;

    const actDome = new THREE.Mesh(
      new THREE.SphereGeometry(0.25, 32, 20, 0, Math.PI * 2, 0, Math.PI * 0.65),
      new THREE.MeshPhysicalMaterial({ color: 0x67e8f9, transmission: 0.95, opacity: 0.55, transparent: true, roughness: 0.05, thickness: 0.05 })
    );
    actDome.rotation.x = Math.PI;
    activeCup.add(actDome);

    // Active Moxa
    const activeMoxa = new THREE.Group();
    activeMoxa.position.set(cutawayX, 1.35, cutawayZ);
    scene.add(activeMoxa);
    activeMoxaRef.current = activeMoxa;
    activeMoxa.visible = false;

    const actMoxaBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.07, 0.07, 0.55, 20),
      new THREE.MeshStandardMaterial({ color: 0x3d2e24, roughness: 0.9 })
    );
    activeMoxa.add(actMoxaBody);
    const actMoxaTip = new THREE.Mesh(
      new THREE.CylinderGeometry(0.068, 0.068, 0.05, 20),
      new THREE.MeshStandardMaterial({ color: 0xff3b10, emissive: 0xff4500, emissiveIntensity: 1.8 })
    );
    actMoxaTip.position.y = -0.28;
    activeMoxa.add(actMoxaTip);

    // 9. 3D THANOS ASH & DUST DISINTEGRATION PARTICLES
    const particleCount = 5000;
    const pGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = -100;
      positions[i * 3 + 2] = 0;

      velocities[i * 3] = (Math.random() - 0.2) * 2.0; // Blow rightward
      velocities[i * 3 + 1] = Math.random() * 2.2 + 0.5; // Rise upward
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 1.8;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const pMat = new THREE.PointsMaterial({
      color: 0xff3b56,
      size: 0.035,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);
    particlesRef.current = { mesh: particles, geo: pGeo, mat: pMat, velocities, active: false, timer: 0 };

    // 10. Animation Loop
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Knot breathing pulsation
      if (knotMeshRef.current && knotMeshRef.current.visible) {
        const s = 1.0 + Math.sin(time * 5.0) * 0.08;
        knotMeshRef.current.scale.set(s, s, s);
      }
      if (adhesionMeshRef.current && adhesionMeshRef.current.visible) {
        adhesionMeshRef.current.rotation.y += 0.015;
      }

      // 3D Thanos Particle Drift Physics
      const pData = particlesRef.current;
      if (pData && pData.active) {
        pData.timer += delta;
        pData.mat.opacity = Math.max(0, 1.0 - pData.timer / 1.7);

        const posAttr = pData.geo.attributes.position;
        const posArr = posAttr.array;
        const velArr = pData.velocities;

        for (let i = 0; i < particleCount; i++) {
          posArr[i * 3] += velArr[i * 3] * delta;
          posArr[i * 3 + 1] += velArr[i * 3 + 1] * delta;
          posArr[i * 3 + 2] += velArr[i * 3 + 2] * delta;
        }
        posAttr.needsUpdate = true;

        if (pData.timer >= 1.7) {
          pData.active = false;
          pData.mat.opacity = 0;
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update visible pathology inside 3D tissue block
  useEffect(() => {
    if (knotMeshRef.current) knotMeshRef.current.visible = (selectedPathologyIndex === 0) && !isDisintegrated;
    if (adhesionMeshRef.current) adhesionMeshRef.current.visible = (selectedPathologyIndex === 1) && !isDisintegrated;
    if (stasisMeshRef.current) stasisMeshRef.current.visible = (selectedPathologyIndex === 2) && !isDisintegrated;
  }, [selectedPathologyIndex, isDisintegrated]);

  // Update active tool visibility above tissue block
  useEffect(() => {
    if (activeNeedleRef.current) activeNeedleRef.current.visible = (activeTool === 'needle');
    if (activeCupRef.current) activeCupRef.current.visible = (activeTool === 'cup');
    if (activeMoxaRef.current) activeMoxaRef.current.visible = (activeTool === 'moxa');
  }, [activeTool]);

  // Execute Treatment & 3D Thanos Disintegration
  const execute3DTreatment = useCallback(() => {
    if (isSnapping || isDisintegrated) return;
    setIsSnapping(true);
    playAcuSound('tap', isMuted);

    // 1. Animate tool down into tissue
    if (activeTool === 'needle' && activeNeedleRef.current) {
      activeNeedleRef.current.position.y = 0.45; // Plunges through skin into 12mm knot
    } else if (activeTool === 'cup' && activeCupRef.current) {
      activeCupRef.current.position.y = 0.85; // Seals on skin surface
    } else if (activeTool === 'moxa' && activeMoxaRef.current) {
      activeMoxaRef.current.position.y = 1.0; // Hovers right over skin
    }

    // 2. Explode the Pathology with 3D Thanos Ash Disintegration
    setTimeout(() => {
      playAcuSound('snap', isMuted);

      // Hide pathology mesh
      if (knotMeshRef.current) knotMeshRef.current.visible = false;
      if (adhesionMeshRef.current) adhesionMeshRef.current.visible = false;
      if (stasisMeshRef.current) stasisMeshRef.current.visible = false;

      // Spawn Thanos 3D Particles at pathology location
      const pData = particlesRef.current;
      if (pData) {
        pData.active = true;
        pData.timer = 0;
        pData.mat.opacity = 1.0;
        pData.mat.color = new THREE.Color(
          activeTool === 'needle' ? 0xff2b56 : activeTool === 'cup' ? 0xa855f7 : 0x38bdf8
        );

        const posAttr = pData.geo.attributes.position;
        const posArr = posAttr.array;
        const originY = activeTool === 'needle' ? -0.22 : activeTool === 'cup' ? 0.22 : 0.65;

        for (let i = 0; i < 5000; i++) {
          posArr[i * 3] = -0.65 + (Math.random() - 0.5) * 0.35;
          posArr[i * 3 + 1] = originY + (Math.random() - 0.5) * 0.35;
          posArr[i * 3 + 2] = 0.72 + (Math.random() - 0.5) * 0.35;
        }
        posAttr.needsUpdate = true;
      }

      // Trigger relief state
      setTimeout(() => {
        setIsDisintegrated(true);
        setIsSnapping(false);
      }, 400);

    }, 300);
  }, [isSnapping, isDisintegrated, activeTool, isMuted]);

  // Reset treatment
  const handleReset = useCallback(() => {
    setIsDisintegrated(false);
    setIsSnapping(false);

    if (activeNeedleRef.current) activeNeedleRef.current.position.y = 1.15;
    if (activeCupRef.current) activeCupRef.current.position.y = 1.25;
    if (activeMoxaRef.current) activeMoxaRef.current.position.y = 1.25;

    if (knotMeshRef.current) knotMeshRef.current.visible = (selectedPathologyIndex === 0);
    if (adhesionMeshRef.current) adhesionMeshRef.current.visible = (selectedPathologyIndex === 1);
    if (stasisMeshRef.current) stasisMeshRef.current.visible = (selectedPathologyIndex === 2);
  }, [selectedPathologyIndex]);

  // Switch pathology
  const handleSelectPathology = (idx) => {
    setSelectedPathologyIndex(idx);
    setActiveTool(PATHOLOGIES[idx].targetTool);
    handleReset();
    playAcuSound('pickup', isMuted);
  };

  // Switch tool from tray
  const handleSelectTool = (toolId) => {
    setActiveTool(toolId);
    playAcuSound('pickup', isMuted);
  };

  return (
    <div 
      tabIndex={0}
      data-testid="tissue-depth-simulator"
      className={`transition-all duration-300 font-sans focus:outline-none select-none ${
        isFullscreen 
          ? 'fixed inset-0 z-50 w-screen h-screen bg-[#06080d] p-4 flex flex-col justify-between overflow-hidden' 
          : 'relative bg-[#06080d] text-neutral-100 rounded-3xl border border-neutral-800 p-4 sm:p-6 shadow-2xl space-y-4 overflow-hidden'
      }`}
    >
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800/80 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-serif font-bold text-lg">
            3D
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
                3D Tissue Strata & Tool Tray
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Mouse Interactive
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              Select tools from 3D steel tray • Treat stratified tissue pathologies with 3D Thanos ash disintegration
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? "Unmute Sound" : "Mute Sound"}
            className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          <button 
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 text-xs font-medium transition"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Exit' : 'Full Screen'}</span>
          </button>
        </div>
      </div>

      {/* Main 3D Viewport & Interactive Layer Controls */}
      <div className="relative w-full h-[520px] sm:h-[580px] rounded-2xl border border-neutral-800/90 overflow-hidden bg-black shadow-inner">
        
        {/* Three.js Canvas Container (Mouse only: Orbit, Zoom, Click) */}
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* HUD Top-Left: Tissue Strata & Pathology Selector */}
        <div className="absolute top-4 left-4 z-20 flex flex-col space-y-2 pointer-events-auto">
          <div className="bg-neutral-950/85 backdrop-blur-md border border-neutral-800 p-3 rounded-2xl shadow-xl space-y-2 max-w-xs">
            <div className="flex items-center gap-2 border-b border-neutral-800 pb-1.5">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px] font-black uppercase tracking-wider text-white">
                Tissue Strata Pathologies
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              {PATHOLOGIES.map((p, idx) => {
                const isSelected = selectedPathologyIndex === idx;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelectPathology(idx)}
                    className={`flex items-center justify-between p-2 rounded-xl text-left border transition ${
                      isSelected
                        ? 'bg-emerald-500 text-neutral-950 border-emerald-400 font-bold shadow-md shadow-emerald-500/20'
                        : 'bg-neutral-900/80 text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{p.name}</div>
                      <div className="text-[10px] opacity-80">{p.layer} • {p.depthStr}</div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/30">
                      {p.targetTool}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* HUD Bottom-Center: 3D Steel Tray Tool Selector */}
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-20 pointer-events-auto">
          <div className="bg-neutral-950/90 backdrop-blur-md border border-neutral-800 p-3 rounded-2xl shadow-2xl flex flex-col space-y-2 max-w-md">
            <div className="flex items-center justify-between text-xs border-b border-neutral-800 pb-1.5">
              <span className="font-black text-white flex items-center gap-1.5">
                <Hand className="w-3.5 h-3.5 text-emerald-400" />
                <span>Select Tool from 3D Tray:</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">
                Click Tool to Equip
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {/* Tool 1: 0.18mm Needle */}
              <button
                type="button"
                data-testid="tool-needle"
                onClick={() => handleSelectTool('needle')}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition ${
                  activeTool === 'needle'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-500/20'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                }`}
              >
                <span className="text-xl">📍</span>
                <span className="text-[11px] font-bold">0.18mm Needle</span>
                <span className="text-[9px] text-neutral-400">Deep Knot (12mm)</span>
              </button>

              {/* Tool 2: Glass Cup */}
              <button
                type="button"
                data-testid="tool-cup"
                onClick={() => handleSelectTool('cup')}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition ${
                  activeTool === 'cup'
                    ? 'bg-purple-500/20 border-purple-500 text-purple-300 shadow-lg shadow-purple-500/20'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                }`}
              >
                <span className="text-xl">🫧</span>
                <span className="text-[11px] font-bold">Glass Fire Cup</span>
                <span className="text-[9px] text-neutral-400">Fascial Adhesion</span>
              </button>

              {/* Tool 3: Herbal Moxa */}
              <button
                type="button"
                data-testid="tool-moxa"
                onClick={() => handleSelectTool('moxa')}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition ${
                  activeTool === 'moxa'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/20'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                }`}
              >
                <span className="text-xl">🔥</span>
                <span className="text-[11px] font-bold">Herbal Moxa</span>
                <span className="text-[9px] text-neutral-400">Cold Stasis Heat</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Button: Treat & Trigger 3D Thanos Disintegration */}
        {!isDisintegrated && (
          <div className="absolute top-4 right-4 z-20 pointer-events-auto">
            <button
              type="button"
              data-testid="target-acupoint"
              onClick={execute3DTreatment}
              disabled={isSnapping}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-black text-xs sm:text-sm shadow-xl shadow-rose-950/60 active:scale-95 transition"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>{isSnapping ? 'Disintegrating in 3D...' : currentProblem.cureAction}</span>
            </button>
          </div>
        )}

        {/* 3D Strata Depth Indicators */}
        <div className="absolute left-4 bottom-4 z-10 pointer-events-none hidden md:block">
          <div className="bg-neutral-950/70 backdrop-blur-sm border border-neutral-800 p-2.5 rounded-xl text-[10px] space-y-1 text-neutral-400 font-mono">
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#e0a98f]" /> Epidermis & Dermis (0–3mm)</div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#fef08a]" /> Subcutaneous Adipose (4–8mm)</div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#881337]" /> Deep Striated Muscle (9–15mm)</div>
          </div>
        </div>

        {/* Post-Disintegration 3D Relief Overlay */}
        {isDisintegrated && (
          <div className="absolute inset-0 z-30 bg-emerald-950/40 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4 animate-fadeIn pointer-events-auto">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-300 shadow-xl shadow-emerald-500/30">
              <Sparkles className="w-8 h-8 text-emerald-400" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-2">
                <Check className="w-3.5 h-3.5" /> De-Qi Unlocked (得气) • 3D Thanos Disintegration Complete
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {currentProblem.reliefHeadline}
              </h3>
              <p className="text-xs text-neutral-300 max-w-md mx-auto mt-1">
                {currentProblem.reliefDetail}
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-md">
              <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-center">
                <span className="text-[10px] font-bold text-neutral-400 block">Pathology Spasm</span>
                <span className="text-lg font-black text-emerald-400">0%</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-center">
                <span className="text-[10px] font-bold text-neutral-400 block">Micro-Flow</span>
                <span className="text-lg font-black text-cyan-400">+340%</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-center">
                <span className="text-[10px] font-bold text-neutral-400 block">Needle Sensation</span>
                <span className="text-lg font-black text-emerald-300">Painless</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Treat Another 3D Pathology</span>
              </button>

              {onOpenBooking && (
                <button
                  type="button"
                  onClick={() => onOpenBooking(currentProblem.name)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-black shadow-lg shadow-emerald-500/25 transition"
                >
                  <span>Book Consultation (₹600)</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
