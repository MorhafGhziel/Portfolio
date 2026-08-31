/**
 * Next.js bundles plain `.css` imports, but its type package only declares
 * `*.module.css` (see node_modules/next/types/global.d.ts). Without this,
 * a side-effect import like `import "./globals.css"` has no declaration and
 * stricter TypeScript setups report TS2882.
 *
 * This project uses no CSS Modules, so the wildcard can't shadow them.
 */
declare module "*.css";
