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

// Countdown Timer Functionality
function updateCountdown() {
    // Set target date (30 days from now for demo)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);
    targetDate.setHours(10, 55, 30, 0); // Set to 10:55:30
    
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;
    
    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update the display
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    
    // Add animation effect when numbers change
    const countdownNumbers = document.querySelectorAll('.countdown-number');
    countdownNumbers.forEach(number => {
        number.style.transform = 'scale(1.05)';
        setTimeout(() => {
            number.style.transform = 'scale(1)';
        }, 100);
    });
    
    // If countdown is finished
    if (distance < 0) {
        document.getElementById('countdownTimer').innerHTML = '<div class="countdown-finished">🎉 We\'re Live!</div>';
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

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
    notifyBtn.innerHTML = '<i data-lucide="loader-2"></i><span>Submitting...</span>';
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

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced scroll animations with intersection observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Enhanced parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // Parallax for background circles
    document.querySelectorAll('.bg-circle').forEach((circle, index) => {
        const speed = (index + 1) * 0.1;
        circle.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Parallax for floating cards
    document.querySelectorAll('.floating-card').forEach((card, index) => {
        const speed = (index + 1) * 0.05;
        card.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Header background opacity on scroll
    const header = document.querySelector('.header');
    const opacity = Math.min(scrolled / 100, 0.95);
    if (scrolled > 50) {
        header.style.background = `rgba(${document.body.getAttribute('data-theme') === 'dark' ? '15, 15, 15' : '250, 250, 250'}, ${opacity})`;
    } else {
        header.style.background = `rgba(${document.body.getAttribute('data-theme') === 'dark' ? '15, 15, 15' : '250, 250, 250'}, 0.95)`;
    }
});

// Add keyboard navigation support
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

// Social media link interactions with enhanced tooltips
document.querySelectorAll('.social-link').forEach(link => {
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'social-tooltip';
    tooltip.style.cssText = `
        position: absolute;
        bottom: 120%;
        left: 50%;
        transform: translateX(-50%);
        background: var(--heading-color);
        color: var(--bg-color);
        padding: 0.5rem 0.75rem;
        border-radius: 0.5rem;
        font-size: 0.75rem;
        font-weight: 500;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 1000;
    `;
    
    // Determine platform based on icon class
    let platform = '';
    if (link.querySelector('.instagram-icon')) {
        platform = 'Follow on Instagram';
    } else if (link.querySelector('.linkedin-icon')) {
        platform = 'Connect on LinkedIn';
    } else if (link.querySelector('.twitter-icon')) {
        platform = 'Follow on X';
    }
    
    tooltip.textContent = platform;
    link.style.position = 'relative';
    link.appendChild(tooltip);
    
    // Show tooltip on hover
    link.addEventListener('mouseenter', () => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateX(-50%) translateY(-4px)';
    });
    
    // Hide tooltip on leave
    link.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateX(-50%) translateY(0)';
    });
    
    // Click interaction
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Add a subtle click animation
        link.style.transform = 'translateY(-4px) scale(0.95)';
        setTimeout(() => {
            link.style.transform = 'translateY(-4px) scale(1)';
        }, 150);
        
        // In a real application, these would link to actual social media pages
        console.log(`Would navigate to ${platform}`);
    });
});

// Enhanced mockup interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add subtle animations to mockup elements
    const phoneScreen = document.querySelector('.phone-screen');
    const desktopScreen = document.querySelector('.desktop-screen');
    
    if (phoneScreen) {
        phoneScreen.addEventListener('mouseenter', () => {
            phoneScreen.style.transform = 'scale(1.02)';
        });
        
        phoneScreen.addEventListener('mouseleave', () => {
            phoneScreen.style.transform = 'scale(1)';
        });
    }
    
    if (desktopScreen) {
        desktopScreen.addEventListener('mouseenter', () => {
            desktopScreen.style.transform = 'scale(1.02)';
        });
        
        desktopScreen.addEventListener('mouseleave', () => {
            desktopScreen.style.transform = 'scale(1)';
        });
    }
    
    // Initialize any dynamic content
    console.log('ApanaGhr Enhanced Landing Page loaded');
    
    // Check if user has already submitted email
    const savedEmail = localStorage.getItem('apanaghr_email');
    if (savedEmail) {
        console.log('User previously showed interest:', savedEmail);
    }
    
    // Add loading animation to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

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
const debouncedScrollHandler = debounce(() => {
    const scrolled = window.pageYOffset;
    
    // Only apply parallax on larger screens for performance
    if (window.innerWidth > 768) {
        document.querySelectorAll('.bg-circle').forEach((circle, index) => {
            const speed = (index + 1) * 0.1;
            circle.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);