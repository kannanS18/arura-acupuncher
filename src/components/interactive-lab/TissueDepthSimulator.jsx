import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  RotateCw, 
  ArrowRight, 
  Zap, 
  Flame, 
  MoveVertical, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';

// Web Audio API Synthesizer for organic clinical bio-feedback
function playClinicalSound(type, isMuted) {
  if (isMuted || typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'tap') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1600, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.04);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'deqi') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(261.63, now);
      osc.frequency.exponentialRampToValueAtTime(392.00, now + 0.4);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);
      osc.start(now);
      osc.stop(now + 0.85);
    } else if (type === 'twirl') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(340, now);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.16);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.start(now);
      osc.stop(now + 0.16);
    } else if (type === 'electro') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(120, now);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc.start(now);
      osc.stop(now + 0.03);
    }
  } catch (_) {}
}

// Procedural realistic living skin texture with pores and dermal tone
function createRealisticSkinTexture() {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Rich warm natural skin tone gradient (Fitzpatrick scale III-IV)
  const grad = ctx.createLinearGradient(0, 0, 1024, 1024);
  grad.addColorStop(0, '#bd7d65');
  grad.addColorStop(0.5, '#ab6f58');
  grad.addColorStop(1, '#b5745d');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Micro-dermal capillary mottling
  for (let i = 0; i < 6000; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const r = Math.random() * 3 + 1;
    ctx.fillStyle = Math.random() > 0.5 
      ? 'rgba(215, 120, 100, 0.14)' 
      : 'rgba(155, 65, 50, 0.12)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Dermatoglyphics: Micro-furrows / fine epidermal skin crease net
  ctx.strokeStyle = 'rgba(110, 45, 35, 0.15)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 400; i++) {
    ctx.beginPath();
    const sx = Math.random() * 1024;
    const sy = Math.random() * 1024;
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx + (Math.random() - 0.5) * 50, sy + (Math.random() - 0.5) * 50);
    ctx.stroke();
  }

  // Follicular / micro-pore dimples
  for (let i = 0; i < 3500; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    ctx.fillStyle = 'rgba(75, 25, 18, 0.28)';
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

// Procedural coiled wire texture for authentic acupuncture handle
function createCopperCoilTexture() {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  for (let y = 0; y < 512; y += 8) {
    const grad = ctx.createLinearGradient(0, y, 0, y + 8);
    grad.addColorStop(0, '#78350f');
    grad.addColorStop(0.3, '#d97706');
    grad.addColorStop(0.7, '#fbbf24');
    grad.addColorStop(1, '#92400e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, y, 128, 8);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 4);
  return tex;
}

const CLINICAL_SCENARIOS = [
  {
    id: 'migraine',
    name: 'Chronic Migraine & Tension Headache',
    location: 'Cervical Splenius & Upper Trapezius',
    targetPoint: 'GB20 (Fengchi) Pathway',
    targetDepthMm: 12.0,
    pathology: 'Hyper-contracted taut band in deep cervical fascia compressing greater occipital nerves.',
    deQiResponse: 'A momentary feather-light entry, followed by a warm, radiating heaviness behind the ears. The muscle knot visibly twitches and unlocks.',
    doctorQuote: '“When the needle reaches the motor endplate at 12mm, the knot twitches and unlocks. Patients feel the vice-like grip on their temples dissolve.” — Dr. Nivedha'
  },
  {
    id: 'sciatica',
    name: 'Lumbar Disc Herniation & Sciatica',
    location: 'Deep Piriformis & Lumbar Paraspinal',
    targetPoint: 'GB30 (Huantiao) Pathway',
    targetDepthMm: 13.5,
    pathology: 'Ischemic spasm of the deep piriformis muscle mechanically pinching the sciatic nerve bundle.',
    deQiResponse: 'A deep, pleasant spreading ache down through the hip, releasing radiating electrical nerve signals.',
    doctorQuote: '“By releasing the deep piriformis spasm with millimeter needle precision, we relieve the sciatic compression at its physical root.” — Dr. Nivedha'
  },
  {
    id: 'burnout',
    name: 'Executive Burnout & Severe Insomnia',
    location: 'Vagal Regulation & Heart Axis',
    targetPoint: 'HT7 (Shenmen) Pathway',
    targetDepthMm: 9.0,
    pathology: 'Elevated central adrenergic tone with vagal nerve suppression and sleep architecture disruption.',
    deQiResponse: 'A tranquil, weighted-blanket sensation settling over the entire chest as parasympathetic tone recovers.',
    doctorQuote: '“Classical points calm sympathetic overdrive at the neurochemical level, allowing natural parasympathetic recovery to resume.” — Dr. Nivedha'
  }
];

export default function TissueDepthSimulator({ onOpenBooking }) {
  const [activeScenario, setActiveScenario] = useState(CLINICAL_SCENARIOS[0]);
  const [depthMm, setDepthMm] = useState(0); // 0.0 to 15.0 mm
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Techniques
  const [isTwirling, setIsTwirling] = useState(false);
  const [isThrusting, setIsThrusting] = useState(false);
  const [isElectroActive, setIsElectroActive] = useState(false);
  const [isMoxaActive, setIsMoxaActive] = useState(false);

  // Biological Response
  const [isKnotReleased, setIsKnotReleased] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(12);

  // Three.js References
  const canvasContainerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const needleGroupRef = useRef(null);
  const knotMeshRef = useRef(null);
  const reqAnimIdRef = useRef(null);

  // Handle ESC key for fullscreen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullscreen) setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Handle Depth Changes and Trigger Twitch
  useEffect(() => {
    const target = activeScenario.targetDepthMm;
    const isAtTarget = depthMm >= target - 0.8 && depthMm <= target + 1.2;

    if (isAtTarget && !isKnotReleased) {
      playClinicalSound('deqi', isMuted);
      setIsKnotReleased(true);
    } else if (depthMm < 2.5) {
      setIsKnotReleased(false);
    }
  }, [depthMm, activeScenario, isKnotReleased, isMuted]);

  // Periodic Electro pulse sound
  useEffect(() => {
    if (!isElectroActive || depthMm < 4.0) return;
    const interval = setInterval(() => {
      playClinicalSound('electro', isMuted);
    }, 450);
    return () => clearInterval(interval);
  }, [isElectroActive, depthMm, isMuted]);

  // -----------------------------------------------------------------
  // TRUE WEBGL THREE.JS SCENE COVERED REALISTICALLY ON ALL SIDES
  // -----------------------------------------------------------------
  useEffect(() => {
    if (!canvasContainerRef.current) return;

    const container = canvasContainerRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 700;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x090b10);

    // 2. Camera: Framed with generous vertical headroom to keep full needle in view
    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 50);
    camera.position.set(0, 1.8, 6.8);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    rendererRef.current = renderer;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. OrbitControls: Full 360° rotation enabled on all sides
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.05; // Don't look from straight underneath
    controls.minDistance = 2.5;
    controls.maxDistance = 9.0;
    controls.target.set(0, 1.2, 0); // Focus on mid-level so entire needle and tissue block are visible
    controlsRef.current = controls;

    // 5. Realistic Medical Studio 4-Point Lighting (Illuminates all 360° sides)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    // Front-Right Key Light
    const frontKeyLight = new THREE.DirectionalLight(0xfffaed, 1.2);
    frontKeyLight.position.set(3.5, 5, 4);
    frontKeyLight.castShadow = true;
    frontKeyLight.shadow.mapSize.width = 1024;
    frontKeyLight.shadow.mapSize.height = 1024;
    scene.add(frontKeyLight);

    // Back-Left Key Light (Ensures rear & opposite faces are brightly textured)
    const backKeyLight = new THREE.DirectionalLight(0xfffaed, 1.1);
    backKeyLight.position.set(-3.5, 4.5, -4);
    scene.add(backKeyLight);

    // Dermal Subsurface Warm Fill
    const warmFillLight = new THREE.DirectionalLight(0xf472b6, 0.5);
    warmFillLight.position.set(-4, 2, 2);
    scene.add(warmFillLight);

    // Surgical Specular Rim Light
    const chromeRimLight = new THREE.DirectionalLight(0x38bdf8, 0.55);
    chromeRimLight.position.set(4, 2, -3);
    scene.add(chromeRimLight);

    // -----------------------------------------------------------------
    // 3D ANATOMICAL TISSUE BLOCK WITH FULL TEXTURE COVERAGE ON ALL SIDES
    // -----------------------------------------------------------------
    const blockGroup = new THREE.Group();
    scene.add(blockGroup);

    const textureLoader = new THREE.TextureLoader();

    // High-resolution living cross-section texture
    const crossSectionTex = textureLoader.load(getAssetUrl('tissue_cross_section_clean.jpg'), (t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.wrapS = THREE.ClampToEdgeWrapping;
      t.wrapT = THREE.ClampToEdgeWrapping;
    });

    // Procedural living skin texture for the top plane
    const skinTex = createRealisticSkinTexture();

    const blockWidth = 2.4;
    const blockHeight = 1.4;
    const blockDepth = 2.0;

    // Multi-material 3D box: ALL vertical sides covered in living anatomical texture!
    // [right, left, top (skin), bottom, front, back]
    const materials = [
      new THREE.MeshStandardMaterial({ map: crossSectionTex, roughness: 0.45 }), // right face (textured)
      new THREE.MeshStandardMaterial({ map: crossSectionTex, roughness: 0.45 }), // left face (textured)
      new THREE.MeshStandardMaterial({ map: skinTex || crossSectionTex, roughness: 0.85, metalness: 0.02 }), // top (realistic skin)
      new THREE.MeshStandardMaterial({ color: 0x220409, roughness: 0.8 }), // bottom (deep fascia bed)
      new THREE.MeshStandardMaterial({ map: crossSectionTex, roughness: 0.45 }), // front face (textured)
      new THREE.MeshStandardMaterial({ map: crossSectionTex, roughness: 0.45 })  // back face (textured)
    ];

    const blockGeo = new THREE.BoxGeometry(blockWidth, blockHeight, blockDepth);
    const tissueBlock = new THREE.Mesh(blockGeo, materials);
    tissueBlock.receiveShadow = true;
    blockGroup.add(tissueBlock);

    // Subtle edge highlight
    const edgeGeo = new THREE.EdgesGeometry(blockGeo);
    const edgeMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.15 });
    const edgeLine = new THREE.LineSegments(edgeGeo, edgeMat);
    blockGroup.add(edgeLine);

    // Acupoint sterile boundary ring on skin surface
    const ringGeo = new THREE.RingGeometry(0.045, 0.07, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x10b981, side: THREE.DoubleSide, transparent: true, opacity: 0.7 });
    const entryRing = new THREE.Mesh(ringGeo, ringMat);
    entryRing.rotation.x = -Math.PI / 2;
    entryRing.position.set(0.15, 0.702, blockDepth / 2 - 0.05);
    blockGroup.add(entryRing);

    // -----------------------------------------------------------------
    // 3D HYPER-CONTRACTED TRIGGER POINT KNOT
    // -----------------------------------------------------------------
    const knotGeo = new THREE.SphereGeometry(0.18, 32, 32);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x4c0519,
      roughness: 0.35,
      metalness: 0.2,
      emissive: 0x2e020d,
      emissiveIntensity: 0.5
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    knotMesh.position.set(0.15, -0.32, blockDepth / 2 + 0.02);
    blockGroup.add(knotMesh);
    knotMeshRef.current = knotMesh;

    // -----------------------------------------------------------------
    // 3D SURGICAL ACUPUNCTURE NEEDLE MESH (Fully Visible from Handle to Tip)
    // -----------------------------------------------------------------
    const needleGroup = new THREE.Group();
    scene.add(needleGroup);
    needleGroupRef.current = needleGroup;

    // Coiled Wire Copper Handle (Authentic acupuncture wound copper wire)
    const handleTex = createCopperCoilTexture();
    const handleGeo = new THREE.CylinderGeometry(0.048, 0.048, 0.75, 32);
    const handleMat = new THREE.MeshStandardMaterial({
      map: handleTex,
      color: 0xdf8a28,
      roughness: 0.25,
      metalness: 0.85
    });
    const handleMesh = new THREE.Mesh(handleGeo, handleMat);
    handleMesh.position.y = 1.86 + 0.375; // y = 2.235
    handleMesh.castShadow = true;
    needleGroup.add(handleMesh);

    // Top Ring Finial
    const torusGeo = new THREE.TorusGeometry(0.065, 0.016, 16, 32);
    const torusMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.2, metalness: 0.95 });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.position.y = 2.66;
    torusMesh.rotation.x = Math.PI / 2;
    needleGroup.add(torusMesh);

    // Surgical Stainless Steel Shaft (Polished chrome 316L, 1.8 units tall)
    const shaftGeo = new THREE.CylinderGeometry(0.015, 0.015, 1.8, 24);
    const shaftMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.08,
      metalness: 0.98
    });
    const shaftMesh = new THREE.Mesh(shaftGeo, shaftMat);
    shaftMesh.position.y = 0.06 + 0.9; // y = 0.96
    shaftMesh.castShadow = true;
    needleGroup.add(shaftMesh);

    // Sharp Pine-Needle Trocar Tip (Apex at y = 0.0)
    const tipGeo = new THREE.ConeGeometry(0.015, 0.06, 24);
    const tipMesh = new THREE.Mesh(tipGeo, shaftMat);
    tipMesh.position.y = 0.03;
    tipMesh.rotation.x = Math.PI;
    needleGroup.add(tipMesh);

    // Initial position: Needle tip resting right at skin surface (y = 0.70)
    needleGroup.position.set(0.15, 0.70, blockDepth / 2 + 0.02);

    // Render Loop
    const animate = () => {
      reqAnimIdRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (reqAnimIdRef.current) cancelAnimationFrame(reqAnimIdRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update 3D Needle Position in WebGL Scene
  useEffect(() => {
    if (!needleGroupRef.current) return;
    
    // Y-Position Mapping:
    // depthMm = 0.0  -> Needle tip is at skin surface: y = 0.70
    // depthMm = 12.0 -> Needle tip is at knot center: y = -0.32
    const startY = 0.70;
    const targetY = -0.32;
    const progress = Math.min(1.2, depthMm / 12.0);
    const newY = startY - progress * (startY - targetY);

    needleGroupRef.current.position.y = newY;

    // React to knot release in 3D
    if (knotMeshRef.current) {
      if (isKnotReleased) {
        knotMeshRef.current.scale.set(0.75, 0.75, 0.75);
        knotMeshRef.current.material.color.setHex(0x10b981);
        knotMeshRef.current.material.emissive.setHex(0x059669);
        knotMeshRef.current.material.emissiveIntensity = 0.8;
      } else {
        knotMeshRef.current.scale.set(1.0, 1.0, 1.0);
        knotMeshRef.current.material.color.setHex(0x4c0519);
        knotMeshRef.current.material.emissive.setHex(0x2e020d);
        knotMeshRef.current.material.emissiveIntensity = 0.4;
      }
    }
  }, [depthMm, isKnotReleased]);

  // Classical 3D Twirl in WebGL
  const handleTwirl = () => {
    setIsTwirling(true);
    playClinicalSound('twirl', isMuted);

    if (needleGroupRef.current) {
      const startTime = performance.now();
      const initialRot = needleGroupRef.current.rotation.y;
      const animateTwirl = (now) => {
        const elapsed = (now - startTime) / 500;
        if (elapsed < 1) {
          needleGroupRef.current.rotation.y = initialRot + elapsed * Math.PI * 4;
          requestAnimationFrame(animateTwirl);
        } else {
          needleGroupRef.current.rotation.y = initialRot + Math.PI * 4;
          setIsTwirling(false);
        }
      };
      requestAnimationFrame(animateTwirl);
    } else {
      setTimeout(() => setIsTwirling(false), 500);
    }

    if (depthMm >= activeScenario.targetDepthMm - 2.0) {
      setIsKnotReleased(true);
      playClinicalSound('deqi', isMuted);
    }
  };

  // Classical Thrust & Lift in WebGL
  const handleThrust = () => {
    if (depthMm < 4.0) setDepthMm(activeScenario.targetDepthMm);
    setIsThrusting(true);
    playClinicalSound('tap', isMuted);

    setTimeout(() => {
      setDepthMm((prev) => Math.max(0, prev - 1.2));
      setTimeout(() => {
        setDepthMm(activeScenario.targetDepthMm);
        setIsThrusting(false);
        setIsKnotReleased(true);
        playClinicalSound('deqi', isMuted);
      }, 150);
    }, 150);
  };

  // Quick-Tap painless dermal breach
  const handleQuickTap = () => {
    playClinicalSound('tap', isMuted);
    setDepthMm(2.0);
  };

  const handleRecenterCamera = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(0, 1.8, 6.8);
      controlsRef.current.target.set(0, 1.2, 0);
      controlsRef.current.update();
    }
  };

  const handleReset = () => {
    setDepthMm(0);
    setIsKnotReleased(false);
    setIsElectroActive(false);
    setIsMoxaActive(false);
    if (needleGroupRef.current) needleGroupRef.current.position.y = 0.70;
    handleRecenterCamera();
  };

  const handleSelectScenario = (scen) => {
    setActiveScenario(scen);
    handleReset();
  };

  // Telemetry Calculations
  const penetrationForce = depthMm === 0 ? '0.00 N' : depthMm < 2.0 ? '0.02 N (Pain-free)' : depthMm < 8.0 ? '0.04 N (Fascial glide)' : isKnotReleased ? '0.03 N (Decompressed)' : '0.14 N (Taut knot)';
  const muscleSpasmPct = isKnotReleased ? 8 : Math.max(14, Math.min(95, Math.round(88 - (depthMm * 1.5))));
  const microBloodFlow = isKnotReleased ? (isMoxaActive ? 440 : 340) : Math.min(100, Math.round(depthMm * 14));
  const vagusTone = isKnotReleased ? 'Parasympathetic Recovery (96%)' : depthMm > 6.0 ? 'Vagal Activation (62%)' : 'Resting Baseline (32%)';

  const getPatientSensation = () => {
    if (depthMm === 0) return 'Sterile skin boundary. Zero sensation.';
    if (depthMm < 2.5) return 'Feather-light dermal entry (0.02 N). 25× lower force than a vaccine needle. Patient feels practically nothing.';
    if (depthMm < 8.0) return 'Smooth gliding through collagen fascia and interstitial matrix. No pain receptors engaged.';
    if (depthMm >= activeScenario.targetDepthMm - 1.0 && depthMm <= activeScenario.targetDepthMm + 1.2) {
      if (isKnotReleased) {
        return 'DE-QI (得气)! A warm, soothing dull heaviness radiating through the pathway. The knot unlocks and tension dissolves.';
      }
      return 'Engaging hyper-contracted motor endplate. Gentle radiating pressure felt as needle contacts the active trigger zone.';
    }
    return 'Deep muscular bed. Sensation of profound relaxation and systemic tension release.';
  };

  return (
    <div className={`transition-all duration-300 font-sans ${
      isFullscreen 
        ? 'fixed inset-0 z-50 w-screen h-screen bg-[#090b10] p-4 sm:p-8 flex flex-col justify-between overflow-y-auto select-none' 
        : 'relative bg-[#090b10] text-neutral-100 rounded-3xl border border-neutral-800 p-6 sm:p-10 shadow-2xl space-y-8 select-none overflow-hidden'
    }`}>
      
      {/* Top Header & Scenario Selection */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-800 pb-6 relative z-10">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center space-x-2 text-xs font-normal text-neutral-400">
            <span className="text-pink-400">Real-Time WebGL 3D</span>
            <span>/</span>
            <span>Doctor-Supervised Interaction</span>
          </div>

          <h3 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Touch, rotate & plunge: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-pink-400 to-rose-300">
              Living human anatomy in true 3D
            </span>
          </h3>

          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
            A genuine WebGL 3D simulation covered realistically on all sides. Drag your finger or mouse to rotate 360° around the tissue block. Tap to enter painlessly, navigate through living strata, and decompress the deep trigger knot.
          </p>
        </div>

        {/* Action Controls & Clinical Cases */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          
          {/* Fullscreen Button */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center space-x-1.5 cursor-pointer ${
              isFullscreen 
                ? 'bg-amber-400 text-black hover:bg-amber-300' 
                : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700'
            }`}
            title={isFullscreen ? 'Exit Full Screen (ESC)' : 'Expand Full Screen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span>{isFullscreen ? 'Exit Full Screen' : 'Full Screen'}</span>
          </button>

          {/* Clinical Cases Selector */}
          <div className="flex flex-wrap gap-1.5">
            {CLINICAL_SCENARIOS.map((scen) => (
              <button
                key={scen.id}
                onClick={() => handleSelectScenario(scen)}
                className={`px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                  activeScenario.id === scen.id
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {scen.name.split('&')[0]}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* MAIN 3D WEBGL SURGICAL SIMULATION STAGE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Left Column (8 cols): Real-Time 3D WebGL Canvas */}
        <div className="lg:col-span-8 bg-neutral-900/90 rounded-2xl border border-neutral-800 p-6 shadow-xl space-y-4">
          
          {/* Status & Action Bar */}
          <div className="flex flex-wrap items-center justify-between text-xs text-neutral-400 font-normal pb-3 border-b border-neutral-800 gap-3">
            <div className="flex items-center space-x-2">
              <span className={`w-2.5 h-2.5 rounded-full ${
                isKnotReleased ? 'bg-emerald-400' : 'bg-brand'
              }`} />
              <span className="text-white font-medium text-xs sm:text-sm">
                {isKnotReleased 
                  ? 'De-Qi Achieved — Trigger Knot Decompressed' 
                  : depthMm === 0
                  ? 'Rotate 3D with mouse/finger. Tap skin or drag slider to plunge.'
                  : `Active Insertion: ${depthMm.toFixed(1)} mm depth`}
              </span>
            </div>

            <div className="flex items-center space-x-2.5">
              {/* Quick-Tap Painless Dermal Breach Button */}
              {depthMm === 0 && (
                <button
                  onClick={handleQuickTap}
                  className="px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-400/80 text-emerald-300 text-xs font-medium transition-all hover:bg-emerald-900 flex items-center space-x-1.5 cursor-pointer shadow-sm"
                  title="Execute the fast 0.01s painless dermal tap"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Quick-Tap (Painless)</span>
                </button>
              )}

              {/* Re-center 3D Camera */}
              <button
                onClick={handleRecenterCamera}
                className="text-[11px] text-neutral-400 hover:text-white transition-colors cursor-pointer mr-1"
                title="Reset 3D camera to optimal angle"
              >
                Re-center 3D
              </button>

              {/* Mute Audio Toggle */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs transition-colors flex items-center cursor-pointer border border-neutral-700"
                title={isMuted ? 'Unmute sound' : 'Mute sound'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-brand" />}
              </button>

              <button
                onClick={handleReset}
                className="text-[11px] text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                Reset to surface
              </button>
            </div>
          </div>

          {/* THE EXPANSIVE, GRAND 3D THREE.JS WEBGL VIEWPORT */}
          <div 
            ref={canvasContainerRef}
            className={`relative w-full rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-[#090b10] touch-none select-none ${
              isFullscreen ? 'h-[85vh]' : 'h-[620px] sm:h-[720px] lg:h-[780px]'
            }`}
          >
            {/* Real WebGL canvas rendered here */}
          </div>

          {/* 3D Orbit Control Hint */}
          <div className="flex items-center justify-between text-[11px] text-neutral-500 px-1 font-normal">
            <span>Drag one finger / mouse to rotate 360° in 3D</span>
            <span>Pinch / scroll to zoom into living layers</span>
          </div>

          {/* Precision Micrometer Depth Slider */}
          <div className="p-4 rounded-xl bg-neutral-950/90 border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-300">Needle Insertion Depth (Precision Dial)</span>
              <span className="text-brand font-bold text-sm tabular-nums font-mono">{depthMm.toFixed(1)} mm</span>
            </div>
            <input 
              type="range"
              min="0"
              max="15"
              step="0.1"
              value={depthMm}
              onChange={(e) => setDepthMm(parseFloat(e.target.value))}
              className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-brand"
            />
            <div className="flex justify-between text-[10px] text-neutral-400 font-normal">
              <span>Epidermis (0mm)</span>
              <span>Dermis (3mm)</span>
              <span>Fascia (6mm)</span>
              <span className="text-brand font-medium">Target Knot ({activeScenario.targetDepthMm}mm)</span>
              <span>Deep Muscle (15mm)</span>
            </div>
          </div>

          {/* CLINICAL MANIPULATION TECHNIQUES TOOLBAR */}
          <div className="space-y-2 pt-1">
            <span className="text-[11px] font-normal text-neutral-400 block">
              Clinical Manipulation Toolkit (Interactive Actions)
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              
              {/* 1. Classical Left-to-Right 3D Twirl */}
              <button
                onClick={handleTwirl}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isTwirling 
                    ? 'bg-brand text-white border-brand shadow-md' 
                    : 'bg-neutral-950/80 hover:bg-neutral-800 text-white border-neutral-800'
                }`}
                title="Roll handle left-to-right between fingers"
              >
                <div className="flex items-center justify-between mb-1">
                  <RotateCw className={`w-3.5 h-3.5 ${isTwirling ? 'text-white animate-spin' : 'text-neutral-400'}`} />
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/50 text-neutral-300">
                    Nien Chuan
                  </span>
                </div>
                <div className="text-xs font-medium">3D Twirl (Roll L→R)</div>
                <div className="text-[10px] text-neutral-400 mt-0.5">Winds collagen fascia</div>
              </button>

              {/* 2. Classical Lift & Thrust (Ti Ch'a) */}
              <button
                onClick={handleThrust}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isThrusting 
                    ? 'bg-brand text-white border-brand shadow-md' 
                    : 'bg-neutral-950/80 hover:bg-neutral-800 text-white border-neutral-800'
                }`}
                title="Micro-pecking pecks knot to elicit twitch response"
              >
                <div className="flex items-center justify-between mb-1">
                  <MoveVertical className={`w-3.5 h-3.5 ${isThrusting ? 'text-white animate-bounce' : 'text-neutral-400'}`} />
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/50 text-neutral-300">
                    Ti Ch’a
                  </span>
                </div>
                <div className="text-xs font-medium">Thrust & Lift</div>
                <div className="text-[10px] text-neutral-400 mt-0.5">Elicits local twitch</div>
              </button>

              {/* 3. Electro-Acupuncture Mode */}
              <button
                onClick={() => {
                  if (!isElectroActive && depthMm < 4.0) setDepthMm(activeScenario.targetDepthMm);
                  setIsElectroActive(!isElectroActive);
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isElectroActive 
                    ? 'bg-cyan-950 text-cyan-200 border-cyan-400 shadow-md' 
                    : 'bg-neutral-950/80 hover:bg-neutral-800 text-white border-neutral-800'
                }`}
                title="Micro-current pulses gate pain and release endorphins"
              >
                <div className="flex items-center justify-between mb-1">
                  <Zap className={`w-3.5 h-3.5 ${isElectroActive ? 'text-cyan-400 animate-pulse' : 'text-neutral-400'}`} />
                  <span className={`text-[9px] px-1.5 py-0.5 rounded ${
                    isElectroActive ? 'bg-cyan-800 text-cyan-100' : 'bg-black/50 text-neutral-300'
                  }`}>
                    {isElectroActive ? 'Active' : 'Dian Zhen'}
                  </span>
                </div>
                <div className="text-xs font-medium">
                  {isElectroActive ? 'Electro: 2 Hz' : 'Electro-Acu'}
                </div>
                <div className="text-[10px] text-neutral-400 mt-0.5">Endorphin frequency</div>
              </button>

              {/* 4. Warm Needle Moxibustion */}
              <button
                onClick={() => {
                  if (!isMoxaActive && depthMm < 3.0) setDepthMm(activeScenario.targetDepthMm);
                  setIsMoxaActive(!isMoxaActive);
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isMoxaActive 
                    ? 'bg-amber-950 text-amber-200 border-amber-400 shadow-md' 
                    : 'bg-neutral-950/80 hover:bg-neutral-800 text-white border-neutral-800'
                }`}
                title="Thermal infrared warmth radiates down the shaft"
              >
                <div className="flex items-center justify-between mb-1">
                  <Flame className={`w-3.5 h-3.5 ${isMoxaActive ? 'text-amber-400 animate-pulse' : 'text-neutral-400'}`} />
                  <span className={`text-[9px] px-1.5 py-0.5 rounded ${
                    isMoxaActive ? 'bg-amber-800 text-amber-100' : 'bg-black/50 text-neutral-300'
                  }`}>
                    Wen Zhen
                  </span>
                </div>
                <div className="text-xs font-medium">
                  {isMoxaActive ? 'Moxa: Active' : 'Warm Needle'}
                </div>
                <div className="text-[10px] text-neutral-400 mt-0.5">Infrared heat wave</div>
              </button>

            </div>
          </div>

          {/* REAL-TIME PATIENT SENSATION HUD */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
            <div className="flex items-center justify-between text-[11px] text-neutral-400 font-normal">
              <span>Patient Sensation Monitor</span>
              <span className="text-brand font-mono font-medium">{depthMm.toFixed(1)} mm</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-normal">
              {getPatientSensation()}
            </p>
          </div>

        </div>

        {/* Right Column (4 cols): Live Clinical Bio-Telemetry & Dr. Nivedha's Log */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Live Bio-Telemetry Dashboard */}
          <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <span className="text-xs font-medium text-neutral-400">
                Live Biomechanical Telemetry
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                Active Sensors
              </span>
            </div>

            <div className="space-y-4 text-xs font-normal">
              <div>
                <span className="text-neutral-400 block">Dermal Penetration Force</span>
                <span className="font-display font-bold text-white text-lg tabular-nums mt-0.5 block font-mono">
                  {penetrationForce}
                </span>
                <span className="text-[10px] text-neutral-500">Human pain threshold is 0.50 N (acupuncture is 25× lower)</span>
              </div>

              <div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Myofascial Spasm Level</span>
                  <span className={`font-medium tabular-nums font-mono ${isKnotReleased ? 'text-emerald-400' : 'text-red-400'}`}>
                    {muscleSpasmPct}%
                  </span>
                </div>
                <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden mt-1.5">
                  <div 
                    className={`h-full transition-all duration-300 ${isKnotReleased ? 'bg-emerald-400' : 'bg-red-500'}`} 
                    style={{ width: `${muscleSpasmPct}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Local Micro-Perfusion (Blood Flow)</span>
                  <span className="font-medium text-brand tabular-nums font-mono">+{microBloodFlow}%</span>
                </div>
                <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden mt-1.5">
                  <div 
                    className="h-full bg-brand transition-all duration-300" 
                    style={{ width: `${Math.min(100, (microBloodFlow / 440) * 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <span className="text-neutral-400 block">Autonomic Vagus Response</span>
                <span className="text-neutral-200 text-xs block mt-0.5">{vagusTone}</span>
              </div>
            </div>
          </div>

          {/* Clinical Finding Dossier Card */}
          <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4">
            <div>
              <span className="text-xs text-brand font-medium block">{activeScenario.location}</span>
              <h4 className="font-display text-lg font-bold text-white mt-0.5">
                {activeScenario.name}
              </h4>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200 leading-relaxed space-y-1">
              <strong className="block text-amber-300 font-medium">The De-Qi Sensation:</strong>
              <p className="font-normal">{activeScenario.deQiResponse}</p>
            </div>

            <p className="text-xs italic text-neutral-400 leading-relaxed border-t border-neutral-800 pt-3 font-normal">
              {activeScenario.doctorQuote}
            </p>

            <div className="pt-2">
              <button
                onClick={() => onOpenBooking(`Consultation (${activeScenario.name})`, 600)}
                className="w-full py-3.5 rounded-xl text-xs font-semibold bg-brand text-white hover:bg-brand-dark transition-all flex items-center justify-center space-x-1.5 shadow-md cursor-pointer"
              >
                <span>Book Priority Consultation (₹600)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* COMPANION SCALE COMPARISON: "How Thin is 0.18mm?" */}
      <div className="pt-8 border-t border-neutral-800">
        <div className="bg-neutral-900/80 rounded-2xl border border-neutral-800 p-6 sm:p-10 space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1.5 max-w-xl">
              <span className="text-xs text-brand font-medium block">
                True Relative Scale
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                How thin is 0.18 millimeters?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                Overlaying three physical objects at exact relative proportion. Notice why an acupuncture needle feels completely different from a standard hospital injection syringe.
              </p>
            </div>

            {/* Magnification Slider Control */}
            <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 space-y-2 min-w-[220px]">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-300">Microscope Zoom</span>
                <span className="text-brand tabular-nums font-mono font-medium">{zoomLevel}× Scale</span>
              </div>
              <input 
                type="range"
                min="4"
                max="24"
                step="1"
                value={zoomLevel}
                onChange={(e) => setZoomLevel(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-brand"
              />
            </div>
          </div>

          {/* 3 True Scale Cross-Section Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 items-stretch">
            
            {/* 1. Human Hair */}
            <div className="p-5 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-neutral-400">Reference</span>
                  <span className="text-xs text-neutral-200 tabular-nums font-mono">~0.08 mm</span>
                </div>
                <h4 className="font-display text-base font-bold text-white">Human Scalp Hair</h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                  Average human hair shaft diameter (80 microns). Flexible biological keratin fiber.
                </p>
              </div>

              <div className="py-4 bg-neutral-900 rounded-lg border border-neutral-800 flex items-center justify-center relative h-24 overflow-hidden">
                <div 
                  className="bg-amber-600 rounded-full"
                  style={{
                    width: `${0.08 * zoomLevel * 14}px`,
                    height: `${0.08 * zoomLevel * 14}px`,
                    minWidth: '4px',
                    minHeight: '4px'
                  }}
                />
                <span className="absolute bottom-1.5 text-[10px] text-neutral-500">
                  Actual Cross-Section at {zoomLevel}×
                </span>
              </div>

              <div className="text-[11px] text-neutral-400 pt-1 border-t border-neutral-800">
                Solid organic filament
              </div>
            </div>

            {/* 2. Arura Acupuncture Needle */}
            <div className="p-5 rounded-xl bg-neutral-950/90 border-2 border-brand space-y-3 flex flex-col justify-between relative shadow-sm">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-brand font-medium">Solid Needle</span>
                  <span className="text-xs text-brand tabular-nums font-mono font-medium">0.18 mm</span>
                </div>
                <h4 className="font-display text-base font-bold text-white">Arura Acupuncture Needle</h4>
                <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                  Surgical stainless steel 316L. Just over twice the thickness of a single hair strand.
                </p>
              </div>

              <div className="py-4 bg-neutral-900 rounded-lg flex items-center justify-center relative h-24 overflow-hidden border border-brand/30">
                <div 
                  className="bg-white rounded-full border border-neutral-400"
                  style={{
                    width: `${0.18 * zoomLevel * 14}px`,
                    height: `${0.18 * zoomLevel * 14}px`
                  }}
                />
                <span className="absolute bottom-1.5 text-[10px] text-pink-300">
                  Solid Pin-Point · Does not cut tissue
                </span>
              </div>

              <div className="text-[11px] text-neutral-300 pt-1 border-t border-neutral-800">
                Slides between muscle fibers painlessly
              </div>
            </div>

            {/* 3. Hypodermic Injection Syringe Needle */}
            <div className="p-5 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-neutral-400">Hospital Syringe</span>
                  <span className="text-xs text-neutral-200 tabular-nums font-mono">0.81 mm (21 Gauge)</span>
                </div>
                <h4 className="font-display text-base font-bold text-white">Blood Draw / Syringe Needle</h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                  Hollow steel cylinder with beveled razor edge designed to slice tissue to inject fluid.
                </p>
              </div>

              <div className="py-4 bg-neutral-900 rounded-lg border border-neutral-800 flex items-center justify-center relative h-24 overflow-hidden">
                <div 
                  className="rounded-full border-[4px] border-neutral-400 bg-transparent flex items-center justify-center"
                  style={{
                    width: `${0.81 * zoomLevel * 14}px`,
                    height: `${0.81 * zoomLevel * 14}px`
                  }}
                >
                  <span className="text-[9px] text-neutral-500 font-mono">Hollow</span>
                </div>
                <span className="absolute bottom-1.5 text-[10px] text-neutral-500">
                  4.5× Thicker + Slices tissue
                </span>
              </div>

              <div className="text-[11px] text-neutral-400 pt-1 border-t border-neutral-800">
                Why hospital shots sting, but acupuncture does not
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}