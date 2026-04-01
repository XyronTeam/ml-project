export const modelSchemas = {
  modelA: {
    fields: [
      { name: "Age", label: "Age", type: "number" },
      { name: "Academic Pressure", label: "Academic Pressure", type: "number" },
      { name: "CGPA", label: "CGPA", type: "number", step: "0.01" },
      { name: "Study Satisfaction", label: "Study Satisfaction", type: "number" },
      { name: "Work/Study Hours", label: "Work / Study Hours", type: "number" },
      { name: "Financial Stress", label: "Financial Stress", type: "number" },
      {
        name: "Sleep Duration",
        label: "Sleep Duration",
        type: "select",
        options: ["Less than 5 hours", "5-6 hours", "7-8 hours", "More than 8 hours"],
      },
      {
        name: "Dietary Habits",
        label: "Dietary Habits",
        type: "select",
        options: ["Healthy", "Moderate", "Unhealthy"],
      },
      {
        name: "Have you ever had suicidal thoughts ?",
        label: "Suicidal Thoughts History",
        type: "select",
        options: ["Yes", "No"],
      },
      {
        name: "Family History of Mental Illness",
        label: "Family History of Mental Illness",
        type: "select",
        options: ["Yes", "No"],
      },
      { name: "Degree", label: "Degree", type: "text" },
    ],
  },

  modelB: {
    fields: [
      { name: "motivation", label: "Motivation", type: "number" },
      { name: "concentration", label: "Concentration", type: "number" },
      { name: "self_discipline", label: "Self Discipline", type: "number" },
      { name: "financial_stress", label: "Financial Stress", type: "number" },
    ],
  },

  modelC: {
    fields: [
      { name: "Stress_Level", label: "Stress Level", type: "number" },
      { name: "Age", label: "Age", type: "number" },
      { name: "CGPA", label: "CGPA", type: "number" },
      { name: "Sleep_Duration", label: "Sleep Duration (Hours)", type: "number" },
      { name: "Social_Media_Hours", label: "Social Media Hours", type: "number" },
      { name: "Study_Hours", label: "Study Hours", type: "number" },
      { name: "Physical_Activity", label: "Physical Activity", type: "number" },
    ],
  },
};