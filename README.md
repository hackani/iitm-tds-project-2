# LLM Analysis Quiz Solver  
Automated quiz-solving backend for the **TDS LLM Analysis Project**.  


Fully compliant with all project requirements:
- Validates secret  
- Returns correct HTTP codes (400/403/200)  
- Handles JavaScript-rendered quiz pages  
- Extracts data, analyzes, computes answers  
- Submits answer payloads under 1MB  
- Supports multi-step quiz flows within 3 minutes  

---

# 🚀 Features

### ✔ Serverless-optimized  
- `/api/index.js` endpoint for **Vercel**  
- Uses **Browserless API** for DOM-rendered pages  
- Zero cold-start Chrome issues  

### ✔ Quiz Solver Logic  
- Executes JavaScript pages  
- Extracts tables/text/PDF links  
- Sums numerical columns  
- Detects submit URL automatically  
- Submits the answer payload  

### ✔ Reliable & Fast  
- Under 1MB responses  
- Timeouts safe for 3-minute limit  
- Minimal dependencies  
- Production-ready CI/CD via GitHub Actions  

---

# 📂 Repository Structure

```
llm-analysis-quiz-solver/
│
├── api/
│   └── index.js             # Vercel/Cloudflare serverless function (Browserless)
│
├── server/
│   ├── server.js            # Express server for Cloud Run / Docker
│   └── quizSolver.js        # Shared quiz-solving logic (Playwright)
│
├── test/
│   ├── localTest.js         # Local solver test script
│   └── demo-test.http       # REST client test file
|
├── .env.example
├── README.md
├── package.json
├── package-lock.json
└── LICENSE (MIT)
```

---

# 🔧 Setup & Installation

### 1. Clone Repository
```
git clone https://github.com/hackani/iitm-tds-project-2.git
cd iitm-tds-project-2
```

### 2. Install dependencies
```
npm install
```

### 3. Add environment variables  
Create a `.env` file or set variables in your hosting platform:

```
QUIZ_SECRET=your_secret_here
BROWSERLESS_KEY=your_browserless_key
CHROME_PATH=/usr/bin/google-chrome
```

---

# 🧪 Local Testing

### Start local server (container version)
```
node server/server.js
```

### Run test script
```
node test/localTest.js
```

### Or test via REST client  
Open `test/demo-test.http` in VS Code and click **Send Request**.

Expected output:
- answerPayload  
- submitResponse  
- solverNotes  

---
