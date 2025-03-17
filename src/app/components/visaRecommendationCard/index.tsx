'use client';

import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { STRINGS } from "@/app/strings";
import { CountryVisaResult } from "@/app/types/eligibility";

function getLikelihoodColor(likelihood: number): string {
  if (likelihood >= 70) return "bg-forest bg-opacity-20 text-cream";
  if (likelihood >= 40) return "bg-gold bg-opacity-20 text-forest";
  return "bg-burgundy bg-opacity-20 text-cream";
}

function StatusIcon({ type }: { type: string }) {
  switch (type) {
    case "met":
      return <CheckCircle2 className="h-5 w-5 text-forest" />;
    case "unmet":
      return <XCircle className="h-5 w-5 text-burgundy" />;
    default:
      return <AlertCircle className="h-5 w-5 text-gold" />;
  }
}

export default function VisaRecommendationCard({
  country,
  likelihood,
  reasoning,
  visaTypes = [],
  nextSteps,
}: CountryVisaResult) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedVisaIndex, setSelectedVisaIndex] = useState(0);

  const selectedVisa = visaTypes[selectedVisaIndex];

  function handleVisaSelect (index: number) {
    setSelectedVisaIndex(index);
    setIsExpanded(true);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold">{country}</h3>
          <div className="flex items-center space-x-2 mt-1">
            <span
              className={`text-sm font-medium px-2 py-1 rounded-full ${getLikelihoodColor(
                likelihood
              )}`}
            >
              {likelihood}% Match
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-cream rounded-full"
          aria-label={isExpanded ? "Show less" : "Show more"}
        >
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>
      </CardHeader>

      <CardContent className="px-4 pb-4">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {visaTypes?.map((visa, index) => (
              <button
                key={index}
                onClick={() => handleVisaSelect(index)}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                  index === selectedVisaIndex
                    ? "bg-sky bg-opacity-20 text-navy font-medium"
                    : "bg-cream text-gray-600 hover:bg-sand"
                }`}
              >
                {visa.name}
              </button>
            ))}
          </div>

          <div>
            <p className="text-sm text-gray-600">{reasoning}</p>
          </div>

          {isExpanded && (
            <div className="space-y-4 mt-4 pt-4 border-t">
              <p className="text-sm text-gray-600">
                {selectedVisa.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedVisa.requirements.map((req, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <StatusIcon type={req.type} />
                    <span className="text-sm">{req.name}</span>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="font-semibold mb-2">{STRINGS.nextSteps}</h4>
                <ul className="space-y-2">
                  {nextSteps?.map((step, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-sm font-medium text-sky min-w-[20px]">
                        {step.order}.
                      </span>
                      <span className="text-sm">{step.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
