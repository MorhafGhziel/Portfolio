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
  {
    title: "CarHub",
    description:
      "Car showcase website built with a modern frontend stack, featuring vehicle listings, dynamic filtering, and smooth UI transitions for an optimized user experience.",
    image: "/images/CarShowCase.png",
    techStack: [
      "React",
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Headless UI",
      "PostCSS",
      "ESLint",
    ],
    githubUrl: "http://github.com/MorhafGhziel/car_showcase",
    liveUrl: "https://car-showcase-seven-tau.vercel.app/",
  },
  {
    title: "Promptopia",
    description:
      "Full-stack AI prompt sharing app with authentication, CRUD features, and real-time search.",
    image: "/images/Promptopia.png",
    techStack: [
      "React",
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "MongoDB",
      "NextAuth.js",
      "PostCSS",
    ],
    githubUrl: "https://github.com/MorhafGhziel/ai-prompt-sharing",
    liveUrl: "https://project-next-14-ai-prompt-sharing-self.vercel.app/",
  },
] as const;
