// ===================================
// Lightbox Functionality
// ===================================
function openLightbox(img) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightbox.classList.add('active');
    lightboxImg.src = img.src;
    
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// ===================================
// Smooth Scrolling for anchor links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only prevent default if href is just a hash (not external)
        if (href && href.length > 1) {
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===================================
// Scroll to Top Button
// ===================================
function createScrollToTop() {
    // Create button element
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.title = 'Scroll to top';
    
    // Add styles
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'translateY(0) scale(1)';
    });
}

// ===================================
// Image Loading Animation
// ===================================
function initImageLoading() {
    const images = document.querySelectorAll('.gallery-item img');
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.95)';
        img.style.transition = 'opacity 0.5s, transform 0.5s';
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
        
        // If image already loaded (from cache)
        if (img.complete) {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        }
    });
}

// ===================================
// Intersection Observer for Animations
// ===================================
function initScrollAnimations() {
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

    // Observe gallery items
    document.querySelectorAll('.gallery-item').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(el);
    });

    // Observe other project cards
    document.querySelectorAll('.other-project-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease-out ${index * 0.15}s, transform 0.6s ease-out ${index * 0.15}s`;
        observer.observe(el);
    });

    // Observe sidebar sections
    document.querySelectorAll('.sidebar-section').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(30px)';
        el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(el);
    });
}

// ===================================
// Copy Link Functionality
// ===================================
function initCopyLink() {
    // Add copy link button to project links
    const projectLinks = document.querySelectorAll('.external-link');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Check if it's a placeholder link (#)
            if (link.getAttribute('href') === '#') {
                e.preventDefault();
                
                // Show temporary message
                const originalText = link.innerHTML;
                link.innerHTML = '<span>⚠️</span> Link belum tersedia';
                link.style.background = 'rgba(239, 68, 68, 0.2)';
                
                setTimeout(() => {
                    link.innerHTML = originalText;
                    link.style.background = '';
                }, 2000);
            }
        });
    });
}

// ===================================
// Read More Functionality (Optional)
// ===================================
function initReadMore() {
    const longTexts = document.querySelectorAll('.challenge-item p');
    
    longTexts.forEach(text => {
        if (text.innerText.length > 200) {
            const fullText = text.innerText;
            const shortText = fullText.substring(0, 200) + '...';
            
            text.setAttribute('data-full', fullText);
            text.setAttribute('data-short', shortText);
            text.innerText = shortText;
            
            const readMoreBtn = document.createElement('button');
            readMoreBtn.innerText = 'Read More';
            readMoreBtn.style.cssText = `
                color: #6366f1;
                background: none;
                border: none;
                cursor: pointer;
                font-weight: 600;
                margin-left: 5px;
            `;
            
            let expanded = false;
            readMoreBtn.addEventListener('click', () => {
                if (expanded) {
                    text.innerText = text.getAttribute('data-short');
                    readMoreBtn.innerText = 'Read More';
                    expanded = false;
                } else {
                    text.innerText = text.getAttribute('data-full');
                    readMoreBtn.innerText = ' Read Less';
                    expanded = true;
                }
                text.appendChild(readMoreBtn);
            });
            
            text.appendChild(readMoreBtn);
        }
    });
}

// ===================================
// Progress Bar on Scroll
// ===================================
function initProgressBar() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);
        z-index: 9999;
        transition: width 0.1s;
    `;
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ===================================
// Initialize All Functions
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initImageLoading();
    initScrollAnimations();
    createScrollToTop();
    initCopyLink();
    initProgressBar();
    
    // Optional: Uncomment if you want read more functionality
    // initReadMore();
    
    console.log('Project detail page initialized! 🎨');
});

// ===================================
// Performance Monitoring (Optional)
// ===================================
window.addEventListener('load', () => {
    // Log page load time
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
});