import React from 'react';
import { Award, GraduationCap, BookOpen, Smile, Quote, Calendar, MessageCircle } from 'lucide-react';
import { CLINIC_INFO } from '../data/websiteContent';

export default function TherapistSection({ onOpenBooking }) {
  return (
    <section id="therapist" className="py-20 bg-gradient-to-b from-[#faf8fb] to-white border-y border-[#ede7f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Doctor Profile Card (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white rounded-3xl p-6 shadow-2xl border border-[#ede7f3] text-center space-y-6">
              
              {/* Doctor Header Banner */}
              <div className="h-44 bg-gradient-to-r from-[#66478d] to-[#581c87] rounded-2xl flex flex-col items-center justify-center text-white relative overflow-hidden shadow-md">
                <Award className="w-28 h-28 text-white/10 absolute -right-6 -bottom-6" />
                <span className="text-xs font-semibold uppercase tracking-wider text-pink-200">Lead Healer & Founder</span>
                <h3 className="text-2xl font-bold font-display mt-1">{CLINIC_INFO.founder}</h3>
                <p className="text-xs text-white/90 font-medium">MD (Acu) • Cambridge Intl Dip • PG Dip (Counselling)</p>
              </div>

              {/* Degrees & Credentials */}
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3 p-3 bg-[#faf7fc] rounded-xl border border-gray-100">
                  <div className="p-2 bg-purple-100 text-[#66478d] rounded-lg">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <div className="font-bold text-gray-900">Doctor of Medicine in Acupuncture — MD (Acu)</div>
                    <div className="text-gray-500">Specialized clinical needle therapy & meridian balancing</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-[#faf7fc] rounded-xl border border-gray-100">
                  <div className="p-2 bg-pink-100 text-[#581c87] rounded-lg">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <div className="font-bold text-gray-900">Cambridge International Diploma in Teaching & Learning</div>
                    <div className="text-gray-500">Pedagogical excellence in patient education and self-healing</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-[#faf7fc] rounded-xl border border-gray-100">
                  <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                    <Smile className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <div className="font-bold text-gray-900">Post Graduate Diploma in Counselling Therapy</div>
                    <div className="text-gray-500">Psychological counseling & emotional healing integration</div>
                  </div>
                </div>
              </div>

              {/* Clinical Metrics */}
              <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-4 text-center">
                <div>
                  <span className="text-2xl font-bold text-[#66478d] font-display">700+</span>
                  <p className="text-[11px] text-gray-500 font-semibold">Patients Personally Treated</p>
                </div>
                <div>
                  <span className="text-2xl font-bold text-[#581c87] font-display">7+</span>
                  <p className="text-[11px] text-gray-500 font-semibold">Years Dedicated Clinical Care</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Journey & Quote (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#581c87]">Know Your Therapist</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-display">
                A Journey of Healing, Science and Harmony
              </h2>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              Though she began her career with a strong foundation in Business Administration, her personal experience with acupuncture inspired her to transition into the field of healing and wellness. Through years of practice treating over 700+ individuals, she realized that true wellness extends beyond physical relief and also encompasses emotional and mental well-being.
            </p>

            {/* Emotional Quote Block */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#66478d]/5 via-pink-50/50 to-transparent border-l-4 border-[#581c87] space-y-3">
              <Quote className="w-8 h-8 text-[#581c87]/40" />
              <p className="text-sm italic text-gray-800 font-display leading-relaxed">
                "Every patient's journey continues to inspire me, and over the years, I have realized something truly meaningful — <strong>when I help heal others, it heals me too.</strong> This beautiful connection continues to strengthen my passion and purpose in guiding individuals toward complete wellness through compassionate, holistic healing therapies."
              </p>
              <p className="text-xs font-bold text-[#66478d]">— Dr. Nivedha Priyadharshini, Founder</p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => onOpenBooking('Consultation with Dr. Nivedha')} 
                className="btn-magnetic bg-gradient-to-r from-[#66478d] to-[#581c87] text-white text-xs font-bold px-6 py-3 rounded-full shadow-md flex items-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Consultation with Dr. Nivedha</span>
              </button>
              <a 
                href={CLINIC_INFO.whatsappLink} 
                target="_blank" 
                rel="noreferrer" 
                className="text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-full transition-colors flex items-center space-x-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
