import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import { Table } from "antd";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import React, { useState } from "react";
import Stack from "@mui/joy/Stack";
import { FormControl, FormLabel } from "@mui/material";
import Input from "@mui/joy/Input";

function ExamList() {
  const [examListData, setExamListData] = useState([]);
  const [addExam, setAddExam] = useState(false);
  const [addExamData, setAddExamData] = useState({
    examTitle: "",
    subject: "",
    startDate: "",
    endDate: "",
    duration: "",
    status: "",
    uploadedBy: "",
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setAddExamData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddExam = () => {
    setAddExam((prevBool) => !prevBool);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      showSorterTooltip: {
        target: "full-header",
      },
      onFilter: (value, record) => record.subject.indexOf(value) === 0,
      sorter: (a, b) => a.subject.localeCompare(b.subject),
    },

    {
      title: "Start Date",
      dataIndex: "startDate",
      defaultSortOrder: "descend",
      showSorterTooltip: {
        target: "full-header",
      },
      onFilter: (value, record) => record.startDate.indexOf(value) === 0,
      sorter: (a, b) => a.startDate.localeCompare(b.startDate),
    },
    {
      title: "End Data",
      dataIndex: "endDate",
      showSorterTooltip: {
        target: "full-header",
      },
      onFilter: (value, record) => record.endDate.indexOf(value) === 0,
      sorter: (a, b) => a.endDate.localeCompare(b.endDate),
    },

    {
      title: "Duration(In Minutes)",
      dataIndex: "duration",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Uploaded By",
      dataIndex: "uploadedBy",
      onFilter: (value, record) => record.uploadedBy.indexOf(value) === 0,
      sorter: (a, b) => a.uploadedBy.localeCompare(b.uploadedBy),
    },

    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  return (
    <>
      <Box sx={{ width: "100%", height: "100%" }}>
        <Card sx={{ display: addExam ? "none" : "flex" }}>
          <Box>
            <Button onClick={handleAddExam}>Add Exam</Button>
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
            </Card>
          </Box>
        </Card>

        <Card sx={{ display: addExam ? "flex" : "none" }}>
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
            <IconButton onClick={handleAddExam}>
              <Typography>X</Typography>
            </IconButton>
          </Box>

          <Box sx={{ m: 2 }}>
            <Stack direction={"column"}>
          <Stack direction={"row"} gap={5}>
            <FormControl>
              <FormLabel>Exam Title</FormLabel>
              <Input
                name="nationalIdNumber"
                value={addExamData.examTitle}
                onChange={handleInput}
                size="sm"
                type="text"
                placeholder="Enter Exam Title"
                sx={{ minWidth: 400 }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Exam Title</FormLabel>
              <Input
                name="nationalIdNumber"
                value={addExamData.examTitle}
                onChange={handleInput}
                size="sm"
                type="text"
                placeholder="Enter Exam Title"
                sx={{ minWidth: 400 }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Exam Title</FormLabel>
              <Input
                name="nationalIdNumber"
                value={addExamData.examTitle}
                onChange={handleInput}
                size="sm"
                type="text"
                placeholder="Enter Exam Title"
                sx={{ minWidth: 400 }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Exam Title</FormLabel>
              <Input
                name="nationalIdNumber"
                value={addExamData.examTitle}
                onChange={handleInput}
                size="sm"
                type="text"
                placeholder="Enter Exam Title"
                sx={{ minWidth: 400 }}
              />
            </FormControl>
          </Stack>
          </Stack>
          </Box>
        </Card>
      </Box>
    </>
  );
}

export default ExamList;
