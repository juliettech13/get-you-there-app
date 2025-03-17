import { getApiUrl } from "@/lib/utils";
import { EligibilityProfile, EligibilityResult } from "@/app/types/eligibility";

const API_BASE_URL = getApiUrl();

export async function assessEligibility(
  profile: EligibilityProfile
): Promise<EligibilityResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/eligibility/assess`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    });

    const data = await response.json();

    return data as EligibilityResult;
  } catch (error) {
    console.error("Error assessing eligibility:", error);
    throw error;
  }
}
