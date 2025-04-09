document.addEventListener("DOMContentLoaded", function () {
  // State management
  const state = {
    isMobileMenuOpen: false,
    isGalleryModalOpen: false,
    selectedImageIndex: 0,
    images: [
      "https://cdn.builder.io/api/v1/image/assets%2Fab633e6929724bc5a19d855a6a0958a0%2Fc3d36d1e8def48c9b6442a250056c5c1",
      "https://cdn.builder.io/api/v1/image/assets%2Fab633e6929724bc5a19d855a6a0958a0%2F28a71e10ace746e69dd493d553e86105",
      "https://cdn.builder.io/api/v1/image/assets%2Fab633e6929724bc5a19d855a6a0958a0%2Fddba1207d9df43b39b931ad966982588",
      "https://cdn.builder.io/api/v1/image/assets%2Fab633e6929724bc5a19d855a6a0958a0%2Fcea66f1516f74e33bf92c6345b346149",
      "https://cdn.builder.io/api/v1/image/assets%2Fab633e6929724bc5a19d855a6a0958a0%2F84cccf9911e64dd4b064cf4183d9bf00",
      "https://cdn.builder.io/api/v1/image/assets%2Fab633e6929724bc5a19d855a6a0958a0%2F526d739ef4c64fd29f2b2c8d4928cdff",
      "https://cdn.builder.io/api/v1/image/assets%2Fab633e6929724bc5a19d855a6a0958a0%2F5cfb619912c2491cabe31ee463b4e924",
      "https://cdn.builder.io/api/v1/image/assets%2Fab633e6929724bc5a19d855a6a0958a0%2Ffb8cc51bbd6e435f9b651bed3a55e7ef",
      "https://cdn.builder.io/api/v1/image/assets%2Fab633e6929724bc5a19d855a6a0958a0%2F3042f9d45d884f7f87e3b7c6e81b48b9",
      "https://cdn.builder.io/api/v1/image/assets%2Fab633e6929724bc5a19d855a6a0958a0%2F0e823f7107af4c3690365746b7e30bfe",
      "https://cdn.builder.io/api/v1/image/assets%2Fab633e6929724bc5a19d855a6a0958a0%2Fceb562ae507744e68a108c4da864454e",
      "https://cdn.builder.io/api/v1/image/assets%2Fab633e6929724bc5a19d855a6a0958a0%2Fa56ee58e287848b9adfe37ed83d2a60f",
      "https://cdn.builder.io/api/v1/image/assets%2Fab633e6929724bc5a19d855a6a0958a0%2F3878f4fa1d654eb18e2047fc577b8b63",
      "https://cdn.builder.io/api/v1/image/assets%2Fab633e6929724bc5a19d855a6a0958a0%2Fb0ea8944dd034834856ea96579e67d4d",
      "https://cdn.builder.io/api/v1/image/assets%2Fab633e6929724bc5a19d855a6a0958a0%2F02c0a811808d4068a3b6b21e917232f2",
    ],
  };

  // DOM Elements
  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
  const navLinks = document.querySelectorAll(".nav-link");
  const ctaButton = document.querySelector(".cta-button");
  const galleryModal = document.getElementById("gallery-modal");
  const galleryImage = document.querySelector(".gallery-image");
  const galleryPrev = document.querySelector(".gallery-prev");
  const galleryNext = document.querySelector(".gallery-next");
  const contactForm = document.querySelector(".contact-form");
  const currentYearElement = document.getElementById("current-year");

  // Set current year in footer
  currentYearElement.textContent = new Date().getFullYear();

  // Mobile menu toggle
  function toggleMobileMenu() {
    state.isMobileMenuOpen = !state.isMobileMenuOpen;

    mobileMenuButton.classList.toggle("open", state.isMobileMenuOpen);
    mobileMenu.classList.toggle("active", state.isMobileMenuOpen);
    mobileMenuOverlay.classList.toggle("active", state.isMobileMenuOpen);

    // Prevent body scroll when menu is open
    document.body.style.overflow = state.isMobileMenuOpen ? "hidden" : "";

    // Update ARIA attributes
    mobileMenuButton.setAttribute("aria-expanded", state.isMobileMenuOpen);
    mobileMenu.setAttribute("aria-hidden", !state.isMobileMenuOpen);
  }

  // Gallery modal functions
  function openGalleryModal(index) {
    state.selectedImageIndex = index;
    state.isGalleryModalOpen = true;

    galleryImage.src = state.images[state.selectedImageIndex];
    galleryModal.classList.add("active");
    galleryModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    // Set focus on the modal for keyboard navigation
    galleryModal.focus();
  }

  function closeGalleryModal() {
    state.isGalleryModalOpen = false;

    galleryModal.classList.remove("active");
    galleryModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
  }

  function nextImage() {
    state.selectedImageIndex =
      (state.selectedImageIndex + 1) % state.images.length;
    galleryImage.src = state.images[state.selectedImageIndex];
  }

  function prevImage() {
    state.selectedImageIndex =
      (state.selectedImageIndex - 1 + state.images.length) %
      state.images.length;
    galleryImage.src = state.images[state.selectedImageIndex];
  }

  // Smooth scroll function
  function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }

  // Form submission
  function handleFormSubmit(event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const formValues = Object.fromEntries(formData.entries());

    // Basic validation
    if (!formValues.name || !formValues.email || !formValues.location) {
      alert("Kérjük, töltse ki a kötelező mezőket!");
      return;
    }

    // Here you would typically send this to your email service
    console.log("Form submitted:", formValues);
    alert("Köszönjük üzenetét! Hamarosan felvesszük Önnel a kapcsolatot.");

    // Reset form
    contactForm.reset();
  }

  // Event Listeners
  mobileMenuButton.addEventListener("click", toggleMobileMenu);
  mobileMenuOverlay.addEventListener("click", toggleMobileMenu);

  // Close mobile menu when clicking a link
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const sectionId = this.getAttribute("href").substring(1);
      toggleMobileMenu();
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 300);
    });
  });

  // Smooth scroll for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const sectionId = this.getAttribute("href").substring(1);
      scrollToSection(sectionId);
    });
  });

  // CTA button scroll to contact
  if (ctaButton) {
    ctaButton.addEventListener("click", function () {
      scrollToSection("contact");
    });
  }

  // Gallery modal controls
  galleryPrev.addEventListener("click", prevImage);
  galleryNext.addEventListener("click", nextImage);
  galleryModal.addEventListener("click", function (e) {
    if (e.target === galleryModal) {
      closeGalleryModal();
    }
  });

  // Keyboard navigation for gallery
  document.addEventListener("keydown", function (e) {
    if (!state.isGalleryModalOpen) return;

    switch (e.key) {
      case "ArrowRight":
        nextImage();
        break;
      case "ArrowLeft":
        prevImage();
        break;
      case "Escape":
        closeGalleryModal();
        break;
    }
  });

  // Form submission
  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);
  }

  // Header scroll effect
  let lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".main-header");
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    lastScrollTop = scrollTop;
  });

  // Accessibility improvements - make sure all interactive elements are focusable
  const focusableElements = document.querySelectorAll(
    'button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])',
  );
  focusableElements.forEach((el) => {
    if (!el.getAttribute("tabindex")) {
      el.setAttribute("tabindex", "0");
    }
  });
});
