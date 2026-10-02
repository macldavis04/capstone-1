import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import type { Recipe } from "../../shared.types";
import recipeService from "../../utils/recipeService";
import { useUser } from "../../contexts/UserContext";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import "../RecipesPage/RecipesPage.css";
import "./DashboardPage.css";

function DashboardPage() {
  const { user } = useUser();
  const location = useLocation();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState<string>(location.state?.message ?? "");

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const all = await recipeService.getAll();
        setRecipes(all.filter((recipe) => recipe.ownerId === user?._id));
      } catch (err) {
        console.error("Error fetching recipes: ", err);
        setError("Could not load your recipes.");
      }
    };
    fetchMyRecipes();
  }, [user]);

  async function handleDelete(id: string) {
    const recipe = recipes.find((r) => r._id === id);
    const ok = window.confirm(`Delete "${recipe?.title}"? This cannot be undone.`);
    if (!ok) return;

    try {
      await recipeService.remove(id);
      setRecipes(recipes.filter((r) => r._id !== id));
      setMessage("Recipe deleted.");
    } catch (err) {
      console.error("Error deleting recipe: ", err);
      setError("Could not delete that recipe. It may already be gone, or it may not be yours.");
    }
  }

  return (
    <main className="page">
      <div className="dashboard-header">
        <div>
          <h1>My Recipes</h1>
          <p className="dashboard-user">Signed in as {user?.email}</p>
        </div>
        <Link to="/recipes/new" className="btn btn-primary">
          New Recipe
        </Link>
      </div>

      {message && (
        <p className="success-message" role="status">
          {message}
        </p>
      )}
      {error && <ErrorMessage message={error} />}

      {recipes.length === 0 && !error && (
        <p className="no-results">You have not added any recipes yet.</p>
      )}

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} onDelete={handleDelete} />
        ))}
      </div>
    </main>
  );
}

export default DashboardPage;