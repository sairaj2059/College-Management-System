import React, { useEffect, useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";

import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";

import Stack from "@mui/joy/Stack";

import Typography from "@mui/joy/Typography";

import Breadcrumbs from "@mui/joy/Breadcrumbs";

import Card from "@mui/joy/Card";

import { Link } from "react-router-dom";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import InfoIcon from "@mui/icons-material/Info";

import EditRoundedIcon from "@mui/icons-material/EditRounded";

import Autocomplete from "@mui/joy/Autocomplete";
import Avatar from "@mui/joy/Avatar";
import { countries, departments} from "../resources/DataList";
import UserService from "../services/UserService";
import CourseService from "../services/CourseService";

function AddStudent() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [courses, setCourses] = useState([]);

  const getOptionLabel = (option) => (option ? option.label : "");

  const isOptionEqualToValue = (option, value) =>
    option?.label === value?.label;

  const [formData, setFormData] = useState({
    image: selectedImage,
    title: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    applicationNumber: "",
    regdNo: "",
    department: null,
    course: null,
    caste: "",
    nationalIdNumber: "",
    year:"",
    addressLine: "",
    city: "",
    district: "",
    state: "",
    country: null,
    pinCode: "",
    mobileNo: "",
    emailAddress: "",
    joinYear: "",
    fathersName: "",
    fathersOccupation: "",
    fathersMobileNo: "",
    fathersEmailAddress: "",
    fathersAnnualIncome: "",
    mothersName: "",
    mothersOccupation: "",
    mothersMobileNo: "",
    mothersEmailAddress: "",
    mothersAnnualIncome: "",
    guardiansName: "",
    guardiansOccupation: "",
    guardiansMobileNo: "",
    guardiansEmailAddress: "",
    guardiansAddress: "",
  });

  const handleAutocompleteChange = (fieldName) => (event, newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: newValue ? newValue.label : null,
    }));
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await UserService.addStudent(formData);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   async function getCourses() {
  //     const response = await CourseService.getCourses();      
  //     setCourses(
  //       response.map((course) => ({
  //         label : course,
  //       }))
  //     );
  //   }
  //   getCourses();
    
  // }, []);
  return (
    <Card sx={{ width: "100%", height: "100%", m: 2, p: 5 }}>
      <Box
        sx={{
          position: "sticky",
          top: { sm: -100, md: -110 },
          bgcolor: "background.body",
          zIndex: 9995,
        }}
      >
        <Box sx={{ px: { xs: 2, md: 6 } }}>
          <Typography level="h3" fontWeight={"bold"}>
            Add Student
          </Typography>
          <Breadcrumbs
            size="sm"
            aria-label="breadcrumbs"
            separator={<ChevronRightRoundedIcon fontSize="sm" />}
            sx={{ pl: 0 }}
          >
            <Link color="neutral" href="#some-link" aria-label="Home">
              <HomeRoundedIcon />
            </Link>
            <Link to="/admin" sx={{ fontSize: 12, fontWeight: 500 }}>
              Admin Dashboard
            </Link>
            <Typography color="primary" sx={{ fontWeight: 500, fontSize: 12 }}>
              Add Students
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      <Box>
        <Card sx={{ p: 0 }}>
          <Box
            sx={{
              borderTopLeftRadius: 7,
              borderTopRightRadius: 7,
              backgroundColor: "#d7e0e5",
              width: "100%",
              height: "5vh",
              display: "flex",
              alignItems: "center",
              gap: 1,
              p: 1,
            }}
          >
            <InfoIcon />
            <Typography level="h4">Personal Information</Typography>
          </Box>
          <Box sx={{ m: 3 }}>
            <Stack direction="row" spacing={1}>
              <AspectRatio
                ratio="1"
                maxHeight={200}
                sx={{ minWidth: 120, borderRadius: "100%" }}
              >
                <Avatar src={selectedImage} />
              </AspectRatio>
              <input
                accept="image/*"
                id="upload-photo"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <label htmlFor="upload-photo">
                <IconButton
                  component="span"
                  aria-label="upload new picture"
                  size="sm"
                  variant="outlined"
                  color="neutral"
                  sx={{
                    bgcolor: "background.body",
                    position: "absolute",
                    zIndex: 2,
                    borderRadius: "50%",
                    left: 120,
                    top: 150,
                    boxShadow: "sm",
                  }}
                >
                  <EditRoundedIcon />
                </IconButton>
              </label>
            </Stack>
            <Stack direction={"column"}>
              <Stack direction={"row"} spacing={4} marginTop={4}>
                <FormControl sx={{ display: "flex" }}>
                  <FormLabel>Title</FormLabel>
                  <Input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInput}
                    size="sm"
                    placeholder="Enter Title"
                    sx={{ minWidth: 230 }}
                  />
                </FormControl>

                <FormControl sx={{ display: "flex" }}>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInput}
                    size="sm"
                    placeholder="Enter First Name"
                    sx={{ minWidth: 230 }}
                  />
                </FormControl>

                <FormControl sx={{ display: "flex" }}>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInput}
                    size="sm"
                    placeholder="Enter Last Name"
                    sx={{ minWidth: 230 }}
                  />
                </FormControl>
                <FormControl sx={{ display: "flex" }}>
                  <FormLabel>Application Number</FormLabel>
                  <Input
                    name="applicationNumber"
                    value={formData.applicationNumber}
                    onChange={handleInput}
                    size="sm"
                    type="text"
                    placeholder="Enter Application No."
                    sx={{ minWidth: 230 }}
                  />
                </FormControl>

                <FormControl sx={{ display: "flex" }}>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInput}
                    type="date"
                    size="sm"
                    sx={{ minWidth: 230 }}
                  />
                </FormControl>
                <FormControl sx={{ display: "flex" }}>
                  <FormLabel>Registration Number</FormLabel>
                  <Input
                    name="regdNo"
                    value={formData.regdNo}
                    onChange={handleInput}
                    size="sm"
                    type="text"
                    placeholder="Enter Regd No."
                  />
                </FormControl>
              </Stack>

              <Stack direction={"row"} spacing={4} marginTop={4}>
                <FormControl sx={{ display: "flex" }}>
                  <FormLabel>Department</FormLabel>
                  <Autocomplete
                    placeholder="Select Department"
                    value={departments.find(
                      (department) => department.label === formData.department
                    )}
                    onChange={handleAutocompleteChange("department")}
                    size="sm"
                    options={departments}
                    sx={{ minWidth: 230 }}
                    getOptionLabel={getOptionLabel}
                    isOptionEqualToValue={isOptionEqualToValue}
                  />
                </FormControl>

                <FormControl sx={{ display: "flex" }}>
                  <FormLabel>National ID Number</FormLabel>
                  <Input
                    name="nationalIdNumber"
                    value={formData.nationalIdNumber}
                    onChange={handleInput}
                    size="sm"
                    type="text"
                    placeholder="Enter National ID No."
                    sx={{ minWidth: 230 }}
                  />
                </FormControl>

                <FormControl sx={{ display: "flex" }}>
                  <FormLabel>Course</FormLabel>
                  <Autocomplete
                    placeholder="Select Course"
                    value={courses.find(
                      (course) => course.label === formData.course
                    )}
                    onChange={handleAutocompleteChange("course")}
                    size="sm"
                    options={courses}
                    sx={{ minWidth: 230 }}
                    getOptionLabel={getOptionLabel}
                    isOptionEqualToValue={isOptionEqualToValue}
                  />
                </FormControl>

                <FormControl sx={{ display: "flex" }}>
                  <FormLabel>Year</FormLabel>
                  <Input
                    name="year"
                    value={formData.year}
                    onChange={handleInput}
                    size="sm"
                    placeholder="Enter Year"
                    sx={{ minWidth: 230 }}
                  />
                </FormControl>

                <FormControl sx={{ display: "flex" }}>
                  <FormLabel>Address Line</FormLabel>
                  <Input
                    name="addressLine"
                    value={formData.addressLine}
                    onChange={handleInput}
                    type="text"
                    size="sm"
                    placeholder="Address Line"
                    sx={{ minWidth: 230 }}
                  />
                </FormControl>

                <FormControl sx={{ display: "flex" }}>
                  <FormLabel>City</FormLabel>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleInput}
                    size="sm"
                    placeholder="Enter City"
                  />
                </FormControl>
              </Stack>

              <Stack direction={"row"} spacing={4} marginTop={4}>
                <FormControl sx={{ display: "flex" }}>
                  <FormLabel>District</FormLabel>
                  <Input
                    name="district"
                    value={formData.district}
                    onChange={handleInput}
                    size="sm"
                    placeholder="Enter District"
                    sx={{ minWidth: 230 }}
                  />
                </FormControl>

                <FormControl sx={{ display: "flex" }}>
                  <FormLabel>State</FormLabel>
                  <Input
                    name="state"
                    value={formData.state}
                    onChange={handleInput}
                    size="sm"
                    placeholder="Enter State"
                    sx={{ minWidth: 230 }}
                  />
                </FormControl>

                <FormControl sx={{ display: "flex" }}>
                  <FormLabel>Country</FormLabel>
                  <Autocomplete
                    placeholder="Select Country"
                    value={countries.find(
                      (country) => country.label === formData.country
                    )}
                    onChange={handleAutocompleteChange("country")}
                    options={countries}
                    size="sm"
                    getOptionLabel={getOptionLabel}
                    isOptionEqualToValue={isOptionEqualToValue}
                    sx={{ minWidth: 230 }}
                  />
                </FormControl>
                <FormControl sx={{ display: "flex" }}>
                  <FormLabel>Email Address</FormLabel>
                  <Input
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleInput}
                    size="sm"
                    type="email"
                    startDecorator={<EmailRoundedIcon />}
                    placeholder="Enter Email Address"
                    sx={{ minWidth: 230 }}
                  />
                </FormControl>

                <FormControl sx={{ display: "flex" }}>
                  <FormLabel>Mobile No.</FormLabel>
                  <Input
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleInput}
                    size="sm"
                    placeholder="Enter Mobile No."
                    sx={{ minWidth: 230 }}
                  />
                </FormControl>

                <FormControl sx={{ display: "flex" }}>
                  <FormLabel>Pin Code</FormLabel>
                  <Input
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleInput}
                    size="sm"
                    placeholder="Enter Pin Code"
                  />
                </FormControl>
              </Stack>

              <Stack direction={"row"} spacing={4} marginTop={4}>
                <FormControl sx={{ display: "flex" }}>
                  <FormLabel>Join Year</FormLabel>
                  <Input
                    name="joinYear"
                    value={formData.joinYear}
                    onChange={handleInput}
                    size="sm"
                    placeholder="Enter Join Year"
                    sx={{ minWidth: 230 }}
                  />
                </FormControl>

                <FormControl sx={{ display: "flex" }}>
                  <FormLabel>Caste</FormLabel>
                  <Input
                    name="caste"
                    value={formData.caste}
                    onChange={handleInput}
                    size="sm"
                    type="text"
                    placeholder="Enter Caste"
                    sx={{ minWidth: 230 }}
                  />
                </FormControl>
              </Stack>
            </Stack>
          </Box>
        </Card>

        <Card sx={{ marginTop: 5, p: 0 }}>
          <Box
            sx={{
              borderTopLeftRadius: 7,
              borderTopRightRadius: 7,
              backgroundColor: "#d7e0e5",
              width: "100%",
              height: "5vh",
              display: "flex",
              alignItems: "center",
              gap: 1,
              p: 1,
            }}
          >
            <InfoIcon />
            <Typography level="h4">Parents & Guardian Information</Typography>
          </Box>

          <Box sx={{ m: 3 }}>
            <Stack direction={"column"}>
              <Stack direction={"row"} spacing={4}>
                <FormControl>
                  <FormLabel>Father's Full Name</FormLabel>
                  <Input
                    name="fathersName"
                    value={formData.fathersName}
                    onChange={handleInput}
                    type="text"
                    size="sm"
                    placeholder="Enter Father's Name"
                    sx={{ minWidth: 300 }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Occupation</FormLabel>
                  <Input
                    name="fathersOccupation"
                    value={formData.fathersOccupation}
                    onChange={handleInput}
                    type="text"
                    size="sm"
                    placeholder="Father's Occupation"
                    sx={{ minWidth: 300 }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Mobile No.</FormLabel>
                  <Input
                    name="fathersMobileNo"
                    value={formData.fathersMobileNo}
                    onChange={handleInput}
                    type="text"
                    size="sm"
                    placeholder="Father's Mobile No."
                    sx={{ minWidth: 300 }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Annual Income(In words)</FormLabel>
                  <Input
                    name="fathersAnnualIncome"
                    value={formData.fathersAnnualIncome}
                    onChange={handleInput}
                    type="text"
                    size="sm"
                    placeholder="Father's Annual Income"
                    sx={{ minWidth: 300 }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Father's Email Address</FormLabel>
                  <Input
                    name="fathersEmailAddress"
                    value={formData.fathersEmailAddress}
                    onChange={handleInput}
                    size="sm"
                    type="email"
                    startDecorator={<EmailRoundedIcon />}
                    placeholder="Enter Father's Email Address"
                    sx={{ width: 200 }}
                  />
                </FormControl>
              </Stack>

              <Stack direction={"row"} spacing={4} marginTop={4}>
                <FormControl>
                  <FormLabel>Mother's Full Name</FormLabel>
                  <Input
                    name="mothersName"
                    value={formData.mothersName}
                    onChange={handleInput}
                    type="text"
                    size="sm"
                    placeholder="Enter Mother's Name"
                    sx={{ minWidth: 300 }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Occupation</FormLabel>
                  <Input
                    name="mothersOccupation"
                    value={formData.mothersOccupation}
                    onChange={handleInput}
                    type="text"
                    size="sm"
                    placeholder="Mother's Occupation"
                    sx={{ minWidth: 300 }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Mobile No.</FormLabel>
                  <Input
                    name="mothersMobileNo"
                    value={formData.mothersMobileNo}
                    onChange={handleInput}
                    type="text"
                    size="sm"
                    placeholder="Mother's Mobile No."
                    sx={{ minWidth: 300 }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Annual Income(In words)</FormLabel>
                  <Input
                    name="mothersAnnualIncome"
                    value={formData.mothersAnnualIncome}
                    onChange={handleInput}
                    type="text"
                    size="sm"
                    placeholder="Mother's Annual Income"
                    sx={{ minWidth: 300 }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Mother's Email Address</FormLabel>
                  <Input
                    name="mothersEmailAddress"
                    value={formData.mothersEmailAddress}
                    onChange={handleInput}
                    size="sm"
                    type="email"
                    startDecorator={<EmailRoundedIcon />}
                    placeholder="Enter Mother's Email Address"
                    sx={{ width: 200 }}
                  />
                </FormControl>
              </Stack>

              <Stack direction={"row"} spacing={4} marginTop={4}>
                <FormControl>
                  <FormLabel>Guardian's Full Name</FormLabel>
                  <Input
                    name="guardiansName"
                    value={formData.guardiansName}
                    onChange={handleInput}
                    type="text"
                    size="sm"
                    placeholder="Enter Guardian's Name"
                    sx={{ minWidth: 300 }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Occupation</FormLabel>
                  <Input
                    name="guardiansOccupation"
                    value={formData.guardiansOccupation}
                    onChange={handleInput}
                    type="text"
                    size="sm"
                    placeholder="Guardian's Occupation"
                    sx={{ minWidth: 300 }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Mobile No.</FormLabel>
                  <Input
                    name="guardiansMobileNo"
                    value={formData.guardiansMobileNo}
                    onChange={handleInput}
                    type="text"
                    size="sm"
                    placeholder="Guardian's Mobile No."
                    sx={{ minWidth: 300 }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Guardian's Address</FormLabel>
                  <Input
                    name="guardiansAddress"
                    value={formData.guardiansAddress}
                    onChange={handleInput}
                    type="text"
                    size="sm"
                    placeholder="Guardian's Occupation"
                    sx={{ minWidth: 300 }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Guardian's Email Addres</FormLabel>
                  <Input
                    name="guardiansEmailAddress"
                    value={formData.guardiansEmailAddress}
                    onChange={handleInput}
                    type="text"
                    size="sm"
                    startDecorator={<EmailRoundedIcon />}
                    placeholder="Enter Guardian's Email Address"
                    sx={{ width: 200 }}
                  />
                </FormControl>
              </Stack>
            </Stack>
          </Box>
        </Card>
        <Box display={"flex"} justifyContent={"flex-end"} gap={2} mt={4}>
          <Button
            sx={{
              backgroundColor: "#e3ebf0",
              color: "black",
              ":hover": { backgroundColor: "#d7e0e5" },
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Student</Button>
        </Box>
      </Box>
    </Card>
  );
}

export default AddStudent;
