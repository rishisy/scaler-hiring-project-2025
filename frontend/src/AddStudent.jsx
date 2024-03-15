import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'; // Assuming you're using Axios for HTTP requests

function AddStudent() {
  // State variables
  const [students, setStudents] = useState([]);
  const [show, setShow] = useState(false);

  // Fetch students from backend on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:4040/api/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
        // Handle errors appropriately, e.g., display an error message to the user
      }
    };

    fetchStudents();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddSelected = async () => {
    // Implement logic to handle selected students (e.g., send data to backend)
    const selectedStudents = students.filter((student) => student.checked); // Assuming a 'checked' property exists on each student object

    try {
      const response = await axios.post('http://localhost:4040/api/addStudents', selectedStudents); // Assuming a POST endpoint for adding students
      console.log('Students added successfully:', response.data); // Handle successful response
    } catch (error) {
      console.error('Error adding students:', error);
      // Handle errors appropriately, e.g., display an error message to the user
    }

    // Close the modal after successful addition (optional)
    setShow(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Students
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Students to Add</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {students.map((student) => (
              <Form.Check
                key={student._id} // Add a unique key for each checkbox
                type="checkbox"
                label={student.name}
              />
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddSelected}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddStudent;

