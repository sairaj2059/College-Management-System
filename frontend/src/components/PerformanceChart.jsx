import React, { useEffect, useState } from "react";
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
  MenuItem,
  Select,
} from "@mui/material";
import StudentDashboardService from "../services/StudentDashboardService";

const PerformanceChart = ({ regdNo }) => {
  console.log("Registration in performance chart:", regdNo);

  const [data, setData] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const results = await StudentDashboardService.getSubresultbyregdNo(
          regdNo
        );
        console.log("API Response:", results);

        if (!results || !Array.isArray(results.semesters)) {
          console.error("Invalid API response format:", results);
          return;
        }

        setSemesters(results.semesters.map((sem) => sem.semesterNumber));

        if (results.semesters.length > 0) {
          setSelectedSemester(results.semesters[0].semesterNumber);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchResults();
  }, [regdNo]);

  useEffect(() => {
    if (!selectedSemester) return;

    const fetchSemesterData = async () => {
      try {
        const results = await StudentDashboardService.getSubresultbyregdNo(
          regdNo
        );

        const semesterData = results.semesters.find(
          (sem) => sem.semesterNumber === selectedSemester
        );

        if (!semesterData || !Array.isArray(semesterData.subjectMarks)) {
          console.error("No data found for semester:", selectedSemester);
          setData([]);
          return;
        }

        const formattedData = semesterData.subjectMarks.map((subject) => ({
          name: subject.subject.subjectCode,
          GPA: subject.cieMarks.gpa, // Adjust key names as per API response
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching semester data:", error);
      }
    };

    fetchSemesterData();
  }, [selectedSemester, regdNo]);

  return (
    <Card
      sx={{
        p: 2,
        borderRadius: "0.5rem",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        bgcolor: "white",
      }}
    >
      <CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.25rem",
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "#1e40af", fontWeight: "bold" }}
          >
            Performance
          </Typography>

          <div style={{ display: "flex", alignItems: "center" }}>
          <Select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                sx={{
                  bgcolor: "#f0f9ff",
                  padding: "0.30rem 0.5rem", // Reduced padding
                  borderRadius: "0.30rem", // Less rounded corners
                  minWidth: "120px", // Decrease width
                  fontSize: "0.9rem", // Smaller font
                  fontWeight: "500",
                  color: "#1e40af",
                  cursor: "pointer",
                  height: "35px", // Set fixed height
                  "& .MuiSelect-select": {
                    padding: "0.25rem", // Reduce padding inside select
                  },
                  "&:hover": { bgcolor: "#dbeafe" },
                  ".MuiOutlinedInput-notchedOutline": { border: "none" },
                }}
              >

              {semesters.map((sem) => (
                <MenuItem key={sem} value={sem}
                sx={{
                  color: "#1e40af",  
                  fontWeight: "500",
                  "&:hover": { bgcolor: "#dbeafe" } 
                }}>
                  Semester {sem}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
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
            <Legend wrapperStyle={{ paddingTop: "1.25rem" }} />
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
