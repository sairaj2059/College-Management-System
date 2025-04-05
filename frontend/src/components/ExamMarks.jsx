import React, { useState, useEffect } from 'react';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Typography, Box, InputAdornment, Button } from '@mui/material';
import { Search } from '@mui/icons-material';
import axios from 'axios';

const initialStudents = [
  {
    id: '35013',
    name: 'Janet Miller',
    class: '10A',
    subjectInfo: 'MAT101 - Mathematics',
    cie1: '',
    cie2: '',
    cie3: '',
    ese: '',
    combined: '',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
  },
  {
    id: '35014',
    name: 'Michael Chen',
    class: '10B',
    subjectInfo: 'PHY201 - Physics',
    cie1: '',
    cie2: '',
    cie3: '',
    ese: '',
    combined: '',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop'
  },
  {
    id: '35015',
    name: 'Sarah Johnson',  
    class: '10A',
    subjectInfo: 'CHE301 - Chemistry',
    cie1: '',
    cie2: '',
    cie3: '',
    ese: '',
    combined: '',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop'
  }
];

const ExamMarks = () => {
  const [students, setStudents] = useState(initialStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState({ id: null, semesters: [] });
  const id = "224209";

  useEffect(() => {
      const fetchData = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }
        try {
          console.log(token);
          const response = await axios.get(
            `http://localhost:8080/teacher/semResults/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          setData(response.data || { id: null, semesters: [] });
          console.log(response.data);
        } catch (error) {
          console.error("Failed to fetch data:", error.response?.data || error.message);
          setData({ id: null, semesters: [] });
        }
      };
      fetchData();
    }, []);

    console.log(data);
    

  const handleInputChange = (id, field, value) => {
    setStudents(prevStudents => 
      prevStudents.map(student => 
        student.id === id ? { ...student, [field]: value } : student
      )
    );
  };

  const handleUpdate = (id) => {
    const student = students.find(s => s.id === id);
    console.log("Updated Student Data:", student);
    // Here, you could add an API call to save the updated student data
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.id.includes(searchQuery) ||
    student.subjectInfo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.class.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ minHeight: '100%', backgroundColor: 'white', padding: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" fontWeight="bold">Student Marks</Typography>
        <TextField
          variant="outlined"
          placeholder="Search by name, ID, subject, or class..."
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" sx={{ marginRight: 1 }} />
                </InputAdornment>
              ),
            },
          }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>CIE 1</TableCell>
              <TableCell>CIE 2</TableCell>
              <TableCell>CIE 3</TableCell>
              <TableCell>ESE</TableCell>
              <TableCell>Combined</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar src={student.avatar} />
                    <Box>
                      <Typography fontWeight="medium">{student.name}</Typography>
                      <Typography variant="body2" color="textSecondary">Regd ID: {student.id}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>{student.subjectInfo}</TableCell>
                {['cie1', 'cie2', 'cie3', 'ese', 'combined'].map(field => (
                  <TableCell key={field}>
                    <TextField
                      type="number"
                      value={student[field]}
                      onChange={(e) => handleInputChange(student.id, field, e.target.value)}
                      variant="outlined"
                      size="small"
                      sx={{ width: 80 }}
                    />
                  </TableCell>
                ))}
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleUpdate(student.id)}>
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ExamMarks;
