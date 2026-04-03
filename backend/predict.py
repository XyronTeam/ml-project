import os
import joblib
import pandas as pd

from schemas import MODEL_A_FEATURES, MODEL_B_FEATURES, MODEL_C_FEATURES

# ---------------------------------------------------
# Paths
# ---------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, "saved_models")

# ---------------------------------------------------
# Global model artifacts
# ---------------------------------------------------
model_a = None
model_b = None
model_c = None


# ---------------------------------------------------
# Required frontend fields
# These are the clean names that frontend should send
# ---------------------------------------------------
REQUIRED_FRONTEND_FIELDS = [
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
    "gender",
    "physical_activity",
]


# ---------------------------------------------------
# Load helper
# ---------------------------------------------------
def safe_load(filename):
    path = os.path.join(MODELS_DIR, filename)
    if os.path.exists(path):
        return joblib.load(path)
    return None


# ---------------------------------------------------
# Load models once
# ---------------------------------------------------
def load_artifacts():
    global model_a, model_b, model_c

    model_a = safe_load("model_a.pkl")
    model_b = safe_load("model_b.pkl")
    model_c = safe_load("model_c.pkl")

    print("model_a type:", type(model_a), "value:", model_a)
    print("model_b type:", type(model_b), "value:", model_b)
    print("model_c type:", type(model_c), "value:", model_c)

    print("Has predict A:", hasattr(model_a, "predict"))
    print("Has predict B:", hasattr(model_b, "predict"))
    print("Has predict C:", hasattr(model_c, "predict"))

    if hasattr(model_a, "feature_names_in_"):
        print("Model A expects:", list(model_a.feature_names_in_))
    if hasattr(model_b, "feature_names_in_"):
        print("Model B expects:", list(model_b.feature_names_in_))
    if hasattr(model_c, "feature_names_in_"):
        print("Model C expects:", list(model_c.feature_names_in_))

    if model_a is None:
        raise FileNotFoundError("model_a.pkl not found in saved_models")
    if model_b is None:
        raise FileNotFoundError("model_b.pkl not found in saved_models")
    if model_c is None:
        raise FileNotFoundError("model_c.pkl not found in saved_models")

# ---------------------------------------------------
# Validate frontend payload
# ---------------------------------------------------
def validate_input(user_data: dict):
    missing = [
        field for field in REQUIRED_FRONTEND_FIELDS
        if field not in user_data or user_data[field] in [None, ""]
    ]

    if missing:
        raise ValueError(f"Missing required fields: {missing}")


# ---------------------------------------------------
# Normalize frontend field names to model-specific names
# ---------------------------------------------------
def normalize_input(user_data: dict) -> dict:
    gender_value = str(user_data.get("gender", "")).strip().lower()

    gender_female = 1 if gender_value == "female" else 0
    gender_male = 1 if gender_value == "male" else 0

    normalized = {
        # Model A
        "Academic Pressure": user_data.get("academic_pressure"),
        "CGPA": user_data.get("cgpa"),
        "Study Satisfaction": user_data.get("study_satisfaction"),
        "Work/Study Hours": user_data.get("work_study_hours"),

        # Model B
        "motivation": user_data.get("motivation"),
        "concentration": user_data.get("concentration"),
        "self_discipline": user_data.get("self_discipline"),
        "financial_stress": user_data.get("financial_stress"),

        # Model C
        "Age": user_data.get("age"),
        "Sleep_Duration": user_data.get("sleep_duration"),
        "Social_Media_Hours": user_data.get("social_media_hours"),
        "Gender_Female": gender_female,
        "Gender_Male": gender_male,
        "Physical_Activity": user_data.get("physical_activity"),
    }

    return normalized


# ---------------------------------------------------
# Build dataframe with exact feature order
# ---------------------------------------------------
def build_dataframe(user_data: dict, features: list[str]) -> pd.DataFrame:
    row = {feature: user_data.get(feature, None) for feature in features}
    return pd.DataFrame([row])


# ---------------------------------------------------
# Preprocessing for Model A
# ---------------------------------------------------
def preprocess_model_a(df: pd.DataFrame):
    numeric_columns = [
        "Academic Pressure",
        "CGPA",
        "Study Satisfaction",
        "Work/Study Hours",
    ]

    for col in numeric_columns:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce")

    return df


# ---------------------------------------------------
# Preprocessing for Model B
# ---------------------------------------------------
def preprocess_model_b(df: pd.DataFrame):
    numeric_columns = [
        "motivation",
        "concentration",
        "self_discipline",
        "financial_stress",
    ]

    for col in numeric_columns:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce")

    return df


# ---------------------------------------------------
# Preprocessing for Model C
# ---------------------------------------------------
def preprocess_model_c(df: pd.DataFrame):
    numeric_columns = [
        "Age",
        "Sleep_Duration",
        "Social_Media_Hours",
        "Gender_Female",
        "Gender_Male",
        "Physical_Activity",
    ]

    for col in numeric_columns:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce")

    return df


# ---------------------------------------------------
# Predict helper
# ---------------------------------------------------
def predict_single(model, processed_input, model_name: str):
    if model is None:
        raise ValueError(f"{model_name} is not loaded.")

    if not hasattr(model, "predict"):
        raise TypeError(
            f"{model_name} is not a valid model. "
            f"Loaded type: {type(model)} | value: {model}"
        )

    prediction = model.predict(processed_input)[0]

    if hasattr(model, "predict_proba"):
        probability = float(model.predict_proba(processed_input)[0][1])
    else:
        probability = 0.5

    return {
        "name": model_name,
        "prediction": int(prediction) if str(prediction).isdigit() else prediction,
        "probability": round(probability, 4),
    }


# ---------------------------------------------------
# Combine all model outputs into one final result
# ---------------------------------------------------
def combine_results(result_a, result_b, result_c):
    probs = [
        result_a["probability"],
        result_b["probability"],
        result_c["probability"],
    ]

    avg_prob = sum(probs) / len(probs)

    if avg_prob >= 0.7:
        risk = "High Risk"
    elif avg_prob >= 0.4:
        risk = "Moderate Risk"
    else:
        risk = "Low Risk"

    return {
        "risk": risk,
        "confidence": round(avg_prob, 4),
        "confidence_percent": f"{avg_prob * 100:.1f}%",
        "factors": [
            "Academic Pressure",
            "financial_stress",
            "Sleep_Duration",
        ],
        "note": "This result is an educational estimate and not a medical diagnosis.",
    }


# ---------------------------------------------------
# Main function called by app.py
# ---------------------------------------------------
def predict_all_models(user_data: dict):
    validate_input(user_data)

    normalized = normalize_input(user_data)

    df_a = build_dataframe(normalized, MODEL_A_FEATURES)
    df_b = build_dataframe(normalized, MODEL_B_FEATURES)
    df_c = build_dataframe(normalized, MODEL_C_FEATURES)

    print("\n--- Incoming request ---")
    print("Normalized input:", normalized)
    print("DF A:\n", df_a)
    print("DF B:\n", df_b)
    print("DF C:\n", df_c)

    processed_a = preprocess_model_a(df_a)
    processed_b = preprocess_model_b(df_b)
    processed_c = preprocess_model_c(df_c)

    result_a = predict_single(model_a, processed_a, "Model A")
    result_b = predict_single(model_b, processed_b, "Model B")
    result_c = predict_single(model_c, processed_c, "Model C")

    final_result = combine_results(result_a, result_b, result_c)

    return {
        "final_result": final_result,
        "individual_results": {
            "model_a": result_a,
            "model_b": result_b,
            "model_c": result_c,
        }
    }