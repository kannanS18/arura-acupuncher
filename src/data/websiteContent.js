/**
 * Arura Wellness Studio — Complete Structured Clinical & Content Knowledge Base
 * Extracted from the official 17 pages documentation.
 */

export const CLINIC_INFO = {
  name: "Arura Wellness Studio",
  subtitle: "Acupuncture & Counselling Centre",
  founder: "Dr. Nivedha Priyadharshini",
  founderTitle: "Founder & Lead Holistic Healer",
  founderDegrees: "MD (Acu) • Cambridge Intl Dip. in Teaching & Learning • PG Dip. in Counselling Therapy",
  phone: "+91 73580 31752",
  phoneRaw: "917358031752",
  address: "No 45A, Ground floor, Vaikasi Street, Chinmaya Nagar, Virugambakkam, Chennai - 600092",
  website: "www.arura.in",
  instagram: "https://www.instagram.com/arura.acupuncture/",
  instagramHandle: "@arura.acupuncture",
  whatsappLink: "https://wa.me/917358031752",
  stats: [
    { value: "8+", label: "Years Experience", subtext: "Established clinical journey" },
    { value: "1,100+", label: "Satisfied Clients", subtext: "Natural, lasting recoveries" },
    { value: "2", label: "Holistic Therapies", subtext: "Acupuncture & Counselling" },
    { value: "MD (Acu)", label: "Licensed Expertise", subtext: "Strict aseptic techniques" }
  ]
};

export const PRICING_DATA = [
  {
    id: "acupuncture",
    title: "Acupuncture Therapy",
    tagline: "Clinical Meridian Needling & Pain Relief",
    price: 600,
    priceFormatted: "INR 600.00",
    duration: "25 minutes",
    limitNotice: "Daily Limit: 50 Sessions",
    badge: "Most Requested",
    description: "Personalized meridian assessment followed by sterile single-use needle insertion. Includes optional complementary moxibustion or cupping as indicated.",
    features: [
      "Initial pulse, tongue and lifestyle assessment",
      "5 to 20 sterile surgical stainless steel needles",
      "Complimentary heat moxibustion or glass cupping",
      "Post-session energy realignment and guidance",
      "Clean clinical environment with strict aseptic methods"
    ]
  },
  {
    id: "counselling",
    title: "Counselling Therapy",
    tagline: "Psychological Support & Emotional Balance",
    price: 1800,
    priceFormatted: "INR 1,800.00",
    duration: "50 minutes",
    limitNotice: "Weekly Limit: 20 Sessions",
    badge: "Holistic Mind Wellness",
    description: "One-on-one confidential counseling session integrating CBT, REBT, Gestalt, and mindfulness for emotional healing, trauma, and stress.",
    features: [
      "In-depth 50-minute private consultation",
      "Evidence-based CBT and cognitive reframing",
      "Safe, supportive, and non-judgmental environment",
      "Customized emotional coping & resilience tools",
      "Available In-Clinic or via Secure Online Audio/Video"
    ]
  }
];

export const ACUPUNCTURE_TECHNIQUES = [
  {
    title: "Sterile Needle Insertion",
    icon: "activity",
    desc: "Hair-thin, single-use surgical needles placed at strategic meridian points to stimulate nerves, release endorphins, and restore qi flow."
  },
  {
    title: "Moxibustion ('Moxa')",
    icon: "flame",
    desc: "Application of heated sticks made from dried herbs held near needles to warm points, enhance circulation, and dispel internal cold/dampness."
  },
  {
    title: "Glass Cupping Therapy",
    icon: "disc",
    desc: "Localized suction created using specialized glass cups to release deep myofascial tension, increase blood flow, and relieve qi stagnation."
  },
  {
    title: "Chinese Herbal Guidance",
    icon: "leaf",
    desc: "Traditional Chinese botanical formulas that work synergistically with acupuncture to nourish organ systems and accelerate cellular repair."
  },
  {
    title: "Electro-Acupuncture",
    icon: "zap",
    desc: "Safe micro-current electrical stimulation applied to needle pairs to intensify pain relief and accelerate neuromuscular rehabilitation."
  },
  {
    title: "Laser Acupuncture (Needle-Free)",
    icon: "sun",
    desc: "Painless, non-invasive low-level laser therapy stimulating acupoints without needles. Ideal for needle-sensitive patients and children."
  }
];

export const DISORDERS_DATA = [
  {
    category: "Digestive",
    icon: "apple",
    items: ["Gastritis & Hyperacidity", "Irritable Bowel Syndrome (IBS)", "Hepatitis Support", "Hemorrhoids & Constipation", "Chronic Bloating"]
  },
  {
    category: "Emotional & Mental",
    icon: "heart",
    items: ["Chronic Anxiety & Panic", "Depression & Low Energy", "Insomnia & Sleep Deprivation", "Nervousness & Restlessness", "Stress Burnout"]
  },
  {
    category: "Musculoskeletal",
    icon: "bone",
    items: ["Severe Arthritis & Knee Pain", "Lower & Upper Back Pain", "Sciatica & Piriformis Syndrome", "Muscle Spasms & Cramps", "Cervical Neck Stiffness"]
  },
  {
    category: "Neurological",
    icon: "brain",
    items: ["Chronic Migraines & Tension Headaches", "Postoperative Pain Control", "Stroke Motor Recovery Support", "Neurogenic Bladder Dysfunction", "Parkinson's Symptom Care"]
  },
  {
    category: "Gynecological",
    icon: "flower",
    items: ["Severe Menstrual Cramping", "Hormonal & Cycle Irregularities", "Infertility Complementary Support", "Menopausal Hot Flashes", "PCOS Support"]
  },
  {
    category: "Respiratory & ENT",
    icon: "wind",
    items: ["Allergic Rhinitis & Sneezing", "Chronic Sinusitis & Pressure", "Bronchial Wheezing", "Recurrent Sore Throat", "Ear Fullness & Tinnitus"]
  }
];

export const COUNSELLING_METHODS = [
  {
    name: "Cognitive Behavioral Therapy (CBT)",
    badge: "Gold Standard",
    desc: "Focuses on identifying distorted negative thought patterns and irrational beliefs, replacing them with adaptive cognitive coping strategies."
  },
  {
    name: "Rational Emotive Behavioral Therapy (REBT)",
    badge: "Belief Mastery",
    desc: "Examines how emotional distress stems from self-defeating beliefs rather than external events, cultivating robust emotional resilience."
  },
  {
    name: "Gestalt Therapy",
    badge: "Here & Now",
    desc: "Utilizes empty-chair and guided self-awareness exercises to help individuals process unresolved emotional blockages in the present moment."
  },
  {
    name: "Transactional Analysis (TA)",
    badge: "Ego Dynamics",
    desc: "Decodes communication dynamics through Parent, Adult, and Child ego states to break toxic relationship conflicts and unhealthy patterns."
  },
  {
    name: "Person-Centered Therapy",
    badge: "Unconditional Empathy",
    desc: "Founded on deep empathetic active listening and non-judgmental acceptance to empower self-awareness and autonomous healing."
  },
  {
    name: "Mindfulness-Based Counselling",
    badge: "Nervous System Calming",
    desc: "Integrates somatic breathwork, progressive relaxation, and present-moment grounding to down-regulate nervous system hyperactivity."
  }
];

export const TESTIMONIALS_DATA = [
  {
    name: "Nila",
    location: "Chennai",
    rating: 5,
    tag: "Calm Environment & Care",
    text: "A basic acupuncture clinic is all about the environment. Nivedha's Arura clinic is so calm and soothing with added personal care of Nivedha herself. I was skeptical at first about acupuncture, but trust me it worked, I surely did find a difference. Thank you Nivedha for your care each day."
  },
  {
    name: "Sowmiya Janu",
    location: "Chennai",
    rating: 5,
    tag: "Knee Surgery Avoided",
    text: "With giving 5-star rating will be less, Dr Nivedha is one of the best acupuncturists in Chennai. With her treatment my mom could able to walk properly. Many orthopaedic doctors had told us for knee replacement, but due to Arura's magic, now my mom is very much fine."
  },
  {
    name: "Ramkumar Ananth",
    location: "Chennai",
    rating: 5,
    tag: "GERD & Acidity Relief",
    text: "I went there for Gerd and Acidity problem. After 7–8 sessions of needling, I felt somewhat better. But what I like about this Arura Acupuncture Studio was Dr. Nivedha's kind gesture, pleasing attitude and smiling face. A very nice younger sister to me. The studio also has a good receptionist Tejawathy."
  }
];

export const FAQS_DATA = [
  // Primary Acupuncture Questions (Educational & Safety)
  {
    q: "What is acupuncture treatment and how does it work?",
    a: "Acupuncture is an evidence-based clinical therapy rooted in classical 14-meridian Traditional Chinese Medicine. Modern biomedical science demonstrates that inserting hair-thin, 0.18mm sterile needles into designated neuro-vascular points stimulates sensory nerves, promotes micro-capillary vasodilation, dissipates muscular knots, and triggers central beta-endorphins and neurotransmitters that relieve pain and downregulate the autonomic nervous system.",
    category: "acupuncture"
  },
  {
    q: "Is acupuncture treatment safe?",
    a: "When performed by a certified and licensed MD acupuncturist like Dr. Nivedha Priyadharshini, acupuncture is exceptionally safe with virtually zero side effects. At Arura Wellness Studio, we follow strict clinical sterility standards: 100% ethylene-oxide pre-sterilized, single-use surgical stainless steel needles opened right at your bedside and safely discarded immediately after treatment.",
    category: "acupuncture"
  },
  {
    q: "Does acupuncture hurt?",
    a: "Most people feel little to no discomfort. Acupuncture needles are hair-thin (0.18mm)—roughly twenty times thinner than a standard injection syringe. Rather than pain, patients typically report a comforting, dull warmth, gentle tingling, or soothing heaviness known as 'De-Qi', followed by deep physical relaxation.",
    category: "acupuncture"
  },
  {
    q: "How much does acupuncture treatment cost in Chennai?",
    a: "At Arura Wellness Studio in Virugambakkam, Chennai, a targeted acupuncture therapy session is ₹600. This includes an individualized clinical pulse assessment, sterile single-use needle application, and complimentary supportive therapies such as far-infrared TDP mineral heat or glass cupping.",
    category: "acupuncture"
  },
  {
    q: "How many sessions of acupuncture are required for recovery?",
    a: "The number of sessions depends on whether your condition is acute or chronic. Acute muscle strains or recent neck spasms often resolve in 2 to 4 sessions. Chronic ailments such as long-standing sciatica, severe lumbar disc herniation, frequent migraine headaches, or PCOS typically benefit from a structured protocol of 6 to 10 sessions scheduled weekly.",
    category: "acupuncture"
  },
  {
    q: "What happens during an acupuncture session?",
    a: "Your visit begins with a 15-minute diagnostic intake evaluating 14 radial pulse positions on both wrists and tongue mucosal topography. Next, 6 to 18 microscopic needles are gently placed while you lie comfortably on a plush treatment bed. You then rest peacefully for 20 minutes with gentle infrared TDP mineral warmth, during which most patients fall into a rejuvenating 'acupuncture nap'.",
    category: "acupuncture"
  },
  {
    q: "What are the benefits of traditional acupuncture?",
    a: "Traditional 14-meridian acupuncture treats the root systemic imbalance rather than simply numbing symptoms with pharmaceuticals. Key benefits include sustainable pain relief for back, neck, and joint pain, reduced reliance on painkillers, lower stress cortisol, restored sleep quality, balanced hormones and digestion, and zero gastrointestinal side effects.",
    category: "acupuncture"
  },
  {
    q: "Acupuncture vs acupressure: What is the difference?",
    a: "Acupressure applies external fingertip or tool pressure on acupoints, which provides temporary surface muscle relaxation. Classical acupuncture uses micro-fine surgical needles that penetrate directly into deep neuro-fascial trigger planes. This activates the 'De-Qi' sensory feedback, dilates deep micro-vessels, and triggers natural endorphins for lasting clinical healing.",
    category: "acupuncture"
  },
  {
    q: "Best acupuncture treatment for chronic back pain?",
    a: "Targeted needling along the Bladder (BL-23, BL-40) and Governing Vessel meridians decompresses pinched nerve roots, discharges deep lumbar myofascial trigger nodes, and stimulates local endorphins. Over 88% of our back pain patients in Chennai report major mobility restoration and pain reduction within 3 to 5 sessions.",
    category: "acupuncture"
  },
  {
    q: "Does acupuncture help with migraine headaches?",
    a: "Yes. Clinical research shows acupuncture downregulates the hyperactive trigeminovascular sensory loop and reduces neurogenic CGRP release, calming cranial arterial spasms. Needling points like Fengchi (GB-20), Baihui (GV-20), and Taiyang drastically reduces migraine frequency, temple throbbing, and nausea.",
    category: "acupuncture"
  },
  {
    q: "How effective is acupuncture for knee pain?",
    a: "Acupuncture is highly effective for knee osteoarthritis, patellar tendinitis, and joint stiffness. It stimulates synovial micro-circulation, reduces inflammatory joint effusion, and helps patients regain normal walking ability—often helping avoid or defer invasive joint surgeries.",
    category: "acupuncture"
  },
  {
    q: "Is acupuncture effective for sciatica pain?",
    a: "Yes, acupuncture provides exceptional relief for sciatica. By targeting Huantiao (GB-30) and local sacral points, needling relaxes the deep piriformis muscle contracture that entraps the sciatic nerve, halting sharp shooting electrical pains and leg numbness.",
    category: "acupuncture"
  },
  {
    q: "Natural treatment for neck and shoulder pain?",
    a: "Acupoints Jianjing (GB-21) and Tianzhu (BL-10) combined with far-infrared mineral heat therapy dissolve deep trapezius knots and occipital nerve compression, relieving cervical spondylosis and desk-posture neck stiffness completely naturally.",
    category: "acupuncture"
  },
  {
    q: "Best acupuncture specialist for pain management in Chennai?",
    a: "Dr. Nivedha Priyadharshini, MD (Acu), is one of Chennai's leading acupuncture specialists with over 8 years of clinical practice and 1,100+ documented patient recoveries. Her private sanctuary in Virugambakkam integrates classical acupuncture with Cambridge psychotherapy.",
    category: "acupuncture"
  },

  // Counselling & Psychological Therapy Questions
  {
    q: "What is Counselling therapy and is it a medical treatment?",
    a: "Counselling therapy is a collaborative, confidential emotional and mental wellness process. It is NOT a medical treatment; counselors do not prescribe medications. It focuses on coping mechanisms, emotional clarity, and relationship healing.",
    category: "counselling"
  },
  {
    q: "Is therapy only for people with severe mental health issues?",
    a: "Not at all. Many people seek counseling for stress, burnout, relationship conflicts, overthinking, career crossroads, grief, and building self-confidence.",
    category: "counselling"
  },
  {
    q: "Will my discussions remain strictly confidential?",
    a: "Yes. Therapy sessions are protected by strict clinical ethics and confidentiality. Your personal information is never shared without your explicit consent.",
    category: "counselling"
  },
  {
    q: "What are the payment terms and refund policy?",
    a: "Session charges are confirmed in advance via website payment link, GPay, or UPI to secure your appointment slot. There is no refund or cancellation policy for confirmed bookings.",
    category: "counselling"
  },
  {
    q: "Can therapy sessions be conducted online?",
    a: "Yes! Online counseling is available via secure audio/video platforms for clients across India or abroad.",
    category: "counselling"
  },
  {
    q: "What should I expect during my first session?",
    a: "The first session is gentle and non-intimidating. It focuses on understanding your goals, discussing expectations, building trust, and mapping out a personalized therapy plan without any pressure.",
    category: "counselling"
  }
];


export const DOS_DONTS = {
  dos: [
    { title: "Eat a Light Meal 1–2 Hours Prior", desc: "Never arrive on an empty stomach. A light snack stabilizes blood sugar and prevents dizziness during meridian stimulation." },
    { title: "Wear Loose, Comfortable Clothing", desc: "Choose wide-leg pants and loose shirts that allow easy access to knees, elbows, abdomen, and neck." },
    { title: "Stay Well-Hydrated", desc: "Drink plenty of room-temperature water before and after treatment to assist cellular detoxification." },
    { title: "Rest and Allow Vital Qi to Settle", desc: "Plan a calm evening after treatment. Give your body time to integrate the deep neuromuscular rebalancing." }
  ],
  donts: [
    { title: "Do NOT Arrive Fasting or Famished", desc: "Fasting increases susceptibility to vasovagal lightheadedness during needle insertion." },
    { title: "Avoid Caffeine & Alcohol", desc: "Avoid coffee, energy drinks, and alcohol for at least 4 hours before and after your session to prevent autonomic distortion." },
    { title: "Avoid Strenuous Heavy Workouts", desc: "Skip intense gym lifting, strenuous cardio, or marathons immediately post-needling." },
    { title: "Avoid Cold Showers & Direct AC Blasts", desc: "Keep treated acupuncture points warm and shielded from direct cold drafts for at least 4 hours." }
  ]
};

export const COUNSELLING_SERVICES = [
  {
    id: "individual",
    title: "Individual Therapy & Stress Relief",
    description: "One-on-one psychological counseling to work through emotional burnout, chronic overthinking, anxiety, panic triggers, and depressive thoughts.",
    target: "Emotional Clarity, Boundary Setting, Self-Worth"
  },
  {
    id: "couples",
    title: "Couples & Relationship Counselling",
    description: "Safe, structured dialogue using Transactional Analysis to unpack communication breakdowns, recurring conflicts, emotional distance, and rebuild intimacy.",
    target: "Constructive Conflict Resolution, Mutual Empathy"
  },
  {
    id: "adolescent",
    title: "Adolescent & Student Guidance",
    description: "Dedicated support for teenagers navigating exam anxiety, emotional turbulence, identity struggles, peer pressure, and self-confidence challenges.",
    target: "Emotional Regulation, Academic Resilience"
  },
  {
    id: "grief",
    title: "Grief, Loss & Trauma Recovery",
    description: "Gentle, compassionate space to process profound personal loss, bereavement, divorce, medical trauma, or abrupt life transitions.",
    target: "Trauma Integration, Emotional Closure, Reconnection"
  },
  {
    id: "burnout",
    title: "Corporate Burnout & Executive Mental Health",
    description: "Targeted coping strategies for professionals dealing with unrelenting high stress, imposter syndrome, insomnia, and work-life depletion.",
    target: "Cognitive Reframing, Stress Resilience, Sleep Recovery"
  },
  {
    id: "family",
    title: "Family System Mediation & Healing",
    description: "Fostering healthy boundaries, intergenerational understanding, and emotional transparency within family units.",
    target: "Family Harmony, Empathy, Structural Balance"
  }
];

// Aliases for clean multi-page imports
export const TESTIMONIALS = TESTIMONIALS_DATA;
export const DISORDERS = DISORDERS_DATA;
export const FAQS = FAQS_DATA;
export const PRICING_TIERS = PRICING_DATA;
export const CLINICAL_METHODS = COUNSELLING_METHODS;
