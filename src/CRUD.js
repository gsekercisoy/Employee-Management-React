import React, { useState, useEffect, Fragment } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const CRUD = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isActive, setIsActive] = useState(0);

  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editIsActive, setEditIsActive] = useState(0);

  const [data, setData] = useState([]);

  useEffect(() => {
    getdata();
  }, []);

  const getdata = () =>{
    axios.get('https://localhost:7010/api/Employee/GetAll')
    .then((result) =>{
        setData(result.data)
    })
    .catch((error) =>{
        console.log(error)
    })
  }


  const handleSave = () => {
    const url = 'https://localhost:7010/api/Employee/Add';
    const headers = {
        'Accept': 'text/plain',
        'Content-Type': 'application/json'
      };
    const data ={
        "name": name,
        "age": age,
        "isActive": isActive===1 ? true : false,
    }
    axios.post(url, data, {headers})
    .then((result) => {
        getdata();
        clear(); 
        toast.success('Employee has been added');
    })
    .catch((error) => {
        toast.error("Employee couldn't not been added");
    });
  }

  const handleDelete = (id) => {
    if(window.confirm("Are you sure to delete this employee?") == true ){
        axios.delete('https://localhost:7010/api/Employee/Delete/'+id)
        .then((result) => {
            if(result.status === 200){
                toast.success('Employee has been deleted!');
                getdata();
                clear();
            }
        })
        .catch((error) => {
            toast.error('An error occour');
        })
    }
  }


  const clear = () =>{
    setName('');
    setAge('');
    setIsActive(0);
    setEditName('');
    setEditAge('');
    setEditIsActive(0);
    setEditId('');
  }
  const handleActiveChange = (e) =>{
    if(e.target.checked){
        setIsActive(1);

    }
    else{
        setIsActive(0);
    }
  }
  const handleEditActiveChange = (e) =>{
    if(e.target.checked){
        setEditIsActive(1);
    }
    else{
        setEditIsActive(0);
    }
  }



  const handleEdit = (id) => {
    handleShow();
    axios.get('https://localhost:7010/api/Employee/GetById/'+id)
    .then((result) =>{
        setEditName(result.data.name);
        setEditAge(result.data.age);
        setEditIsActive(result.data.isActive==1 ? true : false);
        setEditId(id);
    })
    .catch((error) =>{
        console.log(error)
    })  
};

  const handleUpdate = () => {
    const url = 'https://localhost:7010/api/Employee/Update/'+editId;    
    const data ={
        'id':editId,
        "name": editName,
        "age": editAge,
        "isActive": editIsActive===1 ? false : true,
    }
    axios.put(url, data)
    .then((result) => {
        getdata();
        clear(); 
        toast.success('Employee has been updated');
        handleClose();
    })
    .catch((error) => {
        toast.error("Employee couldn't not been updated");
    });
  };

  return (
    <Fragment>
        <ToastContainer/>
        <Container>
        <Row>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Col>
            <Col>
              <input type="checkbox" 
              checked={isActive === 1 ? true : false} 
              onChange={(e) => handleActiveChange(e)} 
              value={isActive}
              />
              <label>IsActive</label>
            </Col>
            <Col>
                <button
                type="submit"
                className="btn btn-primary"
                onClick={() => handleSave()}
                >
                    Submit
                </button>
            </Col>
          </Row>
      </Container>
      <br></br>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>IsActive</th>
            <th>Actions</th>
          </tr>
        </thead>
        {data && data.length > 0 ? (
  <tbody>
    {data.map((item, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.age}</td>
        <td>{item.isActive == true ? 'Active': 'Passive'}</td>
        <td colSpan={2}>
          <button
            className="btn btn-primary"
            onClick={() => handleEdit(item.id)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(item.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
) : (
  <tbody>
    <tr>
      <td colSpan={7}>Loading...</td>
    </tr>
  </tbody>
)}
      </Table>

      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Age"
                value={editAge}
                onChange={(e) => setEditAge(e.target.value)}
              />
            </Col>
            <Col>
              <input type="checkbox" 
              checked={editIsActive} 
              onChange={(e) => handleEditActiveChange(e)} 
              value={editIsActive}
              />
              <label>IsActive</label>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default CRUD;
