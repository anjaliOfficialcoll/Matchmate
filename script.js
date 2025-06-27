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

// Email Form Functionality
const emailForm = document.getElementById('emailForm');
const emailInput = document.getElementById('email');
const successMessage = document.getElementById('successMessage');
const notifyBtn = emailForm.querySelector('.notify-btn');

emailForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    if (!email) {
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
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        emailInput.style.display = 'none';
        notifyBtn.style.display = 'none';
        successMessage.classList.add('show');
        
        // Store email in localStorage for demo purposes
        localStorage.setItem('apanaghr_email', email);
        
        // Reset form after 5 seconds
        setTimeout(() => {
            emailInput.style.display = 'block';
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

// Smooth scrolling for any anchor links
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

// Add intersection observer for animations
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
document.querySelectorAll('.feature-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Add parallax effect to background circles
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    
    document.querySelectorAll('.bg-circle').forEach((circle, index) => {
        const speed = (index + 1) * 0.1;
        circle.style.transform = `translateY(${parallax * speed}px)`;
    });
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

// Initialize any dynamic content
document.addEventListener('DOMContentLoaded', () => {
    // Add any initialization code here
    console.log('ApanaGhr Coming Soon page loaded');
    
    // Check if user has already submitted email
    const savedEmail = localStorage.getItem('apanaghr_email');
    if (savedEmail) {
        console.log('User previously showed interest:', savedEmail);
    }
});