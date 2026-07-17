/**
 * Medical Schema Markup Generators
 *
 * Generates structured data for medical professionals, clinics, and procedures
 * Optimized for AI crawlers and search engines
 */

import type {
  Thing,
  Physician,
  MedicalBusiness,
  LocalBusiness,
  FAQPage,
  MedicalProcedure,
  PostalAddress
} from 'schema-dts';

/**
 * Generate Physician schema markup
 */
export function generatePhysicianSchema(data: {
  name: string;
  credentials: string[]; // e.g., ['FRCS', 'FRACS']
  specialties: string[]; // e.g., ['Knee Surgery', 'Sports Medicine']
  bio?: string;
  url: string;
  image?: string;
  telephone?: string;
  email?: string;
  worksFor?: {
    name: string;
    url: string;
  };
}): Physician {
  const schema: Physician = {
    '@type': 'Physician',
    name: data.name,
    url: data.url,
    medicalSpecialty: data.specialties,
  };

  // Add honorific suffix for credentials
  if (data.credentials && data.credentials.length > 0) {
    schema.honorificSuffix = data.credentials.join(', ');
  }

  if (data.bio) {
    schema.description = data.bio;
  }

  if (data.image) {
    schema.image = data.image;
  }

  if (data.telephone) {
    schema.telephone = data.telephone;
  }

  if (data.email) {
    schema.email = data.email;
  }

  if (data.worksFor) {
    schema.worksFor = {
      '@type': 'Organization',
      name: data.worksFor.name,
      url: data.worksFor.url,
    };
  }

  return schema;
}

/**
 * Generate MedicalBusiness schema markup with multiple locations
 */
export function generateMedicalBusinessSchema(data: {
  name: string;
  url: string;
  description?: string;
  telephone?: string;
  locations: Array<{
    name: string;
    address: {
      building?: string;
      suite?: string;
      street: string;
      suburb: string;
      state: string;
      postcode: string;
    };
    telephone?: string;
    mapUrl?: string;
  }>;
}): MedicalBusiness & LocalBusiness {
  // Create the main business schema
  const schema: MedicalBusiness & LocalBusiness = {
    '@type': ['MedicalBusiness', 'LocalBusiness'],
    name: data.name,
    url: data.url,
  };

  if (data.description) {
    schema.description = data.description;
  }

  if (data.telephone) {
    schema.telephone = data.telephone;
  }

  // Add multiple locations
  if (data.locations && data.locations.length > 0) {
    schema.location = data.locations.map((loc) => {
      // Build full address string
      const addressParts: string[] = [];
      if (loc.address.building) addressParts.push(loc.address.building);
      if (loc.address.suite) addressParts.push(loc.address.suite);
      addressParts.push(loc.address.street);
      addressParts.push(loc.address.suburb);
      addressParts.push(`${loc.address.state} ${loc.address.postcode}`);

      const postalAddress: PostalAddress = {
        '@type': 'PostalAddress',
        streetAddress: [
          loc.address.building,
          loc.address.suite,
          loc.address.street,
        ].filter(Boolean).join(', '),
        addressLocality: loc.address.suburb,
        addressRegion: loc.address.state,
        postalCode: loc.address.postcode,
        addressCountry: 'AU',
      };

      return {
        '@type': 'Place',
        name: loc.name,
        address: postalAddress,
        ...(loc.telephone && { telephone: loc.telephone }),
        ...(loc.mapUrl && { hasMap: loc.mapUrl }),
      };
    });
  }

  return schema;
}

/**
 * Generate FAQPage schema markup
 */
export function generateFAQPageSchema(
  faqs: Array<{
    question: string;
    answer: string;
  }>
): FAQPage {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate MedicalProcedure schema markup
 */
export function generateMedicalProcedureSchema(data: {
  name: string;
  description: string;
  benefits?: string[];
  procedureType?: string;
  preparation?: string;
  followup?: string;
  bodyLocation?: string;
  url?: string;
}): MedicalProcedure {
  const schema: MedicalProcedure = {
    '@type': 'MedicalProcedure',
    name: data.name,
    description: data.description,
  };

  if (data.procedureType) {
    // @ts-ignore - procedureType is valid but may not be in schema-dts types
    schema.procedureType = data.procedureType;
  }

  if (data.preparation) {
    schema.preparation = data.preparation;
  }

  if (data.followup) {
    schema.followup = data.followup;
  }

  if (data.bodyLocation) {
    // @ts-ignore - bodyLocation is valid but may not be in schema-dts types
    schema.bodyLocation = data.bodyLocation;
  }

  if (data.url) {
    schema.url = data.url;
  }

  return schema;
}

/**
 * Generate MedicalCondition schema markup
 */
export function generateMedicalConditionSchema(data: {
  name: string;
  description: string;
  possibleTreatment?: Array<{
    name: string;
    description: string;
  }>;
  riskFactor?: string[];
  symptom?: string[];
  url?: string;
}): Thing {
  const schema: Record<string, unknown> = {
    '@type': 'MedicalCondition',
    name: data.name,
    description: data.description,
  };

  if (data.possibleTreatment && data.possibleTreatment.length > 0) {
    schema.possibleTreatment = data.possibleTreatment.map((treatment) => ({
      '@type': 'MedicalTherapy',
      name: treatment.name,
      description: treatment.description,
    }));
  }

  if (data.riskFactor && data.riskFactor.length > 0) {
    schema.riskFactor = data.riskFactor;
  }

  if (data.symptom && data.symptom.length > 0) {
    schema.symptom = data.symptom;
  }

  if (data.url) {
    schema.url = data.url;
  }

  return schema as Thing;
}
