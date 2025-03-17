'use client';

import { useState, useEffect } from "react";
import EligibilityMap from "@/app/components/eligiblityMap";
import LoadingMessages from "@/app/components/loadingMessages";
import VisaRecommendationsPanel from "@/app/components/visaRecommendationsPanel";
import { assessEligibility } from "@/app/services/eligibility";
import { EligibilityResult } from "@/app/types/eligibility";

export default function VisaRecommendationsPage() {
  const [eligibilityResult, setEligibilityResult] = useState<EligibilityResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEligibility () {
      try {
        const userData = JSON.parse(localStorage.getItem("userData") || "{}");
        const results: EligibilityResult | null = await assessEligibility(userData);

        setEligibilityResult(results);
      } catch (err) {
        setError('Failed to load recommendations. Please try again.');
        console.error('Error fetching eligibility:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEligibility();
  }, []);

  function handleCountrySelect(country: string) {
    console.log('Selected country:', country);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full">
      <div className="flex flex-col lg:flex-row w-full min-h-screen">
        <div className="w-full lg:w-[65%] h-[50vh] lg:h-[calc(100vh-64px)] lg:fixed lg:left-0 lg:top-16">
          <EligibilityMap
            eligibilityResult={eligibilityResult}
            onCountrySelect={handleCountrySelect}
          />
        </div>
        <div className="w-full lg:w-[35%] h-[50vh] lg:h-screen lg:fixed lg:right-0 lg:top-0 overflow-hidden overflow-y-auto">
          {isLoading ? (
            <LoadingMessages />
          ) : error ? (
            <div className="p-4 text-burgundy">{error}</div>
          ) : (
            eligibilityResult && <VisaRecommendationsPanel eligibilityResult={eligibilityResult} />
          )}
        </div>
      </div>
    </div>
  );
}
