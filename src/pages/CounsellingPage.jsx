import React, { useState, useMemo } from 'react';
import { COUNSELLING_CATEGORIES } from '../data/counsellingServicesData';
import { HeroSection } from '../components/ui/hero-section-2';
import { getAssetUrl } from '../utils/assetUrl';
import { 
  Search, 
  ArrowRight, 
  Lock, 
  ShieldCheck, 
  CalendarCheck, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  Sparkle,
  SlidersHorizontal,
  BrainCircuit,
  MessageSquareHeart,
  ChevronRight,
  Filter
} from 'lucide-react';

export default function CounsellingPage({ onOpenBooking }) {
  const [activeCategoryId, setActiveCategoryId] = useState(COUNSELLING_CATEGORIES[0]?.id || 'age-based');
  const [searchQuery, setSearchQuery] = useState('');

  // Search filter across all categories and their internal services
  const searchResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return null;

    const matches = [];
    COUNSELLING_CATEGORIES.forEach(cat => {
      cat.services.forEach(service => {
        if (
          service.toLowerCase().includes(q) ||
          cat.title.toLowerCase().includes(q) ||
          cat.summary.toLowerCase().includes(q)
        ) {
          matches.push({
            service,
            categoryTitle: cat.title,
            categoryNum: cat.num,
            categoryId: cat.id
          });
        }
      });
    });
    return matches;
  }, [searchQuery]);

  const activeCategory = useMemo(() => {
    return COUNSELLING_CATEGORIES.find(c => c.id === activeCategoryId) || COUNSELLING_CATEGORIES[0];
  }, [activeCategoryId]);

  const handleBooking = (serviceName) => {
    if (typeof onOpenBooking === 'function') {
      onOpenBooking(`Counselling: ${serviceName}`, 600);
    } else {
      window.location.hash = '#/booking';
    }
  };

  return (
    <div className="bg-[#fafafa] text-neutral-900 min-h-screen selection:bg-[#ed3373] selection:text-white">
      
      {/* 1. Dignified Clinical Sanctuary Hero Banner (HeroSection 2 Architecture) */}
      <HeroSection
        badge="CAMBRIDGE CLINICAL PSYCHOTHERAPY · 15 DISCIPLINES"
        logo={{
          url: getAssetUrl("logo.png"),
          alt: "Arura Wellness Studio",
          text: "ARURA COUNSELLING CENTRE"
        }}
        slogan="CAMBRIDGE PEDAGOGY & EVIDENCE-BASED PSYCHOTHERAPY"
        words={[
          { text: "A" },
          { text: "Confidential" },
          { text: "Sanctuary" },
          { text: "for" },
          { text: "Mind," },
          { text: "Emotion," },
          { text: "and" },
          { text: "Autonomic", highlight: true },
          { text: "Balance.", highlight: true },
        ]}
        title="A Confidential Sanctuary for Mind, Emotion, and Autonomic Balance."
        subtitle="Directed by Dr. Nivedha Priyadharshini (Cambridge Intl. Dip). Evidence-based psychotherapy in a private soundproof acoustic suite in Chennai."
        callToAction={{
          text: "Book Confidential Session (₹600)",
          href: "#/booking",
          onClick: () => handleBooking('Psychological Counselling Initial Session')
        }}
        secondaryAction={{
          text: "100% Private Acoustic Suite",
          href: "#/clinic",
          icon: <Lock className="h-4 w-4 text-emerald-600 shrink-0" />
        }}
        backgroundImage={getAssetUrl('clinic_interior.jpg')}
        floatingBadge={{
          title: "100% Strict Clinical Privacy",
          subtitle: "Virugambakkam Acoustic Room · ₹600 / 50 Mins"
        }}
        contactInfo={{
          website: "15 Disciplines · 213 Protocols",
          phone: "+91 73580 31752",
          address: "Virugambakkam, Chennai"
        }}
      />

      {/* 2. Interactive Clinical Taxonomy Studio (Master-Detail Architecture - NO TYPICAL CARDS) */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header & Unified Search Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200/80 pb-6">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#ed3373] block">
                Interactive Therapeutic Directory
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                Explore Clinical Disciplines & Protocols
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500">
                Select a clinical category on the left to inspect its dedicated therapeutic focus areas.
              </p>
            </div>

            {/* Precision Search Box */}
            <div className="relative w-full md:w-80 shrink-0">
              <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anxiety, burnout, sleep..."
                className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-xl border border-neutral-200 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#ed3373] focus:ring-2 focus:ring-[#ed3373]/20 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-900 w-5 h-5 rounded-full flex items-center justify-center bg-neutral-100 hover:bg-neutral-200"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* If Search is Active: Show Clean Search Results Grid */}
          {searchResults !== null ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                <span>Found {searchResults.length} matching therapies for "{searchQuery}"</span>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-[#ed3373] hover:underline font-bold"
                >
                  Clear search
                </button>
              </div>

              {searchResults.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-white border border-neutral-200 space-y-3">
                  <p className="text-sm font-semibold text-neutral-800">No matching therapies found.</p>
                  <p className="text-xs text-neutral-500">Try searching for keywords like "stress", "sleep", "couples", "panic", or "anger".</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {searchResults.map((result, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleBooking(result.service)}
                      className="p-4 rounded-xl bg-white border border-neutral-200 hover:border-[#ed3373] hover:shadow-sm text-left transition-all duration-200 flex flex-col justify-between space-y-2 group"
                    >
                      <div>
                        <span className="text-[10px] font-mono font-bold text-neutral-400 block uppercase">
                          {result.categoryNum} · {result.categoryTitle}
                        </span>
                        <span className="text-xs font-bold text-neutral-900 group-hover:text-[#ed3373] transition-colors leading-snug block pt-1">
                          {result.service}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400 group-hover:text-[#ed3373]">
                        <span className="font-mono">₹600 / 50 min</span>
                        <span className="flex items-center gap-1 font-semibold">Book <ArrowRight className="w-3 h-3" /></span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Master-Detail Architectural Layout (Hairline Studio Pattern) */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column (4 cols): Sticky Taxonomy Rail */}
              <div className="lg:col-span-4 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs overflow-hidden lg:sticky lg:top-24 max-h-[320px] lg:max-h-[750px] flex flex-col">
                <div className="p-4 border-b border-neutral-100 bg-neutral-50/60 flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-neutral-500 uppercase tracking-wider">
                    Disciplines (15)
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    Click to inspect
                  </span>
                </div>

                <div className="divide-y divide-neutral-100 overflow-y-auto [scrollbar-width:thin] flex-1">
                  {COUNSELLING_CATEGORIES.map((cat) => {
                    const isSelected = activeCategoryId === cat.id;

                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategoryId(cat.id)}
                        className={`w-full text-left p-3.5 transition-all flex items-center justify-between gap-3 text-xs ${
                          isSelected
                            ? 'bg-pink-50/60 text-neutral-950 font-bold border-l-3 border-[#ed3373]'
                            : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 border-l-3 border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={`text-[11px] font-mono shrink-0 ${isSelected ? 'text-[#ed3373] font-bold' : 'text-neutral-400'}`}>
                            {cat.num}
                          </span>
                          <span className="truncate">{cat.title}</span>
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full shrink-0 border ${
                          isSelected 
                            ? 'bg-white text-[#ed3373] border-pink-200 font-bold' 
                            : 'bg-neutral-100 text-neutral-400 border-neutral-200/60'
                        }`}>
                          {cat.services.length}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column (8 cols): Active Discipline Dossier Canvas */}
              <div className="lg:col-span-8 rounded-3xl bg-white border border-neutral-200/90 shadow-sm p-7 sm:p-10 space-y-8">
                
                {/* Dossier Header */}
                <div className="space-y-4 border-b border-neutral-100 pb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#ed3373] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ed3373]" />
                      Clinical Discipline {activeCategory.num} of 15
                    </span>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700">
                      Standard · 50 Mins · ₹600
                    </span>
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
                    {activeCategory.title}
                  </h3>

                  <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                    {activeCategory.summary}
                  </p>
                </div>

                {/* Focus Areas Directory Grid */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                      Available Therapeutic Focus Areas ({activeCategory.services.length})
                    </span>
                    <span className="text-[11px] font-mono text-[#ed3373]">
                      Click any focus area to book
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeCategory.services.map((service, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleBooking(service)}
                        className="group/item p-3.5 rounded-xl bg-neutral-50/70 hover:bg-pink-50/50 border border-neutral-200/70 hover:border-pink-300 transition-all text-left flex items-center justify-between gap-3 cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-[10px] font-mono text-neutral-400 group-hover/item:text-[#ed3373] shrink-0">
                            {(sIdx + 1).toString().padStart(2, '0')}.
                          </span>
                          <span className="text-xs font-semibold text-neutral-800 group-hover/item:text-neutral-950 truncate">
                            {service}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover/item:text-[#ed3373] group-hover/item:translate-x-0.5 transition-all shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Direct Action & Sanctuary Assurance Bar */}
                <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-50/80 p-5 rounded-2xl border border-neutral-200/80">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
                      <Lock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>One-on-One Acoustic Sanctuary Consultation</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 font-mono">
                      Lead Practitioner: Dr. Nivedha Priyadharshini, MD (Acu), PG Dip (Counselling)
                    </p>
                  </div>

                  <button
                    onClick={() => handleBooking(`${activeCategory.title} Consultation`)}
                    className="px-6 py-3 rounded-xl bg-neutral-900 hover:bg-[#ed3373] text-white text-xs font-bold transition-colors shadow-2xs whitespace-nowrap flex items-center justify-center gap-2"
                  >
                    <span>Schedule Consultation (₹600)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          )}

        </div>
      </section>

      {/* 3. Cambridge Clinical Ethics & Sanctuary Principles (Architectural Pillars - No Clunky Boxes) */}
      <section className="py-20 lg:py-28 bg-white border-t border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-bold text-[#ed3373] uppercase tracking-wider block">
              Clinical Methodology & Ethics
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Cambridge-Aligned Therapeutic Integrity
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
              Dr. Nivedha Priyadharshini integrates structured Western cognitive-behavioral principles (CBT/REBT) with profound somatic autonomic stabilization, creating a peaceful, non-judgmental environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
            
            <div className="space-y-3 md:pr-6">
              <span className="text-xs font-mono font-bold text-[#ed3373] uppercase tracking-wider block">
                Pillar 01
              </span>
              <h4 className="font-display text-xl font-bold text-neutral-900">
                Evidence-Based Psychotherapy
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                Structured identification of cognitive distortions, trauma loops, and autonomic triggers without pharmaceutical reliance.
              </p>
            </div>

            <div className="pt-6 md:pt-0 space-y-3 md:px-6">
              <span className="text-xs font-mono font-bold text-[#ed3373] uppercase tracking-wider block">
                Pillar 02
              </span>
              <h4 className="font-display text-xl font-bold text-neutral-900">
                100% Strict Confidentiality
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                Every dialogue is protected under strict clinical ethics. Private sound-dampened acoustic room ensures complete peace of mind.
              </p>
            </div>

            <div className="pt-6 md:pt-0 space-y-3 md:pl-6">
              <span className="text-xs font-mono font-bold text-[#ed3373] uppercase tracking-wider block">
                Pillar 03
              </span>
              <h4 className="font-display text-xl font-bold text-neutral-900">
                Integrative Mind-Body Alignment
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                Seamless coordination with classical acupuncture for psychosomatic somatic symptoms like tension headaches, gut distress, and insomnia.
              </p>
            </div>

          </div>

          {/* Sanctuary Location & Final Invitation Card */}
          <div className="p-8 sm:p-12 rounded-3xl bg-neutral-950 text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 border border-neutral-800 shadow-xl relative overflow-hidden">
            <div 
              aria-hidden="true" 
              className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full pointer-events-none opacity-20 blur-3xl"
              style={{ background: '#ed3373' }}
            />

            <div className="space-y-2 relative z-10">
              <span className="text-xs font-mono font-bold text-[#ed3373] tracking-widest uppercase">
                ARURA WELLNESS STUDIO · VIRUGAMBAKKAM
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Begin Your Healing Dialogue in Private Sanctuary
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed font-normal">
                No 45A, Ground floor, Vaikasi Street, Chinmaya Nagar, Virugambakkam, Chennai - 600092. Direct consultation by prior appointment.
              </p>
            </div>

            <button
              onClick={() => handleBooking('Confidential Initial Consultation')}
              className="relative z-10 px-8 py-4 rounded-full bg-[#ed3373] text-white font-bold text-xs hover:bg-[#c91e5c] transition-all whitespace-nowrap shadow-sm active:scale-95 cursor-pointer"
            >
              Schedule Confidential Session (₹600)
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
