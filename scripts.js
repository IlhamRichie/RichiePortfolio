document.addEventListener('DOMContentLoaded', () => {

  /**
   * ------------------------------------------------------------------
   * 1. Navigasi Mobile (Hamburger Menu)
   * ------------------------------------------------------------------
   */
  function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    navLinks.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }

  /**
   * ------------------------------------------------------------------
   * 2. Smooth Scrolling untuk Anchor Links
   * ------------------------------------------------------------------
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80; // Header offset
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /**
   * ------------------------------------------------------------------
   * 3. Animasi Saat Elemen Terlihat (Skills & Counters)
   * ------------------------------------------------------------------
   */
  function initAnimationsOnScroll() {
    const animatedElements = document.querySelectorAll('.skill, .number');
    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;

          // Animate skill bars
          if (el.classList.contains('skill')) {
            const percent = el.dataset.percent;
            const progressBar = el.querySelector('.skill-progress');
            if (progressBar) progressBar.style.width = percent + '%';
          }

          // Animate number counters
          if (el.classList.contains('number')) {
            animateCounter(el);
          }

          observer.unobserve(el); // Hentikan observasi setelah animasi
        }
      });
    }, {
      threshold: 0.1
    }); // Memicu saat 10% elemen terlihat

    animatedElements.forEach(el => observer.observe(el));
  }

  function animateCounter(element) {
    const target = +element.dataset.count;
    if (isNaN(target)) return;
    element.innerText = '0';
    const duration = 1500;
    const stepTime = Math.max(1, Math.floor(duration / target));

    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      element.innerText = current;
      if (current >= target) {
        element.innerText = target; // Pastikan angka akhir tepat
        clearInterval(timer);
      }
    }, stepTime);
  }

  /**
   * ------------------------------------------------------------------
   * 4. Efek Kursor Kustom
   * ------------------------------------------------------------------
   */
  function initCursor() {
    const cursor = document.querySelector('.cursor');
    if (!cursor) return;

    document.addEventListener('mousemove', (e) => {
      cursor.style.transform = `translate(${e.pageX}px, ${e.pageY}px)`;
    });

    const hoverTargets = document.querySelectorAll('a, button, .project-card');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
  }

  /**
   * ------------------------------------------------------------------
   * 5. Efek Header Saat Scroll
   * ------------------------------------------------------------------
   */
  function initHeaderEffect() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  /**
   * ------------------------------------------------------------------
   * 6. Interaksi Latar Belakang Blob
   * ------------------------------------------------------------------
   */
  function initBlobInteraction() {
    const blobs = document.querySelectorAll('.blob');
    if (blobs.length === 0) return;

    document.addEventListener('mousemove', (e) => {
      const {
        clientX,
        clientY
      } = e;
      const x = clientX / window.innerWidth;
      const y = clientY / window.innerHeight;

      blobs.forEach((blob, index) => {
        const speed = 0.02 * (index + 1);
        blob.style.transform = `translate(${x * 50 * speed}px, ${y * 50 * speed}px)`;
      });
    });
  }
  
  /**
   * ------------------------------------------------------------------
   * 7. Modal Detail Proyek
   * ------------------------------------------------------------------
   */
  function initProjectModal() {
    const scroller = document.querySelector('.projects-grid-scroller');
    const modal = document.getElementById('project-modal');
    if (!scroller || !modal) return;

    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalTags = document.getElementById('modal-tags');
    const modalDescription = document.getElementById('modal-description');
    const modalRepoLink = document.getElementById('modal-repo-link');
    const closeModalBtn = document.querySelector('.modal-close-btn');

    scroller.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      if (card) {
        modalImg.src = card.dataset.imgSrc;
        modalTitle.textContent = card.dataset.title;
        modalDescription.textContent = card.dataset.description;
        modalRepoLink.href = card.dataset.linkRepo;

        modalTags.innerHTML = '';
        if (card.dataset.tags) {
            card.dataset.tags.split(',').forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.textContent = tag.trim();
            modalTags.appendChild(tagElement);
          });
        }
        
        modal.classList.add('active');
      }
    });

    function closeModal() {
      modal.classList.remove('active');
    }

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === "Escape" && modal.classList.contains('active')) closeModal();
    });
  }


  /**
   * ------------------------------------------------------------------
   * FUNGSI INISIALISASI UTAMA
   * Semua fungsionalitas diaktifkan dari sini.
   * ------------------------------------------------------------------
   */
  function init() {
    initMobileNav();
    initSmoothScroll();
    initAnimationsOnScroll();
    initCursor();
    initHeaderEffect();
    initBlobInteraction();
    initProjectModal();
  }

  // Menjalankan semua skrip
  init();

});