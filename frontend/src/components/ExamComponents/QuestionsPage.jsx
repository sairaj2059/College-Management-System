import React from 'react'
import Box from "@mui/joy/Box";
import Card from '@mui/joy/Card'
import { FormControl, FormLabel } from "@mui/material";
import Input from '@mui/joy/Input';
import { useLocation } from 'react-router-dom';

function QuestionsPage({record}) {
  return (
    <>
      <Box>
        <Card>
            <FormControl>
              <FormLabel>Exam Title</FormLabel>
            </FormControl>
        </Card>
      </Box>
    </>
  )
}

export default QuestionsPage