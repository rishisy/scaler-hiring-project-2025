import React, { createContext, useContext, useEffect, useState } from "react";

const initRoom = {
  // ...other team data
  room: [],
};

export const roomContext = createContext();

const getInitialState = () => {
  const room  = localStorage.getItem("room");
  return room ? JSON.parse(room) : initRoom;
};

const RoomContextProvider = (props) => {
    const [room, setRoom] = useState(getInitialState);
    useEffect(() => {
        localStorage.setItem("room", JSON.stringify(room));
    }
    , [room]);
    const addStudent = (student) =>
        setRoom((prev) => ({
            ...prev,
            room: [...prev.room, student],
        }));
    const removeStudent = (studentId) =>
        setRoom((prev) => ({
            ...prev,
            room: prev.room.filter((s) => s._id !== studentId),
        }));
    return (
        <roomContext.Provider value={{ addStudent, removeStudent, ...room }}>
            {props.children}
        </roomContext.Provider>
    );
}



export const useRoom = () => useContext(roomContext);

export default RoomContextProvider;



