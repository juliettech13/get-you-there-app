"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { EligibilityProfile } from "@/app/pages/results";
import { assessEligibility } from "@/app/services/eligibility";

interface QuestionnaireProps {
  setStep: (step: number) => void;
  setRightPanel: (panel: string) => void;
  setUserData: (data: EligibilityProfile) => void;
}

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

export default function Questionnaire(props: QuestionnaireProps) {
  const { setStep, setRightPanel, setUserData } = props;

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

  async function handleSubmit(data: FormValues) {
    const transformedData: EligibilityProfile = {
      ...data,
      id: "id" + Math.random().toString(16).slice(2),
      familyConnections: data.familyConnections === "Yes",
      hasFinancialResources: data.hasFinancialResources.startsWith("Yes")
    };

    setUserData(transformedData);

    await assessEligibility(transformedData);
    setRightPanel('results');
    setStep(2);
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {QUESTIONS.map((question) => (
            <FormField
              key={question.id}
              control={form.control}
              name={question.id as keyof FormValues}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{question.question}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                        >
                          {Array.isArray(field.value)
                            ? field.value.join(", ")
                            : field.value ||
                              `Select ${question.placeholder.toLowerCase()}`}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder={`Search ${question.placeholder.toLowerCase()}...`}
                        />
                        <CommandEmpty>No option found.</CommandEmpty>
                        <CommandGroup>
                          {question.options.map((option, index) => (
                            <CommandItem
                              key={index}
                              value={option}
                              onSelect={() => {
                                if (question.type === "multiple") {
                                  const currentValue = Array.isArray(
                                    field.value
                                  )
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
                              {option}
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
          ))}

          {Object.keys(form.formState.errors).length > 0 && (
            <div className="text-red-500 text-sm">
              {Object.entries(form.formState.errors).map(([field, error]) => (
                <p key={field}>
                  {field}: {error?.message as string}
                </p>
              ))}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-brand-orange hover:bg-brand-orange/90"
          >
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}
