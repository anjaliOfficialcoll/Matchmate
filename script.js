// GSAP Registration
gsap.registerPlugin(ScrollTrigger);

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

// Add CSS for spin animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Story Progress Tracking
const progressBar = document.getElementById('progressBar');
const progressDots = document.querySelectorAll('.progress-dot');
const scenes = document.querySelectorAll('.story-scene');

// Update progress based on scroll
function updateProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    if (progressBar) {
        progressBar.style.setProperty('--progress', `${scrollPercent}%`);
        progressBar.style.background = `linear-gradient(to top, var(--primary-accent) ${scrollPercent}%, var(--border-color) ${scrollPercent}%)`;
    }
    
    // Update active scene
    scenes.forEach((scene, index) => {
        const rect = scene.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
        
        if (isVisible) {
            progressDots.forEach(dot => dot.classList.remove('active'));
            if (progressDots[index]) {
                progressDots[index].classList.add('active');
            }
        }
    });
}

// Progress dot click handlers
progressDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        const targetScene = scenes[index];
        if (targetScene) {
            targetScene.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        }
    });
});

// GSAP Scroll Animations
function initScrollAnimations() {
    // Scene 1 - Character animations
    gsap.timeline({
        scrollTrigger: {
            trigger: "#scene1",
            start: "top center",
            end: "bottom center",
            toggleActions: "play none none reverse"
        }
    })
    .from("#scene1 .character-angry", { x: -100, opacity: 0, duration: 1 })
    .from("#scene1 .character-party", { x: 100, opacity: 0, duration: 1 }, "-=0.5")
    .from("#scene1 .speech-bubble", { scale: 0, opacity: 0, duration: 0.5 }, "-=0.3")
    .from("#scene1 .music-notes .note", { 
        y: -20, 
        opacity: 0, 
        duration: 0.3, 
        stagger: 0.1 
    }, "-=0.2");

    // Scene 2 - Unsafe environment
    gsap.timeline({
        scrollTrigger: {
            trigger: "#scene2",
            start: "top center",
            end: "bottom center",
            toggleActions: "play none none reverse"
        }
    })
    .from("#scene2 .character-scared", { y: 50, opacity: 0, duration: 1 })
    .from("#scene2 .unsafe-environment", { scale: 0.8, opacity: 0, duration: 0.8 }, "-=0.5")
    .from("#scene2 .failed-attempts > *", { 
        x: -30, 
        opacity: 0, 
        duration: 0.5, 
        stagger: 0.2 
    }, "-=0.3");

    // Scene 3 - Wishlist animation
    gsap.timeline({
        scrollTrigger: {
            trigger: "#scene3",
            start: "top center",
            end: "bottom center",
            toggleActions: "play none none reverse"
        }
    })
    .from("#scene3 .character-hopeful", { scale: 0.8, opacity: 0, duration: 1 })
    .from("#scene3 .wishlist", { y: 50, opacity: 0, duration: 0.8 }, "-=0.5")
    .from("#scene3 .wishlist-item", { 
        x: -20, 
        opacity: 0, 
        duration: 0.3, 
        stagger: 0.1 
    }, "-=0.3")
    .from("#scene3 .star", { 
        scale: 0, 
        opacity: 0, 
        duration: 0.5, 
        stagger: 0.1 
    }, "-=0.5");

    // Scene 4 - Success animation
    gsap.timeline({
        scrollTrigger: {
            trigger: "#scene4",
            start: "top center",
            end: "bottom center",
            toggleActions: "play none none reverse"
        }
    })
    .from("#scene4 .character-happy", { scale: 0.8, opacity: 0, duration: 1 })
    .from("#scene4 .app-mockup", { y: 50, opacity: 0, duration: 0.8 }, "-=0.5")
    .from("#scene4 .celebration-effects .confetti", { 
        y: -30, 
        opacity: 0, 
        duration: 0.5, 
        stagger: 0.1 
    }, "-=0.3")
    .from("#scene4 .success-indicators .indicator", { 
        scale: 0, 
        opacity: 0, 
        duration: 0.3, 
        stagger: 0.1 
    }, "-=0.2");

    // CTA Section animation
    gsap.timeline({
        scrollTrigger: {
            trigger: "#cta",
            start: "top center",
            end: "bottom center",
            toggleActions: "play none none reverse"
        }
    })
    .from("#cta .cta-text", { y: 30, opacity: 0, duration: 1 })
    .from("#cta .email-form-container", { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
    .from("#cta .trust-stats .stat-item", { 
        y: 20, 
        opacity: 0, 
        duration: 0.5, 
        stagger: 0.1 
    }, "-=0.3");

    // Continuous animations
    gsap.to(".music-notes .note", {
        y: -10,
        duration: 2,
        ease: "power2.inOut",
        stagger: 0.3,
        repeat: -1,
        yoyo: true
    });

    gsap.to(".star", {
        scale: 1.2,
        opacity: 1,
        duration: 2,
        ease: "power2.inOut",
        stagger: 0.5,
        repeat: -1,
        yoyo: true
    });

    gsap.to(".confetti", {
        rotation: 360,
        y: 20,
        duration: 3,
        ease: "power2.inOut",
        stagger: 0.5,
        repeat: -1,
        yoyo: true
    });
}

// Parallax Effects
function initParallaxEffects() {
    // Background parallax for each scene
    scenes.forEach((scene, index) => {
        const background = scene.querySelector('.scene-background');
        if (background) {
            gsap.to(background, {
                yPercent: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: scene,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        }
    });

    // Character floating animations
    gsap.to(".character", {
        y: -5,
        duration: 3,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.5
    });

    // Phone mockup floating
    gsap.to(".phone-frame", {
        y: -8,
        rotation: 2,
        duration: 4,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
    });
}

// Smooth scrolling for navigation
function initSmoothScrolling() {
    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const nextScene = document.getElementById('scene2');
            if (nextScene) {
                nextScene.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    }
}

// Header background opacity on scroll
function initHeaderEffects() {
    const header = document.querySelector('.header');
    
    gsap.to(header, {
        backgroundColor: "rgba(250, 250, 250, 0.98)",
        backdropFilter: "blur(20px)",
        scrollTrigger: {
            trigger: "body",
            start: "top -50px",
            end: "top -51px",
            toggleActions: "play none none reverse"
        }
    });
}

// Character interaction effects
function initCharacterInteractions() {
    // Add hover effects to characters
    document.querySelectorAll('.character').forEach(character => {
        character.addEventListener('mouseenter', () => {
            gsap.to(character, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        character.addEventListener('mouseleave', () => {
            gsap.to(character, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Speech bubble animations
    document.querySelectorAll('.speech-bubble, .thought-bubble').forEach(bubble => {
        gsap.set(bubble, { scale: 0 });
        
        gsap.to(bubble, {
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: bubble.closest('.story-scene'),
                start: "top center",
                toggleActions: "play none none reverse"
            }
        });
    });
}

// Initialize all animations and effects
function initializeApp() {
    // Initialize GSAP animations
    initScrollAnimations();
    initParallaxEffects();
    initSmoothScrolling();
    initHeaderEffects();
    initCharacterInteractions();
    
    // Add scroll listener for progress tracking
    window.addEventListener('scroll', updateProgress);
    
    // Initial progress update
    updateProgress();
    
    console.log('ApanaGhr Comic Story loaded successfully!');
    
    // Check if user has already submitted email
    const savedEmail = localStorage.getItem('apanaghr_email');
    if (savedEmail) {
        console.log('User previously joined waitlist:', savedEmail);
    }
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

// Apply debouncing to scroll handler
const debouncedUpdateProgress = debounce(updateProgress, 10);
window.addEventListener('scroll', debouncedUpdateProgress);

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
    
    // Arrow key navigation between scenes
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const currentScene = document.querySelector('.story-scene:hover') || 
                           Array.from(scenes).find(scene => {
                               const rect = scene.getBoundingClientRect();
                               return rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
                           });
        
        if (currentScene) {
            const currentIndex = Array.from(scenes).indexOf(currentScene);
            let targetIndex;
            
            if (e.key === 'ArrowDown') {
                targetIndex = Math.min(currentIndex + 1, scenes.length - 1);
            } else {
                targetIndex = Math.max(currentIndex - 1, 0);
            }
            
            scenes[targetIndex].scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        }
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Refresh ScrollTrigger on window resize
window.addEventListener('resize', debounce(() => {
    ScrollTrigger.refresh();
}, 250));