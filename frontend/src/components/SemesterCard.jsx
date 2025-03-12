import React, { useMemo} from "react";
import DownloadIcon from "@mui/icons-material/Download";
import {
  Box,
  Button,
  Typography,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  LinearProgress,
  IconButton,
} from "@mui/material";

import {
  ChevronDown,
  ChevronUp,
  Trophy,
  AlertTriangle,
  TrendingUp,
  BookOpen,
} from "lucide-react";

//edit required for average calculation
const cie1total = 20;
const cie2Total = 30;
const cie3Total = 20;
const ese_gpa = 10;
const gpa=10;

const getProgressBar = (score, totalMarks) => {
  const percentage = (score / totalMarks) * 100;
  const color =
    percentage >= 80 ? "success" : percentage >= 50 ? "primary" : "error";

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "grey.200",
        borderRadius: "4px",
        overflow: "hidden",
      }}
    >
      <LinearProgress
        variant="determinate"
        value={percentage}
        color={color}
        sx={{ height: 6 }}
      />
    </Box>
  );
};

const getPerformanceIcon = (average) => {
  if (average >= 80)
    return <Trophy style={{ height: 16, width: 16, color: "#facc15" }} />;
  if (average < 50)
    return (
      <AlertTriangle style={{ height: 16, width: 16, color: "#ef4444" }} />
    );
  return <TrendingUp style={{ height: 16, width: 16, color: "#3b82f6" }} />;
};

const getScoreColor = (score, totalMarks) => {
  const percentage = (score / totalMarks) * 100;

  if (percentage >= 80)
    return {
      color: "#16a34a",
      backgroundColor: "#f0fdf4",
      border: "1px solid #bbf7d0",
    };
  if (percentage >= 50)
    return {
      color: "#2563eb",
      backgroundColor: "#eff6ff",
      border: "1px solid #bfdbfe",
    };
  return {
    color: "#dc2626",
    backgroundColor: "#fef2f2",
    border: "1px solid #fecaca",
  };
};

//edit required

const SemesterCard = ({ semester, isExpanded, onToggle }) => {
  const semesterAverage = useMemo(() => {
    return semester.subjectMarks.length > 0
      ? semester.subjectMarks.reduce(
          (acc, subjectMark) => acc + (subjectMark.cieMarks?.subAverage || 0),
          0
        ) / semester.subjectMarks.length
      : 0;
  }, [semester.subjectMarks]);

  // const excellentSubjects = semester.subjects.filter(
  //   (subject) => subject.average >= 45
  // ).length;

  if (!semester) {
    return <div>Loading...</div>; // Prevents crash if `semester` is undefined
  }

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "16px",
        border: "1px solid #f3f4f6",
        overflow: "hidden",
        transition: "all 0.2s",
        "&:hover": { boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" },
      }}
    >
      <Button onClick={onToggle} className="SButton">
        <Box sx={{ display: "flex", alignItems: "center", gap: "100px" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Box className="custom-box">
              <BookOpen style={{ width: 24, height: 24 }} />
            </Box>

            <Box sx={{ textAlign: "left" }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "grey.900" }}
              >
                Semester {semester.semesterNumber}
              </Typography>

              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ fontSize: "0.875rem", color: "grey.500" }}
              >
                <BookOpen sx={{ width: 16, height: 16 }} />
                <Typography>{semester.subjectMarks.length} Subjects</Typography>
              </Stack>
            </Box>
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 3,
            }}
          >
            <Stack spacing={0.5}>
              <Typography variant="body2" color="text.secondary">
                Average Score
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h6" color="primary">
                  {semesterAverage.toFixed(2)}
                </Typography>
                {getPerformanceIcon(semesterAverage)}
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {getPerformanceIcon(semesterAverage)}
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </Box>
      </Button>

      {isExpanded && (
        <Box sx={{ borderTop: 1, borderColor: "grey.200" }}>
          <Box sx={{ p: 4 }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "grey.50" }}>
                    <TableCell>
                      <Typography variant="subtitle2">Subject</Typography>
                    </TableCell>

                    <TableCell align="center">
                      <Typography variant="subtitle2">CIE 1</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2">CIE 2</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2">CIE 3</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2">ESE(GPA)</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2">CGPA</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {semester.subjectMarks.map((subjects) => (
                    <TableRow key={subjects.subject.subjectCode} hover>
                      <TableCell>
                        <Stack>
                          <Typography fontWeight="medium" color="text.primary">
                            {subjects.subject.subjectName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {subjects.subject.subjectCode}
                          </Typography>
                        </Stack>
                      </TableCell>
                      {[
                        { score: subjects.cieMarks.cie1, total: cie1total },
                        { score: subjects.cieMarks.cie2, total: cie2Total },
                        { score: subjects.cieMarks.cie3, total: cie3Total },
                        { score: subjects.cieMarks.ese_gpa, total: ese_gpa },
                        { score: subjects.cieMarks.gpa, total: gpa }
                      ].map(({ score, total }, index) => (
                        <TableCell key={index} align="center">
                          <Stack alignItems="center" spacing={1}>
                            <Box
                              sx={{
                                width: 40,
                                textAlign: "center",
                                py: 0.5,
                                borderRadius: "50px",
                                bgcolor: getScoreColor(score, total),
                              }}
                            >
                              <Typography variant="body2" fontWeight="medium">
                                {score}
                              </Typography>
                            </Box>
                            {getProgressBar(score, total)}
                          </Stack>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{
                mt: 3,
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: "grey.100",
                borderRadius: 2,
              }}
            >
              <Stack spacing={1}>
                <Typography fontWeight="medium" color="text.primary">
                  Semester Performance
                </Typography>
                <Typography
                  variant="h6"
                  color={
                    semesterAverage >= 80
                      ? "success.main"
                      : semesterAverage >= 50
                        ? "primary.main"
                        : "error.main"
                  }
                >
                  {semesterAverage >= 80
                    ? "Excellent"
                    : semesterAverage >= 50
                      ? "Good"
                      : "Needs Improvement"}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={3}>
                {[
                  { color: "success.main", label: "≥ 80 (Excellent)" },
                  { color: "primary.main", label: "50-79 (Good)" },
                  { color: "error.main", label: "< 50 (Improve)" },
                ].map((item, index) => (
                  <Stack
                    key={index}
                    direction="row"
                    alignItems="center"
                    spacing={1}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        bgcolor: item.color,
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {item.label}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
              <Stack direction="row" alignItems="center" rowspacing={3}>
                <Typography variant="body2">Download Result</Typography>
                <IconButton aria-label="download result" size="medium">
                  <DownloadIcon fontSize="inherit" />
                </IconButton>
              </Stack>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SemesterCard;


// import React, { useMemo } from "react";

// import {
//   Box,
//   Button,
//   Typography,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   Paper,
//   TableBody,
//   LinearProgress,
// } from "@mui/material";

// import {
//   ChevronDown,
//   ChevronUp,
//   Trophy,
//   AlertTriangle,
//   TrendingUp,
//   BookOpen,
// } from "lucide-react";

// // Constants for total marks
// const cie1Total = 20;
// const cie2Total = 30;
// const cie3Total = 20;
// const eseGpaTotal = 10; // ESE GPA is out of 10

// const getProgressBar = (score, totalMarks) => {
//   const percentage = (score / totalMarks) * 100;
//   const color =
//     percentage >= 80 ? "success" : percentage >= 50 ? "primary" : "error";

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         bgcolor: "grey.200",
//         borderRadius: "4px",
//         overflow: "hidden",
//       }}
//     >
//       <LinearProgress
//         variant="determinate"
//         value={percentage}
//         color={color}
//         sx={{ height: 6 }}
//       />
//     </Box>
//   );
// };

// const getPerformanceIcon = (average) => {
//   if (average >= 80)
//     return <Trophy style={{ height: 16, width: 16, color: "#facc15" }} />;
//   if (average < 50)
//     return (
//       <AlertTriangle style={{ height: 16, width: 16, color: "#ef4444" }} />
//     );
//   return <TrendingUp style={{ height: 16, width: 16, color: "#3b82f6" }} />;
// };

// // Common function for score color
// const getScoreColor = (score, totalMarks) => {
//   const percentage = (score / totalMarks) * 100;
//   if (percentage >= 80)
//     return { color: "#16a34a", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0" };
//   if (percentage >= 50)
//     return { color: "#2563eb", backgroundColor: "#eff6ff", border: "1px solid #bfdbfe" };
//   return { color: "#dc2626", backgroundColor: "#fef2f2", border: "1px solid #fecaca" };
// };

// // New function to get color for ESE GPA and CGPA (out of 10 scale)
// const getGpaColor = (gpa) => {
//   if (gpa >= 8)
//     return { color: "#16a34a", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0" };
//   if (gpa >= 5)
//     return { color: "#2563eb", backgroundColor: "#eff6ff", border: "1px solid #bfdbfe" };
//   return { color: "#dc2626", backgroundColor: "#fef2f2", border: "1px solid #fecaca" };
// };

// const SemesterCard = ({ semester, isExpanded, onToggle }) => {
//   const semesterAverage = useMemo(() => {
//     return semester.subjectMarks.length > 0
//       ? semester.subjectMarks.reduce(
//           (acc, subjectMark) => acc + (subjectMark.cieMarks?.subAverage || 0),
//           0
//         ) / semester.subjectMarks.length
//       : 0;
//   }, [semester.subjectMarks]);

//   if (!semester) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Box
//       sx={{
//         backgroundColor: "white",
//         borderRadius: "16px",
//         border: "1px solid #f3f4f6",
//         overflow: "hidden",
//         transition: "all 0.2s",
//         "&:hover": { boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" },
//       }}
//     >
//       <Button onClick={onToggle} className="SButton">
//         <Box sx={{ display: "flex", alignItems: "center", gap: "100px" }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
//             <Box className="custom-box">
//               <BookOpen style={{ width: 24, height: 24 }} />
//             </Box>

//             <Box sx={{ textAlign: "left" }}>
//               <Typography variant="h6" sx={{ fontWeight: 600, color: "grey.900" }}>
//                 Semester {semester.semesterNumber}
//               </Typography>
//             </Box>
//           </Box>
//         </Box>

//         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//           {getPerformanceIcon(semesterAverage)}
//           {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//         </Box>
//       </Button>

//       {isExpanded && (
//         <Box sx={{ borderTop: 1, borderColor: "grey.200" }}>
//           <Box sx={{ p: 4 }}>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow sx={{ bgcolor: "grey.50" }}>
//                     <TableCell>
//                       <Typography variant="subtitle2">Subject</Typography>
//                     </TableCell>
//                     <TableCell align="center"><Typography variant="subtitle2">CIE 1</Typography></TableCell>
//                     <TableCell align="center"><Typography variant="subtitle2">CIE 2</Typography></TableCell>
//                     <TableCell align="center"><Typography variant="subtitle2">CIE 3</Typography></TableCell>
//                     <TableCell align="center"><Typography variant="subtitle2">ESE (GPA)</Typography></TableCell>
//                     <TableCell align="center"><Typography variant="subtitle2">CGPA</Typography></TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {semester.subjectMarks.map((subjects) => (
//                     <TableRow key={subjects.subject.subjectCode} hover>
//                       <TableCell>
//                         <Typography fontWeight="medium" color="text.primary">
//                           {subjects.subject.subjectName}
//                         </Typography>
//                       </TableCell>
//                       {[{ score: subjects.cieMarks.cie1, total: cie1Total },
//                         { score: subjects.cieMarks.cie2, total: cie2Total },
//                         { score: subjects.cieMarks.cie3, total: cie3Total }
//                       ].map(({ score, total }, index) => (
//                         <TableCell key={index} align="center">
//                           <Box sx={{ ...getScoreColor(score, total), py: 0.5, borderRadius: "50px" }}>
//                             <Typography variant="body2" fontWeight="medium">{score}</Typography>
//                           </Box>
//                           {getProgressBar(score, total)}
//                         </TableCell>
//                       ))}

//                       {/* ESE GPA */}
//                       <TableCell align="center">
//                         <Box sx={{ ...getGpaColor(subjects.cieMarks.ese_gpa), py: 0.5, borderRadius: "50px" }}>
//                           <Typography variant="body2" fontWeight="medium">
//                             {subjects.cieMarks.ese_gpa}
//                           </Typography>
//                         </Box>
//                         {getProgressBar(subjects.cieMarks.ese_gpa, eseGpaTotal)}
//                       </TableCell>

//                       {/* CGPA */}
//                       <TableCell align="center">
//                         <Box sx={{ ...getGpaColor(subjects.cieMarks.subAverage / 10), py: 0.5, borderRadius: "50px" }}>
//                           <Typography variant="body2" fontWeight="medium">
//                             {(subjects.cieMarks.subAverage / 10).toFixed(2)}
//                           </Typography>
//                         </Box>
//                         {getProgressBar(subjects.cieMarks.subAverage / 10, eseGpaTotal)}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Box>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default SemesterCard;
