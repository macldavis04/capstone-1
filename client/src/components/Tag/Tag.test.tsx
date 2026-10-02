import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Tag from "./Tag";

test("renders the tag label", () => {
  render(<Tag label="vegan" />);

  const tag = screen.getByText("vegan");

  expect(tag).toBeInTheDocument();
  expect(tag).toHaveClass("tag");
});