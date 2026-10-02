/**
 * HastKala — Warm Heritage Design System (Phase 3 Upgraded & Hardened)
 * GSAP Animations & ScrollTriggers (B1 - B10)
 */
document.addEventListener('DOMContentLoaded', function () {
  if (typeof gsap === 'undefined') return;

  // Phase 3 Animation Change 5: Respect user preference for reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Phase 3 Animation Change 1: Navbar entrance on initial root load only
  const navbar = document.querySelector('.navbar-wh');
  if (navbar && !sessionStorage.getItem('hk_nav_animated')) {
    gsap.from(navbar, {
      y: -50,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      clearProps: 'all'
    });
    sessionStorage.setItem('hk_nav_animated', 'true');
  }

  // Phase 3 Animation Change 2: Responsive MatchMedia parallax only on desktop (>=768px)
  const mm = gsap.matchMedia();
  mm.add('(min-width: 768px)', () => {
    // B2. Hero parallax: subtle and smooth
    const homeHero = document.querySelector('.hero-wh');
    if (homeHero && typeof ScrollTrigger !== 'undefined') {
      gsap.to('.hero-wh', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-wh',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5
        }
      });
    }

    // B3. Page-hero parallax on subpages
    const pageHeroes = document.querySelectorAll('.page-hero-wh, .contact-hero, .about-hero, .artisan-hero, .ngo-hero, .product-hero');
    if (pageHeroes.length > 0 && typeof ScrollTrigger !== 'undefined') {
      pageHeroes.forEach(hero => {
        gsap.to(hero, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5
          }
        });
      });
    }
  });

  // B4. Section headers fade up smoothly (Targeting only parent headers to prevent nested opacity stacking)
  if (typeof ScrollTrigger !== 'undefined') {
    const sectionHeaders = document.querySelectorAll('.section-header, .contact-h2, .contact-h3, .feedback-h2, .auth-h2, .serve-title, .section-head-wh');
    sectionHeaders.forEach(header => {
      gsap.from(header, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: header,
          start: 'top 95%',
          toggleActions: 'play none none none'
        }
      });
    });
  }

  // B5. Cards stagger: each row of .card-wh animates in with staggered delay on scroll
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.batch('.card-wh', {
      interval: 0.1,
      batchMax: 4,
      onEnter: batch => gsap.from(batch, {
        y: 25,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power2.out',
        clearProps: 'all',
        overwrite: 'auto'
      }),
      start: 'top 95%'
    });
  }

  // B6. Trust bar: slides in smoothly on scroll or immediate if in view
  const trustBar = document.querySelector('.trust-bar-wh, .trust-bar');
  if (trustBar && typeof ScrollTrigger !== 'undefined') {
    gsap.from(trustBar, {
      opacity: 0,
      y: 15,
      duration: 0.6,
      ease: 'power2.out',
      clearProps: 'all',
      scrollTrigger: {
        trigger: trustBar,
        start: 'top 98%',
        toggleActions: 'play none none none'
      }
    });
  }

  // Phase 3 Animation Change 3: Step circles with dignified power2.out entrance
  const stepCircles = document.querySelectorAll('.step-number-circle, .step-circle');
  if (stepCircles.length > 0 && typeof ScrollTrigger !== 'undefined') {
    const parentSection = stepCircles[0].closest('section') || stepCircles[0];
    gsap.from(stepCircles, {
      scale: 0.85,
      opacity: 0,
      stagger: 0.12,
      duration: 0.5,
      ease: 'power2.out',
      clearProps: 'all',
      scrollTrigger: {
        trigger: parentSection,
        start: 'top 90%'
      }
    });
  }

  // B8. CTA banners: subtle reveal on scroll
  if (typeof ScrollTrigger !== 'undefined') {
    const ctaBanners = document.querySelectorAll('.cta-banner-wh');
    ctaBanners.forEach(banner => {
      gsap.from(banner, {
        scale: 0.96,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: banner,
          start: 'top 90%'
        }
      });
    });
  }

  // B9. Filter bars: slide down smoothly on page load
  const filterBars = document.querySelectorAll('.filter-bar-wh');
  if (filterBars.length > 0) {
    gsap.from(filterBars, {
      y: -15,
      opacity: 0,
      duration: 0.45,
      delay: 0.1,
      ease: 'power2.out',
      clearProps: 'all'
    });
  }

  // Phase 3 Animation Change 4: Modals slide in quickly without cartoon bounce
  document.addEventListener('show.bs.modal', function (event) {
    const modalContent = event.target.querySelector('.modal-content') || event.target.querySelector('.modal-dialog');
    if (modalContent) {
      gsap.fromTo(modalContent,
        { y: 20, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out', clearProps: 'all' }
      );
    }
  });

  // Ensure all ScrollTriggers recalculate positions after DOM rendering
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
  }
});
