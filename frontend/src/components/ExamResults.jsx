import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  InputBase,
  Container,
  Paper,
} from "@mui/material";
import { BookOpen, Search } from "lucide-react";
import { CalendarToday } from "@mui/icons-material";
import SemesterCard from "./SemesterCard";
import { semesters } from "../resources/data1";
import "../resources/css/Semester.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "sans-serif,Arial",
  },
});

const ExamResults = () => {
  const [expandedSemesters, setExpandedSemesters] = useState([0]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSemester = (semesterNumber) => {
    setExpandedSemesters((prev) =>
      prev.includes(semesterNumber)
        ? prev.filter((num) => num !== semesterNumber)
        : [...prev, semesterNumber]
    );
  };

  // Calculate overall average
  // const overallAverage =
  //   semesters.reduce(
  //     (acc, semester) =>
  //       acc +
  //       semester.subjects.reduce((sum, subject) => sum + subject.average, 0) /
  //         semester.subjects.length,
  //     0
  //   ) / semesters.length;

  // Filter semesters based on search input
  const filteredSemesters = semesters.filter((semester) =>
    semester.subjects.some(
      (subject) =>
        subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.code.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (!semesters || !Array.isArray(semesters)) {
    return <Typography>Loading semesters...</Typography>;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
      }}
    >
      <Box>
        <Box
          sx={{
            background: "linear-gradient(to right, #2563eb, #1e40af, #3730a3)",
            color: "white",
          }}
        >
          <Container maxWidth="lg">
            <Box py={8}>
              <Box display="flex" flexDirection="column" gap={4}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                      Welcome Back, Student!
                    </Typography>
                    <Typography variant="h6" color="rgba(255, 255, 255, 0.8)">
                      Track your academic progress and performance
                    </Typography>
                  </Box>
                  <Paper
                    elevation={3}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      px: 2,
                      py: 1.5,
                      borderRadius: 2,
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <CalendarToday
                      fontSize="small"
                      sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                    />
                    <Typography color="rgba(255, 255, 255, 0.8)">
                      Academic Year 2023-24
                    </Typography>
                  </Paper>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>

        <Box sx={{ maxWidth: "80rem", mx: "auto", px: 4, mt: -6 }}>
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: 3,
              boxShadow: 6,
              p: 6,
              pt: 3,
              mb: 6,
            }}
          >
            <Stack spacing={3}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <BookOpen size={24} color="#2563eb" />
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="text.primary"
                  >
                    Semester Overview
                  </Typography>
                </Stack>

                {/* Search Input */}
                <Box sx={{ position: "relative", width: "250px" }}>
                  <Search
                    size={20}
                    color="#9CA3AF"
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  />
                  <InputBase
                    type="text"
                    placeholder="Search Subjects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{
                      paddingLeft: 5,
                      paddingRight: 2,
                      paddingY: 1,
                      width: "100%",
                      border: "1px solid #E5E7EB",
                      borderRadius: 2,
                      transition: "box-shadow 0.2s, border-color 0.2s",
                      "&.Mui-focused": {
                        boxShadow: "0 0 0 2px #3B82F6",
                        borderColor: "#3B82F6",
                      },
                    }}
                    inputProps={{ "aria-label": "Search subjects" }}
                  />
                </Box>
              </Box>

              {/* Semester List */}
              <Stack spacing={3}>
                <ThemeProvider theme={theme}>
                  {filteredSemesters.map((semester) => (
                    <SemesterCard
                      key={semester.number}
                      semester={semester}
                      isExpanded={expandedSemesters.includes(semester.number)}
                      onToggle={() => toggleSemester(semester.number)}
                    />
                  ))}
                </ThemeProvider>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ExamResults;
