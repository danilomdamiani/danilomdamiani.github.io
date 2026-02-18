/**
 * DANILO MOTION - Premium Video Editing Website
 * Optimized JavaScript for Performance
 */

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initVideoLazyLoading();
    initPortfolioHover();
    initVideoEditingHover();
    initVideoModals();
    initSnakeGame();
    initLucideIcons();
    
    // Initialize GSAP only if not preferring reduced motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        initHeroAnimations();
        initParallaxEffects();
        initScrollReveal();
    }
});

// ============================================
// VIDEO THUMBNAIL LOADING
// ============================================

function initVideoLazyLoading() {
    const videos = document.querySelectorAll('.portfolio-video, .video-editing-video');

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;

            if (entry.isIntersecting) {
                // Load video only when 50% visible
                if (video.readyState === 0 && video.dataset.src) {
                    video.src = video.dataset.src;
                    video.load();
                }
            } else {
                // Pause when out of viewport
                if (!video.paused) {
                    video.pause();
                    video.currentTime = 0;
                }
            }
        });
    }, {
        rootMargin: '50px',
        threshold: 0.5
    });

    videos.forEach(video => videoObserver.observe(video));
}

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
    const nav = document.querySelector('.main-nav');
    let ticking = false;
    
    // Optimized scroll handler with requestAnimationFrame
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > 100) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
                
                ticking = false;
            });
            ticking = true;
        }
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
// HERO ANIMATIONS (Lightweight)
// ============================================

function initHeroAnimations() {
    if (typeof gsap === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Simplified hero entrance animation
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    
    // Set visibility visible before animating
    gsap.set(['.headline-line', '.hero-subline', '.hero-cta-group', '.stat-item'], { visibility: 'visible' });
    
    tl.from('.headline-line-1', { y: 30, opacity: 0, duration: 0.6 })
      .from('.headline-line-2', { y: 30, opacity: 0, duration: 0.6 }, '-=0.3')
      .from('.headline-line-3', { y: 30, opacity: 0, duration: 0.6 }, '-=0.3')
      .from('.hero-subline', { y: 20, opacity: 0, duration: 0.5 }, '-=0.2')
      .from('.hero-cta-group', { y: 20, opacity: 0, duration: 0.5 }, '-=0.2')
      .from('.stat-item', { y: 20, opacity: 0, duration: 0.4, stagger: 0.1 }, '-=0.2');
}

// ============================================
// PARALLAX EFFECTS (Optimized)
// ============================================

function initParallaxEffects() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    
    // Batch animations for better performance
    const portfolioItems = gsap.utils.toArray('.portfolio-item');
    const videoEditingItems = gsap.utils.toArray('.video-editing-item');
    
    // Use batch for better performance
    ScrollTrigger.batch([...portfolioItems, ...videoEditingItems], {
        onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }),
        onLeaveBack: batch => gsap.to(batch, { opacity: 0.8, y: 20, duration: 0.4 }),
        start: 'top 85%',
        end: 'bottom 15%',
        toggleActions: 'play none none reverse'
    });
}

// ============================================
// PORTFOLIO HOVER INTERACTIONS
// ============================================

function initPortfolioHover() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioItems.forEach(item => {
        const video = item.querySelector('.portfolio-video');
        const wistiaId = item.dataset.wistia;

        item.addEventListener('mouseenter', () => {
            if (video && video.readyState >= 2) {
                video.play().catch(() => {});
            }
        });

        item.addEventListener('mouseleave', () => {
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        });

        item.addEventListener('click', () => {
            if (wistiaId) {
                openWistiaModal(wistiaId);
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
        const wistiaId = item.dataset.wistia;
        const isVertical = item.dataset.orientation === 'vertical';

        item.addEventListener('mouseenter', () => {
            if (video && video.readyState >= 2) {
                video.play().catch(() => {});
            }
        });

        item.addEventListener('mouseleave', () => {
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        });

        item.addEventListener('click', () => {
            if (wistiaId) {
                openWistiaModal(wistiaId, isVertical);
            }
        });
    });
}

// ============================================
// VIDEO MODAL SYSTEM
// ============================================

function initVideoModals() {
    const videoModal = document.getElementById('videoModal');
    
    if (!videoModal) return;
    
    // Showreel button
    const showreelBtn = document.querySelector('.cta-showreel');
    if (showreelBtn) {
        showreelBtn.addEventListener('click', () => {
            openShowreelModal();
        });
    }
    
    // Close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.video-modal');
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
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeModal(videoModal);
        }
    });
}

function openWistiaModal(mediaId, isVertical = false) {
    const modal = document.getElementById('videoModal');
    const container = document.getElementById('wistiaContainer');
    
    // Clear previous content and reset classes
    container.innerHTML = '';
    container.className = 'modal-video-container' + (isVertical ? ' vertical' : '');
    
    // Adjust padding based on orientation (16:9 for horizontal, 9:16 for vertical)
    const padding = isVertical ? '177.78%' : '56.25%';
    
    // Create Wistia embed HTML with responsive padding
    const wistiaHTML = `
        <div class="wistia_responsive_padding" style="padding:${padding} 0 0 0;position:relative;width:100%;">
            <div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;">
                <div class="wistia_embed wistia_async_${mediaId} seo=true videoFoam=true" style="height:100%;width:100%;"></div>
            </div>
        </div>
    `;
    
    container.innerHTML = wistiaHTML;
    
    // Initialize Wistia player
    if (window._wq) {
        window._wq.push({
            id: mediaId,
            options: {
                autoPlay: true,
                fullscreenButton: true,
                playbar: true,
                controlsVisibleOnLoad: true
            }
        });
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    if (!modal) return;
    
    const container = document.getElementById('wistiaContainer');
    
    // Remove the player completely
    if (container) {
        container.innerHTML = '';
    }
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function openShowreelModal() {
    // Open the intro video with the wistia ID ix59z2nms7
    openWistiaModal('ix59z2nms7');
}

// ============================================
// SCROLL REVEAL ANIMATIONS (Optimized)
// ============================================

function initScrollReveal() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    
    const revealElements = document.querySelectorAll('.section-header, .about-content');
    
    revealElements.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
                once: true // Only animate once for performance
            },
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
}

// ============================================
// SNAKE GAME MODAL
// ============================================

function initSnakeGame() {
    const trigger = document.getElementById('snakeGameTrigger');
    const modal = document.getElementById('snakeModal');
    const closeBtn = document.getElementById('snakeModalClose');
    const container = document.getElementById('snakeGameContainer');
    
    if (!trigger || !modal || !container) return;
    
    let gameLoaded = false;
    
    // Open modal on click
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Load game only when first opened
        if (!gameLoaded) {
            loadSnakeGame(container);
            gameLoaded = true;
        }
    });
    
    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            closeSnakeModal(modal);
        });
    }
    
    // Close on backdrop click
    const backdrop = modal.querySelector('.modal-backdrop');
    if (backdrop) {
        backdrop.addEventListener('click', () => {
            closeSnakeModal(modal);
        });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeSnakeModal(modal);
        }
    });
}

function loadSnakeGame(container) {
    // Create iframe to load the snake game
    const iframe = document.createElement('iframe');
    iframe.src = 'snake/index.html';
    iframe.width = '400';
    iframe.height = '320';
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('scrolling', 'no');
    iframe.style.borderRadius = '8px';
    iframe.setAttribute('tabindex', '0');
    iframe.setAttribute('allow', 'fullscreen');
    
    // Clear container and add iframe
    container.innerHTML = '';
    container.appendChild(iframe);
    
    // Focus the iframe once it's loaded
    iframe.addEventListener('load', () => {
        iframe.focus();
    });
    
    // Also focus after a longer delay as a fallback
    setTimeout(() => {
        iframe.focus();
    }, 500);
}

function closeSnakeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================
// LUCIDE ICONS
// ============================================

function initLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// ============================================
// CLEANUP ON PAGE HIDE
// ============================================

// Pause all videos when page is hidden
document.addEventListener('visibilitychange', () => {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (document.hidden) {
            video.pause();
        }
    });
});
