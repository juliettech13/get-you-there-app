export interface Question {
  id: string;
  question: string;
  type: 'multiple' | 'single' | 'dropdown';
  options: string[];
  placeholder: string;
}

export const QUESTIONS: Question[] = [
  {
    id: "reasonForMove",
    question: "Why do you want to move?",
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
    type: "multiple",
    placeholder: 'the countries where you have a passport',
    options: [
      "United States",
      "United Kingdom",
      "Canada",
      "Australia",
      "Germany",
      "France",
      "Spain",
      "Italy",
      "Japan",
      "China",
      "India",
      "Brazil",
      "Other"
    ]
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
    type: "multiple",
    placeholder: 'countries',
    options: [
      "No job offers yet",
      "United States",
      "Canada",
      "United Kingdom",
      "Germany",
      "Australia",
      "New Zealand",
      "Singapore",
      "Japan",
      "United Arab Emirates",
      "Other"
    ]
  },
  {
    id: "educationLevel",
    question: "What is your highest level of education?",
    type: "single",
    placeholder: 'latest degree earned',
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
    type: "multiple",
    placeholder: 'skills',
    options: [
      "No experience",
      "Engineering",
      "Finance",
      "Marketing",
      "Sales",
      "Other"
    ]
  },
  {
    id: "familyConnections",
    question: "Do you have any family members who are citizens or permanent residents of the country you want to move to?",
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
      "English",
      "Spanish",
      "French",
      "German",
      "Italian",
      "Japanese",
      "Chinese",
      "Other"
    ]
  },
  {
    id: "hasFinancialResources",
    question: "Do you have sufficient financial resources to support yourself or your family while there?",
    type: "single",
    placeholder: 'how much resources',
    options: [
      "Yes, substantial savings",
      "Yes, adequate savings",
      "Yes, with current income",
      "No, but I have a plan",
      "No"
    ]
  },
  {
    id: "preferredStayDuration",
    question: "Are you interested in living there permanently or do you prefer a temporary stay?",
    type: "single",
    placeholder: 'how long you plan to move',
    options: [
      "Permanent residence",
      "Temporary (1-2 years)",
      "Temporary (2-5 years)",
      "Not sure yet",
      "Depends on opportunities"
    ]
  },
  {
    id: "preferredCountry",
    question: "Any country that you're specifically excited about?",
    type: "multiple",
    placeholder: 'preferred countries',
    options: [
      "No preference",
      "United States",
      "Canada",
      "United Kingdom",
      "Australia",
      "New Zealand",
      "Germany",
      "France",
      "Spain",
      "Italy",
      "Japan",
      "Singapore",
      "United Arab Emirates",
      "Other"
    ]
  }
];
