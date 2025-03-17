import { EligibilityResult } from "./eligibility";

export interface CountryCardProps {
  country: string;
  likelihood?: number;
  position: { x: number; y: number };
}

export interface VisaRecommendationCardsProps {
  eligibilityResult: EligibilityResult;
}
