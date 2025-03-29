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

const data = [
  {
    key: "1",
    studentName: "John Brown",
    regdNo: "",
    attemptedQuestions: "",
    correctAnswers: "",
    marks: "",
  },
];

function ResultsList() {
  const navigate = useNavigate();
  const selectedExam = useSelector((state) => state.examList.selectedExam);
  const [resultList, setResultList] = useState([]);

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
            <IconButton>
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
      </Box>
    </>
  );
}

export default ResultsList;
