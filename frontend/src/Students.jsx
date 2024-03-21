
import { useRoom } from "../src/contexts/RoomContext";
import { useEffect, useState } from "react";
import React from 'react';
import StudentCard from "./StudentNewCard";
import axios from "axios";


const Students = () => {
  const { room , addStudent, removeStudent } = useRoom();

  const [students, setStudents] = useState([]); // Array to store fetched students

  const handleAddStudent = (student) => {
    if (room.length < 4) {
      addStudent(student);
    } else {
      // Display a message indicating the room is full
      alert("Room is already full! Maximum capacity is 4 students."); // Example alert
    }
  };

  useEffect(() => {
      const fetchStudents = async () => {
          const response = await axios.get('http://localhost:4040/api/students'); // Replace with your actual API endpoint
          setStudents(response.data);
      };

      fetchStudents();
  }, []);


  const isInRoom = (student) => room.some((existingStudent) => existingStudent._id === student._id);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          {students.map((student) => (
            <StudentCard
              key={student._id}
              student={student}
              isInRoom={isInRoom(student)}
              addStudent={handleAddStudent}
              removeStudent={removeStudent}
              style={{ border: `1px solid ${isInRoom(student) ? 'purple' : 'gray'}` }}
            />
          ))}

        </div>
      </div>
    </div>
  );

          }

export default Students;


