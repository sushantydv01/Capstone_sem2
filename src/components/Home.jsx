import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const featureData = [
  {
    icon: '📊',
    title: 'Smart Tracking',
    desc: 'Easily log your meals and track your daily calorie intake.'
  },
  {
    icon: '🍽️',
    title: 'Meal Planning',
    desc: 'Plan your meals ahead and maintain a balanced diet.'
  },
  {
    icon: '🎯',
    title: 'Goal Setting',
    desc: 'Set personalized goals and track your progress.'
  },
  {
    icon: '📱',
    title: 'Mobile Friendly',
    desc: 'Access your plans on any device, anywhere.'
  }
];

const quotes = [
  "Small changes lead to big results.",
  "Your body is a reflection of your lifestyle.",
  "Healthy eating is a way of life, not a diet.",
  "Every meal is a chance to nourish your body.",
  "Make your health a priority today."
];

const Home = () => {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const quoteInterval = useRef();

  useEffect(() => {
    quoteInterval.current = setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % quotes.length);
    }, 3500);
    return () => clearInterval(quoteInterval.current);
  }, []);

  return (
    <div className="home-bg">
      <div className="hero-section">
        <h1 className="hero-title">Calorie Counter & Meal Planner</h1>
        <p className="hero-subtitle">Track your meals. Plan your day. Stay healthy.</p>
      </div>
      <div className="quote-section">
        <div className="quote-card">
          <span className="quote-icon">💡</span>
          <span className="quote-text">"{quotes[quoteIdx]}"</span>
        </div>
      </div>
      <div className="features-section">
        <div className="features-row">
          {featureData.map((f, i) => (
            <div className="feature-card-modern" key={f.title}>
              <span className="feature-emoji">{f.icon}</span>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="cta-section">
        <Link to="/calorie-tracker" className="cta-btn cta-blue">Calorie Tracker</Link>
        <Link to="/meal-planner" className="cta-btn cta-coral">Meal Planner</Link>
      </div>
    </div>
  );
};

export default Home;

