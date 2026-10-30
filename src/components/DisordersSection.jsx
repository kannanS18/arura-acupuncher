import React, { useState } from 'react';
import { Apple, Heart, Bone, Brain, Flower, Wind, CheckCircle2 } from 'lucide-react';
import { DISORDERS_DATA } from '../data/websiteContent';

export default function DisordersSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const getIcon = (catName) => {
    switch (catName) {
      case 'Digestive': return <Apple className="w-5 h-5 text-amber-600" />;
      case 'Emotional & Mental': return <Heart className="w-5 h-5 text-[#581c87]" />;
      case 'Musculoskeletal': return <Bone className="w-5 h-5 text-[#66478d]" />;
      case 'Neurological': return <Brain className="w-5 h-5 text-blue-600" />;
      case 'Gynecological': return <Flower className="w-5 h-5 text-rose-600" />;
      case 'Respiratory & ENT': return <Wind className="w-5 h-5 text-teal-600" />;
      default: return <CheckCircle2 className="w-5 h-5 text-gray-600" />;
    }
  };

  const filteredDisorders = activeCategory === 'All'
    ? DISORDERS_DATA
    : DISORDERS_DATA.filter(d => d.category === activeCategory);

  return (
    <section id="disorders" className="py-20 bg-[#faf8fb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#581c87]">Clinical Scope</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-display">Conditions & Disorders Treated</h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Acupuncture and holistic therapies support a wide spectrum of acute and chronic health conditions. Select any category below to explore symptoms we address.
          </p>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${
                activeCategory === 'All' ? 'bg-[#66478d] text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              All Categories
            </button>
            {DISORDERS_DATA.map((d, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(d.category)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  activeCategory === d.category ? 'bg-[#581c87] text-white border-[#581c87] shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-200'
                }`}
              >
                {d.category}
              </button>
            ))}
          </div>
        </div>

        {/* Disorders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDisorders.map((cat, idx) => (
            <div key={idx} className="p-6 bg-white rounded-3xl border border-[#ede7f3] shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#faf7fc] border border-gray-100 flex items-center justify-center">
                  {getIcon(cat.category)}
                </div>
                <h3 className="font-bold text-gray-900 text-sm">{cat.category}</h3>
              </div>

              <ul className="text-xs text-gray-600 space-y-2 pt-1 border-t border-gray-50">
                {cat.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#581c87]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
