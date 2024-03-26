import React, { useState } from "react";
import { Form, Button, Card, Col, Row } from "react-bootstrap";
import axios from "axios"; // Assuming you're using Axios for API calls
import { useParams } from "react-router-dom";

const EditMarks = () => {
  const { studentId } = useParams();
  const [ideation_score, setIdationScore] = useState(0);
  const [viva_score, setVivaScore] = useState(0);
  const [execution_score, setExecutionScore] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate scores (optional)
    if (ideation_score < 0 || ideation_score > 100 ||
        viva_score < 0 || viva_score > 100 ||
        execution_score < 0 || execution_score > 100) {
      alert("Please enter scores between 0 and 100.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4040/api/", {
        // Replace with your actual API endpoint and data structure
        student_id : studentId,
        ideation_score,
        viva_score,
        execution_score,
      });

      console.log("Marks submitted successfully:", response.data);

      // Handle successful submission (e.g., reset form, show confirmation)
      setIdationScore(0);
      setVivaScore(0);
      setExecutionScore(0);

    } catch (error) {
      console.error("Error submitting marks:", error);

      // Handle errors (e.g., display error message)
    }
  };

  return (
    <Card border="light" className="shadow-sm p-3 mb-5 bg-white rounded">
      <Card.Title className="mb-3">Edit Marks for {name}</Card.Title>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} md={4}>
            <Form.Group controlId="ideationScore">
              <Form.Label>Ideation Score (0-100)</Form.Label>
              <Form.Control
                type="number"
                min={0}
                max={100}
                value={ideation_score}
                onChange={(e) => setIdationScore(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Form.Group controlId="vivaScore">
              <Form.Label>Viva Score (0-100)</Form.Label>
              <Form.Control
                type="number"
                min={0}
                max={100}
                value={viva_score}
                onChange={(e) => setVivaScore(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Form.Group controlId="executionScore">
              <Form.Label>Execution Score (0-100)</Form.Label>
              <Form.Control
                type="number"
                min={0}
                max={100}
                value={execution_score}
                onChange={(e) => setExecutionScore(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <br></br>
        <Button variant="primary" type="submit" >
          Submit Marks
        </Button>
      </Form>
    </Card>
  );
};

export default EditMarks;
