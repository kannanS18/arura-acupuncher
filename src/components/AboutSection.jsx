import React from 'react';
import { ShieldCheck, Compass, Feather, Check } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#581c87]">Holistic Philosophy</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-display">Why Arura Wellness Studio?</h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            True wellness begins by understanding and treating the root cause of health concerns. Our integrated approach blends physical acupuncture needle stimulation with empathetic counseling support in a calm, aseptic environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-8 rounded-3xl bg-[#faf7fc] border border-[#ede7f3] hover:shadow-xl transition-all duration-300 space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#66478d] flex items-center justify-center group-hover:bg-[#66478d] group-hover:text-white transition-colors">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 class="text-lg font-bold text-gray-900">Aseptic Surgical Hygiene</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Clean clinical environment with strict aseptic techniques. We use single-use, disposable acupuncture needles that are sterile, sealed, and packaged by the manufacturer.
            </p>
            <ul className="text-xs text-gray-500 space-y-1.5 pt-2">
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-[#581c87]" />
                <span>Modern surgical stainless steel needles</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-[#581c87]" />
                <span>Never reused, zero contamination risk</span>
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-3xl bg-[#faf7fc] border border-[#ede7f3] hover:shadow-xl transition-all duration-300 space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-pink-100 text-[#581c87] flex items-center justify-center group-hover:bg-[#581c87] group-hover:text-white transition-colors">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Personalized Diagnosis</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Every body is unique. We begin by asking about diet, sleep, stress level, appetite, and your body's response to changes in temperature and seasons before placing a single needle.
            </p>
            <ul className="text-xs text-gray-500 space-y-1.5 pt-2">
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-[#581c87]" />
                <span>Deep holistic history & assessment</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-[#581c87]" />
                <span>Customized treatment plan for root recovery</span>
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-3xl bg-[#faf7fc] border border-[#ede7f3] hover:shadow-xl transition-all duration-300 space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:bg-indigo-700 group-hover:text-white transition-colors">
              <Feather className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Mind-Body Integration</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Physical pain often carries an emotional component. Combining acupuncture with professional counseling creates a complete healing circuit for sustained, long-term vitality.
            </p>
            <ul className="text-xs text-gray-500 space-y-1.5 pt-2">
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-[#581c87]" />
                <span>Confidential, non-judgmental space</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-[#581c87]" />
                <span>Empathy, understanding and clarity</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
