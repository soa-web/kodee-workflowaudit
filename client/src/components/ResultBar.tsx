/**
 * ResultBar Component
 * 
 * Design: Warm Minimalism
 * - Dark background (#1A1208) with amber badge and CTA
 * - Left: "Your Preview" badge + label with industry
 * - Right: "Make it real with Kodee" CTA button
 */

interface ResultBarProps {
  industry: string;
}

export default function ResultBar({ industry }: ResultBarProps) {
  return (
    <div className="bg-kodee-ink text-kodee-white py-4 px-6 md:px-8 border-b border-kodee-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left Content */}
        <div className="flex items-center gap-3">
          <span className="inline-block px-3 py-1 bg-kodee-amber text-kodee-ink text-xs font-bold rounded-full">
            Your Preview
          </span>
          <span className="text-sm md:text-base text-kodee-white/80">
            What your <em className="not-italic font-semibold">{industry}</em> tool could look like
          </span>
        </div>

        {/* Right CTA */}
        <a
          href="https://kodee.co"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-block px-6 py-2 rounded-full font-medium text-sm md:text-base
            bg-kodee-amber text-kodee-ink
            hover:bg-kodee-amber-light
            transition-all duration-200
          "
        >
          Make it real with Kodee →
        </a>
      </div>
    </div>
  );
}
