import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { SignUpForm } from "@/components/marketlab/sign-up-form";
import { ThemeProvider } from "@/components/marketlab/theme-provider";

describe("SignUpForm", () => {
  it("renders signup fields and metadata inputs for profile creation", () => {
    const html = renderToStaticMarkup(
      <ThemeProvider>
        <SignUpForm />
      </ThemeProvider>,
    );

    expect(html).toContain('name="first_name"');
    expect(html).toContain('name="last_name"');
    expect(html).toContain('name="email"');
    expect(html).toContain('name="password"');
    expect(html).toContain("Sign up");
    expect(html).toContain("/sign-in");
  });
});
