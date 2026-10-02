import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import type { Recipe } from "../../shared.types";

const sampleRecipe: Recipe = {
  _id: "abc123",
  title: "Chickpea Stew",
  description: "Warm and hearty.",
  image: "https://example.com/stew.jpg",
  ingredients: [{ name: "Chickpeas", quantity: "1 can" }],
  instructions: [{ step: 1, description: "Simmer everything." }],
  tags: ["vegan", "easy"],
  ownerId: "user1",
  createdAt: "2025-02-13T12:00:00.000Z",
  updatedAt: "2025-02-13T12:00:00.000Z",
};

function renderCard(onDelete?: (id: string) => void) {
  return render(
    <MemoryRouter>
      <RecipeCard recipe={sampleRecipe} onDelete={onDelete} />
    </MemoryRouter>,
  );
}

describe("RecipeCard component", () => {
  it("renders the title, date, and tags", () => {
    renderCard();

    expect(screen.getByRole("heading", { name: /chickpea stew/i })).toBeInTheDocument();
    expect(screen.getByText(/created on 2\/13\/25/i)).toBeInTheDocument();
    expect(screen.getByText("vegan")).toBeInTheDocument();
    expect(screen.getByText("easy")).toBeInTheDocument();
  });

  it("links to the recipe detail page", () => {
    renderCard();

    const links = screen.getAllByRole("link", { name: /chickpea stew/i });

    expect(links.length).toBe(2);
    links.forEach((link) => expect(link).toHaveAttribute("href", "/recipes/abc123"));
  });

  it("hides the edit and delete buttons when onDelete is not passed", () => {
    renderCard();

    expect(screen.queryByRole("button", { name: /delete/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /edit/i })).not.toBeInTheDocument();
  });

  it("calls onDelete with the recipe id when the delete button is clicked", async () => {
    const user = userEvent.setup();
    const handleDelete = vi.fn();
    renderCard(handleDelete);

    await user.click(screen.getByRole("button", { name: /delete chickpea stew/i }));

    expect(handleDelete).toHaveBeenCalledWith("abc123");
  });
});