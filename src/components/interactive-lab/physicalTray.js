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

// Procedural Authentic Chinese Artemisia Moxa Roll Texture
export function createAuthenticMoxaTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // 1. Handmade Xuan / Washi rice paper background
  const paperGrad = ctx.createLinearGradient(0, 0, 512, 0);
  paperGrad.addColorStop(0, '#fbf3df');
  paperGrad.addColorStop(0.5, '#fffbeb');
  paperGrad.addColorStop(1, '#fbf3df');
  ctx.fillStyle = paperGrad;
  ctx.fillRect(0, 0, 512, 256);

  // Micro organic herbal fiber flecks
  ctx.fillStyle = 'rgba(180, 83, 9, 0.16)';
  for (let i = 0; i < 350; i++) {
    const fx = Math.random() * 512;
    const fy = Math.random() * 256;
    ctx.fillRect(fx, fy, Math.random() * 2 + 1, Math.random() * 1.5 + 0.5);
  }

  // 2. Ornate gold foil geometric borders
  const drawGoldBand = (y, h) => {
    const goldGrad = ctx.createLinearGradient(0, y, 512, y);
    goldGrad.addColorStop(0, '#b45309');
    goldGrad.addColorStop(0.25, '#f59e0b');
    goldGrad.addColorStop(0.5, '#fef08a');
    goldGrad.addColorStop(0.75, '#f59e0b');
    goldGrad.addColorStop(1, '#b45309');
    ctx.fillStyle = goldGrad;
    ctx.fillRect(0, y, 512, h);
  };

  drawGoldBand(6, 8);
  drawGoldBand(242, 8);

  // 3. Imperial Jade Green Header Banner
  ctx.fillStyle = '#064e3b';
  ctx.fillRect(0, 24, 512, 48);
  drawGoldBand(72, 4);

  // Chinese Calligraphy text on Header
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px "Noto Serif SC", "PingFang SC", "Songti SC", serif';
  ctx.textAlign = 'center';
  ctx.fillText('極品純艾條 • 傳統神灸', 256, 56);

  // 4. Traditional Red Cinnabar Seal Stamp (Square)
  ctx.fillStyle = '#991b1b';
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(35, 96, 76, 76, 8);
  else ctx.rect(35, 96, 76, 76);
  ctx.fill();

  ctx.strokeStyle = '#fef2f2';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px "Noto Serif SC", "Songti SC", serif';
  ctx.fillText('神灸', 73, 130);
  ctx.font = 'bold 16px "Noto Serif SC", "Songti SC", serif';
  ctx.fillText('純陽', 73, 154);

  // 5. Clinical Grade English Typography
  ctx.textAlign = 'left';
  ctx.fillStyle = '#1c1917';
  ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('ARURA PURE ARTEMISIA MOXA', 130, 120);

  ctx.fillStyle = '#b45309';
  ctx.font = '700 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('10:1 AGED WILD MUGWORT (ARTEMISIA ARGYI)', 130, 140);

  ctx.fillStyle = '#44403c';
  ctx.font = '600 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Pure Thermal Yang Radiance • Deep Meridian Warmth', 130, 158);

  // 6. Secondary Traditional Stamp
  ctx.strokeStyle = '#991b1b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(460, 134, 30, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#991b1b';
  ctx.font = 'bold 13px "Noto Serif SC", serif';
  ctx.textAlign = 'center';
  ctx.fillText('三年陳艾', 460, 131);
  ctx.fillText('上品', 460, 146);

  // Gold footer band
  drawGoldBand(210, 4);
  ctx.fillStyle = '#78350f';
  ctx.font = '700 10px monospace';
  ctx.fillText('GRADE AAA+ • AUTHENTIC CLINICAL TCM ARTIFACT', 256, 230);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// Procedural Burning Ash & Fiery Ember Texture for Moxa Tip
export function createMoxaEmberTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#1c1917';
  ctx.fillRect(0, 0, 128, 128);

  // Dark organic compressed herbal charcoal fibers
  ctx.fillStyle = '#44403c';
  for (let i = 0; i < 200; i++) {
    ctx.fillRect(Math.random() * 128, Math.random() * 128, 2, 2);
  }

  // Radial incandescent fissures
  const cx = 64, cy = 64;
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    ctx.strokeStyle = '#ff3300';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * 55, cy + Math.sin(angle) * 55);
    ctx.stroke();

    ctx.strokeStyle = '#ffaa00';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * 45, cy + Math.sin(angle) * 45);
    ctx.stroke();
  }

  // Core hot coal center
  const coreGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, 28);
  coreGrad.addColorStop(0, '#ffffff');
  coreGrad.addColorStop(0.3, '#ffaa00');
  coreGrad.addColorStop(0.7, '#ff3300');
  coreGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = coreGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, 28, 0, Math.PI * 2);
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
}

// Build Physical 3D Surgical Instrument Tray with 3 Authentically Textured Tools
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
  // Slot 2: Traditional Thick Molded Glass Fire Cupping Jar (Center Slot)
  // NOT blue plastic! Authentic Heavy Glass Presence with Anti-Slip Grips & Solid Top Knob
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

  // Clear Borosilicate Molded Glass Material (Solid, crystalline, non-plastic)
  const heavyGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transmission: 0.95,
    opacity: 1.0,
    transparent: true,
    roughness: 0.04,
    metalness: 0.02,
    ior: 1.52,
    thickness: 0.12,
    specularIntensity: 1.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  // 1. Thick Rounded Rolled Glass Lip Rim (Base of Jar)
  const cupLipRim = new THREE.Mesh(
    new THREE.TorusGeometry(0.054, 0.008, 20, 36),
    heavyGlassMat
  );
  cupLipRim.rotation.x = Math.PI / 2;
  cupLipRim.position.y = 0.008;
  cupSlot.add(cupLipRim);

  // Crisp White Specular Rim Highlight Glint
  const rimHighlight = new THREE.Mesh(
    new THREE.TorusGeometry(0.054, 0.002, 16, 36),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.02, metalness: 0.9 })
  );
  rimHighlight.rotation.x = Math.PI / 2;
  rimHighlight.position.y = 0.008;
  cupSlot.add(rimHighlight);

  // 2. Thick Flared Bell Glass Body
  const cupBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.046, 0.054, 0.042, 32, 1, true),
    heavyGlassMat
  );
  cupBody.position.y = 0.029;
  cupSlot.add(cupBody);

  // 3. Molded Anti-Slip Glass Finger Grip Indentations (Left and Right)
  const gripL = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.024, 0.018), heavyGlassMat);
  gripL.position.set(-0.048, 0.030, 0);
  cupSlot.add(gripL);
  const gripR = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.024, 0.018), heavyGlassMat);
  gripR.position.set(0.048, 0.030, 0);
  cupSlot.add(gripR);

  // 4. Bulbous Glass Dome
  const cupDome = new THREE.Mesh(
    new THREE.SphereGeometry(0.052, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.72),
    heavyGlassMat
  );
  cupDome.rotation.x = Math.PI;
  cupDome.position.y = 0.092;
  cupSlot.add(cupDome);

  // 5. Solid Molded Glass Crown Grip Knob on Top (Traditional Fire Cup feature)
  const glassKnobNeck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.014, 0.016, 0.016, 20),
    heavyGlassMat
  );
  glassKnobNeck.position.y = 0.096;
  cupSlot.add(glassKnobNeck);

  const glassKnobHead = new THREE.Mesh(
    new THREE.SphereGeometry(0.018, 24, 18),
    heavyGlassMat
  );
  glassKnobHead.position.y = 0.108;
  cupSlot.add(glassKnobHead);

  const cupLabelTex = new THREE.CanvasTexture(createTrayToolLabelCanvas('02 Cup', 'Glass Fire Cup', false));
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
  // Slot 3: Authentic Chinese Artemisia Moxa Roll (Right Slot)
  // NOT a cigarette! Xuan rice paper, gold foil bands, emerald header, cinnabar seal & dark ash tip
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

  // 1. Moxa Roll Cylinder with Authentic Rice Paper & Gold Calligraphy Texture
  const moxaTex = createAuthenticMoxaTexture();
  const moxaPaperMat = new THREE.MeshStandardMaterial({
    map: moxaTex,
    roughness: 0.75,
    metalness: 0.15
  });

  const moxaRoll = new THREE.Mesh(
    new THREE.CylinderGeometry(0.016, 0.016, 0.15, 24),
    moxaPaperMat
  );
  moxaRoll.rotation.x = Math.PI / 2;
  moxaRoll.position.y = 0.016;
  moxaSlot.add(moxaRoll);

  // 2. Burning Ash Ember Tip with Radial Incandescent Glowing Fissures
  const emberTex = createMoxaEmberTexture();
  const moxaTipMat = new THREE.MeshStandardMaterial({
    map: emberTex,
    color: 0xff3b00,
    emissive: 0xff2200,
    emissiveIntensity: 1.8,
    roughness: 0.4
  });
  const moxaTip = new THREE.Mesh(
    new THREE.CylinderGeometry(0.015, 0.016, 0.025, 24),
    moxaTipMat
  );
  moxaTip.rotation.x = Math.PI / 2;
  moxaTip.position.set(0, 0.016, 0.085);
  moxaSlot.add(moxaTip);

  // 3. Turned Dark Walnut Wood Handle Cap on Rear End (Eliminates cigarette filter look!)
  const woodCapMat = new THREE.MeshStandardMaterial({
    color: 0x27170e,
    roughness: 0.35,
    metalness: 0.1
  });
  const woodCap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.017, 0.017, 0.020, 24),
    woodCapMat
  );
  woodCap.rotation.x = Math.PI / 2;
  woodCap.position.set(0, 0.016, -0.082);
  moxaSlot.add(woodCap);

  // Brass ferrule ring between paper and wood cap
  const ferrule = new THREE.Mesh(
    new THREE.CylinderGeometry(0.0172, 0.0172, 0.005, 24),
    new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.95, roughness: 0.2 })
  );
  ferrule.rotation.x = Math.PI / 2;
  ferrule.position.set(0, 0.016, -0.070);
  moxaSlot.add(ferrule);

  const moxaLabelTex = new THREE.CanvasTexture(createTrayToolLabelCanvas('03 Moxa', 'Artemisia Stick', false));
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

  return { trayGroup, needleSlot, cupSlot, moxaSlot };
}

// Helper to dynamically show/hide physical tray slots based on clinical indications
export function updateTrayToolAvailability(slots, allowedToolIds) {
  if (!slots) return;
  const { needleSlot, cupSlot, moxaSlot } = slots;
  if (needleSlot) needleSlot.visible = allowedToolIds.includes('needle');
  if (cupSlot) cupSlot.visible = allowedToolIds.includes('cup');
  if (moxaSlot) moxaSlot.visible = allowedToolIds.includes('moxa');
}
