# Student Mental Health Analysis - Data Science & Machine Learning 

**Multi-Dataset Analysis of Student Mental Health using Exploratory Data Analysis, Statistical Testing, and Predictive Modeling**

---

## 📋 Project Overview

This project performs a **comprehensive data science and machine learning study** on **student mental health** using **3 independent datasets** from different sources and domains:
- Academic performance and pressure metrics
- Lifestyle and daily habits data
- Mental health and psychological indicators
- Socioeconomic factors

We conduct parallel exploratory analyses on each dataset, identify statistically significant factors, extract common important features, merge datasets, and build a unified predictive model.

**Goal:** Understand the multifaceted factors contributing to student mental health through data-driven analysis and develop a predictive framework.

---

## 🎯 Methodology

**Why Multiple Datasets?**
- Single dataset may be biased toward one domain
- Combining diverse sources provides **holistic view** of student mental health
- Common factors across datasets indicate **true underlying patterns**
- Increases model robustness and generalizability
- Validates findings across independent data sources

---

## 📊 Project Architecture & Workflow

```
ml-project2/
│
├── data/
│   └── datasets/                               # 3 independent datasets from different sources
│
├── src/
│   ├── dataset_analysis/                       # Individual dataset analyses
│   │   ├── analysis_1.ipynb                    # Dataset 1: Full EDA + Statistical Analysis
│   │   ├── analysis_2.ipynb                    # Dataset 2: Full EDA + Statistical Analysis
│   │   └── analysis_3.ipynb                    # Dataset 3: Full EDA + Statistical Analysis
│   │
│   └── merged_analysis/                        # Combined dataset analysis
│       ├── feature_comparison.ipynb            # Compare features across datasets
│       ├── feature_selection.ipynb             # Select common important features
│       └── final_model.ipynb                   # Final model on merged data
│
├── frontend/                                    # Web interface for predictions
├── requirements.txt                            # Dependencies
└── README.md                                   # You are here
```

---

## 🔄 Analysis Workflow

```
┌─────────────────────────────────────────────────┐
│  STAGE 1: INDEPENDENT DATASET ANALYSIS (PARALLEL)
│  ─────────────────────────────────────────────────
│  • Dataset 1 → Full EDA + Statistical Testing
│  • Dataset 2 → Full EDA + Statistical Testing
│  • Dataset 3 → Full EDA + Statistical Testing
│  
│  Output: Key features, correlations, insights per dataset
└──────────────┬────────────────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────────────┐
│  STAGE 2: CROSS-DATASET FEATURE ANALYSIS
│  ─────────────────────────────────────────────────
│  • Compare important features across 3 datasets
│  • Identify overlapping & common patterns
│  
│  Output: Common feature set
└──────────────┬────────────────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────────────┐
│  STAGE 3: DATA MERGING & UNIFIED MODELING
│  ─────────────────────────────────────────────────
│  • Align and merge datasets on common features
│  • Train predictive model on combined data
│  • Validate across all datasets
│  • Evaluate generalization
│  
│  Output: Final ML model
└──────────────┬────────────────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────────────┐
│  STAGE 4: DEPLOYMENT & APPLICATION
│  ─────────────────────────────────────────────────
│  • Build web interface
│  • Create API endpoints
│  • Deploy predictive model
│  
│  Output: Interactive prediction system
└─────────────────────────────────────────────────┘
```

---

##  Project Deliverables

### Data Science Analysis (Each Dataset)
- **Exploratory Data Analysis (EDA)**
  - Univariate analysis: Distributions, normality tests
  - Bivariate analysis: Feature-target associations
  - Correlation and multivariate relationships
  
- **Statistical Testing**
  - Hypothesis testing 
  - Significance assessment
  
- **Feature Engineering**
  - Data cleaning and preprocessing
  - Feature encoding (one-hot, ordinal, numerical)
  - Outlier detection and treatment
  
- **Machine Learning Models**
  - Random Forest Classifier, Logistic Regression or others.
  - Model evaluation (Accuracy, Precision, Recall, AUC-ROC)
  - Feature importance analysis

- **Risk Profiling**
  - Student segmentation (Low/Moderate/High risk)
  - Critical factor combinations
  - Actionable insights

### Cross-Dataset Analysis
- Feature comparison across datasets
- Common important factors identification
- Consensus feature selection

### Unified Model
- Merged dataset training
- Performance validation
- Generalization assessment

---

## 📊 Datasets Information

| Dataset | Link | Domain Coverage |
|---------|--------|-----------------|
| Dataset 1 | [Student Mental Health Dataset](https://github.com/user-attachments/files/26166744/student_depression_dataset.csv) | Academic and lifestyle
| Dataset 2 | [To be added] | Habits & Academic Performance
| Dataset 3 | [To be added] | Lifestyle

---

## 🔑 Analysis Approach

**Stage 1: Individual Dataset Analysis**
Each dataset shows comprehensive analysis following the same methodology:
1. Data profiling and quality assessment
2. Exploratory data analysis (univariate, bivariate, multivariate)
3. Statistical significance testing
4. Feature engineering and preprocessing
5. Machine learning model development
6. Feature importance identification

**Stage 2: Cross-Dataset Synthesis**
- Aggregate findings across all 3 datasets
- Identify common significant factors
- Extract consensus features

**Stage 3: final Modeling**
- Merge datasets on common feature set
- Train single integrated model
- Validate performance across original datasets
- Assess generalization capability

**Expected Outcome:**
A robust predictive model capturing student mental health patterns across academic, lifestyle, and psychological domains.

---

## 💻 Installation & Setup

### 1. Clone Repository
```bash
git clone <repo-url>
cd ml-project2
```

### 2. Create Virtual Environment
```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Datasets Location
Place all 3 datasets in `data/` folder with descriptive names by source/domain (to match the path in notebooks).

---

## 🔍 Project Structure & How to Navigate

### Analysis Notebooks
- **`src/`** - Individual exploratory analyses
  - Each follows same methodology: EDA → Statistics → ML → Insights
  - Produces feature rankings and important factors
  
- **`src/merged_analysis/`** - Cross-dataset synthesis
  - Feature comparison across datasets
  - Unified model training and validation

### Data Directory
- **`data/`** - Store all 3 datasets here
  - Organized by source/domain
  - Links provided in Datasets section

---

## 📈 Key Steps in Each Analysis

1. **Data Profiling** - Structure, types, quality assessment
2. **Exploratory Analysis** - Distributions, relationships, patterns
3. **Statistical Testing** - Significance and effect sizes
4. **Correlation Analysis** - Feature relationships
5. **Feature Engineering** - Preparation for ML
6. **Model Development** - Multiple algorithms compared
7. **Feature Ranking** - Identify most important factors
8. **Risk Assessment** - Student segmentation and profiling

---

## 📊 Expected Final Outputs

**Analysis Reports:**
- Comprehensive analysis for each dataset
- Feature importance rankings
- Statistical test results
- ML model performance metrics

**Cross-Dataset Synthesis:**
- Feature comparison matrix
- Common factors across domains
- Consensus feature set

**Unified Model:**
- Merged dataset architecture
- Final predictive model
- Validation results
- Generalization assessment

**Application:**
- Web interface for predictions
- API for model inference
- User-friendly reporting

---

## 📖 How to Use This Repository

### For Data Exploration
1. Navigate to `src/`
2. Open individual analysis notebooks
3. Review findings, visualizations, and insights

### For Understanding the Process
1. Start with **Stage 1:** Individual dataset analyses
2. Review **Stage 2:** Feature comparison methodology
3. Study **Stage 3:** Unified model approach

### For Predictions
1. Once deployed, use web interface
2. Enter student characteristics
3. Receive risk assessment and supporting factors

---

##  Scientific Approach

This project follows rigorous data science methodology:
- ✓ Multiple independent datasets reduce bias
- ✓ Statistical testing validates findings
- ✓ Cross-dataset analysis ensures generalization
- ✓ Parallel processing accelerates timeline
- ✓ Reproducible workflows enable collaboration

---

## 📝 License & Contributing

- **License:** See [LICENSE](LICENSE)
- **Contributing Guidelines:** See [CONTRIBUTING.md](CONTRIBUTING.md)

---

**Last Updated:** March 29, 2026  
**Status:** 🔄 Active Development
