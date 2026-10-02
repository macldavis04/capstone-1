import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { NewRecipe, Ingredient, Instruction } from "../../shared.types";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./RecipeForm.css";

type RecipeFormProps = {
  initialRecipe?: NewRecipe;
  onSubmit: (recipe: NewRecipe) => Promise<void>;
  submitLabel: string;
};

const emptyRecipe: NewRecipe = {
  title: "",
  description: "",
  image: "",
  ingredients: [{ name: "", quantity: "" }],
  instructions: [{ step: 1, description: "" }],
  tags: [],
};

function RecipeForm({ initialRecipe, onSubmit, submitLabel }: RecipeFormProps) {
  const [formData, setFormData] = useState<NewRecipe>(initialRecipe ?? emptyRecipe);
  const [tagsText, setTagsText] = useState(initialRecipe ? initialRecipe.tags.join(", ") : "");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleIngredientChange(index: number, field: keyof Ingredient, value: string) {
    const updated = formData.ingredients.map((ing, i) =>
      i === index ? { ...ing, [field]: value } : ing,
    );
    setFormData({ ...formData, ingredients: updated });
  }

  function addIngredient() {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: "", quantity: "" }],
    });
  }

  function removeIngredient(index: number) {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index),
    });
  }

  function handleInstructionChange(index: number, value: string) {
    const updated = formData.instructions.map((ins, i) =>
      i === index ? { ...ins, description: value } : ins,
    );
    setFormData({ ...formData, instructions: updated });
  }

  function addInstruction() {
    const nextStep = formData.instructions.length + 1;
    setFormData({
      ...formData,
      instructions: [...formData.instructions, { step: nextStep, description: "" }],
    });
  }

  function removeInstruction(index: number) {
    const remaining = formData.instructions.filter((_, i) => i !== index);
    const renumbered: Instruction[] = remaining.map((ins, i) => ({ ...ins, step: i + 1 }));
    setFormData({ ...formData, instructions: renumbered });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!formData.title.trim()) {
      setError("Title is required.");
      return;
    }
    const ingredients = formData.ingredients.filter((ing) => ing.name.trim());
    if (ingredients.length === 0) {
      setError("Add at least one ingredient.");
      return;
    }
    const instructions = formData.instructions.filter((ins) => ins.description.trim());
    if (instructions.length === 0) {
      setError("Add at least one instruction step.");
      return;
    }

    const tags = tagsText
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    setIsSaving(true);
    try {
      await onSubmit({ ...formData, ingredients, instructions, tags });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save the recipe.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          placeholder="Chickpea Stew"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={3}
          placeholder="A short summary of the dish"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <label htmlFor="image">Image URL</label>
        <input
          id="image"
          name="image"
          placeholder="https://..."
          value={formData.image}
          onChange={handleChange}
        />
      </div>

      <fieldset className="form-list">
        <legend>Ingredients</legend>
        {formData.ingredients.map((ingredient, index) => (
          <div className="form-row" key={index}>
            <input
              aria-label={`Ingredient ${index + 1} name`}
              placeholder="Ingredient"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
            />
            <input
              aria-label={`Ingredient ${index + 1} quantity`}
              placeholder="Quantity"
              value={ingredient.quantity}
              onChange={(e) => handleIngredientChange(index, "quantity", e.target.value)}
            />
            <button
              type="button"
              className="btn-text"
              onClick={() => removeIngredient(index)}
              disabled={formData.ingredients.length === 1}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" className="btn-secondary" onClick={addIngredient}>
          Add ingredient
        </button>
      </fieldset>

      <fieldset className="form-list">
        <legend>Instructions</legend>
        {formData.instructions.map((instruction, index) => (
          <div className="form-row" key={index}>
            <span className="step-number">{index + 1}.</span>
            <input
              aria-label={`Step ${index + 1}`}
              placeholder="Describe this step"
              value={instruction.description}
              onChange={(e) => handleInstructionChange(index, e.target.value)}
            />
            <button
              type="button"
              className="btn-text"
              onClick={() => removeInstruction(index)}
              disabled={formData.instructions.length === 1}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" className="btn-secondary" onClick={addInstruction}>
          Add step
        </button>
      </fieldset>

      <div className="form-field">
        <label htmlFor="tags">Tags (comma separated)</label>
        <input
          id="tags"
          placeholder="vegan, easy, dinner"
          value={tagsText}
          onChange={(e) => setTagsText(e.target.value)}
        />
      </div>

      {error && <ErrorMessage message={error} />}

      <button type="submit" className="btn-primary" disabled={isSaving}>
        {isSaving ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

export default RecipeForm;