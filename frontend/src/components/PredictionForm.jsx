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

  const initialState = useMemo(() => {
    return unifiedFields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {});
  }, [unifiedFields]);

  const [formData, setFormData] = useState(initialState);

  const likertFields = [
    "academic_pressure",
    "study_satisfaction",
    "motivation",
    "concentration",
    "self_discipline",
    "financial_stress",
  ];

  const numericFieldRules = {
    academic_pressure: { min: 1, max: 5 },
    work_study_hours: { min: 0, max: 24 },
    cgpa: { min: 0, max: 4, step: 0.01 },
    study_satisfaction: { min: 1, max: 5 },
    motivation: { min: 1, max: 5 },
    concentration: { min: 1, max: 5 },
    self_discipline: { min: 1, max: 5 },
    financial_stress: { min: 1, max: 5 },
    age: { min: 15, max: 100 },
    sleep_duration: { min: 0, max: 24, step: 0.1 },
    social_media_hours: { min: 0, max: 24, step: 0.1 },
    physical_activity: { min: 0, max: 24, step: 0.1 },
  };

  const likertLabelsMap = {
    academic_pressure: [
      { value: 1, label: "Very Low" },
      { value: 2, label: "Low" },
      { value: 3, label: "Moderate" },
      { value: 4, label: "High" },
      { value: 5, label: "Very High" },
    ],
    financial_stress: [
      { value: 1, label: "None" },
      { value: 2, label: "Low" },
      { value: 3, label: "Moderate" },
      { value: 4, label: "High" },
      { value: 5, label: "Severe" },
    ],
    concentration: [
      { value: 1, label: "Very Poor" },
      { value: 2, label: "Poor" },
      { value: 3, label: "Average" },
      { value: 4, label: "Good" },
      { value: 5, label: "Excellent" },
    ],
    self_discipline: [
      { value: 1, label: "Very Weak" },
      { value: 2, label: "Weak" },
      { value: 3, label: "Moderate" },
      { value: 4, label: "Strong" },
      { value: 5, label: "Very Strong" },
    ],
    study_satisfaction: [
      { value: 1, label: "Very Unsatisfied" },
      { value: 2, label: "Unsatisfied" },
      { value: 3, label: "Neutral" },
      { value: 4, label: "Satisfied" },
      { value: 5, label: "Very Satisfied" },
    ],
    motivation: [
      { value: 1, label: "Very Low" },
      { value: 2, label: "Low" },
      { value: 3, label: "Moderate" },
      { value: 4, label: "High" },
      { value: 5, label: "Very High" },
    ],
  };

  const helperText = {
    academic_pressure: "Select the level that best describes your academic pressure.",
    study_satisfaction: "Select the level that best describes your study satisfaction.",
    motivation: "Select the level that best describes your motivation.",
    concentration: "Select the level that best describes your concentration.",
    self_discipline: "Select the level that best describes your self-discipline.",
    financial_stress: "Select the level that best describes your financial stress.",
    age: "Enter age between 15 and 100.",
    sleep_duration: "Enter average daily sleep hours between 0 and 24.",
    social_media_hours: "Enter average daily social media hours between 0 and 24.",
    physical_activity: "Enter average daily physical activity hours between 0 and 24.",
    work_study_hours: "Enter average daily work/study hours between 0 and 24.",
    cgpa: "Enter CGPA between 0 and 4.",
  };

  const fieldNeedsNumber = (name) => {
    return Object.keys(numericFieldRules).includes(name);
  };

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

  const sectionOrder = {
    lifestyle: [
      "age",
      "gender",
      "sleep_duration",
      "social_media_hours",
      "physical_activity",
    ],
    behavioral: [
      "motivation",
      "concentration",
      "self_discipline",
      "financial_stress",
    ],
    academic: [
      "academic_pressure",
      "study_satisfaction",
      "cgpa",
      "work_study_hours",
    ],
  };

  const getFieldsBySection = (fieldNames) => {
    return fieldNames
      .map((name) => unifiedFields.find((field) => field.name === name))
      .filter(Boolean);
  };

  const lifestyleFields = getFieldsBySection(sectionOrder.lifestyle);
  const behavioralFields = getFieldsBySection(sectionOrder.behavioral);
  const academicFields = getFieldsBySection(sectionOrder.academic);

  const formatLabel = (label) =>
    label.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  const renderLikertField = (field) => {
    const options = likertLabelsMap[field.name] || [
      { value: 1, label: "Very Low" },
      { value: 2, label: "Low" },
      { value: 3, label: "Moderate" },
      { value: 4, label: "High" },
      { value: 5, label: "Very High" },
    ];

    return (
      <div className="form-group" key={field.name}>
        <label htmlFor={field.name} className="field-label">
          {formatLabel(field.label || field.name)}
          <span className="required-star"> *</span>
        </label>

        <p className="field-helper">{helperText[field.name]}</p>

        <div
          className="likert-scale"
          role="radiogroup"
          aria-label={formatLabel(field.label || field.name)}
        >
          {options.map((option) => {
            const isSelected = Number(formData[field.name]) === option.value;

            return (
              <button
                key={option.value}
                type="button"
                className={`likert-option ${isSelected ? "selected" : ""}`}
                onClick={() => handleChange(field.name, option.value)}
                aria-pressed={isSelected}
              >
                <span className="likert-circle" />
                <span className="likert-text">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderRegularField = (field) => {
    const rules = numericFieldRules[field.name] || {};

    return (
      <div className="form-group" key={field.name}>
        <label htmlFor={field.name} className="field-label">
          {formatLabel(field.label || field.name)}
          <span className="required-star"> *</span>
        </label>

        {helperText[field.name] && (
          <p className="field-helper">{helperText[field.name]}</p>
        )}

        {field.type === "select" ? (
          <select
            id={field.name}
            value={formData[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            required
          >
            <option value="">
              Select {formatLabel(field.label || field.name)}
            </option>
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={field.name}
            type="number"
            min={rules.min}
            max={rules.max}
            step={rules.step || "1"}
            placeholder={`Enter ${formatLabel(field.label || field.name)}`}
            value={formData[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            required
          />
        )}
      </div>
    );
  };

  const renderFields = (fields) =>
    fields.map((field) =>
      likertFields.includes(field.name)
        ? renderLikertField(field)
        : renderRegularField(field)
    );

  return (
    <div className="card">
      <h2>Student Assessment Form</h2>
      <p className="section-text">
        Fill in the following information to estimate depression risk.
      </p>

      <form className="prediction-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Lifestyle Information</h3>
          {renderFields(lifestyleFields)}
        </div>

        <div className="form-section">
          <h3>Behavioral Information</h3>
          {renderFields(behavioralFields)}
        </div>

        <div className="form-section">
          <h3>Academic Information</h3>
          {renderFields(academicFields)}
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Analyzing..." : "Predict Risk"}
        </button>
      </form>
    </div>
  );
}

export default PredictionForm;