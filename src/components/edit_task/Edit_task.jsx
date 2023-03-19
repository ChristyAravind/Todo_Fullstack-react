import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import moment from 'moment'

export default function Edit_task() {

  const [data, setData] =useState(null)
  const {id} = useParams();
  
  useEffect(()=>{
    get_task_id()
  },[])
  const get_task_id = async ()=>{
    try{
      await fetch(`http://localhost:5000/api/todo/${id}`,{
        method:'GET'
      }).then((res)=>res.json())
      .then((value)=> {setData(value.data)
     
      })
      
    }catch (err){
      console.log("err",err);
    }
  }  
  return <div>{data ? <Update data={data} id = {id} /> : <h3>Loading</h3>  }</div>
}
function Update({data, id}){
  const [name, setName] = useState(data.name);
  const [status, setStatus] = useState(data.status);
  const [date, setDate] = useState(moment(data.date).format("YYYY-MM-DD"));
  console.log(date,"date")
  const navigate = useNavigate();
  const update_task_id = ()=>{
    const task = {
       name: name,
       status: status,
       date: date
    }
    fetch(`http://localhost:5000/api/todo/update/${id}`,{
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
  return (
    <>
        <Card className="text-center" border="light" style={{ width: "800px" }}>
        <Card.Header>Edit Task</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name of Task</Form.Label>
              <Form.Control type="text" value={name} onChange={(e)=> setName(e.target.value)} />
            </Form.Group>
            <label for="status">Select a Status</label>
           <select id="status" name= "status" value={status} onChange={(e)=> setStatus(e.target.value)}>
            <option value= "Yet to start">Yet to start</option>
            <option value= "In progress">In progress</option>
            <option value= "Completed">Completed</option>
           </select>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Dead Line of Task</Form.Label>
              <Form.Control type="date" value={date} onChange={(e)=> setDate(e.target.value)}  />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={() =>{
                update_task_id()
                navigate("/")}}
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}
