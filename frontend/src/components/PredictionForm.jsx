function PredictionForm() {
  return (
    <div className="card">
      <h2>Student Assessment Form</h2>

      <form className="prediction-form">
        <h3>General Information</h3>

        <label>
          Age
          <input type="number" placeholder="Enter age" />
        </label>

        <label>
          Gender
          <select>
            <option value="">Select gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Prefer not to say</option>
          </select>
        </label>

        <label>
          Academic Year
          <select>
            <option value="">Select academic year</option>
            <option>First Year</option>
            <option>Second Year</option>
            <option>Third Year</option>
            <option>Fourth Year</option>
            <option>Graduate</option>
          </select>
        </label>

        <label>
          Major / Department
          <input type="text" placeholder="Enter major or department" />
        </label>

        <label>
          Marital Status
          <select>
            <option value="">Select marital status</option>
            <option>Single</option>
            <option>Married</option>
            <option>Other</option>
          </select>
        </label>

        <label>
          City / Area
          <input type="text" placeholder="Enter city or area" />
        </label>

        <h3>Model Input Indicators</h3>

        <label>
          Family Income
          <input type="number" placeholder="Enter family income" />
        </label>

        <label>
          Parental Education Level
          <select>
            <option value="">Select education level</option>
            <option>High School</option>
            <option>Diploma</option>
            <option>Bachelor</option>
            <option>Master</option>
            <option>PhD</option>
          </select>
        </label>

        <label>
          Hostel Student
          <select>
            <option value="">Select option</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </label>

        <label>
          Physical Activity
          <input type="number" placeholder="Hours per week" />
        </label>

        <label>
          Attendance
          <input type="number" placeholder="Attendance percentage" />
        </label>

        <label>
          Study Hours
          <input type="number" placeholder="Hours per day" />
        </label>

        <label>
          Class Participation
          <input type="number" placeholder="Rate or score" />
        </label>

        <label>
          Part-Time Hours
          <input type="number" placeholder="Hours per week" />
        </label>

        <label>
          Junk Food Frequency
          <input type="number" placeholder="Times per week" />
        </label>

        <label>
          Phone Unlocks Per Day
          <input type="number" placeholder="Number of unlocks" />
        </label>

        <button type="button">Predict Risk</button>
      </form>
    </div>
  );
}

export default PredictionForm;