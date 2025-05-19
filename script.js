// Navigation burger menu
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('nav-active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && nav.classList.contains('nav-active')) {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
        navLinks.forEach(link => {
            link.style.animation = '';
        });
    }
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
        navLinks.forEach(link => {
            link.style.animation = '';
        });
    });
});

// Add smooth scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Stats counter animation
const stats = document.querySelectorAll('.stat-item h3');
let animated = false;

function animateStats() {
    if (animated) return;
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let count = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        
        const updateCount = () => {
            count += increment;
            if (count < target) {
                stat.textContent = Math.floor(count);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCount();
    });
    
    animated = true;
}

// Trigger stats animation when in viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
        }
    });
});

document.querySelector('.stats').forEach(stat => {
    observer.observe(stat);
});