export const services = [
  {
    id: 1,
    slug: 'acne-scar-treatment',
    name: 'Acne & Scar Treatment',
    shortDescription: 'Advanced treatment for active acne, acne scars, and post-acne pigmentation.',
    icon: 'Sparkles',
    image: '/images/services/acne-treatment.jpg',
    featured: true,
    overview:
      'Acne is one of the most common skin concerns affecting teenagers and adults alike. At Kiran Dermatology, we offer comprehensive acne management — from treating active breakouts to fading scars and pigmentation — using evidence-based, US-FDA approved treatments tailored to your skin type.',
    conditions: [
      'Inflammatory acne (papules, pustules)',
      'Cystic & nodular acne',
      'Hormonal acne',
      'Acne scars (ice-pick, boxcar, rolling)',
      'Post-inflammatory hyperpigmentation (PIH)',
      'Blackheads & whiteheads',
    ],
    procedures: [
      'Medical-grade topical & oral therapy',
      'Chemical peels (Salicylic, Glycolic, Mandelic)',
      'Microneedling with PRP',
      'Fractional CO2 laser for scars',
      'Subcision for depressed scars',
      'Intralesional injections for cystic acne',
    ],
    faqs: [
      {
        question: 'How many sessions are needed for acne scars?',
        answer:
          'Depending on the scar type and severity, 4–8 sessions are typically needed, spaced 4–6 weeks apart. You will start seeing visible improvement after the 2nd or 3rd session.',
      },
      {
        question: 'Is the treatment painful?',
        answer:
          'Most treatments are well-tolerated. We apply numbing cream before procedures like microneedling or laser to ensure minimal discomfort.',
      },
      {
        question: 'Will acne come back after treatment?',
        answer:
          'With proper maintenance and a good skincare routine, recurrence is significantly reduced. We also provide a personalized skincare plan to keep your skin clear long-term.',
      },
    ],
    duration: '30–60 minutes per session',
    sessions: '4–8 sessions',
  },
  {
    id: 2,
    slug: 'hair-fall-treatment',
    name: 'Hair Fall & Hair Transplant',
    shortDescription: 'Complete hair restoration — from diagnosis to PRP, GFC, and FUE transplant.',
    icon: 'Scissors',
    image: '/images/services/hair-treatment.jpg',
    featured: true,
    overview:
      'Hair fall affects millions of men and women, and can deeply impact confidence. Our clinic provides end-to-end hair restoration — from accurate diagnosis (trichoscopy) to advanced therapies like PRP, GFC, and FUE hair transplant — all under expert dermatological supervision.',
    conditions: [
      'Androgenetic alopecia (male & female pattern)',
      'Telogen effluvium (stress-induced hair fall)',
      'Alopecia areata',
      'Post-COVID hair loss',
      'Dandruff & seborrheic dermatitis',
      'Eyebrow & beard loss',
    ],
    procedures: [
      'Trichoscopy (scalp analysis)',
      'PRP (Platelet-Rich Plasma) therapy',
      'GFC (Growth Factor Concentrate) therapy',
      'Low-level laser therapy (LLLT)',
      'FUE hair transplant',
      'Mesotherapy for hair',
    ],
    faqs: [
      {
        question: 'How long does PRP take to show results?',
        answer:
          'PRP typically requires 4–6 sessions spaced a month apart. Visible improvement starts around 3 months, with best results at 6 months.',
      },
      {
        question: 'Is FUE hair transplant permanent?',
        answer:
          'Yes. Transplanted hair follicles are taken from the permanent zone and are resistant to DHT, so they grow for life.',
      },
      {
        question: 'Do you treat female hair fall?',
        answer:
          'Absolutely. We treat both men and women with customized protocols based on their pattern and cause.',
      },
    ],
    duration: '30 minutes (PRP) / 6–8 hours (transplant)',
    sessions: '4–6 sessions (PRP)',
  },
  {
    id: 3,
    slug: 'laser-treatments',
    name: 'Laser Treatments',
    shortDescription: 'US-FDA approved lasers for hair removal, pigmentation, and skin resurfacing.',
    icon: 'Zap',
    image: '/images/services/laser-treatment.jpg',
    featured: true,
    overview:
      'We use US-FDA approved laser technology to treat a wide range of skin concerns — from unwanted hair to stubborn pigmentation and signs of aging. Every treatment is performed by trained professionals under Dr. Asmita Singh\'s supervision.',
    conditions: [
      'Unwanted facial & body hair',
      'Melasma & pigmentation',
      'Tattoo removal',
      'Skin resurfacing & rejuvenation',
      'Vascular lesions & warts',
      'Signs of aging (fine lines, wrinkles)',
    ],
    procedures: [
      'Diode laser hair removal',
      'Q-switched Nd:YAG laser',
      'Fractional CO2 laser',
      'Pico laser for pigmentation',
      'Laser tattoo removal',
      'Laser toning for glow',
    ],
    faqs: [
      {
        question: 'Is laser hair removal safe for all skin types?',
        answer:
          'Yes, with the right laser and settings. We always perform a patch test and customize parameters based on your skin type and hair color.',
      },
      {
        question: 'How many sessions for laser hair removal?',
        answer:
          'Typically 6–8 sessions spaced 4–6 weeks apart, as hair grows in cycles and lasers only affect hair in the active growth phase.',
      },
      {
        question: 'Does laser treatment hurt?',
        answer:
          'Most patients describe it as a mild rubber-band snap. Cooling systems and numbing creams make it very comfortable.',
      },
    ],
    duration: '15–60 minutes',
    sessions: '6–8 sessions (hair removal)',
  },
  {
    id: 4,
    slug: 'pigmentation-melasma',
    name: 'Pigmentation & Melasma',
    shortDescription: 'Advanced treatment for melasma, dark spots, and uneven skin tone.',
    icon: 'Sun',
    image: '/images/services/pigmentation.jpg',
    featured: true,
    overview:
      'Melasma and pigmentation are among the most challenging skin concerns — especially in Indian skin. We combine topical therapy, peels, and lasers to safely and effectively lighten pigmentation while minimizing recurrence.',
    conditions: [
      'Melasma (pregnancy mask)',
      'Freckles & lentigines',
      'Post-inflammatory hyperpigmentation',
      'Sun spots & age spots',
      'Periorbital hyperpigmentation (dark circles)',
      'Uneven skin tone',
    ],
    procedures: [
      'Customized topical depigmenting creams',
      'Chemical peels (Kojic, Arbutin, Tranexamic)',
      'Pico laser toning',
      'Q-switched Nd:YAG laser',
      'Oral tranexamic acid therapy',
      'Mesotherapy for pigmentation',
    ],
    faqs: [
      {
        question: 'Can melasma be cured permanently?',
        answer:
          'Melasma can be well-controlled but tends to recur with sun exposure and hormonal changes. Long-term maintenance with sunscreen and periodic sessions keeps it at bay.',
      },
      {
        question: 'Are the treatments safe for darker skin?',
        answer:
          'Yes — we specialize in treating Indian and darker skin types safely, using lower fluences and conservative protocols.',
      },
      {
        question: 'Is sunscreen really necessary?',
        answer:
          'Absolutely. Sunscreen is the single most important step in preventing pigmentation from returning. We recommend SPF 50 PA+++ daily.',
      },
    ],
    duration: '20–45 minutes',
    sessions: '6–10 sessions',
  },
  {
    id: 5,
    slug: 'psoriasis-eczema',
    name: 'Psoriasis & Eczema',
    shortDescription: 'Comprehensive management of chronic inflammatory skin conditions.',
    icon: 'Shield',
    image: '/images/services/psoriasis.jpg',
    featured: false,
    overview:
      'Psoriasis and eczema are chronic inflammatory conditions that require long-term, individualized care. We provide evidence-based treatment plans that control flare-ups, reduce symptoms, and improve quality of life.',
    conditions: [
      'Plaque psoriasis',
      'Guttate & pustular psoriasis',
      'Atopic dermatitis (eczema)',
      'Contact dermatitis',
      'Seborrheic dermatitis',
      'Chronic urticaria',
    ],
    procedures: [
      'Topical corticosteroids & calcineurin inhibitors',
      'Phototherapy (NB-UVB)',
      'Systemic therapy (Methotrexate, Cyclosporine)',
      'Biologics for severe psoriasis',
      'Antihistamines & moisturizer therapy',
      'Lifestyle & diet counseling',
    ],
    faqs: [
      {
        question: 'Is psoriasis contagious?',
        answer:
          'No — psoriasis is an autoimmune condition and is not contagious at all. It cannot spread from person to person.',
      },
      {
        question: 'Can eczema be cured?',
        answer:
          'Eczema cannot be permanently cured, but with proper treatment and trigger management, it can be very well controlled.',
      },
      {
        question: 'Do I need lifelong treatment?',
        answer:
          'Many patients achieve long remission periods with minimal maintenance therapy. We aim to reduce dependency on medication over time.',
      },
    ],
    duration: '20–30 minutes (consultation)',
    sessions: 'Ongoing management',
  },
  {
    id: 6,
    slug: 'vitiligo-treatment',
    name: 'Vitiligo Treatment',
    shortDescription: 'Repigmentation therapies for vitiligo and leucoderma.',
    icon: 'Circle',
    image: '/images/services/vitiligo.jpg',
    featured: false,
    overview:
      'Vitiligo causes loss of skin pigment, leading to white patches. We offer modern repigmentation therapies including phototherapy, surgical grafting, and topical treatments to help restore natural skin color.',
    conditions: [
      'Focal & segmental vitiligo',
      'Generalized vitiligo',
      'Acrofacial vitiligo',
      'Stable & unstable vitiligo',
      'Leucoderma',
      'Post-burn hypopigmentation',
    ],
    procedures: [
      'NB-UVB phototherapy',
      'Excimer laser (308 nm)',
      'Topical tacrolimus & corticosteroids',
      'Oral mini-pulse therapy',
      'Suction blister grafting',
      'Melanocyte transfer',
    ],
    faqs: [
      {
        question: 'Can vitiligo be cured?',
        answer:
          'Vitiligo can be stabilized and repigmented to a large extent, especially on the face and neck. Results vary based on location and duration of the patches.',
      },
      {
        question: 'How long does treatment take?',
        answer:
          'Repigmentation is a slow process. Expect 6–12 months of consistent treatment for visible results.',
      },
      {
        question: 'Is vitiligo hereditary?',
        answer:
          'There is a genetic component, but it is not directly passed down. Only about 20–30% of patients have a family history.',
      },
    ],
    duration: '15–30 minutes',
    sessions: '12+ sessions',
  },
  {
    id: 7,
    slug: 'skin-infections',
    name: 'Skin Infections',
    shortDescription: 'Treatment for fungal, bacterial, and viral skin infections.',
    icon: 'Bug',
    image: '/images/services/infections.jpg',
    featured: false,
    overview:
      'From stubborn fungal infections to viral warts and bacterial boils, we diagnose and treat all skin infections accurately with culture-guided therapy where needed.',
    conditions: [
      'Fungal infections (ringworm, tinea)',
      'Bacterial infections (folliculitis, boils)',
      'Viral infections (warts, molluscum)',
      'Herpes simplex & zoster',
      'Candidiasis',
      'Recurrent skin infections',
    ],
    procedures: [
      'Oral & topical antifungal therapy',
      'Antibiotics for bacterial infections',
      'Cryotherapy for warts',
      'Electrocautery for molluscum',
      'Antiviral therapy',
      'Culture & sensitivity-guided treatment',
    ],
    faqs: [
      {
        question: 'Why does my fungal infection keep coming back?',
        answer:
          'Recurrence is usually due to incomplete treatment, poor hygiene, or resistant strains. We often use combination therapy and treat all family members if needed.',
      },
      {
        question: 'Are warts dangerous?',
        answer:
          'Warts are harmless but contagious. They can spread and should be treated early to prevent further transmission.',
      },
      {
        question: 'How long does treatment take?',
        answer:
          'Most infections resolve within 2–6 weeks of appropriate treatment.',
      },
    ],
    duration: '15–30 minutes',
    sessions: '2–6 sessions',
  },
  {
    id: 8,
    slug: 'child-skin-care',
    name: 'Child Skin Care',
    shortDescription: 'Gentle, safe dermatology care for infants and children.',
    icon: 'Baby',
    image: '/images/services/child-skin.jpg',
    featured: false,
    overview:
      'Children\'s skin requires special care. We treat all pediatric skin concerns with the gentlest approach, keeping in mind safety, comfort, and the sensitive nature of young skin.',
    conditions: [
      'Diaper rash',
      'Atopic dermatitis in children',
      'Birthmarks & hemangiomas',
      'Fungal infections in kids',
      'Molluscum contagiosum',
      'Nappy rash & cradle cap',
    ],
    procedures: [
      'Pediatric-safe topical treatments',
      'Gentle cryotherapy',
      'Emollient & barrier therapy',
      'Allergen avoidance counseling',
      'Parent education on skincare',
    ],
    faqs: [
      {
        question: 'At what age can a child see a dermatologist?',
        answer:
          'At any age. We treat newborns and infants for conditions like diaper rash and birthmarks, using pediatric-safe protocols.',
      },
      {
        question: 'Are steroids safe for children?',
        answer:
          'When used correctly, in appropriate potency and duration, topical steroids are safe and effective. We always use the lowest effective potency.',
      },
      {
        question: 'Do you treat birthmarks?',
        answer:
          'Yes. Some birthmarks need treatment (like hemangiomas), and we offer medical and laser therapies based on the type.',
      },
    ],
    duration: '20–30 minutes',
    sessions: 'As needed',
  },
  {
    id: 9,
    slug: 'skin-surgeries',
    name: 'Skin Surgeries',
    shortDescription: 'Minor surgical procedures for skin growths, cysts, and lesions.',
    icon: 'Stethoscope',
    image: '/images/services/surgery.jpg',
    featured: false,
    overview:
      'We perform a range of minor dermatological surgeries for skin growths, benign and suspicious lesions, and cosmetic concerns — with excellent aesthetic outcomes and minimal downtime.',
    conditions: [
      'Moles & nevi',
      'Warts & skin tags',
      'Lipomas & cysts',
      'Corn & callus',
      'Keloids & hypertrophic scars',
      'Suspicious lesions (biopsy)',
    ],
    procedures: [
      'Excision biopsy',
      'Radiofrequency ablation',
      'Electrocautery',
      'Cryosurgery',
      'Scar revision surgery',
      'Nail surgery (ingrown toenail)',
    ],
    faqs: [
      {
        question: 'Will there be a scar after removal?',
        answer:
          'All surgeries leave some mark, but we use advanced techniques to minimize scarring. Most scars fade significantly over 6–12 months.',
      },
      {
        question: 'Is the procedure painful?',
        answer:
          'Local anesthesia makes the procedure painless. Post-procedure discomfort is minimal and managed with simple painkillers.',
      },
      {
        question: 'How long is recovery?',
        answer:
          'Most patients resume normal activities the same day. Complete healing takes 1–2 weeks depending on the procedure.',
      },
    ],
    duration: '30–60 minutes',
    sessions: 'Single session',
  },
]

// Get service by slug
export const getServiceBySlug = (slug) => services.find((s) => s.slug === slug)

// Featured services (for home page)
export const getFeaturedServices = () => services.filter((s) => s.featured)

// All service names (for appointment form dropdown)
export const serviceOptions = services.map((s) => ({
  label: s.name,
  value: s.name,
}))

export default services