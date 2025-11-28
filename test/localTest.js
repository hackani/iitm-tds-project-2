import fetch from "node-fetch";

const payload = {
  email: "24f2007671@ds.study.iitm.ac.in",
  secret: "kanishk_secret",
  url: "https://tds-llm-analysis.s-anand.net/demo",
};

fetch("http://localhost:8080/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
})
  .then((r) => r.json())
  .then(console.log)
  .catch(console.error);
