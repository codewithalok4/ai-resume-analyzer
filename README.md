# 🤖 AI Resume Analyzer

An AI-powered full-stack web application that analyzes a resume against a job description and provides useful insights about the candidate's job match.

The application uses Google Gemini AI to identify matching skills, missing skills, and practical suggestions for improving the resume.

---

## 🚀 Features

- 📄 Upload a resume in PDF format
- 📝 Enter a target job description
- 🤖 AI-powered resume analysis using Google Gemini
- 📊 Resume match score
- ✅ Identify matching skills
- ❌ Identify missing skills
- 💡 AI-generated resume improvement suggestions
- ⏳ Loading state during AI analysis
- ⚠️ Error handling for failed requests
- 📱 Responsive user interface

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- JavaScript
- HTML5
- CSS3

### Backend

- Node.js
- Express.js
- Multer
- pdf-parse
- CORS

### AI

- Google Gemini API

### Development Tools

- VS Code
- Git
- GitHub

---

## 🏗️ Project Architecture

```text
AI Resume Analyzer
│
├── Frontend
│   ├── React
│   ├── Vite
│   └── CSS
│
└── Backend
    ├── Node.js
    ├── Express.js
    ├── PDF Parser
    ├── Multer
    └── Gemini API
