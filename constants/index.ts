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
  images?: string[]; // Optional array for multiple images
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
};

export const PROJECTS: Project[] = [
  {
    title: "Elsina3ya - Content Creator & Influencer Management Platform",
    description:
      "A freelance project I designed and developed — a corporate website for Elsina3ya, a content creator and influencer management agency based in Saudi Arabia. Built with Next.js and featuring a dark theme with orange and amber gradients, the site presents the company's story, mission, vision, values, and services. The platform includes RTL (Right-to-Left) Arabic layout support, smooth scrolling powered by Lenis, interactive animations with Framer Motion, responsive navigation with mobile menu, floating person images with subtle animations, glassmorphism UI effects, and a contact form integrated with Resend API for email delivery. The site emphasizes the company's tagline 'We organize your presence and guarantee your impact' and their mission to gather content creators in 'one workshop,' organizing their digital presence and connecting them with appropriate brands. The website showcases services for both influencers (talent management, content production, performance analysis, brand partnerships, business coordination) and companies (sustainable content creation, brand representation, cinematic content production, influencer matching). It features multiple sections including Hero, Story, Vision, Mission, Values, Services Grid, Why Us, and Contact, all with scroll-triggered animations and modern design patterns. The platform highlights the company's core values of creativity, impact, trust, belonging, and collaboration, positioning them as 'Impact Makers' in the digital content industry.",
    titleAr: "الصناعية - منصة إدارة صانعي المحتوى والمؤثرين",
    descriptionAr:
      "مشروع مستقل قمت بتصميمه وتطويره — موقع شركة للصناعية، وكالة إدارة صانعي المحتوى والمؤثرين مقرها المملكة العربية السعودية. مبني بـ Next.js ويتميز بتصميم داكن مع تدرجات برتقالية وعنبرية، يعرض الموقع قصة الشركة ورسالتها ورؤيتها وقيمها وخدماتها. تتضمن المنصة دعم تخطيط عربي من اليمين لليسار، تمرير سلس مدعوم بـ Lenis، رسوم متحركة تفاعلية مع Framer Motion، تنقل متجاوب مع قائمة محمولة، صور أشخاص عائمة مع رسوم متحركة خفيفة، تأثيرات واجهة زجاجية، ونموذج اتصال متكامل مع Resend API لتسليم البريد الإلكتروني. يؤكد الموقع على شعار الشركة 'ننظم حضورك وضمن تأثيرك' ورسالتها في جمع صانعي المحتوى في 'ورشة واحدة'، وتنظيم حضورهم الرقمي وربطهم بالعلامات التجارية المناسبة. يعرض الموقع خدمات لكل من المؤثرين (إدارة المواهب، إنتاج المحتوى، تحليل الأداء، شراكات العلامات التجارية، تنسيق الأعمال) والشركات (إنشاء محتوى مستدام، تمثيل العلامة التجارية، إنتاج محتوى سينمائي، مطابقة المؤثرين). يتضمن أقساماً متعددة تشمل Hero، القصة، الرؤية، الرسالة، القيم، شبكة الخدمات، لماذا نحن، والاتصال، جميعها مع رسوم متحركة محفزة بالتمرير وأنماط تصميم حديثة. تسلط المنصة الضوء على القيم الأساسية للشركة المتمثلة في الإبداع والتأثير والثقة والانتماء والتعاون، مما يضعهم كـ 'صانعي التأثير' في صناعة المحتوى الرقمي.",
    image: "/images/snaya.png",
    techStack: [
      "Resend",
      "Three.js",
      "Lenis",
      "Next.js",
      "TypeScript",
      "React",
      "TailwindCSS",
      "Framer Motion",
    ],
    githubUrl: "https://github.com/MorhafGhziel/elsina3ya",
    liveUrl: "https://www.snaya.sa/",
  },
  {
    title: "Omdah - Video Production Company Portfolio & CMS",
    description:
      "A freelance project that I designed and developed - a comprehensive portfolio website and content management system for Omdah, a Saudi video production company. Built with Next.js 15, featuring a modern Arabic-first design with full RTL support, dynamic content management system with inline editing capabilities, admin authentication via email-based verification codes, complete CRUD operations for portfolio works (with video and image uploads to IDrive e2 S3-compatible storage), client logo management, services management, contact form with Resend email integration, custom video player with fullscreen and playback controls, featured works showcase, dynamic project detail pages, video and image proxy for external content delivery, MongoDB database with optimized connection pooling, responsive design with Framer Motion animations, and a complete admin panel for managing all website content without code changes. The system includes JWT-based authentication, allowed email whitelisting, content versioning, and seamless video streaming from cloud storage.",
    titleAr: "عُمدة - موقع شركة إنتاج فيديو ونظام إدارة المحتوى",
    descriptionAr:
      "مشروع مستقل قمت بتصميمه وتطويره - موقع محفظة أعمال شامل ونظام إدارة محتوى لشركة عُمدة، شركة سعودية لإنتاج الفيديو. مبني بـ Next.js 15، يتميز بتصميم حديث يدعم العربية بالكامل مع دعم RTL، نظام إدارة محتوى ديناميكي مع إمكانيات التحرير المباشر، مصادقة الإدارة عبر رموز التحقق القائمة على البريد الإلكتروني، عمليات CRUD كاملة لأعمال المحفظة (مع رفع الفيديو والصور إلى IDrive e2 S3-compatible storage)، إدارة شعارات العملاء، إدارة الخدمات، نموذج اتصال مع تكامل Resend للبريد الإلكتروني، مشغل فيديو مخصص مع ملء الشاشة وأزرار التحكم، عرض الأعمال المميزة، صفحات تفاصيل المشاريع الديناميكية، وكيل للفيديو والصور لتسليم المحتوى الخارجي، قاعدة بيانات MongoDB مع تجميع الاتصالات المحسّن، تصميم متجاوب مع رسوم متحركة Framer Motion، ولوحة تحكم كاملة لإدارة جميع محتويات الموقع دون تغييرات في الكود. يتضمن النظام مصادقة قائمة على JWT، قائمة بيضاء للبريد الإلكتروني المسموح، إصدارات المحتوى، وبث فيديو سلس من التخزين السحابي.",
    image: "/images/omdah/1.png",
    images: [
      "/images/omdah/1.png",
      "/images/omdah/2.png",
      "/images/omdah/3.png",
      "/images/omdah/6.png",
      "/images/omdah/4.png",
      "/images/omdah/5.png",
    ],
    techStack: [
      "MongoDB",
      "IDrive e2",
      "AWS SDK",
      "JWT",
      "bcryptjs",
      "Resend",
      "Zod",
      "React Hook Form",
      "Next.js",
      "TypeScript",
      "React",
      "TailwindCSS",
      "Framer Motion",
      "Locomotive Scroll",
    ],
    githubUrl: "https://github.com/MorhafGhziel/OmdahStudio-Landing",
    liveUrl: "https://www.omdah.sa/",
  },
  {
    title: "IEDAR - Architectural Design Company Website",
    description:
      "A freelance project that I designed and developed - a modern, elegant corporate website for IEDAR, an architectural design company based in Saudi Arabia. Built with Next.js and featuring a sophisticated dark-themed design with gold and white gradients, the website showcases the company's story, mission, vision, values, and core pillars. The platform includes RTL (Right-to-Left) Arabic layout support, smooth parallax scrolling effects, interactive animations powered by Framer Motion, responsive navigation with mobile menu, image galleries showcasing architectural projects, social media integration, and contact information. The website emphasizes the company's tagline 'للفكرة دار' (For the idea, a home) and their commitment to transforming ideas into living spaces that inspire belonging, combining authentic Saudi identity with sustainable innovation.",
    titleAr: "أيدار - موقع شركة التصميم المعماري",
    descriptionAr:
      "مشروع مستقل قمت بتصميمه وتطويره - موقع شركة عصري وأنيق لشركة أيدار، وهي شركة تصميم معماري مقرها المملكة العربية السعودية. مبني بـ Next.js ويتميز بتصميم داكن أنيق مع تدرجات ذهبية وبيضاء، يعرض الموقع قصة الشركة ورسالتها ورؤيتها وقيمها وركائزها الأساسية. تتضمن المنصة دعم تخطيط عربي من اليمين لليسار، تأثيرات تمرير بارالاكس سلسة، رسوم متحركة تفاعلية مدعومة بـ Framer Motion، تنقل متجاوب مع قائمة محمولة، معارض صور تعرض المشاريع المعمارية، تكامل وسائل التواصل الاجتماعي، ومعلومات الاتصال. يؤكد الموقع على شعار الشركة 'للفكرة دار' والتزامها بتحويل الأفكار إلى فضاءات حية تلهم الانتماء، جامعاً بين الهوية السعودية الأصيلة والابتكار المستدام.",
    image: "/images/iedar/11.png",
    images: [
      "/images/iedar/11.png",
      "/images/iedar/iedar-1.png",
      "/images/iedar/iedar-2.png",
      "/images/iedar/iedar-3.png",
      "/images/iedar/iedar-4.png",
      "/images/iedar/iedar-5.png",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "React",
      "TailwindCSS",
      "Framer Motion",
      "Next.js Font Optimization",
      "RTL Layout Support",
      "Responsive Design",
    ],
    githubUrl: "https://github.com/MorhafGhziel/Idear_Landing",
    liveUrl: "https://www.iedar.sa/",
  },

  {
    title: "Alpha Factory - Video Production Management System",
    description:
      "A freelance project that provides a comprehensive video production management platform built with Next.js, featuring multi-role access control (clients, designers, editors, reviewers), real-time project tracking boards, automated invoice generation with PayPal payment integration, Telegram bot notifications, WhatsApp Business API for client communications, email reminders for overdue projects, voice recording capabilities, video duration detection from Google Drive/YouTube links, and a complete admin panel for account management. The system includes automated billing, payment processing, project status tracking, team collaboration tools, and multi-channel communication integration.",
    titleAr: "ألفا فاكتوري - نظام إدارة إنتاج الفيديو",
    descriptionAr:
      "مشروع مستقل يوفر منصة شاملة لإدارة إنتاج الفيديو مبنية بـ Next.js، تتضمن نظام تحكم متعدد الأدوار (عملاء، مصممون، محررون، مراجعون)، لوحات متابعة المشاريع في الوقت الفعلي، إنشاء فواتير تلقائي مع تكامل دفع PayPal، إشعارات بوت Telegram، تكامل WhatsApp Business API للتواصل مع العملاء، تذكيرات بريد إلكتروني للمشاريع المتأخرة، إمكانيات تسجيل صوتي، كشف مدة الفيديو من روابط Google Drive/YouTube، ولوحة تحكم كاملة لإدارة الحسابات. يتضمن النظام فوترة تلقائية، معالجة المدفوعات، تتبع حالة المشاريع، أدوات تعاون الفريق، وتكامل التواصل متعدد القنوات.",
    image: "/images/AlphaFactory.png",
    techStack: [
      "PayPal API",
      "Telegram Bot API",
      "WhatsApp Business API",
      "Resend",
      "Next.js",
      "TypeScript",
      "React",
      "TailwindCSS",
      "Prisma",
      "PostgreSQL",
      "Better Auth",
      "Framer Motion",
      "bcryptjs",
    ],
    githubUrl: "https://github.com/MorhafGhziel/Alpha-Factory",
    liveUrl: "https://www.alphafactory.net/",
  },

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
