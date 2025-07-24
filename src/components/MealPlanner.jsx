import { useState, useRef } from 'react';
import './MealPlanner.css';

const pastelColors = [
  'linear-gradient(135deg, #fffbe6 0%, #ffe5ec 100%)', // peach
  'linear-gradient(135deg, #e0fff9 0%, #e0f7fa 100%)', // mint
  'linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 100%)', // lavender
  'linear-gradient(135deg, #fdf6e3 0%, #e0f7fa 100%)', // cream
];
const mealEmojis = ['🍳', '🥗', '🍛', '🍕', '🍔', '🍣', '🍜', '🥪', '🍲', '🍩'];

const MealPlanner = () => {
  const [meals, setMeals] = useState(() => {
    const saved = localStorage.getItem('meals');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [editIdx, setEditIdx] = useState(null);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef(null);

  // Save to localStorage
  const saveMeals = (newMeals) => {
    setMeals(newMeals);
    localStorage.setItem('meals', JSON.stringify(newMeals));
  };

  const handleAddMeal = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      inputRef.current && inputRef.current.focus();
      return;
    }
    const emoji = mealEmojis[Math.floor(Math.random() * mealEmojis.length)];
    const newMeals = [
      ...meals,
      { name: input.trim(), emoji }
    ];
    saveMeals(newMeals);
    setInput('');
    inputRef.current && inputRef.current.focus();
  };

  const handleDelete = (idx) => {
    const newMeals = meals.filter((_, i) => i !== idx);
    saveMeals(newMeals);
  };

  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditValue(meals[idx].name);
  };

  const handleEditSave = (idx) => {
    if (!editValue.trim()) return;
    const newMeals = meals.map((meal, i) =>
      i === idx ? { ...meal, name: editValue.trim() } : meal
    );
    saveMeals(newMeals);
    setEditIdx(null);
    setEditValue('');
  };

  return (
    <div className="meal-planner-bg">
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
      <h2 className="meal-planner-title">Meal Planner</h2>
      <form className="meal-input-area" onSubmit={handleAddMeal}>
        <input
          ref={inputRef}
          className="meal-input-box"
          type="text"
          placeholder="Add a meal (e.g. Avocado Toast)"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button className="add-meal-btn" type="submit">Add Meal</button>
      </form>
      <div className="meal-cards-section">
        {meals.length === 0 && (
          <div className="empty-meals">No meals added yet. Start planning!</div>
        )}
        <div className="meal-cards-grid">
          {meals.map((meal, idx) => (
            <div
              className="meal-card"
              key={idx}
              style={{ background: pastelColors[idx % pastelColors.length] }}
            >
              <div className="meal-card-top">
                <span className="meal-emoji">{meal.emoji}</span>
                <div className="meal-card-actions">
                  <span
                    className="meal-icon-btn"
                    title="Edit"
                    onClick={() => handleEdit(idx)}
                  >✏️</span>
                  <span
                    className="meal-icon-btn"
                    title="Delete"
                    onClick={() => handleDelete(idx)}
                  >🗑️</span>
                </div>
              </div>
              <div className="meal-card-content">
                {editIdx === idx ? (
                  <div className="edit-meal-row">
                    <input
                      className="edit-meal-input"
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') handleEditSave(idx);
                        if (e.key === 'Escape') setEditIdx(null);
                      }}
                      autoFocus
                    />
                    <button
                      className="save-edit-btn"
                      type="button"
                      onClick={() => handleEditSave(idx)}
                    >Save</button>
                  </div>
                ) : (
                  <span className="meal-name">{meal.name}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealPlanner; 