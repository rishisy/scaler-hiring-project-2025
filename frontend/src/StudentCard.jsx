import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const StudentCard = ({ student }) => {
    return (
        <Col sm={12} md={6} lg={4}>
            <Card>
                <Card.Body>
                    <Card.Title>{student.name}</Card.Title>
                    <ul>
                        <li>Email: {student.email}</li>
                        <li>Registration Number: {student.registration_number}</li>
                        <li>Evaluation Status: {student.evaluation_status}</li>
                    </ul>
                <Button variant="primary" href="" >View Marks </Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default StudentCard;

