import "@testing-library/jest-dom";
import { assessEligibility } from "./eligibility";
import { mockEligibilityProfile } from "@/app/mocks/eligibility";
import { mockSuccessfulEligibilityResults } from "@/app/mocks/eligibility";

describe("Eligibility Service", () => {
  const originalConsoleError = console.error;

  beforeEach(() => {
    jest.resetAllMocks();
    global.fetch = jest.fn();
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it("successfully calls the eligibility assessment endpoint", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSuccessfulEligibilityResults
    });

    const result = await assessEligibility(mockEligibilityProfile);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/v1/eligibility/assess"),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockEligibilityProfile),
      }
    );

    expect(result).toEqual(mockSuccessfulEligibilityResults);
  });

  it("handles API errors gracefully", async () => {
    const errorMessage = "API Error";
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(assessEligibility(mockEligibilityProfile)).rejects.toThrow(
      errorMessage
    );

    expect(console.error).toHaveBeenCalledWith(
      "Error assessing eligibility:",
      expect.any(Error)
    );
  });

  it("processes malformed API responses without crashing", async () => {
    const malformedResponse = { invalid: "response" };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => malformedResponse,
    });

    const result = await assessEligibility(mockEligibilityProfile);
    expect(result).toEqual(malformedResponse);
  });

  it("handles non-200 responses appropriately", async () => {
    const errorResponse = { error: "Invalid input" };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: "Bad Request",
      json: async () => errorResponse,
    });

    const result = await assessEligibility(mockEligibilityProfile);
    expect(result).toEqual(errorResponse);
  });

  it("handles network errors appropriately", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network Error")
    );

    await expect(assessEligibility(mockEligibilityProfile)).rejects.toThrow(
      "Network Error"
    );

    expect(console.error).toHaveBeenCalledWith(
      "Error assessing eligibility:",
      expect.any(Error)
    );
  });
});
