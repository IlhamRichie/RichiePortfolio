document.addEventListener('DOMContentLoaded', () => {

    // --- Kumpulan Semua Fungsi ---

    // 1. Efek bayangan pada navbar saat scroll
    function initHeaderScrollEffect() {
        const floatingNav = document.querySelector('.floating-nav');
        if (!floatingNav) return;

        window.addEventListener('scroll', () => {
            const navWrapper = floatingNav.querySelector('.navbar-wrapper');
            if (navWrapper) {
                if (window.scrollY > 30) {
                    navWrapper.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.08)';
                } else {
                    navWrapper.style.boxShadow = 'none';
                }
            }
        });
    }

    // 2. Menandai link navigasi yang aktif saat scroll
    function initActiveNavOnScroll() {
        const navLinks = document.querySelectorAll('.nav-links a');
        const sections = document.querySelectorAll('section[id]');
        if (!navLinks.length || !sections.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { rootMargin: '-40% 0px -60% 0px' });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // 3. Memberi warna ikon teknologi saat hover
    function initIconColorHover() {
        const techIcons = document.querySelectorAll('.tech-icon');
        if (!techIcons.length) return;

        techIcons.forEach(iconContainer => {
            const icon = iconContainer.querySelector('i');
            if (icon) {
                iconContainer.addEventListener('mouseover', () => icon.classList.add('colored'));
                iconContainer.addEventListener('mouseout', () => icon.classList.remove('colored'));
            }
        });
    }

    // 4. Memicu animasi elemen saat scroll
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.skill-card');
        if (!animatedElements.length) return;

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.forEach(el => observer.observe(el));
    }

    // --- Fungsi Inisialisasi Utama ---
    // Fungsi ini akan memanggil semua fungsi lain secara berurutan.
    function init() {
        initHeaderScrollEffect();
        initActiveNavOnScroll();
        initIconColorHover();
        initScrollAnimations();
    }

    // Jalankan semuanya setelah halaman siap
    init();

});