import React from 'react'
import { BUSINESS_CONTACT } from './constants'

// Safe JSON-LD utility to prevent XSS
export function createJsonLdScript(data: object, id?: string) {
  try {
    const jsonString = JSON.stringify(data)

    if (/<script|javascript:|on\w+=/i.test(jsonString)) {
      console.error('Unsafe content detected in JSON-LD data')
      return null
    }

    return React.createElement('script', {
      key: id || 'json-ld',
      type: 'application/ld+json',
      dangerouslySetInnerHTML: { __html: jsonString },
    })
  } catch (error) {
    console.error('Error creating JSON-LD script:', error)
    return null
  }
}

// Centralized business structured data
export function getBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "JK Interior",
    url: BUSINESS_CONTACT.website,
    telephone: BUSINESS_CONTACT.phone,
    email: BUSINESS_CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_CONTACT.address.street,
      addressLocality: BUSINESS_CONTACT.address.city,
      addressRegion: BUSINESS_CONTACT.address.region,
      postalCode: BUSINESS_CONTACT.address.postalCode,
      addressCountry: BUSINESS_CONTACT.address.country
    },
    areaServed: "Forbesganj, Araria, Bihar, India",
    serviceType: [
      "Gypsum Ceiling",
      "POP Design",
      "PVC Wall Panels",
      "WPC Louvers",
      "Grid Ceiling",
      "Interior Design"
    ],
    description: "JK Interior provides gypsum ceiling, POP design, PVC wall paneling and interior services in Forbesganj, Bihar."
  }
}

// Service areas structured data
export function getServiceAreasJsonLd(areas: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "JK Interior",
    areaServed: areas.map((area) => ({
      "@type": "City",
      name: area,
      addressRegion: "Bihar"
    })),
    description: "Premium Interior & False Ceiling services in Forbesganj, Araria, and surrounding Bihar regions."
  }
}
