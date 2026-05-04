/**
 * IndustryChips Component
 * 
 * Design: Warm Minimalism
 * - 3-column grid of industry options with emoji
 * - Pill-shaped (100px border-radius) with amber highlight on selection
 * - Smooth transition on hover and selection
 */

interface IndustryChipsProps {
  selected: string;
  onSelect: (industry: string) => void;
}

const INDUSTRIES = [
  { emoji: '🍜', label: 'F&B / Café' },
  { emoji: '🏥', label: 'Clinic' },
  { emoji: '📚', label: 'Education' },
  { emoji: '🛍️', label: 'Retail' },
  { emoji: '🚚', label: 'Logistics' },
  { emoji: '💼', label: 'Services' },
  { emoji: '💪', label: 'Fitness' },
  { emoji: '🏠', label: 'Real Estate' },
  { emoji: '⚙️', label: 'Other' },
];

export default function IndustryChips({ selected, onSelect }: IndustryChipsProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {INDUSTRIES.map((industry) => (
        <button
          key={industry.label}
          onClick={() => onSelect(industry.label)}
          className={`
            py-3 px-4 rounded-full text-sm font-medium transition-all duration-200
            border-2 flex items-center justify-center gap-2 whitespace-nowrap
            ${
              selected === industry.label
                ? 'bg-kodee-amber-light border-kodee-amber text-kodee-ink'
                : 'bg-kodee-white border-kodee-border text-kodee-ink hover:border-kodee-amber hover:bg-kodee-warm'
            }
          `}
        >
          <span className="text-base">{industry.emoji}</span>
          <span className="hidden sm:inline text-xs">{industry.label}</span>
        </button>
      ))}
    </div>
  );
}
