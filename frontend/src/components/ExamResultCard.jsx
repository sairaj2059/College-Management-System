// import React from "react";
// import { Card, CardContent, Typography, Box, Chip, MenuItem, Select } from "@mui/material";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

// const data = [
//   { subject: "Mat", score: 100 },
//   { subject: "Phy", score: 92 },
//   { subject: "Che", score: 90 },
//   { subject: "Eng", score: 82 },
//   { subject: "Sci", score: 90 },
// ];

// const subjectScores = [
//   { label: "Mat", value: 100, color: "primary" },
//   { label: "Phy", value: 92, color: "success" },
//   { label: "Che", value: 90, color: "warning" },
//   { label: "Eng", value: 80, color: "error" },
// ];

// const ExamResultCard = () => {
//   return (
//     <Card sx={{ width: 400, p: 2, borderRadius: 3, boxShadow: 3 }}>
//       <CardContent>
//         <Box display="flex" justifyContent="space-between" alignItems="center">
//           <Typography variant="h6" fontWeight="bold">
//             Exam Result
//           </Typography>
//           <Box display="flex" alignItems="center">
//             <CalendarMonthIcon sx={{ mr: 1, fontSize: 20 }} />
//             <Select size="small" defaultValue="1st Quarter">
//               <MenuItem value="1st Quarter">1st Quarter</MenuItem>
//               <MenuItem value="2nd Quarter">2nd Quarter</MenuItem>
//             </Select>
//           </Box>
//         </Box>

//         <Box mt={2} display="flex" gap={1} flexWrap="wrap">
//           {subjectScores.map(({ label, value, color }) => (
//             <Chip key={label} label={`${label} : ${value}`} color={color} variant="outlined" />
//           ))}
//         </Box>

//         <Box mt={3} height={250}>
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={data} barSize={40}>
//               <XAxis dataKey="subject" />
//               <YAxis domain={[0, 120]} />
//               <Tooltip />
//               <Bar dataKey="score" fill="#1E88E5" />
//             </BarChart>
//           </ResponsiveContainer>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default ExamResultCard;
