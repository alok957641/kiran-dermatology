import SEO from '../../components/shared/SEO'
import GalleryHero from '../../components/sections/gallery/GalleryHero'
import GalleryGrid from '../../components/sections/gallery/GalleryGrid'
import AppointmentCTA from '../../components/sections/home/AppointmentCTA'

export default function Gallery() {
  return (
    <>
      <SEO
        title="Gallery"
        description="See real before & after transformations of our patients — acne, melasma, hair fall, vitiligo, and laser treatments. Safe, evidence-based dermatology in Patna."
        keywords="before after dermatology, acne treatment results, hair regrowth, laser hair removal results, patna skin clinic"
      />

      <GalleryHero />
      <GalleryGrid />
      <AppointmentCTA />
    </>
  )
}