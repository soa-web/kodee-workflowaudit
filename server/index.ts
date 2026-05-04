import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generate HTML preview using Anthropic API
 */
async function generatePreview(industry: string, problem: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  const prompt = `You are a senior product designer and frontend developer.

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
    throw new Error('Failed to generate preview');
  }

  const data = await response.json();
  let html = data.content[0]?.text || '';

  // Clean up markdown code fences if present
  html = html.replace(/^```html?\s*/i, '').replace(/\s*```$/i, '').trim();

  if (!html.toLowerCase().includes('<html')) {
    throw new Error('Generation failed — invalid HTML returned');
  }

  return html;
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Parse JSON bodies
  app.use(express.json());

  // API route for generating previews
  app.post('/api/generate', async (req, res) => {
    try {
      const { industry, problem } = req.body;

      // Validation
      if (!industry || !problem || problem.length < 20) {
        return res.status(400).json({ error: 'Invalid input' });
      }

      const html = await generatePreview(industry, problem);
      res.json({ html });
    } catch (err: any) {
      console.error('API error:', err);
      res.status(500).json({ error: err.message || 'API error' });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
