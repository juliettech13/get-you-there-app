import { getApiUrl } from "@/lib/utils";
import { ResultInputs } from "../pages/results";

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
  profile: ResultInputs
): Promise<EligibilityResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/eligibility/assess`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reasonForMove: profile.moveReason[0],
        nationality: profile.nationality[0],
        age: parseInt(profile.age),
        jobOfferCountries: profile.jobOffers,
        educationLevel: profile.education,
        specializedSkills: profile.workExperience,
        familyConnections: profile.familyConnections,
        spokenLanguages: profile.languages,
        hasFinancialResources: profile.financialResources === "yes",
        preferredStayDuration: profile.stayDuration,
      }),
    });

    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    //   response.
    // }

    const data = await response.json();
    console.log({ data });

    return data as EligibilityResult;
  } catch (error) {
    console.error("Error assessing eligibility:", error);
    throw error;
  }
}
