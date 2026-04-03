export const modelSchemas = {
  modelA: {
    fields: [
      {
        name: "academic_pressure",
        label: "Academic Pressure",
        type: "number",
        step: "any",
      },
      {
        name: "cgpa",
        label: "CGPA",
        type: "number",
        step: "any",
      },
      {
        name: "study_satisfaction",
        label: "Study Satisfaction",
        type: "number",
        step: "any",
      },
      {
        name: "work_study_hours",
        label: "Work/Study Hours",
        type: "number",
        step: "any",
      },
    ],
  },

  modelB: {
    fields: [
      {
        name: "motivation",
        label: "Motivation",
        type: "number",
        step: "any",
      },
      {
        name: "concentration",
        label: "Concentration",
        type: "number",
        step: "any",
      },
      {
        name: "self_discipline",
        label: "Self Discipline",
        type: "number",
        step: "any",
      },
      {
        name: "financial_stress",
        label: "Financial Stress",
        type: "number",
        step: "any",
      },
    ],
  },

  modelC: {
    fields: [
      {
        name: "age",
        label: "Age",
        type: "number",
        step: "1",
      },
      {
        name: "sleep_duration",
        label: "Sleep Duration",
        type: "number",
        step: "any",
      },
      {
        name: "social_media_hours",
        label: "Social Media Hours",
        type: "number",
        step: "any",
      },
      {
        name: "gender",
        label: "Gender",
        type: "select",
        options: ["male", "female"],
      },
      {
        name: "physical_activity",
        label: "Physical Activity",
        type: "number",
        step: "any",
      },
    ],
  },
};