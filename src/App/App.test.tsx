import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("<App> test", () => {
  it("<App> contain Hello World", () => {
    render(<App />);
    expect(screen.getByText("Hello World!")).toBeDefined();
  });
});
