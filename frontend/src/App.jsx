import Navigation from'./Navbar.jsx'
import HomePage from './HomePage.jsx'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EvaluationPage from './EvaluationPage.jsx'
const About = () => {
  return (
    <div>
      <h1>About Us</h1>
      {/* ... About content */}
    </div>
  );
};

const Contact = () => {
  return (
    <div>
      <h1>Contact Us</h1>
      {/* ... Contact form, etc. */}
    </div>
  );
};

// App component with routing
const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={ <EvaluationPage /> } />
          <Route path="/contact" element={ <Contact /> } />
        </Routes>
      </div>
    </Router>
  );
};



export default App
