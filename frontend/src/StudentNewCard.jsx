import React from "react";
import { Card, Image, Button, ButtonGroup } from "react-bootstrap";
import { useRoom } from "../src/contexts/RoomContext";


function StudentCard({ student = {}, isInRoom, addStudent, removeStudent, style }) {
  const { _id, name, email, image } = student;

  return (
    <Card {...style} className="shadow-sm border-0">
      <Card.Body className="d-flex flex-row align-items-center">
        <Image
          src={image || "https://static.vecteezy.com/system/resources/previews/009/749/643/non_2x/woman-profile-mascot-illustration-female-avatar-character-icon-cartoon-girl-head-face-business-user-logo-free-vector.jpg"} // Use placeholder if no image provided
          className="img-fluid rounded-circle me-3"
          alt={name}
          width={75}
          height={75}
        />
        <div className="flex-grow-1">
          <Card.Title>{name}</Card.Title>
          <Card.Text className="text-muted">{email}</Card.Text>
          <ButtonGroup size="sm">
            {isInRoom ? (
              <Button variant="outline-danger" onClick={() => removeStudent(_id)}>
                Remove
              </Button>
            ) : (
              <Button variant="primary" onClick={() => addStudent(student)}>
                Add to Room
              </Button>
            )}
            {isInRoom && <Button variant="primary" disabled>In Room</Button>}
          </ButtonGroup>
        </div>
      </Card.Body>
    </Card>
  );
}

export default StudentCard;
