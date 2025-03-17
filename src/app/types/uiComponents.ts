import { EligibilityProfile } from "@/app/types/eligibility";

export interface PanelProps {
  activeStep: number;
}

export interface Question {
  id: string;
  question: string;
  description?: string;
  type: "multiple" | "single" | "dropdown";
  options: string[];
  placeholder: string;
}

export interface QuestionnaireProps {
  setUserData: (data: EligibilityProfile) => void;
}

export interface Step {
  id: number;
  title: string;
  description?: string;
}
