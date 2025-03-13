import React from 'react'
import Box from "@mui/joy/Box";
import Card from '@mui/joy/Card'
import { FormControl, FormLabel } from "@mui/material";
import Input from '@mui/joy/Input';

function QuestionsPage(record) {
  return (
    <>
      <Box>
        <Card>
            <FormControl>
              <FormLabel>Exam Title</FormLabel>
              <Input
                value={record.examTitle}
              />
            </FormControl>
        </Card>
      </Box>
    </>
  )
}

export default QuestionsPage