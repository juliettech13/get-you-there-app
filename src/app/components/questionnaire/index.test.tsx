import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Questionnaire from "./index";
import { assessEligibility } from "@/app/services/eligibility";
import { mockQuestionnaireProps } from "@/app/mocks/components";

jest.mock("@/app/services/eligibility", () => ({
  assessEligibility: jest.fn().mockResolvedValue({ eligible: true }),
}));

describe("Questionnaire", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the questionnaire form", () => {
    render(<Questionnaire {...mockQuestionnaireProps} />);

    expect(screen.getByText("Why do you want to move?")).toBeInTheDocument();
    expect(screen.getByText("What's your nationality?")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /continue/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    const user = userEvent.setup();
    render(<Questionnaire {...mockQuestionnaireProps} />);

    const submitButton = screen.getByRole("button", { name: /continue/i });
    await user.click(submitButton);

    await waitFor(() => {
      // Check for multiple select validation messages
      const multiSelectErrors = screen.getAllByText('Please select at least one option');
      expect(multiSelectErrors.length).toBeGreaterThan(0);

      // Check for single select validation messages
      const singleSelectErrors = screen.getAllByText('Please select an option');
      expect(singleSelectErrors.length).toBeGreaterThan(0);

      // Verify specific fields have error messages
      expect(screen.getByLabelText('How old are you?')).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByLabelText("What's your nationality?")).toHaveAttribute('aria-invalid', 'true');
    });
  });

  it("handles single selection fields correctly", async () => {
    const user = userEvent.setup();
    render(<Questionnaire {...mockQuestionnaireProps} />);

    const ageButton = screen.getByRole("button", { name: "How old are you?" });
    await user.click(ageButton);

    const ageOption = screen.getByText("18-24");
    await user.click(ageOption);

    expect(ageButton).toHaveTextContent("18-24");
  });

  it("handles multiple selection fields correctly", async () => {
    const user = userEvent.setup();
    render(<Questionnaire {...mockQuestionnaireProps} />);

    const nationalityButton = screen.getByRole("button", {
      name: "What's your nationality?",
    });
    await user.click(nationalityButton);

    const option1 = screen.getByText("United States");
    const option2 = screen.getByText("Canada");
    await user.click(option1);
    await user.click(option2);

    expect(nationalityButton).toHaveTextContent("United States, Canada");
  });

  it("submits form successfully with valid data", async () => {
    const user = userEvent.setup();
    render(<Questionnaire {...mockQuestionnaireProps} />);

    const fields = [
      { button: "What's your nationality?", option: "Italy" },
      { button: "How old are you?", option: "18-24" },
      {
        button: "What is your highest level of education?",
        option: "Bachelor's degree",
      },
      {
        button: "Do you have work experience in a skilled occupation?",
        option: "Engineering",
      },
      {
        button:
          "Do you have sufficient financial resources to support yourself or your family while there?",
        option: "Yes, substantial savings",
      },
      {
        button:
          "Are you interested in living there permanently or do you prefer a temporary stay?",
        option: "Permanent residence",
      },
      { button: "Why do you want to move?", option: "Work opportunities" },
      { button: "Which language do you speak?", option: "English" },
      {
        button: "Select the countries where you have a job offer from.",
        option: "Japan",
      },
    ];

    for (const field of fields) {
      const button = screen.getByRole("button", { name: field.button });
      await user.click(button);
      const option = screen.getByText(field.option);
      await user.click(option);
    }

    const submitButton = screen.getByRole("button", { name: /continue/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockQuestionnaireProps.setStep).toHaveBeenCalledWith(2);
      expect(mockQuestionnaireProps.setRightPanel).toHaveBeenCalledWith("results");
      expect(mockQuestionnaireProps.setUserData).toHaveBeenCalled();
      expect(assessEligibility).toHaveBeenCalled();
    });
  });
});
