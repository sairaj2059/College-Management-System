import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { name: "UCSH-601", GPA: 7.0 },
  { name: "UCSH-602", GPA: 8.0 },
  { name: "UCSH-603", GPA: 6.5 },
  { name: "UCSH-604", GPA: 7.5 },
  { name: "UCSH-605", GPA: 9.0 },
  { name: "UCSH-605", GPA: 9.0 },
  
];

const SubjectGraph = () => {
  return (
    <div style={{ width: "80%", height: 200, margin: "auto" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Bar dataKey="GPA" fill="#8884d8" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SubjectGraph;
