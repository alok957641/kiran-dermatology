import SEO from '../../components/shared/SEO'
import AboutHero from '../../components/sections/about/AboutHero'
import DoctorBio from '../../components/sections/about/DoctorBio'
import Qualifications from '../../components/sections/about/Qualifications'
import Achievements from '../../components/sections/about/Achievements'
import Philosophy from '../../components/sections/about/Philosophy'
import AppointmentCTA from '../../components/sections/home/AppointmentCTA'
import { SITE_INFO } from '../../utils/constants'

export default function About() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: SITE_INFO.doctorName,
    medicalSpecialty: 'Dermatology',
    worksFor: {
      '@type': 'MedicalClinic',
      name: SITE_INFO.name,
      url: SITE_INFO.url,
    },
  }

  return (
    <>
      <SEO
        title="About"
        description="Meet Dr. (Major) Asmita Singh — MBBS (AFMC Pune), MD Dermatology Gold Medalist (KGMU), Ex-Senior Resident AIIMS Patna. 14+ years of dermatology experience."
        keywords="Dr Asmita Singh, dermatologist Patna, MBBS AFMC, MD KGMU, AIIMS Patna dermatology"
        schema={schema}
      />

      <AboutHero />
      <DoctorBio />
      <Qualifications />
      <Achievements />
      <Philosophy />
      <AppointmentCTA />
    </>
  )
}