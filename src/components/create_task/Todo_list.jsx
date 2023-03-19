import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

export default function Todo_list() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Yet to start");
  const [date, setDate] = useState("");

  const create_task = ()=>{
    const task = {
       name: name,
       status: status,
       date: date
    }
    fetch("http://localhost:5000/api/todo/create",{
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
  return (
    <div>
      <Card className="text-center" border="light" style={{ width: "800px" }}>
        <Card.Header>Add Task</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name of Task</Form.Label>
              <Form.Control type="text" placeholder="Task Name" onChange={(e)=> setName(e.target.value)} />
            </Form.Group>
            <label for="status">Select a Status</label>
           <select id="status" name= "status" onChange={(e)=> setStatus(e.target.value)}>
            <option value= "Yet to start">Yet to start</option>
            <option value= "In progress">In progress</option>
            <option value= "Completed">Completed</option>
           </select>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Dead Line of Task</Form.Label>
              <Form.Control type="date" placeholder="Date" onChange={(e)=> setDate(e.target.value)}  />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={() =>{
                create_task()
                navigate("/")}}
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
