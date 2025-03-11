import React, { useState } from "react";
import { Box, IconButton, Stack, Typography, useMediaQuery } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FacultyCard from "./FacultyCard";
import VegataKrishnansir from "../resources/images/VengataKrishnan.jpeg";
import BhaskaranSir from "../resources/images/BhaskaranSir.jpg";
import SunilSir from "../resources/images/SunilSir.jpg";
import SarmaSir from "../resources/images/SarmaSir.png";
import Venkataramana from "../resources/images/VenkatramanaSir.jpg";

const facultyData = [
  { name: "Vegata Krishnan", subject: "Inferential Statistics", image: VegataKrishnansir },
  { name: "Bhaskaran", subject: "High-Performance Computing", image: BhaskaranSir },
  { name: "Sunil", subject: "Database Management", image: SunilSir },
  { name: "Venkataramana", subject: "Operating Systems", image: Venkataramana },
  { name: "Sarma", subject: "Mathematics", image: SarmaSir }
];

const Faculty = () => {
  const [startIndex, setStartIndex] = useState(0);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const visibleCount = isSmallScreen ? 1 : 3;

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
        width: "90%",  // Minimized side gaps even more
        maxWidth: "800px",  
        margin: "auto",  
        p: 1,  
        bgcolor: "#f0f5ff",  
        boxShadow: 1,  
        borderRadius: 2  
      }}
    >
      {/* Header Section */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.5} px={0.5}>
        <Typography variant="h6" fontWeight="bold" color="#0D47A1" sx={{ fontSize: "1rem" }}>
          Class Faculties
        </Typography>
        <Stack direction="row">
          <IconButton 
            onClick={handlePrev} 
            disabled={startIndex === 0}
            sx={{ color: "#0D47A1", "&.Mui-disabled": { opacity: 0.3 } }}
            size="small"
          >
            <ArrowBackIosIcon fontSize="inherit" />
          </IconButton>
          <IconButton 
            onClick={handleNext} 
            disabled={startIndex + visibleCount >= facultyData.length}
            sx={{ color: "#0D47A1", "&.Mui-disabled": { opacity: 0.3 } }}
            size="small"
          >
            <ArrowForwardIosIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      </Stack>

      {/* Faculty Cards Section */}
      <Stack direction="row" spacing={0.5} flexWrap="wrap" justifyContent="center">
        {facultyData.slice(startIndex, startIndex + visibleCount).map((faculty, index) => (
          <Box key={index} sx={{ maxWidth: "200px" }}>
            <FacultyCard {...faculty} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Faculty;
