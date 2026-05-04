/**
 * ProofStrip Component
 * 
 * Design: Warm Minimalism
 * - Horizontal strip with 3 proof points
 * - Amber dot bullets for each item
 * - Responsive layout: stacks on mobile
 */

const PROOF_POINTS = [
  '100% of workshop attendees left with a working tool',
  'Built for Singapore SMEs',
  'No coding required — ever',
];

export default function ProofStrip() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {PROOF_POINTS.map((point, idx) => (
        <div key={idx} className="flex items-start gap-3">
          <span className="inline-block w-2 h-2 bg-kodee-amber rounded-full mt-2 flex-shrink-0" />
          <p className="text-sm md:text-base text-kodee-muted">{point}</p>
        </div>
      ))}
    </div>
  );
}
