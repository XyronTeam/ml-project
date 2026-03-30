import PredictionForm from "./components/PredictionForm";
import ResultCard from "./components/ResultCard";
import "./index.css";

function App() {
  const mockResult = {
    risk: "Moderate Risk",
    confidence: "78%",
    factors: ["Low physical activity", "High phone usage", "Low attendance"],
  };

  return (
    <div className="app-container">
      <header className="hero">
        <h1>Student Depression Risk Prediction</h1>
        <p>
          A machine learning-based tool that estimates depression risk using
          academic, behavioral, and lifestyle indicators.
        </p>
        <span className="disclaimer">
          This tool is for educational purposes only and is not a medical diagnosis.
        </span>
      </header>

      <main className="dashboard">
        <PredictionForm />
        <ResultCard result={mockResult} />
      </main>
    </div>
  );
}

export default App;