// Fubuki Soft Website Scripts
// Animations, interactivity, and dynamic elements

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Counter animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }

    // Start counter animation when the advantage section is in view
    const advantageSection = document.getElementById('advantage');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (advantageSection) {
        observer.observe(advantageSection);
    }

    // ROI Calculator functionality
    const calculateBtn = document.getElementById('calculateBtn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateROI);
    }

    function calculateROI() {
        const staffCount = parseInt(document.getElementById('staffCount').value);
        const staffCost = parseInt(document.getElementById('staffCost').value);
        const aiUnits = parseInt(document.getElementById('aiUnits').value);
        
        // Calculate costs
        const traditionalCost = staffCount * staffCost;
        const aiwanCost = aiUnits * 21600; // Based on S$1,800/mo Standard plan
        const savings = traditionalCost - aiwanCost;
        const savingsPercentage = Math.round((savings / traditionalCost) * 100);
        
        // Update results
        document.getElementById('traditionalCost').innerText = 'S$' + traditionalCost.toLocaleString();
        document.getElementById('aiwanCost').innerText = 'S$' + aiwanCost.toLocaleString();
        document.getElementById('annualSavings').innerText = 'S$' + savings.toLocaleString();
        document.getElementById('savingsPercentage').innerText = savingsPercentage + '%';
        
        // Animate the results
        const resultElements = document.querySelectorAll('.result-value');
        resultElements.forEach(element => {
            element.classList.add('highlight');
            setTimeout(() => {
                element.classList.remove('highlight');
            }, 1500);
        });
    }

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const company = document.getElementById('company').value;
            const message = document.getElementById('message').value;
            
            // Validate form (simple validation)
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Show success message (in a real implementation, this would send data to a server)
            const formElements = contactForm.elements;
            for (let i = 0; i < formElements.length; i++) {
                formElements[i].disabled = true;
            }
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Message Sent!';
            
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                for (let i = 0; i < formElements.length; i++) {
                    formElements[i].disabled = false;
                }
                submitBtn.innerText = originalText;
            }, 3000);
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonial carousel (simple version)
    const testimonials = document.querySelectorAll('.testimonial-item');
    let currentTestimonial = 0;
    
    function showNextTestimonial() {
        if (testimonials.length <= 1) return;
        
        testimonials[currentTestimonial].classList.remove('active');
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        testimonials[currentTestimonial].classList.add('active');
    }
    
    // Change testimonial every 5 seconds
    if (testimonials.length > 1) {
        setInterval(showNextTestimonial, 5000);
    }

    // Add parallax effect to hero section
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const bgElements = document.querySelector('.hero-bg-elements');
            if (bgElements) {
                bgElements.style.transform = `translateY(${scrollPosition * 0.3}px)`;
            }
        });
    }

    // Add CSS class for highlighting animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes highlight {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); color: #0D8ED9; }
            100% { transform: scale(1); }
        }
        .highlight {
            animation: highlight 1.5s ease;
        }
    `;
    document.head.appendChild(style);
});
