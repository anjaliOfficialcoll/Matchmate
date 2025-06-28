// GSAP Registration
gsap.registerPlugin(ScrollTrigger);

// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1500);
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add a subtle animation to the toggle button
    themeToggle.style.transform = 'scale(0.95)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 150);
});

// Enhanced Email Form Functionality
const emailForm = document.getElementById('emailForm');
const emailInput = document.getElementById('email');
const successMessage = document.getElementById('successMessage');
const notifyBtn = emailForm.querySelector('.notify-btn');

emailForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    if (!email) {
        showError('Please enter your email address');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    // Show loading state
    const originalText = notifyBtn.innerHTML;
    notifyBtn.innerHTML = '<i data-lucide="loader-2"></i><span>Joining...</span>';
    notifyBtn.disabled = true;
    
    // Add rotation animation to loader
    const loader = notifyBtn.querySelector('[data-lucide="loader-2"]');
    if (loader) {
        loader.style.animation = 'spin 1s linear infinite';
    }
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        emailInput.parentElement.style.display = 'none';
        notifyBtn.style.display = 'none';
        successMessage.classList.add('show');
        
        // Store email in localStorage for demo purposes
        localStorage.setItem('apanaghr_email', email);
        
        // Track conversion (you can integrate with analytics here)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
                'value': 1.0,
                'currency': 'USD'
            });
        }
        
        // Reset form after 5 seconds
        setTimeout(() => {
            emailInput.parentElement.style.display = 'block';
            notifyBtn.style.display = 'flex';
            successMessage.classList.remove('show');
            emailInput.value = '';
            notifyBtn.innerHTML = originalText;
            notifyBtn.disabled = false;
        }, 5000);
        
    } catch (error) {
        showError('Something went wrong. Please try again.');
        notifyBtn.innerHTML = originalText;
        notifyBtn.disabled = false;
    }
});

function showError(message) {
    // Create temporary error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<i data-lucide="alert-circle"></i><span>${message}</span>`;
    errorDiv.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 1rem;
        background: rgba(244, 67, 54, 0.1);
        border: 1px solid #f44336;
        border-radius: 0.75rem;
        color: #f44336;
        font-weight: 500;
        margin-top: 1rem;
        animation: slideUp 0.5s ease;
    `;
    
    emailForm.appendChild(errorDiv);
    
    // Re-initialize lucide icons for the new error icon
    if (window.lucide) {
        lucide.createIcons();
    }
    
    // Remove error message after 3 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

function updateBackToTopVisibility() {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Header Background on Scroll
function updateHeaderBackground() {
    const header = document.querySelector('.header');
    if (window.pageYOffset > 50) {
        header.style.background = 'rgba(250, 250, 250, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'rgba(250, 250, 250, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
    }
}

// GSAP Scroll Animations
function initScrollAnimations() {
    // Hero section animations
    gsap.timeline({
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top center",
            end: "bottom center",
            toggleActions: "play none none reverse"
        }
    })
    .from(".hero-text", { x: -50, opacity: 0, duration: 1 })
    .from(".hero-visual", { x: 50, opacity: 0, duration: 1 }, "-=0.5")
    .from(".floating-notifications .notification", { 
        scale: 0, 
        opacity: 0, 
        duration: 0.5, 
        stagger: 0.3 
    }, "-=0.3");

    // Features section animation
    gsap.timeline({
        scrollTrigger: {
            trigger: ".features-section",
            start: "top center",
            end: "bottom center",
            toggleActions: "play none none reverse"
        }
    })
    .from(".section-header", { y: 30, opacity: 0, duration: 1 })
    .from(".feature-card", { 
        y: 50, 
        opacity: 0, 
        duration: 0.8, 
        stagger: 0.2 
    }, "-=0.5");

    // How it works animation
    gsap.timeline({
        scrollTrigger: {
            trigger: ".how-it-works-section",
            start: "top center",
            end: "bottom center",
            toggleActions: "play none none reverse"
        }
    })
    .from(".section-header", { y: 30, opacity: 0, duration: 1 })
    .from(".step-item", { 
        y: 50, 
        opacity: 0, 
        duration: 0.8, 
        stagger: 0.2 
    }, "-=0.5")
    .from(".step-connector", { 
        scaleX: 0, 
        duration: 0.5, 
        stagger: 0.2 
    }, "-=0.3");

    // Testimonials animation
    gsap.timeline({
        scrollTrigger: {
            trigger: ".testimonials-section",
            start: "top center",
            end: "bottom center",
            toggleActions: "play none none reverse"
        }
    })
    .from(".section-header", { y: 30, opacity: 0, duration: 1 })
    .from(".testimonial-card", { 
        y: 50, 
        opacity: 0, 
        duration: 0.8, 
        stagger: 0.2 
    }, "-=0.5");

    // Waitlist section animation
    gsap.timeline({
        scrollTrigger: {
            trigger: ".waitlist-section",
            start: "top center",
            end: "bottom center",
            toggleActions: "play none none reverse"
        }
    })
    .from(".waitlist-text", { y: 30, opacity: 0, duration: 1 })
    .from(".email-form-container", { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
    .from(".social-proof .proof-item", { 
        y: 20, 
        opacity: 0, 
        duration: 0.5, 
        stagger: 0.1 
    }, "-=0.3");

    // Continuous animations
    gsap.to(".floating-icon", {
        y: -10,
        duration: 3,
        ease: "power2.inOut",
        stagger: 0.5,
        repeat: -1,
        yoyo: true
    });

    gsap.to(".phone-mockup", {
        y: -8,
        rotation: 1,
        duration: 4,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
    });

    gsap.to(".floating-notifications .notification", {
        y: -5,
        duration: 2,
        ease: "power2.inOut",
        stagger: 0.3,
        repeat: -1,
        yoyo: true
    });
}

// Parallax Effects
function initParallaxEffects() {
    // Background parallax
    gsap.to(".hero-pattern", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    gsap.to(".waitlist-pattern", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
            trigger: ".waitlist-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
}

// Interactive Elements
function initInteractiveElements() {
    // Feature card hover effects
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('.feature-icon'), {
                scale: 1.1,
                rotation: 5,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('.feature-icon'), {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Button hover effects
    document.querySelectorAll('.primary-btn, .secondary-btn, .notify-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                scale: 1.05,
                duration: 0.2,
                ease: "power2.out"
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                scale: 1,
                duration: 0.2,
                ease: "power2.out"
            });
        });
    });

    // Testimonial card interactions
    document.querySelectorAll('.testimonial-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll handlers
const debouncedBackToTop = debounce(updateBackToTopVisibility, 10);
const debouncedHeaderUpdate = debounce(updateHeaderBackground, 10);

window.addEventListener('scroll', () => {
    debouncedBackToTop();
    debouncedHeaderUpdate();
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for keyboard navigation
const keyboardStyle = document.createElement('style');
keyboardStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-accent) !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(keyboardStyle);

// Initialize all functionality
function initializeApp() {
    // Initialize GSAP animations
    initScrollAnimations();
    initParallaxEffects();
    initInteractiveElements();
    
    // Initial updates
    updateBackToTopVisibility();
    updateHeaderBackground();
    
    console.log('ApanaGhr Landing Page loaded successfully!');
    
    // Check if user has already submitted email
    const savedEmail = localStorage.getItem('apanaghr_email');
    if (savedEmail) {
        console.log('User previously joined waitlist:', savedEmail);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Refresh ScrollTrigger on window resize
window.addEventListener('resize', debounce(() => {
    ScrollTrigger.refresh();
}, 250));

// Add CSS for additional animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .error-message {
        animation: slideUp 0.5s ease !important;
    }
`;
document.head.appendChild(additionalStyles);

// Analytics and tracking (placeholder for future integration)
function trackEvent(eventName, eventData = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, eventData);
    }
    
    // Custom analytics
    console.log('Event tracked:', eventName, eventData);
}

// Track page interactions
document.addEventListener('click', (e) => {
    const target = e.target.closest('button, a');
    if (target) {
        const action = target.textContent.trim() || target.getAttribute('aria-label');
        trackEvent('click', {
            element: target.tagName.toLowerCase(),
            action: action,
            section: target.closest('section')?.id || 'unknown'
        });
    }
});

// Track scroll depth
let maxScrollDepth = 0;
window.addEventListener('scroll', debounce(() => {
    const scrollDepth = Math.round((window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
    if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        if (maxScrollDepth % 25 === 0) { // Track at 25%, 50%, 75%, 100%
            trackEvent('scroll_depth', { depth: maxScrollDepth });
        }
    }
}, 1000));