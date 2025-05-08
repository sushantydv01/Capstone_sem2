import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [quote, setQuote] = useState('');

  const quotes = [
    "Small changes lead to big results.",
    "Your body is a reflection of your lifestyle.",
    "Healthy eating is a way of life, not a diet.",
    "Every meal is a chance to nourish your body.",
    "Make your health a priority today."
  ];

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="nav-brand">Meal Planner</div>
        <div className="nav-links">
          <Link to="/calorie-tracker" className="nav-link">
            <span className="nav-icon">🔥</span>
            Calorie Tracker
          </Link>
          <Link to="/meal-planner" className="nav-link">
            <span className="nav-icon">🍽️</span>
            Meal Planner
          </Link>
        </div>
      </nav>

      <div className="content-wrapper">
        <h1 className="app-title">Calorie Counter & Meal Planner</h1>
        <p className="tagline">Track your meals. Plan your day. Stay healthy.</p>
        
        <div className="quote-container">
          <p className="motivational-quote">"{quote}"</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">📊</span>
            <h3>Smart Tracking</h3>
            <p>Easily log your meals and track your daily calorie intake</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📅</span>
            <h3>Meal Planning</h3>
            <p>Plan your meals ahead and maintain a balanced diet</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🎯</span>
            <h3>Goal Setting</h3>
            <p>Set personalized goals and track your progress</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📱</span>
            <h3>Mobile Friendly</h3>
            <p>Access your plans on any device, anywhere</p>
          </div>
        </div>

        <div className="navigation-buttons">
          <Link
            to="/calorie-tracker"
            className="nav-button nav-button-calorie-tracker"
          >
            <span className="button-icon">🔥</span>
            Calorie Tracker
          </Link>

          <Link
            to="/meal-planner"
            className="nav-button meal-planner"
          >
            <span className="button-icon">🍽️</span>
            Meal Planner
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

