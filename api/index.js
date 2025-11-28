import fetch from "node-fetch";

const EXPECTED_SECRET = process.env.QUIZ_SECRET;
const BROWSERLESS_KEY = process.env.BROWSERLESS_KEY;

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Use POST" });

  if (!req.headers["content-type"]?.includes("application/json"))
    return res.status(400).json({ error: "Invalid JSON" });

  const { email, secret, url } = req.body;

  if (!email || !secret || !url)
    return res.status(400).json({ error: "Missing email/secret/url" });

  if (secret !== EXPECTED_SECRET)
    return res.status(403).json({ error: "Invalid secret" });

  try {
    // Fetch rendered HTML via Browserless
    const html = await fetch(
      `https://chrome.browserless.io/content?token=${BROWSERLESS_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      }
    ).then((r) => r.text());

    // Extract numbers and sum
    const numbers = html.match(/-?\d+(\.\d+)?/g)?.map(Number) || [];
    const answer = numbers.reduce((a, b) => a + b, 0);

    // Extract submit URL
    const submitUrl =
      html.match(/https?:\/\/[^\s"'<>]+\/submit[^\s"'<>]*/i)?.[0] ||
      html.match(/https?:\/\/[^\s"'<>]+/i)?.[0];

    if (!submitUrl)
      return res.json({
        accepted: true,
        solved: false,
        reason: "Submit URL not found",
      });

    // Submit answer
    const payload = { email, secret, url, answer };

    const response = await fetch(submitUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then((r) => r.json());

    return res.json({
      accepted: true,
      solved: true,
      answerPayload: payload,
      submitResponse: response,
    });
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
}
