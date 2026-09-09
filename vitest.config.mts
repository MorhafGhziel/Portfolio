import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    // Mirrors the "@/*" path alias in tsconfig.json so tests import modules
    // exactly the way the app does.
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    // Only the pure logic is unit tested. Anything touching Prisma, cookies or
    // the network is covered by the build and by manual verification instead —
    // mocking those would test the mocks.
    include: ["lib/**/*.test.ts"],
  },
});
