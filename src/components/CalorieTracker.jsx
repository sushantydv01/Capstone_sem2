import { useState } from 'react';
import { Link } from 'react-router-dom';
import './CalorieTracker.css';

function CalorieTracker() {
  const [foodItems, setFoodItems] = useState([]);
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');

  const addFood = (e) => {
    e.preventDefault();
    if (!foodName || !calories) return;

    const newFood = {
      id: Date.now(),
      name: foodName,
      calories: Number(calories)
    };

    setFoodItems([...foodItems, newFood]);
    setFoodName('');
    setCalories('');
  };

  const removeFood = (id) => {
    setFoodItems(foodItems.filter(item => item.id !== id));
  };

  const totalCalories = foodItems.reduce((total, item) => total + item.calories, 0);

  return (
    <div className="calorie-tracker-container">
      <nav className="navbar">
        <div className="nav-brand">Meal Planner</div>
        <div className="nav-links">
          <Link to="/" className="nav-link">🏠 Home</Link>
          <Link to="/calorie-tracker" className="nav-link">🔥 Calorie Tracker</Link>
          <Link to="/meal-planner" className="nav-link">🍽️ Meal Planner</Link>
        </div>
      </nav>

      <div className="calorie-tracker">
        <h1>Calorie Tracker</h1>
        
        <form onSubmit={addFood} className="food-form">
          <input
            type="text"
            placeholder="Food Name"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            required
          />
          <button type="submit">Add Food</button>
        </form>

        <div className="food-list">
          <h2>Food Items</h2>
          {foodItems.length === 0 ? (
            <p>No food items added yet</p>
          ) : (
            <ul>
              {foodItems.map(item => (
                <li key={item.id}>
                  <span>{item.name} - {item.calories} calories</span>
                  <button onClick={() => removeFood(item.id)}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="total-calories">
          <h2>Total Calories: {totalCalories}</h2>
        </div>
      </div>
    </div>
  );
}

export default CalorieTracker; 