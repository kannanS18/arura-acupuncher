import React from 'react';
import { HeroSection } from '@/components/ui/hero-section-2';
import { getAssetUrl } from '@/utils/assetUrl';

export default function HeroSectionDemo() {
  return (
    <div className="w-full">
      <HeroSection
        badge="ARURA WELLNESS STUDIO • VIRUGAMBAKKAM, CHENNAI"
        logo={{
          url: getAssetUrl("logo.png"),
          alt: "Arura Wellness Studio",
          text: "ARURA WELLNESS STUDIO"
        }}
        slogan="CLASSICAL 14-MERIDIAN ACUPUNCTURE & PSYCHOTHERAPY"
        title={
          <>
            Classical 14-meridian <br />
            acupuncture & <br />
            <span className="text-primary">psychological therapy</span>
          </>
        }
        subtitle="Led by Dr. Nivedha Priyadharshini, MD (Acu). Dedicated 1-on-1 clinical consultations for chronic nerve pain, migraine syndromes, cervical spondylosis, and autonomic burnout. 0.18mm pre-sterilized single-use needles in private acoustic suites."
        callToAction={{
          text: "BOOK PRIORITY CONSULTATION (₹600)",
          href: "#/booking",
        }}
        secondaryAction={{
          text: "WhatsApp Concierge",
          href: "https://wa.me/917358031752?text=Hello%20Dr.%20Nivedha,%20I%20would%20like%20to%20book%20an%20acupuncture%20consultation",
        }}
        backgroundImage={getAssetUrl("hero_acupuncture_sanctuary.jpg")}
        floatingBadge={{
          title: "Virugambakkam Acoustic Suite",
          subtitle: "Daily Cap: 50 Patients • Prior Appointment"
        }}
        contactInfo={{
          website: "arura.in • Daily 10AM-8PM",
          phone: "+91 73580 31752",
          address: "No 45A, Vaikasi Street, Chinmaya Nagar",
        }}
      />
    </div>
  );
}
