"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { STRINGS } from "@/app/strings";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-row">
      <div className="flex-1 p-6 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-6">{STRINGS.bigMoveIsNear}</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl text-center">
          {STRINGS.description}
        </p>
        <Button
          onClick={() => router.push("/eligibility/questionnaire")}
          className="bg-brand-orange hover:bg-brand-orange/90"
        >
          {STRINGS.getStarted}
        </Button>
      </div>
    </div>
  );
}
