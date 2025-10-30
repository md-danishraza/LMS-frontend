import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

// Define the steps
const steps = [
  { number: 1, label: "Details" },
  { number: 2, label: "Payment" },
  { number: 3, label: "Completion" },
];

function WizardStepper({ currentStep }: { currentStep: number }) {
  return (
    // Use an ordered list for semantic HTML and accessibility
    <ol className="flex w-full max-w-xl items-center justify-between">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.number;
        const isCurrent = currentStep === step.number;
        const isPending = currentStep < step.number;

        return (
          <React.Fragment key={step.number}>
            {/* Step Item */}
            <li className="flex flex-col items-center gap-1.5">
              {/* Circle */}
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 font-bold transition-all duration-300",
                  // Completed state
                  isCompleted
                    ? "border-primary bg-primary text-primary-foreground"
                    : "",
                  // Current state
                  isCurrent
                    ? "border-primary bg-primary/10 text-primary"
                    : "",
                  // Pending state
                  isPending ? "border-border bg-muted text-muted-foreground" : ""
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span>{step.number}</span>
                )}
              </span>
              {/* Label */}
              <span
                className={cn(
                  "text-center text-xs font-medium transition-all duration-300 sm:text-sm",
                  isCurrent ? "text-primary" : "",
                  isPending ? "text-muted-foreground" : "text-foreground"
                )}
              >
                {step.label}
              </span>
            </li>

            {/* Connector Line (don't render after the last step) */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-1.5 mb-6 w-full flex-1 rounded-full transition-all duration-300",
                  // If the step is complete, the line after it is also "filled"
                  isCompleted ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </ol>
  );
}

export default WizardStepper;
