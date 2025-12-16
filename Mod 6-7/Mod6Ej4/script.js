/* =====================================================
   EJERCICIO 2: NAVBAR + HERO SECTION
   Bootstrap 5 Version - JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavbarScroll();
    initAnimations();
    initSmoothScroll();
    initCounterAnimation();
});

/* ==================== NAVBAR SCROLL EFFECT ==================== */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

/* ==================== ENTRANCE ANIMATIONS ==================== */
function initAnimations() {
    // Add animation classes to elements
    const animatedElements = [
        { selector: '.hero-badge', delay: 0 },
        { selector: '.hero-content h1', delay: 100 },
        { selector: '.hero-content .lead', delay: 200 },
        { selector: '.hero-content .d-flex', delay: 300 },
        { selector: '.trust-section', delay: 400 },
        { selector: '.dashboard-card', delay: 300 },
        { selector: '.card-notifications', delay: 500 },
        { selector: '.card-performance', delay: 600 }
    ];
    
    animatedElements.forEach(({ selector, delay }) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, delay + 100);
        }
    });
}

/* ==================== SMOOTH SCROLL ==================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) bsCollapse.hide();
                }
            }
        });
    });
}

/* ==================== COUNTER ANIMATION ==================== */
function initCounterAnimation() {
    const statValues = document.querySelectorAll('.stat-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statValues.forEach(stat => observer.observe(stat));
}

function animateValue(element) {
    const text = element.textContent;
    const hasPrefix = text.startsWith('$');
    const hasSuffix = text.endsWith('%') || text.endsWith('K');
    
    let suffix = '';
    let prefix = '';
    
    if (hasPrefix) prefix = '$';
    if (text.endsWith('%')) suffix = '%';
    if (text.endsWith('K')) suffix = 'K';
    
    const numericPart = text.replace(/[$%K,]/g, '');
    const endValue = parseFloat(numericPart);
    const decimals = numericPart.includes('.') ? numericPart.split('.')[1].length : 0;
    
    let startValue = 0;
    const duration = 1500;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
        
        const currentValue = startValue + (endValue - startValue) * easeProgress;
        
        let displayValue = decimals > 0 
            ? currentValue.toFixed(decimals)
            : Math.floor(currentValue).toLocaleString();
        
        element.textContent = prefix + displayValue + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

/* ==================== PARALLAX EFFECT FOR SHAPES ==================== */
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 20;
        shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

/* ==================== CONSOLE MESSAGE ==================== */
console.log(`
%c🚀 TechStartup Landing Page
%cEjercicio 2: Navbar + Hero Section

Componentes Bootstrap utilizados:
• navbar, navbar-expand-lg, navbar-dark
• container, row, col-lg-6
• btn, btn-primary, btn-outline-light
• dropdown, dropdown-menu
• d-flex, gap-*, align-items-*

¡Explora el código fuente! 📖
`, 
'font-size: 18px; font-weight: bold; color: #6366f1;',
'font-size: 12px; color: #ffffffff;'
);