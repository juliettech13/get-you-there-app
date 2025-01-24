'use client';

import { useEffect, useState } from 'react';

interface ResultProps {
  data: EligibilityProfile;
}

export interface EligibilityProfile {
  id: string;
  reasonForMove: string[];
  nationality: string[];
  age: string;
  jobOfferCountries: string[];
  educationLevel: string;
  specializedSkills: string[];
  familyConnections: boolean;
  spokenLanguages: string[];
  hasFinancialResources: boolean;
  preferredStayDuration: string;
}

export default function Results(props: ResultProps) {
  const { data } = props;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [data]);

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
        </div>
        <p className="mt-4 text-gray-600">Analyzing your eligibility...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {data && (
        <>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Your Immigration Options</h2>
          </div>
          {JSON.stringify(data)}
        </>
      )}
    </div>
  );
}
