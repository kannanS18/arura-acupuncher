import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Heart, 
  Brain, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight,
  Flame,
  Search,
  MapPin,
  Clock,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO_KEYWORD_CLUSTERS, LOCAL_SEO_INFO } from '../data/seoKeywordClustersData';

const ICONS = {
  'pain-relief': Activity,
  'womens-health': Heart,
  'neurological': Zap,
  'mental-wellness': Brain
};

export default function ClinicalKeywordClustersSection({ onOpenBooking }) {
  const [activeClusterId, setActiveClusterId] = useState(SEO_KEYWORD_CLUSTERS[0].id);

  const activeCluster = SEO_KEYWORD_CLUSTERS.find(c => c.id === activeClusterId) || SEO_KEYWORD_CLUSTERS[0];
  const ActiveIcon = ICONS[activeCluster.id] || Sparkles;

  return (
    <section className="py-20 lg:py-28 bg-[#fafafa] border-b border-neutral-200/80 relative overflow-hidden">
      {/* Background radial glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(237,51,115,0.15) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header with Primary & Secondary SEO Keywords */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-50 text-[#ed3373] text-xs font-semibold border border-pink-200/70 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CLINICAL TREATMENT CLUSTERS • VIRUGAMBAKKAM, CHENNAI</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            Specialized Acupuncture Treatment & Holistic Therapy
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed">
            Explore our dedicated clinical clusters for <strong className="text-neutral-900 font-semibold">pain relief</strong>, <strong className="text-neutral-900 font-semibold">women’s health</strong>, <strong className="text-neutral-900 font-semibold">neurological recovery</strong>, and <strong className="text-neutral-900 font-semibold">mental wellness</strong> in Chennai.
          </p>
        </div>

        {/* Cluster Tabs Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
          {SEO_KEYWORD_CLUSTERS.map((cluster) => {
            const isSelected = cluster.id === activeClusterId;
            const IconComponent = ICONS[cluster.id] || Activity;
            return (
              <button
                key={cluster.id}
                onClick={() => setActiveClusterId(cluster.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between space-y-3 cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#ed3373] shadow-md shadow-pink-500/10 ring-2 ring-[#ed3373]/20'
                    : 'bg-white/80 border-neutral-200/80 hover:border-neutral-300 hover:bg-white text-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-[#ed3373] text-white' : 'bg-neutral-100 text-neutral-600'
                  }`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-pink-50 text-[#ed3373]' : 'bg-neutral-100 text-neutral-400'
                  }`}>
                    {cluster.badge.split('&')[0].trim()}
                  </span>
                </div>

                <div>
                  <h3 className={`text-sm font-bold leading-snug transition-colors ${
                    isSelected ? 'text-[#ed3373]' : 'text-neutral-900'
                  }`}>
                    {cluster.primaryKeyword}
                  </h3>
                  <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                    {cluster.subKeywords.length} targeted search areas
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Cluster Details Bento Card */}
        <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.05),0_16px_32px_-4px_rgba(0,0,0,0.03)] p-6 sm:p-10 space-y-8">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-100">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#ed3373] uppercase tracking-wider">
                  {activeCluster.clusterName}
                </span>
                <span className="text-xs text-neutral-300">•</span>
                <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Evidence-Based Protocol
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900 leading-snug">
                {activeCluster.heading}
              </h3>
              <p className="text-sm text-neutral-600 font-normal leading-relaxed">
                {activeCluster.summary}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                onClick={() => onOpenBooking(activeCluster.primaryKeyword, 600)}
                className="px-6 py-3.5 rounded-full text-xs font-bold bg-[#ed3373] text-white hover:bg-[#c91e5c] transition-all shadow-[0_4px_14px_rgba(237,51,115,0.3)] hover:-translate-y-0.5 active:scale-95 text-center cursor-pointer"
              >
                <span>Book This Treatment (₹600)</span>
              </button>
              <Link
                to={activeCluster.recommendedPage}
                className="px-5 py-3.5 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-800 hover:bg-neutral-200 transition-colors text-center"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Sub-Keywords Matrix */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
                <Search className="w-3.5 h-3.5 text-[#ed3373]" />
                <span>Frequently Treated Conditions in This Cluster:</span>
              </div>
              <span className="text-xs text-[#ed3373] font-mono font-semibold">
                Chennai Sanctuary • Private Acoustic Suites
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeCluster.subKeywords.map((sub, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200/60 hover:border-[#ed3373]/40 hover:bg-white hover:shadow-sm transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-neutral-900 group-hover:text-[#ed3373] transition-colors">
                      {sub.keyword}
                    </h4>
                    <span className="w-5 h-5 rounded-full bg-pink-50 text-[#ed3373] flex items-center justify-center shrink-0 text-[10px] font-mono font-bold">
                      {idx + 1}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed mt-2 font-normal">
                    {sub.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Local SEO & Assurance Footer */}
          <div className="pt-6 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-500">
            <div className="flex items-center gap-2 font-medium">
              <MapPin className="w-4 h-4 text-[#ed3373]" />
              <span>Available in Virugambakkam, Chennai (Serving Chinmaya Nagar, Koyambedu, Vadapalani, Anna Nagar & Porur)</span>
            </div>
            <div className="flex items-center gap-3 font-semibold text-neutral-700">
              <span>Standard Session: ₹600</span>
              <span className="text-neutral-300">•</span>
              <span>100% Single-Use Sterile Needles</span>
              <span className="text-neutral-300">•</span>
              <span>Daily 10 AM – 8 PM</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
