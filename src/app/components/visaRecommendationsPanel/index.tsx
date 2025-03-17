import { STRINGS } from '@/app/strings';
import VisaRecommendationCards from '@/app/components/visaRecommendationCards';
import { VisaRecommendationCardsProps } from '@/app/types/countryCards';

export default function VisaRecommendationsPanel({ eligibilityResult }: VisaRecommendationCardsProps) {
  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      <header className="space-y-4 mb-8">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl font-bold">
            {STRINGS.globalOpportunitiesTitle}
          </h1>
        </div>
        <p className="text-lg text-gray-600">
          {STRINGS.globalOpportunitiesDescription}
        </p>
      </header>

      <div className="bg-brand-orange bg-opacity-30 border border-brand-orange rounded-lg p-4 mb-6">
        <p className="text-sm text-navy">
          <span className="font-semibold">{STRINGS.proTipTitle}</span>
          {STRINGS.proTip}
        </p>
      </div>

      <VisaRecommendationCards eligibilityResult={eligibilityResult} />
    </div>
  );
}

