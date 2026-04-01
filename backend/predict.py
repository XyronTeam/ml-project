import os
import joblib
import pandas as pd
import numpy as np

from schemas import MODEL_A_FEATURES, MODEL_B_FEATURES, MODEL_C_FEATURES

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, "saved_models")

# ---------------------------------------------------
# Load models once when server starts
# ---------------------------------------------------
model_a = None
model_b = None
model_c = None

scaler_a = None
scaler_b = None
scaler_c = None

encoder_a = None

def safe_load(filename):
    path = os.path.join(MODELS_DIR, filename)
    if os.path.exists(path):
        return joblib.load(path)
    return None

def load_artifacts():
    global model_a, model_b, model_c
    global scaler_a, scaler_b, scaler_c
    global encoder_a

    model_a = safe_load("model_a.pkl")
    model_b = safe_load("model_b.pkl")
    model_c = safe_load("model_c.pkl")

    scaler_a = safe_load("scaler_a.pkl")
    scaler_b = safe_load("scaler_b.pkl")
    scaler_c = safe_load("scaler_c.pkl")

    encoder_a = safe_load("encoder_a.pkl")


# ---------------------------------------------------
# Map frontend unified fields to each model's expected names
# ---------------------------------------------------
def normalize_input(user_data: dict) -> dict:
    normalized = dict(user_data)

    # shared aliases
    if "Financial Stress" in user_data and "financial_stress" not in normalized:
        normalized["financial_stress"] = user_data["Financial Stress"]

    if "financial_stress" in user_data and "Financial Stress" not in normalized:
        normalized["Financial Stress"] = user_data["financial_stress"]

    if "Sleep Duration" in user_data and "Sleep_Duration" not in normalized:
        normalized["Sleep_Duration"] = user_data["Sleep Duration"]

    if "Sleep_Duration" in user_data and "Sleep Duration" not in normalized:
        normalized["Sleep Duration"] = user_data["Sleep_Duration"]

    return normalized


# ---------------------------------------------------
# Build dataframe with exact feature order
# ---------------------------------------------------
def build_dataframe(user_data: dict, features: list[str]) -> pd.DataFrame:
    row = {feature: user_data.get(feature, None) for feature in features}
    return pd.DataFrame([row])


# ---------------------------------------------------
# Preprocess per model
# IMPORTANT:
# Replace these placeholder steps with your real training preprocessing
# ---------------------------------------------------
def preprocess_model_a(df: pd.DataFrame) -> pd.DataFrame | np.ndarray:
    # TODO: match notebook A exactly
    # Example: categorical encoding + scaling if needed
    if encoder_a is not None:
        # only if your encoder was fitted on the same exact columns
        df = encoder_a.transform(df)

    if scaler_a is not None:
        df = scaler_a.transform(df)

    return df

def preprocess_model_b(df: pd.DataFrame) -> pd.DataFrame | np.ndarray:
    # TODO: match notebook B exactly
    if scaler_b is not None:
        df = scaler_b.transform(df)
    return df

def preprocess_model_c(df: pd.DataFrame) -> pd.DataFrame | np.ndarray:
    # TODO: match notebook C exactly
    if scaler_c is not None:
        df = scaler_c.transform(df)
    return df


# ---------------------------------------------------
# Predict helpers
# ---------------------------------------------------
def predict_single(model, processed_input, fallback_name: str):
    if model is None:
        return {
            "name": fallback_name,
            "prediction": 0,
            "probability": 0.5,
        }

    pred = model.predict(processed_input)[0]

    if hasattr(model, "predict_proba"):
        prob = float(model.predict_proba(processed_input)[0][1])
    else:
        prob = 0.5

    return {
        "name": fallback_name,
        "prediction": int(pred) if str(pred).isdigit() else pred,
        "probability": prob,
    }


# ---------------------------------------------------
# Combine all model predictions into one final response
# ---------------------------------------------------
def combine_results(result_a, result_b, result_c):
    probs = [result_a["probability"], result_b["probability"], result_c["probability"]]
    avg_prob = sum(probs) / len(probs)

    if avg_prob >= 0.7:
        risk = "High Risk"
    elif avg_prob >= 0.4:
        risk = "Moderate Risk"
    else:
        risk = "Low Risk"

    return {
        "risk": risk,
        "confidence": f"{avg_prob * 100:.1f}%",
        "factors": [
            "Stress Level",
            "Academic Pressure",
            "Financial Stress",
        ],
        "note": "This result is an educational estimate and not a medical diagnosis.",
        "details": {
            "model_a_probability": round(result_a["probability"], 4),
            "model_b_probability": round(result_b["probability"], 4),
            "model_c_probability": round(result_c["probability"], 4),
        },
    }


# ---------------------------------------------------
# Main prediction function
# ---------------------------------------------------
def predict_all_models(user_data: dict):
    normalized = normalize_input(user_data)

    df_a = build_dataframe(normalized, MODEL_A_FEATURES)
    df_b = build_dataframe(normalized, MODEL_B_FEATURES)
    df_c = build_dataframe(normalized, MODEL_C_FEATURES)

    processed_a = preprocess_model_a(df_a)
    processed_b = preprocess_model_b(df_b)
    processed_c = preprocess_model_c(df_c)

    result_a = predict_single(model_a, processed_a, "Model A")
    result_b = predict_single(model_b, processed_b, "Model B")
    result_c = predict_single(model_c, processed_c, "Model C")

    final_result = combine_results(result_a, result_b, result_c)
    return final_result