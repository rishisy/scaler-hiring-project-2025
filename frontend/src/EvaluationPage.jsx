import React, { useState, useEffect } from 'react';
import { Row, Col, ListGroup, Card } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';
const StudentsPage = () => {
  const [fetchedStudents, setFetchedStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4040/api/students');
        const data = await response.json();
        setFetchedStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchData();
  }, []);

  const handleStudentSelect = (studentId) => {
    const newSelectedStudents = [...selectedStudents];
    const studentIndex = newSelectedStudents.findIndex((student) => student._id === studentId);

    if (studentIndex !== -1) {
      // Deselect the student
      newSelectedStudents.splice(studentIndex, 1);
    } else {
      // Select the student
      newSelectedStudents.push(fetchedStudents.find((student) => student._id === studentId));
    }

    setSelectedStudents(newSelectedStudents);
  };

  return (
    <div className="students-page">
      {/* Left section (1/4 of the page) - Fetched students list */}
      <Row>
        <Col md={4}>
          <h2>Fetched Students</h2>
          <ListGroup>
            {fetchedStudents.map((student) => (
              <ListGroup.Item key={student._id}>
                <label htmlFor={student._id}>
                  <input
                    type="checkbox"
                    id={student._id}
                    checked={selectedStudents.some((selected) => selected._id === student._id)}
                    onChange={() => handleStudentSelect(student._id)}
                  />
                  {student.name} ({student.email})
                </label>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* Right section (3/4 of the page) - Selected students list */}
        <Col md={8}>
          <h2>Selected Students</h2>
          <Card>
            <Card.Body>

      {selectedStudents.map((student) => (
            <ListGroup.Item key={student._id}>
              <div className="student-details">
                <span>{student.name} ({student.email})</span>
                <Form inline>
                  <Form.Group controlId={`marks1-${student._id}`}>
                    <Form.Control
                      type="number"
                      placeholder="Marks 1"
                      value={student.marks1 || ''} // Initialize with existing marks or an empty string
                      onChange={(e) => handleMarksChange(student._id, 'marks1', e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId={`marks2-${student._id}`}>
                    <Form.Control
                      type="number"
                      placeholder="Marks 2"
                      value={student.marks2 || ''}
                      onChange={(e) => handleMarksChange(student._id, 'marks2', e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId={`marks3-${student._id}`}>
                    <Form.Control
                      type="number"
                      placeholder="Marks 3"
                      value={student.marks3 || ''}
                      onChange={(e) => handleMarksChange(student._id, 'marks3', e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" size="sm" onClick={() => handleSave(student._id)}>
                    Save
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleRemove(student._id)}>
                    Remove
                  </Button>
                </Form>
              </div>
            </ListGroup.Item>
      ))}

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StudentsPage;

