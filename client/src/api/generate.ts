/**
 * API Route: /api/generate
 * 
 * Server-side handler for generating HTML previews using Anthropic API.
 * This is a Vite API route that runs on the server during development.
 * 
 * Request: POST /api/generate
 * Body: { industry: string, problem: string }
 * Response: { html: string } | { error: string }
 */

import { generatePrompt } from '@/lib/prompt';

export async function POST(req: Request) {
  try {
    const { industry, problem } = await req.json();

    // Validation
    if (!industry || !problem || problem.length < 20) {
      return new Response(
        JSON.stringify({ error: 'Invalid input' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get API key from environment
    const apiKey = process.env.VITE_ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate prompt
    const prompt = generatePrompt(industry, problem);

    // Call Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Anthropic API error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to generate preview' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    let html = data.content[0]?.text || '';

    // Clean up markdown code fences if present
    html = html.replace(/^```html?\s*/i, '').replace(/\s*```$/i, '').trim();

    // Validate HTML
    if (!html.toLowerCase().includes('<html')) {
      return new Response(
        JSON.stringify({ error: 'Generation failed — invalid HTML returned' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ html }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('API error:', err);
    return new Response(
      JSON.stringify({ error: err.message || 'API error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
