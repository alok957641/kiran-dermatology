export const gallery = [
  {
    id: 1,
    title: 'Acne Scar Treatment',
    category: 'Acne',
    before: '/images/gallery/acne-before-1.jpg',
    after: '/images/gallery/acne-after-1.jpg',
    description: 'Fractional CO2 laser + Subcision — 5 sessions',
    sessions: '5 sessions over 4 months',
  },
  {
    id: 2,
    title: 'Melasma Improvement',
    category: 'Pigmentation',
    before: '/images/gallery/melasma-before-1.jpg',
    after: '/images/gallery/melasma-after-1.jpg',
    description: 'Chemical peels + Topical therapy — 6 sessions',
    sessions: '6 sessions over 3 months',
  },
  {
    id: 3,
    title: 'Hair Regrowth with PRP',
    category: 'Hair',
    before: '/images/gallery/hair-before-1.jpg',
    after: '/images/gallery/hair-after-1.jpg',
    description: 'PRP therapy + Medical management — 6 sessions',
    sessions: '6 sessions over 6 months',
  },
  {
    id: 4,
    title: 'Laser Hair Removal',
    category: 'Laser',
    before: '/images/gallery/laser-before-1.jpg',
    after: '/images/gallery/laser-after-1.jpg',
    description: 'Diode laser — upper lip & chin',
    sessions: '7 sessions',
  },
  {
    id: 5,
    title: 'Vitiligo Repigmentation',
    category: 'Vitiligo',
    before: '/images/gallery/vitiligo-before-1.jpg',
    after: '/images/gallery/vitiligo-after-1.jpg',
    description: 'NB-UVB + Topical therapy',
    sessions: '12 sessions over 8 months',
  },
  {
    id: 6,
    title: 'Acne Treatment',
    category: 'Acne',
    before: '/images/gallery/acne-before-2.jpg',
    after: '/images/gallery/acne-after-2.jpg',
    description: 'Medical management + Peels',
    sessions: '4 sessions over 3 months',
  },
]

export const galleryCategories = [
  { label: 'All', value: 'all' },
  { label: 'Acne', value: 'Acne' },
  { label: 'Hair', value: 'Hair' },
  { label: 'Pigmentation', value: 'Pigmentation' },
  { label: 'Laser', value: 'Laser' },
  { label: 'Vitiligo', value: 'Vitiligo' },
]

export const getGalleryByCategory = (category) => {
  if (!category || category === 'all') return gallery
  return gallery.filter((item) => item.category === category)
}

export default gallery