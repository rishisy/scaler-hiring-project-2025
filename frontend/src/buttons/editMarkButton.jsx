import React from "react";
import { Button } from "react-bootstrap"; // Or your preferred button component
import { Link } from "react-router-dom";

const EditMarksButton = ({ studentId }) => {
  return (
    <Link to={`/edit-marks/${studentId}`}>
      <Button variant="primary" size="sm">
        Edit Marks
      </Button>
    </Link>
  );
};

export default EditMarksButton;