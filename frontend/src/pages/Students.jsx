import React, { useState } from "react";
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

import { Table } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    showSorterTooltip: {
      target: "full-header",
    },
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Jim",
        value: "Jim",
      },
      {
        text: "Submenu",
        value: "Submenu",
        children: [
          {
            text: "Green",
            value: "Green",
          },
          {
            text: "Black",
            value: "Black",
          },
        ],
      },
    ],

    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Age",
    dataIndex: "age",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title:"Regd No",
    dataIndex:'regdNo',
    defaultSortOrder:"ascend",
    sorter:(a,b)=> a.regdNo - b.regdNo,
  },
  {
    title: "Address",
    dataIndex: "address",
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
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
  },{
    key: "5",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
    regdNo: "242112343",
  },{
    key: "6",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
    regdNo: "242134213",
  },{
    key: "7",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
    regdNo: "2421134",
  },{
    key: "8",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
    regdNo: "2",
  },{
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

function Students() {
  const ExportAs = ["Export as PDF", "Export as Excel"];
  const [size, setSize] = useState("Medium");

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
                dataSource={data}
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
