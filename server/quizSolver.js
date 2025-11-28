import fetch from "node-fetch";
import { chromium } from "playwright-core";

export default async function solveQuizPage({ email, secret, url }) {
  const browser = await chromium.launch({
    args: chromium.args,
    executablePath: process.env.CHROME_PATH,
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle" });

  const text = await page.evaluate(() => document.body.innerText);
  const html = await page.content();

  // Extract submit URL
  const submitUrl =
    text.match(/https?:\/\/[^\s"'<>]+\/submit[^\s"'<>]*/i)?.[0] ||
    text.match(/https?:\/\/[^\s"'<>]+/i)?.[0];

  if (!submitUrl) {
    await browser.close();
    return { accepted: true, solved: false, reason: "Submit URL missing" };
  }

  // Extract numbers and sum
  const nums = text.match(/-?\d+(\.\d+)?/g)?.map(Number) || [];
  let sum = nums.reduce((a, b) => a + b, 0);
  if(sum === 0){
    sum = 1;
  }
  const payload = { email, secret, url, answer: sum };

  console.log("Submitting to:", submitUrl);
  console.log("Payload:", payload);
  const result = await fetch(submitUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then((r) => r.json());

  await browser.close();

  return {
    accepted: true,
    solved: true,
    answerPayload: payload,
    submitResponse: result,
  };
}
