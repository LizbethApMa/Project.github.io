/* =====================================================
   EJERCICIO 1: GALERÍA DE BOTONES
   JavaScript - Interactividad
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCopyButtons();
    initScrollAnimations();
});

/* ==================== NAVIGATION ==================== */
function initNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const sections = document.querySelectorAll('.framework-section');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const framework = tab.dataset.framework;
            
            // Update active tab
            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show corresponding section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === `${framework}-section`) {
                    section.classList.add('active');
                }
            });
            
            // Smooth scroll to top of content
            document.querySelector('.main-content').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

/* ==================== COPY BUTTONS ==================== */
function initCopyButtons() {
    // Function is called inline from HTML
}

function copyCode(button) {
    const codeBlock = button.closest('.demo-code').querySelector('code');
    const text = codeBlock.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        // Visual feedback
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="bi bi-check"></i> Copiado!';
        button.classList.add('copied');
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Error al copiar:', err);
        
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            button.innerHTML = '<i class="bi bi-check"></i> Copiado!';
            button.classList.add('copied');
            
            setTimeout(() => {
                button.innerHTML = '<i class="bi bi-clipboard"></i> Copiar';
                button.classList.remove('copied');
            }, 2000);
        } catch (e) {
            console.error('Fallback copy failed:', e);
        }
        
        document.body.removeChild(textarea);
    });
}

/* ==================== SCROLL ANIMATIONS ==================== */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all content sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });
    
    // Add animate-in class handler
    document.querySelectorAll('.content-section').forEach(section => {
        section.addEventListener('transitionend', () => {
            if (section.classList.contains('animate-in')) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    });
}

// Add CSS for animate-in
const style = document.createElement('style');
style.textContent = `
    .content-section.animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

/* ==================== SMOOTH SCROLL FOR ANCHOR LINKS ==================== */
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

/* ==================== KEYBOARD NAVIGATION ==================== */
document.addEventListener('keydown', (e) => {
    const navTabs = document.querySelectorAll('.nav-tab');
    const activeIndex = Array.from(navTabs).findIndex(tab => tab.classList.contains('active'));
    
    if (e.key === 'ArrowLeft' && activeIndex > 0) {
        navTabs[activeIndex - 1].click();
    } else if (e.key === 'ArrowRight' && activeIndex < navTabs.length - 1) {
        navTabs[activeIndex + 1].click();
    }
});

/* ==================== TOOLTIP FOR COPY BUTTONS ==================== */
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.setAttribute('title', 'Copiar código al portapapeles');
});

/* ==================== CONSOLE WELCOME MESSAGE ==================== */
console.log(`
%c🎨 Ejercicio 1: Galería de Botones
%cBootstrap 5 vs Tailwind CSS

Aprende a crear botones profesionales con ambos frameworks.
Usa las flechas ← → para navegar entre secciones.

¡Happy coding! 🚀
`, 
'font-size: 16px; font-weight: bold; color: #7952b3;',
'font-size: 12px; color: #94a3b8;'
);