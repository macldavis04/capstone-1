import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar component", () => {
  it("shows the current search value", () => {
    render(<SearchBar value="stew" onChange={() => {}} />);

    const input = screen.getByLabelText(/search recipes/i) as HTMLInputElement;

    expect(input.value).toBe("stew");
  });

  it("calls onChange with the new text when the user types", () => {
    const handleChange = vi.fn();
    render(<SearchBar value="" onChange={handleChange} />);

    const input = screen.getByLabelText(/search recipes/i);
    fireEvent.change(input, { target: { value: "chick" } });

    expect(handleChange).toHaveBeenCalledWith("chick");
  });
});