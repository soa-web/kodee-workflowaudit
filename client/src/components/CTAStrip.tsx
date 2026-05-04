/**
 * CTAStrip Component
 * 
 * Design: Warm Minimalism
 * - White background with left-aligned content and right-aligned buttons
 * - Two buttons: Ghost (Try another idea) and Amber (Let Kodee build it)
 * - Responsive layout: stacks on mobile
 */

interface CTAStripProps {
  onTryAgain: () => void;
}

export default function CTAStrip({ onTryAgain }: CTAStripProps) {
  return (
    <div className="bg-kodee-white border-t border-kodee-border py-8 px-6 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Left Content */}
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold text-kodee-ink mb-2">
            Love what you see?
          </h3>
          <p className="text-kodee-muted text-sm md:text-base">
            This is just the visual. Kodee builds the real, working version — connected to your actual business, ready to use from day one.
          </p>
        </div>

        {/* Right Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-shrink-0">
          <button
            onClick={onTryAgain}
            className="
              px-6 py-3 rounded-full font-medium text-sm md:text-base
              border-2 border-kodee-border text-kodee-ink
              hover:border-kodee-ink hover:bg-kodee-warm
              transition-all duration-200
            "
          >
            Try another idea
          </button>
          <a
            href="https://kodee.co"
            target="_blank"
            rel="noopener noreferrer"
            className="
              px-6 py-3 rounded-full font-medium text-sm md:text-base
              bg-kodee-amber text-kodee-white
              hover:bg-kodee-amber-dark
              transition-all duration-200 text-center
            "
          >
            Let Kodee build it →
          </a>
        </div>
      </div>
    </div>
  );
}
