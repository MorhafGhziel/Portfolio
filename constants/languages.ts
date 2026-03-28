export type Language = "en" | "ar";

export const languages = {
  en: {
    name: "English",
    dir: "ltr",
    translations: {
      nav: {
        home: "Home",
        about: "About",
        work: "Work",
        contact: "Contact",
      },
      cta: {
        getInTouch: "Get in touch",
        backHome: "Back Home",
        downloadResume: "Download Resume",
        scrollToExplore: "Scroll to explore",
      },
      hero: {
        title: "Hi, I'm",
        name: "Morhaf",
        description:
          "I create exceptional digital experiences by combining clean code with thoughtful design. Specialized in React, Next.js, and modern web technologies.",
        frontEndDev: "Full-Stack Developer",
        uiuxEngineer: "UI/UX Engineer",
        stats: {
          years: "Years Exp",
          projects: "Projects",
          mobile: "Mobile",
          mobileFirst: "First",
          uiux: "UI/UX",
          design: "Design",
        },
      },
      about: {
        title: "About Me",
        subtitle:
          "Get to know more about my journey, experience, and what drives me as a developer",
        role: "Full-Stack Developer",
        description:
          "I'm Morhaf Ghziel, a full-stack developer with 5 years of experience building scalable web applications and user-focused experiences.\n\nMy work is frontend-driven, with strong experience in React and Next.js, where I focus on building performant and maintainable interfaces. I also work on the backend, building APIs and handling data to support complete, end-to-end features.\n\nI focus on solving problems, improving user experience, and turning ideas into clean, reliable solutions. I work on personal projects and explore new technologies.",
        location: {
          title: "Location & Availability",
          based: "Based in Riyadh, Saudi Arabia",
          available: "Available for remote work worldwide",
          timezone: "GMT+3 (Riyadh Time)",
          languages: "Arabic (Native) • English (Professional)",
          status: "Available for new projects",
        },
        expertise: {
          title: "What I Bring to the Table",
          items: [
            "Full-Stack Developer with expertise in React, Next.js, and backend technologies",
            "Building performant and maintainable user interfaces",
            "Experienced in building scalable web applications end to end",
            "Strong background in modern JavaScript/TypeScript frameworks",
            "Backend experience with APIs, databases, and server-side logic",
            "Committed to continuous learning and staying updated with latest technologies",
          ],
        },
        skills: "Skills",
      },
      projects: {
        title: "Featured Projects",
        subtitle:
          "Here are some of my recent projects that showcase my skills and experience",
        showMore: "Show More",
        showLess: "Show Less",
        viewProject: "Live Demo",
        viewCode: "Code",
        live: "Live",
        clickToView: "Click to view full image",
      },
      contactCta: {
        title: "Ready to bring your ideas to life?",
        subtitle:
          "Let's collaborate on your next project. I'm always excited to work on innovative solutions.",
        sendEmail: "Send Email",
        connectLinkedIn: "Connect on LinkedIn",
      },
      footer: {
        copyright: "All rights reserved by Morhaf",
        availableWorldwide: "Available worldwide",
        github: "GitHub",
        linkedin: "LinkedIn",
        twitter: "Twitter",
        instagram: "Instagram",
        email: "Email",
        copyEmail: "Email copied to clipboard!",
        copyEmailError: "Failed to copy email",
      },
      contact: {
        title: "Let's Create",
        subtitle: "Something Together",
        description:
          "Have a project in mind? Let's discuss how we can work together to bring your ideas to life.",
        form: {
          name: "Name",
          email: "Email",
          phone: "Phone",
          location: "Location",
          locationValue: "Riyadh, Saudi Arabia",
          subject: "Subject",
          message: "Your message",
          send: "Send Message",
          sending: "Sending...",
          errors: {
            name: "Please enter your name",
            email: "Please enter your email",
            emailInvalid: "Please enter a valid email",
            subject: "Please enter a subject",
            message: "Please enter your message",
          },
        },
      },
    },
  },
  ar: {
    name: "العربية",
    dir: "rtl",
    translations: {
      nav: {
        home: "الرئيسية",
        about: "عني",
        work: "أعمالي",
        contact: "اتصل بي",
      },
      cta: {
        getInTouch: "تواصل معي",
        backHome: "العودة للرئيسية",
        downloadResume: "تحميل السيرة الذاتية",
        scrollToExplore: "اسحب للاستكشاف",
      },
      hero: {
        title: "مرحباً، أنا",
        name: "مرهف",
        description:
          "أقوم بإنشاء تجارب رقمية استثنائية من خلال الجمع بين الكود النظيف والتصميم المدروس. متخصص في React و Next.js وتقنيات الويب الحديثة.",
        frontEndDev: "مطور ويب متكامل",
        uiuxEngineer: "مهندس واجهات المستخدم",
        stats: {
          years: "سنوات خبرة",
          projects: "مشروع",
          mobile: "تصميم",
          mobileFirst: "متجاوب",
          uiux: "واجهات",
          design: "المستخدم",
        },
      },
      about: {
        title: "نبذة عني",
        subtitle: "تعرف أكثر على مسيرتي وخبراتي وما يدفعني كمطور",
        role: "مطور ويب متكامل",
        description:
          "أنا مرهف غزيل، مطور ويب متكامل بخبرة 5 سنوات في بناء تطبيقات ويب قابلة للتوسع وتجارب تركز على المستخدم.\n\nعملي يرتكز على الواجهات الأمامية، مع خبرة قوية في React و Next.js، حيث أركز على بناء واجهات عالية الأداء وسهلة الصيانة. كما أعمل على الواجهة الخلفية، أبني واجهات برمجية وأتعامل مع البيانات لدعم ميزات متكاملة من البداية للنهاية.\n\nأركز على حل المشكلات وتحسين تجربة المستخدم وتحويل الأفكار إلى حلول نظيفة وموثوقة. أعمل على مشاريع شخصية وأستكشف تقنيات جديدة.",
        location: {
          title: "الموقع والتوفر",
          based: "مقيم في الرياض، المملكة العربية السعودية",
          available: "متاح للعمل عن بعد في جميع أنحاء العالم",
          timezone: "توقيت الرياض (GMT+3)",
          languages: "العربية (اللغة الأم) • الإنجليزية (مستوى احترافي)",
          status: "متاح لمشاريع جديدة",
        },
        expertise: {
          title: "ما أقدمه",
          items: [
            "مطور ويب متكامل متخصص في React و Next.js وتقنيات الواجهة الخلفية",
            "بناء واجهات مستخدم عالية الأداء وسهلة الصيانة",
            "خبرة في بناء تطبيقات ويب قابلة للتوسع من البداية للنهاية",
            "خلفية قوية في أطر عمل JavaScript/TypeScript الحديثة",
            "خبرة في الواجهة الخلفية مع واجهات برمجية وقواعد بيانات ومنطق الخادم",
            "ملتزم بالتعلم المستمر ومواكبة أحدث التقنيات",
          ],
        },
        skills: "المهارات",
      },
      projects: {
        title: "مشاريعي الخاصة",
        subtitle: "إليك بعض مشاريعي الحديثة التي تعرض مهاراتي وخبراتي",
        showMore: "عرض المزيد",
        showLess: "عرض أقل",
        viewProject: "عرض المشروع",
        viewCode: "الكود",
        live: "عرض مباشر",
        clickToView: "انقر لعرض الصورة كاملة",
      },
      contactCta: {
        title: "هل أنت مستعد لتحويل أفكارك إلى واقع؟",
        subtitle:
          "دعنا نتعاون في مشروعك القادم. أنا متحمس دائماً للعمل على حلول مبتكرة.",
        sendEmail: "إرسال بريد إلكتروني",
        connectLinkedIn: "تواصل عبر لينكد إن",
      },
      footer: {
        copyright: "جميع الحقوق محفوظة لمرهف",
        availableWorldwide: "متاح في جميع أنحاء العالم",
        github: "جيت هاب",
        linkedin: "لينكد إن",
        twitter: "تويتر",
        instagram: "إنستقرام",
        email: "البريد الإلكتروني",
        copyEmail: "تم نسخ البريد الإلكتروني!",
        copyEmailError: "فشل في نسخ البريد الإلكتروني",
      },
      contact: {
        title: "دعنا نبدع",
        subtitle: "شيئاً معاً",
        description:
          "هل لديك مشروع في ذهنك؟ دعنا نناقش كيف يمكننا العمل معاً لتحويل أفكارك إلى واقع.",
        form: {
          name: "الاسم",
          email: "البريد الإلكتروني",
          phone: "الهاتف",
          location: "الموقع",
          locationValue: "الرياض، المملكة العربية السعودية",
          subject: "الموضوع",
          message: "رسالتك",
          send: "إرسال الرسالة",
          sending: "جاري الإرسال...",
          errors: {
            name: "الرجاء إدخال اسمك",
            email: "الرجاء إدخال بريدك الإلكتروني",
            emailInvalid: "الرجاء إدخال بريد إلكتروني صحيح",
            subject: "الرجاء إدخال الموضوع",
            message: "الرجاء إدخال رسالتك",
          },
        },
      },
    },
  },
} as const;
