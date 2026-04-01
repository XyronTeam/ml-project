import { useMemo, useState } from "react";
import { modelSchemas } from "../../data/modelSchemas";
function PredictionForm({ onPredict, isLoading }) {
  const unifiedFields = useMemo(() => {
    const seen = new Map();

    Object.values(modelSchemas).forEach((model) => {
      model.fields.forEach((field) => {
        const normalizedName =
          field.name === "financial_stress"
            ? "Financial Stress"
            : field.name === "Sleep_Duration"
            ? "Sleep Duration"
            : field.name;

        if (!seen.has(normalizedName)) {
          seen.set(normalizedName, {
            ...field,
            name: normalizedName,
            label: field.label || normalizedName,
          });
        }
      });
    });

    return Array.from(seen.values());
  }, []);

  const initialState = unifiedFields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialState);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPredict(formData);
  };

  return (
    <div className="card">
      <h2>Student Assessment Form</h2>
      <p className="section-text">
        Fill in the following information to estimate depression risk.
      </p>

      <form className="prediction-form" onSubmit={handleSubmit}>
        {unifiedFields.map((field) => (
          <label key={field.name}>
            {field.label}

            {field.type === "select" ? (
              <select
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
              >
                <option value="">Select {field.label}</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                step={field.step || undefined}
                placeholder={`Enter ${field.label}`}
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
              />
            )}
          </label>
        ))}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Analyzing..." : "Predict Risk"}
        </button>
      </form>
    </div>
  );
}

export default PredictionForm;