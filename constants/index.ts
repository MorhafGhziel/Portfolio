// ---------------------------------------------------------------------------
// About section
// ---------------------------------------------------------------------------

type SkillGroupKey = "frontend" | "backend" | "tooling";

type SkillGroup = {
  key: SkillGroupKey;
  /** Ordered by what I reach for first, not alphabetically. */
  items: string[];
};

/**
 * Every entry is something shipped in a project listed below.
 *
 * Entries are capabilities, not packages: a recruiter scans this in seconds,
 * so related tools share a line rather than each claiming one.
 */
export const SKILL_GROUPS: SkillGroup[] = [
  {
    key: "frontend",
    items: [
      "React",
      "Next.js (App Router, Server Actions)",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "CSS animation & View Transitions",
      "Radix UI",
      "RTL / Arabic layout",
      "Responsive design",
    ],
  },
  {
    key: "backend",
    items: [
      "Node.js",
      "Express",
      "REST APIs",
      "PostgreSQL / Neon",
      "MongoDB",
      "Prisma",
      "Supabase",
      "Auth (Clerk, NextAuth, JWT)",
      "Payments (ClickPay, PayPal)",
      "File uploads & S3 storage",
      "Zod validation",
    ],
  },
  {
    key: "tooling",
    items: [
      "Figma",
      "Git & GitHub",
      "Vercel",
      "ESLint & strict TypeScript",
      "Three.js",
      "GSAP",
      "HTML5 Canvas & SVG",
      "Gemini / Groq APIs",
    ],
  },
];

// Projects Section Constants
export type ProjectKind = "client" | "practice";

export type Project = {
  /** Stable key for React lists and deep links. */
  slug: string;
  /** client = paid work, practice = everything I built on my own. */
  kind: ProjectKind;
  year: string;
  role: string;
  roleAr: string;
  title: string;
  /** One scannable line, shown in the work index. */
  summary: string;
  summaryAr: string;
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
    title: "Archy - Natural Language to Database Schema",
    description:
      "Describe an app in one sentence and Archy returns a live entity diagram — tables, columns, keys and cardinality — then generates the Prisma schema, TypeScript types and PostgreSQL DDL from that same graph. The canvas is hand-built: drag to move a table, drag from a column to draw a foreign key, click an edge to disconnect, hover to isolate one relationship. There is no diagramming library anywhere in the project. Roughly 1,250 lines of pure functions do the real work — a schema editor covering add/rename/delete and field reordering, a validator that repairs model output before it ever reaches the canvas, an auto-layout pass that packs tables into columns, and three generators that keep types consistent across every target, so one enum column becomes a Prisma enum, a TypeScript union and a SQL CHECK constraint at once. Gemini is called over plain fetch with a 20-second abort and a typed error carrying a retryable flag, no SDK. Auth is Clerk, persistence is Prisma against Neon Postgres through the pg driver adapter, and every server action re-checks the owner before it touches a row. Per-IP rate limiting and a shared daily budget sit in front of the model.",
    titleAr: "أرشي - من جملة واحدة إلى مخطط قاعدة بيانات",
    descriptionAr:
      "صف تطبيقك بجملة واحدة ويعيد أرشي مخطط كيانات حيّاً — جداول وأعمدة ومفاتيح وعلاقات — ثم يولّد مخطط Prisma وأنواع TypeScript وأوامر PostgreSQL من نفس الرسم. اللوحة مبنية يدوياً بالكامل: اسحب لتحريك جدول، واسحب من عمود لرسم مفتاح خارجي، واضغط على الرابط لفصله — دون أي مكتبة رسم خارجية. نحو ١٬٢٥٠ سطر من الدوال النقية تقوم بالعمل الفعلي: محرر للمخطط، ومدقّق يصلح مخرجات النموذج قبل وصولها للوحة، وترتيب تلقائي للجداول، وثلاثة مولّدات تحافظ على تطابق الأنواع. يُستدعى Gemini عبر fetch مباشرة مع مهلة ٢٠ ثانية وخطأ مُصنّف، دون SDK. المصادقة عبر Clerk، والتخزين عبر Prisma مع Neon Postgres، وكل إجراء خادم يتحقق من المالك قبل التنفيذ، مع تحديد لمعدل الطلبات وميزانية يومية مشتركة.",
    slug: "archy",
    kind: "practice",
    year: "2026",
    role: "Design + Full-stack",
    roleAr: "تصميم + تطوير متكامل",
    summary:
      "Describe an app in a sentence; get a live entity diagram plus Prisma, TypeScript and SQL.",
    summaryAr:
      "صف تطبيقك بجملة، واحصل على مخطط كيانات حي مع Prisma وTypeScript وSQL.",
    image: "/images/Arch/Archy-4.png",
    images: [
      "/images/Arch/Archy-4.png",
      "/images/Arch/Archy-3.png",
      "/images/Arch/Archy-1.png",
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Server Actions",
      "Clerk",
      "Prisma",
      "Neon Postgres",
      "Google Gemini",
      "View Transitions",
    ],
    githubUrl: "https://github.com/MorhafGhziel/devflow-ai",
    liveUrl: "https://devflow-ai-mu.vercel.app/",
  },
  {
    title: "Etar - Arabic Art Print Store with Custom Storefront and Admin",
    description:
      "A freelance project I designed and built end to end for Etar, a Saudi brand selling framed canvas art prints. The storefront is Arabic-first and right-to-left throughout, using CSS logical properties rather than mirrored stylesheets. Customers browse the collection, pick a frame variant, add to cart and check out through ClickPay, which covers mada, Visa, Mastercard, Apple Pay, STC Pay and urpay. Orders return a tracking number and an email confirmation, with a 14-day return window and WhatsApp support. Behind the shop sits a separate Express API on Node with Prisma over PostgreSQL, JWT and bcrypt authentication, Multer uploads and express-validator on every route — plus a sixteen-page admin area for products, orders, customers and messages. The front end carries no animation library at all: every motion is hand-written CSS keyframes driven by IntersectionObserver, each one gated behind prefers-reduced-motion and given a noscript fallback. The identity is built from a single closed-path asterisk mark, a mint and bone palette, and five hand-built SVG scenes with no images or Lottie anywhere.",
    titleAr: "إطار - متجر لوحات فنية بواجهة ولوحة تحكم مخصصتين",
    descriptionAr:
      "مشروع مستقل صممته وبنيته بالكامل لمتجر إطار السعودي لبيع اللوحات الفنية المؤطرة. المتجر عربي أولاً ومن اليمين لليسار بالكامل عبر الخصائص المنطقية في CSS. يتصفح العميل المجموعة، ويختار نوع الإطار، ثم يدفع عبر ClickPay التي تدعم مدى وفيزا وماستركارد وApple Pay وSTC Pay وurpay. تصدر للطلب رقم تتبع ورسالة تأكيد، مع إمكانية الإرجاع خلال ١٤ يوماً ودعم عبر واتساب. خلف المتجر واجهة برمجية مستقلة بـ Express على Node مع Prisma وPostgreSQL، ومصادقة JWT وbcrypt، ورفع ملفات، وتحقق على كل مسار، إضافة إلى لوحة تحكم من ست عشرة صفحة للمنتجات والطلبات والعملاء والرسائل. لا توجد مكتبة حركة إطلاقاً: كل الحركات مكتوبة يدوياً بـ CSS ومدفوعة بـ IntersectionObserver، وجميعها تحترم تفضيل تقليل الحركة ولها بديل عند تعطيل الجافاسكربت. الهوية مبنية على علامة نجمية واحدة ولوحة ألوان نعناعية، وخمسة مشاهد SVG مرسومة يدوياً دون صور أو Lottie.",
    slug: "etar",
    kind: "client",
    year: "2026",
    role: "Design + Full-stack",
    roleAr: "تصميم + تطوير متكامل",
    summary:
      "Arabic-first store for framed art prints, with ClickPay checkout and a 16-page admin.",
    summaryAr:
      "متجر عربي للوحات المؤطرة، مع دفع ClickPay ولوحة تحكم من ١٦ صفحة.",
    image: "/images/itar/itar-1.png",
    images: [
      "/images/itar/itar-1.png",
      "/images/itar/itar-2.png",
      "/images/itar/itar-3.png",
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Lenis",
      "Express",
      "Node.js",
      "Prisma",
      "PostgreSQL",
      "JWT",
      "ClickPay",
      "RTL Layout",
    ],
    githubUrl: "",
    liveUrl: "https://eyetar.com/",
  },
  {
    title: "Lumen - Full-Stack Canvas + Docs Workspace",
    description:
      "A workspace that doesn't make you choose between structured docs and freeform thinking. Switch between a block editor and an infinite canvas — same app, same data, zero context switching. The docs side is a full block editor with headings, code blocks, images, todos, callouts, and comments. Every page can be shared publicly with a unique link. Flip to canvas mode and you get an infinite whiteboard with sticky notes, freehand drawing (pen, eraser, highlighter), and smooth pan/zoom. An AI sidebar powered by Gemini handles rewrites, summaries, brainstorming, and grammar fixes without leaving the editor. Auth, database, and row-level security are all Supabase. Updates are optimistic — UI moves first, debounced sync writes to Postgres 300ms later. The canvas drawing system uses raw HTML5 Canvas API with device pixel ratio scaling, no external drawing library. Everything runs on a single Next.js app with the App Router.",
    titleAr: "Lumen - مساحة عمل متكاملة للمستندات واللوحة البيضاء",
    descriptionAr:
      "مساحة عمل لا تجبرك على الاختيار بين المستندات المنظمة والتفكير الحر. انتقل بين محرر الكتل واللوحة اللانهائية — نفس التطبيق، نفس البيانات، بدون تبديل سياق. جانب المستندات هو محرر كتل كامل مع العناوين وكتل الأكواد والصور والمهام والتنبيهات والتعليقات. يمكن مشاركة كل صفحة علنياً برابط فريد. انتقل إلى وضع اللوحة وستحصل على لوحة بيضاء لا نهائية مع ملاحظات لاصقة ورسم حر (قلم، ممحاة، قلم تمييز) وتكبير/تصغير سلس. شريط جانبي للذكاء الاصطناعي مدعوم بـ Gemini يتعامل مع إعادة الكتابة والتلخيص والعصف الذهني وإصلاح القواعد النحوية دون مغادرة المحرر. المصادقة وقاعدة البيانات وأمان مستوى الصفوف كلها عبر Supabase. التحديثات متفائلة — تتحرك الواجهة أولاً، ومزامنة مؤجلة تكتب إلى Postgres بعد 300 مللي ثانية. نظام الرسم على اللوحة يستخدم HTML5 Canvas API الخام مع تحجيم نسبة بكسل الجهاز، بدون مكتبة رسم خارجية. كل شيء يعمل على تطبيق Next.js واحد مع App Router.",
    slug: "lumen",
    kind: "practice",
    year: "2025",
    role: "Design + Full-stack",
    roleAr: "تصميم + تطوير متكامل",
    summary: "Docs and an infinite canvas in one workspace, with an AI sidebar.",
    summaryAr: "مستندات ولوحة لا نهائية في مساحة عمل واحدة، مع مساعد ذكاء اصطناعي.",
    image: "/images/lumen/1.png",
    images: ["/images/lumen/1.png", "/images/lumen/2.png", "/images/lumen/3.png"],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Radix UI",
      "Supabase",
      "PostgreSQL",
      "Google Gemini",
      "HTML5 Canvas",
    ],
    githubUrl: "https://github.com/MorhafGhziel/lumen",
    liveUrl: "https://lumen-woad-nine.vercel.app/",
  },
  {
    title: "AI CV Generator - Full-Stack AI-Powered CV Builder",
    description:
      "A full-stack AI-powered CV generator built end to end as a personal project. Upload a PDF and let AI extract your data, or build from scratch. Paste a job description and AI tailors your CV to match — right skills, right keywords, ATS-friendly. Features Google sign-in with account & profile management, AI-powered screening question answers, full CV history with view/download/delete, and consistency tracking across applications to the same company.",
    titleAr: "مولّد السيرة الذاتية بالذكاء الاصطناعي - منشئ سير ذاتية متكامل مدعوم بالذكاء الاصطناعي",
    descriptionAr:
      "مولّد سيرة ذاتية متكامل مدعوم بالذكاء الاصطناعي تم بناؤه من الصفر كمشروع شخصي. ارفع ملف PDF ودع الذكاء الاصطناعي يستخرج بياناتك، أو ابنِ سيرتك من الصفر. الصق وصف الوظيفة وسيقوم الذكاء الاصطناعي بتخصيص سيرتك الذاتية لتتوافق مع الدور — المهارات المناسبة والكلمات المفتاحية ومتوافقة مع أنظمة تتبع المتقدمين. يتضمن تسجيل دخول عبر Google مع إدارة الحساب والملف الشخصي، وإجابات على أسئلة الفرز مدعومة بالذكاء الاصطناعي، وسجل كامل للسير الذاتية مع إمكانية العرض والتحميل والحذف، وتتبع التناسق عبر التقديمات لنفس الشركة.",
    slug: "ai-cv-generator",
    kind: "practice",
    year: "2025",
    role: "Design + Full-stack",
    roleAr: "تصميم + تطوير متكامل",
    summary: "Upload a PDF, paste a job post, get an ATS-ready CV tailored to it.",
    summaryAr: "ارفع ملفك، الصق وصف الوظيفة، واحصل على سيرة ذاتية مخصصة ومتوافقة مع أنظمة التوظيف.",
    image: "/images/cvai.png",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Google Gemini",
      "Groq",
      "MongoDB",
      "Prisma",
      "NextAuth",
    ],
    githubUrl: "https://github.com/MorhafGhziel/ai-cv-generator",
    liveUrl: "https://ai-cv-generator-opal.vercel.app/",
  },
  {
    title: "Elsina3ya - Content Creator & Influencer Management Platform",
    description:
      "A freelance project I designed and developed — a corporate website for Elsina3ya, a content creator and influencer management agency based in Saudi Arabia. Built with Next.js and featuring a dark theme with orange and amber gradients, the site presents the company's story, mission, vision, values, and services. The platform includes RTL (Right-to-Left) Arabic layout support, smooth scrolling powered by Lenis, interactive animations with Framer Motion, responsive navigation with mobile menu, floating person images with subtle animations, glassmorphism UI effects, and a contact form integrated with Resend API for email delivery. The site emphasizes the company's tagline 'We organize your presence and guarantee your impact' and their mission to gather content creators in 'one workshop,' organizing their digital presence and connecting them with appropriate brands. The website showcases services for both influencers (talent management, content production, performance analysis, brand partnerships, business coordination) and companies (sustainable content creation, brand representation, cinematic content production, influencer matching). It features multiple sections including Hero, Story, Vision, Mission, Values, Services Grid, Why Us, and Contact, all with scroll-triggered animations and modern design patterns. The platform highlights the company's core values of creativity, impact, trust, belonging, and collaboration, positioning them as 'Impact Makers' in the digital content industry.",
    titleAr: "الصناعية - منصة إدارة صانعي المحتوى والمؤثرين",
    descriptionAr:
      "مشروع مستقل قمت بتصميمه وتطويره — موقع شركة للصناعية، وكالة إدارة صانعي المحتوى والمؤثرين مقرها المملكة العربية السعودية. مبني بـ Next.js ويتميز بتصميم داكن مع تدرجات برتقالية وعنبرية، يعرض الموقع قصة الشركة ورسالتها ورؤيتها وقيمها وخدماتها. تتضمن المنصة دعم تخطيط عربي من اليمين لليسار، تمرير سلس مدعوم بـ Lenis، رسوم متحركة تفاعلية مع Framer Motion، تنقل متجاوب مع قائمة محمولة، صور أشخاص عائمة مع رسوم متحركة خفيفة، تأثيرات واجهة زجاجية، ونموذج اتصال متكامل مع Resend API لتسليم البريد الإلكتروني. يؤكد الموقع على شعار الشركة 'ننظم حضورك وضمن تأثيرك' ورسالتها في جمع صانعي المحتوى في 'ورشة واحدة'، وتنظيم حضورهم الرقمي وربطهم بالعلامات التجارية المناسبة. يعرض الموقع خدمات لكل من المؤثرين (إدارة المواهب، إنتاج المحتوى، تحليل الأداء، شراكات العلامات التجارية، تنسيق الأعمال) والشركات (إنشاء محتوى مستدام، تمثيل العلامة التجارية، إنتاج محتوى سينمائي، مطابقة المؤثرين). يتضمن أقساماً متعددة تشمل Hero، القصة، الرؤية، الرسالة، القيم، شبكة الخدمات، لماذا نحن، والاتصال، جميعها مع رسوم متحركة محفزة بالتمرير وأنماط تصميم حديثة. تسلط المنصة الضوء على القيم الأساسية للشركة المتمثلة في الإبداع والتأثير والثقة والانتماء والتعاون، مما يضعهم كـ 'صانعي التأثير' في صناعة المحتوى الرقمي.",
    slug: "elsina3ya",
    kind: "client",
    year: "2025",
    role: "Design + Build",
    roleAr: "تصميم + بناء",
    summary: "Arabic-first corporate site for a Saudi influencer-management agency.",
    summaryAr: "موقع شركة بالعربية أولاً لوكالة سعودية لإدارة المؤثرين.",
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
    slug: "omdah",
    kind: "client",
    year: "2025",
    role: "Design + Build + CMS",
    roleAr: "تصميم + بناء + نظام إدارة",
    summary: "Portfolio site and a custom CMS for a Saudi video production studio.",
    summaryAr: "موقع أعمال ونظام إدارة محتوى مخصص لاستوديو إنتاج فيديو سعودي.",
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
    title: "Alpha Factory Landing - Arabic Marketing Site for a Production Platform",
    description:
      "The public marketing site for Alpha Factory, the video production platform I also built the management system for. Its one job is to turn a visitor into a signup, so the page is built around a single path: what the platform does, what you get, what it costs you not to use it, then create an account. Arabic-first and right-to-left end to end, on a dark canvas with the brand's gold accent. The page opens with a product video, then walks through nine capabilities, the tools behind them — the client dashboard, the analytics view and automated invoicing — and a side-by-side comparison of working with the platform versus without it, before closing on a FAQ that answers the questions that otherwise become support emails: pricing, deliverables, payment and onboarding. Sign-in and sign-up hand off directly to the platform.",
    titleAr: "ألفا فاكتوري - صفحة تسويقية عربية لمنصة إنتاج",
    descriptionAr:
      "الموقع التسويقي لمنصة ألفا فاكتوري، نفس العميل الذي بنيت له نظام إدارة الإنتاج. مهمته واحدة: تحويل الزائر إلى مشترك، لذلك بُنيت الصفحة حول مسار واحد واضح. عربية بالكامل ومن اليمين لليسار، على خلفية داكنة مع اللون الذهبي للعلامة. تبدأ بفيديو للمنتج، ثم تسع ميزات، والأدوات خلفها — لوحة العميل والتحليلات والفوترة الآلية — ومقارنة بين العمل مع المنصة وبدونها، وتختم بأسئلة شائعة تجيب عن الأسعار والمخرجات والدفع وطريقة البدء.",
    slug: "alpha-factory-landing",
    kind: "client",
    year: "2025",
    role: "Design + Build",
    roleAr: "تصميم + بناء",
    summary:
      "Arabic marketing site that turns visitors into signups for the Alpha Factory platform.",
    summaryAr:
      "موقع تسويقي عربي يحول الزوار إلى مشتركين في منصة ألفا فاكتوري.",
    image: "/images/AlphaLanding/alphalanding-1.png",
    images: [
      "/images/AlphaLanding/alphalanding-1.png",
      "/images/AlphaLanding/alphalanding-2.png",
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "RTL Layout",
      "Responsive Design",
      "Vercel",
    ],
    githubUrl: "",
    liveUrl: "https://www.xalphafactory.com/",
  },
  {
    title: "IEDAR - Architectural Design Company Website",
    description:
      "A freelance project that I designed and developed - a modern, elegant corporate website for IEDAR, an architectural design company based in Saudi Arabia. Built with Next.js and featuring a sophisticated dark-themed design with gold and white gradients, the website showcases the company's story, mission, vision, values, and core pillars. The platform includes RTL (Right-to-Left) Arabic layout support, smooth parallax scrolling effects, interactive animations powered by Framer Motion, responsive navigation with mobile menu, image galleries showcasing architectural projects, social media integration, and contact information. The website emphasizes the company's tagline 'للفكرة دار' (For the idea, a home) and their commitment to transforming ideas into living spaces that inspire belonging, combining authentic Saudi identity with sustainable innovation.",
    titleAr: "أيدار - موقع شركة التصميم المعماري",
    descriptionAr:
      "مشروع مستقل قمت بتصميمه وتطويره - موقع شركة عصري وأنيق لشركة أيدار، وهي شركة تصميم معماري مقرها المملكة العربية السعودية. مبني بـ Next.js ويتميز بتصميم داكن أنيق مع تدرجات ذهبية وبيضاء، يعرض الموقع قصة الشركة ورسالتها ورؤيتها وقيمها وركائزها الأساسية. تتضمن المنصة دعم تخطيط عربي من اليمين لليسار، تأثيرات تمرير بارالاكس سلسة، رسوم متحركة تفاعلية مدعومة بـ Framer Motion، تنقل متجاوب مع قائمة محمولة، معارض صور تعرض المشاريع المعمارية، تكامل وسائل التواصل الاجتماعي، ومعلومات الاتصال. يؤكد الموقع على شعار الشركة 'للفكرة دار' والتزامها بتحويل الأفكار إلى فضاءات حية تلهم الانتماء، جامعاً بين الهوية السعودية الأصيلة والابتكار المستدام.",
    slug: "iedar",
    kind: "client",
    year: "2024",
    role: "Design + Build",
    roleAr: "تصميم + بناء",
    summary: "Corporate site for a Saudi architectural design studio.",
    summaryAr: "موقع شركة لاستوديو تصميم معماري سعودي.",
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
    slug: "alpha-factory",
    kind: "client",
    year: "2024",
    role: "Full-stack",
    roleAr: "تطوير متكامل",
    summary: "Production management: roles, boards, invoices, PayPal and bot alerts.",
    summaryAr: "إدارة الإنتاج: أدوار ولوحات وفواتير ودفع PayPal وتنبيهات آلية.",
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
] as const;
