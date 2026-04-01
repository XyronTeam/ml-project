function ResultSummary({ result }) {
  return (
    <div className="card result-summary-card">
      <h2>Prediction Result</h2>

      {!result ? (
        <div className="result-box empty-state">
          <p>Your prediction result will appear here after you submit the form.</p>
        </div>
      ) : (
        <div className="result-box">
          <p>
            <strong>Risk Level:</strong> {result.risk}
          </p>
          <p>
            <strong>Confidence:</strong> {result.confidence}
          </p>

          {result.factors?.length > 0 && (
            <div className="factors">
              <strong>Main Contributing Factors:</strong>
              <ul>
                {result.factors.map((factor, index) => (
                  <li key={index}>{factor}</li>
                ))}
              </ul>
            </div>
          )}

          {result.note && <p className="result-note">{result.note}</p>}
        </div>
      )}
    </div>
  );
}

export default ResultSummary;