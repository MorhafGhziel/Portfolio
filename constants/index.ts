// About Section Constants
export const SKILLS = [
  "JavaScript",
  "TypeScript",
  "HTML, CSS",
  "React & Next.js",
  "Tailwind CSS",
  "Figma",
  "Framer Motion",
  "Responsive Design",
  "Git, GitHub",
] as const;

export const EXPERTISE_POINTS = [
  "Front End Developer with expertise in React and Next.js.",
  "UI/UX Designer creating intuitive and beautiful user interfaces",
  "Experienced in building scalable web applications",
  "Strong background in modern JavaScript frameworks",
  "Passionate about clean code and best practices",
  "Committed to continuous learning and staying updated with latest technologies",
] as const;

// Projects Section Constants
export type Project = {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
};

export const PROJECTS: Project[] = [
  {
    title: "Socially",
    description:
      "Full Stack social platform featuring real-time posts, likes, and customizable user profiles.",
    image: "/images/Socially.png",
    techStack: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "MongoDB",
      "Clerk",
      "Socket.IO",
      "Uploadthing",
    ],
    githubUrl: "https://github.com/MorhafGhziel/socially",
    liveUrl: "https://socially-ebon.vercel.app/",
  },
  {
    title: "Admin Dashboard",
    description:
      "Frontend product dashboard featuring multi-image uploads, smart validation, and a responsive, admin-friendly interface.",
    image: "/images/AdminDash.png",
    techStack: ["React", "TypeScript", "Vite", "TailwindCSS", "React Router"],
    githubUrl: "https://github.com/MorhafGhziel/product-upload-dashboard",
    liveUrl: "https://product-upload-dashboard.vercel.app/products",
  },
] as const;
