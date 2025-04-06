import React, { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import {
  Card, CardContent, Typography, IconButton,
  MenuItem, Select, FormControl, InputLabel,
} from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";
import TeacherDashboardservice from "../services/TeacherDashboardservice";

const StudentMarks = ({ subjects = [] }) => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchMarks = async () => {
      if (!selectedSubject) {
        setChartData([]);
        return;
      }

      const response = await TeacherDashboardservice.getStudentsBySubject(selectedSubject);
      console.log("Full Response from Backend:", response);
      if (response && Array.isArray(response)) {
        const formatted = response.map((student) => ({
          name: `RegNo: ${student.regNo || student.name}`,
          GPA: student.ese_gpa || 0,
        }));
        setChartData(formatted);
      } else {
        setChartData([]);
      }
    };

    fetchMarks();
  }, [selectedSubject]);

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
          <FormControl sx={{ minWidth: 150, ml: "auto" }} disabled={subjects.length === 0}>
            <InputLabel>Select Subject</InputLabel>
            <Select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              sx={{ bgcolor: "white", marginTop: "5px" }}
            >
              {subjects.map((sub) => (
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

        {/* Line Chart */}
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
              stroke={selectedSubject ? "#1e40af" : "#94a3b8"}
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


