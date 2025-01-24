import { getApiUrl } from "@/lib/utils";
import { EligibilityProfile } from "../pages/results";

export interface VisaRequirement {
  type: string;
  name: string;
  description: string;
}

export interface Documentation {
  name: string;
  description: string;
  sampleDocument: string;
  url?: string;
}

export interface NextStep {
  order: number;
  type: string;
  description: string;
}

export interface RecommendedVisa {
  country: string;
  visaTypes: Array<{
    name: string;
    code: string;
    description: string;
    requirements: VisaRequirement[];
    documentation: Documentation[];
  }>;
  likelihood?: number;
  reasoning: string;
  nextSteps: NextStep[];
}

export interface EligibilityResult {
  canada_analysis?: RecommendedVisa;
  other_countries: RecommendedVisa[];
  recommended_order: string[];
  strategy: string;
}

const API_BASE_URL = getApiUrl();

export async function assessEligibility(
  profile: EligibilityProfile
): Promise<EligibilityResult> {
  try {
    console.log({ profile });
    debugger;

    const response = await fetch(`${API_BASE_URL}/api/v1/eligibility/assess`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    });

    const data = await response.json();
    console.log({ data });

    return data as EligibilityResult;
  } catch (error) {
    console.error("Error assessing eligibility:", error);
    throw error;
  }
}
