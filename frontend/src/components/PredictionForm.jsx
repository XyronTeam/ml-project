import { useMemo, useState } from "react";
import { modelSchemas } from "../../data/modelSchemas";

function PredictionForm({ onPredict, isLoading }) {
  const unifiedFields = useMemo(() => {
    const seen = new Map();

    Object.values(modelSchemas).forEach((model) => {
      model.fields.forEach((field) => {
        if (!seen.has(field.name)) {
          seen.set(field.name, {
            ...field,
            label: field.label || field.name,
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
      [name]: fieldNeedsNumber(name) && value !== "" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPredict(formData);
  };

  const fieldNeedsNumber = (name) => {
    const numberFields = [
      "academic_pressure",
      "cgpa",
      "study_satisfaction",
      "work_study_hours",
      "motivation",
      "concentration",
      "self_discipline",
      "financial_stress",
      "age",
      "sleep_duration",
      "social_media_hours",
      "physical_activity",
    ];

    return numberFields.includes(name);
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