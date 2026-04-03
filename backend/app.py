from flask import Flask, request, jsonify
from flask_cors import CORS

from predict import load_artifacts, predict_all_models

app = Flask(__name__)
CORS(app)

load_artifacts()

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Backend is running successfully"}), 200


@app.route("/predict-all", methods=["POST"])
def predict_all():
    try:
        user_data = request.get_json()

        if not user_data:
            return jsonify({"error": "No input data provided"}), 400

        result = predict_all_models(user_data)
        return jsonify(result), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 400

    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(debug=True)