import type { Project } from "./types";

/**
 * Every project on the site, in the order /work shows them.
 *
 * Adding a project = adding one entry here and dropping its media in
 * public/media/<slug>/ (preview.mp4, preview.webm, poster.jpg, m1–m3.webp).
 * Missing media falls back to `cover` automatically.
 *
 * `challenge`, `idea` and `results` are optional on purpose: a block
 * with nothing true to say is skipped rather than filled with filler.
 */
export const PROJECTS: Project[] = [
  {
    "slug": "sima",
    "name": {
      "en": "SIMA Studio",
      "ar": "سِمة"
    },
    "headline": {
      "en": "Bilingual Studio Website with 3D Work and Clear Packages",
      "ar": "موقع استوديو بالعربي والإنجليزي، بتجارب ثلاثية الأبعاد وباقات واضحة"
    },
    "summary": {
      "en": "My studio's own site: websites and 3D product experiences for Saudi companies, in Arabic and English.",
      "ar": "موقع استوديوي الخاص: مواقع وتجارب منتجات ثلاثية الأبعاد لشركات سعودية، بالعربي والإنجليزي."
    },
    "kind": "studio",
    "client": {
      "en": "SIMA (my studio)",
      "ar": "سِمة (استوديوي)"
    },
    "categories": [
      "websites"
    ],
    "year": "2026",
    "role": {
      "en": "Founder · Design + Full-stack",
      "ar": "المؤسس · تصميم وتطوير"
    },
    "services": {
      "en": [
        "Brand",
        "Design",
        "Development",
        "3D"
      ],
      "ar": [
        "هوية",
        "تصميم",
        "تطوير",
        "ثلاثي الأبعاد"
      ]
    },
    "stack": [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "GSAP",
      "Motion",
      "Three.js",
      "RTL / i18n",
      "Vercel"
    ],
    "liveUrl": "https://www.simastudio.it.com/",
    "cover": "/images/sima/1.png",
    "gallery": [
      "/images/sima/1.png",
      "/images/sima/3.png",
      "/images/sima/4.png"
    ],
    "idea": {
      "en": "A studio site built to sell: real client work up front, clear packages in SAR, and one tap to WhatsApp. Arabic and English, with a 3D product experience as proof of what the studio can build.",
      "ar": "موقع استوديو مبني عشان يبيع: أعمال عملاء حقيقية في الواجهة، وباقات واضحة بالريال، وضغطة وحدة للواتساب. بالعربي والإنجليزي، مع تجربة منتج ثلاثية الأبعاد تثبت وش يقدر يبني الاستوديو."
    },
    "notes": {
      "en": "SIMA (سِمة) is my design and web studio in Riyadh. Its site is Arabic-first and bilingual, built with Next.js, Tailwind CSS, GSAP, Motion and Three.js. It shows live client work, packages with prices in SAR, and a WhatsApp link with a ready message, so a visitor can go from looking to asking in one step.",
      "ar": "سِمة استوديو تصميم ومواقع أسسته في الرياض. موقعه يبدأ من العربي وثنائي اللغة، مبني بـ Next.js و Tailwind CSS و GSAP و Motion و Three.js. يعرض أعمال عملاء حقيقية، وباقات بأسعارها بالريال، ورابط واتساب برسالة جاهزة، فيقدر الزائر ينتقل من التصفح للسؤال بخطوة وحدة."
    }
  },
  {
    "slug": "omdah",
    "name": {
      "en": "Omdah Studio",
      "ar": "عُمدة ستوديو"
    },
    "headline": {
      "en": "Bilingual Site & Custom CMS for a Saudi Production Studio",
      "ar": "موقع ثنائي اللغة ونظام إدارة محتوى مخصص لاستوديو إنتاج سعودي"
    },
    "summary": {
      "en": "A bilingual, RTL-first landing site and custom CMS for a Saudi visual-production studio — built as a screening room.",
      "ar": "موقع ثنائي اللغة يبدأ من العربية ونظام إدارة محتوى مخصص لاستوديو إنتاج بصري سعودي — مبني كصالة عرض."
    },
    "kind": "client",
    "client": {
      "en": "Omdah Studio",
      "ar": "عُمدة ستوديو"
    },
    "categories": [
      "websites",
      "webapps"
    ],
    "year": "2026",
    "role": {
      "en": "Design + Full-stack",
      "ar": "تصميم + تطوير متكامل"
    },
    "services": {
      "en": [
        "Design",
        "Development",
        "Custom CMS"
      ],
      "ar": [
        "تصميم",
        "تطوير",
        "نظام إدارة محتوى"
      ]
    },
    "stack": [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Supabase",
      "PostgreSQL",
      "Row-Level Security",
      "Supabase Storage",
      "Email OTP",
      "JWT",
      "Resend",
      "Zod",
      "RTL / i18n",
      "Vercel"
    ],
    "liveUrl": "https://www.omdah.sa/",
    "codeUrl": "https://github.com/MorhafGhziel/OmdahStudio-Landing",
    "cover": "/images/omdah/1.png",
    "gallery": [
      "/images/omdah/1.png",
      "/images/omdah/3.png",
      "/images/omdah/2.png",
      "/images/omdah/5.png",
      "/images/omdah/6.png",
      "/images/omdah/4.png"
    ],
    "challenge": {
      "en": "A production studio's website has one job: prove they can shoot. Omdah needed the footage up front, and a way to add a project the day it wraps, without calling a developer.",
      "ar": "موقع شركة الإنتاج له مهمة واحدة: يثبت إنها تعرف تصوّر. عُمدة احتاجت الأعمال في الواجهة، وتقدر تضيف مشروعها بنفسها يوم ما يخلص، بدون ما ترجع لمطوّر."
    },
    "idea": {
      "en": "Build the site as a screening room. The showreel is the hero, projects open in place as playable reels, and a passwordless CMS lets the studio run every reel and every line of copy.",
      "ar": "بنيت الموقع كصالة عرض: الريل في الواجهة، والمشاريع تنفتح مكانها كمقاطع تشتغل، ونظام إدارة بدون كلمات مرور يدير منه الاستوديو كل مقطع وكل سطر."
    },
    "notes": {
      "en": "Omdah Studio is a visual-production company in Riyadh. I designed and built their site as a single dark scroll — the showreel plays as the hero, projects open in place as playable reels, and the whole thing reads as a gallery with the lights down. Behind it sits a bespoke CMS: the studio manages every project, every reel and every line of copy from an admin panel, signing in with a code sent to their email. No passwords, no third-party CMS, no dashboard they have to learn.\n\nA production studio's website has one job: prove they can shoot. Most bury the work behind stock photography and a contact form. Omdah needed the opposite — the footage in front, plus the ability to add a project themselves the day it wraps, without calling a developer.\n\nThe site is six bands, hard-cut with hairlines and numbered like wall labels: showreel, manifesto, services, work, clients, contact. Projects open in a dialog over the grid so the reel keeps your place, but each card is still a real anchor, so ⌘-click opens the standalone page and crawlers see it too. Behind that sits a full CMS at /admin: create and reorder projects, upload reels and stills, edit every string on the site, manage who is allowed to sign in. Access is passwordless — a six-digit code sent by email, exchanged for a 24-hour session.\n\nArabic set the constraints, not the layout grid. The headline reveal masks words, because splitting into characters breaks the joining forms and renders nonsense. Arabic is never letterspaced and has no uppercase, so every Latin-only type primitive needs an Arabic twin rather than a lang swap. And the failure is silent: a font with no Arabic coverage doesn't error, the browser just substitutes. I found index numerals rendering in Times New Roman and body text in Arial by querying Chrome for which face actually drew each glyph — CSS only reports what you asked for, not what you got.\n\nVideo delivery was the other hard part. Reels run to 45MB and serverless request bodies cap far below that, so uploads can't pass through the backend at all: the server mints a signed URL and the browser writes straight to object storage. On the decode side, footage arriving as HEVC in a QuickTime container plays fine in Finder and not at all in Chrome, so the pipeline had to fail visibly instead of showing a black rectangle.\n\nData access is two-tier. Row-level security makes reads safe with the browser's key; every mutation goes through a server route holding the service role, so the client never carries a credential that can change anything, and the sign-in tables are unreachable from the browser entirely.\n\nThe graphics are drawn, not exported. The contact section is a film strip whose frames progress from a line drawing, through a blocked-out composition and a lit scene, to a finished shot — the section's headline rendered as an object rather than described next to one. It is all markup and CSS, so it resizes and recolours with the palette, and it carries a gate weave: just under a pixel of vertical travel, because real film never sits perfectly still passing the projector gate. Motion is one object throughout — one easing curve for the entire site, one scroll-entrance component, one button, and no drop shadows anywhere, since depth is surface contrast and 1px rules.\n\nRoughly 7,300 lines across 64 source files, 17 routes (9 pages and 8 API endpoints), 6 database tables with row-level security on every one, 12 runtime dependencies — no UI kit, no state library, no ORM — and 2 webfonts.",
      "ar": "عُمدة ستوديو شركة إنتاج بصري في الرياض. صمّمت الموقع وبنيته كمسار داكن واحد متصل: الريل يعمل في الواجهة، والمشاريع تُفتح في مكانها كمقاطع قابلة للتشغيل، فيصير الموقع صالة عرض بإضاءة مطفأة. خلفه نظام إدارة محتوى مبني خصيصاً: الاستوديو يدير كل مشروع وكل مقطع وكل سطر نصّي من لوحة تحكم، بتسجيل دخول برمز يصل إلى بريده. بلا كلمات مرور، وبلا نظام إدارة محتوى جاهز، وبلا لوحة تحتاج تعلّماً.\n\nموقع شركة إنتاج له مهمة واحدة: إثبات قدرتها على التصوير. أغلب المواقع تدفن الأعمال خلف صور جاهزة ونموذج تواصل. عُمدة احتاجت العكس — العمل في المقدمة، مع قدرة الفريق على إضافة مشروع بنفسه يوم انتهائه دون الرجوع إلى مطوّر.\n\nالموقع ستة أقسام مفصولة بخطوط شعرية ومرقّمة كبطاقات معرض: الريل، البيان، الخدمات، الأعمال، العملاء، التواصل. تُفتح المشاريع في نافذة فوق الشبكة حتى لا يفقد الزائر موضعه، لكن كل بطاقة تبقى رابطاً حقيقياً، فالنقر مع ⌘ يفتح الصفحة المستقلة وتراها محرّكات البحث أيضاً. وخلف ذلك نظام إدارة كامل على /admin: إنشاء المشاريع وإعادة ترتيبها، ورفع المقاطع والصور، وتحرير كل نص في الموقع، وتحديد من يُسمح له بالدخول. الدخول بلا كلمة مرور — رمز من ستة أرقام يصل بالبريد، يُستبدل بجلسة مدتها ٢٤ ساعة.\n\nالعربية هي التي فرضت القيود، لا شبكة التصميم. كشف العناوين يتحرك بالكلمات لا بالحروف، لأن تقطيع الحروف يكسر أشكال الوصل ويُنتج نصاً بلا معنى. والعربية لا تُباعد حروفها ولا تعرف الحروف الكبيرة، فكل عنصر طباعي لاتيني احتاج توأماً عربياً بدل مجرد تبديل اللغة. والخلل صامت: الخط الذي لا يغطي العربية لا يُصدر خطأً، بل يستبدله المتصفح بهدوء. اكتشفت أرقام الفهرس تُرسم بخط Times New Roman والنص بخط Arial بسؤال المتصفح عن الخط الذي رسم كل حرف فعلياً — لأن CSS يخبرك بما طلبته لا بما حصلت عليه.\n\nتسليم الفيديو كان التحدي الآخر. تصل المقاطع إلى ٤٥ ميغابايت، وحدود الطلبات في البيئة الخادمة أقل من ذلك بكثير، فلا يمكن أن يمر الرفع عبر الخادم أصلاً: الخادم يُصدر رابطاً موقّعاً ويكتب المتصفح مباشرة إلى التخزين. وفي جانب فك الترميز، المقاطع بصيغة HEVC داخل حاوية QuickTime تعمل على الحاسب ولا تعمل في المتصفح، فكان لا بد أن يُظهر النظام الخطأ بوضوح بدل عرض مستطيل أسود.\n\nالوصول إلى البيانات على مستويين: أمان الصفوف يجعل القراءة آمنة بمفتاح المتصفح، وكل تعديل يمر عبر مسار خادم يحمل صلاحية الخدمة، فلا يحمل العميل أبداً مفتاحاً قادراً على التغيير، وجداول تسجيل الدخول غير قابلة للوصول من المتصفح إطلاقاً.\n\nالرسومات مرسومة لا مصدّرة. قسم التواصل شريط فيلم تتدرّج لقطاته من رسم خطّي، إلى تكوين مبدئي، إلى مشهد مُضاء، إلى لقطة نهائية — عنوان القسم مُجسَّداً لا موصوفاً بجانبه. كله شيفرة وتنسيقات، يتمدد ويتلوّن مع لوحة الألوان، ويحمل اهتزاز بوابة العرض: أقل من بكسل واحد من الحركة الرأسية، لأن الفيلم الحقيقي لا يثبت تماماً وهو يمر ببوابة العارض. والحركة كلها كتلة واحدة: منحنى تسارع واحد للموقع كله، ومكوّن دخول واحد، وزر واحد، وبلا أي ظلال — العمق من تباين الأسطح وخطوط بسماكة بكسل.\n\nنحو ٧٬٣٠٠ سطر في ٦٤ ملفاً، و١٧ مساراً (٩ صفحات و٨ نقاط API)، و٦ جداول بأمان صفوف على كل واحد منها، و١٢ اعتماداً في وقت التشغيل — بلا مكتبة واجهات، وبلا مكتبة حالة، وبلا ORM — وخطّان فقط."
    }
  },
  {
    "slug": "etar",
    "name": {
      "en": "Etar",
      "ar": "إطار"
    },
    "headline": {
      "en": "Arabic Art Print Store with Custom Storefront and Admin",
      "ar": "متجر لوحات فنية بواجهة ولوحة تحكم مخصصتين"
    },
    "summary": {
      "en": "Arabic-first store for framed art prints, with ClickPay checkout and a 16-page admin.",
      "ar": "متجر عربي للوحات المؤطرة، مع دفع ClickPay ولوحة تحكم من ١٦ صفحة."
    },
    "kind": "client",
    "client": {
      "en": "Etar",
      "ar": "إطار"
    },
    "categories": [
      "ecommerce",
      "webapps"
    ],
    "year": "2026",
    "role": {
      "en": "Design + Full-stack",
      "ar": "تصميم + تطوير متكامل"
    },
    "services": {
      "en": [
        "Brand",
        "Design",
        "Store",
        "Admin"
      ],
      "ar": [
        "هوية",
        "تصميم",
        "متجر",
        "لوحة تحكم"
      ]
    },
    "stack": [
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
      "RTL Layout"
    ],
    "liveUrl": "https://eyetar.com/",
    "cover": "/images/itar/itar-1.png",
    "gallery": [
      "/images/itar/itar-1.png",
      "/images/itar/itar-2.png",
      "/images/itar/itar-3.png"
    ],
    "challenge": {
      "en": "A Saudi print brand needed a real store, not a template: local payment methods, order tracking, and one place to run products, orders and customers.",
      "ar": "علامة سعودية للوحات الفنية احتاجت متجر حقيقي مو قالب جاهز: دفع محلي، تتبع للطلبات، ومكان واحد تدير منه المنتجات والطلبات والعملاء."
    },
    "idea": {
      "en": "An Arabic-first storefront: pick a frame, pay with mada, Apple Pay or STC Pay through ClickPay, and get a tracking number. Behind it, a separate API and a sixteen-page admin.",
      "ar": "متجر يبدأ من العربي: تختار الإطار، تدفع بمدى أو Apple Pay أو STC Pay عبر ClickPay، ويوصلك رقم تتبع. وخلفه واجهة برمجية مستقلة ولوحة تحكم من ١٦ صفحة."
    },
    "notes": {
      "en": "A freelance project I designed and built end to end for Etar, a Saudi brand selling framed canvas art prints. The storefront is Arabic-first and right-to-left throughout, using CSS logical properties rather than mirrored stylesheets. Customers browse the collection, pick a frame variant, add to cart and check out through ClickPay, which covers mada, Visa, Mastercard, Apple Pay, STC Pay and urpay. Orders return a tracking number and an email confirmation, with a 14-day return window and WhatsApp support. Behind the shop sits a separate Express API on Node with Prisma over PostgreSQL, JWT and bcrypt authentication, Multer uploads and express-validator on every route — plus a sixteen-page admin area for products, orders, customers and messages. The front end carries no animation library at all: every motion is hand-written CSS keyframes driven by IntersectionObserver, each one gated behind prefers-reduced-motion and given a noscript fallback. The identity is built from a single closed-path asterisk mark, a mint and bone palette, and five hand-built SVG scenes with no images or Lottie anywhere.",
      "ar": "مشروع مستقل صممته وبنيته بالكامل لمتجر إطار السعودي لبيع اللوحات الفنية المؤطرة. المتجر عربي أولاً ومن اليمين لليسار بالكامل عبر الخصائص المنطقية في CSS. يتصفح العميل المجموعة، ويختار نوع الإطار، ثم يدفع عبر ClickPay التي تدعم مدى وفيزا وماستركارد وApple Pay وSTC Pay وurpay. تصدر للطلب رقم تتبع ورسالة تأكيد، مع إمكانية الإرجاع خلال ١٤ يوماً ودعم عبر واتساب. خلف المتجر واجهة برمجية مستقلة بـ Express على Node مع Prisma وPostgreSQL، ومصادقة JWT وbcrypt، ورفع ملفات، وتحقق على كل مسار، إضافة إلى لوحة تحكم من ست عشرة صفحة للمنتجات والطلبات والعملاء والرسائل. لا توجد مكتبة حركة إطلاقاً: كل الحركات مكتوبة يدوياً بـ CSS ومدفوعة بـ IntersectionObserver، وجميعها تحترم تفضيل تقليل الحركة ولها بديل عند تعطيل الجافاسكربت. الهوية مبنية على علامة نجمية واحدة ولوحة ألوان نعناعية، وخمسة مشاهد SVG مرسومة يدوياً دون صور أو Lottie."
    }
  },
  {
    "slug": "inno",
    "name": {
      "en": "INNO",
      "ar": "إنو"
    },
    "headline": {
      "en": "Bilingual Company Website for a Saudi Web Agency",
      "ar": "موقع شركة ثنائي اللغة لوكالة تطوير سعودية"
    },
    "summary": {
      "en": "Bilingual RTL-first site for a Riyadh web agency, rebuilt from 11 runtime dependencies down to 4.",
      "ar": "موقع ثنائي اللغة يبدأ من العربية لوكالة تطوير في الرياض، أُعيد بناؤه من ١١ اعتماداً إلى ٤."
    },
    "kind": "job",
    "client": {
      "en": "INNO",
      "ar": "إنو"
    },
    "categories": [
      "websites"
    ],
    "year": "2025 — 2026",
    "role": {
      "en": "Frontend Developer",
      "ar": "مطوّر واجهات أمامية"
    },
    "services": {
      "en": [
        "Frontend",
        "Design system",
        "Motion"
      ],
      "ar": [
        "واجهات أمامية",
        "نظام تصميم",
        "حركة"
      ]
    },
    "stack": [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "CSS / SVG Animation",
      "Lenis",
      "RTL / i18n",
      "Design System",
      "Vercel"
    ],
    "liveUrl": "https://inno.sa/",
    "codeUrl": "https://github.com/Inno-Workspace/Inno_Landing",
    "cover": "/images/inno/1.png",
    "gallery": [
      "/images/inno/1.png",
      "/images/inno/2.png",
      "/images/inno/3.png",
      "/images/inno/4.png",
      "/images/inno/5.png"
    ],
    "challenge": {
      "en": "The agency's own site carried eleven runtime dependencies and about 47MB of 3D assets, and its scroll performance problems had survived earlier fixes.",
      "ar": "موقع الوكالة نفسه كان فيه ١١ اعتماد تشغيل ونحو ٤٧ ميغابايت أصول ثلاثية الأبعاد، ومشاكل التمرير فيه ما انحلّت مع المحاولات السابقة."
    },
    "idea": {
      "en": "Rebuild it from scratch, Arabic-first: hand-written CSS and SVG animation instead of Three.js, GSAP and Framer Motion, a full design system, and a WhatsApp funnel that pre-fills the chosen plan.",
      "ar": "إعادة بناء من الصفر تبدأ من العربي: حركة مكتوبة يدوياً بـ CSS و SVG بدل Three.js و GSAP و Framer Motion، ونظام تصميم كامل، ومسار واتساب يعبّي الباقة المختارة تلقائياً."
    },
    "notes": {
      "en": "The company website for INNO, a web development agency in Riyadh, built in a full-time frontend role. Bilingual Arabic and English and RTL-first — Arabic is the real layout rather than a mirrored English one — with a full brand design system, seven hand-coded animated SVG scenes, and a WhatsApp lead funnel that prefills the selected plan and its price so a visitor lands in the chat with the context already filled in.\n\nI rebuilt the site from scratch and cut runtime dependencies from eleven to four, replacing Three.js, GSAP and Framer Motion with hand-written CSS and SVG animation. That removed roughly 47MB of 3D assets and fixed the scroll performance problems that earlier mitigations had not solved.\n\nThe Arabic work goes past a direction flip: CSS logical properties throughout, bidirectional text isolation, tabular numerals, direction-aware icons and locale-appropriate digit systems. The design system lives in Tailwind v4 — brand tokens, a typographic scale and 22 hand-written animations, every one of them honouring prefers-reduced-motion. Content is a typed bilingual architecture driven by useSyncExternalStore, so the server and client render deterministically and a language change syncs across tabs. Scroll parallax runs off a single listener on one requestAnimationFrame loop, image assets came down from 190KB to about 2KB, and contrast meets WCAG AA throughout.",
      "ar": "موقع شركة إنو، وكالة تطوير ويب في الرياض، بُني ضمن وظيفة بدوام كامل كمطوّر واجهات أمامية. الموقع ثنائي اللغة بالعربية والإنجليزية ويبدأ من اتجاه اليمين لليسار — العربية هي التخطيط الحقيقي لا نسخة معكوسة عن الإنجليزية — مع نظام هوية بصرية كامل، وسبعة مشاهد SVG متحركة مكتوبة يدوياً، ومسار تواصل عبر واتساب يعبّئ الباقة المختارة وسعرها مسبقاً ليصل الزائر إلى المحادثة والسياق جاهز.\n\nأعدت بناء الموقع من الصفر وخفّضت اعتمادات وقت التشغيل من أحد عشر إلى أربعة، باستبدال Three.js و GSAP و Framer Motion بحركة مكتوبة يدوياً بـ CSS و SVG. أزال ذلك نحو ٤٧ ميغابايت من أصول ثلاثية الأبعاد وأصلح مشاكل أداء التمرير التي لم تحلّها المعالجات السابقة.\n\nوالعمل على العربية يتجاوز قلب الاتجاه: خصائص CSS المنطقية في كل مكان، وعزل النص ثنائي الاتجاه، وأرقام متساوية العرض، وأيقونات تراعي الاتجاه، وأنظمة أرقام مناسبة لكل لغة. نظام التصميم مبني في Tailwind v4: رموز الهوية، وسلّم طباعي، و٢٢ حركة مكتوبة يدوياً تحترم جميعها تفضيل تقليل الحركة. المحتوى بمعمارية ثنائية اللغة مُحكمة الأنواع تعتمد على useSyncExternalStore، فيتطابق عرض الخادم والعميل، ويتزامن تبديل اللغة بين التبويبات. حركة التمرير الموازية تعمل من مستمع واحد على حلقة requestAnimationFrame واحدة، ونزلت أصول الصور من ١٩٠ كيلوبايت إلى نحو ٢ كيلوبايت، ويستوفي التباين معيار WCAG AA في كامل الموقع."
    },
    "results": {
      "en": [
        "Runtime dependencies cut from 11 to 4",
        "About 47MB of 3D assets removed",
        "Image assets down from 190KB to about 2KB",
        "WCAG AA contrast across the site"
      ],
      "ar": [
        "اعتمادات التشغيل نزلت من ١١ إلى ٤",
        "حذف نحو ٤٧ ميغابايت من الأصول ثلاثية الأبعاد",
        "أصول الصور نزلت من ١٩٠ كيلوبايت إلى نحو ٢ كيلوبايت",
        "تباين يستوفي WCAG AA في كامل الموقع"
      ]
    }
  },
  {
    "slug": "archy",
    "name": {
      "en": "Archy",
      "ar": "أرشي"
    },
    "headline": {
      "en": "Natural Language to Database Schema",
      "ar": "من جملة واحدة إلى مخطط قاعدة بيانات"
    },
    "summary": {
      "en": "Describe an app in a sentence; get a live entity diagram plus Prisma, TypeScript and SQL.",
      "ar": "صف تطبيقك بجملة، واحصل على مخطط كيانات حي مع Prisma وTypeScript وSQL."
    },
    "kind": "personal",
    "client": null,
    "categories": [
      "webapps"
    ],
    "year": "2026",
    "role": {
      "en": "Design + Full-stack",
      "ar": "تصميم + تطوير متكامل"
    },
    "services": {
      "en": [
        "Product design",
        "Full-stack",
        "AI"
      ],
      "ar": [
        "تصميم منتج",
        "تطوير متكامل",
        "ذكاء اصطناعي"
      ]
    },
    "stack": [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Server Actions",
      "Clerk",
      "Prisma",
      "Neon Postgres",
      "Google Gemini",
      "View Transitions"
    ],
    "liveUrl": "https://devflow-ai-mu.vercel.app/",
    "codeUrl": "https://github.com/MorhafGhziel/devflow-ai",
    "cover": "/images/Arch/Archy-4.png",
    "gallery": [
      "/images/Arch/Archy-4.png",
      "/images/Arch/Archy-3.png",
      "/images/Arch/Archy-1.png"
    ],
    "idea": {
      "en": "Describe an app in one sentence and get a live entity diagram, then the Prisma schema, TypeScript types and SQL, all generated from the same graph. The canvas is hand-built, with no diagram library.",
      "ar": "اكتب فكرة تطبيقك بجملة، ويطلع لك مخطط كيانات حي، وبعده مخطط Prisma وأنواع TypeScript و SQL كلها من نفس الرسم. اللوحة مبنية يدوياً بدون أي مكتبة رسم."
    },
    "notes": {
      "en": "Describe an app in one sentence and Archy returns a live entity diagram — tables, columns, keys and cardinality — then generates the Prisma schema, TypeScript types and PostgreSQL DDL from that same graph. The canvas is hand-built: drag to move a table, drag from a column to draw a foreign key, click an edge to disconnect, hover to isolate one relationship. There is no diagramming library anywhere in the project. Roughly 1,250 lines of pure functions do the real work — a schema editor covering add/rename/delete and field reordering, a validator that repairs model output before it ever reaches the canvas, an auto-layout pass that packs tables into columns, and three generators that keep types consistent across every target, so one enum column becomes a Prisma enum, a TypeScript union and a SQL CHECK constraint at once. Gemini is called over plain fetch with a 20-second abort and a typed error carrying a retryable flag, no SDK. Auth is Clerk, persistence is Prisma against Neon Postgres through the pg driver adapter, and every server action re-checks the owner before it touches a row. Per-IP rate limiting and a shared daily budget sit in front of the model.",
      "ar": "صف تطبيقك بجملة واحدة ويعيد أرشي مخطط كيانات حيّاً — جداول وأعمدة ومفاتيح وعلاقات — ثم يولّد مخطط Prisma وأنواع TypeScript وأوامر PostgreSQL من نفس الرسم. اللوحة مبنية يدوياً بالكامل: اسحب لتحريك جدول، واسحب من عمود لرسم مفتاح خارجي، واضغط على الرابط لفصله — دون أي مكتبة رسم خارجية. نحو ١٬٢٥٠ سطر من الدوال النقية تقوم بالعمل الفعلي: محرر للمخطط، ومدقّق يصلح مخرجات النموذج قبل وصولها للوحة، وترتيب تلقائي للجداول، وثلاثة مولّدات تحافظ على تطابق الأنواع. يُستدعى Gemini عبر fetch مباشرة مع مهلة ٢٠ ثانية وخطأ مُصنّف، دون SDK. المصادقة عبر Clerk، والتخزين عبر Prisma مع Neon Postgres، وكل إجراء خادم يتحقق من المالك قبل التنفيذ، مع تحديد لمعدل الطلبات وميزانية يومية مشتركة."
    }
  },
  {
    "slug": "iedar",
    "name": {
      "en": "IEDAR",
      "ar": "أيدار"
    },
    "headline": {
      "en": "Architectural Design Company Website",
      "ar": "موقع شركة التصميم المعماري"
    },
    "summary": {
      "en": "Corporate site for a Saudi architectural design studio.",
      "ar": "موقع شركة لاستوديو تصميم معماري سعودي."
    },
    "kind": "client",
    "client": {
      "en": "IEDAR",
      "ar": "أيدار"
    },
    "categories": [
      "websites"
    ],
    "year": "2024",
    "role": {
      "en": "Design + Build",
      "ar": "تصميم + بناء"
    },
    "services": {
      "en": [
        "Design",
        "Development"
      ],
      "ar": [
        "تصميم",
        "تطوير"
      ]
    },
    "stack": [
      "Next.js",
      "TypeScript",
      "React",
      "TailwindCSS",
      "Framer Motion",
      "Next.js Font Optimization",
      "RTL Layout Support",
      "Responsive Design"
    ],
    "liveUrl": "https://www.iedar.sa/",
    "codeUrl": "https://github.com/MorhafGhziel/Idear_Landing",
    "cover": "/images/iedar/11.png",
    "gallery": [
      "/images/iedar/11.png",
      "/images/iedar/iedar-1.png",
      "/images/iedar/iedar-2.png",
      "/images/iedar/iedar-3.png",
      "/images/iedar/iedar-4.png",
      "/images/iedar/iedar-5.png"
    ],
    "idea": {
      "en": "A dark, gold-accented company site built around the studio's line «للفكرة دار», “for the idea, a home”, with parallax, project galleries and an Arabic RTL layout.",
      "ar": "موقع شركة داكن بلمسة ذهبية مبني حول شعارهم «للفكرة دار»، مع حركة بارالاكس ومعارض للمشاريع وتخطيط عربي من اليمين."
    },
    "notes": {
      "en": "A freelance project that I designed and developed - a modern, elegant corporate website for IEDAR, an architectural design company based in Saudi Arabia. Built with Next.js and featuring a sophisticated dark-themed design with gold and white gradients, the website showcases the company's story, mission, vision, values, and core pillars. The platform includes RTL (Right-to-Left) Arabic layout support, smooth parallax scrolling effects, interactive animations powered by Framer Motion, responsive navigation with mobile menu, image galleries showcasing architectural projects, social media integration, and contact information. The website emphasizes the company's tagline 'للفكرة دار' (For the idea, a home) and their commitment to transforming ideas into living spaces that inspire belonging, combining authentic Saudi identity with sustainable innovation.",
      "ar": "مشروع مستقل قمت بتصميمه وتطويره - موقع شركة عصري وأنيق لشركة أيدار، وهي شركة تصميم معماري مقرها المملكة العربية السعودية. مبني بـ Next.js ويتميز بتصميم داكن أنيق مع تدرجات ذهبية وبيضاء، يعرض الموقع قصة الشركة ورسالتها ورؤيتها وقيمها وركائزها الأساسية. تتضمن المنصة دعم تخطيط عربي من اليمين لليسار، تأثيرات تمرير بارالاكس سلسة، رسوم متحركة تفاعلية مدعومة بـ Framer Motion، تنقل متجاوب مع قائمة محمولة، معارض صور تعرض المشاريع المعمارية، تكامل وسائل التواصل الاجتماعي، ومعلومات الاتصال. يؤكد الموقع على شعار الشركة 'للفكرة دار' والتزامها بتحويل الأفكار إلى فضاءات حية تلهم الانتماء، جامعاً بين الهوية السعودية الأصيلة والابتكار المستدام."
    }
  },
  {
    "slug": "ai-cv-generator",
    "name": {
      "en": "Craftly",
      "ar": "كرافتلي"
    },
    "headline": {
      "en": "One CV, Rewritten for Every Job You Apply To",
      "ar": "سيرة ذاتية واحدة، تُعاد كتابتها لكل وظيفة تتقدّم لها"
    },
    "summary": {
      "en": "Upload a PDF, paste a job post, get an ATS-ready CV in the employer's own language.",
      "ar": "ارفع ملفك، الصق إعلان الوظيفة، واحصل على سيرة ذاتية بلغة جهة العمل جاهزة لأنظمة الفرز."
    },
    "kind": "personal",
    "client": null,
    "categories": [
      "webapps"
    ],
    "year": "2026",
    "role": {
      "en": "Design + Full-stack",
      "ar": "تصميم + تطوير متكامل"
    },
    "services": {
      "en": [
        "Product design",
        "Full-stack",
        "AI"
      ],
      "ar": [
        "تصميم منتج",
        "تطوير متكامل",
        "ذكاء اصطناعي"
      ]
    },
    "stack": [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Motion",
      "NextAuth",
      "Prisma",
      "PostgreSQL",
      "Google Gemini",
      "Groq",
      "Zod",
      "unpdf",
      "Vercel"
    ],
    "liveUrl": "https://ai-cv-generator-opal.vercel.app/",
    "codeUrl": "https://github.com/MorhafGhziel/ai-cv-generator",
    "cover": "/images/aicv/1.png",
    "gallery": [
      "/images/aicv/1.png",
      "/images/aicv/2.png",
      "/images/aicv/3.png",
      "/images/aicv/4.png"
    ],
    "challenge": {
      "en": "Rewrite a CV for every job without inventing a single employer, degree or date, and run the whole product on free tiers.",
      "ar": "إعادة كتابة السيرة لكل وظيفة بدون اختلاق أي جهة عمل أو شهادة أو تاريخ، وتشغيل المنتج كله على الخطط المجانية."
    },
    "idea": {
      "en": "Upload a PDF once. After that every application is a paste and about a minute: a CV in the employer's own language, plain enough for applicant tracking systems, plus drafted screening answers.",
      "ar": "ترفع ملف PDF مرة وحدة، وبعدها كل تقديم مجرد لصق ودقيقة: سيرة بلغة جهة العمل، بسيطة تقرأها أنظمة الفرز، مع إجابات جاهزة لأسئلة التقديم."
    },
    "notes": {
      "en": "Craftly takes the CV you already have plus a job posting and rewrites the CV in the employer's own language — the same truth, aimed properly — then drafts the answers to the screening questions on the application form. Upload a PDF once and it becomes a structured, editable profile; after that every application is a paste and about a minute. The export is deliberately plain: single-column A4 typeset in Computer Modern, no colour and no icons, because that is what applicant tracking systems parse cleanly and what reads like a document a person actually wrote.\n\nThe whole thing runs on free tiers, and that constraint set most of the engineering. Model calls fan out across Gemini and Groq under one shared 50-second budget that sits below the serverless ceiling, each attempt capped at 22 seconds, and a new attempt is only started if four seconds remain — an earlier version could chain six models with retries and outlive the function, returning nothing at all. Model ids are pinned rather than aliased and can be overridden from the environment, because providers retire them on their own schedule and a hardcoded list turns that into a silent outage. A retired model, a rate limit and a timeout are distinguished from one another and reported as such, instead of every failure becoming 'temporarily unavailable' forever.\n\nBoth providers are asked for JSON natively, and the response is still pulled apart by a scanner that walks balanced delimiters while respecting string literals — an indexOf/lastIndexOf slice breaks on any trailing prose containing a brace. Output is validated with Zod and retried once, with the parse failure fed back into the prompt.\n\nQuota is enforced per user against the database rather than a second service. The claim row is written before the count is read: a check-then-write lets a double-click or a duplicated tab both read the same count, both pass, and both spend upstream free-tier quota, which is the one thing the limiter exists to prevent. A rejected claim is rolled back immediately, and expired rows are pruned opportunistically on two per cent of requests instead of by a cron job. A PDF upload is charged only once the file has yielded usable text, since parsing is local and free and an unreadable scan should not cost the user a slice of their day.\n\nPrompts live outside the route handlers. Earlier versions serialised the entire history — every full tailored CV — into each request, so prompt size grew without bound until it blew past the free-tier token limits; now only a capped digest of the four most recent applications is sent, enough to keep employers, titles and dates consistent while the bullet prose is deliberately rewritten per role. The rewrite is bounded on purpose: the model is told never to invent an employer, a degree or a date, never to claim a technology with no basis in the candidate's record, and never to reach for 'passionate about' or 'results-driven'. Auth is NextAuth v5 over Google, with the edge proxy running an adapter-free config so identity comes from the JWT alone, and an unauthenticated API call returns a JSON 401 rather than redirecting to an HTML page that would break a fetch().json() on the client. The interface is warm paper — a cream canvas, one orange accent, hairlines instead of shadows, three typefaces each with a single job, and hand-authored SVG illustrations so there is no icon library anywhere in the project. Roughly 7,700 lines across 60 source files, 10 API routes and 6 pages.",
      "ar": "يأخذ كرافتلي سيرتك الذاتية الحالية مع إعلان الوظيفة، ويعيد كتابة السيرة بلغة جهة العمل نفسها — الحقيقة ذاتها، لكن موجّهة بدقة — ثم يصيغ إجابات أسئلة الفرز في نموذج التقديم. ترفع ملف PDF مرة واحدة فيتحوّل إلى ملف شخصي منظّم وقابل للتحرير، وبعدها كل تقديم لا يتجاوز لصق النص ودقيقة من الوقت. الملف المُصدَّر بسيط عن قصد: عمود واحد بمقاس A4 بخط Computer Modern، بلا ألوان ولا أيقونات، لأن هذا ما تقرأه أنظمة تتبع المتقدمين بنظافة وما يبدو كوثيقة كتبها إنسان فعلاً.\n\nالتطبيق كله يعمل على الطبقات المجانية، وهذا القيد هو ما شكّل معظم الهندسة فيه. تتوزّع نداءات النموذج بين Gemini و Groq ضمن ميزانية واحدة مشتركة مدتها ٥٠ ثانية تقلّ عن سقف البيئة الخادمة، وكل محاولة محدودة بـ ٢٢ ثانية، ولا تبدأ محاولة جديدة إلا إذا تبقّت أربع ثوانٍ — إذ كانت نسخة سابقة قد تسلسل ستة نماذج مع إعادات المحاولة فتتجاوز عمر الدالة وتعود بلا شيء. معرّفات النماذج مثبّتة لا مختصرة، ويمكن تجاوزها من متغيّرات البيئة، لأن المزوّدين يوقفون النماذج وفق جدولهم الخاص فتتحوّل القائمة الثابتة إلى عطل صامت. ويُميَّز النموذج المتوقّف عن تجاوز الحدّ عن انتهاء المهلة، ويُبلَّغ عن كل حالة باسمها بدل أن يصير كل خطأ رسالة 'الخدمة غير متاحة مؤقتاً' إلى الأبد.\n\nيُطلب من المزوّدَين إخراج JSON أصلاً، ومع ذلك يُفكَّك الرد بماسح يتتبّع الأقواس المتوازنة مع احترام النصوص بين علامات التنصيص — لأن الاقتطاع بـ indexOf و lastIndexOf ينكسر مع أي نص لاحق يحتوي قوساً. تُتحقَّق المخرجات عبر Zod وتُعاد المحاولة مرة واحدة مع تغذية سبب الفشل إلى الطلب التالي.\n\nتُطبَّق الحصص لكل مستخدم على قاعدة البيانات نفسها بدل خدمة إضافية. يُكتب صف المطالبة قبل قراءة العدّ: فالتحقق ثم الكتابة يسمح لنقرتين متتاليتين أو تبويبين مكررين بقراءة العدد نفسه والمرور معاً وإنفاق حصة المزوّد مرتين، وهو تحديداً ما وُجد المحدِّد لمنعه. وتُلغى المطالبة المرفوضة فوراً، وتُنظَّف الصفوف المنتهية انتهازياً في ٢٪ من الطلبات بدل مهمة مجدولة. ولا يُحاسَب رفع الملف إلا بعد أن يُنتج نصاً صالحاً، لأن القراءة محلية ومجانية ولا يصح أن تكلّف صورة ممسوحة المستخدمَ جزءاً من حصته.\n\nالنصوص الموجَّهة للنموذج خارج معالجات المسارات. كانت النسخ السابقة ترسل السجل كاملاً — كل سيرة مُخصَّصة بحذافيرها — مع كل طلب، فينمو حجم الطلب بلا حدّ حتى يتجاوز حدود الطبقة المجانية؛ أما الآن فيُرسل ملخّص محدود لآخر أربعة تقديمات فقط، يكفي لإبقاء جهات العمل والمسمّيات والتواريخ متسقة بينما تُعاد صياغة النقاط عمداً لكل وظيفة. وإعادة الكتابة مقيّدة بقصد: يُمنع النموذج من اختلاق جهة عمل أو شهادة أو تاريخ، ومن ادّعاء تقنية لا أساس لها في سجل المرشّح، ومن استخدام حشو مثل 'شغوف بـ' أو 'موجّه بالنتائج'. المصادقة عبر NextAuth v5 مع Google، ويعمل الوسيط الطرفي بإعداد بلا مُهايئ فتأتي الهوية من الرمز وحده، ويعيد الطلب غير المصادَق عليه رمز 401 بصيغة JSON بدل تحويله إلى صفحة HTML تكسر قراءة الرد في المتصفح. أما الواجهة فورقية دافئة: خلفية كريمية، ولون برتقالي واحد، وخطوط شعرية بدل الظلال، وثلاثة خطوط لكل منها مهمة واحدة، ورسوم SVG مكتوبة يدوياً فلا توجد مكتبة أيقونات في المشروع كله. نحو ٧٬٧٠٠ سطر في ٦٠ ملفاً، و١٠ مسارات API، و٦ صفحات."
    }
  },
  {
    "slug": "lumen",
    "name": {
      "en": "Lumen",
      "ar": "لومن"
    },
    "headline": {
      "en": "Full-Stack Canvas + Docs Workspace",
      "ar": "مساحة عمل متكاملة للمستندات واللوحة البيضاء"
    },
    "summary": {
      "en": "Docs and an infinite canvas in one workspace, with an AI sidebar.",
      "ar": "مستندات ولوحة لا نهائية في مساحة عمل واحدة، مع مساعد ذكاء اصطناعي."
    },
    "kind": "personal",
    "client": null,
    "categories": [
      "webapps"
    ],
    "year": "2025",
    "role": {
      "en": "Design + Full-stack",
      "ar": "تصميم + تطوير متكامل"
    },
    "services": {
      "en": [
        "Product design",
        "Full-stack"
      ],
      "ar": [
        "تصميم منتج",
        "تطوير متكامل"
      ]
    },
    "stack": [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Radix UI",
      "Supabase",
      "PostgreSQL",
      "Google Gemini",
      "HTML5 Canvas"
    ],
    "liveUrl": "https://lumen-woad-nine.vercel.app/",
    "codeUrl": "https://github.com/MorhafGhziel/lumen",
    "cover": "/images/lumen/image.png",
    "gallery": [
      "/images/lumen/image.png",
      "/images/lumen/2.png",
      "/images/lumen/4.png",
      "/images/lumen/6.png",
      "/images/lumen/5.png",
      "/images/lumen/3.png"
    ],
    "challenge": {
      "en": "Structured docs and freeform thinking usually live in two different apps.",
      "ar": "المستندات المرتبة والتفكير الحر عادة كل واحد في تطبيق."
    },
    "idea": {
      "en": "One workspace that flips between a block editor and an infinite canvas, on the same data, with a Gemini sidebar for rewrites and summaries.",
      "ar": "مساحة عمل وحدة تتنقل بين محرر كتل ولوحة لا نهائية على نفس البيانات، مع مساعد Gemini للصياغة والتلخيص."
    },
    "notes": {
      "en": "A workspace that doesn't make you choose between structured docs and freeform thinking. Switch between a block editor and an infinite canvas — same app, same data, zero context switching. The docs side is a full block editor with headings, code blocks, images, todos, callouts, and comments. Every page can be shared publicly with a unique link. Flip to canvas mode and you get an infinite whiteboard with sticky notes, freehand drawing (pen, eraser, highlighter), and smooth pan/zoom. An AI sidebar powered by Gemini handles rewrites, summaries, brainstorming, and grammar fixes without leaving the editor. Auth, database, and row-level security are all Supabase. Updates are optimistic — UI moves first, debounced sync writes to Postgres 300ms later. The canvas drawing system uses raw HTML5 Canvas API with device pixel ratio scaling, no external drawing library. Everything runs on a single Next.js app with the App Router.",
      "ar": "مساحة عمل لا تجبرك على الاختيار بين المستندات المنظمة والتفكير الحر. انتقل بين محرر الكتل واللوحة اللانهائية — نفس التطبيق، نفس البيانات، بدون تبديل سياق. جانب المستندات هو محرر كتل كامل مع العناوين وكتل الأكواد والصور والمهام والتنبيهات والتعليقات. يمكن مشاركة كل صفحة علنياً برابط فريد. انتقل إلى وضع اللوحة وستحصل على لوحة بيضاء لا نهائية مع ملاحظات لاصقة ورسم حر (قلم، ممحاة، قلم تمييز) وتكبير/تصغير سلس. شريط جانبي للذكاء الاصطناعي مدعوم بـ Gemini يتعامل مع إعادة الكتابة والتلخيص والعصف الذهني وإصلاح القواعد النحوية دون مغادرة المحرر. المصادقة وقاعدة البيانات وأمان مستوى الصفوف كلها عبر Supabase. التحديثات متفائلة — تتحرك الواجهة أولاً، ومزامنة مؤجلة تكتب إلى Postgres بعد 300 مللي ثانية. نظام الرسم على اللوحة يستخدم HTML5 Canvas API الخام مع تحجيم نسبة بكسل الجهاز، بدون مكتبة رسم خارجية. كل شيء يعمل على تطبيق Next.js واحد مع App Router."
    }
  },
  {
    "slug": "elsina3ya",
    "name": {
      "en": "Snaya",
      "ar": "الصناعية"
    },
    "headline": {
      "en": "Content Creator & Influencer Management Platform",
      "ar": "منصة إدارة صانعي المحتوى والمؤثرين"
    },
    "summary": {
      "en": "Arabic-first corporate site for a Saudi influencer-management agency.",
      "ar": "موقع شركة بالعربية أولاً لوكالة سعودية لإدارة المؤثرين."
    },
    "kind": "client",
    "client": {
      "en": "Snaya",
      "ar": "الصناعية"
    },
    "categories": [
      "websites"
    ],
    "year": "2025",
    "role": {
      "en": "Design + Build",
      "ar": "تصميم + بناء"
    },
    "services": {
      "en": [
        "Design",
        "Development"
      ],
      "ar": [
        "تصميم",
        "تطوير"
      ]
    },
    "stack": [
      "Resend",
      "Three.js",
      "Lenis",
      "Next.js",
      "TypeScript",
      "React",
      "TailwindCSS",
      "Framer Motion"
    ],
    "liveUrl": "https://www.snaya.sa/",
    "codeUrl": "https://github.com/MorhafGhziel/elsina3ya",
    "cover": "/images/snaya.png",
    "gallery": [
      "/images/snaya.png"
    ],
    "idea": {
      "en": "An Arabic-first company site for an influencer-management agency, telling its story and laying out services for both creators and brands, with a contact form wired to email.",
      "ar": "موقع شركة يبدأ من العربي لوكالة إدارة مؤثرين، يحكي قصتها ويعرض خدماتها لصنّاع المحتوى وللشركات، مع نموذج تواصل يوصل للبريد."
    },
    "notes": {
      "en": "A freelance project I designed and developed — a corporate website for Snaya, a content creator and influencer management agency based in Saudi Arabia. Built with Next.js and featuring a dark theme with orange and amber gradients, the site presents the company's story, mission, vision, values, and services. The platform includes RTL (Right-to-Left) Arabic layout support, smooth scrolling powered by Lenis, interactive animations with Framer Motion, responsive navigation with mobile menu, floating person images with subtle animations, glassmorphism UI effects, and a contact form integrated with Resend API for email delivery. The site emphasizes the company's tagline 'We organize your presence and guarantee your impact' and their mission to gather content creators in 'one workshop,' organizing their digital presence and connecting them with appropriate brands. The website showcases services for both influencers (talent management, content production, performance analysis, brand partnerships, business coordination) and companies (sustainable content creation, brand representation, cinematic content production, influencer matching). It features multiple sections including Hero, Story, Vision, Mission, Values, Services Grid, Why Us, and Contact, all with scroll-triggered animations and modern design patterns. The platform highlights the company's core values of creativity, impact, trust, belonging, and collaboration, positioning them as 'Impact Makers' in the digital content industry.",
      "ar": "مشروع مستقل قمت بتصميمه وتطويره — موقع شركة للصناعية، وكالة إدارة صانعي المحتوى والمؤثرين مقرها المملكة العربية السعودية. مبني بـ Next.js ويتميز بتصميم داكن مع تدرجات برتقالية وعنبرية، يعرض الموقع قصة الشركة ورسالتها ورؤيتها وقيمها وخدماتها. تتضمن المنصة دعم تخطيط عربي من اليمين لليسار، تمرير سلس مدعوم بـ Lenis، رسوم متحركة تفاعلية مع Framer Motion، تنقل متجاوب مع قائمة محمولة، صور أشخاص عائمة مع رسوم متحركة خفيفة، تأثيرات واجهة زجاجية، ونموذج اتصال متكامل مع Resend API لتسليم البريد الإلكتروني. يؤكد الموقع على شعار الشركة 'ننظم حضورك وضمن تأثيرك' ورسالتها في جمع صانعي المحتوى في 'ورشة واحدة'، وتنظيم حضورهم الرقمي وربطهم بالعلامات التجارية المناسبة. يعرض الموقع خدمات لكل من المؤثرين (إدارة المواهب، إنتاج المحتوى، تحليل الأداء، شراكات العلامات التجارية، تنسيق الأعمال) والشركات (إنشاء محتوى مستدام، تمثيل العلامة التجارية، إنتاج محتوى سينمائي، مطابقة المؤثرين). يتضمن أقساماً متعددة تشمل Hero، القصة، الرؤية، الرسالة، القيم، شبكة الخدمات، لماذا نحن، والاتصال، جميعها مع رسوم متحركة محفزة بالتمرير وأنماط تصميم حديثة. تسلط المنصة الضوء على القيم الأساسية للشركة المتمثلة في الإبداع والتأثير والثقة والانتماء والتعاون، مما يضعهم كـ 'صانعي التأثير' في صناعة المحتوى الرقمي."
    }
  },
  {
    "slug": "alpha-factory-landing",
    "name": {
      "en": "Alpha Factory",
      "ar": "ألفا فاكتوري"
    },
    "headline": {
      "en": "Arabic Marketing Site for a Production Platform",
      "ar": "صفحة تسويقية عربية لمنصة إنتاج"
    },
    "summary": {
      "en": "Arabic marketing site that turns visitors into signups for the Alpha Factory platform.",
      "ar": "موقع تسويقي عربي يحول الزوار إلى مشتركين في منصة ألفا فاكتوري."
    },
    "kind": "client",
    "client": {
      "en": "Alpha Factory",
      "ar": "ألفا فاكتوري"
    },
    "categories": [
      "websites"
    ],
    "year": "2025",
    "role": {
      "en": "Design + Build",
      "ar": "تصميم + بناء"
    },
    "services": {
      "en": [
        "Design",
        "Development"
      ],
      "ar": [
        "تصميم",
        "تطوير"
      ]
    },
    "stack": [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "RTL Layout",
      "Responsive Design",
      "Vercel"
    ],
    "liveUrl": "https://www.xalphafactory.com/",
    "cover": "/images/AlphaLanding/alphalanding-1.png",
    "gallery": [
      "/images/AlphaLanding/alphalanding-1.png",
      "/images/AlphaLanding/alphalanding-2.png"
    ],
    "challenge": {
      "en": "The marketing site has one job: turn a visitor into a signup.",
      "ar": "الموقع التسويقي له مهمة وحدة: يحوّل الزائر إلى مشترك."
    },
    "idea": {
      "en": "One clear path: what the platform does, what you get, what it costs not to use it, then create an account. Arabic-first, dark, with the brand's gold.",
      "ar": "مسار واحد واضح: وش تسوي المنصة، وش تاخذ، وكم يكلفك إنك ما تستخدمها، وبعدها أنشئ حسابك. عربي أولاً، داكن، بذهبي العلامة."
    },
    "notes": {
      "en": "The public marketing site for Alpha Factory, the video production platform I also built the management system for. Its one job is to turn a visitor into a signup, so the page is built around a single path: what the platform does, what you get, what it costs you not to use it, then create an account. Arabic-first and right-to-left end to end, on a dark canvas with the brand's gold accent. The page opens with a product video, then walks through nine capabilities, the tools behind them — the client dashboard, the analytics view and automated invoicing — and a side-by-side comparison of working with the platform versus without it, before closing on a FAQ that answers the questions that otherwise become support emails: pricing, deliverables, payment and onboarding. Sign-in and sign-up hand off directly to the platform.",
      "ar": "الموقع التسويقي لمنصة ألفا فاكتوري، نفس العميل الذي بنيت له نظام إدارة الإنتاج. مهمته واحدة: تحويل الزائر إلى مشترك، لذلك بُنيت الصفحة حول مسار واحد واضح. عربية بالكامل ومن اليمين لليسار، على خلفية داكنة مع اللون الذهبي للعلامة. تبدأ بفيديو للمنتج، ثم تسع ميزات، والأدوات خلفها — لوحة العميل والتحليلات والفوترة الآلية — ومقارنة بين العمل مع المنصة وبدونها، وتختم بأسئلة شائعة تجيب عن الأسعار والمخرجات والدفع وطريقة البدء."
    }
  },
  {
    "slug": "alpha-factory",
    "name": {
      "en": "Alpha Factory Platform",
      "ar": "منصة ألفا فاكتوري"
    },
    "headline": {
      "en": "Video Production Management System",
      "ar": "نظام إدارة إنتاج الفيديو"
    },
    "summary": {
      "en": "Production management: roles, boards, invoices, PayPal and bot alerts.",
      "ar": "إدارة الإنتاج: أدوار ولوحات وفواتير ودفع PayPal وتنبيهات آلية."
    },
    "kind": "client",
    "client": {
      "en": "Alpha Factory",
      "ar": "ألفا فاكتوري"
    },
    "categories": [
      "webapps"
    ],
    "year": "2024",
    "role": {
      "en": "Full-stack",
      "ar": "تطوير متكامل"
    },
    "services": {
      "en": [
        "Full-stack",
        "Integrations"
      ],
      "ar": [
        "تطوير متكامل",
        "ربط خدمات"
      ]
    },
    "stack": [
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
      "bcryptjs"
    ],
    "liveUrl": "https://www.alphafactory.net/",
    "codeUrl": "https://github.com/MorhafGhziel/Alpha-Factory",
    "cover": "/images/AlphaFactory.png",
    "gallery": [
      "/images/AlphaFactory.png"
    ],
    "idea": {
      "en": "A production management platform: roles for clients, designers, editors and reviewers, live project boards, automated invoices with PayPal, and alerts over Telegram, WhatsApp and email.",
      "ar": "منصة لإدارة الإنتاج: أدوار للعملاء والمصممين والمحررين والمراجعين، ولوحات متابعة حية، وفواتير تلقائية مع PayPal، وتنبيهات عبر تيليجرام وواتساب والبريد."
    },
    "notes": {
      "en": "A freelance project that provides a comprehensive video production management platform built with Next.js, featuring multi-role access control (clients, designers, editors, reviewers), real-time project tracking boards, automated invoice generation with PayPal payment integration, Telegram bot notifications, WhatsApp Business API for client communications, email reminders for overdue projects, voice recording capabilities, video duration detection from Google Drive/YouTube links, and a complete admin panel for account management. The system includes automated billing, payment processing, project status tracking, team collaboration tools, and multi-channel communication integration.",
      "ar": "مشروع مستقل يوفر منصة شاملة لإدارة إنتاج الفيديو مبنية بـ Next.js، تتضمن نظام تحكم متعدد الأدوار (عملاء، مصممون، محررون، مراجعون)، لوحات متابعة المشاريع في الوقت الفعلي، إنشاء فواتير تلقائي مع تكامل دفع PayPal، إشعارات بوت Telegram، تكامل WhatsApp Business API للتواصل مع العملاء، تذكيرات بريد إلكتروني للمشاريع المتأخرة، إمكانيات تسجيل صوتي، كشف مدة الفيديو من روابط Google Drive/YouTube، ولوحة تحكم كاملة لإدارة الحسابات. يتضمن النظام فوترة تلقائية، معالجة المدفوعات، تتبع حالة المشاريع، أدوات تعاون الفريق، وتكامل التواصل متعدد القنوات."
    }
  }
];

/** The home page's "Selected work", in this order. Reorder freely. */
export const FEATURED: string[] = ["sima","etar","inno","lumen","archy","ai-cv-generator","omdah","iedar"];
