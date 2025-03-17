export interface MapResult {
  country: string;
  likelihood: number;
}

export interface EligibilityMapProps {
  eligibilityResult: EligibilityResult | null;
  onCountrySelect?: (country: string) => void;
}

export interface EligibilityProfile {
  id: string;
  reasonForMove: string[];
  nationality: string[];
  age: string;
  jobOfferCountries: string[];
  educationLevel: string;
  specializedSkills: string[];
  familyConnections: boolean;
  spokenLanguages: string[];
  hasFinancialResources: boolean;
  preferredStayDuration: string;
}

interface VisaRequirement {
  type: string;
  name: string;
  description: string;
}

interface Documentation {
  name: string;
  description: string;
  sampleDocument: string;
  url?: string;
}

interface NextStep {
  order: number;
  type: string;
  description: string;
}

export interface VisaType {
  name: string;
  code: string;
  description: string;
  requirements: VisaRequirement[];
  documentation: Documentation[];
}

export interface CountryVisaResult {
  country: string;
  likelihood: number;
  reasoning: string;
  visaTypes?: VisaType[];
  nextSteps?: NextStep[];
}

export interface EligibilityResult {
  canada_analysis?: CountryVisaResult;
  other_countries: CountryVisaResult[];
  recommended_order: string[];
  strategy: string;
}
