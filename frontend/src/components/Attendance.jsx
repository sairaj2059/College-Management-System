import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Present", value: 25, color: "#4caf50" },
  { name: "Absent", value: 2, color: "#f44336" },
];

const Attendance = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Attendance</Typography>
        <PieChart width={200} height={200}>
          <Pie data={data} dataKey="value" outerRadius={80}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </CardContent>
    </Card>
  );
};

export default Attendance;
