// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link or button
document.querySelectorAll('.nav-link, .nav-btn').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));



// Smooth scrolling for navigation links - FULL PAGE VIEW
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            // For home section - go to absolute top
            if (targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // For ALL other sections - scroll to EXACT start (FULL PAGE)
                const targetPosition = target.offsetTop;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Navbar background on scroll - REMOVED to keep consistent color

// Animate skill bars when in view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            });
        }
    });
}, observerOptions);

// Observe the about section
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    observer.observe(aboutSection);
}

// Contact form is handled by EmailJS in HTML - removed duplicate

// Add loading animation and error handling
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('Portfolio loaded successfully');

    // Start typewriter animation
    startTypewriterAnimation();
});

// Error handling for resources
window.addEventListener('error', (e) => {
    console.error('Resource loading error:', e.target.src || e.target.href);
});

// Prevent form resubmission on reload
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Typewriter animation function
function startTypewriterAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const text = "Tech Stack: React | Node.js | MongoDB | Express | Tailwind CSS";
    let index = 0;
    let isDeleting = false;
    let currentText = '';

    function typeWriter() {
        if (!isDeleting) {
            // Typing
            currentText = text.substring(0, index + 1);
            index++;

            if (index === text.length) {
                // Finished typing, wait then start deleting
                setTimeout(() => {
                    isDeleting = true;
                }, 2000); // Wait 2 seconds before deleting
            }
        } else {
            // Deleting
            currentText = text.substring(0, index - 1);
            index--;

            if (index === 0) {
                // Finished deleting, start typing again
                isDeleting = false;
                setTimeout(() => {
                    typeWriter();
                }, 500); // Wait 0.5 seconds before typing again
                return;
            }
        }

        typingElement.textContent = currentText;

        // Set different speeds for typing and deleting (faster speeds)
        const speed = isDeleting ? 30 : 60;
        setTimeout(typeWriter, speed);
    }

    // Start the animation after a delay
    setTimeout(() => {
        typeWriter();
    }, 1500);
}

// Optimized parallax effect - single scroll listener
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;

    // Hero parallax
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }

    // About parallax
    const about = document.querySelector('.about');
    if (about) {
        about.style.transform = `translateY(${scrolled * 0.05}px)`;
    }

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

