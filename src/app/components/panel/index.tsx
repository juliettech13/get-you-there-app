import { steps } from "@/app/data/steps";
import { STRINGS } from "@/app/strings";

interface PanelProps {
  activeStep: number;
}

export default function Panel(props: PanelProps) {
  const { activeStep } = props;

  return (
    <div className="w-full h-screen bg-brand-beige p-4 sticky top-0">
      <h1 className="text-2xl font-bold mb-2">{STRINGS.title}</h1>
      <p className="text-sm text-gray-600 mb-6">{STRINGS.description}</p>

      <div className="relative">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start mb-8">
            <div className="relative">
              <div
                className={`
                  w-4 h-4 rounded-full flex items-center justify-center transition-colors duration-200
                  ${activeStep >= index ? "bg-brand-orange" : "bg-gray-300"}
                `}
              />
              {index < steps.length - 1 && (
                <div
                  className={`
                    absolute left-2 top-4 w-[2px] h-[2rem] transition-colors duration-200
                    ${activeStep > index ? "bg-brand-orange" : "bg-gray-300"}
                  `}
                />
              )}
            </div>

            <div className="ml-3">
              <div
                className={`
                  flex items-center transition-colors duration-200
                  ${
                    activeStep >= index ? "text-content-light" : "text-gray-400"
                  }
                `}
              >
                <span className="text-xs font-medium">
                  {STRINGS.step} {step.id}:
                </span>
                <span className="ml-1 text-xs">{step.title}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
