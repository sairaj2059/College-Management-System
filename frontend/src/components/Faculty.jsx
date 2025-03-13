import React, { useEffect, useState } from "react";
import { Box, IconButton, Stack, Typography, useMediaQuery, CircularProgress } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FacultyCard from "./FacultyCard";
import APIService from "../services/StudentDashboardService"; // Import API service

const Faculty = () => {
  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const visibleCount = isSmallScreen ? 1 : 3;

  // Fetch Faculty Data from API
  useEffect(() => {
    const fetchFacultyData = async () => {
      setLoading(true);
      setError(null);

      const courseName = "Computer Science and Data Science";
      const semesterNumber = "1"; // Ensure this matches MongoDB schema

      try {
        const data = await APIService.getSemesterData(courseName, semesterNumber);
        console.log("🔹 API Response:", data);

        if (data && data.semesterNumber === String(semesterNumber) && data.subjects) {
          const facultyList = data.subjects.map(subject => ({
            name: subject.subjectTeacher,
            subject: subject.subjectName,
            image: "" // Placeholder for real image URLs
          }));
        
          console.log("👨‍🏫 Faculty Data:", facultyList);
          setFacultyData(facultyList);
        } else {
          console.warn("⚠️ No valid semester data found for:", semesterNumber);
          setFacultyData([]); // Ensure facultyData is reset if no valid data is found
        }
      } catch (err) {
        console.error("❌ Error fetching faculty data:", err);
        setError("Failed to fetch faculty data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyData();
  }, []);

  // Pagination Handlers
  const handleNext = () => {
    if (startIndex + visibleCount < facultyData.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <Box 
      sx={{ 
        width: "85%", 
        maxWidth: "800px",  
        margin: "auto",  
        p: 2,  
        bgcolor: "#e3f2fd",  
        boxShadow: 2,  
        borderRadius: 2,
        border: "1px solid #0D47A1",
        textAlign: "center"
      }}
    >
      {/* Header Section */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1} px={1}>
        <Typography variant="h6" fontWeight="bold" color="#0D47A1">
          Class Faculties
        </Typography>
        <Stack direction="row">
          <IconButton 
            onClick={handlePrev} 
            disabled={startIndex === 0}
            sx={{ color: "#0D47A1", "&.Mui-disabled": { opacity: 0.5 } }}
            size="small"
          >
            <ArrowBackIosIcon fontSize="small" />
          </IconButton>
          <IconButton 
            onClick={handleNext} 
            disabled={startIndex + visibleCount >= facultyData.length}
            sx={{ color: "#0D47A1", "&.Mui-disabled": { opacity: 0.5 } }}
            size="small"
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      {/* Loading & Error Handling */}
      {loading ? (
        <CircularProgress color="primary" />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center">
          {facultyData.length > 0 ? (
            facultyData.slice(startIndex, startIndex + visibleCount).map((faculty, index) => (
              <Box key={index} sx={{ maxWidth: "250px" }}>
                <FacultyCard {...faculty} />
              </Box>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary">
              No faculty data available
            </Typography>
          )}
        </Stack>
      )}
    </Box>
  );
};

export default Faculty;
