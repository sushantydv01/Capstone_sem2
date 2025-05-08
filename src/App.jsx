import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CalorieTracker from './components/CalorieTracker';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calorie-tracker" element={<CalorieTracker />} />
        <Route path="/meal-planner" element={<div>Meal Planner Page (Coming Soon)</div>} />
      </Routes>
    </Router>
  );
}

export default App;

