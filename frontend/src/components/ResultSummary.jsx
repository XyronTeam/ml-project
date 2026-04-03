function ResultSummary({ result }) {
  if (!result) {
    return (
      <div className="card result-summary-card">
        <h2>Prediction Result</h2>
        <div className="result-box empty-state">
          <p>Your prediction result will appear here after you submit the form.</p>
        </div>
      </div>
    );
  }

  const finalResult = result.final_result || {};
  const individualResults = result.individual_results || {};

  return (
    <div className="card result-summary-card">
      <h2>Prediction Result</h2>

      <div className="result-box">
        <p>
          <strong>Risk Level:</strong> {finalResult.risk}
        </p>
        <p>
          <strong>Confidence:</strong> {finalResult.confidence_percent}
        </p>

        {finalResult.factors?.length > 0 && (
          <div className="factors">
            <strong>Main Contributing Factors:</strong>
            <ul>
              {finalResult.factors.map((factor, index) => (
                <li key={index}>{factor}</li>
              ))}
            </ul>
          </div>
        )}

        {finalResult.note && <p className="result-note">{finalResult.note}</p>}

        <hr />

        <div className="individual-models">
          <h3>Individual Model Results</h3>

          <p>
            <strong>Model A:</strong> Prediction ={" "}
            {individualResults.model_a?.prediction}, Probability ={" "}
            {individualResults.model_a?.probability}
          </p>

          <p>
            <strong>Model B:</strong> Prediction ={" "}
            {individualResults.model_b?.prediction}, Probability ={" "}
            {individualResults.model_b?.probability}
          </p>

          <p>
            <strong>Model C:</strong> Prediction ={" "}
            {individualResults.model_c?.prediction}, Probability ={" "}
            {individualResults.model_c?.probability}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResultSummary;