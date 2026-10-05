import { useState } from 'react'
import './App.css'

function App() {
  const [resume, setResume] = useState(null)
  const [jobDescription, setJobDescription] = useState("")
  const [analyzed, setAnalyzed] = useState(false)
  const [resumeText, setResumeText] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState(null)

 const handleAnalyze = async () => {
  setError("")
  setIsLoading(true)
  const formData = new FormData()

  formData.append('resume', resume)
  formData.append('jobDescription', jobDescription)

  const response = await fetch('http://localhost:5000/api/analyze', {
    method: 'POST',
    body: formData
  })

  if (!response.ok) {
    const errorData = await response.json()
    console.log('Backend error:', errorData)
    setError(errorData.message || 'AI analysis failed')

    setIsLoading(false)
    return
  }

  const data = await response.json()
  console.log(data)

  setResumeText(data.resumeText)
  setAnalysis(data.analysis)
  setAnalyzed(true)
  setIsLoading(false)
}

  return (
    <div>

      <nav>
        <h2>AI Resume Analyzer</h2>

        <div>
          <a href="#">Home</a>
          <a href="#">How It Works</a>
          <button>Analyze Resume</button>
        </div>
      
      </nav>
      <section className="hero">

        <p className="hero-tag">AI-POWERED RESUME ANALYSIS</p>

        <h1>Make Your Resume Work Smarter.</h1>

        <p className="hero-description">
          Analyze your resume, match it with job descriptions,
          and discover the skills you need to land your next opportunity.
        </p>

        <button>Analyze My Resume</button>

        <div className="hero-features">
           <span>✓ Resume Analysis</span>
           <span>✓ Job Matching</span>
           <span>✓ AI Suggestions</span>
        </div>

      </section>

      <section className="how-it-works">
       <p className="section-tag">HOW IT WORKS</p>
       <h2>From Resume to Insights in 3 Steps</h2>

       <p className="section-description">
       Upload your resume, add a job description, and let AI identify
      your strengths and skill gaps.
      </p>

      <div className="steps">

  <div className="step-card">
    <span className="step-number">01</span>
    <h3>Upload Your Resume</h3>
    <p>
      Upload your resume and let our system extract your skills,
      experience, and education.
    </p>
  </div>


  <div className="step-card">
    <span className="step-number">02</span>
    <h3>Add Job Description</h3>
    <p>
      Add the job description you want to apply for so we can
      compare the requirements with your profile.
    </p>
  </div>

  <div className="step-card">
    <span className="step-number">03</span>
    <h3>Get AI Insights</h3>
    <p>
      Get a match score, identify missing skills, and receive
      suggestions to improve your resume.
    </p>
  </div>

</div>

      </section>
      
      <section className="analyzer">

  <p className="section-tag">AI RESUME ANALYZER</p>

  <h2>Analyze Your Resume</h2>

  <p className="section-description">
    Upload your resume and add the job description you want to match it with.
  </p>

  <div className="analyzer-box">

    <div className="upload-area">
      <h3>Upload Your Resume</h3>

      <p>
        Upload your resume in PDF or DOCX format.
      </p>

     <input type="file"accept=".pdf,.docx"onChange={(event) => setResume(event.target.files[0])} />
     {resume && <p>Selected: {resume.name}</p>}
    </div>

    <div className="job-area">
      <h3>Job Description</h3>

      <p>
        Paste the job description here.
      </p>

      <textarea value={jobDescription}onChange={(event) => setJobDescription(event.target.value)}placeholder="Paste the job description..."></textarea>
    </div>
  </div>

<button className="analyze-button"onClick={handleAnalyze}disabled={isLoading}>
  {isLoading ? 'Analyzing...' : 'Analyze with AI'}
</button>
{error && (
  <div className="error-message">
    {error}
  </div>
)}
</section>

{analyzed && (
  <section className="results">
    <p className="section-tag">ANALYSIS RESULTS</p>

    <h2>Resume Analysis Results</h2>

    <div className="score-card">
      <p>RESUME MATCH SCORE</p>
      <div className="score">{analysis.matchScore}%</div>
    </div>

    <div className="skills-grid">
      <div className="result-card">
        <h3>Matching Skills</h3>

        <ul>
          {analysis.matchingSkills.map((skill, index) => (
            <li key={index}>✓ {skill}</li>
          ))}
        </ul>
      </div>

      <div className="result-card">
        <h3>Missing Skills</h3>

        <ul>
          {analysis.missingSkills.map((skill, index) => (
            <li key={index}>✗ {skill}</li>
          ))}
        </ul>
      </div>
    </div>

    <div className="result-card suggestions-card">
      <h3>AI Suggestions</h3>

      <ul>
        {analysis.suggestions.map((suggestion, index) => (
          <li key={index}>→ {suggestion}</li>
        ))}
      </ul>
    </div>
  </section>
)}
     </div>
  )
}

export default App