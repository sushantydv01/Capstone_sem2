import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './components/Home';
import CalorieTracker from './components/CalorieTracker';
import Login from './components/Login';
import MealPlanner from './components/MealPlanner';
import Navbar from './components/Navbar';
import GoalSetting from './components/GoalSetting';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => setLoggedIn(true);
  const handleLogout = () => setLoggedIn(false);

  return (
    <Router>
      <Navbar loggedIn={loggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/calorie-tracker" element={<CalorieTracker />} />
        <Route path="/meal-planner" element={<MealPlanner />} />
        <Route path="/goal-setting" element={<GoalSetting />} />
      </Routes>
    </Router>
  );
}

export default App;


