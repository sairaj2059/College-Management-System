import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";

import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import ExamService from "../../services/ExamService";
import CourseService from "../../services/CourseService";
import ClassService from "../../services/ClassService";
import Autocomplete from "@mui/material/Autocomplete"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useSelector } from "react-redux";

function AddExam({closeFunction, refreshExamList}) {
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const teacherId = useSelector((state)=> state.auth.username);
  const [addExamData, setAddExamData] = useState({
    examTitle: "",
    subject: [],
    className: "",
    startDate: "",
    endDate: "",
    duration: "",
    status: "YET_TO_BE_PUBLISHED",
    uploadedBy: "", 
  });

  const calculateDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return "";

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end)) return "";

    const diffInMinutes = Math.floor((end - start) / (1000 * 60));
    return diffInMinutes > 0 ? diffInMinutes : "";
  };

  const handleAddExamButton = async ()=>{
    try {
      await handleSubmit();
      await refreshExamList();
      closeFunction();
      
    } catch (error) {
      console.log("Error adding Exam" + error);
      
    }
  }

  const handleSubmit = async (event) => {
    try {
      console.log(teacherId);
      
      addExamData.uploadedBy = teacherId;
      console.log(addExamData);
      const result = await ExamService.addExam(addExamData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setAddExamData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    async function getAllSubjects() {
      const response = await CourseService.getAllSubjects();
      setSubjects(response);
    }
    getAllSubjects();
  }, []);

  useEffect(() => {
    async function getClasses() {
      const response = await ClassService.getClasses();
      setClasses(
        response.map((className) => ({
          label: className,
        }))
      );
    }
    getClasses();
  }, []);

  return (
    <Card sx={{ }}>
      <Box
        sx={{
          borderTopLeftRadius: 7,
          borderTopRightRadius: 7,
          backgroundColor: "#d7e0e5",
          width: "100%",
          height: "5vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          p: 4,
        }}
      >
        <Typography level="h4">Add Exam</Typography>

      </Box>

      <Box sx={{ m: 2 }}>
        <Stack direction={"column"}>
          <Stack direction={"column"} gap={3}>
            <FormControl>
              <FormLabel>Exam Title</FormLabel>
              <Input
                name="examTitle"
                value={addExamData.examTitle}
                onChange={handleInput}
                size="sm"
                type="text"
                placeholder="Enter Exam Title"
                sx={{ width: "85%", p: 1.5, mt: 1 }}
              />
            </FormControl>
            <FormControl sx={{ display: "flex" }}> 
              <Autocomplete
                name="subject"
                options={subjects}
                value={addExamData.subjects}
                onChange={(event, newValue) => {
                  setAddExamData((prevData) => ({
                    ...prevData,
                    subject: newValue,
                  }));
                }}
                size="sm"
                getOptionLabel={(option) =>
                  `${option.subjectCode} ${option.subjectName}`
                }
                isOptionEqualToValue={(option, value) =>
                  option.subjectCode === value.subjectCode
                }
                sx={{ width: "85%", mt: 1 }}
                renderInput={(params) => <TextField {...params} label="Subject" />}
              />
            </FormControl>

            <Stack direction={"row"} spacing={5}>
              <FormControl>
                <FormLabel>Start Date</FormLabel>
                <DateTimePicker
                  name="startDate"
                  onChange={(newValue) => {
                    setAddExamData((prevData) => {
                      const isoStartDate = newValue
                        ? newValue.toISOString()
                        : "";
                      const updatedData = {
                        ...prevData,
                        startDate: isoStartDate,
                      };
                      return {
                        ...updatedData,
                        duration: calculateDuration(
                          updatedData.startDate,
                          updatedData.endDate
                        ),
                      };
                    });
                  }}
                  sx={{ width: 300, mt: 1 }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>End Date</FormLabel>
                <DateTimePicker
                  name="endDate"
                  onChange={(newValue) => {
                    setAddExamData((prevData) => {
                      const isoEndDate = newValue ? newValue.toISOString() : "";
                      const updatedData = {
                        ...prevData,
                        endDate: isoEndDate,
                      };
                      return {
                        ...updatedData,
                        duration: calculateDuration(
                          updatedData.startDate,
                          updatedData.endDate
                        ),
                      };
                    });
                  }}
                  sx={{ width: 300, mt: 1 }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Duration(In Minutes)</FormLabel>
                <Input
                  disabled={true}
                  name="duration"
                  value={addExamData.duration}
                  onChange={handleInput}
                  size="sm"
                  type="text"
                  placeholder="Enter Exam Title"
                  sx={{ width: "85%", p: 1.5, mt: 1 }}
                />
              </FormControl>
            </Stack>

            <FormControl >
              <Autocomplete
                value={classes.find(
                  (className) => classes.label === addExamData.className
                )}
                options={classes}
                onChange={(event, newValue) => {
                  setAddExamData((prevData) => ({
                    ...prevData,
                    className: newValue ? newValue.label : null,
                  }));
                }}
                getOptionLabel={(option) => (option ? option.label : "")}
                isOptionEqualToValue={(option, value) =>
                  option?.label === value?.label
                }
                sx={{ width: "85%", mt: 1, p: 1.5 }}
                renderInput={(params) => <TextField {...params} label="Class"/>}
              />
            </FormControl>
          </Stack>
        </Stack>
      </Box>

      <Box sx={{ alignSelf: "flex-end", mr: 5 }}>
        <Button onClick={handleAddExamButton}>Add Exam</Button>
      </Box>
    </Card>
  );
}

export default AddExam;
