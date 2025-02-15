import React, { useState } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FacultyCard from "./FacultyCard";
import VegataKrishnansir from "../resources/images/VengataKrishnan.jpeg"
import BhaskaranSir from "../resources/images/BhaskaranSir.jpg"
import SunilSir from "../resources/images/SunilSir.jpg"
import SarmaSir from "../resources/images/SarmaSir.png"
import Venkataramana from "../resources/images/VenkatramanaSir.jpg"

const facultyData = [
  { name: "Vegata Krishnan", subject: "Inferential Statistics", image: VegataKrishnansir },
  { name: "Bhaskaran", subject: "Introduction to High Performance Computing", image: BhaskaranSir },
  { name: "Sunil", subject: "Database Management", image: SunilSir },
  { name: "Venkataramana", subject: "Operating System", image: Venkataramana },
  { name: "Sarma", subject: "Maths", image: SarmaSir }
];

const Faculty = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4; // Number of cards visible at once

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
    <Box sx={{ width: "100%", p: 2, boxShadow: 2, borderRadius: 2 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>Class Faculties</Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        {/* Left Navigation Button */}
        <IconButton onClick={handlePrev} disabled={startIndex === 0}>
          <ArrowBackIosNewIcon />
        </IconButton>

        {/* Faculty Cards */}
        <Stack direction="row" spacing={2} sx={{ overflow: "hidden", width: "90%" }}>
          {facultyData.slice(startIndex, startIndex + visibleCount).map((faculty, index) => (
            <FacultyCard key={index} {...faculty} />
          ))}
        </Stack>

        {/* Right Navigation Button */}
        <IconButton onClick={handleNext} disabled={startIndex + visibleCount >= facultyData.length}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Faculty;
