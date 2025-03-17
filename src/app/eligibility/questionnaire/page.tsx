"use client";

import { useRouter } from "next/navigation";
import Questionnaire from "@/app/components/questionnaire";
import { EligibilityProfile } from "@/app/types/eligibility";

export default function QuestionnairePage() {
  const router = useRouter();

  async function handleQuestionnaireComplete(data: EligibilityProfile) {
    localStorage.setItem("userData", JSON.stringify(data));
    router.push("/eligibility/visaRecommendations");
  };

  return (
    <div className="flex flex-row">
      <div className="flex-1">
        <Questionnaire
          setUserData={handleQuestionnaireComplete}
        />
      </div>
    </div>
  );
}
