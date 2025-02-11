import React from "react";
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

const getProgressBar = (score) => {
  const percentage = (score / 50) * 100;
  const color = score >= 45 ? "success" : score >= 40 ? "primary" : "error";

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
  if (average >= 45)
    return <Trophy style={{ height: 16, width: 16, color: "#facc15" }} />;
  if (average < 40)
    return (
      <AlertTriangle style={{ height: 16, width: 16, color: "#ef4444" }} />
    );
  return <TrendingUp style={{ height: 16, width: 16, color: "#3b82f6" }} />;
};

const getScoreColor = (score) => {
  if (score >= 45)
    return {
      color: "#16a34a",
      backgroundColor: "#f0fdf4",
      border: "1px solid #bbf7d0",
    };
  if (score >= 40)
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

const SemesterCard = ({ semester, isExpanded, onToggle }) => {
  const semesterAverage =
    semester.subjects.reduce((acc, subject) => acc + subject.average, 0) /
    semester.subjects.length;
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
                Semester {semester.number}
              </Typography>

              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ fontSize: "0.875rem", color: "grey.500" }}
              >
                <BookOpen sx={{ width: 16, height: 16 }} />
                <Typography>{semester.subjects.length} Subjects</Typography>
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
          <Box sx={{ p: 3 }}>
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
                      <Typography variant="subtitle2">ESE</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2">Average</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {semester.subjects.map((subject) => (
                    <TableRow key={subject.code} hover>
                      <TableCell>
                        <Stack>
                          <Typography fontWeight="medium" color="text.primary">
                            {subject.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {subject.code}
                          </Typography>
                        </Stack>
                      </TableCell>
                      {[
                        subject.cie1,
                        subject.cie2,
                        subject.cie3,
                        subject.ese,
                      ].map((score, index) => (
                        <TableCell key={index} align="center">
                          <Stack alignItems="center" spacing={1}>
                            <Box
                              sx={{
                                width: 40,
                                textAlign: "center",
                                py: 0.5,
                                borderRadius: "50px",
                                bgcolor: getScoreColor(score),
                              }}
                            >
                              <Typography variant="body2" fontWeight="medium">
                                {score}
                              </Typography>
                            </Box>
                            {getProgressBar(score)}
                          </Stack>
                        </TableCell>
                      ))}
                      <TableCell align="center">
                        <Stack alignItems="center" spacing={1}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Typography
                              variant="h6"
                              color={
                                subject.average >= 45
                                  ? "success.main"
                                  : subject.average >= 40
                                    ? "primary.main"
                                    : "error.main"
                              }
                            >
                              {subject.average.toFixed(2)}
                            </Typography>
                            {getPerformanceIcon(subject.average)}
                          </Stack>
                          {getProgressBar(subject.average)}
                        </Stack>
                      </TableCell>
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
                    semesterAverage >= 45
                      ? "success.main"
                      : semesterAverage >= 40
                        ? "primary.main"
                        : "error.main"
                  }
                >
                  {semesterAverage >= 45
                    ? "Excellent"
                    : semesterAverage >= 40
                      ? "Good"
                      : "Needs Improvement"}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={3}>
                {[
                  { color: "success.main", label: "≥ 45 (Excellent)" },
                  { color: "primary.main", label: "40-44 (Good)" },
                  { color: "error.main", label: "< 40 (Improve)" },
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
