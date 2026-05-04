/**
 * Prompt Generator for Anthropic API
 * 
 * Generates a detailed prompt that instructs Claude to create a realistic,
 * beautiful HTML dashboard mockup for the user's specific problem.
 */

export function generatePrompt(industry: string, problem: string): string {
  return `You are a senior product designer and frontend developer.

A ${industry} business owner in Singapore has this problem:
"${problem}"

Build a complete, realistic, beautiful HTML web application mockup that solves this problem.

DESIGN:
- Google Fonts via @import in <style> (pick a modern clean font — not Inter or Roboto)
- Sidebar navigation OR top navigation with logo and nav links
- Stats row: 3–4 metric cards with realistic numbers (SGD currency where relevant)
- Main content: data table OR card grid with 6–8 rows of realistic Singapore data (local names, SGD, local context)
- At least one supporting panel: a form, filter bar, or action area
- Status badges (e.g. Pending / Active / Completed) with colour-coded pills
- Colour scheme appropriate for a ${industry} business — creative, not generic blue/white
- Hover states, clean card shadows, good spacing
- Must look like a real production-quality app — not a wireframe

DATA:
- Realistic Singapore context: SGD pricing, Singaporean names, local business terminology
- Data must directly relate to the problem: "${problem}"

TECHNICAL:
- Return ONLY raw HTML starting with <!DOCTYPE html>
- All CSS inside one <style> tag, all JS inside one <script> tag
- No external files except Google Fonts @import
- No JS libraries — vanilla only
- Make tabs/buttons interactive where possible (tab switching, checkboxes, etc.)

Return ONLY the raw HTML. No markdown, no code fences, no explanation.`;
}
