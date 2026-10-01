// src/pages/LandingPage/LandingPage.tsx
import { Link } from "react-router-dom";
import Logo from "../../components/logo/logo";
import "./landingPage.css";

function LandingPage() {
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
        <Link to="/login" className="btn btn-secondary">
          Login
        </Link>
      </div>
    </main>
  );
}

export default LandingPage;