
import React, { useState } from "react";


import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { updateQuestion } from "../../redux/slices/examSlice";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import IconButton from "@mui/joy/IconButton";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Stack from "@mui/joy/Stack";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";

function QuestionDisplay() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const questionsList = useSelector((state) => state.questionsList.questions);
  const [selectedQuestion, setSelectedQuestion] = useState(questionsList[0]);

  const [currentQuestion, setCurrentQuestion] = useState({
    questionDetails: null,
    isAttempted: false,
    isCorrect: false,
    marksAwarded: 0,
    userAnswer: [],
  });

  const handleSelect = (question) => {
    setSelectedQuestion(question);
  };

  const handleSubmit = () => {
    console.log(questionsList);
  };

  const handleAttemptQuestion = (questionDetails, userAnswer) => {
    const updatedQuestion = {
      questionDetails: questionDetails,
      isAttempted: true,
      isCorrect: questionDetails.correctAnswer === userAnswer,
      marksAwarded:
        questionDetails.correctAnswer === userAnswer
          ? questionDetails.marks
          : 0,
      userAnswer: userAnswer,
    };

    setCurrentQuestion(updatedQuestion);
    dispatch(updateQuestion(updatedQuestion));
  };
  return (
    <>
      <Box>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Stack spacing={2} direction={"row"}>
          <Card sx={{ width: "100%", minHeight: "100%" }}>
            <Card sx={{ width: "90%", height: "90%", m: "5%", p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                }}
              >
                <Typography>
                  Question Type:
                  {selectedQuestion?.questionDetails.questionType}
                </Typography>
                <Typography>
                  Marks: {selectedQuestion?.questionDetails.marks}
                </Typography>
              </Box>

              <Typography level="title-lg">
                {selectedQuestion?.questionDetails.questionText}
              </Typography>
              {selectedQuestion?.questionDetails.options.map(
                (option, index) => (
                  <Typography>
                    {index + 1}. {option}
                  </Typography>
                )
              )}
              <Typography sx={{ mt: 5 }}>Your Answer:</Typography>

              {selectedQuestion?.questionDetails.questionType ===
                "multiple_choice" && (
                <Select
                  value={selectedQuestion?.userAnswer}
                  sx={{ width: 300 }}
                  onChange={(e, newValue) =>
                    setSelectedQuestion({
                      ...selectedQuestion,
                      userAnswer: newValue,
                    })
                  }
                >
                  {selectedQuestion?.questionDetails.options.map(
                    (option, index) => (
                      <Option key={index} value={option}>
                        {option}
                      </Option>
                    )
                  )}
                </Select>
              )}

              {selectedQuestion?.questionDetails.questionType ===
                "short_answer" && (
                <Textarea
                  value={selectedQuestion?.userAnswer}
                  onChange={(event) => {
                    setSelectedQuestion({
                      ...selectedQuestion,
                      userAnswer: event.target.value,
                    });
                  }}
                  minRows={4}
                />
              )}

              {selectedQuestion?.questionDetails.questionType ===
                "true_false" && (
                <Select
                  value={selectedQuestion?.userAnswer[0]}
                  sx={{ width: 300 }}
                  onChange={(e, newValue) =>
                    setSelectedQuestion({
                      ...selectedQuestion,
                      userAnswer: [newValue],
                    })
                  }
                >
                  <Option value="true">True</Option>
                  <Option value="false">False</Option>
                </Select>
              )}

              {selectedQuestion?.questionDetails.questionType ===
                "multi_select" && (
                <Select
                  sx={{ p: 1.5 }}
                  multiple
                  value={selectedQuestion?.userAnswer}
                  renderValue={(selected) => (
                    <Box
                      sx={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}
                    >
                      {selected.map((selectedValue) => (
                        <Chip
                          key={selectedValue}
                          variant="soft"
                          color="primary"
                        >
                          {selectedValue.value}
                        </Chip>
                      ))}
                    </Box>
                  )}
                  onChange={(e, newValue) => {
                    setSelectedQuestion({
                      ...selectedQuestion,
                      userAnswer: newValue,
                    });
                  }}
                >
                  {selectedQuestion?.questionDetails.options.map(
                    (option, index) => (
                      <Option key={index} value={option}>
                        {option}
                      </Option>
                    )
                  )}
                </Select>
              )}

              {selectedQuestion?.questionDetails.questionType ===
                "one_word" && (
                <Input
                  value={selectedQuestion?.userAnswer}
                  sx={{ width: 300 }}
                  onChange={(event) => {
                    setSelectedQuestion({
                      ...selectedQuestion,
                      userAnswer: [event.target.value],
                    });
                  }}
                />
              )}
              <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                <Button
                  onClick={() =>
                    handleAttemptQuestion(
                      selectedQuestion?.questionDetails,
                      selectedQuestion?.userAnswer
                    )
                  }
                >
                  Attempt Question
                </Button>
                <Button
                  onClick={() => {
                    handleSubmit();
                    navigate("results");
                  }}
                >
                  Submit Exam
                </Button>
              </Box>
            </Card>
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
              {questionsList?.map((question, index) => (
                <Chip
                  onClick={() => handleSelect(question)}
                  size="lg"
                  color={question.isAttempted ? "danger" : "primary"}
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
