# 🚀 GrowCode

### Transform Coding Practice into Measurable Growth

GrowCode is an AI-powered coding analytics platform designed to help developers improve smarter, not harder. By analyzing a user's LeetCode activity, GrowCode identifies strengths, weaknesses, learning patterns, and growth opportunities, then generates personalized recommendations and action plans.

The goal of GrowCode is simple:

> **Stop guessing what to practice next. Start growing with data-driven insights.**

---
## 🎥 Project Demo

[![Watch Demo](https://img.youtube.com/vi/Imn-LvLxv8M/0.jpg)](https://youtu.be/DVTXqWQCLME?si=gfFsQ799_YL_HOas)

## 🔗 Live Demo
https://grow-coder.vercel.app/
##
## ✨ Features
### 🧠 Coding DNA Analysis

Understand your unique coding profile through detailed analysis of:

* Problem-solving behavior
* Topic mastery
* Difficulty progression
* Consistency patterns
* Learning trends
* Strengths and weaknesses

---

### 📊 Performance Analytics Dashboard

Track key coding metrics including:

* Total problems solved
* Easy / Medium / Hard distribution
* Submission activity
* Acceptance rate
* Daily and weekly progress
* Topic-wise performance

---

### 🎯 Weakness Detection Engine

Automatically discover:

* Weak DSA topics
* Frequently struggled concepts
* Learning bottlenecks
* Areas limiting overall growth

---

### 🤖 Personalized Problem Recommendations

Receive tailored question suggestions based on:

* Current skill level
* Weak topics
* Solving history
* Growth goals

---

### 📅 Adaptive Daily Growth Plan

Generate a customized roadmap that includes:

* Recommended questions
* Revision tasks
* Topic-focused practice
* Daily coding goals

---

### 📈 Growth Insights

Monitor your improvement through:

* Consistency tracking
* Progress trends
* Skill development analytics
* Performance reports

---

## 🛠 Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Framer Motion

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### APIs

* LeetCode Data API
* Custom Analytics Engine

### AI Layer

* OpenAI API
* Recommendation System
* Analytics Engine

---

## 🏗 Folder Structure
```text
GrowCoder/
│
├── backend/                  # Express.js REST API
│   ├── src/
│   │   ├── controllers/      # Route request controllers
│   │   ├── models/           # MongoDB schemas (User, AIAnalysis, etc.)
│   │   ├── routes/           # Express endpoints
│   │   └── services/         # LeetCode API, Analytics & OpenAI services
│   └── package.json
│
└── frontend/                 # React.js SPA (Vite)
    ├── src/
    │   ├── components/       # UI Sub-tabs (Dashboard, Coach, Analysis, etc.)
    │   ├── pages/            # Login, Dashboard main pages
    │   └── main.jsx
    └── package.json
```

---

## 🎯 Why GrowCode?

Most coding platforms tell you:

* How many questions you've solved
* Your contest rating
* Your recent submissions

GrowCode goes further and answers:

* What topics are holding me back?
* What should I practice next?
* Am I improving consistently?
* Where should I focus my effort?
* How can I accelerate my coding growth?

---

## 🚀 Current Development Status

### Phase 1 (Completed)
* [x] Landing Page
* [x] Login Page
* [x] Dashboard UI
* [x] User Authentication & Synced Session management

### Phase 2 (Completed)
* [x] LeetCode GraphQL API integration
* [x] Performance Analytics Dashboard
* [x] Data Processing & Metrics Normalization Layer

### Phase 3 (Completed)
* [x] Coding DNA Analysis
* [x] Weakness & Bottleneck Detection Engine
* [x] OpenAI Structured Output Summary Insights

### Phase 4 (Completed)
* [x] Personalized Recommendations & Dynamic Slugs routing
* [x] Daily Growth Planner & Target Checklist
* [x] Timed Practice Sessions & Metrics Aggregator

---

## ⚙️ Installation & Setup

### 1. Prerequisite Environment variables

Create a `.env` file inside the `backend/` folder:
```env
PORT=5001
MONGODB_URI=mongodb://127.0.0.1:27017/growcode
OPENAI_API_KEY=your_openai_api_key
```

### 2. Run the Backend Server
```bash
cd backend
npm install
npm run dev
```
The backend server runs on `http://localhost:5001`.

### 3. Run the Frontend Client
```bash
cd ../frontend
npm install
npm run dev
```
The React development server runs on `http://localhost:5173`.

---

## 🔮 Future Roadmap

* Interview Readiness Score calculator
* Company-Specific targeted preparation plans
* Weekly Performance Analytics email reports
* Multi-platform integration (Codeforces, HackerRank)

---

## 👨‍💻 Author

**Shobhit Kumar**

B.Tech (ECE), NIT Patna

Building tools that help developers learn faster, practice smarter, and grow consistently.
