require('dotenv').config()
const { GoogleGenAI } = require('@google/genai')
const express = require('express')
const multer = require('multer')
const { PDFParse } = require('pdf-parse')
const fs = require('fs')
const cors = require('cors')
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
const app = express()


app.use(express.json())
app.use(cors())

const upload = multer({ dest: 'uploads/' })

app.get('/', (req, res) => {
  res.send('Hello from AI Resume Analyzer Backend!')
})

app.post('/api/analyze', upload.single('resume'), async (req, res) => {
  try {
    console.log(req.file)
    console.log(req.body)

    const dataBuffer = fs.readFileSync(req.file.path)

    const parser = new PDFParse({ data: dataBuffer })
    const pdf = await parser.getText()
    console.log(pdf.text)

const response = await ai.models.generateContent({
  model: 'gemini-3.7-flash',
  config: {
    responseMimeType: 'application/json'
  },
  contents: `
You are an expert resume analyzer.

Analyze the following resume against the given job description.

RESUME:
${pdf.text}

JOB DESCRIPTION:
${req.body.jobDescription}

Return ONLY valid JSON in exactly this format:

{
  "matchScore": 0,
  "matchingSkills": [],
  "missingSkills": [],
  "suggestions": []
}

Rules:
- matchScore must be a number between 0 and 100.
- matchingSkills must contain skills from the resume that match the job description.
- missingSkills must contain important skills from the job description that are missing from the resume.
- suggestions must contain practical suggestions to improve the resume.
- Do not add any extra text outside the JSON.
`
})

const analysis = JSON.parse(response.text)

console.log(analysis)

await parser.destroy()

res.json({
  message: 'AI analysis completed successfully',
  resumeText: pdf.text,
  analysis: analysis
})
 

  } catch (error) {
    console.error('Analysis Error:', error)

    res.status(error.status || 500).json({
      error: 'AI analysis failed',
      message: error.message
    })
  }
})

app.listen(5000, () => {
  console.log('Server is running on port 5000')
})