import Box from '@mui/joy/Box'
import Card from '@mui/joy/Card'
import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

function AdminDasboard() {
  return (
    <Box>
        <Card>
          
          <Link to="/admin/studentsList"><Button>Student List</Button>
          </Link>
            
        </Card>
    </Box>
  )
}

export default AdminDasboard