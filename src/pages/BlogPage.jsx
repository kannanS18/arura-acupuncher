import React, { useState } from 'react';
import { Sparkles, ArrowRight, Clock, BookOpen, Search, Calendar, User, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogData';

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
      
      {/* Blog Hero: Clean, Centered Editorial Journal Header */}
      <section className="pt-20 pb-16 bg-[#f8fafc] border-b border-gray-200 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-xs uppercase tracking-wider text-[#e02868] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Arura Clinical Journal & Patient Guides</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#09090b] leading-[1.12]">
            Evidence-Based Guides for <br />
            <span className="text-[#e02868]">Holistic Root Healing</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Practical, doctor-authored clinical guides on classical acupuncture, pain recovery, pulse diagnosis, and emotional psychotherapy by Dr. Nivedha Priyadharshini, MD (Acu).
          </p>

          {/* Search Input */}
          <div className="relative max-w-lg mx-auto pt-2">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guides (e.g. neck pain, first visit, moxa, migraines)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-gray-300 text-sm text-gray-900 focus:outline-none focus:border-[#e02868] focus:ring-2 focus:ring-[#e02868]/20 shadow-sm transition-all"
            />
          </div>
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

      {/* Blog Cards Grid: On Click, Goes to Separate Page */}
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
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group p-8 rounded-3xl bg-[#f8fafc] border border-gray-200/90 hover:border-[#e02868] hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
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

                {/* Footer: Author & Link */}
                <div className="pt-4 border-t border-gray-200/80 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#09090b] text-white flex items-center justify-center font-bold text-[11px] border border-[#e02868]">
                      NP
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-900 block leading-tight">{post.author}</span>
                      <span className="text-[10px] text-gray-500">{post.date}</span>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-[#e02868] group-hover:translate-x-1 transition-transform inline-flex items-center space-x-1">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16 space-y-3">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="text-lg font-bold text-gray-800">No guides matching "{searchQuery}"</h3>
              <p className="text-sm text-gray-500">Try searching for other terms like 'neck pain', 'moxa', or 'pulse'.</p>
            </div>
          )}

        </div>
      </section>

      {/* Clinical Consultation CTA Strip */}
      <section className="py-16 bg-[#f8fafc] border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs uppercase tracking-wider text-[#e02868] font-bold">
            Private 1-on-1 Sanctuary Care
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#09090b]">
            Need Personalized Care for Your Condition?
          </h2>
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            Book an in-depth clinical consultation with Dr. Nivedha Priyadharshini at Arura Acupuncture & Counselling Centre, Virugambakkam.
          </p>
          <div className="pt-2">
            <Link
              to="/booking"
              className="btn-luxury-dark bg-[#e02868] hover:bg-[#c21e54] text-white px-8 py-4 rounded-xl text-xs uppercase tracking-wider font-bold inline-flex items-center space-x-2 shadow-lg"
            >
              <span>Schedule Consultation (₹600)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
