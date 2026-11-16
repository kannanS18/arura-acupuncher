import * as THREE from 'three';

// Procedural Authentic Chinese Artemisia Moxa Roll Texture
export function createAuthenticMoxaTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // 1. Handmade warm mulberry / kraft paper background
  const paperGrad = ctx.createLinearGradient(0, 0, 512, 0);
  paperGrad.addColorStop(0, '#e5d5be');
  paperGrad.addColorStop(0.5, '#f2e8dc');
  paperGrad.addColorStop(1, '#e5d5be');
  ctx.fillStyle = paperGrad;
  ctx.fillRect(0, 0, 512, 256);

  // Micro organic herbal fiber flecks
  ctx.fillStyle = 'rgba(120, 53, 15, 0.14)';
  for (let i = 0; i < 260; i++) {
    const fx = Math.random() * 512;
    const fy = Math.random() * 256;
    ctx.fillRect(fx, fy, Math.random() * 2.5 + 1, Math.random() * 1.5 + 0.5);
  }

  // Elegant gold foil line borders (thin, refined)
  const drawGoldBand = (y, h) => {
    const goldGrad = ctx.createLinearGradient(0, y, 512, y);
    goldGrad.addColorStop(0, '#92400e');
    goldGrad.addColorStop(0.5, '#f59e0b');
    goldGrad.addColorStop(1, '#92400e');
    ctx.fillStyle = goldGrad;
    ctx.fillRect(0, y, 512, h);
  };
  drawGoldBand(12, 3);
  drawGoldBand(240, 3);

  // Traditional Red Cinnabar Seal Stamp (Square)
  ctx.fillStyle = '#991b1b';
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(40, 60, 68, 68, 6);
  else ctx.rect(40, 60, 68, 68);
  ctx.fill();

  ctx.strokeStyle = '#fef2f2';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18px "Noto Serif SC", "Songti SC", serif';
  ctx.textAlign = 'center';
  ctx.fillText('神灸', 74, 98);
  ctx.font = 'bold 13px "Noto Serif SC", "Songti SC", serif';
  ctx.fillText('純艾', 74, 118);

  // Clinical English Typography
  ctx.textAlign = 'left';
  ctx.fillStyle = '#292524';
  ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('ARURA AGED MUGWORT MOXA', 130, 88);

  ctx.fillStyle = '#78350f';
  ctx.font = '600 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('10:1 ARTEMISIA ARGYI • CLINICAL HERBAL ROLL', 130, 108);

  ctx.fillStyle = '#57534e';
  ctx.font = '500 10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Traditional Infrared Thermal Meridian Therapy', 130, 126);

  // Secondary Traditional Stamp
  ctx.strokeStyle = '#991b1b';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(450, 94, 24, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#991b1b';
  ctx.font = 'bold 11px "Noto Serif SC", serif';
  ctx.textAlign = 'center';
  ctx.fillText('陳年', 450, 92);
  ctx.fillText('艾條', 450, 106);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

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

// Helper to dynamically show/hide physical tray slots based on clinical indications
export function updateTrayToolAvailability(slots, allowedToolIds) {
  if (!slots) return;
  const { needleSlot, cupSlot, moxaSlot } = slots;
  if (needleSlot) needleSlot.visible = allowedToolIds.includes('needle');
  if (cupSlot) cupSlot.visible = allowedToolIds.includes('cup');
  if (moxaSlot) moxaSlot.visible = allowedToolIds.includes('moxa');
}
