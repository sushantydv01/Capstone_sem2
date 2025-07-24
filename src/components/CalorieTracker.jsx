import { useState, useRef, useEffect } from 'react';
import './CalorieTracker.css';

const DEFAULT_LIMIT = 2200;

function CalorieTracker() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('calorieEntries');
    return saved ? JSON.parse(saved) : [];
  });
  const [food, setFood] = useState('');
  const [calories, setCalories] = useState('');
  const [limit, setLimit] = useState(() => {
    const saved = localStorage.getItem('calorieLimit');
    return saved ? Number(saved) : DEFAULT_LIMIT;
  });
  const [editingLimit, setEditingLimit] = useState(false);
  const [limitInput, setLimitInput] = useState(limit);
  const inputRef = useRef(null);
  const limitInputRef = useRef(null);
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('calorieEntries', JSON.stringify(entries));
    localStorage.setItem('calorieLimit', limit);
  }, [entries, limit]);

  useEffect(() => {
    if (editingLimit && limitInputRef.current) {
      limitInputRef.current.focus();
      limitInputRef.current.select();
    }
  }, [editingLimit]);

  const totalCalories = entries.reduce((sum, e) => sum + Number(e.calories), 0);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!food.trim() || !calories) {
      setError('Please enter a food and calories.');
      inputRef.current && inputRef.current.focus();
      return;
    }
    if (Number(calories) <= 0) {
      setError('Calories must be positive.');
      inputRef.current && inputRef.current.focus();
      return;
    }
    setError('');
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

  const handleLimitClick = () => {
    setLimitInput(limit);
    setEditingLimit(true);
  };

  const handleLimitChange = (e) => {
    setLimitInput(e.target.value);
  };

  const saveLimit = () => {
    const val = Number(limitInput);
    if (!val || val < 1) {
      setLimitInput(limit);
      setEditingLimit(false);
      return;
    }
    setLimit(val);
    setEditingLimit(false);
  };

  const handleLimitKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveLimit();
    } else if (e.key === 'Escape') {
      setEditingLimit(false);
      setLimitInput(limit);
    }
  };

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
        <div className="ct-limit-card">
          <span className="ct-limit-label">Today's Limit:</span>
          {editingLimit ? (
            <input
              ref={limitInputRef}
              className="ct-limit-edit-input"
              type="number"
              min={1}
              value={limitInput}
              onChange={handleLimitChange}
              onBlur={saveLimit}
              onKeyDown={handleLimitKeyDown}
              style={{ width: '90px', border: '1.5px solid #38bdf8', borderRadius: '8px', padding: '0.3rem 0.7rem', fontSize: '1.05rem', fontFamily: 'inherit', color: '#23272f', background: '#fff', outline: 'none' }}
            />
          ) : (
            <span
              className="ct-limit-value ct-limit-editable"
              tabIndex={0}
              onClick={handleLimitClick}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleLimitClick()}
              style={{ cursor: 'pointer' }}
              title="Click to edit calorie limit"
            >
              {limit} kcal
            </span>
          )}
        </div>
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
        {error && <div className="ct-error">{error}</div>}
        <div className="ct-log-section">
          <div className="ct-log-title">Today’s Log</div>
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
        <div className="ct-total-row">
          <span className="ct-total-label">Total:</span>
          <span className="ct-total-value">{totalCalories} / {limit} kcal</span>
        </div>
      </div>
    </div>
  );
}

export default CalorieTracker; 