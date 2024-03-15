import React, { useState, useEffect } from 'react';
import StudentCard from './StudentCard.jsx';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';


const Homepage = () => {
    const [students, setStudents] = useState([]); // Array to store fetched students

    useEffect(() => {
        const fetchStudents = async () => {
            const response = await axios.get('http://localhost:4040/api/students'); // Replace with your actual API endpoint
            setStudents(response.data);
        };

        fetchStudents();
    }, []); // Empty dependency array to fetch data only once

    return (
        <Container>
            <Row>
                {students.map((student) => (
                    <StudentCard key={student._id} student={student} />
                ))}
            </Row>
        </Container>
    );
};

export default Homepage;

