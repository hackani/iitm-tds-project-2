import fetch from "node-fetch";

const EXPECTED_SECRET = process.env.QUIZ_SECRET || "kanishk_secret";
const BROWSERLESS_KEY = process.env.BROWSERLESS_KEY;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  // Parse JSON safely
  let body;
  try {
    body = await req.json(); // <-- THIS WORKS ON VERCEL
  } catch (err) {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  const { email, secret, url } = body || {};

  if (!email || !secret || !url) {
    return res.status(400).json({ error: "Missing fields" });
  }

  if (secret !== process.env.QUIZ_SECRET) {
    return res.status(403).json({ error: "Invalid secret" });
  }

  // Return a dummy valid response for testing
  return res.status(200).json({
    accepted: true,
    solved: true,
    answer: "ok-vercel-json-working"
  });
}
