import { Outlet, useLocation } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import ExamList from "../components/ExamComponents/ExamList";

function ExamPage() {
  const location = useLocation();
  const isEditing = location.pathname.includes("questions");
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* Optionally, render a header or navigation specific to ExamPage */}
      {/* {!isEditing && <ExamList />} */}
      <Outlet />
    
    </LocalizationProvider>
  );
}

export default ExamPage;
