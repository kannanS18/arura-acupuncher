import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, BookOpen, Search, Calendar, User, CheckCircle2 } from 'lucide-react';
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
    <div className="bg-white text-ink min-h-screen">
      
      {/* Blog Hero: Clean, Centered Editorial Journal Header with Scroll Reveal */}
      <section className="pt-20 pb-16 bg-surface-subtle border-b border-gray-200 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs text-brand font-semibold tracking-normal"
          >
            The Arura Clinical Journal & Patient Guides
          </motion.p>

          <motion.h1 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.12]"
          >
            Evidence-Based Guides for <br />
            <span className="text-brand">Holistic Root Healing</span>
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
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-gray-300 text-sm text-gray-900 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 shadow-sm transition-colors"
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
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand active:scale-95 disabled:opacity-50 ${
                  selectedCategory === cat
                    ? 'bg-brand text-white border-brand shadow-sm'
                    : 'bg-surface-subtle text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <span className="text-xs text-gray-500 font-medium">
              Showing {filteredPosts.length} clinical guides
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
                  className="group p-8 rounded-3xl bg-surface-subtle border border-gray-200/90 hover:border-brand hover:bg-white hover:shadow-xl transition-colors duration-200 flex flex-col justify-between space-y-6 h-full"
                >
                  <div className="space-y-4">
                    {/* Category & Read Time */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-xs font-semibold text-brand tracking-normal">
                        {post.category}
                      </span>
                      <span className="text-gray-400 flex items-center space-x-1 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-brand transition-colors leading-snug">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed font-normal">
                      {post.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-200/80 flex items-center justify-between text-xs text-gray-500 group-hover:text-brand transition-colors font-semibold">
                    <span>Read clinical guide</span>
                    <ArrowRight className="w-4 h-4 transform motion-safe:group-hover:translate-x-1 transition-transform" />
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
