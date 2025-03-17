import { Question } from "@/app/types/uiComponents";
import { COUNTRIES } from "./countriesToISO";

export const QUESTIONS: Question[] = [
  {
    id: "reasonForMove",
    question: "Why do you want to move?",
    description: "Feel free to select as many as you wish. This will help us understand your motivations for moving and tailor our recommendations accordingly.",
    type: "multiple",
    placeholder: 'a reason',
    options: [
      "Work opportunities",
      "Education",
      "Family reunification",
      "Better quality of life",
      "Adventure/New experiences",
      "Career development",
      "Retirement",
      "Business opportunities",
      "Political reasons",
      "Climate preferences"
    ]
  },
  {
    id: "nationality",
    question: "What's your nationality?",
    description: "Select as many passports as you have.",
    type: "multiple",
    placeholder: "The countries you're a citizen from",
    options: COUNTRIES
  },
  {
    id: "age",
    question: "How old are you?",
    type: "single",
    placeholder: 'your age range',
    options: ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"]
  },
  {
    id: "jobOfferCountries",
    question: "Select the countries where you have a job offer from.",
    description: "This is usually relevant for permanent immigration, although not necessarily a requirement for every country.",
    type: "multiple",
    placeholder: "Countries",
    options: [
      "No job offers yet",
      ...COUNTRIES
    ]
  },
  {
    id: "educationLevel",
    question: "What is your highest level of education?",
    type: "single",
    placeholder: 'Latest degree earned',
    options: [
      "High school or equivalent",
      "Some college/university",
      "Bachelor's degree",
      "Master's degree",
      "Doctorate/PhD",
      "Professional degree",
      "Vocational training",
      "Other"
    ]
  },
  {
    id: "specializedSkills",
    question: "Do you have work experience in a skilled occupation?",
    description: "Select occupations where you have professional experience. Many countries offer specialized visas for skilled workers in these fields.",
    type: "multiple",
    placeholder: 'skills',
    options: [
      "No specialized experience",
      // STEM Fields
      "Software Development/Engineering",
      "Data Science/Analytics",
      "Artificial Intelligence/Machine Learning",
      "Cybersecurity",
      "Electrical/Electronic Engineering",
      "Mechanical Engineering",
      "Civil Engineering",
      "Chemical Engineering",
      "Biomedical Engineering",
      "Mathematics/Statistics",
      "Physics/Astronomy",
      "Chemistry/Biochemistry",
      "Biology/Life Sciences",
      // Healthcare
      "Medicine/Physician",
      "Nursing",
      "Dentistry",
      "Pharmacy",
      "Physical/Occupational Therapy",
      "Veterinary Medicine",
      "Medical Research",
      // Business & Finance
      "Finance/Banking",
      "Accounting",
      "Management Consulting",
      "Business Analysis",
      "Marketing/Digital Marketing",
      "Human Resources",
      "Supply Chain Management",
      // Legal & Education
      "Legal/Law",
      "University Professor/Researcher",
      "Teaching/Education",
      // Creative & Media
      "Architecture",
      "Graphic Design",
      "Film/Television Production",
      "Journalism/Media",
      // Trades & Technical
      "Construction Management",
      "Welding/Metalwork",
      "Electrical Work",
      "Plumbing",
      "Aircraft Maintenance",
      // Other Specialized
      "Agriculture/Farming",
      "Hospitality Management",
      "Social Work",
      "Urban Planning",
      "Environmental Science",
      "Other specialized occupation"
    ]
  },
  {
    id: "familyConnections",
    question: "Do you have any family members who are citizens or permanent residents of the country you want to move to?",
    description: "Some countries offer special visas for family members of citizens or permanent residents.",
    type: "single",
    placeholder: 'Yes or No',
    options: ["Yes", "No"]
  },
  {
    id: "spokenLanguages",
    question: "Which language do you speak?",
    type: "multiple",
    placeholder: 'languages',
    options: [
      // Major Global Languages
      "English",
      "Spanish",
      "French",
      "German",
      "Portuguese",
      "Russian",
      "Arabic",
      "Mandarin Chinese",
      "Cantonese",
      "Japanese",
      "Korean",
      "Hindi",
      "Urdu",
      "Bengali",
      // European Languages
      "Italian",
      "Dutch",
      "Swedish",
      "Norwegian",
      "Danish",
      "Finnish",
      "Polish",
      "Czech",
      "Slovak",
      "Hungarian",
      "Romanian",
      "Bulgarian",
      "Greek",
      "Turkish",
      // Other Asian Languages
      "Thai",
      "Vietnamese",
      "Tagalog/Filipino",
      "Indonesian",
      "Malay",
      "Persian/Farsi",
      // Other Languages
      "Hebrew",
      "Swahili",
      "Amharic",
      "Ukrainian",
      "Punjabi",
      "Tamil",
      "Telugu",
      "Gujarati",
      "Other"
    ]
  },
  {
    id: "hasFinancialResources",
    question: "Do you have sufficient financial resources to support yourself or your family while there?",
    description: "Many countries require proof of financial resources for immigration. This typically ranges from $5,000-$25,000 USD per person for the first year, though requirements vary significantly by country and visa type.",
    type: "single",
    placeholder: 'your financial situation',
    options: [
      "Yes, substantial savings (>$25,000 USD per person)",
      "Yes, adequate savings ($10,000-$25,000 USD per person)",
      "Yes, with current income (stable employment)",
      "No, but I have a sponsor or financial support",
      "No, limited financial resources"
    ]
  },
  {
    id: "preferredStayDuration",
    question: "Are you interested in living there permanently or do you prefer a temporary stay?",
    type: "single",
    placeholder: 'how long you plan to move',
    options: [
      "Permanent residence (5+ years)",
      "Temporary (2-5 years)",
      "Temporary (1-2 years)",
      "Depends on opportunities",
      "Not sure yet"
    ]
  },
  {
    id: "preferredCountry",
    question: "Any country that you're specifically excited about?",
    description: "This will help us understand your preferences and tailor our recommendations accordingly.",
    type: "multiple",
    placeholder: 'preferred countries',
    options: COUNTRIES
  }
];
