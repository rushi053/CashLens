document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const header = document.querySelector('.header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const faqItems = document.querySelectorAll('.faq-item');
    const testimonialControls = document.querySelectorAll('.testimonial-controls .indicator');
    const prevButton = document.querySelector('.control-prev');
    const nextButton = document.querySelector('.control-next');
    
    // Add mobile menu to DOM
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    const navLinks = document.querySelector('.nav-links').cloneNode(true);
    const ctaButton = document.querySelector('.cta-button').cloneNode(true);
    ctaButton.classList.remove('mobile-hidden');
    mobileMenu.appendChild(navLinks);
    mobileMenu.appendChild(ctaButton);
    document.body.appendChild(mobileMenu);
    
    // Handle scroll for header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        
        // Toggle hamburger
        const hamburger = this.querySelector('.hamburger');
        if (this.classList.contains('active')) {
            hamburger.style.transform = 'rotate(45deg)';
            hamburger.style.backgroundColor = 'var(--primary-color)';
            
            // Use ES6 selector properly
            const beforeElement = document.styleSheets[0].insertRule('.hamburger.active::before { transform: rotate(90deg); top: 0; }', 0);
            const afterElement = document.styleSheets[0].insertRule('.hamburger.active::after { transform: rotate(90deg); bottom: 0; }', 0);
            
            hamburger.classList.add('active');
        } else {
            hamburger.style.transform = 'rotate(0)';
            hamburger.style.backgroundColor = 'var(--text-color)';
            hamburger.classList.remove('active');
        }
    });
    
    // Close mobile menu when clicking a link
    mobileMenu.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
            document.querySelector('.hamburger').classList.remove('active');
        }
    });
    
    // FAQ accordion
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Testimonial slider
    let currentSlide = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    const totalSlides = testimonials.length;
    
    // Hide all testimonials except the first one
    for (let i = 1; i < testimonials.length; i++) {
        testimonials[i].style.display = 'none';
    }
    
    // Function to show a specific slide
    function showSlide(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
            testimonial.classList.remove('fade-in');
        });
        
        // Remove active class from all indicators
        testimonialControls.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Show the selected testimonial
        testimonials[index].style.display = 'block';
        
        // Add fade-in animation
        setTimeout(() => {
            testimonials[index].classList.add('fade-in');
        }, 50);
        
        // Add active class to the current indicator
        testimonialControls[index].classList.add('active');
        
        // Update current slide
        currentSlide = index;
    }
    
    // Event listeners for testimonial controls
    testimonialControls.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Previous button
    prevButton.addEventListener('click', () => {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) {
            newIndex = totalSlides - 1;
        }
        showSlide(newIndex);
    });
    
    // Next button
    nextButton.addEventListener('click', () => {
        let newIndex = currentSlide + 1;
        if (newIndex >= totalSlides) {
            newIndex = 0;
        }
        showSlide(newIndex);
    });
    
    // Auto-advance testimonials every 5 seconds
    const testimonialInterval = setInterval(() => {
        let newIndex = currentSlide + 1;
        if (newIndex >= totalSlides) {
            newIndex = 0;
        }
        showSlide(newIndex);
    }, 5000);
    
    // Animation for feature-dots
    const featureDots = document.querySelectorAll('.feature-dot');
    featureDots.forEach((dot, index) => {
        dot.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elementsToAnimate = document.querySelectorAll('.feature-card, .step, .testimonial, .contact-item');
        
        elementsToAnimate.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.9) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run it once on initial load
    setTimeout(animateOnScroll, 100);
}); 