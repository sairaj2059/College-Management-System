import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Stack, Box, useMediaQuery } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import StudentDashboardService from "../services/StudentDashboardService";

const SAttendance = ({regdNo}) => {
  const isSmallScreen = useMediaQuery("(max-width:500px)");

  // Static values
  const className = "Computer Science and Data Science 2022"; // Static class name
  const month = "March"; // Static month
  // State variables
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch attendance data from backend
  useEffect(() => {
    async function fetchAttendance() {
      try {
        const data = await StudentDashboardService.getStudentAttendence(className, regdNo, month);
        if (data && !data.error) {
          setAttendanceData(data);
        } else {
          setError(data?.error || "Failed to load attendance data.");
        }
      } catch (err) {
        setError("Error fetching attendance data.");
      } finally {
        setLoading(false);
      }
    }
    fetchAttendance();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!attendanceData) return <Typography>No attendance data available.</Typography>;

  // Prepare chart data
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

export default SAttendance;
