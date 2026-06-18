// ===== Typing Effect Animation =====
document.addEventListener('DOMContentLoaded', function() {
    initializeTypingEffect();
    initializeScrollAnimations();
    initializeFormValidation();
    initializeInteractiveElements();
});

function initializeTypingEffect() {
    const titles = [
        'Developer',
        'Web Developer',
        'Data Scientist',
        'AI Enthusiast',
        'Full Stack Engineer',
        'Problem Solver'
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseDuration = 2000;

    const typingText = document.getElementById('typing-text');
    if (!typingText) return;

    function typeEffect() {
        const currentTitle = titles[titleIndex];

        if (!isDeleting && charIndex < currentTitle.length) {
            // Typing - build string from scratch each time
            let displayText = '';
            for (let i = 0; i <= charIndex; i++) {
                displayText += currentTitle[i];
            }
            typingText.textContent = displayText;
            charIndex++;
            setTimeout(typeEffect, typingSpeed);
        } else if (!isDeleting && charIndex === currentTitle.length) {
            // Pause before deleting
            isDeleting = true;
            setTimeout(typeEffect, pauseDuration);
        } else if (isDeleting && charIndex > 0) {
            // Deleting - remove one character at a time
            charIndex--;
            let displayText = '';
            for (let i = 0; i < charIndex; i++) {
                displayText += currentTitle[i];
            }
            typingText.textContent = displayText;
            setTimeout(typeEffect, deletingSpeed);
        } else if (isDeleting && charIndex === 0) {
            // Move to next title
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            setTimeout(typeEffect, 500);
        }
    }

    typeEffect();
}

// ===== Scroll Animations =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = getAnimationForElement(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in, .fade-in-down, .fade-in-up').forEach(el => {
        observer.observe(el);
    });
}

function getAnimationForElement(element) {
    if (element.classList.contains('fade-in-down')) {
        return 'fade-in-down 0.6s ease-out forwards';
    } else if (element.classList.contains('fade-in-up')) {
        return 'fade-in-up 0.6s ease-out forwards';
    }
    return 'fade-in 0.6s ease-out forwards';
}

// ===== Form Validation =====
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    // Add real-time validation feedback
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateEmail(this);
        });
    });
}

function validateEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (input.value && !emailRegex.test(input.value)) {
        input.classList.add('is-invalid');
    } else {
        input.classList.remove('is-invalid');
    }
}

// ===== Interactive Elements =====
function initializeInteractiveElements() {
    // Smooth scroll navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Add hover effects to cards
    addCardHoverEffects();

    // Active navigation link based on scroll
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

function addCardHoverEffects() {
    const cards = document.querySelectorAll('.project-card, .skill-card, .blog-post-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(37, 99, 235, 0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
}

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        const sectionId = link.getAttribute('href');
        if (sectionId === '#') return;

        const section = document.querySelector(sectionId);
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

// ===== Utility Functions =====

// Add loading animation to buttons
function addButtonLoadingState(button) {
    const originalText = button.textContent;
    button.disabled = true;
    button.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Loading...';

    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

// Copy to clipboard utility
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    }).catch(err => {
        showNotification('Failed to copy', 'error');
    });
}

// Show toast notification
function showNotification(message, type = 'info') {
    const alertClass = {
        'success': 'alert-success',
        'error': 'alert-danger',
        'info': 'alert-info',
        'warning': 'alert-warning'
    }[type] || 'alert-info';

    const alert = document.createElement('div');
    alert.className = `alert ${alertClass} alert-dismissible fade show position-fixed`;
    alert.style.top = '20px';
    alert.style.right = '20px';
    alert.style.zIndex = '10000';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alert);

    setTimeout(() => {
        const bsAlert = new bootstrap.Alert(alert);
        bsAlert.close();
    }, 3000);
}

// ===== Performance Optimizations =====

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Preload critical resources
window.addEventListener('load', () => {
    // Preload fonts, optimize images, etc.
    if (performance && performance.mark) {
        performance.mark('portfolio-loaded');
        performance.measure('page-load', 'navigationStart', 'portfolio-loaded');
    }
});

// ===== Analytics (Optional - Add your tracking code here) =====
// Track page views, user interactions, etc.
function trackPageView(pageName) {
    if (window.gtag) {
        gtag('event', 'page_view', {
            'page_path': window.location.pathname,
            'page_title': pageName
        });
    }
}

// Track button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if (window.gtag) {
            gtag('event', 'button_click', {
                'button_text': this.textContent,
                'button_location': this.parentElement.className
            });
        }
    });
});

// ===== Dark Mode Toggle (Optional Feature) =====
function initializeDarkModeToggle() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (!darkModeToggle) return;

    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const storedTheme = localStorage.getItem('theme');
    const initialTheme = storedTheme || (prefersDarkScheme.matches ? 'dark' : 'light');

    setTheme(initialTheme);

    darkModeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    prefersDarkScheme.addEventListener('change', (e) => {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

// ===== Export functions for use in HTML if needed =====
window.portfolioUtils = {
    addButtonLoadingState,
    copyToClipboard,
    showNotification,
    trackPageView
};
