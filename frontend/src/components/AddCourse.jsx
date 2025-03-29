import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Collapse,
} from "@mui/material";
import { Plus, Trash2, ChevronDown, ChevronUp, Save } from "lucide-react";
import axios from "axios";

const AddCourse = () => {
  const [courses, setCourses] = useState([]);
  const [expandedSemesters, setExpandedSemesters] = useState(new Set(["1", "2"]));
  const [saving, setSaving] = useState(false);
  const [savedCoursesTrigger, setSavedCoursesTrigger] = useState(false);

  useEffect(() => {
    const getCoursedata = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:8080/courses/getCoursesAndSemesters`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setCourses(response.data || []);
      } catch (error) {
        console.error(
          "Failed to fetch data:",
          error.response?.data || error.message
        );
        setCourses([]);
      }
    };

    getCoursedata();
  }, [savedCoursesTrigger]);

  const toggleSemester = (semesterNumber) => {
    const newExpanded = new Set(expandedSemesters);
    if (newExpanded.has(semesterNumber)) {
      newExpanded.delete(semesterNumber);
    } else {
      newExpanded.add(semesterNumber);
    }
    setExpandedSemesters(newExpanded);
  };

  const updateCourseInfo = (courseIndex, field, value) => {
    const newCourses = [...courses];
    newCourses[courseIndex] = { ...newCourses[courseIndex], [field]: value };
    setCourses(newCourses);
  };

  const updateSubject = (courseIndex, semesterIndex, subjectIndex, field, value) => {
    const newCourses = [...courses];
    newCourses[courseIndex].semestersList[semesterIndex].subjects[subjectIndex][field] = value;
    setCourses(newCourses);
  };

  const addSubject = (courseIndex, semesterIndex) => {
    const newCourses = [...courses];
    newCourses[courseIndex].semestersList[semesterIndex].subjects.push({
      subjectCode: "",
      subjectCredit: "",
      subjectTeacher: "",
      subjectTeacherId: null,
      subjectName: "",
    });
    setCourses(newCourses);
  };

  const removeSubject = (courseIndex, semesterIndex, subjectIndex) => {
    const newCourses = [...courses];
    newCourses[courseIndex].semestersList[semesterIndex].subjects.splice(subjectIndex, 1);
    setCourses(newCourses);
  };

  const addSemester = (courseIndex) => {
    const newCourses = [...courses];
    const newSemesterNumber = (newCourses[courseIndex].semestersList.length + 1).toString();
    newCourses[courseIndex].semestersList.push({
      semesterNumber: newSemesterNumber,
      subjects: [],
    });
    setCourses(newCourses);
    setExpandedSemesters(new Set([...expandedSemesters, newSemesterNumber]));
  };

  const addCourse = () => {
    const newCourse = {
      courseName: "",
      courseType: "",
      semestersList: [
        {
          semesterNumber: "1",
          subjects: [],
        },
      ],
    };
    setCourses([newCourse, ...courses]);
  };

  // Remove an entire course and delete it from the backend
  const removeCourse = async (courseIndex) => {
    const token = localStorage.getItem("token");
    const course = courses[courseIndex];
    if (course.id && token) {
      try {
        // Call the backend DELETE endpoint
        await axios.delete(`http://localhost:8080/courses/deleteCourse/${course.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("Course deleted in backend");
      } catch (error) {
        console.error(
          "Error deleting course in backend:",
          error.response?.data || error.message
        );
        // Optionally alert the user or abort removal if backend deletion fails
      }
    }
    // Remove course from local state
    const newCourses = [...courses];
    newCourses.splice(courseIndex, 1);
    setCourses(newCourses);
  };

  const postCourses = async () => {
    setSaving(true);
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      setSaving(false);
      return;
    }
    try {
      await axios.post(
        "http://localhost:8080/courses/saveNewCourse",
        courses,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSavedCoursesTrigger(prev => !prev);
    } catch (error) {
      console.error(
        "Error updating courses:",
        error.response?.data || error.message
      );
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    await postCourses();
  };

  return (
    <Container sx={{ py: 2 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "#1F2937",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          Edit Courses
        </Typography>
        <Button
          onClick={addCourse}
          sx={{
            backgroundColor: "#4F46E5",
            color: "#fff",
            px: 2,
            py: 1,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
            "&:hover": { backgroundColor: "#4338CA" },
          }}
        >
          <Plus size={20} />
          Add New Course
        </Button>
      </Box>

      {/* Courses */}
      {courses.map((course, courseIndex) => (
        <Box
          key={course.id || courseIndex}
          sx={{
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: 3,
            p: 4,
            mb: 4,
          }}
        >
          {/* Course header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Box
              sx={{
                background: "linear-gradient(to right, #4F46E5, #6D28D9)",
                p: 2,
                borderRadius: 2,
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#fff" }}>
                Course {courseIndex + 1}
              </Typography>
            </Box>
            <Button
              onClick={() => removeCourse(courseIndex)}
              sx={{
                backgroundColor: "#EF4444",
                color: "white",
                px: 2,
                py: 1,
                borderRadius: 2,
                boxShadow: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
                "&:hover": { backgroundColor: "#DC2626" },
                textTransform: "none",
              }}
            >
              <Trash2 size={20} />
              Remove Course
            </Button>
          </Box>

          {/* Course details */}
          <Box sx={{ mb: 6, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              label="Course Name"
              variant="outlined"
              value={course.courseName}
              onChange={(e) =>
                updateCourseInfo(courseIndex, "courseName", e.target.value)
              }
            />
            <TextField
              fullWidth
              label="Course Type"
              variant="outlined"
              value={course.courseType}
              onChange={(e) =>
                updateCourseInfo(courseIndex, "courseType", e.target.value)
              }
            />
          </Box>

          {/* Add Semester Button */}
          <Button
            onClick={() => addSemester(courseIndex)}
            sx={{
              mb: 4,
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "#4F46E5",
              textTransform: "none",
              "&:hover": { color: "#3730A3" },
            }}
          >
            <Plus size={20} />
            Add Semester
          </Button>

          {/* Semesters */}
          {course.semestersList.map((semester, semesterIndex) => (
            <Box
              key={semester.semesterNumber}
              sx={{ border: "1px solid #d1d5db", borderRadius: 2, p: 4, mb: 4 }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => toggleSemester(semester.semesterNumber)}
              >
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Semester {semester.semesterNumber}
                </Typography>
                {expandedSemesters.has(semester.semesterNumber) ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </Box>
              <Collapse in={expandedSemesters.has(semester.semesterNumber)}>
                <Box
                  sx={{
                    mt: 4,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  {semester.subjects.map((subject, subjectIndex) => (
                    <Box
                      key={subjectIndex}
                      sx={{ display: "flex", gap: 2, alignItems: "center" }}
                    >
                      <TextField
                        label="Subject Code"
                        variant="outlined"
                        value={subject.subjectCode}
                        onChange={(e) =>
                          updateSubject(
                            courseIndex,
                            semesterIndex,
                            subjectIndex,
                            "subjectCode",
                            e.target.value
                          )
                        }
                      />
                      <TextField
                        label="Subject Name"
                        variant="outlined"
                        value={subject.subjectName}
                        onChange={(e) =>
                          updateSubject(
                            courseIndex,
                            semesterIndex,
                            subjectIndex,
                            "subjectName",
                            e.target.value
                          )
                        }
                      />
                      <TextField
                        label="Credits"
                        variant="outlined"
                        value={subject.subjectCredit}
                        onChange={(e) =>
                          updateSubject(
                            courseIndex,
                            semesterIndex,
                            subjectIndex,
                            "subjectCredit",
                            e.target.value
                          )
                        }
                        sx={{ width: 80 }}
                      />
                      <TextField
                        label="Teacher"
                        variant="outlined"
                        value={subject.subjectTeacher}
                        onChange={(e) =>
                          updateSubject(
                            courseIndex,
                            semesterIndex,
                            subjectIndex,
                            "subjectTeacher",
                            e.target.value
                          )
                        }
                      />
                      <IconButton
                        onClick={() =>
                          removeSubject(courseIndex, semesterIndex, subjectIndex)
                        }
                        sx={{ color: "#EF4444", "&:hover": { color: "#DC2626" } }}
                      >
                        <Trash2 size={20} />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    onClick={() => addSubject(courseIndex, semesterIndex)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      color: "#4F46E5",
                      textTransform: "none",
                      "&:hover": { color: "#3730A3" },
                    }}
                  >
                    <Plus size={20} />
                    Add Subject
                  </Button>
                </Box>
              </Collapse>
            </Box>
          ))}
        </Box>
      ))}

      {/* Save Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          onClick={handleSave}
          disabled={saving}
          sx={{
            backgroundColor: "blue",
            color: "white",
            px: 6,
            py: 1,
            borderRadius: 2,
            boxShadow: 3,
            display: "flex",
            alignItems: "center",
            gap: 1,
            "&:hover": { backgroundColor: "green" },
            opacity: saving ? 0.9 : 1,
            textTransform: "none",
          }}
        >
          <Save size={20} />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Box>
    </Container>
  );
};

export default AddCourse;
