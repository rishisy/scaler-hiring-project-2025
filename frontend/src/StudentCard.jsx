import React, { useState } from 'react';
import { Card, Col, Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';

function StudentCard({ student }) {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ideation_score, setIdeationScore] = useState(student.ideation_score || 0); // Initialize with default or student value
  const [execution_score, setExecutionScore] = useState(student.execution_score || 0);
  const [viva_score, setVivaScore] = useState(student.viva_score || 0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'ideation_score':
        setIdeationScore(value);
        break;
      case 'execution_score':
        setExecutionScore(value);
        break;
      case 'viva_score':
        setVivaScore(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.put(`http://localhost:4040/api/eval/student`, {
        mentor:"65f3fad6935029c11cec2157",
        student_id: student._id,
        ideation_score,
        execution_score,
        viva_score,
      });

      if (response.status === 200) {
        console.log('Student updated successfully!');
        handleClose(); // Close modal on success
      } else {
        console.error('Error updating student:', response.data);
      }
    } catch (error) {
      console.error('Error updating student:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Student Information</Card.Title>
          <Card.Text>Student ID: {student._id}</Card.Text>
          <Card.Text>Email: {student.email}</Card.Text>
          <Button variant="primary" onClick={handleShow}>
            Edit Student
          </Button>
        </Card.Body>
      </Card>

      {/* Modal for editing student information */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student ({student._id})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="ideation_score">
              <Form.Label>Ideation Score</Form.Label>
              <Form.Control
                type="number"
                name="ideation_score"
                value={ideation_score}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="execution_score">
              <Form.Label>Execution Score</Form.Label>
              <Form.Control
                type="number"
                name="execution_score"
                value={execution_score}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="viva_score">
              <Form.Label>Viva Score</Form.Label>
              <Form.Control
                type="number"
                name="viva_score"
                value={viva_score}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default StudentCard;

