import React, { useState, useEffect } from "react";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Box,
  InputAdornment,
  Button,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import axios from "axios";
import { useSelector } from "react-redux";

const ExamMarks = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [disabledFields, setDisabledFields] = useState({});
  const [courseName, setCourseName] = useState("");
  const username = useSelector((state) => state.auth.username);
  const token = useSelector((state) => state.auth.token);
  const joinYear = "2022";
  const semesterNumber = "1";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get subjects by teacher ID
        const subjectRes = await axios.get(
          `http://localhost:8080/courses/getSubjectsByTeacherId/${username}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const course = subjectRes.data[0];
        const courseName = course.courseName;
        setCourseName(courseName);

        const sem1Subjects = course.semesters
          .filter((sem) => sem.semesterNumber === semesterNumber)
          .flatMap((sem) => sem.subjects)
          .filter((sub) => sub.subjectTeacherId === username);

        // Get students
        const studentRes = await axios.get(
          `http://localhost:8080/class/${courseName}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const allStudents = studentRes.data;

        // Get previously saved results
        const savedRes = await axios.get(
          `http://localhost:8080/teacher/semResults/${username}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const savedResults = savedRes.data;

        // Build lookup for saved results
        const resultMap = {};
        for (const result of savedResults) {
          if (!resultMap[result.regdNo]) resultMap[result.regdNo] = {};
          const semester = result.semesters.find(
            (s) => s.semesterNumber === semesterNumber
          );
          if (semester) {
            for (const mark of semester.subjectMarks) {
              resultMap[result.regdNo][mark.subject.subjectCode] =
                mark.cieMarks;
            }
          }
        }

        // Build students state
        const mapped = allStudents.map((student) => {
          const studentMarks = sem1Subjects.map((subject) => {
            const saved = resultMap[student.regdNo]?.[subject.subjectCode] || {};
            return {
              subject,
              cie1: saved.cie1 || "",
              cie2: saved.cie2 || "",
              cie3: saved.cie3 || "",
              ese_gpa: saved.ese_gpa || "",
              gpa: saved.gpa || "",
            };
          });

          // Set which fields are disabled
          studentMarks.forEach((mark) => {
            const key = `${student.regdNo}-${mark.subject.subjectCode}`;
            if (resultMap[student.regdNo]?.[mark.subject.subjectCode]) {
              setDisabledFields((prev) => ({ ...prev, [key]: true }));
            }
          });

          return {
            regdNo: student.regdNo,
            name: student.studentName,
            class: courseName,
            avatar: student.avatar || "",
            marks: studentMarks,
          };
        });

        setStudents(mapped);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [token, username]);

  const handleInputChange = (regdNo, subjectCode, field, value) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.regdNo === regdNo
          ? {
              ...student,
              marks: student.marks.map((mark) =>
                mark.subject.subjectCode === subjectCode
                  ? { ...mark, [field]: value }
                  : mark
              ),
            }
          : student
      )
    );
  };

  const handleSave = async (student, subjectCode) => {
    const subjectData = student.marks.find(
      (mark) => mark.subject.subjectCode === subjectCode
    );

    const payload = {
      regdNo: student.regdNo,
      courseName,
      joinYear,
      semesters: [
        {
          semesterNumber,
          subjectMarks: [
            {
              subject: subjectData.subject,
              cieMarks: {
                cie1: Number(subjectData.cie1),
                cie2: Number(subjectData.cie2),
                cie3: Number(subjectData.cie3),
                ese_gpa: Number(subjectData.ese_gpa),
                gpa: Number(subjectData.gpa),
              },
            },
          ],
        },
      ],
    };

    try {
      await axios.post("http://localhost:8080/teacher/semResults", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const key = `${student.regdNo}-${subjectCode}`;
      setDisabledFields((prev) => ({ ...prev, [key]: true }));
      console.log("Saved successfully!");
    } catch (err) {
      console.error("Failed to save:", err);
      alert("Error saving marks.");
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#fff" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Enter Marks
      </Typography>
      <TextField
        fullWidth
        placeholder="Search students..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>CIE 1</TableCell>
              <TableCell>CIE 2</TableCell>
              <TableCell>CIE 3</TableCell>
              <TableCell>ESE GPA</TableCell>
              <TableCell>GPA</TableCell>
              <TableCell>Save</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students
              .filter(
                (s) =>
                  s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  s.regdNo.includes(searchQuery)
              )
              .map((student) =>
                student.marks.map((mark) => {
                  const subjectCode = mark.subject.subjectCode;
                  const fieldKey = `${student.regdNo}-${subjectCode}`;
                  const isDisabled = disabledFields[fieldKey];

                  return (
                    <TableRow key={fieldKey}>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Avatar src={student.avatar} />
                          <Box>
                            <Typography>{student.name}</Typography>
                            <Typography variant="body2" color="gray">
                              {student.regdNo}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{mark.subject.subjectName}</TableCell>
                      {["cie1", "cie2", "cie3", "ese_gpa", "gpa"].map(
                        (field) => (
                          <TableCell key={field}>
                            <TextField
                              size="small"
                              type="number"
                              disabled={isDisabled}
                              value={mark[field]}
                              onChange={(e) =>
                                handleInputChange(
                                  student.regdNo,
                                  subjectCode,
                                  field,
                                  e.target.value
                                )
                              }
                              sx={{ width: 80 }}
                            />
                          </TableCell>
                        )
                      )}
                      <TableCell>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          disabled={isDisabled}
                          onClick={() => handleSave(student, subjectCode)}
                        >
                          Save
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ExamMarks;
