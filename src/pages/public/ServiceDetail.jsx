import { useParams, Navigate } from 'react-router-dom'
import SEO from '../../components/shared/SEO'
import ServiceDetailHero from '../../components/sections/services/ServiceDetailHero'
import ServiceOverview from '../../components/sections/services/ServiceOverview'
import ServiceProcedure from '../../components/sections/services/ServiceProcedure'
import ServiceFAQ from '../../components/sections/services/ServiceFAQ'
import RelatedServices from '../../components/sections/services/RelatedServices'
import AppointmentCTA from '../../components/sections/home/AppointmentCTA'
import Loader from '../../components/ui/Loader'
import { useService } from '../../hooks/useServices'
import { SITE_INFO } from '../../utils/constants'

export default function ServiceDetail() {
  const { slug } = useParams()
  const { service, loading, error } = useService(slug)

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center pt-32">
        <Loader size="lg" text="Loading service..." />
      </div>
    )
  }

  if (error || !service) {
    return <Navigate to="/services" replace />
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: service.name,
    description: service.short_description || service.shortDescription,
    procedureType: 'https://schema.org/NoninvasiveProcedure',
    provider: {
      '@type': 'MedicalClinic',
      name: SITE_INFO.name,
      url: SITE_INFO.url,
    },
  }

  return (
    <>
      <SEO
        title={service.name}
        description={service.short_description || service.shortDescription}
        keywords={`${service.name}, dermatology, ${service.slug}, patna skin clinic`}
        schema={schema}
      />

      <ServiceDetailHero service={service} />
      <ServiceOverview service={service} />
      <ServiceProcedure service={service} />
      <ServiceFAQ service={service} />
      <RelatedServices currentService={service} />
      <AppointmentCTA />
    </>
  )
}