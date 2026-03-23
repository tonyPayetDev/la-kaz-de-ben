/**
 * La Kaz de Ben - Main JavaScript
 * Restaurant Réunionnais à Saint-Gilles-les-Bauts
 */

(function() {
  'use strict';

  // DOM Elements
  const header = document.querySelector('.header');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-link');

  // Header scroll effect
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // Mobile menu toggle
  function toggleMobileMenu() {
    nav.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    
    // Animate hamburger
    const spans = mobileMenuBtn.querySelectorAll('span');
    if (nav.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  }

  // Close mobile menu on link click
  function closeMobileMenu() {
    nav.classList.remove('active');
    document.body.classList.remove('menu-open');
    const spans = mobileMenuBtn.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }

  // Smooth scroll for anchor links
  function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      closeMobileMenu();
    }
  }

  // Intersection Observer for animations
  function initScrollAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements
    const animatedElements = document.querySelectorAll(
      '.section-header, .menu-card, .ambiance-card, .testimonial-card, .about-content, .about-images'
    );
    
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      observer.observe(el);
    });
  }

  // Lazy loading for images
  function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });

      lazyImages.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for browsers without IntersectionObserver
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  }

  // Form validation (if forms exist)
  function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
          } else {
            field.classList.remove('error');
          }
        });

        if (!isValid) {
          e.preventDefault();
        }
      });
    });
  }

  // Parallax effect for hero section
  function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = hero.querySelectorAll('.hero-image-main, .hero-image-accent, .floating-card');
      
      parallaxElements.forEach(el => {
        const speed = el.classList.contains('floating-card') ? 0.3 : 0.1;
        el.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });
  }

  // Initialize
  function init() {
    // Event listeners
    window.addEventListener('scroll', handleScroll);
    
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    navLinks.forEach(link => {
      if (link.getAttribute('href').startsWith('#')) {
        link.addEventListener('click', smoothScroll);
      }
    });

    // Initialize features
    handleScroll();
    initScrollAnimations();
    initLazyLoading();
    initFormValidation();
    initParallax();

    console.log('🍽️ La Kaz de Ben - Site initialisé avec succès!');
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
