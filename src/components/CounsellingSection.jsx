import React from 'react';
import { User, Users, Home, Smile, Briefcase, LifeBuoy } from 'lucide-react';
import { COUNSELLING_METHODS } from '../data/websiteContent';

export default function CounsellingSection({ onOpenBooking }) {
  const counsellingTypes = [
    { title: "Individual Counselling", icon: <User className="w-4 h-4 text-[#66478d]" />, desc: "One-on-one therapy for anxiety, depression, low self-esteem, trauma recovery, and personal development." },
    { title: "Couples Counselling", icon: <Users className="w-4 h-4 text-[#581c87]" />, desc: "Strengthen communication, resolve marital conflicts, rebuild trust, and restore emotional intimacy." },
    { title: "Family Counselling", icon: <Home className="w-4 h-4 text-[#66478d]" />, desc: "Improves relationships, communication, and emotional bonds across generations in the family." },
    { title: "Adolescent Counselling", icon: <Smile className="w-4 h-4 text-[#581c87]" />, desc: "Helping teenagers manage academic pressure, peer bullying, ADHD concerns, and emotional regulation." },
    { title: "Career Counselling", icon: <Briefcase className="w-4 h-4 text-[#66478d]" />, desc: "Supports career planning, workplace stress management, healthy boundaries, and professional growth." },
    { title: "Trauma & Grief Support", icon: <LifeBuoy className="w-4 h-4 text-[#581c87]" />, desc: "Compassionate environment to process loss of a loved one, severe separation, accidents, and life transitions." }
  ];

  return (
    <section id="counselling" className="py-20 bg-white border-t border-[#ede7f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#581c87]">Mind Sanctuary</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-display">Counselling Therapy: A Path Toward Emotional Wellness</h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            A professional and confidential process where individuals, couples, and adolescents openly discuss thoughts, heal emotional pain, and build empowering coping mechanisms.
          </p>
        </div>

        {/* 6 Types of Counselling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {counsellingTypes.map((type, idx) => (
            <div key={idx} className="p-6 bg-[#faf7fc] rounded-3xl border border-[#ede7f3] space-y-2 hover:border-[#66478d] transition-all">
              <h4 className="font-bold text-gray-900 text-sm flex items-center space-x-2">
                <span className="p-1.5 bg-white rounded-lg shadow-sm">{type.icon}</span>
                <span>{type.title}</span>
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">{type.desc}</p>
            </div>
          ))}
        </div>

        {/* 7 Evidence-Based Methods */}
        <div className="bg-[#faf7fc] p-8 sm:p-10 rounded-3xl border border-[#ede7f3]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#66478d]">Clinical Psychology Framework</span>
            <h3 className="text-2xl font-bold text-gray-900 font-display mt-1">7 Evidence-Based Methods Used</h3>
            <p className="text-xs text-gray-500 mt-1">We tailor the therapeutic modality to match your cognitive and emotional blueprint.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COUNSELLING_METHODS.map((method, idx) => (
              <div key={idx} className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="text-sm font-bold text-gray-900">{method.name}</strong>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-pink-50 text-[#581c87] border border-pink-100">
                    {method.badge}
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{method.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onOpenBooking('Counselling Therapy', 1800)}
              className="btn-magnetic bg-gradient-to-r from-[#66478d] to-[#581c87] text-white text-xs font-bold px-8 py-3 rounded-full shadow-md inline-flex items-center space-x-2"
            >
              <span>Schedule Private Counselling Session (₹1,800)</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
