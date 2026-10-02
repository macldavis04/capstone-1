import { useState } from "react";
import type { FormEvent } from "react";
import type { HistoryItem } from "../../shared.types";
import aiService from "../../utils/aiService.ts";
import ResponseDisplay from "../../components/ResponseDisplay/ResponseDisplay";
import "./AIAssistantPage.css";

function AIAssistantPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setResponse("");
    setError("");

    try {
      const fullText = await aiService.streamPrompt(prompt, setResponse);
      setHistory((prev) => [{ prompt, answer: fullText }, ...prev].slice(0, 3));
      setPrompt("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="page ai-page">
      <h1>AI Assistant</h1>
      <p className="ai-intro">
        Ask a cooking question, get substitution ideas, or have a recipe
        explained step by step.
      </p>

      <form onSubmit={handleSubmit} className="ai-form">
        <label htmlFor="prompt">Your question</label>
        <textarea
          id="prompt"
          rows={4}
          placeholder="How do I keep rice from sticking?"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="btn-primary"
          disabled={isLoading || !prompt.trim()}
        >
          {isLoading ? "Generating..." : "Ask"}
        </button>
      </form>

      <ResponseDisplay response={response} isLoading={isLoading} error={error} />

      {history.length > 0 && (
        <section className="ai-history">
          <h2>Recent History</h2>
          {history.map((item, index) => (
            <div className="ai-history-item" key={index}>
              <p className="ai-history-prompt">
                <strong>You:</strong> {item.prompt}
              </p>
              <pre className="ai-history-answer">{item.answer}</pre>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}

export default AIAssistantPage;