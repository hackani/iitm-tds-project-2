import express from "express";
import bodyParser from "body-parser";
import solveQuizPage from "./quizSolver.js";

const EXPECTED_SECRET = process.env.QUIZ_SECRET || "kanishk_secret";

const app = express();
app.use(bodyParser.json({ limit: "1mb" }));

app.post("/", async (req, res) => {
  const ct = req.headers["content-type"];
  if (!ct || !ct.includes("application/json"))
    return res.status(400).json({ error: "Invalid JSON" });

  const { email, secret, url } = req.body;
  if (!email || !secret || !url)
    return res.status(400).json({ error: "Missing email/secret/url" });
  console.log(`Received request for URL: ${url}`);
  console.log(`Received request from email: ${email}`);
  console.log(`Received secret: ${secret}`);
  console.log(`Expected secret: ${EXPECTED_SECRET}`);
  if (secret !== EXPECTED_SECRET)
    return res.status(403).json({ error: "Invalid secret" });

  try {
    const result = await solveQuizPage({ email, secret, url });
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

export default app;
