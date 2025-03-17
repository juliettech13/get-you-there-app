'use client';

import { useState, useEffect } from 'react';
import { STRINGS } from '@/app/strings';

const messages = [
  STRINGS.loadingAnalyzingProfile,
  STRINGS.loadingCheckingCanada,
  STRINGS.loadingEvaluatingGlobal,
  STRINGS.loadingCalculatingProbabilities,
  STRINGS.loadingGeneratingRecommendations,
  STRINGS.loadingCreatingStrategy,
  STRINGS.loadingAssessingSkills,
  STRINGS.loadingMatchingPrograms,
  STRINGS.loadingReviewingEducation,
  STRINGS.loadingAnalyzingExperience,
  STRINGS.loadingCheckingEligibility,
  STRINGS.loadingResearchingOptions,
  STRINGS.loadingPreparingTimeline,
  STRINGS.loadingOptimizingPath
];

export default function LoadingMessages() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) =>
        prevIndex === messages.length - 1 ? prevIndex : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="h-full flex items-center justify-center p-8"
      data-testid="loading-messages"
    >
      <div className="space-y-4 text-center">
        <div className="animate-spin w-12 h-12 border-4 border-sky border-t-transparent rounded-full mx-auto" />
        <div className="animate-pulse">
          <p className="text-lg font-medium text-navy">
            {messages[currentMessageIndex]}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            {STRINGS.takeAFewMoments}
          </p>
        </div>
      </div>
    </div>
  );
}
