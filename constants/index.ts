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
  titleAr: string;
  descriptionAr: string;
  image: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
};

export const PROJECTS: Project[] = [
  {
    title: "eCommerce Clothes Market",
    description:
      "Modern eCommerce platform built with Next.js, featuring real-time cart management, product galleries, advanced search, and Shopify integration. webhook integration, and performance optimization.",
    titleAr: "متجر ملابس",
    descriptionAr:
      "منصة تجارة إلكترونية حديثة مبنية بـ Next.js تتضمن إدارة سلة تسوق فورية ومعارض منتجات وبحث متقدم وتكامل مع Shopify. تتضمن تكامل Webhook وتحسين الأداء.",
    image: "/images/MrhfMarket.png",
    techStack: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Shopify Storefront API",
      "Framer Motion",
      "Headless UI",
      "PostCSS",
    ],
    githubUrl: "https://github.com/MorhafGhziel/shopify-ecommerce",
    liveUrl: "https://shopify-ecommerce-livid.vercel.app/",
  },
  {
    title: "Socially",
    description:
      "Full Stack social platform featuring real-time posts, likes, and customizable user profiles.",
    titleAr: "منصة سوشالي",
    descriptionAr:
      "منصة اجتماعية متكاملة تتضمن المنشورات المباشرة والإعجابات وملفات المستخدمين القابلة للتخصيص.",
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
    titleAr: "لوحة تحكم الإدارة",
    descriptionAr:
      "لوحة تحكم منتجات أمامية تتضمن رفع صور متعددة والتحقق الذكي وواجهة متجاوبة وودودة للمشرفين.",
    image: "/images/AdminDash.png",
    techStack: ["React", "TypeScript", "Vite", "TailwindCSS", "React Router"],
    githubUrl: "https://github.com/MorhafGhziel/product-upload-dashboard",
    liveUrl: "https://product-upload-dashboard.vercel.app/products",
  },
  {
    title: "AI Chat Interface",
    description:
      "A conversational AI app that lets users chat with a Hugging Face model in a clean, responsive interface with theme switching.",
    titleAr: "واجهة الدردشة الذكية",
    descriptionAr:
      "تطبيق ذكاء اصطناعي للمحادثة يتيح للمستخدمين الدردشة مع نموذج Hugging Face في واجهة نظيفة ومتجاوبة مع تبديل الثيمات.",
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
    titleAr: "مركز السيارات",
    descriptionAr:
      "موقع عرض سيارات مبني بتقنيات أمامية حديثة، يتضمن قوائم المركبات والفلترة الديناميكية وانتقالات واجهة مستخدم سلسة لتجربة مستخدم محسنة.",
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
    titleAr: "بروميتوبيا",
    descriptionAr:
      "تطبيق مشاركة مطالبات الذكاء الاصطناعي متكامل مع المصادقة وميزات CRUD والبحث المباشر.",
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
    titleAr: "المحفظة الشخصية",
    descriptionAr:
      "محفظة شخصية حديثة ومتجاوبة مبنية بـ Next.js App Router، تتضمن أقسام متحركة وأداء محسن وعرض مشاريع ديناميكي.",
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
    titleAr: "نظام مكونات الواجهة",
    descriptionAr:
      "مكتبة واجهة مستخدم قابلة لإعادة الاستخدام توفر مجموعة من المكونات المتجاوبة والمبنية مسبقاً المصممة للتطوير السريع والتصميم المتسق عبر تطبيقات الويب الحديثة.",
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
    title: "iPhone Interactive Showcase",
    description:
      "A smooth, scroll-driven iPhone landing page clone featuring interactive 3D models, animated sections, and promo videos — built for a premium, Apple-like experience.",
    titleAr: "عرض آيفون التفاعلي",
    descriptionAr:
      "نسخة سلسة مدفوعة بالتمرير لصفحة هبوط آيفون تتضمن نماذج ثلاثية الأبعاد تفاعلية وأقسام متحركة ومقاطع فيديو ترويجية - مبنية لتجربة أنيقة تشبه آبل.",
    image: "/images/IphoneShowCase.png",
    techStack: [
      "React",
      "Vite",
      "TailwindCSS",
      "PostCSS",
      "Autoprefixer",
      "Three.js",
      "GSAP",
      "ESLint",
    ],
    githubUrl: "https://github.com/MorhafGhziel/iphone",
    liveUrl: "https://iphone-ilb7.vercel.app/",
  },
  {
    title: "AI Innovate",
    description:
      "A landing page for an AI startup that showcases services, features, and product benefits with smooth animations, engaging visuals, and responsive layout to attract potential users and investors.",
    titleAr: "الذكاء الاصطناعي المبتكر",
    descriptionAr:
      "صفحة هبوط لشركة ناشئة في الذكاء الاصطناعي تعرض الخدمات والميزات وفوائد المنتج مع رسوم متحركة سلسة ومرئيات جذابة وتخطيط متجاوب لجذب المستخدمين والمستثمرين المحتملين.",
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
    titleAr: "ساسيفاي برو",
    descriptionAr:
      "صفحة هبوط أنيقة للبرامج كخدمة مصممة لعرض ميزات المنتج وإشراك المستخدمين ودفع التحويلات مع تخطيطات متجاوبة ومرئيات حديثة.",
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
  {
    title: "NFT Marketplace Frontend",
    description:
      "A modern and responsive NFT marketplace frontend focused on performance and user experience, featuring smooth animations and scalable architecture.",
    titleAr: "واجهة سوق الرموز الرقمية",
    descriptionAr:
      "واجهة حديثة ومتجاوبة لسوق الرموز غير القابلة للاستبدال تركز على الأداء وتجربة المستخدم، تتضمن رسوم متحركة سلسة وبنية قابلة للتطوير.",
    image: "/images/NFTMarket.png",
    techStack: [
      "Next.js",
      "React",
      "TailwindCSS",
      "PostCSS",
      "Autoprefixer",
      "Framer Motion",
      "ESLint",
    ],
    githubUrl: "https://github.com/MorhafGhziel/NFT-MarketPlace",
    liveUrl: "https://nft-marketplace-gilt-kappa.vercel.app/",
  },
] as const;
