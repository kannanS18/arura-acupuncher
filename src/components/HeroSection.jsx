import React, { useState } from 'react';
import { HeroSection } from './ui/hero-section-2';
import { CLINIC_INFO } from '../data/websiteContent';
import { getAssetUrl } from '../utils/assetUrl';
import { Zap, Waves } from 'lucide-react';
import { motion } from 'framer-motion';

// 14-Meridian Presets with matching imagery & resonance
const MERIDIAN_PRESETS = [
  {
    id: 'cervical',
    condition: 'Neck Pain & Cervical Stiffness',
    frequency: '0.15 Hz Vagal Wave',
    image: getAssetUrl('hero_acupuncture_sanctuary.jpg'),
    focus: 'Relieves neck stiffness & trapezius knots by decompressing C5–C7 cervical nerves.'
  },
  {
    id: 'migraine',
    condition: 'Migraines & Frequent Headaches',
    frequency: '0.22 Hz Cranial Calm',
    image: getAssetUrl('acupuncture_session.jpg'),
    focus: 'Reduces headache frequency & temple pain by calming the trigeminovascular sensory loop.'
  },
  {
    id: 'burnout',
    condition: 'Stress Burnout & Anxiety',
    frequency: '0.10 Hz Parasympathetic',
    image: getAssetUrl('zen_treatment.jpg'),
    focus: 'Soothes racing thoughts & chest tightness by activating parasympathetic vagal recovery.'
  },
  {
    id: 'nerve',
    condition: 'Sciatica & Chronic Nerve Pain',
    frequency: '0.18 Hz Neural Reset',
    image: getAssetUrl('clinic_interior.jpg'),
    focus: 'Eliminates sharp shooting leg pain by un-clamping the sciatic nerve sheath.'
  }
];

export default function HeroSectionWrapper({ onOpenBooking }) {
  const [activePreset, setActivePreset] = useState(MERIDIAN_PRESETS[0]);

  return (
    <div className="relative w-full bg-background overflow-hidden">
      <HeroSection
        badge="BEST ACUPUNCTURE CLINIC IN CHENNAI • VIRUGAMBAKKAM"
        logo={{
          url: getAssetUrl("logo.png"),
          alt: "Arura Wellness Studio - Acupuncture Treatment Centre",
          text: "ARURA WELLNESS STUDIO"
        }}
        slogan="TRADITIONAL ACUPUNCTURE TREATMENT & HOLISTIC THERAPY"
        words={[
          { text: "Acupuncture" },
          { text: "treatment" },
          { text: "&" },
          { text: "therapy", highlight: true },
          { text: "in", highlight: true },
          { text: "Chennai", highlight: true },
        ]}
        title="Acupuncture Treatment & Therapy in Chennai: Classical 14-Meridian Pain Relief"
        subtitle="Chennai's premier clinic led by Dr. Nivedha Priyadharshini, MD (Acu). Natural pain relief for back pain, neck stiffness, sciatica, and migraines. Private acoustic suites from ₹600."
        callToAction={{
          text: "Book Priority Consultation (₹600)",
          href: "#/booking",
          onClick: onOpenBooking,
        }}
        secondaryAction={{
          text: "WhatsApp Clinic Concierge",
          href: CLINIC_INFO.whatsappLink,
          icon: (
            <svg className="h-4 w-4 text-emerald-500 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.404z"/>
            </svg>
          )
        }}
        backgroundImage={activePreset.image}
        floatingBadge={{
          title: "Virugambakkam Acoustic Suite",
          subtitle: `${activePreset.frequency} • ${activePreset.condition}`
        }}
        contactInfo={{
          website: "arura.in • Daily 10AM–8PM",
          phone: "+91 73580 31752",
          address: "No 45A, Vaikasi St, Chinmaya Nagar",
        }}
      />

      {/* Interactive 14-Meridian Selector Strip positioned above bottom footer */}
      <div className="border-t border-border/40 bg-pink-50/25 px-5 sm:px-8 lg:px-12 py-3 flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2 text-neutral-600 font-semibold">
          <Waves className="w-4 h-4 text-primary" />
          <span className="uppercase tracking-wider text-xs sm:text-sm font-bold">Explore Clinical Meridian Pathways:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {MERIDIAN_PRESETS.map((p) => {
            const isSelected = activePreset.id === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePreset(p)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all text-xs sm:text-sm cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-white shadow-sm scale-105'
                    : 'bg-white text-neutral-800 hover:bg-pink-100/60 border border-neutral-200'
                }`}
              >
                <Zap className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-primary'}`} />
                <span>{p.condition}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
