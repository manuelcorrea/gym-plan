// PASSWORD GATE
const MAGIC_WORD = 'bartola';
const ACCESS_KEY = 'aquavida-access';
const gate = document.getElementById('gate');
const app = document.getElementById('app');
const input = document.getElementById('magicWord');
const enterBtn = document.getElementById('enterBtn');
const gateError = document.getElementById('gateError');

function unlockApp(skipAnimation = false) {
    if (skipAnimation) {
        gate.style.display = 'none';
        app.classList.remove('hidden');
        animateOnScroll();
        animateBreakeven();
        animateCounters();
        return;
    }

    gate.classList.add('gate-exit');
    setTimeout(() => {
        gate.style.display = 'none';
        app.classList.remove('hidden');
        animateOnScroll();
        animateBreakeven();
        animateCounters();
    }, 600);
}

function tryEnter() {
    if (input.value.toLowerCase().trim() === MAGIC_WORD) {
        sessionStorage.setItem(ACCESS_KEY, 'granted');
        gateError.textContent = '';
        unlockApp();
    } else {
        gateError.textContent = 'Palabra incorrecta. Intenta de nuevo.';
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 500);
    }
}

enterBtn.addEventListener('click', tryEnter);
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') tryEnter();
});

// MOBILE NAV
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// SCROLL ANIMATIONS
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.concept-card, .market-card, .location-card, .service-item, .price-card, .legal-card, .swot-card, .mkt-phase, .content-type, .rev-card, .mkt-tactic, .feasibility-card, .decision-card, .property-step, .scenario-card, .playbook-item').forEach(el => {
        observer.observe(el);
    });
}

// BREAKEVEN BAR ANIMATION
function animateBreakeven() {
    const bar = document.getElementById('breakevenBar');
    if (!bar) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => { bar.style.width = '75%'; }, 300);
            }
        });
    }, { threshold: 0.3 });
    observer.observe(bar);
}

// NAV SCROLL EFFECT
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// COUNTER ANIMATION
function animateCounters() {
    document.querySelectorAll('.stat-num').forEach(counter => {
        const text = counter.textContent;
        // Simple fade in for non-numeric stats
        counter.style.opacity = '0';
        setTimeout(() => {
            counter.style.opacity = '1';
            counter.style.transition = 'opacity 0.8s ease';
        }, 200);
    });
}

// GATE PARTICLES
function createParticles() {
    const container = document.querySelector('.gate-particles');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (5 + Math.random() * 10) + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particle.style.width = particle.style.height = (3 + Math.random() * 6) + 'px';
        container.appendChild(particle);
    }
}
createParticles();

if (sessionStorage.getItem(ACCESS_KEY) === 'granted') {
    unlockApp(true);
}
