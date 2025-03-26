import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import Card from "@mui/joy/Card";
import Autocomplete from "@mui/joy/Autocomplete";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import Chip from "@mui/joy/Chip";

import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import FormControl from "@mui/joy/FormControl";

import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";

import { addQuestion } from "../../redux/slices/examSlice";
import { useDispatch, useSelector } from "react-redux";
import ExamService from "../../services/ExamService";

const questionTypes = [
  { value: "multiple_choice", label: "Multiple Choice" },
  { value: "true_false", label: "True/False" },
  { value: "short_answer", label: "Short Answer" },
  { value: "multi_select", label: "Multi Select" },
  { value: "one_word", label: "One Word" },
];

function QuestionsPage() {
  const { id } = useParams(); // exam id if needed
  const { state } = useLocation(); //not for redux
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const teacherId = useSelector((state) => state.auth.username);
  const selectedExam = useSelector((state) => state.examList.selectedExam);
  const questions = useSelector((state) => state.questionsList.questions);

  const exam = state?.exam; // exam details passed from ExamList

  const [currentQuestion, setCurrentQuestion] = useState({
    questionType: "multiple_choice",
    text: "",
    options: ["", "", "", ""],
    correctAnswer: [],
    marks: 1,
  });

  const handleTypeChange = (event, newValue) => {
    setCurrentQuestion({
      ...currentQuestion,
      questionType: newValue,
      options:
        newValue === "multiple_choice" || newValue === "multi_select"
          ? ["", "", "", ""]
          : [],
    });
  };

  const handleAddQuestion = () => {
    dispatch(addQuestion(currentQuestion));
    setCurrentQuestion({
      questionType: "multiple_choice",
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: [],
      marks: 1,
    });
  };

  const handleSaveQuestion = async () => {
    const questionList = {
      examId: selectedExam.id,
      questions: questions,
    };
    try {
      const response = await ExamService.setQuestionsByTeacher(questionList);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </IconButton>
      <Box sx={{ mt: 2 }}>
        <Stack
          direction={"row"}
          spacing={2}
          sx={{ justifyContent: "space-between" }}
        >
          <Card
            sx={{
              backgroundColor: "background.level1",
              p: 2,
              width: "25%",
              height: "60%",
            }}
          >
            <Stack direction={"column"} spacing={3}>
              <FormControl>
                <FormLabel>Exam Name</FormLabel>
                <Input
                  disabled={true}
                  value={selectedExam.examTitle}
                  sx={{ p: 1.5 }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Question Type</FormLabel>
                <Select
                  value={currentQuestion.questionType}
                  onChange={handleTypeChange}
                  placeholder="Choose one…"
                  sx={{ p: 1.5 }}
                >
                  {questionTypes.map((type) => (
                    <Option key={type.value} value={type.value}>
                      {type.label}
                    </Option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Question Text</FormLabel>
                <Textarea
                  sx={{ p: 1.5 }}
                  minRows={2}
                  placeholder="Enter question text..."
                  value={currentQuestion.questionText}
                  onChange={(event) => {
                    setCurrentQuestion({
                      ...currentQuestion,
                      questionText: event.target.value,
                    });
                  }}
                />
              </FormControl>
              {currentQuestion.questionType === "multiple_choice" && (
                <>
                  {currentQuestion.options.map((option, index) => (
                    <>
                      <Input
                        key={index}
                        fullWidth
                        placeholder={`Option ${index + 1}`}
                        value={currentQuestion.options[index]}
                        onChange={(event) => {
                          const newOptions = [...currentQuestion.options];
                          newOptions[index] = event.target.value;
                          setCurrentQuestion({
                            ...currentQuestion,
                            options: newOptions,
                          });
                        }}
                      />
                    </>
                  ))}
                  <FormControl fullWidth>
                    <FormLabel>Correct Answer</FormLabel>
                    <Select
                      value={currentQuestion.correctAnswer[0] || ""}
                      onChange={(_, newValue) => {
                        setCurrentQuestion({
                          ...currentQuestion,
                          correctAnswer: [newValue], // store as an array with one element
                        });
                      }}
                      sx={{ p: 1.5 }}
                    >
                      {currentQuestion.options.map((option, index) => (
                        <Option key={index} value={option}>
                          {option || `Option ${index + 1}`}
                        </Option>
                      ))}
                    </Select>
                  </FormControl>
                </>
              )}

              {currentQuestion.questionType === "true_false" && (
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <FormLabel>Correct Answer</FormLabel>
                  <Select
                    value={currentQuestion.correctAnswer[0] || ""}
                    onChange={(e, newValue) =>
                      setCurrentQuestion({
                        ...currentQuestion,
                        correctAnswer: [newValue],
                      })
                    }
                    sx={{ p: 1.5 }}
                  >
                    <Option value="true">True</Option>
                    <Option value="false">False</Option>
                  </Select>
                </FormControl>
              )}

              {currentQuestion.questionType === "one_word" && (
                <FormControl>
                  <FormLabel>Correct Answer</FormLabel>
                  <Input
                    placeholder="Answer"
                    multiline
                    sx={{ p: 1.5 }}
                    value={currentQuestion.correctAnswer[0] || ""}
                    onChange={(event) => {
                      setCurrentQuestion({
                        ...currentQuestion,
                        correctAnswer: [event.target.value],
                      });
                    }}
                  />
                </FormControl>
              )}

              {currentQuestion.questionType === "multi_select" && (
                <>
                  {currentQuestion.options.map((option, index) => (
                    <Input
                      key={index}
                      fullWidth
                      placeholder={`Option ${index + 1}`}
                      value={currentQuestion.options[index]}
                      onChange={(event) => {
                        const newOptions = [...currentQuestion.options];
                        newOptions[index] = event.target.value;
                        setCurrentQuestion({
                          ...currentQuestion,
                          options: newOptions,
                        });
                      }}
                      sx={{ mb: 1 }}
                    />
                  ))}
                  <FormControl>
                    <FormLabel>Correct Answers</FormLabel>
                    <Select
                      sx={{ p: 1.5 }}
                      multiple
                      renderValue={(selected) => (
                        <Box sx={{ display: "flex", gap: "0.25rem" }}>
                          {selected.map((selectedOption) => (
                            <Chip
                              key={selectedOption}
                              variant="soft"
                              color="primary"
                            >
                              {selectedOption.label || selectedOption}
                            </Chip>
                          ))}
                        </Box>
                      )}
                      onChange={(e, newValue) => {
                        setCurrentQuestion({
                          ...currentQuestion,
                          correctAnswer: newValue,
                        });
                      }}
                    >
                      {currentQuestion.options.map((option, index) => (
                        <Option key={index} value={option}>
                          {option || `Option ${index + 1}`}
                        </Option>
                      ))}
                    </Select>
                  </FormControl>
                </>
              )}
              <Input
                placeholder="Marks"
                type="number"
                value={currentQuestion.marks}
                onChange={(e, newValue) =>
                  setCurrentQuestion({ ...currentQuestion, marks: newValue })
                }
                sx={{ mb: 2, width: 100, p: 1.5 }}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  onClick={() => {
                    handleSaveQuestion();
                  }}
                >
                  Save
                </Button>
                <Button
                  onClick={() => {
                    handleAddQuestion();
                  }}
                >
                  Add Question
                </Button>
              </Box>
            </Stack>
          </Card>
          <Box sx={{ width: "80%", height: "60%" }}>
            <Card
              sx={{
                backgroundColor: "background.level1",
                p: 2,
                width: "100%",
                maxHeight: "100%",
              }}
            >
              <Typography>Questions</Typography>
              <Box overflow={"scroll"}>
                {questions != null &&
                  questions.length > 0 &&
                  questions.map(
                    (question, index) =>
                      question !== undefined && (
                        <Box>
                          {question.correctAnswer !== null &&
                          <Card key={index} sx={{ p: 2, mb: 2 }}>
                            {console.log(question)}
                            <Typography variant="body1">
                              {question.questionText}
                            </Typography>
                            {question.questionType === "multiple_choice" && (
                              <Box>
                                <Typography>Options</Typography>
                                {question.options.map((option, idx) => (
                                  <Typography key={idx}>
                                    {idx + 1}. {option}
                                  </Typography>
                                ))}
                              </Box>
                            )}

                            {question.questionType === "multi_select" ? (
                              <>
                                <Typography>Correct Answers:</Typography>
                                {Array.isArray(question.correctAnswer) &&
                                  question.correctAnswer.map((option, idx) => (
                                    <Typography key={idx}>{option}</Typography>
                                  ))}
                              </>
                            ) : (
                              <Typography>
                                Correct Answer:
                                {Array.isArray(question.correctAnswer) &&
                                question.correctAnswer.length > 0
                                  ? question.correctAnswer[0]
                                  : "No Answer"}
                              </Typography>
                            )}
                          </Card>}
                        </Box>
                      )
                  )}
              </Box>
            </Card>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default QuestionsPage;
