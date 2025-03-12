import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from "recharts";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";

const data = [
  { name: "Semester-1", GPA: 5.2 },
  { name: "Semester 2", GPA: 6.8,  },
  { name: "Semester 3", GPA: 7.6 },
  { name: "Semester 4", GPA: 8.0 },
  { name: "Semester 5", GPA: 9.6 },
];

const PerformanceChart = () => {
  return (
    <Card sx={{ p: 2, borderRadius: 2, boxShadow: 3, bgcolor: "white" }}>
      <CardContent>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <Typography 
            variant="h6" 
            fontWeight="bold"
            sx={{ color: "#1e40af" }}
          >
            Performance
          </Typography>
          <IconButton 
            sx={{ 
              bgcolor: "#f0f9ff",
              "&:hover": {
                bgcolor: "#dbeafe"
              }
            }}
          >
            <CalendarMonth sx={{ color: "#2563eb" }} />
            <Typography 
              variant="body2" 
              sx={{ 
                ml: 1,
                color: "#2563eb",
                fontWeight: "medium"
              }}
            >
              2024 - 2025
            </Typography>
          </IconButton>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="name" 
              stroke="#64748b"
              tick={{ fill: "#64748b" }}
            />
            <YAxis 
              domain={[0, 10.0]} 
              stroke="#64748b"
              tick={{ fill: "#64748b" }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "white",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Legend 
              wrapperStyle={{
                paddingTop: "20px"
              }}
            />
            <Area type="monotone" dataKey="attendance" stroke="#2563eb" fill="#dbeafe" fillOpacity={0.3} />
            <Area type="monotone" dataKey="Avg_Score" stroke="#1e40af" fill="#bfdbfe" fillOpacity={0.3} />
            <Line 
              type="monotone" 
              dataKey="attendance" 
              stroke="#2563eb" 
              strokeWidth={2} 
              dot={{ fill: "#2563eb", r: 5 }}
              activeDot={{ r: 8, fill: "#2563eb" }}
            />
            <Line 
              type="monotone" 
              dataKey="GPA" 
              stroke="#1e40af" 
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

export default PerformanceChart;
