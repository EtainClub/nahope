import { MetadataRoute } from "next";

// AI / LLM crawlers we explicitly welcome for GEO (Generative Engine Optimization).
// Listing them by name makes intent unambiguous even though `*` already allows them.
const AI_CRAWLERS = [
  "GPTBot", // OpenAI training crawler
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User", // ChatGPT browsing on user request
  "ClaudeBot", // Anthropic crawler
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot", // Perplexity
  "Perplexity-User",
  "Google-Extended", // Gemini / Vertex AI training
  "Applebot-Extended", // Apple Intelligence
  "CCBot", // Common Crawl (feeds many LLMs)
  "Amazonbot",
  "Bytespider",
  "Meta-ExternalAgent",
  "cohere-ai",
  "DuckAssistBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default rule for all crawlers (search engines + anything unlisted).
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/profile/"],
      },
      // Explicit allow for AI/LLM crawlers so the universe is indexed by
      // ChatGPT, Claude, Perplexity, Gemini, etc.
      {
        userAgent: AI_CRAWLERS,
        allow: "/",
        disallow: ["/api/", "/profile/"],
      },
    ],
    sitemap: "https://nahope.com/sitemap.xml",
    host: "https://nahope.com",
  };
}
