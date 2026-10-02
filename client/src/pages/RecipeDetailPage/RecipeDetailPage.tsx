import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import type { Recipe } from "../../shared.types";
import recipeService from "../../utils/recipeService";
import Tag from "../../components/Tag/Tag";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import "./RecipeDetailPage.css";

function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await recipeService.getOne(id!);
        setRecipe(data);
      } catch (err) {
        console.error("Error fetching recipe: ", err);
        setError("Whoops, we could not find that recipe.");
      }
    };
    fetchRecipe();
  }, [id]);

  if (error) {
    return (
      <main className="page">
        <ErrorMessage message={error} />
        <Link to="/recipes">Back to recipes</Link>
      </main>
    );
  }

  if (!recipe) {
    return (
      <main className="page">
        <p>Loading recipe...</p>
      </main>
    );
  }

  return (
    <main className="page recipe-detail">
      <Link to="/recipes" className="recipe-detail-back">
        Back to recipes
      </Link>
      <div className="recipe-detail-hero">
        <img
          className="recipe-detail-image"
          src={recipe.image || "/logo.svg"}
          alt={recipe.title}
        />
        <div className="recipe-detail-intro">
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
          <div className="recipe-detail-tags">
            {recipe.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </div>
      </div>

      <div className="recipe-detail-columns">
        <section>
          <h2>Ingredients</h2>
          <ul className="ingredient-list">
            {recipe.ingredients.map((ing) => (
              <li key={ing._id ?? ing.name}>
                <strong>{ing.quantity}</strong> {ing.name}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Instructions</h2>
          <ol className="instruction-list">
            {recipe.instructions.map((ins) => (
              <li key={ins._id ?? ins.step}>{ins.description}</li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}

export default RecipeDetailPage;