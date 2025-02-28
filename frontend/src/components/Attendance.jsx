import React from "react";
import { Card, CardContent, Typography, Stack, Box, useMediaQuery } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Present", value: 25, color: "#4caf50" },
  { name: "Absent", value: 2, color: "#f44336" },
  { name: "Late", value: 3, color: "#ff9800" },
];

const Attendance = () => {
  const isSmallScreen = useMediaQuery("(max-width:500px)");

  return (
    <Card sx={{ width: "100%", maxWidth: 300, mx: "auto", boxShadow: 3, height: "auto" }}>


      <CardContent sx={{ p: 1 }}> {/* Reduced padding */}
        <Typography variant="h6" align="center" sx={{ mb: 1 }}> {/* Reduced font size and margin */}
          Attendance
        </Typography>

        {/* Legend Section */}
        <Stack
          direction={isSmallScreen ? "column" : "row"}
          spacing={1}  // Reduced spacing
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 1 }}
        >
          {data.map((entry, index) => (
            <Stack key={index} direction="row" alignItems="center" spacing={0.5}>
              <Box sx={{ width: 6, height: 6, bgcolor: entry.color, borderRadius: "50%" }} />
              <Typography variant="caption">{entry.name}</Typography> {/* Smaller text */}
            </Stack>
          ))}
        </Stack>

        {/* Responsive Pie Chart */}
        <Box sx={{ width: "100%", maxWidth: 150, height: isSmallScreen ? 100 : 150, mx: "auto", mt: 1 }}>


          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" outerRadius={60}> {/* Reduced size */}


                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Attendance;