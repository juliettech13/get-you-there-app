import "@testing-library/jest-dom";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Questionnaire from "./index";
import { mockQuestionnaireProps } from "@/app/mocks/components";
import { QUESTIONS } from "@/app/data/questions";

jest.mock("@/app/services/eligibility", () => ({
  assessEligibility: jest.fn().mockResolvedValue({ eligible: true })
}));

describe("Questionnaire", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the first question of the questionnaire form", () => {
    render(<Questionnaire {...mockQuestionnaireProps} />);

    expect(screen.getByText("Why do you want to move?")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /previous/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();

    expect(screen.getByText("Question 1 of 11")).toBeInTheDocument();
  });

  it("shows validation errors when trying to proceed without selection", async () => {
    const user = userEvent.setup();
    render(<Questionnaire {...mockQuestionnaireProps} />);

    const nextButton = screen.getByRole("button", { name: /next/i });
    await user.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText("Please select at least one option")).toBeInTheDocument();
    });
  });

  it("allows navigation between questions after valid selection", async () => {
    const user = userEvent.setup();
    render(<Questionnaire {...mockQuestionnaireProps} />);

    const firstQuestionButton = screen.getByRole("combobox");
    await user.click(firstQuestionButton);

    const firstOption = screen.getByText("Work opportunities");
    await user.click(firstOption);

    const nextButton = screen.getByRole("button", { name: /next/i });
    await user.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText("Question 2 of 11")).toBeInTheDocument();
      expect(screen.getByText(QUESTIONS[1].question)).toBeInTheDocument();
    });

    const prevButton = screen.getByRole("button", { name: /previous/i });
    expect(prevButton).not.toBeDisabled();

    await user.click(prevButton);

    await waitFor(() => {
      expect(screen.getByText("Question 1 of 11")).toBeInTheDocument();
      expect(screen.getByText("Why do you want to move?")).toBeInTheDocument();
    });
  });

  it("handles single selection fields correctly", async () => {
    const user = userEvent.setup();
    render(<Questionnaire {...mockQuestionnaireProps} />);

    const q1Button = screen.getByRole("combobox");
    await user.click(q1Button);
    await user.click(screen.getByText("Work opportunities"));
    await user.click(screen.getByRole("button", { name: /next/i }));

    await waitFor(() => {
      expect(screen.getByText(QUESTIONS[1].question)).toBeInTheDocument();
    });
    const q2Button = screen.getByRole("combobox");
    await user.click(q2Button);
    await user.click(screen.getByText("United States"));
    await user.click(screen.getByRole("button", { name: /next/i }));

    await waitFor(() => {
      expect(screen.getByText("How old are you?")).toBeInTheDocument();
    });

    const ageButton = screen.getByRole("combobox");
    await user.click(ageButton);

    const ageOption = screen.getByText("18-24");
    await user.click(ageOption);

    expect(ageButton).toHaveTextContent("18-24");
  });

  it("handles multiple selection fields correctly", async () => {
    const user = userEvent.setup();
    render(<Questionnaire {...mockQuestionnaireProps} />);

    const multiSelectButton = screen.getByRole("combobox");
    await user.click(multiSelectButton);

    const option1 = screen.getByText("Work opportunities");
    const option2 = screen.getByText("Family reunification");
    await user.click(option1);
    await user.click(option2);

    expect(multiSelectButton).toHaveTextContent("Work opportunities, Family reunification");
  });

  it("submits form successfully with valid data", async () => {
    const user = userEvent.setup();
    render(<Questionnaire {...mockQuestionnaireProps} />);

    const selections = [
      { option: "Work opportunities" },
      { option: "Italy" },
      { option: "18-24" },
      { option: "Japan" },
      { option: "Bachelor's degree" },
      { option: "Software Development/Engineering" },
      { option: "No" },
      { option: "English" },
      { option: "Yes, substantial savings (>$25,000 USD per person)" },
      { option: "Permanent residence (5+ years)" },
      { option: "Canada" }
    ];

    for (let i = 0; i < selections.length; i++) {
      const button = screen.getByRole("combobox");
      await user.click(button);

      const popoverContent = document.querySelector('[data-radix-popper-content-wrapper]');
      if (!popoverContent) {
        throw new Error("Dropdown content not found");
      }

      const option = within(popoverContent as HTMLElement).getByText(selections[i].option);
      await user.click(option);

      const nextButton = screen.getByRole("button", { name: i === selections.length - 1 ? /submit/i : /next/i });
      await user.click(nextButton);
    }

    await waitFor(() => {
      expect(mockQuestionnaireProps.setUserData).toHaveBeenCalled();
    });
  });
});
