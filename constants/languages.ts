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
        frontEndDev: "Front-End Developer",
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
        role: "Front End Developer & UI/UX Designer",
        description:
          "I'm Morhaf Ghziel, a passionate Front End Developer and UI/UX Designer based in Saudi Arabia. I specialize in creating modern, responsive web applications using cutting-edge technologies. My journey in web development combines technical expertise with creative design thinking to deliver exceptional digital experiences.",
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
            "Front End Developer with expertise in React and Next.js",
            "UI/UX Designer creating intuitive and beautiful user interfaces",
            "Experienced in building scalable web applications",
            "Strong background in modern JavaScript frameworks",
            "Passionate about clean code and best practices",
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
        frontEndDev: "مطور واجهات أمامية",
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
        role: "مطور واجهات أمامية ومصمم تجربة المستخدم",
        description:
          "أنا مرهف غزيل، مطور واجهات أمامية ومصمم تجربة مستخدم متحمس مقيم في المملكة العربية السعودية. أتخصص في إنشاء تطبيقات ويب حديثة ومتجاوبة باستخدام أحدث التقنيات. تجمع رحلتي في تطوير الويب بين الخبرة التقنية والتفكير الإبداعي في التصميم لتقديم تجارب رقمية استثنائية.",
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
            "مطور واجهات أمامية متخصص في React و Next.js",
            "مصمم واجهات مستخدم يبتكر واجهات بديهية وجميلة",
            "خبرة في بناء تطبيقات ويب قابلة للتطوير",
            "خلفية قوية في أطر عمل JavaScript الحديثة",
            "شغوف بالكود النظيف وأفضل الممارسات",
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
