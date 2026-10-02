import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

test("shows the error text as an alert", () => {
  render(<ErrorMessage message="Something went wrong" />);

  const alert = screen.getByRole("alert");

  expect(alert).toHaveTextContent("Something went wrong");
  expect(alert).toHaveClass("error-message");
});