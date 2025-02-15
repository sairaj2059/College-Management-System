import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from "recharts";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";

const data = [
  { name: "Quarter 1", Avg_Score: 72, attendance: 84 },
  { name: "Quarter 2", Avg_Score: 68, attendance: 78 },
  { name: "Half yearly", Avg_Score: 66, attendance: 75 },
  { name: "Model",Avg_Score: 70, attendance: 80 },
  { name: "Final", Avg_Score: 76, attendance: 55 },
];

const PerformanceChart = () => {
  return (
    <Card sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" fontWeight="bold">Performance</Typography>
          <IconButton>
            <CalendarMonth /> 2024 - 2025
          </IconButton>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[60, 90]} />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="attendance" stroke="#4fc3f7" fill="#b3e5fc" />
            <Area type="monotone" dataKey="Avg_Score" stroke="#1565c0" fill="#90caf9" />
            <Line type="monotone" dataKey="attendance" stroke="#4fc3f7" strokeWidth={2} dot={{ fill: "#0288d1", r: 5 }} />
            <Line type="monotone" dataKey="Avg_Score" stroke="#1565c0" strokeWidth={2} dot={{ fill: "#0d47a1", r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
