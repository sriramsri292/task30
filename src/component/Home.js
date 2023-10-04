import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



export default function Home() {
    const API = "https://jsonplaceholder.typicode.com/users";
    const [data, setData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
  
    useEffect(() => {
      axios.get(API)
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    }, []);
  
    const handleEdit = (user) => {
      setSelectedUser(user);
      setShowModal(true);
    };
  
    const handleDelete = (userId) => {
      // Implement delete functionality here
      // Use the userId to identify and delete the user from the data array
      const updatedData = data.filter(user => user.id !== userId);
      setData(updatedData);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
      setSelectedUser(null);
    };
  
    const handleSaveEdit = () => {
      // Implement edit functionality here
      // Update the selected user's data and close the modal
      // You can update the data array based on your application logic
      setShowModal(false);
    };
  
    return (
      <div className="a">
        <Navbar className="bg-body-tertiary">
        <Container className="b">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLNCqi7YVg1BZszYlV_OFsV6Vshxsz9V_j1e0s7gwUjw&s"
              width="70"
              height="60"
              className="d-inline-block align-top"
            />{' '}
            API USING AXIOS
          </Navbar.Brand>
        </Container>
      </Navbar>
      <h2>User Data</h2>
        {data && data.length > 0 && (
          <Row>
            {data.map(user => (
              <Col xs={6} className="my-3" key={user.id}>
               
                <ul>
                  <li>
                    <strong>ID:</strong> {user.id}<br />
                    <strong>Name:</strong> {user.name}<br />
                    <strong>Username:</strong> {user.username}<br />
                    <strong>Email:</strong> {user.email}<br />
                    <strong>Address:</strong> {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}<br />
                    <strong>Phone:</strong> {user.phone}<br />
                    <strong>Website:</strong> {user.website}<br />
                    <strong>Company:</strong> {user.company.name}<br />
                    <strong>Catch Phrase:</strong> {user.company.catchPhrase}<br />
                    <strong>Business:</strong> {user.company.bs}
                  </li>
                </ul>
                <div>
                  <button className="c"onClick={() => handleEdit(user)}>Edit</button>
                  <button className="c" onClick={() => handleDelete(user.id)}>Delete</button>
                </div>
              </Col>
            ))}
          </Row>
        )}
  
        {/* Modal for Editing */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Add form elements for editing user data */}
            {selectedUser && (
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                />
                {/* Add more input fields for other user properties */}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
  
