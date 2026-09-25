export const testimonials = [
  {
    id: 1,
    name: 'Dr. Shipra',
    city: 'Patna',
    rating: 5,
    message:
      'I have been suffering from melasma for years. Dr. Asmita treated me with a combination of peels and laser sessions. The results are visible and I feel so much more confident now. Highly recommended!',
    service: 'Melasma Treatment',
    featured: true,
  },
  {
    id: 2,
    name: 'Rajesh Yadav',
    city: 'Patna',
    rating: 5,
    message:
      'Very knowledgeable and patient doctor. I had severe acne and scars. She explained everything clearly and the treatment worked wonders. My skin looks clear after 4 months.',
    service: 'Acne & Scar Treatment',
    featured: true,
  },
  {
    id: 3,
    name: 'Suraj Kumar',
    city: 'Hajipur',
    rating: 5,
    message:
      'I was losing hair rapidly and was very worried. Dr. Singh diagnosed the cause correctly and started PRP therapy. After 5 sessions, my hair fall has stopped and new growth is visible.',
    service: 'Hair Fall Treatment',
    featured: true,
  },
  {
    id: 4,
    name: 'Priya Sharma',
    city: 'Patna',
    rating: 5,
    message:
      'Excellent clinic with modern equipment. The staff is polite and the doctor is very thorough. My daughter had eczema — now completely under control.',
    service: 'Child Skin Care',
    featured: true,
  },
  {
    id: 5,
    name: 'Amit Verma',
    city: 'Danapur',
    rating: 5,
    message:
      'Got laser hair removal done for my beard area. Very professional service and comfortable experience. Results are fantastic. Worth every rupee.',
    service: 'Laser Hair Removal',
    featured: false,
  },
  {
    id: 6,
    name: 'Anjali Singh',
    city: 'Patna',
    rating: 5,
    message:
      'Dr. Asmita is very humble and explains the treatment in detail. I had stubborn fungal infection on my feet for months — cleared up completely in 3 weeks.',
    service: 'Skin Infection',
    featured: false,
  },
  {
    id: 7,
    name: 'Vikash Ranjan',
    city: 'Patna',
    rating: 5,
    message:
      'I had a mole that needed to be removed. The procedure was quick, painless, and the scar is barely visible now. Very satisfied with the experience.',
    service: 'Skin Surgery',
    featured: false,
  },
  {
    id: 8,
    name: 'Neha Gupta',
    city: 'Sonepur',
    rating: 5,
    message:
      'Best dermatologist in Patna! I have been to many doctors before, but Dr. Singh is the only one who truly listened and gave results. My pigmentation is 80% gone.',
    service: 'Pigmentation Treatment',
    featured: false,
  },
]

export const getFeaturedTestimonials = () => testimonials.filter((t) => t.featured)

export default testimonials