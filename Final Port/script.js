document.addEventListener("DOMContentLoaded", () => {
  /* ── Custom Cursor ── */
  const cursor = document.getElementById("cursor");
  const follower = document.getElementById("cursorFollower");

  if (cursor && follower && window.matchMedia("(hover: hover)").matches) {
    let mx = 0,
      my = 0,
      fx = 0,
      fy = 0;

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

  /* ── Theme Toggle ── */
  const themeBtn = document.querySelector(".theme-toggle");
  const body = document.body;

  const setTheme = (theme) => {
    body.classList.toggle("dark-theme", theme === "dark");
    try {
      localStorage.setItem("mg-theme", theme);
    } catch (e) {}
  };

  let savedTheme = "light";
  try {
    savedTheme = localStorage.getItem("mg-theme") || "light";
  } catch (e) {}
  setTheme(savedTheme);

  themeBtn?.addEventListener("click", () => {
    const isDark = body.classList.contains("dark-theme");
    setTheme(isDark ? "light" : "dark");
  });

  /* ── Language Toggle ── */
  const langBtn = document.querySelector(".lang-toggle");
  let isAr = false;

  const translations = {
    en: {
      title: "Rawda Gabal | Front-End React Developer",
      dir: "ltr",
      langLabel: "AR",
    },
    ar: {
      title: "روضه جبل | مطورة واجهات أمامية React",
      dir: "rtl",
      langLabel: "EN",
    },
  };

  langBtn?.addEventListener("click", () => {
    isAr = !isAr;
    const lang = isAr ? "ar" : "en";
    const t = translations[lang];
    document.title = t.title;
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
    langBtn.textContent = t.langLabel;

    // Translate key elements
    applyTranslations(isAr);
  });

  function applyTranslations(isAr) {
    const map = {
      ".nav-link": isAr
        ? [
            "الرئيسية",
            "من أنا",
            "التعليم",
            "المهارات",
            "الخبرة",
            "الخدمات",
            "المشاريع",
            "آراء وشهادات",
          ]
        : [
            "Home",
            "About",
            "Education",
            "Skills",
            "Experience",
            "Services",
            "Projects",
            "Testimonials",
          ],
      ".btn-header": isAr ? ["تواصل معي"] : ["Let's Talk"],
    };

    Object.entries(map).forEach(([sel, vals]) => {
      document.querySelectorAll(sel).forEach((el, i) => {
        if (vals[i] !== undefined) el.textContent = vals[i];
      });
    });

    // Apply data attributes
    document.querySelectorAll("[data-en][data-ar]").forEach((el) => {
      el.textContent = isAr ? el.dataset.ar : el.dataset.en;
    });
  }

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

  /* ── Skills tabs ── */
  const tabs = document.querySelectorAll(".stab");
  const panels = document.querySelectorAll(".spanel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;

      tabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      panels.forEach((p) => p.classList.remove("active"));

      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      const panel = document.getElementById(`spanel-${target}`);
      panel?.classList.add("active");
    });
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
});

document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", () => {
    const accordionItem = header.closest(".accordion-item");

    document.querySelectorAll(".accordion-item").forEach((item) => {
      if (item !== accordionItem && item.classList.contains("active")) {
        item.classList.remove("active");
      }
    });

    accordionItem.classList.toggle("active");
  });
});
