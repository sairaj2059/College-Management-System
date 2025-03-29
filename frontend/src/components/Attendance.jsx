import React from "react";
import { Card, CardContent, Typography, Stack, Box, useMediaQuery } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const Attendance = () => {
  const isSmallScreen = useMediaQuery("(max-width:500px)");

  // Static values
 // Static registration number
  const month = "March"; // Static month

  // Static attendance data
  const attendanceData = { daysPresent: 20, daysAbsent: 5 }; // Example data

  // Define constant structure for data but with static values
  const data = [
    { name: "Present", value: attendanceData.daysPresent, color: "#2563eb" }, // Blue
    { name: "Absent", value: attendanceData.daysAbsent, color: "#dc2626" }, // Red
  ];

  return (
    <Card 
      sx={{ 
        width: "100%", 
        boxShadow: 3, 
        height: "100%",
        bgcolor: "white",
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Typography 
          variant="h6" 
          align="center" 
          gutterBottom
          sx={{ 
            color: "#1e40af",
            fontWeight: "bold",
            mb: 3
          }}
        >
          Attendance - {month}
        </Typography>

        {/* Legend */}
        <Stack
          direction={isSmallScreen ? "column" : "row"}
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ mb: 2 }}
        >
          {data.map((entry, index) => (
            <Stack 
              key={index} 
              direction="row" 
              alignItems="center" 
              spacing={1}
              sx={{
                bgcolor: "#f0f9ff",
                px: 2,
                py: 0.5,
                borderRadius: "20px",
              }}
            >
              <Box 
                sx={{ 
                  width: 12, 
                  height: 12, 
                  bgcolor: entry.color, 
                  borderRadius: "50%",
                  border: "2px solid white"
                }} 
              />
              <Typography 
                variant="body2"
                sx={{ 
                  color: "#1e40af",
                  fontWeight: "medium"
                }}
              >
                {`${entry.name} (${entry.value})`}
              </Typography>
            </Stack>
          ))}
        </Stack>

        {/* Pie Chart */}
        <Box sx={{ width: "100%", height: 200 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    stroke="white"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: "white",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Attendance;
