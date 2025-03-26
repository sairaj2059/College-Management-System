import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import { Table } from "antd";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import React, { useEffect, useState } from "react";
import Stack from "@mui/joy/Stack";
import { Modal } from "@mui/material";

import ExamService from "../../services/ExamService";

import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import QuestionsPage from "./QuestionsPage";
import AddExam from "./AddExam";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  setExamList,
  setQuestionList,
  setSelectedExam,
  clearQuestions,
} from "../../redux/slices/examSlice";

function ExamList() {
  const examListData = useSelector((state) => state.examList.exams);
  const [addExamToggle, setAddExamToggle] = useState(false);
  // const userId = useSelector((state) => state.auth.username);
  const userId = "224206";
  const selectedExam = useSelector((state) => state.examList.selectedExam);

  const role = useSelector((state) => state.auth.role);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const questions = useSelector((state) => state.questionsList.questions);

  const handleEdit = async (record) => {
    dispatch(clearQuestions());
    dispatch(setSelectedExam(record));
    navigate(`/teacher/exam/questions/${record.id}`);
  };

  const handleJoin = (record)=>{
    dispatch(clearQuestions());
    dispatch(setSelectedExam(record));
    
    navigate(`/student/exam/questions/${record.id}`);
  }

  useEffect(() => {
    async function fetchQuestions() {
      if (selectedExam?.id) {
        await getQuestionsByTeacher(selectedExam.id);
      }
    }
    fetchQuestions();
  }, [selectedExam]);

  const getQuestionsByTeacher = async (examId) => {
    const response = await ExamService.getQuestionsByTeacher(userId, examId);
    if (response) {
      dispatch(setQuestionList(response));
    }
  };
  const handleExam = () => {
    setAddExamToggle((prev) => !prev);
  };
  const fetchExamList = async () => {
    try {
      const response =
        role === "TEACHER"
          ? await ExamService.getExamListByTeacher(userId)
          : await ExamService.getExamListByStudent(userId);
      dispatch(setExamList(response));
    } catch (error) {
      console.error("Error fetching exam list:", error);
    }
  };

  useEffect(() => {
    fetchExamList();
  }, []);

  const handleDelete = async (id) => {
    try {
      await ExamService.deleteExam(id);
      fetchExamList();
    } catch (error) {
      console.error("Error deleting exam:", error);
    }
  };
  const handlePublishExam = async (record) => {
    try {
      const response = await ExamService.publishExam(record.id);
      if (response) {
        fetchExamList();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "examTitle",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      render: (subject) =>
        subject ? `${subject.subjectCode} ${subject.subjectName}` : "",
      sorter: (a, b) =>
        (a.subject?.subjectName ?? "").localeCompare(
          b.subject?.subjectName ?? ""
        ),
      onFilter: (value, record) => {
        const subjectCode = record.subject?.subjectCode?.toLowerCase() ?? "";
        const subjectName = record.subject?.subjectName?.toLowerCase() ?? "";
        return (
          subjectCode.includes(value.toLowerCase()) ||
          subjectName.includes(value.toLowerCase())
        );
      },
    },

    {
      title: "ClassName",
      dataIndex: "className",
      showSorterTooltip: {
        target: "full-header",
      },
      onFilter: (value, record) =>
        (record.className ?? "").indexOf(value) === 0,
      sorter: (a, b) => (a.className ?? "").localeCompare(b.className ?? ""),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      defaultSortOrder: "descend",
      showSorterTooltip: {
        target: "full-header",
      },
      onFilter: (value, record) =>
        (record.startDate ?? "").indexOf(value) === 0,
      sorter: (a, b) => (a.startDate ?? "").localeCompare(b.startDate ?? ""),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      showSorterTooltip: {
        target: "full-header",
      },
      onFilter: (value, record) => (record.endDate ?? "").indexOf(value) === 0,
      sorter: (a, b) => (a.endDate ?? "").localeCompare(b.endDate ?? ""),
    },
    {
      title: "Duration(In Minutes)",
      dataIndex: "duration",
    },

    ...(role === "TEACHER"
      ? [
          {
            title: "Status",
            dataIndex: "status",
          },
        ]
      : []),
    {
      title: "Uploaded By",
      dataIndex: "uploadedBy",
      onFilter: (value, record) =>
        (record.uploadedBy ?? "").indexOf(value) === 0,
      sorter: (a, b) => (a.uploadedBy ?? "").localeCompare(b.uploadedBy ?? ""),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Stack direction="row" spacing={1}>
          {role === "TEACHER" ? (
            <>
              <IconButton onClick={() => handleEdit(record)}>
                <EditIcon />
              </IconButton>

              <IconButton onClick={() => handleDelete(record.id)}>
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={() => handlePublishExam(record)}>
                <SendIcon />
              </IconButton>
            </>
          ) : (
            <>
              <Button onClick={() =>  handleJoin(record)}>Join</Button>
            </>
          )}
        </Stack>
      ),
    },
  ];

  return (
    <>
      <Box sx={{ width: "100%", height: "100%" }}>
        <Card>
          <Box sx={{ display:'flex', justifyContent: "space-between"}}>
            <Typography>Exam List</Typography>
            <Button sx={{display: role === "TEACHER" ? "flex" : "none"}} onClick={handleExam}>Add Exam</Button>
          </Box>

          <Box>
            <Card>
              <Table
                pagination={true}
                rowSelection={5}
                dataSource={examListData}
                columns={columns}
                showSorterTooltip={{
                  target: "sorter-icon",
                }}
              />
              {addExamToggle && (
                <Modal open onClose={handleExam}>
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <AddExam closeFunction={handleExam} />
                  </Box>
                </Modal>
              )}
            </Card>
          </Box>
          <div>
            <Outlet />
          </div>
        </Card>
      </Box>
    </>
  );
}

export default ExamList;
