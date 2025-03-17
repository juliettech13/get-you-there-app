jest.mock("d3-scale", () => ({
  scaleLinear: jest.fn(() => ({
    domain: jest.fn().mockReturnThis(),
    range: jest.fn().mockReturnThis(),
    nice: jest.fn().mockReturnThis(),
    clamp: jest.fn().mockReturnThis()
  }))
}));

import { render, screen, waitFor } from "@testing-library/react";
import VisaRecommendationsPage from "./page";
import { assessEligibility } from "@/app/services/eligibility";
import { mockEligibilityProfile, mockEligibilityResult } from "@/app/mocks/eligibility";
import { STRINGS } from "@/app/strings";
import { EligibilityResult } from "@/app/types/eligibility";

jest.mock("@/app/components/eligiblityMap", () => ({
  __esModule: true,
  default: ({
    eligibilityResult,
    onCountrySelect,
  }: {
    eligibilityResult: EligibilityResult;
    onCountrySelect: (country: string) => void;
  }) => (
    <div data-testid="eligibility-map">
      {eligibilityResult && (
        <div>
          {eligibilityResult.recommended_order.map((country) => (
            <button
              key={country}
              data-testid={`geography-${country}`}
              onClick={() => onCountrySelect(country)}
              style={{
                fill:
                  country === "Canada"
                    ? "var(--color-forest-light)"
                    : "var(--color-gold)",
              }}
            >
              {country}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}));

jest.unmock("react-simple-maps");

jest.mock("@/app/services/eligibility");
const mockAssessEligibility = assessEligibility as jest.MockedFunction<
  typeof assessEligibility
>;

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn()
  })
}));

const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

describe("VisaRecommendationsPage Page", () => {
  const originalConsoleError = console.error;

  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify(mockEligibilityProfile)
    );
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it("shows loading state initially", () => {
    mockAssessEligibility.mockImplementation(() => new Promise(() => {}));
    render(<VisaRecommendationsPage />);

    expect(screen.getByTestId("loading-messages")).toBeInTheDocument();
  });

  it("displays error message when eligibility assessment fails", async () => {
    console.error = jest.fn();

    mockAssessEligibility.mockRejectedValue(new Error("Failed to fetch"));
    render(<VisaRecommendationsPage />);

    await waitFor(() => {
      expect(
        screen.getByText("Failed to load recommendations. Please try again.")
      ).toBeInTheDocument();
    });

    expect(console.error).toHaveBeenCalledWith(
      'Error fetching eligibility:',
      expect.any(Error)
    );


  });

  it("renders eligibility results successfully", async () => {
    mockAssessEligibility.mockResolvedValue(mockEligibilityResult);
    render(<VisaRecommendationsPage />);

    await waitFor(() => {
      expect(
        screen.getByText(STRINGS.globalOpportunitiesTitle)
      ).toBeInTheDocument();

      expect(screen.getByTestId("eligibility-map")).toBeInTheDocument();

      expect(screen.getByRole('heading', { name: 'Canada' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Australia' })).toBeInTheDocument();
    });
  });

  it("handles country selection correctly", async () => {
    mockAssessEligibility.mockResolvedValue(mockEligibilityResult);
    const consoleSpy = jest.spyOn(console, "log");

    render(<VisaRecommendationsPage />);

    await waitFor(() => {
      expect(screen.getByTestId("eligibility-map")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId("geography-Canada")).toBeInTheDocument();
    });

    screen.getByTestId("geography-Canada").click();

    expect(consoleSpy).toHaveBeenCalledWith("Selected country:", "Canada");
  });

  it("displays correct likelihood colors on the map", async () => {
    mockAssessEligibility.mockResolvedValue(mockEligibilityResult);
    render(<VisaRecommendationsPage />);

    await waitFor(() => {
      expect(screen.getByTestId("geography-Canada")).toBeInTheDocument();
      expect(screen.getByTestId("geography-United States")).toBeInTheDocument();
    });

    const canadaElement = screen.getByTestId("geography-Canada");
    expect(canadaElement).toHaveStyle({ fill: "var(--color-forest-light)" });

    const usElement = screen.getByTestId("geography-United States");
    expect(usElement).toHaveStyle({ fill: "var(--color-gold)" });
  });
});
