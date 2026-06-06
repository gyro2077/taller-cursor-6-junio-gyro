import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  HeaderContent,
  type HeaderContentProps,
} from "@/components/marketlab/header-content";
import { ThemeProvider } from "@/components/marketlab/theme-provider";

function renderHeader(props: HeaderContentProps) {
  return renderToStaticMarkup(
    <ThemeProvider>
      <HeaderContent {...props} />
    </ThemeProvider>,
  );
}

describe("HeaderContent", () => {
  it("renders signed-out actions with sign-in and sign-up links", () => {
    const html = renderHeader({ isSignedIn: false, balanceCents: null });

    expect(html).toContain("MarketLab");
    expect(html).toContain("Markets");
    expect(html).toContain("/markets");
    expect(html).toContain("Sign in");
    expect(html).toContain("/sign-in");
    expect(html).toContain("Sign up");
    expect(html).toContain("/sign-up");
    expect(html).toContain("Toggle theme");
    expect(html).not.toContain("Sign out");
    expect(html).not.toContain('data-slot="signed-in-actions"');
  });

  it("renders signed-in balance and sign-out action", () => {
    const html = renderHeader({ isSignedIn: true, balanceCents: 10000 });

    expect(html).toContain("$100.00 fake");
    expect(html).toContain("Sign out");
    expect(html).toContain('data-slot="signed-in-actions"');
    expect(html).toContain('data-slot="fake-balance"');
    expect(html).not.toContain("Sign in");
    expect(html).not.toContain("Sign up");
    expect(html).toContain("Toggle theme");
  });

  it("handles missing profile state for signed-in users", () => {
    const html = renderHeader({ isSignedIn: true, balanceCents: null });

    expect(html).toContain("Profile unavailable");
    expect(html).toContain('data-slot="missing-profile"');
    expect(html).toContain("Sign out");
    expect(html).not.toContain('data-slot="fake-balance"');
  });
});
