import { useLocation, useNavigate } from "react-router-dom";

function ResultSummary() {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state?.result;

  const formatPredictionLabel = (prediction) => {
    if (prediction === 1) return "At Risk";
    if (prediction === 0) return "Lower Risk";
    return "Unavailable";
  };

  const formatProbability = (probability) => {
    if (probability === undefined || probability === null || probability === "-") {
      return "Unavailable";
    }

    const numericValue = Number(probability);

    if (Number.isNaN(numericValue)) {
      return "Unavailable";
    }

    return `${(numericValue * 100).toFixed(1)}%`;
  };

  if (!result) {
    return (
      <div className="card result-summary-card">
        <h2>Prediction Result</h2>
        <div className="result-box empty-state">
          <p>No prediction result found.</p>
          <button className="back-button" onClick={() => navigate("/")}>
            Back to Form
          </button>
        </div>
      </div>
    );
  }

  const finalResult = result.final_result || {};
  const individualResults = result.individual_results || {};

  const modelCards = [
    {
      title: "Education Indicators",
      data: individualResults.model_a,
    },
    {
      title: "Behavior Indicators",
      data: individualResults.model_b,
    },
    {
      title: "Lifestyle Indicators",
      data: individualResults.model_c,
    },
  ];

  return (
    <div className="card result-summary-card">
      <h2>Prediction Result</h2>

      <div className="result-box">
        <p>
          <strong>Overall Risk Level:</strong>{" "}
          {finalResult.risk || "Unavailable"}
        </p>

        <p>
          <strong>Combined Risk Score:</strong>{" "}
          {finalResult.confidence_percent || "Unavailable"}
        </p>

        {finalResult.note && <p className="result-note">{finalResult.note}</p>}
      </div>

      <div className="individual-models">
        <h3>Prediction by Category</h3>

        <div className="model-results-grid">
          {modelCards.map((model, index) => (
            <div className="model-card" key={index}>
              <h4>{model.title}</h4>

              <p>
                <strong>Result:</strong>{" "}
                {formatPredictionLabel(model.data?.prediction)}
              </p>

              <p>
                <strong>Risk Score:</strong>{" "}
                {formatProbability(model.data?.probability)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <button className="back-button" onClick={() => navigate("/")}>
        Back to Form
      </button>
    </div>
  );
}

export default ResultSummary;