import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import Logo from "../../components/Logo/Logo";
import "./LandingPage.css";

function LandingPage() {
  const { user } = useUser();

  return (
    <main className="landing">
      <div className="landing-logo">
        <Logo />
      </div>
      <h1 className="landing-title">A spoonful of something good</h1>
      <p className="landing-text">
        Browse recipes from home cooks, keep your own collection, and ask the AI
        assistant when you are stuck on what to make.
      </p>
      <div className="landing-actions">
        <Link to="/recipes" className="btn btn-primary">
          Explore Recipes
        </Link>
        {user ? (
          <Link to="/dashboard" className="btn btn-secondary">
            Go to Dashboard
          </Link>
        ) : (
          <Link to="/login" className="btn btn-secondary">
            Login
          </Link>
        )}
      </div>
    </main>
  );
}

export default LandingPage;