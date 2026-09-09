// `size` and `contentType` are declared here rather than re-exported: Next
// reads them statically to emit the og:image:width / height meta tags.
export { default } from "./og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Murhaf Ghziel — full-stack developer";
