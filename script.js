document.addEventListener("DOMContentLoaded", () => {
  /* ── Custom Cursor ── */
  const cursor = document.getElementById("cursor");
  const follower = document.getElementById("cursorFollower");

  if (cursor && follower && window.matchMedia("(hover: hover)").matches) {
    let mx = 0;
    let my = 0;
    let fx = 0;
    let fy = 0;

    document.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });

    const animateFollower = () => {
      fx += (mx - fx) * 0.12;
      fy += (my - fy) * 0.12;
      follower.style.transform = `translate(${fx}px, ${fy}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateFollower);
    };
    animateFollower();

    document
      .querySelectorAll("a, button, .svc-card, .proj-card, .testi-card")
      .forEach((el) => {
        el.addEventListener("mouseenter", () => {
          cursor.style.transform += " scale(2.5)";
          follower.style.opacity = ".15";
          follower.style.transform += " scale(1.8)";
        });
        el.addEventListener("mouseleave", () => {
          follower.style.opacity = ".5";
        });
      });
  }

  const body = document.body;
  const themeBtn = document.querySelector(".theme-toggle");
  const langBtn = document.querySelector(".lang-toggle");

  const setTheme = (theme) => {
    body.classList.toggle("dark-theme", theme === "dark");
    try {
      localStorage.setItem("rg-theme", theme);
    } catch (e) {}
  };

  const getStoredTheme = () => {
    try {
      return localStorage.getItem("rg-theme") || "dark";
    } catch (e) {
      return "dark";
    }
  };

  themeBtn?.addEventListener("click", () => {
    const isDark = body.classList.contains("dark-theme");
    setTheme(isDark ? "light" : "dark");
  });

  const TEXT_TRANSLATIONS = {
    Home: "الرئيسية",
    About: "من أنا",
    Education: "التعليم",
    Skills: "المهارات",
    Experience: "الخبرة",
    Services: "الخدمات",
    Projects: "المشاريع",
    Testimonials: "آراء وشهادات",
    "Let's Talk": "تواصل معي",
    "Hello World!": "مرحباً بالعالم!",
    "Rawda Gabal": "روضه جبل",
    "I build secure, high-performance systems that solve real business problems":
      "أبني أنظمة آمنة وعالية الأداء تحل مشكلات أعمال حقيقية",
    "View My Work": "شاهد أعمالي",
    "Download CV": "تحميل السيرة الذاتية",
    Scroll: "مرر للأسفل",
    "About Me": "نبذة عني",
    Crafting: "أصنع",
    Experiences: "تجارب",
    Digital: "رقمية",
    "Hi, I'm Rawda Gabal, a Frontend Developer specializing in React.js. I started my journey with the Digitalians scholarship, where I deeply studied the field and built many real-world style projects.":
      "أنا روضة جبل، مطورة واجهات أمامية متخصصة في React.js. بدأت رحلتي مع منحة Digitalians حيث درست المجال بعمق وأنجزت مشاريع عملية تحاكي الواقع.",
    "I have a strong project portfolio of": "أمتلك معرض مشاريع قوي يضم",
    "5 complete projects.": "5 مشاريع مكتملة.",
    "These include a virtual e-commerce store with cart and filtering, a real-time weather app using external APIs, an interactive admin dashboard, a personal blog, and a task manager.":
      "تشمل هذه المشاريع متجراً إلكترونياً افتراضياً بسلة وفلاتر، وتطبيق طقس لحظي باستخدام واجهات خارجية، ولوحة تحكم تفاعلية، ومدونة شخصية، وتطبيق إدارة مهام.",
    "I improved my project load time by": "حسّنت زمن تحميل مشاريعي بنسبة",
    "25% to 40%": "25% إلى 40%",
    "using performance optimization techniques. I'm a fast learner, committed to clean code, and able to turn ideas into working applications.":
      "باستخدام تقنيات تحسين الأداء. أنا سريعة التعلّم، ملتزمة بالكود النظيف، وقادرة على تحويل الأفكار إلى تطبيقات عملية.",
    "I'm open to collaboration, freelance opportunities, or mentorship — feel free to reach out.":
      "أنا منفتحة على التعاون وفرص العمل الحر أو الإرشاد المهني — لا تتردد في التواصل.",
    Background: "الخلفية",
    "Education & Certifications": "التعليم والشهادات",
    "Bachelor's Degree in Computer Engineering": "بكالوريوس هندسة الحاسبات",
    "Faculty of Engineering Al-azhar University": "كلية الهندسة - جامعة الأزهر",
    "Graduation Project: E-proctor System . Grade :":
      "مشروع التخرج: نظام المراقبة الإلكترونية . التقدير :",
    Education: "التعليم",
    Certifications: "الشهادات",
    "React Frontend Web Developer": "مطور واجهات React",
    "Built responsive interfaces with React, TypeScript, components, routing, forms, and API integration.":
      "بناء واجهات متجاوبة باستخدام React وTypeScript والمكوّنات والتنقّل والنماذج وتكامل واجهات API.",
    "View Certification": "عرض الشهادة",
    Expertise: "الخبرات",
    "A practical overview of my front-end toolkit, workflow, and strengths.":
      "نظرة عملية على أدواتي في الواجهة الأمامية ومنهجية العمل ونقاط القوة.",
    "Frontend Development": "تطوير الواجهة الأمامية",
    "I build responsive, user-focused, and well-structured interfaces using clean code, scalable styling, and maintainable front-end architecture.":
      "أبني واجهات متجاوبة ومتمحورة حول المستخدم ومنظمة جيداً باستخدام كود نظيف وأنماط قابلة للتوسّع وهيكلية سهلة الصيانة.",
    "UI & Styling": "واجهات المستخدم والتصميم",
    "Transforming design concepts into polished, accessible, and visually balanced interfaces across all screen sizes.":
      "تحويل المفاهيم التصميمية إلى واجهات مصقولة، سهلة الوصول، ومتوازنة بصرياً عبر جميع أحجام الشاشات.",
    "Development Tools": "أدوات التطوير",
    "Managing version control, testing APIs, and deploying full-stack applications with modern development workflows.":
      "إدارة التحكم بالإصدارات، واختبار واجهات API، ونشر تطبيقات Full-Stack باستخدام مسارات تطوير حديثة.",
    "Soft Skills": "المهارات الشخصية",
    "Strong ability to collaborate in teams, communicate technical ideas clearly, developed through experience as a Team Leader in the Digilians scholarship.":
      "قدرة قوية على التعاون ضمن الفرق وشرح الأفكار التقنية بوضوح، طُوّرت من خلال تجربة قيادة فريق في منحة Digilians.",
    "Currently Learning": "أتعلم حالياً",
    "Expanding front-end background with backend concepts, APIs, and full product flow.":
      "أطوّر خلفيتي في الواجهات الأمامية بمفاهيم الخلفية وواجهات API وتدفق المنتج الكامل.",
    "Mastering full-stack development using the MERN ecosystem within an intensive 590-hour program, while building secure, scalable applications and collaborating effectively in a team environment.":
      "إتقان تطوير تطبيقات الويب المتكاملة باستخدام بيئة MERN ضمن برنامج مكثف مدته 590 ساعة، مع بناء تطبيقات آمنة وقابلة للتوسع والتعاون بفعالية ضمن فريق عمل.",
    Career: "المسار المهني",
    "Work Experience": "الخبرة العملية",
    "Professional React Developer Intern": "متدربة مطور React محترف",
    Challenge: "التحدي",
    Action: "الإجراء",
    Result: "النتيجة",
    "What I Do": "ما الذي أقدمه",
    Services: "خدماتي",
    "Front-End Development": "تطوير الواجهة الأمامية",
    "I build modern and responsive websites using HTML, CSS, JavaScript, and Bootstrap. My focus is on creating clean, maintainable code and delivering smooth user experiences across all devices.":
      "أبني مواقع حديثة ومتجاوبة باستخدام HTML وCSS وJavaScript وBootstrap. أركز على كتابة كود نظيف قابل للصيانة وتقديم تجربة مستخدم سلسة عبر جميع الأجهزة.",
    "UI/UX Implementation": "تنفيذ UI/UX",
    "I convert design files such as Figma or Adobe XD into responsive and pixel-perfect web interfaces while ensuring usability, performance, and accurate design implementation.":
      "أحوّل ملفات التصميم مثل Figma أو Adobe XD إلى واجهات ويب متجاوبة ودقيقة جداً مع ضمان سهولة الاستخدام والأداء وتنفيذ التصميم بشكل صحيح.",
    "Website Fixes & Improvements": "إصلاحات وتحسينات المواقع",
    "I fix layout issues, bugs, and design problems in existing websites to improve both functionality and user experience.":
      "أصلح مشاكل التخطيط والأخطاء والمشاكل التصميمية في المواقع الحالية لتحسين الوظائف وتجربة المستخدم.",
    "API Integration": "تكامل API",
    "I integrate front-end applications with REST APIs to fetch and display dynamic data in a clean and interactive way.":
      "أدمج تطبيقات الواجهة الأمامية مع REST APIs لجلب وعرض البيانات الديناميكية بشكل نظيف وتفاعلي.",
    "Performance Optimization": "تحسين الأداء",
    "I improve website performance by optimizing code and assets to achieve faster loading times and smoother interactions for users.":
      "أحسن أداء المواقع عبر تحسين الكود والأصول لتحقيق تحميل أسرع وتفاعلات أكثر سلاسة للمستخدمين.",
    "See Pricing Plans": "عرض خطط الأسعار",
    "Transparent, scoped pricing from landing pages to full React experiences.":
      "أسعار واضحة ومحددة النطاق من صفحات الهبوط إلى تجارب React الكاملة.",
    "View Pricing": "عرض الأسعار",
    Portfolio: "معرض الأعمال",
    Projects: "مشاريع مختارة",
    "News Platform": "منصة الأخبار",
    BabyCare: "بيبي كير",
    Code: "الكود",
    "Live Demo": "عرض مباشر",
    Milestones: "المحطات",
    Achievements: "الإنجازات",
    "Coming Soon...........": "قريباً...........",
    "Social Proof": "آراء العملاء",
    "What Others": "ماذا يقول",
    Say: "الآخرون",

    "Reliable Developer": "مطورة موثوقة",
    "Clean Coder": "مطور كود نظيف",
    Client: "عميل",
    "Get In Touch": "تواصل معي",
    "Connect Me": "لنتواصل",
    "Have a project in mind or want to discuss the latest in tech? Feel free to reach out.":
      "هل لديك مشروع في ذهنك أو ترغب في مناقشة أحدث ما في التقنية؟ يسعدني تواصلك.",
    WhatsApp: "واتساب",
    "Your Name": "الاسم",
    "Email Address": "البريد الإلكتروني",
    "Your Message": "رسالتك",
    "Send Message": "إرسال الرسالة",
    "Message Sent!": "تم إرسال الرسالة!",
    "Thank you for reaching out. I'll get back to you soon.":
      "شكراً لتواصلك. سأعود إليك قريباً.",
    Done: "تم",
    "WHAT MAKES ME DIFFERENT?": "ما الذي يميزني؟",
    "Frontend developer by title, creative problem-solver by nature. I love turning complex ideas into simple, beautiful interfaces that people enjoy using.":
      "مطورة واجهات أمامية باللقب، وحلّالة مشكلات إبداعية بالطبع. أحب تحويل الأفكار المعقدة إلى واجهات بسيطة وجميلة يستمتع الناس باستخدامها.",
    "I'm not just another developer. I care about your success as much as you do. Every line of code I write is focused on solving real problems, not just looking pretty.":
      "أنا لست مجرد مطورة أخرى. أهتم بنجاحك بقدر اهتمامك أنت. كل سطر كود أكتبه يركز على حل مشكلات حقيقية وليس المظهر فقط.",
    "All rights reserved.": "جميع الحقوق محفوظة.",
    Connect: "تواصل",
    "Education &": "التعليم و",
    "Work ": "الخبرة ",
    "My ": "خدماتي ",
    "Selected ": "مشاريع ",
    "What Others ": "ماذا يقول ",
    "Let's ": "لـ",
    " Digital ": " تجارب ",
    "01/2026 - Present": "01/2026 - الآن",
    "Cairo, Egypt": "القاهرة، مصر",
    "Mobile Software Engineer": "مهندسة برمجيات موبايل",
    "Rawda Ashraf.": "روضة أشرف.",
  };

  const ATTR_TRANSLATIONS = {
    "input[name='name']": {
      en: "Rawda Gabal",
      ar: "روضة جبل",
    },
    "input[name='email']": {
      en: "hello@example.com",
      ar: "hello@example.com",
    },
    "textarea[name='message']": {
      en: "Tell me about your project...",
      ar: "أخبرني عن مشروعك...",
    },
  };

  const translatableTextNodes = [];
  const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      const tag = parent.tagName.toLowerCase();
      if (tag === "script" || tag === "style") return NodeFilter.FILTER_REJECT;
      if (!node.nodeValue || !node.nodeValue.trim())
        return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  while (walker.nextNode()) {
    const node = walker.currentNode;
    translatableTextNodes.push({
      node,
      original: node.nodeValue,
      normalized: node.nodeValue.trim().replace(/\s+/g, " "),
    });
  }

  const translatableAttrs = [];
  Object.keys(ATTR_TRANSLATIONS).forEach((selector) => {
    const el = document.querySelector(selector);
    if (!el) return;
    translatableAttrs.push({
      el,
      selector,
      originalPlaceholder: el.getAttribute("placeholder") || "",
    });
  });

  const setLanguage = (lang) => {
    const isAr = lang === "ar";
    document.documentElement.lang = isAr ? "ar" : "en";
    document.documentElement.dir = isAr ? "rtl" : "ltr";
    body.classList.toggle("rtl", isAr);
    document.title = isAr
      ? "روضه جبل | مطورة واجهات أمامية"
      : "Rawda Gabal | Front-End Developer";

    if (langBtn) langBtn.textContent = isAr ? "EN" : "AR";

    translatableTextNodes.forEach((item) => {
      if (!isAr) {
        item.node.nodeValue = item.original;
        return;
      }
      const translated = TEXT_TRANSLATIONS[item.normalized];
      if (translated) {
        const leading = item.original.match(/^\s*/)?.[0] || "";
        const trailing = item.original.match(/\s*$/)?.[0] || "";
        item.node.nodeValue = `${leading}${translated}${trailing}`;
      }
    });

    translatableAttrs.forEach((item) => {
      const placeholders = ATTR_TRANSLATIONS[item.selector];
      if (!placeholders) return;
      item.el.setAttribute(
        "placeholder",
        isAr ? placeholders.ar : placeholders.en,
      );
    });

    try {
      localStorage.setItem("rg-lang", lang);
    } catch (e) {}
  };

  const getStoredLanguage = () => {
    try {
      return localStorage.getItem("rg-lang") || "en";
    } catch (e) {
      return "en";
    }
  };

  langBtn?.addEventListener("click", () => {
    const nextLang = document.documentElement.lang === "ar" ? "en" : "ar";
    setLanguage(nextLang);
  });

  setTheme(getStoredTheme());
  setLanguage(getStoredLanguage());

  /* ── Header scroll effect ── */
  const header = document.getElementById("header");

  const handleScroll = () => {
    header?.classList.toggle("scrolled", window.scrollY > 60);

    // Back to top
    const btn = document.getElementById("backToTop");
    btn?.classList.toggle("show", window.scrollY > 400);

    // Active nav link
    const sections = document.querySelectorAll("section[id]");
    let current = "";
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`,
      );
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  /* ── Mobile menu ── */
  const mobileToggle = document.getElementById("mobileToggle");
  const navbar = document.getElementById("navbar");

  mobileToggle?.addEventListener("click", () => {
    navbar?.classList.toggle("open");
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => navbar?.classList.remove("open"));
  });

  /* ── Intersection Observer for reveal animations ── */
  const revealEls = document.querySelectorAll(
    ".reveal-up, .reveal-left, .reveal-right",
  );

  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    revealEls.forEach((el) => obs.observe(el));
  } else {
    // Fallback: show all immediately
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  /* ── Contact form ── */
  const contactForm = document.getElementById("contactForm");
  const successModal = document.getElementById("successModal");
  const modalClose = document.getElementById("modalClose");
  const modalOk = document.getElementById("modalOk");

  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    successModal?.classList.add("open");
    successModal?.removeAttribute("aria-hidden");
    contactForm.reset();
  });

  const closeModal = () => {
    successModal?.classList.remove("open");
    successModal?.setAttribute("aria-hidden", "true");
  };

  modalClose?.addEventListener("click", closeModal);
  modalOk?.addEventListener("click", closeModal);
  successModal?.addEventListener("click", (e) => {
    if (e.target === successModal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const offset = header ? header.offsetHeight + 20 : 80;
        window.scrollTo({
          top: target.offsetTop - offset,
          behavior: "smooth",
        });
      }
    });
  });
  document.querySelectorAll(".accordion-header").forEach((header) => {
    header.addEventListener("click", () => {
      const accordionItem = header.closest(".accordion-item");
      if (!accordionItem) return;

      document.querySelectorAll(".accordion-item").forEach((item) => {
        if (item !== accordionItem && item.classList.contains("active")) {
          item.classList.remove("active");
        }
      });

      accordionItem.classList.toggle("active");
    });
  });
});
