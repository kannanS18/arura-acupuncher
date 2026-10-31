import React, { useState } from 'react';
import { DISORDERS } from '../data/websiteContent';
import { Search, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function DisordersPage({ onOpenBooking }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Categories' },
    ...DISORDERS.map(d => ({ id: d.category, label: d.category }))
  ];

  const filteredDisorders = DISORDERS.filter(category => {
    const matchesCategory = activeCategory === 'all' || category.category === activeCategory;
    const matchesSearch = 
      category.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.items.some(item => 
        (typeof item === 'string' ? item : item.name).toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white text-[#09090b] min-h-screen">
      
      {/* Header Banner */}
      <section className="pt-24 pb-20 bg-ambient-light border-b border-gray-200/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-xs uppercase tracking-wider text-[#581c87] font-bold">
              <span>Clinical Taxonomy</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#09090b] leading-[1.12]">
              Disorders Treated & <br />
              <span className="text-gradient-luxury">Clinical Taxonomies</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 font-normal leading-relaxed max-w-3xl">
              Arura specializes in treating root systemic blockages across 6 major physiological and emotional categories. Search below to understand how acupuncture and psychotherapy restore balance.
            </p>
          </div>

          {/* Luxury Search Bar */}
          <div className="mt-10 max-w-2xl relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by condition (e.g., Migraine, Sciatica, Gastritis, Insomnia, PCOS, Anxiety)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-gray-50 border border-gray-200/80 text-sm font-sans text-[#09090b] placeholder-gray-400 focus:outline-none focus:border-[#09090b] focus:ring-1 focus:ring-black shadow-sm transition-all"
            />
          </div>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-xl border-b border-gray-200/80 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl whitespace-nowrap uppercase tracking-wider transition-all font-bold ${
                  activeCategory === cat.id
                    ? 'bg-[#09090b] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:text-black hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Disorders Grid */}
      <section className="py-20 lg:py-28 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {filteredDisorders.length === 0 ? (
            <div className="text-center py-20 text-gray-500 text-sm">
              No matching condition found for "{searchTerm}". Contact Dr. Nivedha directly for a personalized diagnosis.
            </div>
          ) : (
            filteredDisorders.map((cat, catIdx) => (
              <div key={catIdx} className="space-y-8">
                <div className="flex items-center justify-between border-b border-gray-200/80 pb-4">
                  <h2 className="font-display text-3xl sm:text-4xl text-[#09090b] font-bold tracking-tight">
                    {cat.category}
                  </h2>
                  <span className="text-xs uppercase tracking-wider text-[#581c87] bg-purple-50 border border-purple-200 px-3.5 py-1.5 rounded-full font-bold">
                    {cat.items.length} Documented Conditions
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cat.items.map((item, idx) => {
                    const itemName = typeof item === 'string' ? item : item.name;
                    return (
                      <div key={idx} className="spotlight-card p-8 rounded-3xl space-y-4 flex flex-col justify-between border border-gray-200/80">
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <h4 className="font-display text-xl sm:text-2xl font-bold text-[#09090b] leading-snug">{itemName}</h4>
                          </div>
                          <p className="text-sm text-gray-700 font-normal leading-relaxed pl-8">
                            Targeted meridian needle placement and neuro-vascular stimulation to address underlying qi stagnation and biological inflammation.
                          </p>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between pl-8">
                          <button
                            onClick={() => onOpenBooking(itemName, 600)}
                            className="text-xs text-[#581c87] hover:text-black font-bold flex items-center space-x-1.5 transition-colors uppercase tracking-wider"
                          >
                            <span>Consult on this →</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

    </div>
  );
}
