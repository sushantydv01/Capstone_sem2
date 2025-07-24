import { useState, useRef, useEffect } from 'react';
import './GoalSetting.css';

const DEFAULT_GOAL = {
  calorieTarget: 2000,
  mealsPerDay: 3,
  targetWeight: ''
};

const GoalSetting = () => {
  const [goal, setGoal] = useState(() => {
    const saved = localStorage.getItem('fitnessGoal');
    return saved ? JSON.parse(saved) : null;
  });
  const [form, setForm] = useState(goal || DEFAULT_GOAL);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(!goal);
  const inputRef = useRef(null);

  useEffect(() => {
    if (goal) localStorage.setItem('fitnessGoal', JSON.stringify(goal));
    else localStorage.removeItem('fitnessGoal');
  }, [goal]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSave = e => {
    e.preventDefault();
    if (!form.calorieTarget || form.calorieTarget < 1 || !form.mealsPerDay || form.mealsPerDay < 1) {
      setError('Please enter valid values for all fields.');
      inputRef.current && inputRef.current.focus();
      return;
    }
    setGoal({
      calorieTarget: Number(form.calorieTarget),
      mealsPerDay: Number(form.mealsPerDay),
      targetWeight: form.targetWeight
    });
    setEditing(false);
    setError('');
  };

  const handleUpdate = () => {
    setForm(goal);
    setEditing(true);
    setError('');
  };

  const handleDelete = () => {
    setGoal(null);
    setForm(DEFAULT_GOAL);
    setEditing(true);
    setError('');
  };

  return (
    <div className="gs-bg">
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
      <div className="gs-container">
        <h2 className="gs-title">Set Your Fitness Goals</h2>
        <div className="gs-subtitle">Customize your daily targets</div>
        {editing ? (
          <form className="gs-form" onSubmit={handleSave}>
            <label htmlFor="calorieTarget">Daily Calorie Target</label>
            <input
              ref={inputRef}
              className="gs-input"
              id="calorieTarget"
              name="calorieTarget"
              type="number"
              min={1}
              value={form.calorieTarget}
              onChange={handleChange}
              placeholder="e.g. 2000"
            />
            <label htmlFor="mealsPerDay">Meals Per Day</label>
            <input
              className="gs-input"
              id="mealsPerDay"
              name="mealsPerDay"
              type="number"
              min={1}
              value={form.mealsPerDay}
              onChange={handleChange}
              placeholder="e.g. 3"
            />
            <label htmlFor="targetWeight">Target Weight (kg)</label>
            <input
              className="gs-input"
              id="targetWeight"
              name="targetWeight"
              type="number"
              min={0}
              value={form.targetWeight}
              onChange={handleChange}
              placeholder="e.g. 70"
            />
            {error && <div className="gs-error">{error}</div>}
            <button className="gs-save-btn" type="submit">Save Goal</button>
          </form>
        ) : (
          <div className="gs-goal-card">
            <div className="gs-goal-row"><span>Daily Calorie Target:</span> <strong>{goal.calorieTarget} kcal</strong></div>
            <div className="gs-goal-row"><span>Meals Per Day:</span> <strong>{goal.mealsPerDay}</strong></div>
            <div className="gs-goal-row"><span>Target Weight:</span> <strong>{goal.targetWeight ? goal.targetWeight + ' kg' : '-'}</strong></div>
            <div className="gs-goal-actions">
              <button className="gs-update-btn" onClick={handleUpdate}>Update</button>
              <button className="gs-delete-btn" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalSetting; 