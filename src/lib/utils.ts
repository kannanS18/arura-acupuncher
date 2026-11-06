import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface TreatmentCardItem {
  id: number;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  fee: string;
  feeNum: number;
  image: string;
  badge: string;
  features: string[];
  color: string;
}

/**
 * Clinical Treatments Card Data for Stacked Glass Cards
 * Styled with Arura Wellness Studio's signature medical color palette:
 * - Brand Rose: rgba(224, 40, 104, 0.8)
 * - Sterile Emerald: rgba(5, 150, 105, 0.8)
 * - Restorative Amethyst: rgba(88, 28, 135, 0.8)
 * - Deep Indigo: rgba(67, 56, 202, 0.8)
 */
export const cardData: TreatmentCardItem[] = [
  {
    id: 1,
    code: "01 / 04",
    title: "Diagnostic Consultation & Pulse Mapping",
    subtitle: "First Visit Clinical Assessment",
    description: "Comprehensive 14-radial pulse assessment and tongue topography analysis by Dr. Nivedha to identify original root imbalances before any needle is placed.",
    duration: "30 – 45 mins",
    fee: "₹600",
    feeNum: 600,
    image: "doctor_nivedha_portrait.jpg",
    badge: "Clinical Intake & Diagnostics",
    features: [
      "14-Channel Radial Pulse Mapping",
      "Tongue Topography Analysis",
      "Autonomic Stress & Sleep Evaluation",
      "Personalized Treatment Roadmap"
    ],
    color: "rgba(224, 40, 104, 0.8)"
  },
  {
    id: 2,
    code: "02 / 04",
    title: "Classical 14-Meridian Acupuncture",
    subtitle: "Meridian Pain & Autonomic Regulation",
    description: "Gentle insertion of hair-thin, 100% pre-sterilized disposable needles along targeted meridian pathways, paired with localized infrared TDP mineral heat.",
    duration: "25 mins (Daily Cap: 50 Patients)",
    fee: "₹600",
    feeNum: 600,
    image: "authentic_acupuncture_needles.jpg",
    badge: "0.18mm Sterile Single-Use",
    features: [
      "Ethylene-Oxide Pre-Sterilized Needles",
      "Single-Use Only (Opened at Bedside)",
      "TDP Mineral Infrared Heat Therapy",
      "Complimentary Glass Cupping / Moxa"
    ],
    color: "rgba(5, 150, 105, 0.8)"
  },
  {
    id: 3,
    code: "03 / 04",
    title: "Clinical Psychotherapy Session",
    subtitle: "Cognitive & Emotional Equilibrium",
    description: "Unhurried, strictly confidential psychotherapy in our private acoustic room, integrating Cambridge-aligned CBT, REBT, and autonomic de-escalation.",
    duration: "50 mins",
    fee: "₹1,800",
    feeNum: 1800,
    image: "zen_treatment.jpg",
    badge: "Private Acoustic Suite",
    features: [
      "Evidence-Based CBT & REBT Protocols",
      "Private Sound-Dampened Acoustic Suite",
      "Somatic Autonomic De-escalation",
      "100% Strict Confidential Medical Ethics"
    ],
    color: "rgba(88, 28, 135, 0.8)"
  },
  {
    id: 4,
    code: "04 / 04",
    title: "Integrated Mind-Body Dual Session",
    subtitle: "Psychotherapy + Full Precision Needling",
    description: "Our comprehensive clinical synergy: 40 minutes of cognitive dialogue followed immediately by full-body meridian acupuncture to dismantle chronic pain loops.",
    duration: "75 – 90 mins",
    fee: "₹2,400",
    feeNum: 2400,
    image: "acu_treatment1.jpg",
    badge: "Dual Multi-System Synergy",
    features: [
      "40 Min Focused Psychotherapy Dialogue",
      "Full-Body Classical Meridian Needling",
      "Vagus Nerve & Parasympathetic Reset",
      "Personalized At-Home Posture & Diet Guide"
    ],
    color: "rgba(67, 56, 202, 0.8)"
  }
];
