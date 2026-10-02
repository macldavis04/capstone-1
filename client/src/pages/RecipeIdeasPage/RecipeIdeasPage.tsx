import { useState } from "react";
import type { FormEvent } from "react";
import type { HistoryItem } from "../../shared.types";
import aiService from "../../utils/aiService";
import ResponseDisplay from "../../components/ResponseDisplay/ResponseDisplay";
import "../AIAssistantPage/AIAssistantPage.css";

function RecipeIdeasPage() {
  const [ingredients, setIngredients] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!ingredients.trim() || isLoading) return;

    setIsLoading(true);
    setResponse("");
    setError("");

    const prompt =
      `I have these ingredients: ${ingredients.trim()}. ` +
      `Suggest one recipe I can make with mostly these items. ` +
      `Give it a title, a short description, an ingredient list with quantities, ` +
      `and numbered steps. Keep it under 250 words.`;

    try {
      const fullText = await aiService.streamPrompt(prompt, setResponse);
      setHistory((prev) =>
        [{ prompt: ingredients.trim(), answer: fullText }, ...prev].slice(0, 3),
      );
      setIngredients("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="page ai-page">
      <h1>Recipe Ideas</h1>
      <p className="ai-intro">
        Tell us what you have on hand and we will suggest something to cook.
      </p>

      <form onSubmit={handleSubmit} className="ai-form">
        <label htmlFor="ingredients">Ingredients you have</label>
        <textarea
          id="ingredients"
          rows={3}
          placeholder="chicken thighs, rice, lime, cilantro, garlic"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="btn-primary"
          disabled={isLoading || !ingredients.trim()}
        >
          {isLoading ? "Thinking..." : "Suggest a recipe"}
        </button>
      </form>

      <ResponseDisplay response={response} isLoading={isLoading} error={error} />

      {history.length > 0 && (
        <section className="ai-history">
          <h2>Recent Ideas</h2>
          {history.map((item, index) => (
            <div className="ai-history-item" key={index}>
              <p className="ai-history-prompt">
                <strong>Ingredients:</strong> {item.prompt}
              </p>
              <pre className="ai-history-answer">{item.answer}</pre>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}

export default RecipeIdeasPage;