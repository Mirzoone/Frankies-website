import type { Metadata } from 'next'
// @ts-ignore
import './globals.css'

export const metadata: Metadata = {
  title: 'Frankies – Smash Burgers Sarajevo',
  description: 'Najbolji smash burgeri u Sarajevu. Gajev trg 4. Otvoreni svaki dan 10:00–23:00.',
  openGraph: {
    title: 'Frankies – Smash Burgers Sarajevo',
    description: 'Smash burgeri u srcu Sarajeva. Gajev trg 4.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bs">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik+Dirt&family=Barlow+Semi+Condensed:wght@600;700;800&family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,800;1,700&family=Caveat:wght@700&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context':'https://schema.org','@type':'Restaurant',
          'name':'Frankies','telephone':'+38761725544',
          'openingHours':'Mo-Su 10:00-23:00',
          'address':{ '@type':'PostalAddress','streetAddress':'Gajev trg 4','addressLocality':'Sarajevo','postalCode':'71000','addressCountry':'BA' },
          'aggregateRating':{ '@type':'AggregateRating','ratingValue':'5.0','reviewCount':'60' },
        })}} />
      </head>
      <body>{children}</body>
    </html>
  )
}
