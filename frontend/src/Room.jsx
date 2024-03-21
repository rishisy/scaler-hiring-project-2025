import React from 'react';
import StudentCard from './StudentNewCard';
import { useRoom } from './contexts/RoomContext';

const Room = () => {
  const { room, removeStudent } = useRoom();
  const size = room.length;
  return (
    <div className="container">
      {size === 0 ? (
        <p className="text-center mt-5">No Students found</p>
      ) : (
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="h5">Evaluation Room : {size} students</p>
        </div>
      )}

      {size > 0 && (
        <div>
          {room.map((student) => (
            <StudentCard
              key={student._id}
              student={student}
              isInRoom={room.some((existingStudent) => existingStudent._id === student._id)} // Maintain existing logic for checking team membership
              removeStudent={removeStudent}

            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Room;
