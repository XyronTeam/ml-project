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

  const sliderFields = [
    "academic_pressure",
    "study_satisfaction",
    "motivation",
    "concentration",
    "self_discipline",
    "financial_stress",
  ];

  const numericFieldRules = {
    academic_pressure: { min: 1, max: 5, step: 1 },
    work_study_hours: { min: 0, max: 12, step: 0.5 },
    cgpa: { min: 0, max: 10, step: 0.01 },
    study_satisfaction: { min: 0, max: 5, step: 1 },
    motivation: { min: 1, max: 10, step: 1 },
    concentration: { min: 1, max: 10, step: 1 },
    self_discipline: { min: 1, max: 10, step: 1 },
    financial_stress: { min: 1, max: 10, step: 1 },
    age: { min: 18, max: 24, step: 1 },
    sleep_duration: { min: 3, max: 12, step: 0.5 },
    social_media_hours: { min: 0, max: 10, step: 0.5 },
    physical_activity: { min: 0, max: 149, step: 1 },
  };

  const initialState = useMemo(() => {
    return unifiedFields.reduce((acc, field) => {
      if (sliderFields.includes(field.name)) {
        acc[field.name] = numericFieldRules[field.name]?.min ?? 0;
      } else {
        acc[field.name] = "";
      }
      return acc;
    }, {});
  }, [unifiedFields]);

  const [formData, setFormData] = useState(initialState);

   const helperText = {
  academic_pressure: "Choose a value from 1 to 5.",
  study_satisfaction: "Choose a value from 0 to 5.",
  motivation: "Choose a value from 1 to 10.",
  concentration: "Choose a value from 1 to 10.",
  self_discipline: "Choose a value from 1 to 10.",
  financial_stress: "Choose a value from 1 to 10.",
  age: "Allowed range: 18 to 24 years.",
  sleep_duration: "Average hours of sleep per day: 3 to 12.",
  social_media_hours: "Average hours spent on social media per day: 0 to 10.",
  physical_activity: "Average minutes of physical activity per week: 0 to 149.",
  work_study_hours: "Average work/study hours per day: 0 to 12.",
  cgpa: "Allowed range: 0 to 10.",
};

  const fieldNeedsNumber = (name) => {
    return Object.keys(numericFieldRules).includes(name);
  };

  const clampValue = (name, value) => {
    if (value === "") return "";

    const rules = numericFieldRules[name];
    if (!rules) return value;

    let numericValue = Number(value);

    if (Number.isNaN(numericValue)) return "";

    if (rules.min !== undefined && numericValue < rules.min) {
      numericValue = rules.min;
    }

    if (rules.max !== undefined && numericValue > rules.max) {
      numericValue = rules.max;
    }

    return numericValue;
  };

  const handleChange = (name, value) => {
    if (fieldNeedsNumber(name)) {
      const finalValue = clampValue(name, value);
      setFormData((prev) => ({
        ...prev,
        [name]: finalValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
      .map((name) => {
        if (name === "gender") {
          return {
            name: "gender",
            label: "Gender",
            type: "select",
            options: ["Female", "Male"],
          };
        }

        return unifiedFields.find((field) => field.name === name);
      })
      .filter(Boolean);
  };

  const lifestyleFields = getFieldsBySection(sectionOrder.lifestyle);
  const behavioralFields = getFieldsBySection(sectionOrder.behavioral);
  const academicFields = getFieldsBySection(sectionOrder.academic);

  const formatLabel = (label) =>
    label.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  const renderSliderField = (field) => {
    const rules = numericFieldRules[field.name] || {};
    const currentValue = formData[field.name];

    return (
      <div className="form-group" key={field.name}>
        <label htmlFor={field.name} className="field-label">
          {formatLabel(field.label || field.name)}
          <span className="required-star"> *</span>
        </label>

        {helperText[field.name] && (
          <p className="field-helper">{helperText[field.name]}</p>
        )}

        <div className="slider-header">
          <span className="slider-min">{rules.min}</span>
          <span className="slider-value">{currentValue}</span>
          <span className="slider-max">{rules.max}</span>
        </div>

        <input
          id={field.name}
          type="range"
          min={rules.min}
          max={rules.max}
          step={rules.step || 1}
          value={currentValue}
          onChange={(e) => handleChange(field.name, e.target.value)}
          required
          className="range-slider"
        />
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
            <option value="">Select Gender</option>
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
            step={rules.step || 1}
            placeholder={`Enter ${formatLabel(field.label || field.name)}`}
            value={formData[field.name] ?? ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            required
          />
        )}
      </div>
    );
  };

  const renderFields = (fields) =>
    fields.map((field) =>
      sliderFields.includes(field.name)
        ? renderSliderField(field)
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