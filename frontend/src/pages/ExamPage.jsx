import React from "react";
import ExamList from "../components/ExamComponents/ExamList";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";

function ExamPage() {
  return <>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <ExamList/>
  </LocalizationProvider>
        
  </>;
}

export default ExamPage;
