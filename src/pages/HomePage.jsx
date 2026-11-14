import React from 'react';
import HeroSection from '../components/HeroSection';
import InteractiveMeridianExplorer from '../components/InteractiveMeridianExplorer';
import ClinicalKeywordClustersSection from '../components/ClinicalKeywordClustersSection';
import PhysicianPhilosophySection from '../components/PhysicianPhilosophySection';
import { ArrowRight, CheckCircle2, Activity, Heart, Brain, Sparkles, CalendarCheck, ShieldCheck, MapPin, HelpCircle, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/assetUrl';
import AnimatedCounter from '../components/AnimatedCounter';
import { Testimonials } from '../components/testimonials';
import { COUNSELLING_CATEGORIES } from '../data/counsellingServicesData';
import { LONG_TAIL_FAQS, LOCAL_SEO_INFO } from '../data/seoKeywordClustersData';
import { CLINIC_INFO } from '../data/websiteContent';

export default function HomePage({ onOpenBooking }) {
  return (
    <div className="bg-[#fafafa] text-neutral-900 selection:bg-[#ed3373] selection:text-white">
      
      {/* 1. Grounded 21st.dev Hero Section */}
      <HeroSection onOpenBooking={onOpenBooking} />

      {/* 2. Anatomical Treatment Ledger */}
      <section className="py-16 lg:py-24 bg-white border-b border-neutral-200/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveMeridianExplorer onOpenBooking={onOpenBooking} />
        </div>
      </section>

      {/* 3. Dedicated Clinical Keyword Clusters Showcase (SEO Priority 1 & 2) */}
      <ClinicalKeywordClustersSection onOpenBooking={onOpenBooking} />

      {/* 4. ARURA COUNSELLING CENTRE - 15 Modalities Showcase (21st.dev Bento Feature) */}
      <section className="py-20 lg:py-28 bg-[#fafafa] border-b border-neutral-200/80 relative overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] pointer-events-none opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(237,51,115,0.18) 0%, transparent 70%)' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 text-[#ed3373] text-sm font-semibold border border-pink-200/70 font-mono">
                <Brain className="w-4 h-4" />
                <span>ARURA COUNSELLING CENTRE</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-[46px] font-bold text-neutral-900 tracking-tight leading-tight">
                15 Specialized Psychological Disciplines
              </h2>
              <p className="text-base sm:text-lg text-neutral-700 font-normal leading-relaxed">
                Comprehensive adolescent, marriage, and burnout guidance led by Dr. Nivedha in soundproof acoustic suites.
              </p>
            </div>

            <Link
              to="/counselling"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold bg-[#ed3373] text-white hover:bg-[#c91e5c] transition-all shadow-[0_4px_14px_rgba(237,51,115,0.3)] hover:-translate-y-0.5 active:scale-95 shrink-0"
            >
              <span>Explore All 150+ Focus Areas</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Bento Grid Preview of Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COUNSELLING_CATEGORIES.slice(0, 6).map((cat) => (
              <div
                key={cat.id}
                className="group relative rounded-3xl bg-white border border-neutral-200/80 hover:border-[#ed3373]/60 transition-all duration-300 p-7 flex flex-col justify-between space-y-5 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04),0_12px_24px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(237,51,115,0.08)] hover:-translate-y-1"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#ed3373] tracking-widest uppercase bg-pink-50 px-2.5 py-1 rounded-md border border-pink-200/50">
                      CATEGORY {cat.num}
                    </span>
                    <span className="text-xs font-mono text-neutral-500 font-medium">
                      {cat.services.length} Areas
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 group-hover:text-[#ed3373] transition-colors leading-snug">
                    {cat.title}
                  </h3>

                  <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed">
                    {cat.summary}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {cat.services.slice(0, 3).map((s, idx) => (
                      <span key={idx} className="text-xs font-medium px-3 py-1 rounded-lg bg-neutral-100/80 text-neutral-700 border border-neutral-200/60">
                        {s}
                      </span>
                    ))}
                    {cat.services.length > 3 && (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-pink-50 text-[#ed3373]">
                        +{cat.services.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-neutral-600 font-medium">Session: ₹600 • 50 Mins</span>
                  <Link
                    to="/counselling"
                    className="text-sm font-bold text-[#ed3373] hover:text-neutral-900 inline-flex items-center gap-1 transition-colors"
                  >
                    <span>View areas</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Lead Practitioner & Tariff Ledger (21st.dev Luxury Card Treatment) */}
      <PhysicianPhilosophySection onOpenBooking={onOpenBooking} />

      {/* 6. Documented Patient Recoveries with Hairline UI Interactive Testimonials */}
      <section className="py-20 lg:py-28 bg-[#fafafa] border-b border-neutral-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-sm font-bold text-[#ed3373] uppercase tracking-wider font-mono">
              PATIENT RECOVERIES
            </span>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-[46px] font-bold text-neutral-900 tracking-tight">
              Verified Patient Transformations
            </h2>
            <p className="text-base sm:text-lg text-neutral-700 font-normal">
              Direct documented recoveries across chronic pain, migraine, and insomnia in Chennai.
            </p>
          </div>

          {/* Hairline UI Interactive Testimonials */}
          <div className="pt-2">
            <Testimonials
              autoplay={6500}
              className="mx-auto"
              items={[
                {
                  quote: "My mom can walk properly now. Surgeons recommended knee replacement, but Arura's acupuncture resolved it without surgery.",
                  name: "Sowmiya Janu",
                  role: "Knee Surgery Avoided · Chennai"
                },
                {
                  quote: "Dr. Nivedha's clinic is soothing and deeply personal. I was skeptical at first, but it made a lasting difference.",
                  name: "Nila",
                  role: "Calm Environment & Care · Chennai"
                },
                {
                  quote: "Relieved my chronic GERD and acidity after 7 sessions. Dr. Nivedha's clinical care and guidance are unmatched.",
                  name: "Ramkumar Ananth",
                  role: "GERD & Acidity Relief · Chennai"
                },
                {
                  quote: "Debilitating migraines and neck stiffness vanished within 4 weeks of targeted acupuncture. Pure restorative peace.",
                  name: "Karthik Subramanian",
                  role: "Migraine & Cervical Relief · Chennai"
                },
                {
                  quote: "Combining acupuncture with CBT dismantled my severe insomnia and work burnout. A truly healing sanctuary.",
                  name: "Priyadarshini R.",
                  role: "Autonomic Burnout Recovery · Chennai"
                }
              ]}
            />
          </div>

        </div>
      </section>

      {/* 6.5 Local SEO & Common Acupuncture Treatment Questions (SEO Intent) */}
      <section className="py-20 lg:py-24 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 text-[#ed3373] text-sm font-semibold border border-pink-200/70 font-mono">
                <MapPin className="w-4 h-4" />
                <span>LOCAL CLINICAL SANCTUARY • CHENNAI</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
                Best Acupuncture Clinic & Treatment in Chennai
              </h2>
              <p className="text-base sm:text-lg text-neutral-700 font-normal leading-relaxed">
                Chennai's trusted <strong className="text-neutral-900 font-semibold">acupuncture specialist near me</strong> offering licensed, affordable care and psychotherapy in Virugambakkam.
              </p>
            </div>

            <Link
              to="/clinic"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold bg-neutral-900 text-white hover:bg-neutral-800 transition-all shadow-sm shrink-0"
            >
              <span>View Clinic Tariff & FAQs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick Local Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/70 space-y-2">
              <span className="text-xs font-mono font-bold text-[#ed3373] uppercase tracking-wider block">
                LOCALITY & ACCESS
              </span>
              <h3 className="font-bold text-lg text-neutral-900">
                Virugambakkam, Chennai
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Easily accessible from Chinmaya Nagar, Koyambedu, Vadapalani, Anna Nagar, Porur, and KK Nagar.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/70 space-y-2">
              <span className="text-xs font-mono font-bold text-[#ed3373] uppercase tracking-wider block">
                ACCESSIBLE PRICING
              </span>
              <h3 className="font-bold text-lg text-neutral-900">
                Affordable Care (₹600)
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Transparent consultation and needling fee with zero hidden charges. Single-use sterile needles included.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/70 space-y-2">
              <span className="text-xs font-mono font-bold text-[#ed3373] uppercase tracking-wider block">
                SPECIALIST PHYSICIAN
              </span>
              <h3 className="font-bold text-lg text-neutral-900">
                Dr. Nivedha Priyadharshini
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                MD (Acu) with 8+ years clinical expertise and 1,100+ documented patient recoveries across pain & neurology.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/70 space-y-2">
              <span className="text-xs font-mono font-bold text-[#ed3373] uppercase tracking-wider block">
                DAILY AVAILABILITY
              </span>
              <h3 className="font-bold text-lg text-neutral-900">
                Mon–Sun: 10AM to 8PM
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Consultations conducted strictly by prior appointment in private, acoustic soundproof suites.
              </p>
            </div>
          </div>

          {/* 4 Featured Long-Tail Question Cards */}
          <div className="space-y-4 pt-4">
            <h3 className="text-sm font-mono font-bold text-neutral-600 uppercase tracking-wider">
              Frequently Asked Patient Questions:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {LONG_TAIL_FAQS.slice(0, 4).map((faq, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-2">
                  <h4 className="text-base font-bold text-neutral-900 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ed3373] shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h4>
                  <p className="text-sm text-neutral-600 leading-relaxed pl-6">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 7. Sanctuary Booking Invitation (21st.dev Luxury CTA Card) */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="relative overflow-hidden bg-neutral-900 text-white rounded-3xl p-10 sm:p-14 text-center space-y-6 border border-neutral-800 shadow-2xl">
            {/* Ambient Pink Glow */}
            <div 
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none opacity-20 blur-2xl"
              style={{ background: '#ed3373' }}
            />

            <div className="space-y-3 relative z-10">
              <span className="text-sm font-mono font-bold text-[#ed3373] tracking-widest uppercase">
                ARURA WELLNESS STUDIO
              </span>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-[46px] font-bold text-white tracking-tight leading-tight">
                Begin Your Journey to Root Recovery Today
              </h2>
              <p className="text-base sm:text-lg text-neutral-300 max-w-xl mx-auto font-normal leading-relaxed">
                Private consultations in acoustic suites at Virugambakkam, Chennai. Open daily 10:00 AM to 8:00 PM.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 relative z-10">
              <Link
                to="/booking"
                className="px-8 py-4 rounded-full text-sm sm:text-base font-bold bg-[#ed3373] text-white hover:bg-[#c91e5c] transition-all shadow-[0_4px_16px_rgba(237,51,115,0.4)] hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                Schedule an Appointment
              </Link>
              <Link
                to="/counselling"
                className="px-8 py-4 rounded-full text-sm sm:text-base font-bold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
              >
                Explore 15 Counselling Modalities
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
