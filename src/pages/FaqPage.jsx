import React, { useState } from 'react';
import { FAQS, CLINIC_INFO } from '../data/websiteContent';
import { Search, ChevronDown, Sparkles, MessageCircle, HelpCircle } from 'lucide-react';

export default function FaqPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const filteredFaqs = FAQS.filter(faq => {
    const matchesCategory = categoryFilter === 'all' || faq.category === categoryFilter;
    const matchesSearch = 
      faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="bg-white text-[#09090b] min-h-screen">
      
      {/* Header Banner */}
      <section className="relative pt-24 pb-20 border-b border-gray-200/80 bg-ambient-light overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-[#581c87] text-xs uppercase tracking-wider font-bold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Medical & Therapy Knowledge Hub</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#09090b] leading-[1.12]">
              Frequently Asked <br />
              <span className="text-gradient-luxury">Questions (33)</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
              Comprehensive clinical clarity regarding needle sensations, treatment pacing, disorders addressed, psychological confidentiality, and pre/post-session protocols.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-10 max-w-2xl relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search across all 33 questions (e.g. pain, bleed, pregnancy, cost, anxiety)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-gray-50 border border-gray-200/80 text-[#09090b] placeholder-gray-400 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black shadow-sm transition-all"
            />
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-xl border-b border-gray-200/80 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 text-xs overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-5 py-2.5 rounded-xl uppercase tracking-wider transition-all whitespace-nowrap ${
                categoryFilter === 'all'
                  ? 'bg-[#09090b] text-white font-bold shadow-md'
                  : 'text-gray-600 hover:text-black hover:bg-gray-100 border border-gray-200'
              }`}
            >
              All 33 FAQs
            </button>
            <button
              onClick={() => setCategoryFilter('acupuncture')}
              className={`px-5 py-2.5 rounded-xl uppercase tracking-wider transition-all whitespace-nowrap ${
                categoryFilter === 'acupuncture'
                  ? 'bg-[#581c87] text-white font-bold shadow-md'
                  : 'text-gray-600 hover:text-black hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Acupuncture FAQs (12)
            </button>
            <button
              onClick={() => setCategoryFilter('counselling')}
              className={`px-5 py-2.5 rounded-xl uppercase tracking-wider transition-all whitespace-nowrap ${
                categoryFilter === 'counselling'
                  ? 'bg-indigo-900 text-white font-bold shadow-md'
                  : 'text-gray-600 hover:text-black hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Counselling FAQs (21)
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Accordion List */}
      <section className="py-20 lg:py-28 bg-[#f8fafc]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-24 text-gray-500 text-sm spotlight-card rounded-3xl p-10 border border-gray-200">
              No matching questions found for "{searchTerm}". Try another search term or ask Dr. Nivedha directly on WhatsApp.
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={`faq-${idx}-${faq.q.slice(0, 15)}`} 
                  className={`rounded-3xl spotlight-card transition-all duration-300 border ${
                    isOpen ? 'border-[#581c87]/50 shadow-md bg-white' : 'border-gray-200/80 bg-white'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-6 focus:outline-none"
                  >
                    <div className="flex items-start space-x-4">
                      <span className="text-xs text-[#581c87] font-bold mt-1">
                        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                      </span>
                      <h3 className="font-display text-lg sm:text-xl font-bold text-[#09090b]">
                        {faq.q}
                      </h3>
                    </div>
                    <div className={`p-2 rounded-xl transition-all ${isOpen ? 'bg-purple-100 text-[#581c87] rotate-180' : 'bg-gray-100 text-gray-500'}`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 sm:px-7 pb-7 pt-0 text-sm sm:text-base text-gray-600 font-light leading-relaxed border-t border-gray-100">
                      <p className="pt-5 leading-relaxed">{faq.a}</p>
                      <div className="mt-4 flex items-center space-x-3 text-xs text-gray-500 uppercase tracking-wider">
                        <span className="px-2.5 py-1 rounded-md bg-gray-100 border border-gray-200">
                          {faq.category}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}

          {/* Still have questions banner */}
          <div className="mt-20 p-8 sm:p-12 rounded-3xl spotlight-card border border-gray-200/80 text-center space-y-6 bg-white">
            <h4 className="font-display text-3xl font-bold text-[#09090b]">Still Have a Specific Question?</h4>
            <p className="text-base text-gray-600 font-light max-w-xl mx-auto leading-relaxed">
              Dr. Nivedha Priyadharshini personally addresses clinical and consultation questions via direct WhatsApp concierge.
            </p>
            <div className="pt-2">
              <a
                href={CLINIC_INFO.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="btn-luxury-dark px-8 py-4 rounded-xl text-sm font-semibold tracking-wider inline-flex items-center space-x-3 shadow-lg"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <span>Message Dr. Nivedha on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
