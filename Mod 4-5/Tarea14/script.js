document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar elementos del DOM
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    const navbarActions = document.querySelector('.navbar-actions');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('.section');

    /**
     * Toggle del menú móvil
     */
    navbarToggle.addEventListener('click', () => {
        navbarToggle.classList.toggle('active');
        navbarMenu.classList.toggle('active');
        navbarActions.classList.toggle('active');
        
        if (navbarMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    /**
     * Cerrar el menú al hacer clic en un enlace (en móviles)
     */
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarMenu.classList.contains('active')) {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
                navbarActions.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    /**
     * Cambiar el estilo de la navbar al hacer scroll
     */
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            navbar.style.background = 'rgba(26, 26, 46, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '#1a1a2e';
            navbar.style.backdropFilter = 'none';
        }
    });

    /**
     * Scroll spy - Resaltar el enlace de la sección actual
     */
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    /**
     * Cerrar el menú al hacer clic fuera de él (en móviles)
     */
    document.addEventListener('click', (e) => {
        const isClickInsideNavbar = navbar.contains(e.target);
        const isMenuOpen = navbarMenu.classList.contains('active');
        
        if (!isClickInsideNavbar && isMenuOpen) {
            navbarToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
            navbarActions.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});