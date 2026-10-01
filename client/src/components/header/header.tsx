import { Link, NavLink } from "react-router-dom";
import Logo from "../logo/logo";
import "./header.css";

function Header() {
  return (
    <header className="app-header">
      <Link to="/" className="app-header-logo">
        <Logo />
      </Link>
      <nav className="app-nav">
        <NavLink to="/recipes">Recipes</NavLink>
        <NavLink to="/ai-assistant">AI Assistant</NavLink>
        <NavLink to="/recipe-ideas">Recipe Ideas</NavLink>
        <NavLink to="/login">Login</NavLink>
      </nav>
    </header>
  );
}

export default Header;