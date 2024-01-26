import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MODE } from "~/shared/constants";
import App from "./App";

describe("<App> test", () => {
  it("<App> contain Hello World", () => {
    render(<App />);
    expect(screen.getByText(`Hello World! MODE: ${MODE}`)).toBeDefined();
  });
});
