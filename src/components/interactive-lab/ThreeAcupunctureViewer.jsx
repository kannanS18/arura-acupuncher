import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RotateCw, ZoomIn, Info, ShieldCheck, ArrowRight } from 'lucide-react';

const THREE_POINTS = [
  {
    id: 'li4',
    code: 'LI4 (Hegu)',
    name: 'Joining Valley',
    position: [0.65, 0.42, 0.35],
    normal: [0.3, 0.9, 0.2],
    indications: 'Frontal Migraines, Facial Tension & Jaw Clenching',
    feel: 'Deep warm ache, relieves forehead pressure within 3 minutes.'
  },
  {
    id: 'li5',
    code: 'LI5 (Yangxi)',
    name: 'Yang Stream',
    position: [0.35, 0.15, 0.32],
    normal: [0.2, 0.8, 0.4],
    indications: 'Repetitive Strain Injury (RSI), Mouse Wrist & Tendonitis',
    feel: 'Releases tight wrist tendons, restoring natural joint mobility.'
  },
  {
    id: 'sj4',
    code: 'SJ4 (Yangchi)',
    name: 'Yang Pool',
    position: [0.0, 0.1, 0.38],
    normal: [0.0, 0.9, 0.2],
    indications: 'Chronic Wrist Stiffness, Cold Hands & Autonomic Warming',
    feel: 'Nourishing internal warmth radiating into fingers.'
  },
  {
    id: 'sj5',
    code: 'SJ5 (Waiguan)',
    name: 'Outer Pass',
    position: [0.0, -0.75, 0.35],
    normal: [0.0, 0.9, 0.15],
    indications: 'Cervical Neck Stiffness, Upper Back Spasm & Tinnitus',
    feel: 'Traveling wave of warmth up the arm into the trapezius.'
  }
];

export default function ThreeAcupunctureViewer({ onOpenBooking }) {
  const mountRef = useRef(null);
  const [selectedPoint, setSelectedPoint] = useState(THREE_POINTS[0]);
  const [isInserted, setIsInserted] = useState(false);
  const [needleDepth, setNeedleDepth] = useState(0); // 0 to 1
  const needleGroupRef = useRef(null);
  const controlsRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 3.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 6.0;
    controls.minDistance = 2.0;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    // 3. Lighting Setup (Soft Studio Sanctuary)
    const ambientLight = new THREE.AmbientLight(0xfff7f2, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(3, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0xe02868, 1.5, 10);
    fillLight.position.set(-3, -1, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffe8d6, 1.0);
    rimLight.position.set(0, -4, -3);
    scene.add(rimLight);

    // 4. Anatomical Hand & Forearm 3D Group
    const anatomyGroup = new THREE.Group();
    scene.add(anatomyGroup);

    // Warm Realistic PBR Skin Material
    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0xdec6b8,
      roughness: 0.55,
      metalness: 0.05,
      flatShading: false
    });

    // Forearm
    const forearmGeo = new THREE.CylinderGeometry(0.38, 0.44, 2.2, 32);
    forearmGeo.scale(1.1, 1.0, 0.85);
    const forearm = new THREE.Mesh(forearmGeo, skinMaterial);
    forearm.position.set(0, -0.9, 0);
    forearm.castShadow = true;
    forearm.receiveShadow = true;
    anatomyGroup.add(forearm);

    // Wrist / Palm
    const palmGeo = new THREE.BoxGeometry(0.85, 0.85, 0.36, 16, 16, 16);
    const palm = new THREE.Mesh(palmGeo, skinMaterial);
    palm.position.set(0.05, 0.45, 0.05);
    palm.castShadow = true;
    palm.receiveShadow = true;
    anatomyGroup.add(palm);

    // Thenar Eminence (Thumb muscle mount - Hegu base)
    const thenarGeo = new THREE.SphereGeometry(0.38, 24, 24);
    thenarGeo.scale(1.2, 0.9, 0.7);
    const thenar = new THREE.Mesh(thenarGeo, skinMaterial);
    thenar.position.set(0.45, 0.35, 0.15);
    anatomyGroup.add(thenar);

    // Thumb
    const thumbGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.75, 16);
    const thumb = new THREE.Mesh(thumbGeo, skinMaterial);
    thumb.position.set(0.75, 0.65, 0.1);
    thumb.rotation.z = -Math.PI / 4.5;
    anatomyGroup.add(thumb);

    // Fingers
    const fingerPositions = [
      { x: 0.32, y: 1.05, len: 0.75 },
      { x: 0.1, y: 1.15, len: 0.85 },
      { x: -0.12, y: 1.1, len: 0.8 },
      { x: -0.32, y: 0.95, len: 0.65 }
    ];

    fingerPositions.forEach((pos) => {
      const fingerGeo = new THREE.CylinderGeometry(0.09, 0.1, pos.len, 16);
      const finger = new THREE.Mesh(fingerGeo, skinMaterial);
      finger.position.set(pos.x, pos.y, 0.05);
      anatomyGroup.add(finger);
    });

    // 5. 3D Acupoints
    const pointMeshes = [];
    THREE_POINTS.forEach((pt) => {
      const sphereGeo = new THREE.SphereGeometry(0.038, 16, 16);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xe02868,
        emissiveIntensity: 2.2,
        roughness: 0.2
      });
      const mesh = new THREE.Mesh(sphereGeo, sphereMat);
      mesh.position.set(...pt.position);
      mesh.userData = pt;
      anatomyGroup.add(mesh);
      pointMeshes.push(mesh);
    });

    // 6. Real 3D Acupuncture Needle (Coiled Wire Handle + Mirror Shaft)
    const needleGroup = new THREE.Group();
    needleGroupRef.current = needleGroup;
    scene.add(needleGroup);

    // Metallic Coiled Handle
    const handleGeo = new THREE.CylinderGeometry(0.024, 0.024, 0.65, 16);
    const handleMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // classical gold/copper coil
      metalness: 0.85,
      roughness: 0.25
    });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.position.y = 0.65;
    needleGroup.add(handle);

    // Top Ring Loop
    const torusGeo = new THREE.TorusGeometry(0.028, 0.008, 12, 24);
    const torus = new THREE.Mesh(torusGeo, handleMat);
    torus.position.y = 0.98;
    torus.rotation.x = Math.PI / 2;
    needleGroup.add(torus);

    // 0.18mm Polished Surgical Steel Shaft
    const shaftGeo = new THREE.CylinderGeometry(0.006, 0.006, 0.65, 8);
    const shaftMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.98,
      roughness: 0.1
    });
    const shaft = new THREE.Mesh(shaftGeo, shaftMat);
    shaft.position.y = 0.0;
    needleGroup.add(shaft);

    // Position needle initially above LI4
    needleGroup.position.set(0.65, 0.95, 0.35);

    // 7. Raycaster for Interactive Point Clicks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleCanvasClick = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(pointMeshes);

      if (intersects.length > 0) {
        const hitPoint = intersects[0].object.userData;
        setSelectedPoint(hitPoint);
      }
    };

    renderer.domElement.addEventListener('click', handleCanvasClick);

    // 8. Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', handleCanvasClick);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Animate Needle to Selected Point
  useEffect(() => {
    if (!needleGroupRef.current || !selectedPoint) return;
    const needle = needleGroupRef.current;
    const [tx, ty, tz] = selectedPoint.position;

    // Position above point
    needle.position.set(tx, ty + (isInserted ? 0.0 : 0.45), tz);
  }, [selectedPoint, isInserted]);

  const toggleInsertion = () => {
    setIsInserted(!isInserted);
  };

  return (
    <div className="bg-[#fbfbfa] rounded-3xl border border-neutral-200 p-6 sm:p-10 shadow-xs space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200/80 pb-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center space-x-2 text-xs font-semibold text-brand">
            <ZoomIn className="w-4 h-4" />
            <span>WebGL 3D Spatial Simulator</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
            360° Real-Time 3D Anatomical Needle Lab
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
            Drag to orbit 360°, scroll to zoom, and click any glowing acupoint node. Watch the 3D surgical needle align to the skin’s anatomical surface in real-time space.
          </p>
        </div>

        {/* 3D Action Toolbar */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleInsertion}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer ${
              isInserted ? 'bg-emerald-600 text-white' : 'bg-neutral-900 text-white hover:bg-brand'
            }`}
          >
            {isInserted ? 'Retract 3D needle' : 'Insert 3D needle'}
          </button>
        </div>
      </div>

      {/* Main 3D WebGL Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* 3D Viewport (8 cols) */}
        <div className="lg:col-span-8 bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl relative h-[480px]">
          
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* 3D HUD Navigation Overlay */}
          <div className="absolute top-4 left-4 pointer-events-none text-white/80 space-y-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-brand block">
              Three.js PBR Studio
            </span>
            <span className="text-xs font-semibold text-white">
              Target: {selectedPoint.code}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 pointer-events-none flex justify-between text-[11px] text-white/60">
            <span>Left Click + Drag: Orbit 360°</span>
            <span>Scroll: Zoom In / Out</span>
          </div>

        </div>

        {/* Point Clinical Card (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-5">
            <div className="flex items-baseline justify-between border-b border-neutral-100 pb-3">
              <div>
                <h4 className="font-display text-xl font-bold text-ink">
                  {selectedPoint.code}
                </h4>
                <span className="text-xs text-brand font-semibold">{selectedPoint.name}</span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-md bg-neutral-100 font-medium text-neutral-700">
                3D Node
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <span className="text-neutral-500 font-bold uppercase tracking-wider block">
                Primary Indication
              </span>
              <p className="text-sm text-neutral-800 font-normal leading-relaxed">
                {selectedPoint.indications}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950/90 leading-relaxed">
              <strong className="block text-amber-900 font-semibold mb-0.5">Physical Sensation:</strong>
              {selectedPoint.feel}
            </div>

            {/* Quick point list selector */}
            <div className="space-y-2 pt-2 border-t border-neutral-100">
              <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
                Select 3D Acupoint:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {THREE_POINTS.map((pt) => (
                  <button
                    key={pt.id}
                    onClick={() => setSelectedPoint(pt)}
                    className={`p-2 rounded-lg text-xs font-semibold transition-colors text-left cursor-pointer ${
                      selectedPoint.id === pt.id
                        ? 'bg-brand text-white'
                        : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                    }`}
                  >
                    {pt.code.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenBooking(`Consultation (${selectedPoint.code})`, 600)}
                className="w-full py-3 rounded-xl text-xs font-semibold bg-neutral-900 text-white hover:bg-brand transition-colors flex items-center justify-center space-x-1.5 shadow-sm cursor-pointer"
              >
                <span>Book 1-on-1 Session (₹600)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
