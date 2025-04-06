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
import { countries, departments, qualifications } from "../resources/DataList";
import UserService from "../services/UserService";
import CourseService from "../services/CourseService";
import ClassService from "../services/ClassService";

function AddTeacher() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [formData, setFormData] = useState({
    image: selectedImage,
    teacherId: "",
    title: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    department: null,
    caste: "",
    nationalIdNumber: "",
    addressLine: "",
    city: "",
    district: "",
    state: "",
    country: null,
    pinCode: "",
    mobileNo: "",
    emailAddress: "",
    classmentor: "",
    qualification: "",
    designation: "",
    subjects: [],
  });

  const getOptionLabel = (option) => (option ? option.label : "");

  const isOptionEqualToValue = (option, value) =>
    option?.label === value?.label;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const { teacherId } = formData; // Extract registration number
  
    if (!teacherId) {
      console.error("Registration number is required");
      return;
    }
  
    try {
      // Register the student using regdNo as the username
      const registerResponse = await UserService.Register(teacherId, "omsrisairam", "TEACHER");
  
      if (registerResponse) {
        console.log("User registered successfully:", registerResponse);
  
        // Proceed with adding student details
        const formDataToSend = new FormData();
        formDataToSend.append("teacherDetails", new Blob([JSON.stringify(formData)], { type: "application/json" }));
  
        if (selectedImage) {
          formDataToSend.append("imageFile", selectedImage);
        }
  
        const result = await UserService.addTeacher(formDataToSend);
        console.log("Teacher added successfully:", result);
      } else {
        console.error("Failed to register the user.");
      }
    } catch (error) {
      console.error("Error during registration or teacher addition:", error);
    }
  };

  const handleAutocompleteChange = (fieldName) => (event, newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: newValue ? newValue.label : null,
    }));
  };

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
  useEffect(() => {
    async function getSubjects() {
      const response = await CourseService.getAllSubjects();
      setSubjects(response);
    }
    getSubjects();
  }, []);
  return (
    <Box>
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
              Add Teacher
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
              <Typography
                color="primary"
                sx={{ fontWeight: 500, fontSize: 12 }}
              >
                Add Teacher
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
                    <FormLabel>Teacher Id</FormLabel>
                    <Input
                      type="text"
                      name="teacherId"
                      value={formData.teacherId}
                      onChange={handleInput}
                      size="sm"
                      placeholder="Enter Teacher Id"
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
                </Stack>

                <Stack direction={"row"} spacing={4} marginTop={4}>
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
                      sx={{ minWidth: 230 }}
                    />
                  </FormControl>
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
                </Stack>

                <Stack direction={"row"} spacing={4} marginTop={4}>
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
          <Card sx={{ p: 0, marginTop: 5 }}>
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
              <Typography level="h4">College Details</Typography>
            </Box>

            <Box sx={{ m: 3 }}>
              <Stack direction={"column"} spacing={4}>
                <Stack direction={"row"} spacing={4}>
                  <FormControl sx={{ display: "flex" }}>
                    <FormLabel>Mentorship</FormLabel>
                    <Autocomplete
                      placeholder="Select Class"
                      value={classes.find(
                        (className) =>  classes.label === formData.classmentor
                      )}
                      onChange={handleAutocompleteChange("classmentor")}
                      options={classes}
                      size="sm"
                      getOptionLabel={getOptionLabel}
                      isOptionEqualToValue={isOptionEqualToValue}
                      sx={{ minWidth: 230 }}
                    />
                  </FormControl>

                  <FormControl sx={{ display: "flex" }}>
                    <FormLabel>Subjects</FormLabel>
                    <Autocomplete
                      multiple
                      placeholder="Select Subjects"
                      options={subjects}
                      value={formData.subjects}
                      onChange={(event, newValue) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          subjects: newValue,
                        }));
                      }}
                      size="sm"
                      getOptionLabel={(option) =>
                        `${option.subjectCode} ${option.subjectName}`
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.subjectCode === value.subjectCode
                      }
                      sx={{ minWidth: 500 }}
                    />
                  </FormControl>
                  <FormControl sx={{ display: "flex" }}>
                    <FormLabel>Maximum Qualification</FormLabel>
                    <Autocomplete
                      placeholder="Maximum Qualification"
                      value={qualifications.find(
                        (qualification) =>
                          qualifications.label === formData.qualification
                      )}
                      onChange={handleAutocompleteChange("qualification")}
                      options={qualifications}
                      size="sm"
                      getOptionLabel={getOptionLabel}
                      isOptionEqualToValue={isOptionEqualToValue}
                      sx={{ minWidth: 230 }}
                    />
                  </FormControl>

                  <FormControl sx={{ display: "flex" }}>
                    <FormLabel>Designation</FormLabel>
                    <Input
                      name="designation"
                      value={formData.designation}
                      onChange={handleInput}
                      size="sm"
                      type="text"
                      placeholder="Enter Designation"
                      sx={{ minWidth: 230 }}
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
            <Button onClick={handleSubmit}>Add Teacher</Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default AddTeacher;
