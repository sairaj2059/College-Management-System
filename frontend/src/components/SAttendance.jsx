import React from "react";
import { Card, CardContent, Typography, Stack, Box, useMediaQuery } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Present", value: 25, color: "#4caf50" },
  { name: "Absent", value: 2, color: "#f44336" },
  { name: "Late", value: 3, color: "#ff9800" },
];

const SAttendance = () => {
  const isSmallScreen = useMediaQuery("(max-width:500px)");

  return (
    <Card sx={{ width: "100%", maxWidth: 300, mx: "auto", boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" align="center">Attendance</Typography>

        {/* Legend Section */}
        <Stack
          direction={isSmallScreen ? "column" : "row"}
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 2 }}
        >
          {data.map((entry, index) => (
            <Stack key={index} direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  bgcolor: entry.color,
                  borderRadius: "50%",
                }}
              />
              <Typography variant="body2">{entry.name}</Typography>
            </Stack>
          ))}
        </Stack>

        {/* Responsive Pie Chart */}
        <Box sx={{ width: "100%", maxWidth: 200, height: isSmallScreen ? 125 : 200, mx: "auto" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" outerRadius={80}>
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

export default SAttendance;
// import React from "react";
// import { Card, CardContent, Typography } from "@mui/material";
// import { PieChart, Pie, Cell, Tooltip } from "recharts";

// const data = [
//   { name: "Present", value: 25, color: "#4caf50" },
//   { name: "Absent", value: 2, color: "#f44336" },
// ];

// const SAttendance = () => {
//   return (
//     <Card>
//       <CardContent>
//         <Typography variant="h6">Attendance</Typography>
//         <PieChart width={200} height={200}>
//           <Pie data={data} dataKey="value" outerRadius={80}>
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={entry.color} />
//             ))}
//           </Pie>
//           <Tooltip />
//         </PieChart>
//       </CardContent>
//     </Card>
//   );
// };

// export default SAttendance;