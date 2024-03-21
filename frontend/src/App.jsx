import Navigation from'./Navbar.jsx'
import HomePage from './HomePage.jsx'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EvaluationPage from './EvaluationPage.jsx'
import AuthContextProvider from './contexts/authContext.jsx';
import RoomContextProvider from "./contexts/RoomContext";
import Students from './Students.jsx';
import Room from './Room.jsx';



// App component with routing
const App = () => {
  return (
    <Router>
      <div>
      <AuthContextProvider>
        <RoomContextProvider>
      
        <Navigation />
        <br></br>


        {/* Routes */}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/evaluation" element={ <EvaluationPage /> } />
          <Route path="/students" element={ <Students /> } />
          <Route path="/room" element={ <Room /> } />
        </Routes>

        {/* Routes */}




      </RoomContextProvider>
      </AuthContextProvider>
      </div>
    </Router>
  );
};



export default App
