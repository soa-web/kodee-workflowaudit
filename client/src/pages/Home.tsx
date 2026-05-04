/**
 * Home Page — Kodee Preview
 * 
 * Design: Warm Minimalism
 * - Screen 1: Form with industry chips, problem textarea, and proof strip
 * - Screen 2: Loading with animated spinner and sequential steps
 * - Screen 3: Preview result with iframe and CTAs
 * 
 * State Management:
 * - industry: selected industry chip
 * - problem: textarea input
 * - screen: 'form' | 'loading' | 'result'
 * - generatedHtml: HTML string from API
 * - error: validation or API error message
 */

import { useState } from 'react';
import IndustryChips from '@/components/IndustryChips';
import LoadingScreen from '@/components/LoadingScreen';
import PreviewFrame from '@/components/PreviewFrame';
import ResultBar from '@/components/ResultBar';
import CTAStrip from '@/components/CTAStrip';
import ProofStrip from '@/components/ProofStrip';

type Screen = 'form' | 'loading' | 'result';

export default function Home() {
  const [industry, setIndustry] = useState('');
  const [problem, setProblem] = useState('');
  const [screen, setScreen] = useState<Screen>('form');
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [error, setError] = useState('');

  async function handleGenerate() {
    setError('');

    // Validation
    if (!industry) {
      setError('Please select your business type.');
      return;
    }
    if (problem.trim().length < 20) {
      setError('Please describe your problem in more detail.');
      return;
    }

    // Show loading screen
    setScreen('loading');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ industry, problem }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setScreen('form');
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setGeneratedHtml(data.html);
      setScreen('result');
    } catch (err) {
      setScreen('form');
      setError('Network error. Please check your connection and try again.');
    }
  }

  function handleReset() {
    setIndustry('');
    setProblem('');
    setGeneratedHtml('');
    setError('');
    setScreen('form');
  }

  return (
    <div className="min-h-screen bg-kodee-cream">
      {/* Loading Screen Overlay */}
      <LoadingScreen isVisible={screen === 'loading'} />

      {/* Screen 1: Form */}
      {screen === 'form' && (
        <div className="min-h-screen flex flex-col">
          {/* Top Navigation */}
          <nav className="bg-kodee-white border-b border-kodee-border py-4 px-6 md:px-8 sticky top-0 z-40">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <h1 className="text-xl md:text-2xl font-bold text-kodee-ink">
                Kodee
              </h1>
              <span className="inline-block px-3 py-1 bg-kodee-amber-light text-kodee-amber text-xs font-bold rounded-full">
                Free Preview
              </span>
            </div>
          </nav>

          {/* Hero Section */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-8 py-12 md:py-16">
            <div className="max-w-2xl w-full">
              {/* Hero Headline */}
              <h2 className="text-4xl md:text-5xl font-bold text-kodee-ink mb-4 text-center">
                See your solution before you build it
              </h2>
              <p className="text-lg md:text-xl text-kodee-muted text-center mb-12">
                Describe your business problem. We'll generate a real visual of what your app could look like — instantly.
              </p>

              {/* Form Card */}
              <div className="bg-kodee-white rounded-2xl shadow-lg p-8 md:p-10">
                {/* Industry Chips */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-kodee-ink mb-4">
                    What's your business type?
                  </label>
                  <IndustryChips selected={industry} onSelect={setIndustry} />
                </div>

                {/* Divider */}
                <div className="border-t border-kodee-border my-8" />

                {/* Problem Textarea */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-kodee-ink mb-2">
                    What do you want to fix or build?
                  </label>
                  <textarea
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    placeholder="Describe your workflow problem in detail..."
                    className="
                      w-full p-4 border-2 border-kodee-border rounded-lg
                      text-kodee-ink placeholder-kodee-muted
                      focus:outline-none focus:border-kodee-amber focus:ring-2 focus:ring-kodee-amber/20
                      resize-none
                    "
                    rows={5}
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                {/* Submit Row */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <p className="text-xs md:text-sm text-kodee-muted">
                    Takes ~30 seconds
                  </p>
                  <button
                    onClick={handleGenerate}
                    className="
                      px-8 py-3 rounded-full font-semibold text-base
                      bg-kodee-amber text-kodee-white
                      hover:bg-kodee-amber-dark
                      transition-all duration-200
                      hover:-translate-y-0.5 hover:shadow-lg
                    "
                  >
                    Visualise my solution →
                  </button>
                </div>
              </div>

              {/* Proof Strip */}
              <ProofStrip />
            </div>
          </div>
        </div>
      )}

      {/* Screen 3: Preview Result */}
      {screen === 'result' && (
        <div className="min-h-screen flex flex-col">
          {/* Result Bar */}
          <ResultBar industry={industry} />

          {/* Preview Frame */}
          <div className="flex-1 bg-kodee-cream overflow-auto">
            <PreviewFrame html={generatedHtml} />
          </div>

          {/* CTA Strip */}
          <CTAStrip onTryAgain={handleReset} />
        </div>
      )}
    </div>
  );
}
