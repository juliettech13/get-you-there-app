"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"

import { QUESTIONS } from "@/app/data/questions";
import { EligibilityProfile } from "@/app/types/eligibility";
import { QuestionnaireProps } from "@/app/types/uiComponents";
import { STRINGS } from "@/app/strings";

const formSchema = z.object({
  id: z.string(),
  reasonForMove: z
    .array(z.string())
    .min(1, "Please select at least one option"),
  nationality: z.array(z.string()).min(1, "Please select at least one option"),
  age: z.string({ required_error: "Please select an option" }),
  jobOfferCountries: z
    .array(z.string())
    .min(1, "Please select at least one option"),
  educationLevel: z.string({ required_error: "Please select an option" }),
  specializedSkills: z
    .array(z.string())
    .min(1, "Please select at least one option"),
  familyConnections: z.string(),
  spokenLanguages: z
    .array(z.string())
    .min(1, "Please select at least one option"),
  hasFinancialResources: z.string(),
  preferredStayDuration: z.string({ required_error: "Please select an option" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Questionnaire({ setUserData }: QuestionnaireProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      reasonForMove: [],
      nationality: [],
      jobOfferCountries: [],
      specializedSkills: [],
      spokenLanguages: [],
      familyConnections: "No",
      hasFinancialResources: "No",
      preferredStayDuration: "Not sure yet",
    },
  });

  const totalQuestions = QUESTIONS.length;
  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  async function handleSubmit(data: FormValues) {
    const transformedData: EligibilityProfile = {
      ...data,
      id: "id" + Math.random().toString(16).slice(2),
      familyConnections: data.familyConnections === "Yes",
      hasFinancialResources: data.hasFinancialResources.startsWith("Yes")
    };

    setUserData(transformedData);
  }

  async function handleNext() {
    const fieldName = currentQuestion.id as keyof FormValues;
    const result = await form.trigger(fieldName);

    if (result) {
      setCurrentQuestionIndex(prev => Math.min(prev + 1, totalQuestions - 1));
    }
  };

  function handlePrevious() {
    setCurrentQuestionIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">

          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div
              className="bg-brand-orange h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            ></div>
          </div>

          <div className="text-sm text-gray-500 mb-4">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </div>

          <FormField
            key={currentQuestion.id}
            control={form.control}
            name={currentQuestion.id as keyof FormValues}
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>
                  <p className="text-interactive">{currentQuestion.question}</p>
                  {currentQuestion.description && (
                    <p className="text-sm text-gray-500 mt-1">{currentQuestion.description}</p>
                  )}
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        <p>
                          {Array.isArray(field.value)
                            ? field.value.join(", ")
                            : field.value ||
                              `Select ${currentQuestion.placeholder.toLowerCase()}`}
                        </p>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="min-w-[200px] w-auto p-0 max-h-[300px] overflow-y-auto"
                    align="start"
                    side="bottom"
                  >
                    <Command className="max-h-full">
                      <CommandInput
                        placeholder={`Search ${currentQuestion.placeholder.toLowerCase()}...`}
                      />
                      <CommandEmpty>No option found.</CommandEmpty>
                      <CommandGroup className="overflow-y-auto">
                        {currentQuestion.options.map((option, index) => (
                          <CommandItem
                            key={index}
                            value={option}
                            onSelect={() => {
                              if (currentQuestion.type === "multiple") {
                                const currentValue = Array.isArray(field.value)
                                  ? field.value
                                  : [];
                                const newValue = currentValue.includes(option)
                                  ? currentValue.filter(
                                      (item) => item !== option
                                    )
                                  : [...currentValue, option];
                                field.onChange(newValue);
                              } else {
                                field.onChange(option);
                              }
                            }}
                          >
                            <div className="flex items-center">
                              {currentQuestion.type === "multiple" && (
                                <div className="mr-2">
                                  {Array.isArray(field.value) && field.value.includes(option) && (
                                    <Check className="h-4 w-4" />
                                  )}
                                </div>
                              )}
                              <p>{option}</p>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={isFirstQuestion}
              className="flex items-center"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              {STRINGS.previous || 'Previous'}
            </Button>

            {isLastQuestion ? (
              <Button
                type="submit"
                className="bg-brand-orange hover:bg-brand-orange/90 flex items-center"
              >
                {STRINGS.submit || 'Submit'}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleNext}
                className="bg-brand-orange hover:bg-brand-orange/90 flex items-center"
              >
                {STRINGS.next || 'Next'}
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
