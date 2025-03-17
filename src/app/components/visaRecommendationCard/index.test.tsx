import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VisaRecommendationCard from './index';
import { STRINGS } from '@/app/strings';
import { mockMultipleVisaEligibilityResults } from '@/app/mocks/eligibility';

describe('VisaRecommendationCard', () => {

  it('renders the country name and likelihood', () => {
    render(<VisaRecommendationCard {...mockMultipleVisaEligibilityResults[0]} />);

    expect(screen.getByText("United States")).toBeInTheDocument();
    expect(screen.getByText('10% Match')).toBeInTheDocument();
  });

  it('renders visa type buttons', () => {
    render(<VisaRecommendationCard {...mockMultipleVisaEligibilityResults[0]} />);

    expect(screen.getByText('TN Visa')).toBeInTheDocument();
    expect(screen.getByText('H-1B Visa')).toBeInTheDocument();
  });

  it('renders reasoning text', () => {
    render(<VisaRecommendationCard {...mockMultipleVisaEligibilityResults[0]} />);

    expect(screen.getByText('Given the candidate\'s lack of professional experience, incomplete higher education, and skills not specified in demand, the likelihood of successfully obtaining a work-related visa is low.')).toBeInTheDocument();
  });

  it('starts with collapsed state and expands when button is clicked', async () => {
    render(<VisaRecommendationCard {...mockMultipleVisaEligibilityResults[0]} />);
    const user = userEvent.setup();

    expect(screen.queryByText('Non-immigrant visa allowing Canadian citizens to work in the U.S. in prearranged business activities.')).not.toBeInTheDocument();

    const expandButton = screen.getByLabelText('Show more');
    await user.click(expandButton);

    expect(screen.getByText('Non-immigrant visa allowing Canadian citizens to work in the U.S. in prearranged business activities.')).toBeInTheDocument();

    expect(screen.getByLabelText('Show less')).toBeInTheDocument();
  });

  it('collapses expanded content when collapse button is clicked', async () => {
    render(<VisaRecommendationCard {...mockMultipleVisaEligibilityResults[0]} />);
    const user = userEvent.setup();

    const expandButton = screen.getByLabelText('Show more');
    await user.click(expandButton);

    expect(screen.getByText('Non-immigrant visa allowing Canadian citizens to work in the U.S. in prearranged business activities.')).toBeInTheDocument();

    const collapseButton = screen.getByLabelText('Show less');
    await user.click(collapseButton);

    expect(screen.queryByText('Non-immigrant visa allowing Canadian citizens to work in the U.S. in prearranged business activities.')).not.toBeInTheDocument();
  });

  it('changes selected visa when a different visa type is clicked', async () => {
    render(<VisaRecommendationCard {...mockMultipleVisaEligibilityResults[0]} />);
    const user = userEvent.setup();

    await user.click(screen.getByLabelText('Show more'));

    expect(screen.getByText('Non-immigrant visa allowing Canadian citizens to work in the U.S. in prearranged business activities.')).toBeInTheDocument();

    await user.click(screen.getByText('H-1B Visa'));

    expect(screen.getByText('Temporary work visa for specialty occupations requiring specialized knowledge.')).toBeInTheDocument();

    expect(screen.queryByText('Non-immigrant visa allowing Canadian citizens to work in the U.S. in prearranged business activities.')).not.toBeInTheDocument();
  });

  it('renders different status icons based on requirement type', async () => {
    render(<VisaRecommendationCard {...mockMultipleVisaEligibilityResults[0]} />);
    const user = userEvent.setup();

    await user.click(screen.getByLabelText('Show more'));

    const nationalityItem = screen.getByText('Nationality').parentElement;
    const educationItem = screen.getByText('Education').parentElement;
    const experienceItem = screen.getByText('Experience').parentElement;

    expect(nationalityItem!.querySelector('svg')).toHaveClass('text-forest');
    expect(educationItem!.querySelector('svg')).toHaveClass('text-burgundy');
    expect(experienceItem!.querySelector('svg')).toHaveClass('text-burgundy');
  });

  it('applies correct color based on likelihood percentage', () => {
    const { rerender } = render(<VisaRecommendationCard {...mockMultipleVisaEligibilityResults[0]} />);
    const matchText = screen.getByText('10% Match');
    expect(matchText).toHaveClass('bg-burgundy bg-opacity-20 text-cream');

    rerender(<VisaRecommendationCard {...mockMultipleVisaEligibilityResults[1]} />);
    expect(screen.getByText('60% Match')).toHaveClass('bg-gold bg-opacity-20 text-forest');

    rerender(<VisaRecommendationCard {...mockMultipleVisaEligibilityResults[0]} likelihood={80} />);
    expect(screen.getByText('80% Match')).toHaveClass('bg-forest bg-opacity-20 text-cream');
  });

  it('renders next steps section when expanded', async () => {
    render(<VisaRecommendationCard {...mockMultipleVisaEligibilityResults[0]} />);
    const user = userEvent.setup();

    expect(screen.queryByText(STRINGS.nextSteps)).not.toBeInTheDocument();

    await user.click(screen.getByLabelText('Show more'));

    expect(screen.getByText(STRINGS.nextSteps)).toBeInTheDocument();
    expect(screen.getByText('1.')).toBeInTheDocument();
    expect(screen.getByText('Complete a degree or gain specialized experience.')).toBeInTheDocument();
    expect(screen.getByText('2.')).toBeInTheDocument();
    expect(screen.getByText('Improve English language proficiency.')).toBeInTheDocument();
    expect(screen.getByText('3.')).toBeInTheDocument();
    expect(screen.getByText('Seek employment with U.S. companies that sponsor visas.')).toBeInTheDocument();
  });

  it('handles empty visaTypes array gracefully', () => {
    const emptyVisaResult = {
      ...mockMultipleVisaEligibilityResults[0],
      visaTypes: []
    };

    render(<VisaRecommendationCard {...emptyVisaResult} />);

    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('10% Match')).toBeInTheDocument();

    expect(screen.queryByRole('button', { name: /TN Visa|H-1B Visa/ })).not.toBeInTheDocument();
  });

  it('clicking a visa type button expands the card if collapsed', async () => {
    render(<VisaRecommendationCard {...mockMultipleVisaEligibilityResults[0]} />);
    const user = userEvent.setup();

    expect(screen.queryByText('Non-immigrant visa allowing Canadian citizens to work in the U.S. in prearranged business activities.')).not.toBeInTheDocument();

    await user.click(screen.getByText('H-1B Visa'));

    expect(screen.getByText('Temporary work visa for specialty occupations requiring specialized knowledge.')).toBeInTheDocument();
    expect(screen.getByLabelText('Show less')).toBeInTheDocument();
  });
});
