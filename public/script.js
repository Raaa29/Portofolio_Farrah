// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAnimations();
    initializeSkillBars();
    initializeContactForm();
    initializeScrollEffects();
    initializeTypewriter();
    initializeAchievementImages();
    initializeAnimatedText();
});

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Change navbar background on scroll with galaxy theme
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = 'var(--shadow-2xl), 0 0 50px rgba(124, 58, 237, 0.4)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.background = 'rgba(15, 23, 42, 0.85)';
            navbar.style.boxShadow = 'var(--shadow-neon)';
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    });

    // Update active nav link function
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }
}

// Animation on scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special animation for project cards
                if (entry.target.classList.contains('project-card')) {
                    entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                    entry.target.classList.add('fade-in-up');
                }
                
                // Special animation for skill categories
                if (entry.target.classList.contains('skill-category')) {
                    entry.target.style.animationDelay = `${Math.random() * 0.3}s`;
                    entry.target.classList.add('fade-in-up');
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .about-content, .contact-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Skill bar animations
function initializeSkillBars() {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-level');
                skillBars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.animationPlayState = 'running';
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.5 });

    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    // Form input animations
    const formGroups = contactForm.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');

        input.addEventListener('focus', () => {
            group.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                group.classList.remove('focused');
            }
        });

        // Check if input has value on load
        if (input.value) {
            group.classList.add('focused');
        }
    });

    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            showNotification('Pesan berhasil dikirim! Terima kasih atas perhatian Anda.', 'success');
            contactForm.reset();
            formGroups.forEach(group => group.classList.remove('focused'));
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Scroll effects
function initializeScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Active navigation link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Typewriter effect for hero title
function initializeTypewriter() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const originalText = heroTitle.innerHTML;
    const textToType = 'Hi, Saya <span class="text-gradient">Data Scientist</span>';
    
    heroTitle.innerHTML = '';
    
    let i = 0;
    const typeSpeed = 100;
    
    function typeWriter() {
        if (i < textToType.length) {
            if (textToType.charAt(i) === '<') {
                // Handle HTML tags
                const tagEnd = textToType.indexOf('>', i) + 1;
                heroTitle.innerHTML += textToType.substring(i, tagEnd);
                i = tagEnd;
            } else {
                heroTitle.innerHTML += textToType.charAt(i);
                i++;
            }
            setTimeout(typeWriter, typeSpeed);
        } else {
            // Add blinking cursor
            heroTitle.innerHTML += '<span class="cursor">|</span>';
            setTimeout(() => {
                const cursor = document.querySelector('.cursor');
                if (cursor) cursor.remove();
            }, 3000);
        }
    }
    
    // Start typewriter effect after a delay
    setTimeout(typeWriter, 1000);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        animation: slideInRight 0.3s ease;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
    
    // Manual close
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getNotificationColor(type) {
    switch(type) {
        case 'success': return '#38a169';
        case 'error': return '#e53e3e';
        case 'warning': return '#d69e2e';
        default: return '#667eea';
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.3s ease;
        margin-left: 1rem;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    .cursor {
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .form-group.focused label {
        top: -0.5rem !important;
        left: 0.5rem !important;
        font-size: 0.8rem !important;
        color: var(--primary-color) !important;
        background: white !important;
        padding: 0 0.5rem !important;
    }
`;
document.head.appendChild(style);

// Add loading screen
window.addEventListener('load', () => {
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-logo">
                <i class="fas fa-chart-line"></i>
                <span>DataPro</span>
            </div>
            <div class="loading-spinner">
                <div class="spinner"></div>
            </div>
            <p>Loading Portfolio...</p>
        </div>
    `;
    
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        color: white;
        font-family: 'Poppins', sans-serif;
    `;
    
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        .loading-content {
            text-align: center;
        }
        
        .loading-logo {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
        
        .loading-logo i {
            font-size: 2.5rem;
        }
        
        .loading-spinner {
            margin: 2rem 0;
        }
        
        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .loading-content p {
            font-size: 1.1rem;
            opacity: 0.9;
        }
    `;
    
    document.head.appendChild(loadingStyle);
    document.body.appendChild(loadingScreen);
    
    // Remove loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            loadingScreen.remove();
            loadingStyle.remove();
        }, 500);
    }, 2000);
});

// Add some interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            btn.style.position = 'relative';
            btn.style.overflow = 'hidden';
            btn.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Initialize Achievement Images
function initializeAchievementImages() {
    const achievementImages = document.querySelectorAll('.achievement-image img');
    
    achievementImages.forEach((img, index) => {
        // Add loading animation
        img.style.opacity = '0';
        img.style.transform = 'scale(0.8)';
        
        img.onload = function() {
            // Image loaded successfully
            this.style.transition = 'all 0.5s ease';
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
            
            // Hide fallback icon
            const parentContainer = this.closest('.achievement-image');
            if (parentContainer) {
                parentContainer.style.setProperty('--show-fallback', '0');
            }
        };
        
        img.onerror = function() {
            // Image failed to load, show fallback
            console.log(`Failed to load achievement image: ${this.src}`);
            this.style.display = 'none';
            
            const parentContainer = this.closest('.achievement-image');
            if (parentContainer) {
                parentContainer.style.setProperty('--show-fallback', '1');
                // Add fallback background
                parentContainer.style.background = 'var(--gradient-primary)';
                parentContainer.classList.add('image-fallback');
            }
        };
        
        // Set image source with error handling
        const imagePaths = [
            'Best-Muvers.png',
            'Best-Presentation.png', 
            'Best-Project.png'
        ];
        
        if (imagePaths[index]) {
            img.src = imagePaths[index];
            img.alt = img.alt || `Achievement ${index + 1}`;
        }
    });
}

// Add CSS variables for fallback control
const achievementStyle = document.createElement('style');
achievementStyle.textContent = `
    .achievement-image {
        --show-fallback: 0;
    }
    
    .achievement-image::before {
        opacity: var(--show-fallback, 0);
    }
    
    .achievement-image.image-fallback::before {
        opacity: 1;
    }
    
    .achievement-image img {
        background: transparent;
    }
`;
document.head.appendChild(achievementStyle);

// Initialize Animated Text with Greeting and Role
function initializeAnimatedText() {
    // Wait a bit to ensure DOM is fully loaded
    setTimeout(() => {
        const greetingElement = document.getElementById('animated-greeting');
        const roleElement = document.getElementById('animated-role');
        
        const greetings = ['Hi, Saya', 'Hello, I am', 'Halo, Saya', 'Hey, I\'m', 'Hai, Saya'];
        const roles = ['Data Scientist', 'Data Analyst', 'AI Developer', 'Data Enthusiast', 'Software Developer'];
        let currentIndex = 0;

        console.log('Initializing animated text...', greetingElement, roleElement); // Debug log
        
        if (!greetingElement || !roleElement) {
            console.error('animated elements not found!', { greeting: greetingElement, role: roleElement });
            return;
        }

        function changeText() {
            // Fade out both elements
            greetingElement.style.opacity = '0';
            greetingElement.style.transform = 'translateY(-10px)';
            roleElement.style.opacity = '0';
            roleElement.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                // Change to next greeting and role
                currentIndex = (currentIndex + 1) % greetings.length;
                greetingElement.textContent = greetings[currentIndex];
                roleElement.textContent = roles[currentIndex];
                console.log('Changed text to:', greetings[currentIndex], roles[currentIndex]); // Debug log
                
                // Fade back in both elements
                greetingElement.style.opacity = '1';
                greetingElement.style.transform = 'translateY(0px)';
                roleElement.style.opacity = '1';
                roleElement.style.transform = 'translateY(0px)';
            }, 300);
        }

        // Initial setup
        greetingElement.style.transition = 'all 0.3s ease-in-out';
        roleElement.style.transition = 'all 0.3s ease-in-out';
        greetingElement.textContent = greetings[currentIndex];
        roleElement.textContent = roles[currentIndex];
        console.log('Initial text set to:', greetings[currentIndex], roles[currentIndex]); // Debug log
        
        // Start animation cycle
        setInterval(changeText, 3000); // Change every 3 seconds
    }, 100);
}

// Add cursor blink animation
const animatedTextStyle = document.createElement('style');
animatedTextStyle.textContent = `
    .animated-text {
        position: relative;
        display: inline-block;
        min-width: 280px;
    }
    
    .animated-text::after {
        content: '|';
        position: absolute;
        right: -15px;
        top: 0;
        color: var(--primary-color);
        animation: cursor-blink 1s infinite;
        font-weight: 400;
    }
    
    @keyframes cursor-blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    .text-fade-out {
        animation: textFadeOut 0.5s ease-in-out forwards;
    }
    
    .text-fade-in {
        animation: textFadeIn 0.5s ease-in-out forwards;
    }
    
    @keyframes textFadeOut {
        0% { 
            opacity: 1; 
            transform: translateY(0px) scale(1);
        }
        100% { 
            opacity: 0; 
            transform: translateY(-10px) scale(0.95);
        }
    }
    
    @keyframes textFadeIn {
        0% { 
            opacity: 0; 
            transform: translateY(10px) scale(0.95);
        }
        100% { 
            opacity: 1; 
            transform: translateY(0px) scale(1);
        }
    }
`;
document.head.appendChild(animatedTextStyle);
