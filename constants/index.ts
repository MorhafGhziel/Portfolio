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
    title: "AI Chat Interface",
    description:
      "A conversational AI app that lets users chat with a Hugging Face model in a clean, responsive interface with theme switching.",
    image: "/images/AIChatBot.png",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "TailwindCSS",
      "Axios",
      "Hugging Face API",
    ],
    githubUrl: "https://github.com/MorhafGhziel/Ai-ChatBot",
    liveUrl: "https://chat-interface-challenge.vercel.app/",
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
  {
    title: "Portfolio",
    description:
      "A modern and responsive personal portfolio built with Next.js App Router, featuring animated sections, optimized performance, and a dynamic project showcase.",
    image: "/images/PortfolioImage.png",
    techStack: [
      "React",
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Framer Motion",
      "PostCSS",
      "Google Fonts",
      "ESLint",
    ],
    githubUrl: "https://github.com/MorhafGhziel/frontend-tribe-portofolio",
    liveUrl: "https://frontend-tribe-portofolio.vercel.app/",
  },
  {
    title: "UI Component System",
    description:
      "A reusable UI library that provides a collection of responsive, pre-built components designed for rapid development and consistent design across modern web applications.",
    image: "/images/CompSys.png",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "TailwindCSS",
      "Framer Motion",
    ],
    githubUrl: "https://github.com/MorhafGhziel/SaaS-Landing-Page",
    liveUrl: "https://saa-s-landing-page-zeta.vercel.app/",
  },
  {
    title: "AI Innovate",
    description:
      "A landing page for an AI startup that showcases services, features, and product benefits with smooth animations, engaging visuals, and responsive layout to attract potential users and investors.",
    image: "/images/LandingPage.png",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "TailwindCSS",
      "Framer Motion",
      "Lottie",
    ],
    githubUrl: "https://github.com/MorhafGhziel/ai-startup-landing-page",
    liveUrl: "https://frontend-ai-startup-landing-page.vercel.app/",
  },
  {
    title: "SaaSify Pro",
    description:
      "A sleek SaaS landing page designed to showcase product features, engage users, and drive conversions with responsive layouts and modern visuals.",
    image: "/images/SaasLandingPage.png",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "TailwindCSS",
      "Framer Motion",
    ],
    githubUrl: "https://github.com/MorhafGhziel/SaaS-nextjs-project",
    liveUrl: "https://saa-s-nextjs-project.vercel./",
  },
] as const;
