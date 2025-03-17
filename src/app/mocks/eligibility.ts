import { CountryVisaResult, EligibilityProfile, MapResult, EligibilityResult } from "@/app/types/eligibility";

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

export const mockSuccessfulEligibilityResults: CountryVisaResult[] = [
  {
    country: "United Kingdom",
    visaTypes: [
      {
        name: "Youth Mobility Scheme Visa",
        code: "Tier 5",
        description:
          "Allows young people from participating countries to live and work in the UK for up to 2 years.",
        documentation: [{
          name: "Youth Mobility Scheme Documentation",
          sampleDocument: "https://www.gov.uk/youth-mobility",
          description: "Official UK government Youth Mobility Scheme guidance"
        }],
        requirements: [
          {
            type: "met",
            name: "Age Requirement",
            description: "Applicants must be aged 18 to 30."
          },
          {
            type: "met",
            name: "Nationality",
            description: "Must be a national of a participating country.",
          },
          {
            type: "met",
            name: "Financial Requirement",
            description: "Must have at least £2,530 in savings.",
          },
          {
            type: "unmet",
            name: "Previous Participation",
            description: "Cannot have previously spent time in the UK.",
          },
        ],
      },
    ],
    likelihood: 75,
    reasoning:
      "The candidate meets most of the eligibility criteria for the Youth Mobility Scheme Visa, including age, nationality, and financial requirements. However, the lack of work experience and specific skills may limit job opportunities in the UK.",
    nextSteps: [
      {
        order: 1,
        type: "document",
        description:
          "Gather financial documents to prove you meet the financial requirement.",
      },
      {
        order: 2,
        type: "action",
        description: "Apply online for the Youth Mobility Scheme Visa.",
      },
      {
        order: 3,
        type: "action",
        description: "Prepare for and attend the visa interview, if required.",
      },
    ],
  },
  {
    country: "Australia",
    visaTypes: [
      {
        name: "Working Holiday visa",
        code: "subclass 417",
        description:
          "Allows young adults from eligible countries to work in Australia for up to a year.",
        documentation: [{
          name: "Working Holiday visa documentation",
          sampleDocument: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-holiday-417",
          description: "Working Holiday visa documentation",
        }],
        requirements: [
          {
            type: "met",
            name: "Age",
            description: "Must be aged between 18 and 30 years old.",
          },
          {
            type: "met",
            name: "Nationality",
            description: "Must be a citizen of an eligible country.",
          },
          {
            type: "unmet",
            name: "Education Level",
            description:
              "While no specific requirement, limited education may affect opportunities.",
          },
          {
            type: "undefined",
            name: "Language",
            description: "English proficiency expected for employment.",
          },
        ],
      },
    ],
    likelihood: 65,
    reasoning:
      "While the candidate meets the basic requirements for a Working Holiday visa (age and nationality), the lack of work experience and potentially limited English language proficiency could reduce the likelihood of securing employment in Australia.",
    nextSteps: [
      {
        order: 1,
        type: "document",
        description: "Ensure passport is valid for at least one year.",
      },
      {
        order: 2,
        type: "action",
        description: "Gather financial documents to prove sufficient funds.",
      },
      {
        order: 3,
        type: "action",
        description: "Consider improving English language skills.",
      },
    ],
  },
];

export const mockMultipleVisaEligibilityResults: CountryVisaResult[] = [
    {
      country: "United States",
      likelihood: 10,
      reasoning: "Given the candidate's lack of professional experience, incomplete higher education, and skills not specified in demand, the likelihood of successfully obtaining a work-related visa is low.",
      visaTypes: [
        {
          name: "TN Visa",
          code: "TN",
          description: "Non-immigrant visa allowing Canadian citizens to work in the U.S. in prearranged business activities.",
          requirements: [
            { type: "unmet", name: "Professional Occupation", description: "Must have a job offer in a NAFTA profession." },
            { type: "unmet", name: "Education", description: "Bachelor's degree or higher typically required." },
            { type: "met", name: "Nationality", description: "Must be a Canadian citizen." },
            { type: "unmet", name: "Experience", description: "Relevant work experience required." }
          ],
          documentation: []
        },
        {
          name: "H-1B Visa",
          code: "H-1B",
          description: "Temporary work visa for specialty occupations requiring specialized knowledge.",
          requirements: [
            { type: "unmet", name: "Education", description: "Must have at least a bachelor's degree." },
            { type: "unmet", name: "Job Offer", description: "Must have a job offer from a U.S. employer." },
            { type: "unmet", name: "Specialty Occupation", description: "Position must qualify as a specialty occupation." },
            { type: "undefined", name: "Visa Cap", description: "Subject to annual H-1B visa cap." }
          ],
          documentation: []
        }
      ],
      nextSteps: [
        { order: 1, type: "action", description: "Complete a degree or gain specialized experience." },
        { order: 2, type: "action", description: "Improve English language proficiency." },
        { order: 3, type: "action", description: "Seek employment with U.S. companies that sponsor visas." }
      ]
    },
    {
      country: "Canada",
      likelihood: 60,
      reasoning: "The candidate meets several key requirements for the International Experience Canada program, but language proficiency is a significant barrier.",
      visaTypes: [
        {
          name: "International Experience Canada",
          code: "IEC",
          description: "Program for young individuals to work in Canada temporarily.",
          requirements: [
            { type: "met", name: "Age", description: "Within 18-35 range." },
            { type: "met", name: "Financial Resources", description: "Has sufficient funds." },
            { type: "unmet", name: "Language Proficiency", description: "Needs English/French proficiency." },
            { type: "undefined", name: "Country Agreement", description: "Depends on bilateral agreements." }
          ],
          documentation: []
        },
        {
          name: "Express Entry",
          code: "EE",
          description: "System for skilled workers to immigrate to Canada permanently.",
          requirements: [
            { type: "unmet", name: "Education", description: "Requires post-secondary education." },
            { type: "unmet", name: "Work Experience", description: "Needs skilled work experience." },
            { type: "unmet", name: "Language Skills", description: "Must meet language requirements." },
            { type: "met", name: "Age", description: "Age is within favorable range." }
          ],
          documentation: []
        }
      ],
      nextSteps: [
        { order: 1, type: "action", description: "Verify IEC agreement eligibility." },
        { order: 2, type: "action", description: "Take language proficiency test." },
        { order: 3, type: "document", description: "Prepare financial documentation." }
      ]
    }
  ];

export const mockEligibilityMapResults: MapResult[] = [
  { country: 'United States', likelihood: 85 },
  { country: 'Canada', likelihood: 82 },
  { country: 'United Kingdom', likelihood: 78 },
  { country: 'Australia', likelihood: 75 },
  { country: 'Germany', likelihood: 72 },
  { country: 'Switzerland', likelihood: 70 },
  { country: 'Netherlands', likelihood: 68 },
  { country: 'Sweden', likelihood: 65 },
  { country: 'France', likelihood: 63 },
  { country: 'New Zealand', likelihood: 60 },
  { country: 'Singapore', likelihood: 58 },
  { country: 'Ireland', likelihood: 55 },
  { country: 'Norway', likelihood: 52 },
  { country: 'Denmark', likelihood: 50 },
  { country: 'Japan', likelihood: 48 },
  { country: 'Austria', likelihood: 45 },
  { country: 'Belgium', likelihood: 42 },
  { country: 'Finland', likelihood: 40 },
  { country: 'Spain', likelihood: 38 },
  { country: 'Italy', likelihood: 35 },
  { country: 'Portugal', likelihood: 32 },
  { country: 'Greece', likelihood: 30 },
  { country: 'South Korea', likelihood: 28 },
  { country: 'Czech Republic', likelihood: 25 },
  { country: 'Poland', likelihood: 22 },
  { country: 'Hungary', likelihood: 20 },
  { country: "Romania", likelihood: 18 },
  { country: "Bulgaria", likelihood: 15 },
  { country: "Croatia", likelihood: 12 },
  { country: "Estonia", likelihood: 10 },
];

export const mockEligibilityResult: EligibilityResult = {
  canada_analysis: mockMultipleVisaEligibilityResults[1],
  other_countries: mockSuccessfulEligibilityResults,
  recommended_order: [
    'Canada',
    'United Kingdom',
    'Australia',
    'United States'
  ],
  strategy: "Based on your profile, focusing on Canada through the International Experience Canada program offers the highest chance of success. The UK and Australia provide viable alternatives through youth mobility schemes. Consider improving language proficiency and gathering necessary documentation to strengthen your applications."
};
