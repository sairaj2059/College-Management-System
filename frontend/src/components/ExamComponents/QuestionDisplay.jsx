import IconButton from "@mui/joy/IconButton";
import React, { useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";


import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Stack from "@mui/joy/Stack";
import { useSelector } from "react-redux";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";


function QuestionDisplay() {
  const navigate = useNavigate();
  const currentExam = useSelector((state) => state.examList.selectedExam);
  const [selectedQuestion, setSelectedQuestion] = useState(
    currentExam?.questions[0]
  );

  const [currentQuestion, setCurrentQuestion] = useState({
    questionDetails : null,
    isAttempted: false,
    isCorrect: false,
    marksAwarded: 0
  })
  
  const handleSelect = (question) => {
    setSelectedQuestion(question);
  };

  const handleAttemptQuestion = (questionDetails, userAnswer ) =>{
    if(questionDetails.correctAnswer === userAnswer){
        setCurrentQuestion({
            questionDetails : questionDetails,
            isAttempted: true,
            isCorrect: true,
            marksAwarded: questionDetails.marks
    })
    }else{
        setCurrentQuestion({
            questionDetails : questionDetails,
            isAttempted: true,
            isCorrect: false,
            marksAwarded: 0
        })
    }
  }
  return (
    <>
      <Box>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Stack spacing={2} direction={"row"}>
          <Card sx={{ width: "100%", minHeight: "100%" }}>
            <Box sx={{ width: "90%", height: "90%", m: "5%" }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, justifySelf:"flex-end" }}>
                <Typography>
                  Question Type: {selectedQuestion?.questionType}
                </Typography>
                <Typography>Marks: {selectedQuestion?.marks}</Typography>
              </Box>

              <Typography level="title-lg">
                {selectedQuestion?.questionText}
              </Typography>
              {selectedQuestion?.options.map((option, index) => (
                <Typography>
                  {index + 1}. {option}
                </Typography>
              ))}
              <Typography sx={{mt:5}}>
                Your Answer:
              </Typography>

              {selectedQuestion?.questionType === "multiple_choice" && (
                <Select>
                    {selectedQuestion?.options.map((option, index) => (
                      <Option key={index} value={option}>{option}</Option>
                    ))}
                </Select>
              )}


            </Box>
          </Card>
          <Card sx={{ width: "30%" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              {currentExam?.questions.map((question, index) => (
                <Chip
                  onClick={() => handleSelect(question)}
                  size="lg"
                  key={index}
                >{`${index + 1}`}</Chip>
              ))}
            </Box>
          </Card>
        </Stack>
      </Box>
    </>
  );
}

export default QuestionDisplay;
