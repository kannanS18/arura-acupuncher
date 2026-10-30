import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, CheckCircle2, ShieldCheck, ArrowRight, Share2, Sparkles, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogData';
import { CLINIC_INFO } from '../data/websiteContent';

export default function BlogPostPage({ onOpenBooking }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = BLOG_POSTS.find((p) => p.id === id || p.slug === id);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-[70vh] bg-white flex items-center justify-center py-20 px-4">
        <div className="max-w-md text-center space-y-5">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto" />
          <h1 className="font-display text-3xl font-bold text-gray-900">Guide Not Found</h1>
          <p className="text-sm text-gray-600">The clinical article you are looking for does not exist or has been relocated.</p>
          <Link
            to="/blog"
            className="btn-luxury-dark inline-flex items-center space-x-2 px-6 py-3 rounded-xl text-xs uppercase tracking-wider font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Guides</span>
          </Link>
        </div>
      </div>
    );
  }

  // Related posts (excluding current post)
  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <article className="bg-white text-[#09090b] min-h-screen">
      
      {/* Editorial Header Strip */}
      <section className="pt-12 pb-16 bg-[#f8fafc] border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Back Navigation Breadcrumb */}
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#e02868] hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Clinical Guides</span>
          </Link>

          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs pt-2">
            <span className="px-3 py-1 rounded-full bg-pink-50 text-[#e02868] border border-pink-200 font-bold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500 flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.date}</span>
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500 flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#09090b] leading-[1.18]">
            {post.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-gray-600 font-normal leading-relaxed">
            {post.subtitle}
          </p>

          {/* Author Card */}
          <div className="pt-4 flex items-center space-x-3.5 border-t border-gray-200">
            <div className="w-12 h-12 rounded-full bg-[#09090b] text-white flex items-center justify-center font-bold text-sm border-2 border-[#e02868] shadow-xs">
              NP
            </div>
            <div>
              <strong className="text-sm sm:text-base font-bold text-gray-900 block">{post.author}</strong>
              <span className="text-xs text-[#e02868] font-semibold">{post.authorTitle} • Arura Wellness Studio</span>
            </div>
          </div>

        </div>
      </section>

      {/* Main Article Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Key Clinical Pearl / Highlight Callout */}
          <div className="p-6 sm:p-8 rounded-3xl bg-pink-50/40 border-l-4 border-[#e02868] shadow-xs space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#e02868] font-bold block">
              Doctor's Clinical Insight:
            </span>
            <p className="text-base sm:text-lg text-gray-900 italic font-normal leading-relaxed">
              "{post.highlight}"
            </p>
          </div>

          {/* Detailed Paragraph Sections */}
          <div className="space-y-10 text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
            {post.sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#09090b] tracking-tight">
                  {section.heading}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          {/* Key Patient Takeaways Box */}
          <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200 space-y-4">
            <div className="flex items-center space-x-2.5 text-emerald-950 font-bold text-base">
              <CheckCircle2 className="w-6 h-6 text-emerald-700 flex-shrink-0" />
              <span>Key Patient Takeaways</span>
            </div>
            <ul className="space-y-2.5">
              {post.takeaways.map((point, i) => (
                <li key={i} className="text-sm sm:text-base text-emerald-950 flex items-start space-x-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Doctor Consultation Action Desk */}
          <div className="p-8 rounded-3xl bg-[#09090b] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs uppercase tracking-wider text-pink-300 font-bold block">
                Direct Medical Care
              </span>
              <h3 className="font-display text-2xl font-bold text-white">
                Consult with Dr. Nivedha
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-normal max-w-md">
                1-on-1 private evaluation in our Virugambakkam sanctuary. Flat ₹600 fee with radial pulse assessment included.
              </p>
            </div>

            <Link
              to="/booking"
              className="btn-shimmer bg-[#e02868] text-white hover:bg-[#c21e54] px-7 py-4 rounded-xl text-xs uppercase tracking-wider font-bold whitespace-nowrap shadow-lg flex-shrink-0"
            >
              Book Consultation (₹600)
            </Link>
          </div>

          {/* Back to Guides */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <Link
              to="/blog"
              className="text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-[#e02868] inline-flex items-center space-x-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>View All Clinical Guides</span>
            </Link>

            <Link
              to="/clinic"
              className="text-xs font-bold uppercase tracking-wider text-[#e02868] hover:underline"
            >
              View Clinical Tariff & Modalities →
            </Link>
          </div>

        </div>
      </section>

      {/* Related Clinical Articles Grid */}
      <section className="py-16 bg-[#f8fafc] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-[#e02868] font-bold">
              Continue Reading
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#09090b]">
              Related Clinical Guides
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.id}
                to={`/blog/${rel.id}`}
                className="group p-6 rounded-2xl bg-white border border-gray-200 hover:border-[#e02868] hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10px] uppercase font-bold text-[#e02868]">
                      {rel.category}
                    </span>
                    <span className="text-gray-400">{rel.readTime}</span>
                  </div>

                  <h3 className="font-display text-base font-bold text-gray-900 group-hover:text-[#e02868] transition-colors leading-snug">
                    {rel.title}
                  </h3>

                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {rel.subtitle}
                  </p>
                </div>

                <div className="pt-2 text-xs font-bold text-[#e02868] inline-flex items-center space-x-1">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

    </article>
  );
}
