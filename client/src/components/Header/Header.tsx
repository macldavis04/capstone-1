import { Link, NavLink } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import Logo from "../Logo/Logo";
import "./Header.css";

function Header() {
  const { user, logout } = useUser();

  return (
    <header className="app-header">
      <Link to="/" className="app-header-logo">
        <Logo />
      </Link>
      <nav className="app-nav">
        <NavLink to="/recipes">Recipes</NavLink>
        <NavLink to="/ai-assistant">AI Assistant</NavLink>
        <NavLink to="/recipe-ideas">Recipe Ideas</NavLink>
        {user ? (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <button type="button" className="btn-text" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </nav>
    </header>
  );
}

export default Header;