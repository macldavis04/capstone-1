import { useNavigate } from "react-router-dom";
import type { NewRecipe } from "../../shared.types";
import recipeService from "../../utils/recipeService";
import RecipeForm from "../../components/RecipeForm/RecipeForm";

function NewRecipePage() {
  const navigate = useNavigate();

  async function handleCreate(recipe: NewRecipe) {
    await recipeService.create(recipe);
    navigate("/dashboard", { state: { message: "Recipe created!" } });
  }

  return (
    <main className="page">
      <h1>New Recipe</h1>
      <RecipeForm onSubmit={handleCreate} submitLabel="Create Recipe" />
    </main>
  );
}

export default NewRecipePage;