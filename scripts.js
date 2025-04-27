document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate skills bars on scroll
    const skills = document.querySelectorAll('.skill');
    
    function animateSkills() {
        skills.forEach(skill => {
            const percent = skill.getAttribute('data-percent');
            const progressBar = skill.querySelector('.skill-progress');
            
            if (isElementInViewport(skill)) {
                progressBar.style.width = percent + '%';
            }
        });
    }
    
    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Run once on page load
    
    // Project Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Project card hover effect for mobile
    projectCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.classList.add('hover');
        });
        
        document.addEventListener('touchstart', function(e) {
            if (!card.contains(e.target)) {
                card.classList.remove('hover');
            }
        });
    });
});

    // Animate stats counters
    const counters = document.querySelectorAll('.number');
    const speed = 200;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target && isElementInViewport(counter)) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    window.addEventListener('scroll', function() {
        if (isAnyElementInViewport(counters)) {
            animateCounters();
        }
    });
    
    // Check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    function isAnyElementInViewport(elements) {
        for (let el of elements) {
            if (isElementInViewport(el)) {
                return true;
            }
        }
        return false;
    }
    
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
    });
    
    // Cursor hover effects
    document.querySelectorAll('a, button, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(22, 22, 22, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.padding = '10px 0';
        } else {
            header.style.backgroundColor = 'transparent';
            header.style.backdropFilter = 'none';
            header.style.padding = '20px 0';
        }
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple form validation
        const inputs = this.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.style.borderColor = 'red';
                isValid = false;
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (isValid) {
            // Here you would typically send the form data to a server
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
    
    // Blob interaction
    const blobs = document.querySelectorAll('.blob');
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        blobs.forEach((blob, index) => {
            // Each blob moves slightly differently
            const speed = 0.02 * (index + 1);
            blob.style.transform = `translate(${x * 50 * speed}px, ${y * 50 * speed}px)`;
        });
    });
    
    // Initialize animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
});

// Simple AOS (Animate On Scroll) implementation
const AOS = {
    init(options) {
        this.options = options || {};
        this.elements = document.querySelectorAll('[data-aos]');
        this.observer = new IntersectionObserver(this.handleIntersect.bind(this), {
            threshold: 0.1
        });
        
        this.elements.forEach(el => this.observer.observe(el));
    },
    
    handleIntersect(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.animate(entry.target);
                if (this.options.once) {
                    this.observer.unobserve(entry.target);
                }
            }
        });
    },
    
    animate(el) {
        const animation = el.getAttribute('data-aos');
        const duration = this.options.duration || 800;
        const easing = this.options.easing || 'ease';
        
        el.style.transition = `all ${duration}ms ${easing}`;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    }
};