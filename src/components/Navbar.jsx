import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar({ loggedIn, onLogout }) {
  const location = useLocation();
  return (
    <nav className="navbar-ct">
      <div className="navbar-logo">CalTrack</div>
      <div className="navbar-links">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
        <NavLink to="/calorie-tracker" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Calorie Tracker</NavLink>
        <NavLink to="/meal-planner" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Meal Planner</NavLink>
        <NavLink to="/goal-setting" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Goals</NavLink>
        {!loggedIn && (
          <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link signup-link active' : 'nav-link signup-link'}>Sign Up</NavLink>
        )}
        {loggedIn && (
          <button className="navbar-logout-btn" onClick={onLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar; 