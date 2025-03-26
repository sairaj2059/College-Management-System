import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";

function ResultPage() {
  const navigate = useNavigate();
  const questionsList = useSelector((state) => state.questionsList.questions);

  return (
    <Box sx={{width:"100%", height:"100%"}}>
      <Box>
        <IconButton onClick={() => navigate("/student/exam")}>
          <ArrowBackIcon />
        </IconButton>
      </Box>

      {console.log(questionsList)}
      <Box sx={{display:"flex", flexDirection:"column", gap:2, alignItems:'center'}}>
        {questionsList.map((question, index) => (

          <Card sx={{width:"80%", minHeight:'10%'}}>
            <Typography>Question {index + 1} : {question.questionDetails.questionText}</Typography>
            <Typography color= {question.isCorrect? "success" : "danger"}>Your Answer: {question.userAnswer}</Typography>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default ResultPage;
