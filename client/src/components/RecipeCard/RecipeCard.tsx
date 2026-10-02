import { Link } from "react-router-dom";
import type { Recipe } from "../../shared.types";
import Tag from "../Tag/Tag";
import "./RecipeCard.css";

type RecipeCardProps = {
  recipe: Recipe;
  onDelete?: (id: string) => void;
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "2-digit",
  });
}

function RecipeCard({ recipe, onDelete }: RecipeCardProps) {
  return (
    <article className="recipe-card">
      <Link to={`/recipes/${recipe._id}`} className="recipe-card-image-link">
        <img
          className="recipe-card-image"
          src={recipe.image || "/logo.svg"}
          alt={recipe.title}
        />
      </Link>
      <div className="recipe-card-body">
        <h2 className="recipe-card-title">
          <Link to={`/recipes/${recipe._id}`}>{recipe.title}</Link>
        </h2>
        <p className="recipe-card-date">
          Created on {formatDate(recipe.createdAt)}
        </p>
        <div className="recipe-card-tags">
          {recipe.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
        {onDelete && (
          <div className="recipe-card-actions">
            <button
              type="button"
              className="icon-button"
              aria-label={`Delete ${recipe.title}`}
              onClick={() => onDelete(recipe._id)}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6 7h12l-1 14H7L6 7zm3-4h6l1 2h4v2H4V5h4l1-2zm1 7v8h2v-8h-2zm4 0v8h2v-8h-2z" />
              </svg>
            </button>
            <Link
              to={`/recipes/${recipe._id}/edit`}
              className="icon-button"
              aria-label={`Edit ${recipe.title}`}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3 17.25V21h3.75L17.8 9.94l-3.75-3.75L3 17.25zm17.7-10.2a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}

export default RecipeCard;