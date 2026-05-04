/**
 * LoadingScreen Component
 * 
 * Design: Warm Minimalism
 * - Centered full-page layout with amber spinning ring
 * - Sequential step reveals with staggered delays (0.8s, 2.2s, 3.8s)
 * - Smooth fade-in animations for each step
 */

import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isVisible: boolean;
}

export default function LoadingScreen({ isVisible }: LoadingScreenProps) {
  const [showStep1, setShowStep1] = useState(false);
  const [showStep2, setShowStep2] = useState(false);
  const [showStep3, setShowStep3] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setShowStep1(false);
      setShowStep2(false);
      setShowStep3(false);
      return;
    }

    const timer1 = setTimeout(() => setShowStep1(true), 800);
    const timer2 = setTimeout(() => setShowStep2(true), 2200);
    const timer3 = setTimeout(() => setShowStep3(true), 3800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-kodee-cream flex items-center justify-center z-50">
      <style>{`
        @keyframes spin-amber {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .loading-ring {
          animation: spin-amber 2s linear infinite;
        }
        .step-item {
          animation: fade-in 0.5s ease-out forwards;
        }
        .step-item.hidden {
          opacity: 0;
        }
      `}</style>

      <div className="text-center">
        {/* Amber Spinning Ring */}
        <div className="flex justify-center mb-8">
          <div
            className="loading-ring w-16 h-16 border-4 border-kodee-border rounded-full"
            style={{
              borderTopColor: 'var(--kodee-amber)',
              borderRightColor: 'var(--kodee-amber)',
            }}
          />
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl font-bold text-kodee-ink mb-2">
          Designing your solution…
        </h1>

        {/* Subheading */}
        <p className="text-lg text-kodee-muted mb-8">
          This takes about 20–30 seconds
        </p>

        {/* Steps */}
        <div className="space-y-3 max-w-sm mx-auto">
          <div
            className={`step-item ${!showStep1 ? 'hidden' : ''} text-kodee-muted text-sm`}
          >
            <span className="text-kodee-amber mr-2">✦</span>
            Understanding your business context
          </div>

          <div
            className={`step-item ${!showStep2 ? 'hidden' : ''} text-kodee-muted text-sm`}
          >
            <span className="text-kodee-amber mr-2">✦</span>
            Designing the interface layout
          </div>

          <div
            className={`step-item ${!showStep3 ? 'hidden' : ''} text-kodee-muted text-sm`}
          >
            <span className="text-kodee-amber mr-2">✦</span>
            Adding realistic sample data
          </div>
        </div>
      </div>
    </div>
  );
}
