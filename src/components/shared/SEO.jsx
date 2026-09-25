import { Helmet } from 'react-helmet-async'
import { SITE_INFO } from '../../utils/constants'

export default function SEO({
  title,
  description,
  keywords,
  image = '/og-image.jpg',
  url,
  type = 'website',
  noindex = false,
  schema = null,
}) {
  const fullTitle = title
    ? `${title} | ${SITE_INFO.name}`
    : `${SITE_INFO.name} — Skin, Hair & Laser Clinic | Patna`

  const metaDescription = description || SITE_INFO.description
  const metaUrl = url || SITE_INFO.url

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:site_name" content={SITE_INFO.name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />

      {/* Canonical */}
      <link rel="canonical" href={metaUrl} />

      {/* Custom Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  )
}