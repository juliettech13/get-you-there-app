import { EligibilityProfile } from "../pages/results";

export const mockEligibilityProfile: EligibilityProfile = {
  id: "test-id",
  reasonForMove: ["Work opportunities"],
  nationality: ["United States"],
  age: "25-34",
  jobOfferCountries: ["Canada"],
  educationLevel: "Bachelor's degree",
  specializedSkills: ["Software Development"],
  familyConnections: false,
  spokenLanguages: ["English"],
  hasFinancialResources: true,
  preferredStayDuration: "Permanent residence",
};

export const mockSuccessResponse = {
  canada_analysis: {
    country: "Canada",
    visaTypes: [
      {
        name: "Express Entry",
        code: "EE",
        description: "Federal Skilled Worker Program",
        requirements: [
          {
            type: "met",
            name: "Education",
            description: "Bachelor's degree",
          },
        ],
        documentation: [
          {
            name: "Educational Credential Assessment",
            description: "Evaluation of foreign credentials",
            sampleDocument: "sample.pdf",
          },
        ],
      },
    ],
    likelihood: 85,
    reasoning: "Strong candidate for Express Entry",
    nextSteps: [
      {
        order: 1,
        type: "document",
        description: "Get ECA completed",
      },
    ],
  },
  other_countries: [],
  recommended_order: ["Canada"],
  strategy: "Focus on Express Entry",
};
