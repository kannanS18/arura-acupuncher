import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Clock, BookOpen, Search, Calendar, User, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogData';
import MeridianPulseWave from '../components/MeridianPulseWave';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'First Visit Guides',
    'Spine & Joint Health',
    'Mind & Stress Therapy',
    'Acupuncture Modalities',
    'Patient Care & Preparation'
  ];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-white text-[#09090b] min-h-screen">
      
      {/* Blog Hero: Clean, Centered Editorial Journal Header with Scroll Reveal */}
      <section className="pt-20 pb-16 bg-[#f8fafc] border-b border-gray-200 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-xs uppercase tracking-wider text-[#e02868] font-bold"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Arura Clinical Journal & Patient Guides</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#09090b] leading-[1.12]"
          >
            Evidence-Based Guides for <br />
            <span className="text-[#e02868]">Holistic Root Healing</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Practical, doctor-authored clinical guides on classical acupuncture, pain recovery, pulse diagnosis, and emotional psychotherapy by Dr. Nivedha Priyadharshini, MD (Acu).
          </motion.p>

          {/* Search Input */}
          <motion.div 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative max-w-lg mx-auto pt-2"
          >
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guides (e.g. neck pain, first visit, moxa, migraines)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-gray-300 text-sm text-gray-900 focus:outline-none focus:border-[#e02868] focus:ring-2 focus:ring-[#e02868]/20 shadow-sm transition-all"
            />
          </motion.div>
        </div>

        {/* Biological Meridian Pulse Line Divider */}
        <div className="pt-8">
          <MeridianPulseWave color="#e02868" />
        </div>
      </section>

      {/* Category Filter Pills Strip */}
      <section className="bg-white border-b border-gray-200 py-4 sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                  selectedCategory === cat
                    ? 'bg-[#e02868] text-white border-[#e02868] shadow-sm'
                    : 'bg-[#f8fafc] text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Cards Grid: With Staggered Scroll-Reveal Animations */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <span className="text-xs uppercase tracking-wider text-gray-500 font-bold">
              Showing {filteredPosts.length} Clinical Guides
            </span>
            <span className="text-xs text-gray-400">Click any card to read full article</span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={`/blog/${post.id}`}
                  className="group p-8 rounded-3xl bg-[#f8fafc] border border-gray-200/90 hover:border-[#e02868] hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 h-full"
                >
                  <div className="space-y-4">
                    {/* Category & Read Time */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[10px] bg-pink-50 text-[#e02868] border border-pink-200">
                        {post.category}
                      </span>
                      <span className="text-gray-400 flex items-center space-x-1 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-[#e02868] transition-colors leading-snug">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed font-normal">
                      {post.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-200/80 flex items-center justify-between text-xs text-gray-500 group-hover:text-[#e02868] transition-colors font-semibold">
                    <span>Read Clinical Guide</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
