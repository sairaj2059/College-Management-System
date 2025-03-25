import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import StudentDashboardService from "../services/StudentDashboardService";

const SubjectGraph = ({ regdNo }) => {
  const [semGPA, setSemGPA] = useState([]);

  useEffect(() => {
    const fetchGPA = async () => {
      const result = await StudentDashboardService.getSubresultbyregdNo(regdNo);
      if (result && result.semesters) {
        const gpaData = result.semesters.map((sem) => ({
          name: `Semester-${sem.semesterNumber}`,
          fullName: `Semester-${sem.semesterNumber}`, // Store full name for tooltip
          GPA: sem.semcgpa ? Number(sem.semcgpa) : 0,
        }));
        setSemGPA(gpaData);
      }
    };

    if (regdNo) {
      fetchGPA();
    }
  }, [regdNo]);

  // Function to truncate label with "..."
  const truncateLabel = (label) => { 
    return label.length > 10 ? `${label.substring(0, 7)}...` : label;
  };

  return (
    <div style={{ width: "100%", height: 300, margin: "auto" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={semGPA} margin={{ top: 10, right: 20, left: 10, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={({ x, y, payload }) => {
              const fullName = semGPA[payload.index]?.fullName || payload.value;
              return (
                <text x={x} y={y + 10} textAnchor="middle" fontSize={12} title={fullName}>
                  {truncateLabel(payload.value)}
                </text>
              );
            }}
            interval={0}
          />
          <YAxis tick={{ fontSize: 12 }} domain={[0, 10]} />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Bar dataKey="GPA" fill="#8884d8" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SubjectGraph;
