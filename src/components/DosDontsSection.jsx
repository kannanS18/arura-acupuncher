import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

export default function DosDontsSection() {
  const dos = [
    { title: "Eat a Light Meal 1–2h Before", desc: "Never come on an empty stomach to prevent mild dizziness or weakness during meridian activation." },
    { title: "Wear Loose Comfortable Clothes", desc: "Allows easy, unhindered access to key meridian points around elbows, forearms, knees, and ankles." },
    { title: "Stay Adequately Hydrated", desc: "Drink clean water before and after treatment to assist your lymphatic system and cellular detoxification." },
    { title: "Communicate Openly", desc: "Always notify Dr. Nivedha about current medications, medical history, pain location, and bodily sensations." },
    { title: "Commit to Consistency", desc: "Acupuncture is cumulative. Completing recommended courses of 6–12 treatments ensures enduring neuro-endocrine balance." }
  ];

  const donts = [
    { title: "Avoid Strenuous Exercise", desc: "Do NOT engage in heavy weightlifting or exhausting cardio immediately before or after your session." },
    { title: "Avoid Alcohol & Excess Caffeine", desc: "Alcohol and heavy caffeine alter blood pressure and vascular reactivity, hindering autonomic relaxation." },
    { title: "Do NOT Arrive In High Stress", desc: "Arrive 5–10 minutes early to allow your breath and resting heart rate to stabilize in our tranquil lounge." },
    { title: "Do NOT Skip Scheduled Sessions", desc: "Inconsistent scheduling delays meridian clearing and interrupts the natural momentum of self-healing." }
  ];

  return (
    <section id="dos-donts" className="py-24 bg-white border-y border-[#ede7f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#581c87]">Clinical Protocols</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#161820] font-display">
            Acupuncture Preparation. <br />
            <span className="italic text-[#66478d]">The DOs and DON'Ts.</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed pt-2">
            Adhering to these pre- and post-session guidelines ensures maximum therapeutic response and comfortable healing.
          </p>
        </div>

        {/* Minimalist Yin & Yang Split Stream (No cheap cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Stream: DOs */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b-2 border-emerald-500">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <h3 className="text-xl font-bold text-[#161820] font-display">Recommended Clinical DOs</h3>
            </div>
            <div className="space-y-4">
              {dos.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-[#faf8fb] border border-[#ede7f3] space-y-1">
                  <strong className="text-sm font-bold text-[#161820] block">{item.title}</strong>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Stream: DON'Ts */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b-2 border-rose-500">
              <XCircle className="w-6 h-6 text-rose-600" />
              <h3 className="text-xl font-bold text-[#161820] font-display">Important Precautions (DON'Ts)</h3>
            </div>
            <div className="space-y-4">
              {donts.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-[#faf8fb] border border-[#ede7f3] space-y-1">
                  <strong className="text-sm font-bold text-[#161820] block">{item.title}</strong>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Medical Contraindications Strip */}
        <div className="mt-16 p-8 rounded-3xl bg-amber-50/70 border border-amber-200/80 space-y-4">
          <div className="flex items-center space-x-3 text-amber-900">
            <AlertTriangle className="w-6 h-6 flex-shrink-0" />
            <h4 className="font-bold text-base font-display">Safety & Absolute Medical Contraindications</h4>
          </div>
          <p className="text-xs text-amber-900/80 leading-relaxed">
            Acupuncture is strictly avoided or performed with extreme specialized caution under the following conditions:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-amber-950 pt-2">
            <div className="p-4 bg-white/90 rounded-2xl border border-amber-200">
              <strong className="block mb-1 text-amber-900">1. Pregnancy</strong>
              Inform Dr. Nivedha immediately. Certain points induce strong uterine contractions and are contraindicated except during overdue labor induction under obstetric care.
            </div>
            <div className="p-4 bg-white/90 rounded-2xl border border-amber-200">
              <strong className="block mb-1 text-amber-900">2. Medical Emergencies</strong>
              Acupuncture never replaces urgent surgical or emergency trauma intervention. First aid and emergency transfer take immediate priority.
            </div>
            <div className="p-4 bg-white/90 rounded-2xl border border-amber-200">
              <strong className="block mb-1 text-amber-900">3. Malignant Tumours & Bleeding</strong>
              Direct needling at tumour sites is prohibited. Patients on high-dose anticoagulant therapy or with hemophilia require specialized non-needle techniques.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
