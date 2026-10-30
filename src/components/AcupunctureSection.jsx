import React from 'react';
import { Flame, Disc, Leaf, Zap, Sun, Activity } from 'lucide-react';
import { ACUPUNCTURE_TECHNIQUES } from '../data/websiteContent';

export default function AcupunctureSection() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'flame': return <Flame className="w-5 h-5" />;
      case 'disc': return <Disc className="w-5 h-5" />;
      case 'leaf': return <Leaf className="w-5 h-5" />;
      case 'zap': return <Zap className="w-5 h-5" />;
      case 'sun': return <Sun className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  return (
    <section id="acupuncture-procedure" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#581c87]">Clinical Methodology</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-display">What a Typical Acupuncture Treatment is Like</h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            From detailed pulse and lifestyle consultation to comfortable needle placement on strategic meridian points. Sessions are relaxing, minimally painful, and rejuvenate your body's self-healing mechanisms.
          </p>
        </div>

        {/* 3-Step Journey */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 bg-[#faf7fc] rounded-2xl border border-[#ede7f3] space-y-3 relative">
            <span className="w-8 h-8 rounded-full bg-[#66478d] text-white font-bold text-xs flex items-center justify-center">1</span>
            <h4 className="font-bold text-gray-900 text-sm">Diagnosis & Health History</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              We evaluate your health history, diet, sleep, stress patterns, and temperature/seasonal sensitivity to identify the root cause of meridian blockage.
            </p>
          </div>

          <div className="p-6 bg-[#faf7fc] rounded-2xl border border-[#ede7f3] space-y-3 relative">
            <span className="w-8 h-8 rounded-full bg-[#581c87] text-white font-bold text-xs flex items-center justify-center">2</span>
            <h4 className="font-bold text-gray-900 text-sm">Needle Insertion (5–20 Needles)</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Ultra-thin, sterile single-use needles are gently placed at specific depths. Most clients feel zero pain or only a mild, soothing tingling sensation.
            </p>
          </div>

          <div className="p-6 bg-[#faf7fc] rounded-2xl border border-[#ede7f3] space-y-3 relative">
            <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">3</span>
            <h4 className="font-bold text-gray-900 text-sm">Relaxation & Needle Removal</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              You lie comfortably on a padded table for 20 to 40 minutes while your qi (vital energy) recirculates. Needles are removed painlessly with zero downtime.
            </p>
          </div>
        </div>

        {/* 6 Integrated Techniques */}
        <div className="pt-8 border-t border-[#ede7f3]">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-gray-900 font-display">Advanced Complementary Techniques at Arura</h3>
            <p className="text-xs text-gray-500 mt-1">Multi-modal clinical techniques used as needed during your session</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACUPUNCTURE_TECHNIQUES.map((tech, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-[#ede7f3] hover:border-[#581c87] transition-all bg-white hover:shadow-lg space-y-3">
                <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#581c87] flex items-center justify-center">
                  {getIcon(tech.icon)}
                </div>
                <h4 className="font-bold text-gray-900 text-sm">{tech.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
