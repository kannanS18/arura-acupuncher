import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { FAQS_DATA } from '../data/websiteContent';
import { FaqAccordion } from './faq-accordion';

export default function FaqSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQS_DATA.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const faqItems = filteredFaqs.map((faq, idx) => ({
    id: `faq-${idx}`,
    question: faq.q,
    answer: (
      <div className="text-xs sm:text-sm text-neutral-600 leading-relaxed py-1 font-normal">
        {faq.a}
      </div>
    )
  }));

  return (
    <section id="faq" className="py-24 bg-white border-b border-neutral-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-medium text-brand">Knowledge and clinical guidance</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-ink font-display">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-600 text-sm leading-relaxed max-w-xl mx-auto">
            Everything you need to know about our needle sensation, strict sterility, session cadence, and psychotherapy protocols.
          </p>

          {/* Minimalist Hairline Search Bar */}
          <div className="relative max-w-md mx-auto pt-3">
            <Search className="w-4 h-4 absolute left-4 top-6 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keywords (e.g., hurt, safe, sessions, cost)..."
              className="w-full pl-11 pr-4 py-2.5 text-xs bg-surface-subtle border border-border rounded-full focus:outline-none focus:border-brand transition-all shadow-inner placeholder:text-neutral-400"
            />
          </div>

          {/* Filter Categories as Hairline Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeCategory === 'all' ? 'bg-ink text-white shadow-sm' : 'bg-surface-subtle border border-border text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              All Questions ({FAQS_DATA.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('acupuncture')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeCategory === 'acupuncture' ? 'bg-brand text-white shadow-sm' : 'bg-surface-subtle border border-border text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              Acupuncture Therapy
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('counselling')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeCategory === 'counselling' ? 'bg-purple-800 text-white shadow-sm' : 'bg-surface-subtle border border-border text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              Counselling Therapy
            </button>
          </div>
        </div>

        {/* Hairline UI FAQ Accordion: Easing height, morphing plus/minus, blur-settling text */}
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          {faqItems.length > 0 ? (
            <FaqAccordion items={faqItems} type="single" defaultOpen={[0]} />
          ) : (
            <p className="text-center text-xs text-neutral-400 py-8">
              No matching questions found for "{searchQuery}".
            </p>
          )}
        </div>

      </div>
    </section>
  );
}
