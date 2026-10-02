import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Recipe, NewRecipe } from "../../shared.types";
import recipeService from "../../utils/recipeService";
import RecipeForm from "../../components/RecipeForm/RecipeForm";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

function EditRecipePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await recipeService.getOne(id!);
        setRecipe(data);
      } catch (err) {
        console.error("Error fetching recipe: ", err);
        setError("Could not load that recipe.");
      }
    };
    fetchRecipe();
  }, [id]);

  async function handleUpdate(updated: NewRecipe) {
    await recipeService.update(id!, updated);
    navigate("/dashboard", { state: { message: "Recipe updated!" } });
  }

  if (error) {
    return (
      <main className="page">
        <ErrorMessage message={error} />
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

  const initialRecipe: NewRecipe = {
    title: recipe.title,
    description: recipe.description,
    image: recipe.image,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    tags: recipe.tags,
  };

  return (
    <main className="page">
      <h1>Edit Recipe</h1>
      <RecipeForm
        initialRecipe={initialRecipe}
        onSubmit={handleUpdate}
        submitLabel="Save Changes"
      />
    </main>
  );
}

export default EditRecipePage;