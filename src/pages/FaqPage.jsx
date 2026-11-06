import React, { useState } from 'react';
import { FAQS, CLINIC_INFO } from '../data/websiteContent';
import { Search, Sparkles, MessageCircle, HelpCircle } from 'lucide-react';
import { FaqAccordion } from '../components/faq-accordion';

export default function FaqPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredFaqs = FAQS.filter(faq => {
    const matchesCategory = categoryFilter === 'all' || faq.category === categoryFilter;
    const matchesSearch = 
      faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const faqItems = filteredFaqs.map((faq, idx) => ({
    id: `faq-page-${idx}`,
    question: faq.q,
    answer: (
      <div className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed py-2 space-y-3">
        <p>{faq.a}</p>
        <div className="pt-2 flex items-center gap-2">
          <span className="text-xs font-medium text-brand bg-pink-50/70 border border-pink-200/50 px-2.5 py-0.5 rounded-full">
            {faq.category === 'acupuncture' ? 'Acupuncture care' : 'Counselling therapy'}
          </span>
        </div>
      </div>
    )
  }));

  return (
    <div className="bg-white text-[#09090b] min-h-screen">
      
      {/* Header Banner */}
      <section className="relative pt-24 pb-20 border-b border-neutral-200 bg-neutral-50/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-pink-50/70 border border-pink-200/60 text-brand text-xs font-medium">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Medical & therapy knowledge base</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#09090b] leading-[1.12]">
              Frequently Asked <br />
              <span className="text-brand">Questions (33)</span>
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
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-xl border-b border-neutral-200 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-xs overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap font-medium text-xs ${
                categoryFilter === 'all'
                  ? 'bg-ink text-white'
                  : 'text-neutral-600 hover:text-ink hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              All 33 FAQs
            </button>
            <button
              onClick={() => setCategoryFilter('acupuncture')}
              className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap font-medium text-xs ${
                categoryFilter === 'acupuncture'
                  ? 'bg-ink text-white'
                  : 'text-neutral-600 hover:text-ink hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              Acupuncture FAQs (12)
            </button>
            <button
              onClick={() => setCategoryFilter('counselling')}
              className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap font-medium text-xs ${
                categoryFilter === 'counselling'
                  ? 'bg-ink text-white'
                  : 'text-neutral-600 hover:text-ink hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              Counselling FAQs (21)
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Accordion List with Hairline UI FaqAccordion */}
      <section className="py-20 lg:py-28 bg-[#f8fafc]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-20 text-neutral-500 text-sm bg-white rounded-3xl p-10 border border-border shadow-sm">
              No matching questions found for "{searchTerm}". Try another keyword or contact Dr. Nivedha directly on WhatsApp.
            </div>
          ) : (
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-sm">
              <FaqAccordion items={faqItems} type="single" defaultOpen={[0]} />
            </div>
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
