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
       3D INTERACTIVE PARTICLE BACKGROUND
       ========================================================================== */
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Track window resize
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
    
    const numParticles = 80;
    const particles = [];
    
    // Mouse interaction states
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    
    window.addEventListener('mousemove', (e) => {
        // Normalize mouse coordinates to center of screen (-1 to 1)
        targetMouseX = (e.clientX - width / 2) / (width / 2);
        targetMouseY = (e.clientY - height / 2) / (height / 2);
    });
    
    window.addEventListener('mouseleave', () => {
        targetMouseX = 0;
        targetMouseY = 0;
    });
    
    // Create 3D particles
    for (let i = 0; i < numParticles; i++) {
        particles.push({
            // Coordinate range relative to screen center
            x: (Math.random() - 0.5) * 2000,
            y: (Math.random() - 0.5) * 2000,
            z: Math.random() * 1000, // Depth
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            vz: Math.random() * 0.8 + 0.2, // Speed moving forward
            colorType: Math.random() > 0.5 ? 'accent1' : 'accent2'
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Check if dark mode is active
        const isDark = document.body.classList.contains('dark-theme');
        
        // Define colors based on active theme
        // Accent 1: Cyan (Dark) / Blue (Light)
        // Accent 2: Purple (Dark) / Light Purple (Light)
        const colorAccent1 = isDark ? [0, 242, 254] : [2, 132, 199];
        const colorAccent2 = isDark ? [157, 78, 221] : [124, 58, 237];
        
        // Smoothly interpolate mouse movement
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;
        
        // Update and project particles
        const projected = [];
        const scale = 800; // Perspective zoom factor
        
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            // Move particle forward in Z space
            p.z -= p.vz;
            p.x += p.vx;
            p.y += p.vy;
            
            // Recycle particle if it gets too close to the screen
            if (p.z <= 10) {
                p.z = 1000;
                p.x = (Math.random() - 0.5) * 2000;
                p.y = (Math.random() - 0.5) * 2000;
            }
            
            // Project 3D coordinates onto 2D viewport
            // Include a parallax offset based on depth (z)
            const px = (p.x / p.z) * scale + width / 2 - (mouseX * 150 * (1 - p.z / 1000));
            const py = (p.y / p.z) * scale + height / 2 - (mouseY * 150 * (1 - p.z / 1000));
            
            // Size & opacity based on Z depth
            const radius = Math.max(0.1, (1 - p.z / 1000) * 3);
            const opacity = Math.max(0.01, (1 - p.z / 1000) * 0.25);
            
            projected.push({
                x: px,
                y: py,
                z: p.z,
                radius: radius,
                opacity: opacity,
                color: p.colorType === 'accent1' ? colorAccent1 : colorAccent2
            });
        }
        
        // Draw connection lines in 3D depth range
        for (let i = 0; i < projected.length; i++) {
            const p1 = projected[i];
            if (p1.x < 0 || p1.x > width || p1.y < 0 || p1.y > height) continue;
            
            for (let j = i + 1; j < projected.length; j++) {
                const p2 = projected[j];
                
                // Only connect points close in 3D depth and viewport space
                const depthDiff = Math.abs(p1.z - p2.z);
                if (depthDiff > 100) continue;
                
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 120) {
                    const lineOpacity = (1 - dist / 120) * 0.08 * (1 - (p1.z + p2.z) / 2000);
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(${(p1.color[0] + p2.color[0])/2}, ${(p1.color[1] + p2.color[1])/2}, ${(p1.color[2] + p2.color[2])/2}, ${lineOpacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        
        // Draw particles
        for (let i = 0; i < projected.length; i++) {
            const p = projected[i];
            if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) continue;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${p.opacity})`;
            ctx.fill();
        }
        
        requestAnimationFrame(animate);
    }
    
    // Start animation loop
    animate();

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
