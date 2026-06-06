import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Header } from "@/components/marketlab/header";
import { ThemeProvider } from "@/components/marketlab/theme-provider";

describe("Header", () => {
  it("renders app name, markets navigation, and theme toggle", () => {
    const html = renderToStaticMarkup(
      <ThemeProvider>
        <Header />
      </ThemeProvider>,
    );

    expect(html).toContain("MarketLab");
    expect(html).toContain("Markets");
    expect(html).toContain("/markets");
    expect(html).toContain("Toggle theme");
    expect(html).not.toContain("hero2-bg.webp");
    expect(html).not.toContain("quito.png");
  });
});
