// Space-Themed Portfolio JavaScript functionality

// Particle System
class ParticleSystem {
    constructor() {
        this.container = document.getElementById('particles-container');
        this.particles = [];
        this.maxParticles = window.innerWidth > 768 ? 50 : 50;
        this.init();
    }

    init() {
        this.createParticles();
        this.animate();
        this.setupMouseInteraction();
        
        // Responsive particle count
        window.addEventListener('resize', () => {
            this.maxParticles = window.innerWidth > 768 ? 50 : 50;
            this.adjustParticleCount();
        });
    }

    createParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 3 + 1;
        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight + 10;
        const speed = Math.random() * 2 + 0.5;
        const opacity = Math.random() * 0.7 + 0.3;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            opacity: ${opacity};
            animation-duration: ${15 + Math.random() * 10}s;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        this.container.appendChild(particle);
        this.particles.push({
            element: particle,
            x: x,
            y: y,
            speed: speed,
            baseOpacity: opacity
        });
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                this.particles = this.particles.filter(p => p.element !== particle);
                this.createParticle(); // Create new particle
            }
        }, (15 + Math.random() * 10) * 1000);
    }

    setupMouseInteraction() {
        let mouseX = 0, mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            this.particles.forEach(particle => {
                const rect = particle.element.getBoundingClientRect();
                const particleX = rect.left + rect.width / 2;
                const particleY = rect.top + rect.height / 2;
                
                const distance = Math.sqrt(
                    Math.pow(mouseX - particleX, 2) + Math.pow(mouseY - particleY, 2)
                );
                
                if (distance < 100) {
                    const opacity = particle.baseOpacity + (1 - distance / 100) * 0.5;
                    const scale = 1 + (1 - distance / 100) * 0.5;
                    particle.element.style.opacity = Math.min(opacity, 1);
                    particle.element.style.transform = `scale(${scale})`;
                } else {
                    particle.element.style.opacity = particle.baseOpacity;
                    particle.element.style.transform = 'scale(1)';
                }
            });
        });
    }

    adjustParticleCount() {
        const currentCount = this.particles.length;
        if (currentCount > this.maxParticles) {
            // Remove excess particles
            for (let i = 0; i < currentCount - this.maxParticles; i++) {
                const particle = this.particles.pop();
                if (particle && particle.element.parentNode) {
                    particle.element.parentNode.removeChild(particle.element);
                }
            }
        } else if (currentCount < this.maxParticles) {
            // Add more particles
            for (let i = 0; i < this.maxParticles - currentCount; i++) {
                this.createParticle();
            }
        }
    }

    animate() {
        // Continuous animation loop for any additional effects
        requestAnimationFrame(() => this.animate());
    }
}

// Mobile Navigation
class MobileNav {
    constructor() {
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.navToggle.addEventListener('click', () => this.toggleMenu());
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    }

    toggleMenu() {
        this.navToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }

    closeMenu() {
        this.navToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
    }
}

// Smooth Scrolling and Active Navigation
class Navigation {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section');
        this.navbar = document.getElementById('navbar');
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupScrollSpy();
        this.setupNavbarScroll();
    }

    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupScrollSpy() {
        window.addEventListener('scroll', () => {
            let current = '';
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            this.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    setupNavbarScroll() {
        let lastScrollY = window.pageYOffset;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.pageYOffset;
            
            if (currentScrollY > 50) {
                this.navbar.style.background = '#2E2E2E';
                this.navbar.style.boxShadow = '0 4px 32px rgba(0,0,0,0.9)';
            } else {
                this.navbar.style.background = '#2E2E2E';
                this.navbar.style.boxShadow = '0 4px 32px rgba(0,0,0,0.9)';
            }
            
            lastScrollY = currentScrollY;
        });
    }
}

// Skill Animation
class SkillAnimation {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.animated = new Set();
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated.has(entry.target)) {
                    this.animateSkill(entry.target);
                    this.animated.add(entry.target);
                }
            });
        }, { threshold: 0.3 });

        this.skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }

    animateSkill(skillBar) {
        const skillLevel = skillBar.getAttribute('data-skill');
        const skillName = skillBar.closest('.skill-item').querySelector('.skill-name');
        
        // Add percentage display
        if (!skillName.querySelector('.skill-percentage')) {
            const percentage = document.createElement('span');
            percentage.className = 'skill-percentage';
            percentage.style.color = '#F15A24';
            percentage.style.fontWeight = '600';
            skillName.appendChild(percentage);
        }
        
        let currentWidth = 0;
        const targetWidth = parseInt(skillLevel);
        const increment = targetWidth / 60; // 60 frames for smooth animation
        
        const animate = () => {
            if (currentWidth < targetWidth) {
                currentWidth = Math.min(currentWidth + increment, targetWidth);
                skillBar.style.width = `${currentWidth}%`;
                
                // Update percentage display
                const percentageEl = skillName.querySelector('.skill-percentage');
                if (percentageEl) {
                    percentageEl.textContent = `${Math.round(currentWidth)}%`;
                }
                
                requestAnimationFrame(animate);
            }
        };
        
        setTimeout(animate, 200);
    }
}

// Scroll Animation
class ScrollAnimation {
    constructor() {
        this.animatedElements = document.querySelectorAll('.timeline-item, .project-card, .highlight-item');
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in', 'visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        this.animatedElements.forEach(el => {
            el.classList.add('animate-in');
            observer.observe(el);
        });
    }
}

// Contact Form
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Basic validation
        if (!name || !email || !subject || !message) {
            this.showNotification('Please fill in all fields.', 'error');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        this.showNotification('Thank you for your message! I will get back to you soon.', 'success');
        this.form.reset();
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px 24px',
            borderRadius: '8px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'all 0.3s ease',
            maxWidth: '300px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        });

        // Set background color based on type
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#3b82f6'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
}

// Enhanced Space-Themed Typing Effect
class SpaceTypingEffect {
    constructor() {
        this.subtitle = document.querySelector('.hero-subtitle');
        this.phrases = [
            'RPA Automation Architect',
            'Senior Automation Engineer', 
            'RPA Consultant',
            'UiPath Advanced RPA Certified',
			'Automation Anywhere Certified',
            'Intelligent Automation Specialist'
        ];
        this.currentPhraseIndex = 0;
        this.currentText = '';
        this.isDeleting = false;
        this.typeSpeed = 100;
        this.deleteSpeed = 50;
        this.pauseTime = 2000;
        this.init();
    }

    init() {
        if (this.subtitle) {
            this.subtitle.innerHTML = '';
            this.type();
        }
    }

    type() {
        const currentPhrase = this.phrases[this.currentPhraseIndex];
        
        if (this.isDeleting) {
            this.currentText = currentPhrase.substring(0, this.currentText.length - 1);
        } else {
            this.currentText = currentPhrase.substring(0, this.currentText.length + 1);
        }

        // Add cursor with cosmic glow
        this.subtitle.innerHTML = `${this.currentText}<span class="typing-cursor" style="
            color: #00D4FF;
            text-shadow: 0 0 10px #00D4FF;
            animation: blink 1s infinite;
        ">|</span>`;

        let typeSpeed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

        if (!this.isDeleting && this.currentText === currentPhrase) {
            typeSpeed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentText === '') {
            this.isDeleting = false;
            this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Add CSS for typing cursor
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(cursorStyle);

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.optimizeScrollEvents();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    optimizeScrollEvents() {
        let ticking = false;

        const updateScrollEffects = () => {
            // Any scroll-dependent updates go here
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
    }
}

// Theme Toggle (if needed in future)
class ThemeToggle {
    constructor() {
        // Use in-memory variable instead of localStorage for sandbox compatibility
        this.currentTheme = 'light'; // Default theme
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        // You could add a theme toggle button here if needed
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-color-scheme', theme);
        this.currentTheme = theme;
    }

    toggle() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        // Theme persists only during current session (no localStorage in sandbox)
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new ParticleSystem();
    new MobileNav();
    new Navigation();
    new SkillAnimation();
    new ScrollAnimation();
    new ContactForm();
    new SpaceTypingEffect();
    new PerformanceOptimizer();
    new ThemeToggle();
    new CosmicEffects();
    new OrbitalAnimations();

    // Add space-themed polish
    addSpaceLoadingAnimation();
    setupSpaceEasterEggs();
    initializeCosmicBackground();
});

// Space-Themed Loading Animation
function addSpaceLoadingAnimation() {
    const hero = document.querySelector('.hero');
    const orbitalRings = document.querySelectorAll('.orbit-ring');
    const profileImg = document.querySelector('.profile-img');
    
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'scale(0.9)';
        
        // Animate orbital rings
        orbitalRings.forEach((ring, index) => {
            ring.style.opacity = '0';
            ring.style.transform = 'scale(0) rotate(0deg)';
        });
        
        // Animate profile image
        if (profileImg) {
            profileImg.style.opacity = '0';
            profileImg.style.transform = 'scale(0)';
        }
        
        setTimeout(() => {
            // Hero fade in
            hero.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
            hero.style.opacity = '1';
            hero.style.transform = 'scale(1)';
            
            // Orbital rings appear sequentially
            orbitalRings.forEach((ring, index) => {
                setTimeout(() => {
                    ring.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    ring.style.opacity = '1';
                    ring.style.transform = 'scale(1) rotate(0deg)';
                }, index * 200);
            });
            
            // Profile image appears last
            if (profileImg) {
                setTimeout(() => {
                    profileImg.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    profileImg.style.opacity = '1';
                    profileImg.style.transform = 'scale(1)';
                }, 600);
            }
        }, 300);
    }
}

// Cosmic Effects Handler
class CosmicEffects {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupHoverEffects();
        this.setupScrollEffects();
        this.setupCosmicCursor();
    }
    
    setupHoverEffects() {
        // Add cosmic glow to buttons and cards
        const interactiveElements = document.querySelectorAll('.btn, .project-card, .timeline-content');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.createCosmicRipple(e);
            });
        });
    }
    
    createCosmicRipple(e) {
        const ripple = document.createElement('div');
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: radial-gradient(circle, rgba(0, 212, 255, 0.6) 0%, transparent 70%);
            border-radius: 50%;
            left: ${x - 5}px;
            top: ${y - 5}px;
            pointer-events: none;
            animation: cosmic-ripple 0.6s ease-out;
            z-index: 1000;
        `;
        
        e.target.style.position = 'relative';
        e.target.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
    
    setupScrollEffects() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateParallaxEffects();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    updateParallaxEffects() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-icon');
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.1;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
    
    setupCosmicCursor() {
        // Add trailing effect to cursor
        const trail = [];
        const maxTrailLength = 10;
        
        document.addEventListener('mousemove', (e) => {
            // Add current position to trail
            trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
            
            // Remove old trail points
            while (trail.length > maxTrailLength) {
                trail.shift();
            }
            
            // Create/update trail elements
            this.updateCursorTrail(trail);
        });
    }
    
    updateCursorTrail(trail) {
        // Remove existing trail elements
        const existingTrails = document.querySelectorAll('.cursor-trail');
        existingTrails.forEach(el => el.remove());
        
        // Create new trail elements
        trail.forEach((point, index) => {
            const trailElement = document.createElement('div');
            const opacity = (index + 1) / trail.length * 0.5;
            const size = (index + 1) / trail.length * 8;
            
            trailElement.className = 'cursor-trail';
            trailElement.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, rgba(0, 212, 255, ${opacity}) 0%, transparent 70%);
                border-radius: 50%;
                left: ${point.x - size/2}px;
                top: ${point.y - size/2}px;
                pointer-events: none;
                z-index: 9999;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(trailElement);
            
            // Remove after animation
            setTimeout(() => {
                if (trailElement.parentNode) {
                    trailElement.style.opacity = '0';
                    setTimeout(() => {
                        if (trailElement.parentNode) {
                            trailElement.parentNode.removeChild(trailElement);
                        }
                    }, 300);
                }
            }, 100);
        });
    }
}

// Orbital Animations Controller
class OrbitalAnimations {
    constructor() {
        this.orbitalElements = document.querySelectorAll('.orbit-ring');
        this.init();
    }
    
    init() {
        this.setupOrbitControls();
        this.addOrbitingObjects();
    }
    
    setupOrbitControls() {
        // Pause animations on hover for better UX
        const heroImage = document.querySelector('.hero-image');
        
        if (heroImage) {
            heroImage.addEventListener('mouseenter', () => {
                this.orbitalElements.forEach(ring => {
                    ring.style.animationPlayState = 'paused';
                });
            });
            
            heroImage.addEventListener('mouseleave', () => {
                this.orbitalElements.forEach(ring => {
                    ring.style.animationPlayState = 'running';
                });
            });
        }
    }
    
    addOrbitingObjects() {
        // Add small objects that orbit around the rings
        this.orbitalElements.forEach((ring, index) => {
            const orbitingObject = document.createElement('div');
            orbitingObject.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #00D4FF;
                border-radius: 50%;
                top: -2px;
                left: 50%;
                transform: translateX(-50%);
                box-shadow: 0 0 10px #00D4FF;
                animation: twinkle 2s ease-in-out infinite;
            `;
            
            ring.appendChild(orbitingObject);
        });
    }
}

// Space-Themed Easter Eggs
function setupSpaceEasterEggs() {
    // Konami Code Easter Egg
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                triggerSpaceEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    // Click counter on profile image
    const profileImage = document.querySelector('.profile-placeholder');
    let clickCount = 0;
    
    if (profileImage) {
        profileImage.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 5) {
                profileImage.style.animation = 'spin 2s linear';
                setTimeout(() => {
                    profileImage.style.animation = 'float 6s ease-in-out infinite';
                }, 2000);
                clickCount = 0;
            }
        });
    }
}

function triggerSpaceEasterEgg() {
    // Create cosmic explosion effect
    const cosmicIcons = ['🌟', '🚀', '⚙️', '🪐', '🛩️', '🛸', '🌕', '🌍'];

    // Create central explosion
    const explosionCenter = document.createElement('div');
    explosionCenter.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(0, 212, 255, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        z-index: 10000;
        animation: cosmic-explosion 2s ease-out;
    `;
    
    document.body.appendChild(explosionCenter);
    
    // Create floating cosmic icons
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createCosmicFloatingIcon(cosmicIcons[Math.floor(Math.random() * cosmicIcons.length)]);
        }, i * 50);
    }
    
    // Remove explosion center
    setTimeout(() => {
        if (explosionCenter.parentNode) {
            explosionCenter.parentNode.removeChild(explosionCenter);
        }
    }, 2000);
}

function createCosmicFloatingIcon(icon) {
    const iconEl = document.createElement('div');
    iconEl.textContent = icon;
    
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2;
    const angle = Math.random() * Math.PI * 2;
    const distance = 200 + Math.random() * 300;
    const endX = startX + Math.cos(angle) * distance;
    const endY = startY + Math.sin(angle) * distance;
    
    iconEl.style.cssText = `
        position: fixed;
        font-size: ${20 + Math.random() * 20}px;
        pointer-events: none;
        z-index: 10000;
        left: ${startX}px;
        top: ${startY}px;
        text-shadow: 0 0 20px #00D4FF;
        animation: cosmic-float 4s ease-out forwards;
        transform-origin: center;
    `;
    
    // Add unique animation for each icon
    const uniqueId = 'cosmic-float-' + Math.random().toString(36).substr(2, 9);
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ${uniqueId} {
            0% {
                transform: translate(0, 0) rotate(0deg) scale(0.5);
                opacity: 1;
                text-shadow: 0 0 20px #00D4FF;
            }
            50% {
                transform: translate(${(endX - startX) * 0.5}px, ${(endY - startY) * 0.5}px) rotate(180deg) scale(1.2);
                opacity: 1;
                text-shadow: 0 0 30px #00D4FF, 0 0 40px #4FC3F7;
            }
            100% {
                transform: translate(${endX - startX}px, ${endY - startY}px) rotate(360deg) scale(0.2);
                opacity: 0;
                text-shadow: 0 0 50px #00D4FF;
            }
        }
        @keyframes cosmic-explosion {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            50% {
                transform: translate(-50%, -50%) scale(2);
                opacity: 0.8;
            }
            100% {
                transform: translate(-50%, -50%) scale(4);
                opacity: 0;
            }
        }
        @keyframes cosmic-ripple {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(20);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    iconEl.style.animation = `${uniqueId} 4s ease-out forwards`;
    
    document.body.appendChild(iconEl);
    
    setTimeout(() => {
        if (iconEl.parentNode) iconEl.parentNode.removeChild(iconEl);
        if (style.parentNode) style.parentNode.removeChild(style);
    }, 4000);
}

// Initialize cosmic background effects
function initializeCosmicBackground() {
    // Add shooting stars occasionally
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every interval
            createShootingStar();
        }
    }, 3000);
}

function createShootingStar() {
    const star = document.createElement('div');
    const startX = Math.random() * window.innerWidth;
    const startY = -10;
    
    star.style.cssText = `
        position: fixed;
        width: 2px;
        height: 2px;
        background: linear-gradient(45deg, #00D4FF, #FFFFFF);
        border-radius: 50%;
        left: ${startX}px;
        top: ${startY}px;
        z-index: 1;
        box-shadow: 0 0 10px #00D4FF, 0 0 20px #00D4FF, 0 0 30px #00D4FF;
        animation: shooting-star 2s linear forwards;
    `;
    
    document.body.appendChild(star);
    
    setTimeout(() => {
        if (star.parentNode) {
            star.parentNode.removeChild(star);
        }
    }, 2000);
}

// Add shooting star animation
const shootingStarStyle = document.createElement('style');
shootingStarStyle.textContent = `
    @keyframes shooting-star {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 1;
        }
        100% {
            transform: translateY(${window.innerHeight + 100}px) translateX(200px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(shootingStarStyle);

// Utility Functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add some console art for developers who inspect the code
console.log(`
%c    ╭─────────────────────────────────────────────╮
    │  🌌 ✨ COSMIC PORTFOLIO INITIALIZED ✨ 🌌  │
    ├─────────────────────────────────────────────┤
    │                                             │
    │     ██████╗ ██████╗  █████╗ ███████╗       │
    │     ██╔══██╗██╔══██╗██╔══██╗██╔════╝       │
    │     ██████╔╝██████╔╝███████║███████╗       │
    │     ██╔═══╝ ██╔══██╗██╔══██║╚════██║       │
    │     ██║     ██║  ██║██║  ██║███████║       │
    │     ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝       │
    │                                             │
    ├─────────────────────────────────────────────┤
    │  🚀 Senior RPA Developer & Automation      │
    │     Architect | Designing the Future        │
    │                                             │
    │  ⚡ Features: Particle System, Orbital      │
    │     Animations, Cosmic Effects, Interactive │
    │     Elements, Space-themed UI               │
    │                                             │
    │  🛸 Try the Konami Code for a surprise!     │
    │                                             │
    ╰─────────────────────────────────────────────╯
%c
🌟 Welcome to the cosmic experience! Thanks for exploring the code! 🌟
`, 'color: #00D4FF; font-weight: bold; text-shadow: 0 0 10px #00D4FF;', 'color: #E3F2FD; font-size: 12px;');