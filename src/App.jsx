import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calorie-tracker" element={<div>Calorie Tracker Page (Coming Soon)</div>} />
        <Route path="/meal-planner" element={<div>Meal Planner Page (Coming Soon)</div>} />
      </Routes>
    </Router>
  );
}

export default App;
