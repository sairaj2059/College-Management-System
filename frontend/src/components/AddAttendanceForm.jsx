import React, { useState } from "react";
import TeacherDashboardService from "../services/TeacherDashboardservice";


const AddAttendanceForm = () => {
  const [formData, setFormData] = useState({
    className: "",
    regdNo: "",
    name: "",
    month: "",
    totalWorkingDays: "",
    daysPresent: "",
    daysAbsent: "",
    absentDays: [{ date: "", reason: "" }],
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle absent day changes
  const handleAbsentDayChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAbsentDays = [...formData.absentDays];
    updatedAbsentDays[index][name] = value;
    setFormData({ ...formData, absentDays: updatedAbsentDays });
  };

  // Add new absent day field
  const addAbsentDay = () => {
    setFormData({
      ...formData,
      absentDays: [...formData.absentDays, { date: "", reason: "" }],
    });
  };

  // Remove absent day field
  const removeAbsentDay = (index) => {
    const updatedAbsentDays = formData.absentDays.filter((_, i) => i !== index);
    setFormData({ ...formData, absentDays: updatedAbsentDays });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const attendanceData = {
      className: formData.className,
      students: [
        {
          regdNo: formData.regdNo,
          name: formData.name,
          attendance: [
            {
              month: formData.month,
              totalWorkingDays: parseInt(formData.totalWorkingDays),
              daysPresent: parseInt(formData.daysPresent),
              daysAbsent: parseInt(formData.daysAbsent),
              absentDays: formData.absentDays,
            },
          ],
        },
      ],
    };

    const response = await TeacherDashboardService.addAttendance(attendanceData);
    if (response) {
      alert("Attendance added successfully!");
    } else {
      alert("Failed to add attendance.");
    }
  };

  return (
    <div>
      <h2>Add Attendance</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="className"
          placeholder="Class Name"
          value={formData.className}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="regdNo"
          placeholder="Student Regd No"
          value={formData.regdNo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="month"
          placeholder="Month"
          value={formData.month}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="totalWorkingDays"
          placeholder="Total Working Days"
          value={formData.totalWorkingDays}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="daysPresent"
          placeholder="Days Present"
          value={formData.daysPresent}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="daysAbsent"
          placeholder="Days Absent"
          value={formData.daysAbsent}
          onChange={handleChange}
          required
        />

        <h4>Absent Days</h4>
        {formData.absentDays.map((day, index) => (
          <div key={index}>
            <input
              type="date"
              name="date"
              value={day.date}
              onChange={(e) => handleAbsentDayChange(index, e)}
              required
            />
            <input
              type="text"
              name="reason"
              placeholder="Reason"
              value={day.reason}
              onChange={(e) => handleAbsentDayChange(index, e)}
              required
            />
            <button type="button" onClick={() => removeAbsentDay(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addAbsentDay}>
          + Add Another Absent Day
        </button>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddAttendanceForm;
