function ResultCard({ result }) {
  return (
    <div className="card result-card">
      <h2>Prediction Result</h2>

      <div className="result-box">
        <p>
          <strong>Risk Level:</strong> {result.risk}
        </p>
        <p>
          <strong>Confidence:</strong> {result.confidence}
        </p>

        <div className="factors">
          <strong>Key Contributing Factors:</strong>
          <ul>
            {result.factors.map((factor, index) => (
              <li key={index}>{factor}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;