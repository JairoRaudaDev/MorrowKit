import { describe, expect, it } from "vitest";

import { cn } from "./utils";

describe("cn", () => {
  it("filters conditional classes and resolves Tailwind conflicts", () => {
    expect(cn("px-2 text-sm", false && "hidden", ["font-medium", "px-4"])).toBe(
      "text-sm font-medium px-4",
    );
  });
});
