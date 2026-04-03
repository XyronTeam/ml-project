import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import PredictionForm from "./components/PredictionForm";
import ResultSummary from "./components/ResultSummary";
import "./index.css";

function HomePage({ onPredict, isLoading }) {
  return (
    <div className="app-container">
      <header className="hero-section">
        <h1>Student Depression Risk Prediction</h1>
        <p>
          A machine learning-based tool that estimates depression risk using
          academic, behavioral, and lifestyle indicators.
        </p>
        <span className="disclaimer">
          This tool is for educational purposes only and is not a medical
          diagnosis.
        </span>
      </header>

      <main className="main-layout single-page-layout">
        <PredictionForm onPredict={onPredict} isLoading={isLoading} />
      </main>
    </div>
  );
}

function ResultPage() {
  return (
    <div className="app-container">
      <header className="hero-section">
        <h1>Student Depression Risk Prediction</h1>
        <p>Your prediction result is shown below.</p>
        <span className="disclaimer">
          This tool is for educational purposes only and is not a medical
          diagnosis.
        </span>
      </header>

      <main className="main-layout result-page-layout">
        <ResultSummary />
      </main>
    </div>
  );
}

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = async (formData) => {
    setIsLoading(true);

    try {
      console.log("Submitted form data:", formData);

      const response = await fetch("http://127.0.0.1:5000/predict-all", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Prediction failed");
      }

      navigate("/result", {
        state: { result: data },
      });
    } catch (error) {
      console.error("Prediction error:", error);

      navigate("/result", {
        state: {
          result: {
            final_result: {
              risk: "Error",
              confidence_percent: "-",
              factors: [],
              note: error.message || "Something went wrong",
            },
            individual_results: {},
          },
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage onPredict={handlePredict} isLoading={isLoading} />}
      />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  );
}

export default App;