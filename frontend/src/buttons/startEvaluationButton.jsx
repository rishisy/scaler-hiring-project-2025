import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios"; // Assuming you're using Axios for API call
import { AuthContext } from "../contexts/authContext";




const StartEvaluationButton = (user) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:4040/api/eval/", {
        mentor: user.user_id, // Replace with the appropriate key for user ID
      });

      console.log("Evaluation room started successfully:", response.data);

      // Handle successful response (e.g., navigate to evaluation room page)

    } catch (error) {
      console.error("Error starting evaluation room:", error);
      setError("Failed to start evaluation room. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button variant="primary" disabled={isLoading} onClick={handleClick}>
      {isLoading ? "Starting..." : "Start Evaluation Room"}
    </Button>
  );
};

export default StartEvaluationButton;
