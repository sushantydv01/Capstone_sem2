import { useState, useRef, useEffect } from 'react';
import './CalorieTracker.css';

function CalorieTracker() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('calorieEntries');
    return saved ? JSON.parse(saved) : [];
  });
  const [food, setFood] = useState('');
  const [calories, setCalories] = useState('');
  const inputRef = useRef(null);
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('calorieEntries', JSON.stringify(entries));
  }, [entries]);

  const handleAdd = (e) => {
    e.preventDefault();
    setError('');
    if (!food.trim() || !calories) {
      setError('Please enter both food and calories.');
      inputRef.current && inputRef.current.focus();
      return;
    }
    setEntries([
      ...entries,
      { name: food.trim(), calories: Number(calories) }
    ]);
    setFood('');
    setCalories('');
    inputRef.current && inputRef.current.focus();
  };

  const handleDelete = (idx) => {
    setEntries(entries.filter((_, i) => i !== idx));
  };

  // Calculate total calories
  const totalCalories = entries.reduce((sum, e) => sum + Number(e.calories), 0);

  return (
    <div className="ct-bg">
      {/* Upper-right fitness blob (dumbbell) */}
      <svg className="bg-blob upper-right" viewBox="0 0 320 320" fill="none">
        <ellipse cx="220" cy="100" rx="100" ry="100" fill="#a084ee" opacity="0.7" />
        <rect x="120" y="80" width="120" height="40" rx="16" fill="#38bdf8" opacity="0.7" />
        <rect x="100" y="70" width="20" height="60" rx="8" fill="#6ee7b7" opacity="0.8" />
        <rect x="220" y="70" width="20" height="60" rx="8" fill="#6ee7b7" opacity="0.8" />
      </svg>
      {/* Bottom-left fitness blob (apple) */}
      <svg className="bg-blob bottom-left" viewBox="0 0 320 320" fill="none">
        <ellipse cx="100" cy="220" rx="110" ry="110" fill="#6ee7b7" opacity="0.7" />
        <ellipse cx="180" cy="250" rx="60" ry="50" fill="#fca5f1" opacity="0.7" />
        <ellipse cx="60" cy="260" rx="50" ry="40" fill="#38bdf8" opacity="0.7" />
        <rect x="160" y="200" width="16" height="36" rx="8" fill="#a084ee" opacity="0.8" transform="rotate(-20 160 200)" />
      </svg>
      <div className="ct-container">
        <h2 className="ct-title">Calorie Tracker</h2>
        {error && <div className="ct-error">{error}</div>}
        <form className="ct-add-form" onSubmit={handleAdd}>
          <input
            ref={inputRef}
            className="ct-input ct-food-input"
            type="text"
            placeholder="Food item"
            value={food}
            onChange={e => setFood(e.target.value)}
          />
          <input
            className="ct-input ct-cal-input"
            type="number"
            placeholder="Calories"
            value={calories}
            onChange={e => setCalories(e.target.value)}
            min={1}
          />
          <button className="ct-add-btn" type="submit">Add</button>
        </form>
        <div className="ct-log-section">
          <div className="ct-log-list">
            {entries.length === 0 && (
              <div className="ct-empty">No entries yet. Start tracking!</div>
            )}
            {entries.map((entry, idx) => (
              <div className="ct-log-card" key={idx}>
                <span className="ct-log-food">{entry.name}</span>
                <span className="ct-log-cals">{entry.calories} kcal</span>
                <button
                  className="ct-log-delete"
                  title="Delete"
                  onClick={() => handleDelete(idx)}
                >🗑️</button>
              </div>
            ))}
          </div>
        </div>
        {/* Total calories display */}
        <div className="ct-total-row">
          <span className="ct-total-label">Total Calories:</span>
          <span className="ct-total-value">{totalCalories} kcal</span>
        </div>
      </div>
    </div>
  );
}

export default CalorieTracker; 