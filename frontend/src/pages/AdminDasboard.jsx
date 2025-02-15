import React from 'react'
import Button from "@mui/joy/Button";
import { Link } from 'react-router-dom';

function AdminDasboard() {
  return (
    <div>
      <Link to={"register-user"}>
      <Button>Register User</Button>
      </Link>
      
    </div>
  )
}

export default AdminDasboard