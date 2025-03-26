import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";
import StudentDashboardService from "../services/StudentDashboardService";

const PerformanceChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const regdNo = "224206"; // Set required regdNo
        const results = await StudentDashboardService.getSubresultbyregdNo(regdNo);

        console.log("API Response:", results); // Debugging log

        if (!results || !Array.isArray(results.semesters)) {
          console.error("Invalid API response format:", results);
          return;
        }

        const requiredSemester = "3"; // Change this based on the semester you need

        // Find the required semester
        const semesterData = results.semesters.find(
          (sem) => sem.semesterNumber === requiredSemester
        );

        if (!semesterData || !Array.isArray(semesterData.subjectMarks)) {
          console.error("No data found for semester:", requiredSemester);
          return;
        }

        // Extract subject GPA data
        const formattedData = semesterData.subjectMarks.map((subject) => ({
          name: subject.subject.subjectCode,
          GPA: subject.cieMarks.gpa, // Adjust key names as per API response
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchResults();
  }, []);

  return (
    <Card sx={{ p: 2, borderRadius: 2, boxShadow: 3, bgcolor: "white" }}>
      <CardContent>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <Typography variant="h6" fontWeight="bold" sx={{ color: "#1e40af" }}>
            Performance
          </Typography>
          <IconButton sx={{ bgcolor: "#f0f9ff", "&:hover": { bgcolor: "#dbeafe" } }}>
            <CalendarMonth sx={{ color: "#2563eb" }} />
            <Typography variant="body2" sx={{ ml: 1, color: "#2563eb", fontWeight: "medium" }}>
              2024 - 2025
            </Typography>
          </IconButton>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#64748b" tick={{ fill: "#64748b" }} />
            <YAxis domain={[0, 10]} stroke="#64748b" tick={{ fill: "#64748b" }} />
            <Tooltip contentStyle={{ backgroundColor: "white", border: "none", borderRadius: "8px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }} />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Line type="monotone" dataKey="GPA" stroke="#1e40af" strokeWidth={2} dot={{ fill: "#1e40af", r: 5 }} activeDot={{ r: 8, fill: "#1e40af" }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
