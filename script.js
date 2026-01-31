/**
 * DANILO MOTION - Premium Video Editing Website
 * JavaScript Interactions & Animations
 * 
 * Features:
 * - Custom cursor with magnetic effects
 * - Smooth scrolling with parallax
 * - Kinetic typography
 * - GSAP ScrollTrigger animations
 * - Video modal system
 * - Calendar booking widget
 * - Portfolio hover interactions
 */

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initHeroAnimations();
    initParallaxEffects();
    initPortfolioHover();
    initVideoEditingHover();
    initServiceAnimations();
    initProcessTimeline();
    initVideoModals();
    initScrollReveal();
    initLucideIcons();
});

// Initialize Lucide icons
function initLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
    const nav = document.querySelector('.main-nav');
    let lastScroll = 0;
    
    // Scroll behavior
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// ============================================
// HERO ANIMATIONS
// ============================================

function initHeroAnimations() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero entrance animation
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.from('.hero-badge', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2
    })
    .from('.headline-line-1', {
        y: 50,
        opacity: 0,
        duration: 1
    }, '-=0.4')
    .from('.headline-line-2', {
        y: 80,
        opacity: 0,
        duration: 1.2
    }, '-=0.8')
    .from('.headline-line-3', {
        y: 30,
        opacity: 0,
        duration: 0.8
    }, '-=0.6')
    .from('.hero-subline', {
        y: 20,
        opacity: 0,
        duration: 0.8
    }, '-=0.4')
    .from('.hero-cta-group', {
        y: 20,
        opacity: 0,
        duration: 0.8
    }, '-=0.4')
    .from('.stat-item', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1
    }, '-=0.4');
    
    // Scroll parallax for hero
    gsap.to('.hero-headline', {
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 100,
        opacity: 0.3
    });
    
    gsap.to('.hero-video', {
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        scale: 1.1,
        filter: 'blur(5px)'
    });
    
    // Kinetic text effect for headline
    const headlineLines = document.querySelectorAll('.headline-line');
    headlineLines.forEach(line => {
        line.addEventListener('mouseenter', () => {
            gsap.to(line, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        line.addEventListener('mouseleave', () => {
            gsap.to(line, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// ============================================
// PARALLAX EFFECTS
// ============================================

function initParallaxEffects() {
    // Portfolio items parallax
    gsap.utils.toArray('.portfolio-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                end: 'top 50%',
                scrub: 1
            },
            y: 50,
            opacity: 0.8
        });
    });
    
    // Video editing items parallax
    gsap.utils.toArray('.video-editing-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                end: 'top 50%',
                scrub: 1
            },
            y: 50,
            opacity: 0.8
        });
    });
    
    // Service cards stagger
    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '.services-container',
            start: 'top 80%'
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    });
    
    // Process timeline
    gsap.from('.timeline-item', {
        scrollTrigger: {
            trigger: '.process-timeline',
            start: 'top 80%'
        },
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // Portrait parallax
    gsap.from('.portrait-frame', {
        scrollTrigger: {
            trigger: '.process-visual',
            start: 'top 80%',
            end: 'center center',
            scrub: 1
        },
        scale: 0.9,
        opacity: 0.8
    });
}

// ============================================
// PORTFOLIO HOVER INTERACTIONS
// ============================================

function initPortfolioHover() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        const video = item.querySelector('.portfolio-video');
        
        item.addEventListener('mouseenter', () => {
            if (video) {
                video.play();
                gsap.to(video, {
                    scale: 1.05,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (video) {
                video.pause();
                video.currentTime = 0;
                gsap.to(video, {
                    scale: 1,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            }
        });
        
        // Open modal on click
        item.addEventListener('click', () => {
            const modal = document.getElementById('videoModal');
            const modalVideo = modal.querySelector('.modal-video');
            
            if (video && modalVideo) {
                modalVideo.querySelector('source').src = video.querySelector('source').src;
                modalVideo.load();
                openModal(modal);
                modalVideo.play();
            }
        });
    });
}

// ============================================
// VIDEO EDITING HOVER INTERACTIONS
// ============================================

function initVideoEditingHover() {
    const videoEditingItems = document.querySelectorAll('.video-editing-item');
    
    videoEditingItems.forEach(item => {
        const video = item.querySelector('.video-editing-video');
        
        item.addEventListener('mouseenter', () => {
            if (video) {
                video.play();
                gsap.to(video, {
                    scale: 1.05,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (video) {
                video.pause();
                video.currentTime = 0;
                gsap.to(video, {
                    scale: 1,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            }
        });
        
        // Open modal on click
        item.addEventListener('click', () => {
            const modal = document.getElementById('videoModal');
            const modalVideo = modal.querySelector('.modal-video');
            
            if (video && modalVideo) {
                modalVideo.querySelector('source').src = video.querySelector('source').src;
                modalVideo.load();
                openModal(modal);
                modalVideo.play();
            }
        });
    });
}

// ============================================
// SERVICE CARD ANIMATIONS
// ============================================

function initServiceAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const shapes = card.querySelectorAll('.abstract-shape');
        
        card.addEventListener('mouseenter', () => {
            gsap.to(shapes, {
                scale: 1.2,
                duration: 0.4,
                stagger: 0.05,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(shapes, {
                scale: 1,
                duration: 0.4,
                stagger: 0.05,
                ease: 'power2.out'
            });
        });
    });
}

// ============================================
// PROCESS TIMELINE
// ============================================

function initProcessTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        const line = item.querySelector('.timeline-line');
        
        if (line && index < timelineItems.length - 1) {
            gsap.from(line, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 70%',
                    end: 'bottom 70%',
                    scrub: 1
                },
                scaleY: 0,
                transformOrigin: 'top'
            });
        }
    });
}

// ============================================
// VIDEO MODAL SYSTEM
// ============================================

function initVideoModals() {
    const videoModal = document.getElementById('videoModal');
    
    // Showreel button
    const showreelBtn = document.querySelector('.cta-showreel');
    if (showreelBtn && videoModal) {
        showreelBtn.addEventListener('click', () => {
            const modalVideo = videoModal.querySelector('.modal-video');
            // For demo, use a sample showreel video
            modalVideo.querySelector('source').src = 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-futuristic-devices-99786-large.mp4';
            modalVideo.load();
            openModal(videoModal);
            modalVideo.play();
        });
    }
    
    // Close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.video-modal, .booking-modal');
            closeModal(modal);
        });
    });
    
    // Close on backdrop click
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
        backdrop.addEventListener('click', (e) => {
            const modal = e.target.closest('.video-modal');
            closeModal(modal);
        });
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (videoModal && videoModal.classList.contains('active')) {
                closeModal(videoModal);
            }
        }
    });
}

function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    gsap.from(modal.querySelector('.modal-content'), {
        scale: 0.9,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out'
    });
}

function closeModal(modal) {
    if (!modal) return;
    
    const video = modal.querySelector('video');
    if (video) {
        video.pause();
    }
    
    gsap.to(modal.querySelector('.modal-content'), {
        scale: 0.9,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

function initScrollReveal() {
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.section-header, .process-intro');
    
    revealElements.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
    
    // Contact section animation
    gsap.from('.contact-title', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 70%'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.calendly-container', {
        scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 80%'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
    });
    
    gsap.from('.contact-alternative', {
        scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 80%'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out'
    });
}

// ============================================
// TEXT SCRAMBLE EFFECT (KINETIC TYPOGRAPHY)
// ============================================

class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise(resolve => this.resolve = resolve);
        
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Apply scramble effect to section titles
function initTextScramble() {
    const sectionTitles = document.querySelectorAll('.section-title');
    
    sectionTitles.forEach(title => {
        const fx = new TextScramble(title);
        const originalText = title.innerText;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    fx.setText(originalText);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(title);
    });
}

// ============================================
// LOADING SCREEN
// ============================================

function initLoader() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-text">DANILO</div>
            <div class="loader-bar">
                <div class="loader-progress"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // Animate loader
    gsap.to(loader.querySelector('.loader-progress'), {
        width: '100%',
        duration: 1.5,
        ease: 'power2.inOut',
        onComplete: () => {
            gsap.to(loader, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    loader.remove();
                    initHeroAnimations();
                }
            });
        }
    });
}

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

// Intersection Observer for video lazy loading
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
            video.load();
            videoObserver.unobserve(video);
        }
    });
}, { rootMargin: '50px' });

// Observe all portfolio videos
document.querySelectorAll('.portfolio-video').forEach(video => {
    videoObserver.observe(video);
});

// Pause videos when not visible
const visibilityObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target;
        if (!entry.isIntersecting && !video.paused) {
            video.pause();
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.portfolio-video').forEach(video => {
    visibilityObserver.observe(video);
});

// ============================================
// PRELOAD HERO VIDEO
// ============================================

const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
    heroVideo.addEventListener('loadeddata', () => {
        heroVideo.classList.add('loaded');
    });
}

// Initialize additional effects after page load
window.addEventListener('load', () => {
    initTextScramble();
});

// ============================================
// REDUCED MOTION SUPPORT
// ============================================

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable complex animations for users who prefer reduced motion
    gsap.globalTimeline.pause();
    
    // Show all elements immediately
    document.querySelectorAll('.reveal, .stagger-item').forEach(el => {
        el.style.opacity = 1;
        el.style.transform = 'none';
    });
}
