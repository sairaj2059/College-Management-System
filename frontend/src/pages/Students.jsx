import React, { useEffect, useState } from "react";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

import {
  FileExcelOutlined,
  FilePdfOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";

import MenuButton from "@mui/joy/MenuButton";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";

import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";

import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import Dropdown from "@mui/joy/Dropdown";

import CourseService from "../services/CourseService";
import { Table } from "antd";
import UserService from "../services/UserService";



function Students() {
  const ExportAs = ["Export as PDF", "Export as Excel"];
  const [size, setSize] = useState("Medium");

  const [courseFilters, setCourseFilters] = useState([]);
  const [studentDetails, setStudentDetails] = useState([]);

  useEffect(()=>{
    async function getStudentDetails(){
      const response = await UserService.getStudentsDetails();
      setStudentDetails(response.map(student=>({
        applicationNumber: student.applicationNumber,
        regdNo: student.regdNo,
        name: student.firstName + " " + student.lastName,
        course: student.course,
        year: student.year,
        joinYear: student.joinYear
      })))
    }
    getStudentDetails();
  }, [])

  useEffect(() => {
    async function getCourses(){
      const response = await CourseService.getCourses();
      setCourseFilters(response.map(course =>({
        text : course,
        value: course
      })))
    }
    getCourses();
  }, []);


  const columns = [
    {
      title: "Application Number",
      dataIndex: "applicationNumber",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
    },
  
    {
      title: "Regd No",
      dataIndex: "regdNo",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.regdNo - b.regdNo,
    },
  
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: {
        target: "full-header",
      },
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
  
    {
      title: "Course",
      dataIndex: "course",
      filters: courseFilters,
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Year",
      dataIndex: "year",
      filters: [
        {
          text: "First",
          value: "First",
        },
        {
          text: "Second",
          value: "Second",
        },
        {
          text: "Third",
          value: "Third",
        },
        {
          text: "Fourth",
          value: "Fourth",
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Join Year",
      dataIndex: "joinYear",
      filters: [
        {
          text: "2022",
          value: "2022",
        },
        {
          text: "2023",
          value: "2023",
        },
        {
          text: "2024",
          value: "2024",
        },
        {
          text: "2025",
          value: "2025",
        }
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
  ];
  
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      regdNo: "24252413",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      regdNo: "2421534523",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      regdNo: "1",
    },
    {
      key: "4",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
      regdNo: "24265413",
    },
    {
      key: "5",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
      regdNo: "242112343",
    },
    {
      key: "6",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
      regdNo: "242134213",
    },
    {
      key: "7",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
      regdNo: "2421134",
    },
    {
      key: "8",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
      regdNo: "2",
    },
    {
      key: "9",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
      regdNo: "242325213",
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card sx={{ height: "98%", width: "98%" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography level="title-lg" fontWeight="bold">
                Students List
              </Typography>
            </Box>

            <Box display="flex" gap={2}>
              <Dropdown>
                <MenuButton variant="soft" endDecorator={<ArrowDropDown />}>
                  Export
                </MenuButton>
                <Menu
                  sx={{ minWidth: 160, "--ListItemDecorator-size": "24px" }}
                >
                  <ListItem nested>
                    <List aria-label="Font sizes">
                      {ExportAs.map((item) => (
                        <MenuItem
                          key={item}
                          role="menuitemradio"
                          aria-checked={item === size ? "true" : "false"}
                          onClick={() => {
                            setSize(item);
                          }}
                        >
                          <ListItemDecorator sx={{ mr: 0.25 }}>
                            {item === "Export as PDF" && <FilePdfOutlined />}
                            {item === "Export as Excel" && (
                              <FileExcelOutlined />
                            )}
                          </ListItemDecorator>
                          {item}
                        </MenuItem>
                      ))}
                    </List>
                  </ListItem>
                </Menu>
              </Dropdown>
              <Button
                variant="soft"
                sx={{
                  backgroundColor: "#4b4bf1",
                  color: "white",
                  ":hover": { backgroundColor: "#4b4bf1dc" },
                }}
                startDecorator={<PlusSquareOutlined />}
              >
                Add Student
              </Button>
            </Box>
          </Box>

          <Box>
            <Card>
              <Table
                pagination={true}
                rowSelection={5}
                columns={columns}
                dataSource={studentDetails}
                onChange={onChange(5)}
                showSorterTooltip={{
                  target: "sorter-icon",
                }}
              />
            </Card>
          </Box>
        </Card>
      </Box>
    </>
  );
}

export default Students;
