import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Activity, ShieldCheck, HeartPulse, CheckCircle2, ArrowRight } from 'lucide-react';

const MERIDIAN_NODES = [
  { id: 'gv20', name: 'GV20 (Baihui)', channel: 'Governing Vessel', target: 'Crown of Head', indication: 'Migraines, Insomnia, Brain Fog & Severe Stress', x: 0.5, y: 0.16 },
  { id: 'cv17', name: 'CV17 (Danzhong)', channel: 'Conception Vessel', target: 'Center of Chest', indication: 'Anxiety Panic, Palpitations, Grief & Somatic Chest Tightness', x: 0.5, y: 0.38 },
  { id: 'cv12', name: 'CV12 (Zhongwan)', channel: 'Conception Vessel', target: 'Solar Plexus', indication: 'Acid Reflux, IBS, Gastritis & Chronic Digestive Spasms', x: 0.5, y: 0.52 },
  { id: 'cv4', name: 'CV4 (Guanyuan)', channel: 'Conception Vessel', target: 'Lower Abdomen', indication: 'PCOS/PCOD, Menstrual Pain, Bladder Qi & Exhaustion', x: 0.5, y: 0.66 },
  { id: 'pc6', name: 'PC6 (Neiguan)', channel: 'Pericardium', target: 'Inner Wrist', indication: 'Nausea, Motion Sickness, Sleep Deprivation & Heart Rest', x: 0.28, y: 0.44 },
  { id: 'li4', name: 'LI4 (Hegu)', channel: 'Large Intestine', target: 'Hand Webbing', indication: 'Facial Pain, Sinusitis, Cervical Tension & Acute Headaches', x: 0.22, y: 0.58 },
  { id: 'st36', name: 'ST36 (Zusanli)', channel: 'Stomach Channel', target: 'Below Knee', indication: 'Immune Depletion, Chronic Fatigue & Lower Limb Strength', x: 0.72, y: 0.76 },
  { id: 'sp6', name: 'SP6 (Sanyinjiao)', channel: 'Spleen Channel', target: 'Inner Ankle', indication: 'Hormonal Rhythm, Pelvic Inflammation & Insomnia', x: 0.74, y: 0.90 }
];

export default function ZenMeridianAura({ onSelectNode }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [activeNode, setActiveNode] = useState(MERIDIAN_NODES[0]);
  const mouseRef = useRef({ x: -1000, y: -1000, isHovering: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = 540);

    const handleResize = () => {
      if (!container) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = 540;
    };
    window.addEventListener('resize', handleResize);

    // Flowing qi pulses along meridian tracks
    const pulses = [
      { from: 0, to: 1, progress: 0.1, speed: 0.007 },
      { from: 1, to: 2, progress: 0.4, speed: 0.008 },
      { from: 2, to: 3, progress: 0.7, speed: 0.006 },
      { from: 1, to: 4, progress: 0.2, speed: 0.009 },
      { from: 4, to: 5, progress: 0.5, speed: 0.008 },
      { from: 3, to: 6, progress: 0.3, speed: 0.007 },
      { from: 6, to: 7, progress: 0.6, speed: 0.008 }
    ];

    let animationFrame;
    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Subtle Background Constellation Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // 2. Compute absolute node positions
      const coords = MERIDIAN_NODES.map((n) => {
        const baseX = n.x * width;
        const baseY = n.y * height;
        // Subtle magnetic pull towards mouse
        const dx = mouseRef.current.x - baseX;
        const dy = mouseRef.current.y - baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const pull = dist < 120 ? (120 - dist) * 0.08 : 0;
        return {
          ...n,
          x: baseX + (dist > 0 ? (dx / dist) * pull : 0),
          y: baseY + (dist > 0 ? (dy / dist) * pull : 0)
        };
      });

      // 3. Draw Fluid Meridian Splines
      const connections = [
        [0, 1], [1, 2], [2, 3], // Central Vessel
        [1, 4], [4, 5],         // Arm Channels
        [3, 6], [6, 7]          // Leg Channels
      ];

      connections.forEach(([i, j]) => {
        const p1 = coords[i];
        const p2 = coords[j];

        // Curved energy spline
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        const midX = (p1.x + p2.x) / 2 + Math.sin(time + i) * 6;
        const midY = (p1.y + p2.y) / 2 + Math.cos(time + j) * 6;
        ctx.quadraticCurveTo(midX, midY, p2.x, p2.y);
        ctx.strokeStyle = 'rgba(102, 71, 141, 0.35)'; // Imperial Plum glow
        ctx.lineWidth = 2.5;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#66478d';
        ctx.stroke();
      });

      // 4. Draw Traveling Qi Pulses
      pulses.forEach((pulse) => {
        pulse.progress += pulse.speed;
        if (pulse.progress > 1) pulse.progress = 0;

        const p1 = coords[pulse.from];
        const p2 = coords[pulse.to];
        const px = p1.x + (p2.x - p1.x) * pulse.progress;
        const py = p1.y + (p2.y - p1.y) * pulse.progress;

        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#581c87'; // Lotus Fuchsia spark
        ctx.shadowBlur = 14;
        ctx.shadowColor = '#581c87';
        ctx.fill();
      });

      // 5. Draw Acupoint Nodes
      coords.forEach((n) => {
        const isSelected = activeNode.id === n.id;
        const radius = isSelected ? 8 : 5.5;

        // Outer ripple for selected node
        if (isSelected) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 16 + Math.sin(time * 3) * 4, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(237, 51, 115, 0.4)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Core Node
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? '#ffffff' : '#581c87';
        ctx.shadowBlur = isSelected ? 20 : 8;
        ctx.shadowColor = isSelected ? '#ffffff' : '#581c87';
        ctx.fill();

        // Node Label
        ctx.font = isSelected ? 'bold 12px Space Grotesk, monospace' : '11px Space Grotesk, monospace';
        ctx.fillStyle = isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.7)';
        ctx.shadowBlur = 0;
        ctx.fillText(n.name, n.x + 12, n.y + 4);
      });

      animationFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeNode]);

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Check hit against nodes
    for (const n of MERIDIAN_NODES) {
      const nodeX = n.x * canvas.width;
      const nodeY = n.y * canvas.height;
      const dist = Math.hypot(clickX - nodeX, clickY - nodeY);
      if (dist < 30) {
        setActiveNode(n);
        if (onSelectNode) onSelectNode(n);
        break;
      }
    }
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovering: true
    };
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* Interactive Flow Canvas */}
      <div 
        ref={containerRef}
        className="lg:col-span-7 relative rounded-3xl bg-[#0e0c14] border border-white/10 p-4 overflow-hidden shadow-2xl"
      >
        <div className="absolute top-4 left-6 z-10 flex items-center space-x-2 text-xs text-gray-400">
          <span className="w-2 h-2 rounded-full bg-[#581c87] animate-ping" />
          <span>Click any point or move mouse to bend meridian channels</span>
        </div>

        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { mouseRef.current.isHovering = false; }}
          className="w-full h-[540px] cursor-pointer block"
        />
      </div>

      {/* Clinical Node Inspector Card */}
      <div className="lg:col-span-5 space-y-5">
        <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 space-y-6 text-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-[11px] text-[#581c87] uppercase tracking-wider font-bold">
                Selected Meridian Hotspot
              </span>
              <h3 className="text-3xl font-display text-white font-normal mt-1">
                {activeNode.name}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#66478d]/30 border border-[#66478d]/40 flex items-center justify-center text-[#d8b4fe]">
              <HeartPulse className="w-6 h-6" />
            </div>
          </div>

          <div className="space-y-4 text-xs ">
            <div>
              <span className="text-gray-400 uppercase tracking-wider block text-[10px]">Anatomical Meridian:</span>
              <span className="text-white font-bold text-sm">{activeNode.channel}</span>
            </div>

            <div>
              <span className="text-gray-400 uppercase tracking-wider block text-[10px]">Physical Location:</span>
              <span className="text-gray-200 text-sm font-sans font-light">{activeNode.target}</span>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
              <span className="text-[#581c87] uppercase tracking-wider block text-[10px] font-bold">Clinical Healing Indication:</span>
              <p className="text-gray-200 text-xs font-sans font-light leading-relaxed">
                {activeNode.indication}
              </p>
            </div>
          </div>

          {/* Point Selector Chips */}
          <div className="pt-2">
            <span className="text-[10px] uppercase tracking-wider text-gray-400 block mb-2">
              Select Another Acupoint:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {MERIDIAN_NODES.map((n) => (
                <button
                  key={n.id}
                  onClick={() => setActiveNode(n)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                    activeNode.id === n.id
                      ? 'bg-[#581c87] text-white font-bold shadow-lg scale-105'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300'
                  }`}
                >
                  {n.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
