import React, { useEffect } from "react";

import { Table } from "antd";

import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Tooltip from "@mui/joy/Tooltip";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";

import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { useState } from "react";
import ExamService from "../../services/ExamService";
import Modal from "@mui/joy/Modal";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";



function ModifyRecord({ closeFuntion, record, examId }){
  const [studentExamDetail, setStudentExamDetail] = useState(record);

  const modifyAnswerList = async () => {
    try {
      console.log(studentExamDetail);
      
      await ExamService.modifyAnswerList(studentExamDetail, examId);
      alert("Changes saved successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveChanges = async () => {
    await modifyAnswerList();
    closeFuntion(false);
  };

  const inCorrectHandler = (answer) => {
    setStudentExamDetail((prevDetails) => ({
      ...prevDetails,
      attemptedQuestionsList: prevDetails.attemptedQuestionsList.map((q) =>
        q === answer ? { ...q, isCorrect: false, marksAwarded: 0 } : q
      ),
    }));
  };

  const correctHandler = (answer) => {
    setStudentExamDetail((prevDetails) => ({
      ...prevDetails,
      attemptedQuestionsList: prevDetails.attemptedQuestionsList.map((q) =>
        q === answer ? { ...q, isCorrect: true, marksAwarded: 5 } : q
      ),
    }));
  };

  return (
    <>
      <Card sx={{ minWidth: 800, maxHeight: 600, overflow: "auto" }}>
        <Box
          sx={{
            overflow: "scroll",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {studentExamDetail?.attemptedQuestionsList?.map((answer, index) => (

            <Card key={index}>
              
              <Typography level="title-lg">
                <Typography fontWeight={800}>Question:</Typography>
                {" " + answer.questionDetails.questionText}
              </Typography>
              <Typography color={answer.isCorrect ? "success" : "danger"}>
                <Typography fontWeight={800}>User Answer:</Typography>
                {" " + answer.userAnswer}
              </Typography>
              <Typography>
                <Typography fontWeight={800}>Marks Awarded:</Typography>
                {" " + answer.marksAwarded}
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mt: 1.5 }}>
                <Button
                  onClick={() => inCorrectHandler(answer)}
                  startDecorator={<ClearIcon />}
                  color="danger"
                >
                  Mark as Incorrect
                </Button>
                <Button
                  onClick={() => correctHandler(answer)}
                  startDecorator={<CheckIcon />}
                  color="success"
                >
                  Mark as Correct
                </Button>
              </Box>
            </Card>
          ))}
        </Box>
        <Button onClick={() => handleSaveChanges()}>Save Changes</Button>
      </Card>
    </>
  );
}

function ResultsList() {
  const navigate = useNavigate();
  const selectedExam = useSelector((state) => state.examList.selectedExam);
  const [resultList, setResultList] = useState([]);
  const [editRecord, setEditRecord] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState("");

  const handleExam = () => {
    setEditRecord((prev) => !prev);
  }

  useEffect(()=>{
    async function fetchResultList(params) {
      try {
        const response = await ExamService.getResultList(selectedExam.id);
        setResultList(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchResultList();
  }, [])

  const getStudentResult = async (regdNo) => {
    setSelectedRecord(regdNo);
    handleExam();
  }

  const columns = [
    {
      title: "Student Name",
      dataIndex: "studentName",
    },

    {
      title: "Regd No.",
      dataIndex: "regdNo",
    },

    {
      title: "Attempted Questions",
      dataIndex: "attemptedQuestions",
    },
    {
      title: "Correct Answers",
      dataIndex: "correctAnswers",
    },
    {
      title: "Marks",
      dataIndex: "marks",
      sorter: (a, b) => a.marks - b.marks,
      showSorterTooltip: {
        target: "full-header",
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit" placement="top">
            <IconButton onClick={()=> getStudentResult(record)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];
  return (
    <>
      <Box>
        <Box>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Table columns={columns} dataSource={resultList} />

        {editRecord && (
                <Modal open onClose={handleExam}>
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <ModifyRecord record={selectedRecord} examId={selectedExam.id} closeFuntion={handleExam} />
                  </Box>
                </Modal>
              )}
      </Box>
    </>
  );
}

export default ResultsList;
