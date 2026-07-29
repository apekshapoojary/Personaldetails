document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================================================
       THEME TOGGLE
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        themeIcon.className = 'fa-solid fa-sun';
    } else {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        themeIcon.className = 'fa-solid fa-moon';
    }
    
    // Toggle theme function
    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            themeIcon.className = 'fa-solid fa-sun';
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeIcon.className = 'fa-solid fa-moon';
            localStorage.setItem('theme', 'dark');
        }
    });

    /* ==========================================================================
       HAMBURGER MENU
       ========================================================================== */
    const hamburger = document.getElementById('hamburger-menu');
    const navbar = document.getElementById('navbar');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navbar.classList.toggle('active');
    });
    
    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navbar.classList.remove('active');
        });
    });

    /* ==========================================================================
       ACTIVE SCROLL LINK (SCROLL SPY)
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Highlight a bit before the section reaches the top
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       ANIMATE PROGRESS BARS ON SCROLL
       ========================================================================== */
    const progressBars = document.querySelectorAll('.progress-bar-fill');
    const languageSection = document.getElementById('languages');
    
    let animated = false;
    
    const animateBars = () => {
        const sectionPos = languageSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight;
        
        if (sectionPos < screenPos - 100 && !animated) {
            progressBars.forEach(bar => {
                // Get target class percentage
                if (bar.classList.contains('fill-100')) {
                    bar.style.width = '100%';
                } else if (bar.classList.contains('fill-80')) {
                    bar.style.width = '80%';
                } else if (bar.classList.contains('fill-60')) {
                    bar.style.width = '60%';
                }
            });
            animated = true;
        }
    };
    
    // Set initial widths to 0 for transition effect
    progressBars.forEach(bar => {
        bar.style.width = '0%';
    });
    
    // Trigger on scroll and page load
    window.addEventListener('scroll', animateBars);
    animateBars();



    /* ==========================================================================
       BACK TO TOP BUTTON
       ========================================================================== */
    const backToTopBtn = document.getElementById('back-to-top-btn');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 400) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.pointerEvents = 'auto';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.pointerEvents = 'none';
        }
    });
});
