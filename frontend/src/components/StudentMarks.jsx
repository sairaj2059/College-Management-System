import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";

const StudentMarks = () => {
  const [selectedSubject, setSelectedSubject] = useState("");

  // Expanded sample data with more students
  const constData = {
    subjects: ["Mathematics", "Physics", "Chemistry"],
    students: [
      { name: "RegNo: 101", Mathematics: 9.2, Physics: 8.5, Chemistry: 9.0 },
      { name: "RegNo: 102", Mathematics: 8.8, Physics: 7.9, Chemistry: 8.5 },
      { name: "RegNo: 103", Mathematics: 7.5, Physics: 9.1, Chemistry: 8.2 },
      { name: "RegNo: 104", Mathematics: 8.0, Physics: 8.7, Chemistry: 7.9 },
      { name: "RegNo: 105", Mathematics: 9.5, Physics: 9.2, Chemistry: 8.8 },
      { name: "RegNo: 106", Mathematics: 7.9, Physics: 8.1, Chemistry: 7.5 },
      { name: "RegNo: 107", Mathematics: 8.4, Physics: 8.6, Chemistry: 8.3 },
      { name: "RegNo: 108", Mathematics: 7.2, Physics: 7.8, Chemistry: 7.9 },
      { name: "RegNo: 109", Mathematics: 9.1, Physics: 8.9, Chemistry: 8.6 },
      { name: "RegNo: 110", Mathematics: 8.6, Physics: 7.5, Chemistry: 8.1 },
    ],
  };

  // Prepare chart data based on selected subject
  const chartData = constData.students.map((student) => ({
    name: student.name,
    GPA: selectedSubject ? student[selectedSubject] || 0 : 0, // Ensure values exist
  }));

  return (
    <Card sx={{ p: 2, borderRadius: 2, boxShadow: 3, bgcolor: "white" }}>
      <CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ color: "#1e40af" }}>
            Performance (Top Students)
          </Typography>

          {/* Subject Dropdown */}
          <FormControl sx={{ minWidth: 150, ml: "auto" }}>
            <InputLabel>Select Subject</InputLabel>
            <Select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              sx={{ bgcolor: "white", marginTop: "5px" }}
            >
              {constData.subjects.map((sub) => (
                <MenuItem key={sub} value={sub}>
                  {sub}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Year Selection Button */}
          <IconButton sx={{ bgcolor: "#f0f9ff", "&:hover": { bgcolor: "#dbeafe" } }}>
            <CalendarMonth sx={{ color: "#2563eb" }} />
            <Typography
              variant="body2"
              sx={{ ml: 1, color: "#2563eb", fontWeight: "medium" }}
            >
              2024 - 2025
            </Typography>
          </IconButton>
        </div>

        {/* Line Chart (Always Visible) */}
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#64748b" tick={{ fill: "#64748b" }} />
            <YAxis domain={[0, 10]} stroke="#64748b" tick={{ fill: "#64748b" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Line
              type="monotone"
              dataKey="GPA"
              stroke={selectedSubject ? "#1e40af" : "#94a3b8"} // Dim color when no subject
              strokeWidth={2}
              dot={{ fill: "#1e40af", r: 5 }}
              activeDot={{ r: 8, fill: "#1e40af" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default StudentMarks;
