'use client'

import { ReactElement, useState } from "react";
import Panel from "@/app/components/panel";
import Questionnaire from "@/app/components/questionnaire";
import Results, { EligibilityProfile } from "@/app/pages/results";

export default function Home() {
  const [step, setStep] = useState<number>(1);
  const [rightPanel, setRightPanel] = useState<string>('questionnaire');
  const [userData, setUserData] = useState<EligibilityProfile | object>({});

  function displayRightPanel(): ReactElement | null {
    console.log({ rightPanel });
    switch (rightPanel) {
      case "questionnaire":
        return (
          <Questionnaire
            setStep={setStep}
            setRightPanel={setRightPanel}
            setUserData={setUserData}
          />
        );
      case "results":
        return <Results data={userData as EligibilityProfile} />;
      default:
        return null;
    }
  }

  return (
    <div className="flex flex-row">
      <div className="hidden md:block">
        <Panel activeStep={step} />
      </div>
      {displayRightPanel()}
    </div>
  );
}
