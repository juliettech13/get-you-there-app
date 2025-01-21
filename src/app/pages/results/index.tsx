'use client';

import { useEffect, useState } from 'react';
import { assessEligibility, EligibilityResult } from '@/app/services/eligibility';

interface ResultProps {
  data: ResultInputs;
  setRightPanel: (id: string) => void;
}

export interface ResultInputs {
  moveReason: string[];
  nationality: string[];
  age: string;
  jobOffers: string[];
  education: string;
  workExperience: string;
  familyConnections: boolean;
  languages: string[];
  financialResources: string;
  stayDuration: string;
  preferredCountry: string[];
}

export default function Results(props: ResultProps) {
  const { data, setRightPanel } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<EligibilityResult | null>(null);

  useEffect(() => {
    async function fetchResults() {
      try {
        const eligibilityResults = await assessEligibility(data);
        setResults(eligibilityResults);
        setIsLoading(false);
      } catch (err) {
         let errorMessage =
           "Failed to analyze your eligibility. Please try again.";

         if (err instanceof Error) {
           errorMessage = err.message;
         }

         setError(errorMessage);
         setIsLoading(false);
      }
    }

    fetchResults();
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

  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
          <button
            onClick={() => setRightPanel('questionnaire')}
            className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {results && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Your Immigration Options</h2>
        </div>
      )}
    </div>
  );
}
