import React, { useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";

import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";

import Stack from "@mui/joy/Stack";

import Typography from "@mui/joy/Typography";

import Breadcrumbs from "@mui/joy/Breadcrumbs";

import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";

import { Link } from "react-router-dom";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";

import EditRoundedIcon from "@mui/icons-material/EditRounded";

import Autocomplete from "@mui/joy/Autocomplete";
import Avatar from "@mui/joy/Avatar";
import { roles, countries, departments } from "../resources/DataList";
import UserService from "../services/UserService";


const courses = [
  { label: "BSc Computer Science 2022" },
  { label: "BSc Computer Science 2023" },
  { label: "BSc Computer Science 2024" },
  { label: "MSc Data Science 2023" },
  { label: "MSc Data Science 2024" },
];



export default function RegisterUser() {
  const [selectedImage, setSelectedImage] = useState(null);

  const getOptionLabel = (option) => (option ? option.label : "");


  const isOptionEqualToValue = (option, value) => option?.label === value?.label;


  const [formData, setFormData] = useState({
    image: selectedImage,
    title: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    admissionNumber: "",
    regdNo: "",
    role: null,
    department: null,
    course: null,
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
      [fieldName]: newValue || null,
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

  const handleSubmit = async (event )=>{
    event.preventDefault();
    try {
      const result = UserService.registerUser(formData);
      console.log(result);
    }catch(error){
      console.error(error)
    }
  }

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(formData);
  // };
  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      <Box
        sx={{
          position: "sticky",
          top: { sm: -100, md: -110 },
          bgcolor: "background.body",
          zIndex: 9995,
        }}
      >
        <Box sx={{ px: { xs: 2, md: 6 } }}>
          <Breadcrumbs
            size="sm"
            aria-label="breadcrumbs"
            separator={<ChevronRightRoundedIcon fontSize="sm" />}
            sx={{ pl: 0 }}
          >
            <Link
              underline="none"
              color="neutral"
              href="#some-link"
              aria-label="Home"
            >
              <HomeRoundedIcon />
            </Link>
            <Link
              underline="hover"
              color="neutral"
              to="/admin"
              sx={{ fontSize: 12, fontWeight: 500 }}
            >
              Admin Dashboard
            </Link>
            <Typography color="primary" sx={{ fontWeight: 500, fontSize: 12 }}>
              Create Profile
            </Typography>
          </Breadcrumbs>
          <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
            Create Profile
          </Typography>
        </Box>
      </Box>

      <Box>
        <form onSubmit={handleSubmit}>
          <Stack
            spacing={4}
            sx={{
              display: "flex",
              maxWidth: "800px",
              mx: "auto",
              px: { xs: 2, md: 6 },
              py: { xs: 2, md: 3 },
            }}
          >
            <Card>
              <Box sx={{ mb: 1 }}>
                <Typography level="h3">Student Details</Typography>
              </Box>
              <Divider />

              <Stack
                direction="row"
                spacing={3}
                sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
              >
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
                        left: 100,
                        top: 170,
                        boxShadow: "sm",
                      }}
                    >
                      <EditRoundedIcon />
                    </IconButton>
                  </label>
                </Stack>
                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                  <Stack spacing={1}>
                    <FormLabel>Title</FormLabel>
                    <FormControl sx={{ display: "flex", gap: 2 }}>
                      <Input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInput}
                        size="sm"
                        placeholder="Enter Title"
                      />
                    </FormControl>
                    <FormLabel>First Name</FormLabel>
                    <FormControl sx={{ display: "flex", gap: 2 }}>
                      <Input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInput}
                        size="sm"
                        placeholder="Enter First Name"
                      />
                    </FormControl>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl sx={{ display: "flex", gap: 2 }}>
                      <Input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInput}
                        size="sm"
                        placeholder="Enter Last Name"
                      />
                    </FormControl>
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <FormControl>
                      <FormLabel>Admission Number</FormLabel>
                      <Input
                        name="admissionNumber"
                        value={formData.admissionNumber}
                        onChange={handleInput}
                        size="sm"
                        type="number"
                        placeholder="Enter Admission No."
                        sx={{ width: 300 }}
                      />
                    </FormControl>

                    <FormControl sx={{ display: "flex", flexGrow: 1 }}>
                      <FormLabel>Date of Birth</FormLabel>
                      <Input
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInput}
                        type="date"
                        size="sm"
                        sx={{ width: 300 }}
                      />
                    </FormControl>
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <FormControl>
                      <FormLabel>Role</FormLabel>
                      <Autocomplete
                        value={formData.role}
                        placeholder="Select Role"
                        onChange={handleAutocompleteChange("role")}
                        options={roles}
                        sx={{ width: 300 }}
                        getOptionLabel={getOptionLabel}
                        isOptionEqualToValue={isOptionEqualToValue}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Registration Number</FormLabel>
                      <Input
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleInput}
                        size="sm"
                        type="text"
                        placeholder="Enter Regd No."
                        sx={{ width: 300 }}
                      />
                    </FormControl>
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <FormControl>
                      <FormLabel>Department</FormLabel>
                      <Autocomplete
                      placeholder="Select Department"
                       value={departments.find((department) => department.label === formData.department)||null}
                       onChange={handleAutocompleteChange("department")}
                       options={departments}
                       sx={{ width: 300 }}
                       getOptionLabel={getOptionLabel}
                       isOptionEqualToValue={isOptionEqualToValue}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>National ID Number</FormLabel>
                      <Input
                        name="nationalIdNumber"
                        value={formData.nationalIdNumber}
                        onChange={handleInput}
                        size="sm"
                        type="text"
                        placeholder="Enter National ID No."
                        sx={{ width: 300 }}
                      />
                    </FormControl>
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <FormControl>
                      <FormLabel>Course</FormLabel>
                      <Autocomplete
                      placeholder="Select Course"
                        value={courses.find((course) => course.label === formData.course)}
                        onChange={handleAutocompleteChange("course")}
                        options={courses}
                        sx={{ width: 300 }}
                        getOptionLabel={getOptionLabel}
                        isOptionEqualToValue={isOptionEqualToValue}
                      
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Caste</FormLabel>
                      <Input
                        name="caste"
                        value={formData.caste}
                        onChange={handleInput}
                        size="sm"
                        type="text"
                        placeholder="Enter Caste"
                        sx={{ width: 300 }}
                      />
                    </FormControl>
                  </Stack>
                </Stack>
              </Stack>

              <Divider />
              <Box sx={{ mb: 1 }}>
                <Typography level="h4">Communication Address</Typography>
              </Box>
              <Divider />

              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <Stack spacing={1}>
                  <FormLabel>Address Line</FormLabel>
                  <FormControl>
                    <Input
                      name="addressLine"
                      value={formData.addressLine}
                      onChange={handleInput}
                      type="text"
                      size="sm"
                      placeholder="Address Line"
                    />
                  </FormControl>
                </Stack>

                <Stack direction={"row"} spacing={10}>
                  <Stack spacing={2}>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleInput}
                        size="sm"
                        placeholder="Enter City"
                        sx={{ width: 300 }}
                      />
                    </FormControl>

                    <FormLabel>District</FormLabel>
                    <FormControl>
                      <Input
                        name="district"
                        value={formData.district}
                        onChange={handleInput}
                        size="sm"
                        placeholder="Enter District"
                        sx={{ width: 300 }}
                      />
                    </FormControl>
                  </Stack>

                  <Stack spacing={2}>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input
                        name="state"
                        value={formData.state}
                        onChange={handleInput}
                        size="sm"
                        placeholder="Enter State"
                        sx={{ width: 300 }}
                      />
                    </FormControl>

                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Autocomplete
                      placeholder="Select Country"
                        value={countries.find((country) => country.label === formData.country)}
                        onChange={handleAutocompleteChange("country")}
                        options={countries}
                        sx={{ width: 300 }}
                        getOptionLabel={getOptionLabel}
                        isOptionEqualToValue={isOptionEqualToValue}
                        
                      />
                    </FormControl>
                  </Stack>
                </Stack>

                <Stack direction={"row"} spacing={10}>
                  <Stack spacing={2}>
                    <FormLabel>Pin Code</FormLabel>
                    <FormControl>
                      <Input
                        name="pinCode"
                        value={formData.pinCode}
                        onChange={handleInput}
                        size="sm"
                        placeholder="Enter Pin Code"
                        sx={{ width: 300 }}
                      />
                    </FormControl>

                    <FormLabel>Mobile No.</FormLabel>
                    <FormControl>
                      <Input
                        name="mobileNo"
                        value={formData.mobileNo}
                        onChange={handleInput}
                        size="sm"
                        placeholder="Enter Mobile No."
                        sx={{ width: 300 }}
                      />
                    </FormControl>
                  </Stack>

                  <Stack spacing={2}>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleInput}
                        size="sm"
                        type="email"
                        startDecorator={<EmailRoundedIcon />}
                        placeholder="Enter Email Address"
                        sx={{ width: 300 }}
                      />
                    </FormControl>
                  </Stack>
                </Stack>
              </Stack>
            </Card>

            {/* Parents & Guardian Deetails */}

            <Card>
              <Box sx={{ mb: 1 }}>
                <Typography level="h3">Parents & Guardian Details</Typography>
              </Box>
              <Divider />

              <Stack direction={"column"} spacing={5}>
                <Stack direction={"column"} spacing={2}>
                  <FormControl>
                    <FormLabel>Father's Full Name</FormLabel>
                    <Input
                      name="fathersName"
                      value={formData.fathersName}
                      onChange={handleInput}
                      type="text"
                      size="sm"
                      placeholder="Enter Father's Name"
                    />
                  </FormControl>

                  <Stack direction={"row"} flexGrow={1} spacing={10}>
                    <FormControl>
                      <FormLabel>Occupation</FormLabel>
                      <Input
                        name="fathersOccupation"
                        value={formData.fathersOccupation}
                        onChange={handleInput}
                        type="text"
                        size="sm"
                        placeholder="Father's Occupation"
                        sx={{ width: 300 }}
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
                        sx={{ width: 300 }}
                      />
                    </FormControl>
                  </Stack>

                  <Stack direction={"row"} spacing={10}>
                    <FormControl>
                      <FormLabel>Annual Income(In words)</FormLabel>
                      <Input
                        name="fathersAnnualIncome"
                        value={formData.fathersAnnualIncome}
                        onChange={handleInput}
                        type="text"
                        size="sm"
                        placeholder="Father's Annual Income"
                        sx={{ width: 300 }}
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
                        sx={{ width: 300 }}
                      />
                    </FormControl>
                  </Stack>
                </Stack>

                <Stack direction={"column"} spacing={2}>
                  <FormControl>
                    <FormLabel>Mother's Full Name</FormLabel>
                    <Input
                      name="mothersName"
                      value={formData.mothersName}
                      onChange={handleInput}
                      type="text"
                      size="sm"
                      placeholder="Enter Mother's Name"
                    />
                  </FormControl>

                  <Stack direction={"row"} flexGrow={1} spacing={10}>
                    <FormControl>
                      <FormLabel>Occupation</FormLabel>
                      <Input
                        name="mothersOccupation"
                        value={formData.mothersOccupation}
                        onChange={handleInput}
                        type="text"
                        size="sm"
                        placeholder="Mother's Occupation"
                        sx={{ width: 300 }}
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
                        sx={{ width: 300 }}
                      />
                    </FormControl>
                  </Stack>

                  <Stack direction={"row"} spacing={10}>
                    <FormControl>
                      <FormLabel>Annual Income(In words)</FormLabel>
                      <Input
                        name="mothersAnnualIncome"
                        value={formData.mothersAnnualIncome}
                        onChange={handleInput}
                        type="text"
                        size="sm"
                        placeholder="Mother's Annual Income"
                        sx={{ width: 300 }}
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
                        sx={{ width: 300 }}
                      />
                    </FormControl>
                  </Stack>
                </Stack>

                <Stack direction={"column"} spacing={2}>
                  <FormControl>
                    <FormLabel>Guardian's Full Name</FormLabel>
                    <Input
                      name="guardiansName"
                      value={formData.guardiansName}
                      onChange={handleInput}
                      type="text"
                      size="sm"
                      placeholder="Enter Guardian's Name"
                    />
                  </FormControl>

                  <Stack direction={"row"} flexGrow={1} spacing={10}>
                    <FormControl>
                      <FormLabel>Occupation</FormLabel>
                      <Input
                        name="guardiansOccupation"
                        value={formData.guardiansOccupation}
                        onChange={handleInput}
                        type="text"
                        size="sm"
                        placeholder="Guardian's Occupation"
                        sx={{ width: 300 }}
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
                        sx={{ width: 300 }}
                      />
                    </FormControl>
                  </Stack>
                  <Stack direction={"row"} flexGrow={1} spacing={10}>
                    <FormControl>
                      <FormLabel>Guardian's Address</FormLabel>
                      <Input
                        name="guardiansAddress"
                        value={formData.guardiansAddress}
                        onChange={handleInput}
                        type="text"
                        size="sm"
                        placeholder="Guardian's Occupation"
                        sx={{ width: 300 }}
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
                        placeholder="Guardian's Mobile No."
                        sx={{ width: 300 }}
                      />
                    </FormControl>
                  </Stack>
                </Stack>
              </Stack>
              <CardOverflow
                sx={{ borderTop: "1px solid", borderColor: "divider" }}
              >
                <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                  <Button size="sm" variant="outlined" color="neutral">
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" variant="solid">
                    Save
                  </Button>
                </CardActions>
              </CardOverflow>
            </Card>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}
