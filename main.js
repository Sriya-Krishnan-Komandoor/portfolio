/**
 * Template Name: Craftivo
 * Updated & cleaned for project use
 */

(function () {
  "use strict";

  /* ==================================================
     SCROLL STATE
  ================================================== */
  const body = document.body;
  const header = document.getElementById("header");

  function toggleScrolled() {
    if (!header) return;
    if (
      !header.classList.contains("scroll-up-sticky") &&
      !header.classList.contains("sticky-top") &&
      !header.classList.contains("fixed-top")
    ) return;

    body.classList.toggle("scrolled", window.scrollY > 100);
  }

  window.addEventListener("load", toggleScrolled);
  document.addEventListener("scroll", toggleScrolled);

  /* ==================================================
     MOBILE NAV
  ================================================== */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToggle() {
    body.classList.toggle("mobile-nav-active");
    mobileNavToggleBtn?.classList.toggle("bi-list");
    mobileNavToggleBtn?.classList.toggle("bi-x");
  }

  mobileNavToggleBtn?.addEventListener("click", mobileNavToggle);

  document.querySelectorAll("#navmenu a").forEach(link => {
    link.addEventListener("click", () => {
      if (body.classList.contains("mobile-nav-active")) {
        mobileNavToggle();
      }
    });
  });

  document.querySelectorAll(".navmenu .toggle-dropdown").forEach(toggle => {
    toggle.addEventListener("click", e => {
      e.preventDefault();
      toggle.parentElement.classList.toggle("active");
      toggle.parentElement.nextElementSibling?.classList.toggle("dropdown-active");
    });
  });

  /* ==================================================
     PRELOADER
  ================================================== */
  const preloader = document.getElementById("preloader");
  if (preloader) {
    window.addEventListener("load", () => preloader.remove());
  }

  /* ==================================================
     SCROLL TO TOP
  ================================================== */
  const scrollTopBtn = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    scrollTopBtn?.classList.toggle("active", window.scrollY > 100);
  }

  scrollTopBtn?.addEventListener("click", e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /* ==================================================
     AOS
  ================================================== */
  function aosInit() {
    if (typeof AOS === "undefined") return;
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }
  window.addEventListener("load", aosInit);

  /* ==================================================
     TYPED.JS
  ================================================== */
  const typedEl = document.querySelector(".typed");
  if (typedEl && typeof Typed !== "undefined") {
    const items = typedEl
      .getAttribute("data-typed-items")
      ?.split(",")
      .map(i => i.trim());

    if (items?.length) {
      new Typed(".typed", {
        strings: items,
        loop: false,
        typeSpeed: 80,
        backSpeed: 0,
        backDelay: 2000,
        showCursor: true
      });
    }
  }

  /* ==================================================
     SKILLS ANIMATION
  ================================================== */
  const skillsSection = document.querySelector('.skills-animation');
  if (skillsSection) {
    const bars = skillsSection.querySelectorAll('.progress-bar');
    window.addEventListener('scroll', () => {
      const rect = skillsSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        const visible = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top);
        const total = rect.height;
        const progress = Math.min(visible / total, 1); // Cap at 1
        bars.forEach(bar => {
          const target = parseInt(bar.getAttribute('aria-valuenow'));
          bar.style.width = (progress * target) + '%';
        });
      }
    });
  }

  /* ==================================================
     GLIGHTBOX
  ================================================== */
  if (typeof GLightbox !== "undefined") {
    GLightbox({ selector: ".glightbox" });
  }

  /* ==================================================
     ISOTOPE
  ================================================== */
  if (typeof Isotope !== "undefined" && typeof imagesLoaded !== "undefined") {
    document.querySelectorAll(".isotope-layout").forEach(layoutEl => {
      const container = layoutEl.querySelector(".isotope-container");
      if (!container) return;

      let layout = layoutEl.dataset.layout || "masonry";
      let filter = layoutEl.dataset.defaultFilter || "*";
      let sort = layoutEl.dataset.sort || "original-order";

      let iso;
      imagesLoaded(container, () => {
        iso = new Isotope(container, {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter,
          sortBy: sort
        });
      });

      layoutEl.querySelectorAll(".isotope-filters li").forEach(filterBtn => {
        filterBtn.addEventListener("click", () => {
          layoutEl
            .querySelector(".filter-active")
            ?.classList.remove("filter-active");
          filterBtn.classList.add("filter-active");
          iso?.arrange({ filter: filterBtn.dataset.filter });
          aosInit();
        });
      });
    });
  }

  /* ==================================================
     SWIPER
  ================================================== */
  function initSwiper() {
    if (typeof Swiper === "undefined") return;

    document.querySelectorAll(".init-swiper").forEach(el => {
      const configEl = el.querySelector(".swiper-config");
      if (!configEl) return;

      const config = JSON.parse(configEl.textContent.trim());
      new Swiper(el, config);
    });
  }
  window.addEventListener("load", initSwiper);

  /* ==================================================
     HASH SCROLL FIX - DISABLED
  ================================================== */
  /*
  window.addEventListener("load", () => {
    if (!window.location.hash) return;
    const target = document.querySelector(window.location.hash);
    if (!target) return;

    setTimeout(() => {
      const offset = parseInt(getComputedStyle(target).scrollMarginTop || 0);
      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: "smooth"
      });
    }, 100);
  });
  */

  /* ==================================================
     NAV SCROLLSPY
  ================================================== */
  const navLinks = document.querySelectorAll(".navmenu a");

  function navScrollSpy() {
    const pos = window.scrollY + 200;

    navLinks.forEach(link => {
      if (!link.hash) return;
      const section = document.querySelector(link.hash);
      if (!section) return;

      const active =
        pos >= section.offsetTop &&
        pos <= section.offsetTop + section.offsetHeight;

      link.classList.toggle("active", active);
    });
  }

  window.addEventListener("load", navScrollSpy);
  document.addEventListener("scroll", navScrollSpy);

})();
