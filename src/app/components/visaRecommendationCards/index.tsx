import VisaRecommendationCard from "@/app/components/visaRecommendationCard";
import { STRINGS } from '@/app/strings';
import { VisaRecommendationCardsProps } from "@/app/types/countryCards";

export default function VisaRecommendationCards({ eligibilityResult }: VisaRecommendationCardsProps) {
  const allRecommendations = [
    eligibilityResult?.canada_analysis,
    ...eligibilityResult?.other_countries
  ].filter((rec): rec is NonNullable<typeof rec> => rec !== undefined);

  const sortedCards = allRecommendations.sort((a, b) =>
    (b.likelihood || 0) - (a.likelihood || 0)
  );

  return (
    <div>
      <div className="max-w-7xl mx-auto space-y-6">
        {sortedCards.map((rec, index) => (
          <VisaRecommendationCard
            key={index}
            country={rec.country}
            visaTypes={rec.visaTypes || []}
            likelihood={rec.likelihood || 0}
            reasoning={rec.reasoning}
            nextSteps={rec.nextSteps || []}
          />
        ))}
      </div>

      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>{STRINGS.footer}</p>
      </footer>
    </div>
  );
}
