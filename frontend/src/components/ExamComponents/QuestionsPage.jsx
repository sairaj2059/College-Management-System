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

import { setQuestionList } from "../../redux/slices/examSlice";
import { useDispatch, useSelector } from "react-redux";

const questionTypes = [
  { value: "multiple_choice", label: "Multiple Choice" },
  { value: "true_false", label: "True/False" },
  { value: "short_answer", label: "Short Answer" },
  { value: "multi_select", label: "Multi Select" },
  { value: "one_word", label: "One Word" },
];

function QuestionsPage() {
  const { id } = useParams(); // exam id if needed
  const { state } = useLocation();//not for redux
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const teacherId = useSelector((state)=> state.username);

  const questions = useSelector((state) => state.questionsList.questions);

  const exam = state?.exam; // exam details passed from ExamList

  const [currentQuestion, setCurrentQuestion] = useState({
    type: "multiple_choice",
    text: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    points: 1,
  });

  // const handleTypeChange = (e) => {
  //   setCurrentQuestion({
  //     ...currentQuestion,
  //     type: e.target.value,
  //     options: e.target.value === "multiple_choice" ? ["", "", "", ""] : [],
  //     correctAnswer: "",
  //   });
  // };

  const handleTypeChange = (event, newValue) => {
    setCurrentQuestion({
      ...currentQuestion,
      type: newValue,
      options:
        newValue === "multiple_choice" || newValue === "multi_select"
          ? ["", "", "", ""]
          : [],
      correctAnswer: newValue === "multiple_select" ? [] : "",
    });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const handleAddQuestion = () => {
    dispatch(setQuestionList(currentQuestion));
    setCurrentQuestion({
      type: "multiple_choice",
      text: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      points: 1,
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </IconButton>
      <Box sx={{ mt: 2, mb: 2, overflow: "scroll" }}>
        <Stack
          direction={"row"}
          spacing={2}
          sx={{ mb: 2, justifyContent: "space-between" }}
        >
          <Card
            sx={{
              backgroundColor: "background.level1",
              p: 2,
              width: "30%",
              height: "70%",
              overflow: "scroll",
            }}
          >
            <Stack direction={"column"} spacing={3}>
              <FormControl>
                <FormLabel>Exam Name</FormLabel>
                <Input sx={{ p: 1.5 }} />
              </FormControl>
              <FormControl>
                <FormLabel>Question Type</FormLabel>
                <Select
                  value={currentQuestion.type}
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
                  minRows={3}
                  placeholder="Enter question text..."
                  value={currentQuestion.text}
                  onChange={(event) => {
                    setCurrentQuestion({
                      ...currentQuestion,
                      text: event.target.value,
                    });
                  }}
                />
              </FormControl>
              {currentQuestion.type === "multiple_choice" && (
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
                        sx={{ mb: 1 }}
                      />
                    </>
                  ))}
                  <FormControl fullWidth>
                    <FormLabel>Correct Answer</FormLabel>
                    <Select
                      value={currentQuestion.correctAnswer}
                      onChange={(_, newValue) => {
                        setCurrentQuestion({
                          ...currentQuestion,
                          correctAnswer: newValue,
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

              {currentQuestion.type === "true_false" && (
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <FormLabel>Correct Answer</FormLabel>
                  <Select
                    value={currentQuestion.correctAnswer}
                    onChange={(e, newValue) =>
                      setCurrentQuestion({
                        ...currentQuestion,
                        correctAnswer: newValue,
                      })
                    }
                    sx={{ p: 1.5 }}
                  >
                    <Option value="true">True</Option>
                    <Option value="false">False</Option>
                  </Select>
                </FormControl>
              )}

              {currentQuestion.type === "one_word" && (
                <FormControl>
                  <FormLabel>Correct Answer</FormLabel>
                  <Input placeholder="Answer" multiline sx={{ p: 1.5 }} />
                </FormControl>
              )}

              {currentQuestion.type === "multi_select" && (
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
                            <Chip variant="soft" color="primary">
                              {selectedOption.label}
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
                placeholder="Points"
                type="number"
                value={currentQuestion.points}
                onChange={(e, newValue) =>
                  setCurrentQuestion({ ...currentQuestion, points: newValue })
                }
                sx={{ mb: 2, width: 100, p: 1.5 }}
              />
              <Button
                onClick={() => {
                  handleAddQuestion();
                  console.log(questions);
                }}
              >
                Add Question
              </Button>
            </Stack>
          </Card>

          <Card
            sx={{
              backgroundColor: "background.level1",
              p: 2,
              width: "70%",
              overflow: "scroll",
            }}
          >
            <Typography>Questions</Typography>
            <Box overflow={"scroll"}>
              {questions != null && questions.length > 0 ? (
                questions.map((question, index) => (
                  <Card key={index} sx={{ p: 2, mb: 2 }}>
                    <Typography variant="body1">{question.text}</Typography>
                    {question.type === "multiple_choice" && (
                      <Box>
                        <Typography>Options</Typography>
                        {question.options.map((option, index) => (
                          <>
                            <Typography key={index}>
                              {index + 1}. {option}
                            </Typography>
                          </>
                        ))}
                      </Box>
                    )}

                    {question.type === "multi_select" ? (
                       <>
                       Correct Answers:
                       {question.correctAnswer.map((option, index) => (
                         <Typography>{option}</Typography>
                       ))}
                     </>
                      
                    ) : (
                      <Typography>
                      Correct Answer: {question.correctAnswer}
                    </Typography>
                    )}
                  </Card>
                ))
              ) : (
                <Box>No questions yet</Box>
              )}
            </Box>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
}

export default QuestionsPage;
