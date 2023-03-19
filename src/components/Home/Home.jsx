import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export default function Home() {
  const navigate = useNavigate();
  const [tasklist, setTasklist] = useState([]);

 
  useEffect(() => {
    get_task();
  }, []);
  const get_task =  () => {
    try {
      fetch("http://localhost:5000/api/todo",{
        method: 'GET'
      }).then((res)=>res.json())
      .then((value)=> setTasklist(value.data))
    } catch (err) {
      console.log(err);
    }
  };

  const update_task_id = (id)=>{
    fetch(`http://localhost:5000/api/todo/delete/${id}`,{
      method: "DELETE"
    }).then(()=>get_task())
  }
  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Task Name</th>
            <th>Status</th>
            <th>Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasklist.map((task, i) => (
            <tr key={i}>
            <td>{i+1}</td>
              <td>{task.name}</td>
              <td>{task.status}</td>
              <td>{moment(task.date).format("YYYY-MM-DD")}</td>
              <td style={{ cursor: "pointer" }}>
                <AiFillEdit onClick={() => {
                  navigate(`/edit/${task._id}`)
                }} />
              </td>
              <td style={{ cursor: "pointer" }}>
                <AiFillDelete 
                  onClick={()=> update_task_id(task._id)}
                />
              </td>
            </tr>
           ))}
        </tbody>  
      </Table>
    </div>
  );
}
