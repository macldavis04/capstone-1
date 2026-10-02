import { useState, useEffect } from "react";
import type { Recipe } from "../../shared.types";
import recipeService from "../../utils/recipeService";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import "./RecipesPage.css";

function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await recipeService.getAll();
        setRecipes(data);
      } catch (err) {
        console.error("Error fetching recipes: ", err);
        setError("Could not load recipes. Is the backend running?");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  const term = search.trim().toLowerCase();
  const filtered = recipes.filter((recipe) => {
    if (!term) return true;
    const inTitle = recipe.title.toLowerCase().includes(term);
    const inTags = recipe.tags.some((tag) => tag.toLowerCase().includes(term));
    const inIngredients = recipe.ingredients.some((ing) =>
      ing.name.toLowerCase().includes(term),
    );
    return inTitle || inTags || inIngredients;
  });

  return (
    <main className="page">
      <h1>Browse Recipes</h1>
      <SearchBar value={search} onChange={setSearch} />

      {isLoading && <p>Loading recipes...</p>}
      {error && <ErrorMessage message={error} />}

      {!isLoading && !error && filtered.length === 0 && (
        <p className="no-results">No recipes match your search.</p>
      )}

      <div className="recipe-grid">
        {filtered.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </main>
  );
}

export default RecipesPage;