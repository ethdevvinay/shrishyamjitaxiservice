// ============================================
// Navigation & Mobile Menu
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// Statistics Counter - Working Version
// ============================================
(function() {
    'use strict';
    
    function animateStatCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const isDecimal = target % 1 !== 0;
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                if (isDecimal) {
                    element.textContent = target.toFixed(1);
                } else {
                    const formatted = Math.floor(target).toLocaleString('en-IN');
                    element.textContent = formatted;
                }
                clearInterval(timer);
            } else {
                if (isDecimal) {
                    element.textContent = start.toFixed(1);
                } else {
                    const formatted = Math.floor(start).toLocaleString('en-IN');
                    element.textContent = formatted;
                }
            }
        }, 16);
    }

    function initializeStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        if (statNumbers.length === 0) {
            setTimeout(initializeStatsCounter, 500);
            return;
        }
        
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    const target = parseFloat(entry.target.getAttribute('data-target'));
                    if (!isNaN(target)) {
                        entry.target.setAttribute('data-animated', 'true');
                        animateStatCounter(entry.target, target);
                    }
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });
        
        statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeStatsCounter);
    } else {
        initializeStatsCounter();
    }

    // Also try on window load
    window.addEventListener('load', () => {
        setTimeout(initializeStatsCounter, 300);
    });
})();

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// ============================================
// Hero Slider
// ============================================
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });

    dots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) {
            dot.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function startSlider() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlider() {
    clearInterval(slideInterval);
}

// Event listeners
nextBtn.addEventListener('click', () => {
    nextSlide();
    stopSlider();
    startSlider();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    stopSlider();
    startSlider();
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        stopSlider();
        startSlider();
    });
});

// Pause slider on hover
const heroSection = document.querySelector('.hero-section');
heroSection.addEventListener('mouseenter', stopSlider);
heroSection.addEventListener('mouseleave', startSlider);

// Start slider
startSlider();

// ============================================
// Smooth Scroll
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Testimonials Slider
// ============================================
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
const testimonialPrev = document.getElementById('testimonialPrev');
const testimonialNext = document.getElementById('testimonialNext');
let currentTestimonial = 0;
let testimonialInterval;

function showTestimonial(index) {
    testimonialSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });

    testimonialDots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) {
            dot.classList.add('active');
        }
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
    showTestimonial(currentTestimonial);
}

function startTestimonialSlider() {
    testimonialInterval = setInterval(nextTestimonial, 5000);
}

function stopTestimonialSlider() {
    clearInterval(testimonialInterval);
}

// Event listeners
if (testimonialNext) {
    testimonialNext.addEventListener('click', () => {
        nextTestimonial();
        stopTestimonialSlider();
        startTestimonialSlider();
    });
}

if (testimonialPrev) {
    testimonialPrev.addEventListener('click', () => {
        prevTestimonial();
        stopTestimonialSlider();
        startTestimonialSlider();
    });
}

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
        stopTestimonialSlider();
        startTestimonialSlider();
    });
});

// Pause slider on hover
const testimonialsSection = document.querySelector('.testimonials-slider-wrapper');
if (testimonialsSection) {
    testimonialsSection.addEventListener('mouseenter', stopTestimonialSlider);
    testimonialsSection.addEventListener('mouseleave', startTestimonialSlider);
}

// Start testimonial slider
if (testimonialSlides.length > 0) {
    startTestimonialSlider();
}

// ============================================
// Smooth Scroll
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });

    // ============================================
    // Animated Statistics Counter
    // ============================================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const isDecimal = target % 1 !== 0;
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                if (isDecimal) {
                    element.textContent = target.toFixed(1);
                } else {
                    // Format large numbers with commas
                    const formatted = Math.floor(target).toLocaleString('en-IN');
                    element.textContent = formatted;
                }
                clearInterval(timer);
            } else {
                if (isDecimal) {
                    element.textContent = start.toFixed(1);
                } else {
                    const formatted = Math.floor(start).toLocaleString('en-IN');
                    element.textContent = formatted;
                }
            }
        }, 16);
    }

    function initStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        if (statNumbers.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const target = parseFloat(entry.target.getAttribute('data-target'));
                    entry.target.classList.add('counted');
                    animateCounter(entry.target, target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }

    // Initialize stats counter
    setTimeout(() => {
        initStatsCounter();
    }, 500);
});

// Also initialize on window load as backup
window.addEventListener('load', () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        statNumbers.forEach(stat => {
            if (!stat.classList.contains('counted')) {
                const target = parseFloat(stat.getAttribute('data-target'));
                if (target) {
                    function animateCounter(element, target, duration = 2000) {
                        let start = 0;
                        const increment = target / (duration / 16);
                        const isDecimal = target % 1 !== 0;
                        
                        const timer = setInterval(() => {
                            start += increment;
                            if (start >= target) {
                                if (isDecimal) {
                                    element.textContent = target.toFixed(1);
                                } else {
                                    const formatted = Math.floor(target).toLocaleString('en-IN');
                                    element.textContent = formatted;
                                }
                                clearInterval(timer);
                            } else {
                                if (isDecimal) {
                                    element.textContent = start.toFixed(1);
                                } else {
                                    const formatted = Math.floor(start).toLocaleString('en-IN');
                                    element.textContent = formatted;
                                }
                            }
                        }, 16);
                    }
                    
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                                entry.target.classList.add('counted');
                                animateCounter(entry.target, target);
                            }
                        });
                    }, { threshold: 0.5 });
                    
                    observer.observe(stat);
                }
            }
        });
    }
});

// ============================================
// Statistics Counter - Working Version
// ============================================
(function() {
    'use strict';
    
    function animateStatCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const isDecimal = target % 1 !== 0;
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                if (isDecimal) {
                    element.textContent = target.toFixed(1);
                } else {
                    const formatted = Math.floor(target).toLocaleString('en-IN');
                    element.textContent = formatted;
                }
                clearInterval(timer);
            } else {
                if (isDecimal) {
                    element.textContent = start.toFixed(1);
                } else {
                    const formatted = Math.floor(start).toLocaleString('en-IN');
                    element.textContent = formatted;
                }
            }
        }, 16);
    }

    function initializeStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        if (statNumbers.length === 0) {
            setTimeout(initializeStatsCounter, 500);
            return;
        }
        
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    const target = parseFloat(entry.target.getAttribute('data-target'));
                    if (!isNaN(target)) {
                        entry.target.setAttribute('data-animated', 'true');
                        animateStatCounter(entry.target, target);
                    }
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });
        
        statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeStatsCounter);
    } else {
        initializeStatsCounter();
    }

    // Also try on window load
    window.addEventListener('load', () => {
        setTimeout(initializeStatsCounter, 300);
    });
})();

// ============================================
// Scroll Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.service-card, .feature-item, .update-card, .contact-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// Contact Form Handler
// ============================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const message = formData.get('message');
    
    // Create WhatsApp message
    const whatsappMessage = `Hello, I need a taxi service.\n\nName: ${name}\nPhone: ${phone}\nService: ${service}\nMessage: ${message}`;
    const whatsappUrl = `https://wa.me/919667850650?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    showNotification('Booking request sent! We will contact you soon.', 'success');
    
    // Reset form
    contactForm.reset();
});

// ============================================
// Notification System
// ============================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#25D366' : '#FFD700'};
        color: ${type === 'success' ? '#fff' : '#000'};
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Add slide out animation
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
`;
document.head.appendChild(style);

// ============================================
// Lazy Loading for Images
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// GEO Location Detection
// ============================================
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            // Rohtak coordinates (approximate)
            const rohtakLat = 28.8955;
            const rohtakLon = 76.6066;
            
            // Calculate distance (simple approximation)
            const distance = Math.sqrt(
                Math.pow(lat - rohtakLat, 2) + Math.pow(lon - rohtakLon, 2)
            ) * 111; // Convert to km (rough approximation)
            
            if (distance < 50) {
                // User is near Rohtak
                console.log('User is near Rohtak area');
            }
        },
        (error) => {
            console.log('Geolocation error:', error);
        }
    );
}

// ============================================
// Performance Optimization
// ============================================
// Debounce function for scroll events
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    activateNavLink();
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// ============================================
// Loading Animation
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero content
    const heroContent = document.querySelector('.slide-content');
    if (heroContent) {
        heroContent.classList.add('animate-fade-in');
    }
});

// ============================================
// Statistics Counter - Working Version
// ============================================
(function() {
    'use strict';
    
    function animateStatCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const isDecimal = target % 1 !== 0;
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                if (isDecimal) {
                    element.textContent = target.toFixed(1);
                } else {
                    const formatted = Math.floor(target).toLocaleString('en-IN');
                    element.textContent = formatted;
                }
                clearInterval(timer);
            } else {
                if (isDecimal) {
                    element.textContent = start.toFixed(1);
                } else {
                    const formatted = Math.floor(start).toLocaleString('en-IN');
                    element.textContent = formatted;
                }
            }
        }, 16);
    }

    function initializeStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        if (statNumbers.length === 0) {
            setTimeout(initializeStatsCounter, 500);
            return;
        }
        
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    const target = parseFloat(entry.target.getAttribute('data-target'));
                    if (!isNaN(target)) {
                        entry.target.setAttribute('data-animated', 'true');
                        animateStatCounter(entry.target, target);
                    }
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });
        
        statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeStatsCounter);
    } else {
        initializeStatsCounter();
    }

    // Also try on window load
    window.addEventListener('load', () => {
        setTimeout(initializeStatsCounter, 300);
    });
})();

// ============================================
// Click-to-Call Enhancement
// ============================================
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Track phone clicks (analytics can be added here)
        console.log('Phone number clicked:', link.href);
    });
});

// ============================================
// WhatsApp Button Enhancement
// ============================================
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Track WhatsApp clicks (analytics can be added here)
        console.log('WhatsApp link clicked');
    });
});

// ============================================
// Animated Statistics Counter
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const isDecimal = target % 1 !== 0;
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = isDecimal ? target.toFixed(1) : Math.floor(target);
            clearInterval(timer);
        } else {
            element.textContent = isDecimal ? start.toFixed(1) : Math.floor(start);
        }
    }, 16);
}

function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseFloat(entry.target.getAttribute('data-target'));
                entry.target.classList.add('counted');
                animateCounter(entry.target, target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// Initialize stats counter on page load
window.addEventListener('load', () => {
    initStatsCounter();
});

// ============================================
// Console Welcome Message
// ============================================
console.log('%c🚕 Shri Shyam Ji Taxi Service', 'color: #FFD700; font-size: 20px; font-weight: bold;');
console.log('%cTrusted 24/7 Taxi Service in Rohtak', 'color: #666; font-size: 14px;');
console.log('%cCall: +91 9667850650', 'color: #25D366; font-size: 12px;');

// ============================================
// FAQ Accordion - Standalone Working Version
// ============================================
(function() {
    'use strict';
    
    function setupFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        if (faqItems.length === 0) {
            setTimeout(setupFAQAccordion, 500);
            return;
        }
        
        faqItems.forEach((item) => {
            const question = item.querySelector('.faq-question');
            
            if (question && !question.hasAttribute('data-faq-initialized')) {
                question.setAttribute('data-faq-initialized', 'true');
                
                question.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Toggle active class
                    item.classList.toggle('active');
                    
                    // Force reflow to ensure animation
                    void item.offsetHeight;
                });
                
                // Also make h3 clickable
                const h3 = question.querySelector('h3');
                if (h3) {
                    h3.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        item.classList.toggle('active');
                        void item.offsetHeight;
                    });
                }
            }
        });
    }
    
    // Initialize on multiple events
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupFAQAccordion);
    } else {
        setupFAQAccordion();
    }
    
    window.addEventListener('load', () => {
        setTimeout(setupFAQAccordion, 300);
    });
})();

// ============================================
// FAQ Accordion
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Toggle the clicked item only (allow multiple FAQs to be open)
                item.classList.toggle('active');
            });
        }
    });

    // ============================================
    // Animated Statistics Counter
    // ============================================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const isDecimal = target % 1 !== 0;
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                if (isDecimal) {
                    element.textContent = target.toFixed(1);
                } else {
                    // Format large numbers with commas
                    const formatted = Math.floor(target).toLocaleString('en-IN');
                    element.textContent = formatted;
                }
                clearInterval(timer);
            } else {
                if (isDecimal) {
                    element.textContent = start.toFixed(1);
                } else {
                    const formatted = Math.floor(start).toLocaleString('en-IN');
                    element.textContent = formatted;
                }
            }
        }, 16);
    }

    function initStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        if (statNumbers.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const target = parseFloat(entry.target.getAttribute('data-target'));
                    entry.target.classList.add('counted');
                    animateCounter(entry.target, target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }

    // Initialize stats counter
    setTimeout(() => {
        initStatsCounter();
    }, 500);
});

// Also initialize on window load as backup
window.addEventListener('load', () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        statNumbers.forEach(stat => {
            if (!stat.classList.contains('counted')) {
                const target = parseFloat(stat.getAttribute('data-target'));
                if (target) {
                    function animateCounter(element, target, duration = 2000) {
                        let start = 0;
                        const increment = target / (duration / 16);
                        const isDecimal = target % 1 !== 0;
                        
                        const timer = setInterval(() => {
                            start += increment;
                            if (start >= target) {
                                if (isDecimal) {
                                    element.textContent = target.toFixed(1);
                                } else {
                                    const formatted = Math.floor(target).toLocaleString('en-IN');
                                    element.textContent = formatted;
                                }
                                clearInterval(timer);
                            } else {
                                if (isDecimal) {
                                    element.textContent = start.toFixed(1);
                                } else {
                                    const formatted = Math.floor(start).toLocaleString('en-IN');
                                    element.textContent = formatted;
                                }
                            }
                        }, 16);
                    }
                    
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                                entry.target.classList.add('counted');
                                animateCounter(entry.target, target);
                            }
                        });
                    }, { threshold: 0.5 });
                    
                    observer.observe(stat);
                }
            }
        });
    }
});

// ============================================
// Statistics Counter - Working Version
// ============================================
(function() {
    'use strict';
    
    function animateStatCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const isDecimal = target % 1 !== 0;
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                if (isDecimal) {
                    element.textContent = target.toFixed(1);
                } else {
                    const formatted = Math.floor(target).toLocaleString('en-IN');
                    element.textContent = formatted;
                }
                clearInterval(timer);
            } else {
                if (isDecimal) {
                    element.textContent = start.toFixed(1);
                } else {
                    const formatted = Math.floor(start).toLocaleString('en-IN');
                    element.textContent = formatted;
                }
            }
        }, 16);
    }

    function initializeStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        if (statNumbers.length === 0) {
            setTimeout(initializeStatsCounter, 500);
            return;
        }
        
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    const target = parseFloat(entry.target.getAttribute('data-target'));
                    if (!isNaN(target)) {
                        entry.target.setAttribute('data-animated', 'true');
                        animateStatCounter(entry.target, target);
                    }
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });
        
        statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeStatsCounter);
    } else {
        initializeStatsCounter();
    }

    // Also try on window load
    window.addEventListener('load', () => {
        setTimeout(initializeStatsCounter, 300);
    });
})();

// ============================================
// Loading Animation
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero content
    const heroContent = document.querySelector('.slide-content');
    if (heroContent) {
        heroContent.classList.add('animate-fade-in');
    }
});

// ============================================
// Statistics Counter - Working Version
// ============================================
(function() {
    'use strict';
    
    function animateStatCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const isDecimal = target % 1 !== 0;
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                if (isDecimal) {
                    element.textContent = target.toFixed(1);
                } else {
                    const formatted = Math.floor(target).toLocaleString('en-IN');
                    element.textContent = formatted;
                }
                clearInterval(timer);
            } else {
                if (isDecimal) {
                    element.textContent = start.toFixed(1);
                } else {
                    const formatted = Math.floor(start).toLocaleString('en-IN');
                    element.textContent = formatted;
                }
            }
        }, 16);
    }

    function initializeStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        if (statNumbers.length === 0) {
            setTimeout(initializeStatsCounter, 500);
            return;
        }
        
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    const target = parseFloat(entry.target.getAttribute('data-target'));
                    if (!isNaN(target)) {
                        entry.target.setAttribute('data-animated', 'true');
                        animateStatCounter(entry.target, target);
                    }
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });
        
        statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeStatsCounter);
    } else {
        initializeStatsCounter();
    }

    // Also try on window load
    window.addEventListener('load', () => {
        setTimeout(initializeStatsCounter, 300);
    });
})();

// ============================================
// Click-to-Call Enhancement
// ============================================
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Track phone clicks (analytics can be added here)
        console.log('Phone number clicked:', link.href);
    });
});

// ============================================
// WhatsApp Button Enhancement
// ============================================
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Track WhatsApp clicks (analytics can be added here)
        console.log('WhatsApp link clicked');
    });
});

// ============================================
// Console Welcome Message
// ============================================
console.log('%c🚕 Shri Shyam Ji Taxi Service', 'color: #FFD700; font-size: 20px; font-weight: bold;');
console.log('%cTrusted 24/7 Taxi Service in Rohtak', 'color: #666; font-size: 14px;');
console.log('%cCall: +91 9667850650', 'color: #25D366; font-size: 12px;');

// ============================================
// FAQ Accordion - Standalone Working Version
// ============================================
(function() {
    'use strict';
    
    function setupFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        if (faqItems.length === 0) {
            setTimeout(setupFAQAccordion, 500);
            return;
        }
        
        faqItems.forEach((item) => {
            const question = item.querySelector('.faq-question');
            
            if (question && !question.hasAttribute('data-faq-initialized')) {
                question.setAttribute('data-faq-initialized', 'true');
                
                question.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Toggle active class
                    item.classList.toggle('active');
                    
                    // Force reflow to ensure animation
                    void item.offsetHeight;
                });
                
                // Also make h3 clickable
                const h3 = question.querySelector('h3');
                if (h3) {
                    h3.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        item.classList.toggle('active');
                        void item.offsetHeight;
                    });
                }
            }
        });
    }
    
    // Initialize on multiple events
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupFAQAccordion);
    } else {
        setupFAQAccordion();
    }
    
    window.addEventListener('load', () => {
        setTimeout(setupFAQAccordion, 300);
    });
})();

// ============================================
// FAQ Accordion
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Toggle the clicked item only (allow multiple FAQs to be open)
                item.classList.toggle('active');
            });
        }
    });

    // ============================================
    // Animated Statistics Counter
    // ============================================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const isDecimal = target % 1 !== 0;
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                if (isDecimal) {
                    element.textContent = target.toFixed(1);
                } else {
                    // Format large numbers with commas
                    const formatted = Math.floor(target).toLocaleString('en-IN');
                    element.textContent = formatted;
                }
                clearInterval(timer);
            } else {
                if (isDecimal) {
                    element.textContent = start.toFixed(1);
                } else {
                    const formatted = Math.floor(start).toLocaleString('en-IN');
                    element.textContent = formatted;
                }
            }
        }, 16);
    }

    function initStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        if (statNumbers.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const target = parseFloat(entry.target.getAttribute('data-target'));
                    entry.target.classList.add('counted');
                    animateCounter(entry.target, target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }

    // Initialize stats counter
    setTimeout(() => {
        initStatsCounter();
    }, 500);
});

// Also initialize on window load as backup
window.addEventListener('load', () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        statNumbers.forEach(stat => {
            if (!stat.classList.contains('counted')) {
                const target = parseFloat(stat.getAttribute('data-target'));
                if (target) {
                    function animateCounter(element, target, duration = 2000) {
                        let start = 0;
                        const increment = target / (duration / 16);
                        const isDecimal = target % 1 !== 0;
                        
                        const timer = setInterval(() => {
                            start += increment;
                            if (start >= target) {
                                if (isDecimal) {
                                    element.textContent = target.toFixed(1);
                                } else {
                                    const formatted = Math.floor(target).toLocaleString('en-IN');
                                    element.textContent = formatted;
                                }
                                clearInterval(timer);
                            } else {
                                if (isDecimal) {
                                    element.textContent = start.toFixed(1);
                                } else {
                                    const formatted = Math.floor(start).toLocaleString('en-IN');
                                    element.textContent = formatted;
                                }
                            }
                        }, 16);
                    }
                    
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                                entry.target.classList.add('counted');
                                animateCounter(entry.target, target);
                            }
                        });
                    }, { threshold: 0.5 });
                    
                    observer.observe(stat);
                }
            }
        });
    }
});

// ============================================
// Statistics Counter - Working Version
// ============================================
(function() {
    'use strict';
    
    function animateStatCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const isDecimal = target % 1 !== 0;
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                if (isDecimal) {
                    element.textContent = target.toFixed(1);
                } else {
                    const formatted = Math.floor(target).toLocaleString('en-IN');
                    element.textContent = formatted;
                }
                clearInterval(timer);
            } else {
                if (isDecimal) {
                    element.textContent = start.toFixed(1);
                } else {
                    const formatted = Math.floor(start).toLocaleString('en-IN');
                    element.textContent = formatted;
                }
            }
        }, 16);
    }

    function initializeStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        if (statNumbers.length === 0) {
            setTimeout(initializeStatsCounter, 500);
            return;
        }
        
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    const target = parseFloat(entry.target.getAttribute('data-target'));
                    if (!isNaN(target)) {
                        entry.target.setAttribute('data-animated', 'true');
                        animateStatCounter(entry.target, target);
                    }
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });
        
        statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeStatsCounter);
    } else {
        initializeStatsCounter();
    }

    // Also try on window load
    window.addEventListener('load', () => {
        setTimeout(initializeStatsCounter, 300);
    });
})();

