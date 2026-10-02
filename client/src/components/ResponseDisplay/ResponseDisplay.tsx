import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./ResponseDisplay.css";

type ResponseDisplayProps = {
  response: string;
  isLoading: boolean;
  error: string;
};

function ResponseDisplay({ response, isLoading, error }: ResponseDisplayProps) {
  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (isLoading && !response) {
    return <p className="response-loading">Gemini is thinking...</p>;
  }

  if (!response) {
    return null;
  }

  return (
    <div className="response-display" aria-live="polite">
      <p className="response-label body-sm">AI generated. Double-check before you cook.</p>
      <pre className="response-text">{response}</pre>
      {isLoading && <p className="response-loading">Still writing...</p>}
    </div>
  );
}

export default ResponseDisplay;