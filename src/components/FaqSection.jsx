import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { FAQS_DATA } from '../data/websiteContent';

export default function FaqSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(0);

  const filteredFaqs = FAQS_DATA.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#581c87]">Knowledge & Guidance</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#161820] font-display">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Everything you need to know about our acupuncture techniques, safety, and counseling sessions.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto pt-4">
            <Search className="w-4 h-4 absolute left-4 top-7 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keywords (e.g., hurt, safe, sessions, cost)..."
              className="w-full pl-11 pr-4 py-3 text-xs bg-[#faf8fb] border border-[#ede7f3] rounded-full focus:outline-none focus:border-[#581c87] transition-all shadow-inner"
            />
          </div>

          {/* Filter Categories */}
          <div className="flex justify-center gap-2 pt-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeCategory === 'all' ? 'bg-[#66478d] text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Questions ({FAQS_DATA.length})
            </button>
            <button
              onClick={() => setActiveCategory('acupuncture')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeCategory === 'acupuncture' ? 'bg-[#581c87] text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Acupuncture Therapy
            </button>
            <button
              onClick={() => setActiveCategory('counselling')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeCategory === 'counselling' ? 'bg-[#66478d] text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Counselling Therapy
            </button>
          </div>
        </div>

        {/* Accordion Stream */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="border border-[#ede7f3] rounded-2xl overflow-hidden transition-colors">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left font-bold text-xs sm:text-sm text-gray-900 flex justify-between items-center bg-[#faf8fb] hover:bg-pink-50/40 transition-colors"
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180 text-[#581c87]' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-6 py-4 text-xs text-gray-600 bg-white border-t border-gray-100 leading-relaxed animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
