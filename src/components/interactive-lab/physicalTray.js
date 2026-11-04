import * as THREE from 'three';

// 3D Sprite Label for Tools in Physical Tray
export function createTrayToolLabelCanvas(title, subtitle, isSelected) {
  const canvas = document.createElement('canvas');
  canvas.width = 240;
  canvas.height = 70;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = isSelected ? 'rgba(224, 40, 104, 0.95)' : 'rgba(15, 23, 42, 0.92)';
  ctx.strokeStyle = isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.35)';
  ctx.lineWidth = 2;

  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(4, 4, 232, 62, 12);
  else ctx.rect(4, 4, 232, 62);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(title, 120, 30);

  ctx.fillStyle = isSelected ? 'rgba(255, 255, 255, 0.9)' : '#94a3b8';
  ctx.font = '600 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(subtitle, 120, 50);

  return canvas;
}

// Build Physical 3D Surgical Instrument Tray with 3 Aligned Tools
export function buildPhysical3DTray(parentGroup, trayToolHitboxes, trayHaloMeshes, trayLabelSprites) {
  const trayGroup = new THREE.Group();
  parentGroup.add(trayGroup);

  const steelMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.85,
    roughness: 0.25
  });

  // Main Tray Base
  const trayBase = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.024, 0.32), steelMat);
  trayBase.castShadow = true;
  trayBase.receiveShadow = true;
  trayGroup.add(trayBase);

  // Sterile Plush Cushion Insert (Teal surgical cloth)
  const padMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    roughness: 0.85,
    metalness: 0.05
  });
  const trayPad = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.012, 0.28), padMat);
  trayPad.position.y = 0.012;
  trayPad.receiveShadow = true;
  trayGroup.add(trayPad);

  // Raised Rim Frame
  const rimMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.95, roughness: 0.2 });
  const rimL = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.035, 0.32), rimMat);
  rimL.position.x = -0.26; rimL.position.y = 0.018; trayGroup.add(rimL);
  const rimR = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.035, 0.32), rimMat);
  rimR.position.x = 0.26; rimR.position.y = 0.018; trayGroup.add(rimR);
  const rimT = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.035, 0.018), rimMat);
  rimT.position.z = -0.16; rimT.position.y = 0.018; trayGroup.add(rimT);
  const rimB = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.035, 0.018), rimMat);
  rimB.position.z = 0.16; rimB.position.y = 0.018; trayGroup.add(rimB);

  // ==========================================
  // Slot 1: Needle (Left Slot)
  // ==========================================
  const needleSlot = new THREE.Group();
  needleSlot.position.set(-0.15, 0.020, 0.0);
  trayGroup.add(needleSlot);

  const needleHalo = new THREE.Mesh(
    new THREE.RingGeometry(0.04, 0.08, 32),
    new THREE.MeshBasicMaterial({ color: 0xe02868, side: THREE.DoubleSide, transparent: true, opacity: 0.85 })
  );
  needleHalo.rotation.x = -Math.PI / 2;
  needleHalo.position.y = 0.001;
  needleSlot.add(needleHalo);
  if (trayHaloMeshes) trayHaloMeshes.needle = needleHalo;

  // Translucent guide tube
  const guideTubeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.45, roughness: 0.2 });
  const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.18, 16), guideTubeMat);
  tube.rotation.z = Math.PI / 2;
  tube.position.y = 0.012;
  needleSlot.add(tube);

  // Stainless Needle inside
  const nShaft = new THREE.Mesh(
    new THREE.CylinderGeometry(0.002, 0.002, 0.22, 12),
    new THREE.MeshStandardMaterial({ color: 0xf1f5f9, metalness: 0.98, roughness: 0.1 })
  );
  nShaft.rotation.z = Math.PI / 2;
  nShaft.position.y = 0.012;
  needleSlot.add(nShaft);

  // Copper Coiled Handle
  const nHandle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.005, 0.005, 0.065, 16),
    new THREE.MeshStandardMaterial({ color: 0xb45309, metalness: 0.95, roughness: 0.25 })
  );
  nHandle.rotation.z = Math.PI / 2;
  nHandle.position.set(-0.08, 0.012, 0.0);
  needleSlot.add(nHandle);

  const needleLabelTex = new THREE.CanvasTexture(createTrayToolLabelCanvas('01 Needle', '0.18mm Guide', true));
  const needleLabelSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: needleLabelTex }));
  needleLabelSprite.position.set(0, 0.065, 0.11);
  needleLabelSprite.scale.set(0.11, 0.032, 1.0);
  needleLabelSprite.userData = { isToolSlot: true, toolId: 'needle' };
  needleSlot.add(needleLabelSprite);
  if (trayLabelSprites) trayLabelSprites.needle = needleLabelSprite;
  if (trayToolHitboxes) trayToolHitboxes.push(needleLabelSprite);

  const nHit = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.10, 0.28), new THREE.MeshBasicMaterial({ visible: false }));
  nHit.position.y = 0.025;
  nHit.userData = { isToolSlot: true, toolId: 'needle' };
  needleSlot.add(nHit);
  if (trayToolHitboxes) trayToolHitboxes.push(nHit);

  // ==========================================
  // Slot 2: Glass Cupping Jar (Center Slot) - Realistic Bell Glass
  // ==========================================
  const cupSlot = new THREE.Group();
  cupSlot.position.set(0.0, 0.020, 0.0);
  trayGroup.add(cupSlot);

  const cupHalo = new THREE.Mesh(
    new THREE.RingGeometry(0.05, 0.10, 32),
    new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.0 })
  );
  cupHalo.rotation.x = -Math.PI / 2;
  cupHalo.position.y = 0.001;
  cupSlot.add(cupHalo);
  if (trayHaloMeshes) trayHaloMeshes.cup = cupHalo;

  // Premium Thick Medical Glass Material for Cupping Jar (Solid presence, rich glass tint)
  const cupGlassMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    roughness: 0.10,
    metalness: 0.20,
    transparent: true,
    opacity: 0.88,
    side: THREE.DoubleSide
  });

  // 1. Thick Smooth Rounded Lip Rim (Base of Jar)
  const cupLipRim = new THREE.Mesh(
    new THREE.TorusGeometry(0.052, 0.007, 16, 32),
    cupGlassMat
  );
  cupLipRim.rotation.x = Math.PI / 2;
  cupLipRim.position.y = 0.007;
  cupSlot.add(cupLipRim);

  // 2. Flared Bell Body (Cylinder tapering up)
  const cupBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.046, 0.052, 0.038, 32, 1, true),
    cupGlassMat
  );
  cupBody.position.y = 0.026;
  cupSlot.add(cupBody);

  // 3. Bulbous Glass Dome (Top half of jar)
  const cupDome = new THREE.Mesh(
    new THREE.SphereGeometry(0.054, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.72),
    cupGlassMat
  );
  cupDome.rotation.x = Math.PI;
  cupDome.position.y = 0.088;
  cupSlot.add(cupDome);

  // 4. Brass Vacuum Valve Collar on Top Dome
  const valveCollar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.012, 0.014, 0.015, 20),
    cupGlassMat
  );
  valveCollar.position.y = 0.092;
  cupSlot.add(valveCollar);

  // 5. Polished Brass Mechanical Suction Valve Pin
  const cupValve = new THREE.Mesh(
    new THREE.CylinderGeometry(0.005, 0.007, 0.026, 16),
    new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.95, roughness: 0.2 })
  );
  cupValve.position.y = 0.106;
  cupSlot.add(cupValve);

  const cupLabelTex = new THREE.CanvasTexture(createTrayToolLabelCanvas('02 Cup', 'Glass Vacuum', false));
  const cupLabelSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: cupLabelTex }));
  cupLabelSprite.position.set(0, 0.085, 0.12);
  cupLabelSprite.scale.set(0.12, 0.035, 1.0);
  cupLabelSprite.userData = { isToolSlot: true, toolId: 'cup' };
  cupSlot.add(cupLabelSprite);
  if (trayLabelSprites) trayLabelSprites.cup = cupLabelSprite;
  if (trayToolHitboxes) trayToolHitboxes.push(cupLabelSprite);

  const cupHit = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.14, 0.28), new THREE.MeshBasicMaterial({ visible: false }));
  cupHit.position.y = 0.05;
  cupHit.userData = { isToolSlot: true, toolId: 'cup' };
  cupSlot.add(cupHit);
  if (trayToolHitboxes) trayToolHitboxes.push(cupHit);

  // ==========================================
  // Slot 3: Herbal Moxa Roll (Right Slot)
  // ==========================================
  const moxaSlot = new THREE.Group();
  moxaSlot.position.set(0.15, 0.020, 0.0);
  trayGroup.add(moxaSlot);

  const moxaHalo = new THREE.Mesh(
    new THREE.RingGeometry(0.04, 0.08, 32),
    new THREE.MeshBasicMaterial({ color: 0xf97316, side: THREE.DoubleSide, transparent: true, opacity: 0.0 })
  );
  moxaHalo.rotation.x = -Math.PI / 2;
  moxaHalo.position.y = 0.001;
  moxaSlot.add(moxaHalo);
  if (trayHaloMeshes) trayHaloMeshes.moxa = moxaHalo;

  const moxaRoll = new THREE.Mesh(
    new THREE.CylinderGeometry(0.015, 0.015, 0.16, 16),
    new THREE.MeshStandardMaterial({ color: 0xd6d3d1, roughness: 0.85 })
  );
  moxaRoll.rotation.x = Math.PI / 2;
  moxaRoll.position.y = 0.015;
  moxaSlot.add(moxaRoll);

  const moxaTip = new THREE.Mesh(
    new THREE.CylinderGeometry(0.014, 0.015, 0.02, 16),
    new THREE.MeshStandardMaterial({ color: 0xff3300, emissive: 0xff4400, emissiveIntensity: 0.9 })
  );
  moxaTip.rotation.x = Math.PI / 2;
  moxaTip.position.set(0, 0.015, 0.08);
  moxaSlot.add(moxaTip);

  const moxaLabelTex = new THREE.CanvasTexture(createTrayToolLabelCanvas('03 Moxa', 'Herbal Warmth', false));
  const moxaLabelSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: moxaLabelTex }));
  moxaLabelSprite.position.set(0, 0.065, 0.11);
  moxaLabelSprite.scale.set(0.11, 0.032, 1.0);
  moxaLabelSprite.userData = { isToolSlot: true, toolId: 'moxa' };
  moxaSlot.add(moxaLabelSprite);
  if (trayLabelSprites) trayLabelSprites.moxa = moxaLabelSprite;
  if (trayToolHitboxes) trayToolHitboxes.push(moxaLabelSprite);

  const moxaHit = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.10, 0.28), new THREE.MeshBasicMaterial({ visible: false }));
  moxaHit.position.y = 0.025;
  moxaHit.userData = { isToolSlot: true, toolId: 'moxa' };
  moxaSlot.add(moxaHit);
  if (trayToolHitboxes) trayToolHitboxes.push(moxaHit);

  return trayGroup;
}
