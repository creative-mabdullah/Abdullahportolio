document.addEventListener("DOMContentLoaded", () => {
    // --- Lenis Smooth Scroll Initialization ---
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // --- Preloader Logic (4s) ---
    const preloader = document.getElementById("preloader");
    const app = document.getElementById("app");

    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';

        // Show main app
        app.classList.remove("hidden");

        // Trigger initial animations
        initAnimations();

        // After 1s, remove preloader from DOM to clean up
        setTimeout(() => {
            if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
        }, 1000);

    }, 2500); // 4 seconds requirement

    // --- Typing Effect (Hero Section) ---
    const typingText = document.querySelector(".typing-text");
    if (typingText) {
        const words = ["SEO Specialist", "E-Commerce Specialist", "Web Developer", "Digital Marketing"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typingText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before new word
            }

            setTimeout(typeEffect, typeSpeed);
        }

        setTimeout(typeEffect, 1500); // Start after preloader
    }


    // --- Theme Toggle ---
    const themeBtn = document.getElementById("theme-btn");
    const htmlElem = document.documentElement;

    // System preference fallback skipped, prompt asked for dark mode default
    // It's set to dark in html tag
    themeBtn.addEventListener("click", () => {
        const currentTheme = htmlElem.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        htmlElem.setAttribute("data-theme", newTheme);
    });


    // --- Data Injection (Skills & Services) ---
    const skillsData = [
        { name: "Web Dev", percent: 95, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: "SEO", percent: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg' },
        { name: "Graphic Design", percent: 95, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' },
        { name: "Figma", percent: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
        { name: "Video Editing", percent: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-plain.svg' },
        { name: "Digital Marketing", percent: 92, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg' },
        { name: "Social Media Ads", percent: 92, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg' },
        { name: "Amazon Listing Images", percent: 88, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
        { name: "Business Strategy", percent: 88, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg' },

    ];

    const servicesData = [
        { title: "Frontend Dev", icon: "fa-solid fa-code", desc: "Building responsive, modern, and interactive web interfaces perfectly tailored to your needs." },
        { title: "Web Designing", icon: "fa-solid fa-pen-nib", desc: "Crafting beautiful, user-centric web designs with an emphasis on seamless user experiences." },
        { title: "Graphic Design", icon: "fa-solid fa-palette", desc: "Creating visually stunning graphics, logos, and branding materials that stand out." },
        { title: "Video Editing", icon: "fa-solid fa-film", desc: "Professional video editing, cutting, and effects to make your content engaging." },
        { title: "SMM", icon: "fa-solid fa-share-nodes", desc: "Strategic Social Media Marketing to boost engagement and grow your audience organically." },
        { title: "SEO", icon: "fa-solid fa-magnifying-glass-chart", desc: "Optimizing website architecture and content to rank higher on search engines and drive traffic." }
    ];

    const skillsContainer = document.getElementById("skills-container");
    skillsData.forEach((skill, index) => {
        const delay = index * 100; // stagger effect
        const html = `
            <div class="skill-card fade-up" style="transition-delay: ${delay}ms;">
                <div class="skill-header">
                    <div class="skill-title-block">
                        <img src="${skill.icon}" alt="${skill.name}" class="skill-icon">
                        <span class="skill-name">${skill.name}</span>
                    </div>
                    <span class="skill-percent-text">${skill.percent}%</span>
                </div>
                <div class="skill-progress-bar">
                    <div class="skill-progress-fill" style="width: 0%" data-target="${skill.percent}%"></div>
                </div>
            </div>
        `;
        skillsContainer.insertAdjacentHTML('beforeend', html);
    });

    const servicesContainer = document.getElementById("services-container");
    servicesData.forEach((service, index) => {
        const delay = index * 150;
        const html = `
            <div class="service-card fade-up" style="transition-delay: ${delay}ms;">
                <i class="${service.icon} service-icon"></i>
                <h3 class="service-title">${service.title}</h3>
                <p class="service-desc">${service.desc}</p>
            </div>
        `;
        servicesContainer.insertAdjacentHTML('beforeend', html);
    });


    // --- Scroll Animations & Interactivity ---

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");

                // Trigger progress bar animations if it's the skills section
                if (entry.target.classList.contains("skills-section") || entry.target.id === "skills-container") {
                    setTimeout(() => {
                        const progressFills = document.querySelectorAll('.skill-progress-fill');
                        progressFills.forEach(fill => {
                            const targetPath = fill.getAttribute('data-target');
                            fill.style.width = targetPath;
                        });
                    }, 300);
                }
            }
        });
    }, observerOptions);

    function initAnimations() {
        // Observe all fade-up elements
        document.querySelectorAll('.fade-up').forEach(el => animateOnScroll.observe(el));
        // Observe skill container specifically to trigger bars
        const skillContainer = document.getElementById("skills-container");
        if (skillContainer) animateOnScroll.observe(skillContainer);

        // Force trigger for elements already in viewport
        setTimeout(() => {
            document.querySelectorAll('.fade-up').forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    el.classList.add('animate');
                }
            });
        }, 300);
    }


    // --- Scroll to Top & Navbar hide on scroll ---
    const scrollTopBtn = document.getElementById('scroll-top');
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        // Show/hide scroll to top
        if (currentScroll > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }

        // Hide navbar on scroll down, show on scroll up
        if (currentScroll > 100 && currentScroll > lastScroll) {
            header.classList.add('hidden-nav');
        } else {
            header.classList.remove('hidden-nav');
        }

        // Active links logic
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-item');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (currentScroll >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        lastScroll = currentScroll;
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Dynamic Testimonials Logic ---
    const testimonialsData = [
        {
            text: "Honest words from happy clients reflecting creativity, quality, and dedication behind every successful project delivered.",
            name: "James Wilson",
            role: "Founder & CEO",
            img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop"
        },
        {
            text: "An absolute pleasure to work with. The attention to detail and design aesthetic completely transformed our brand's online presence.",
            name: "Sarah Jenkins",
            role: "Marketing Director",
            img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop"
        },
        {
            text: "Exceptional service from start to finish. The final product exceeded our expectations and was delivered ahead of schedule.",
            name: "Michael Chen",
            role: "Startup Founder",
            img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop"
        }
    ];

    const reviewSlider = document.getElementById("review-slider");

    // Function to render a single review
    function renderReview(review, isActive = false) {
        return `
            <div class="review-item ${isActive ? 'active' : ''}">
                <p class="review-text">"${review.text}"</p>
                <div class="reviewer">
                    <img src="${review.img}" alt="${review.name}" class="reviewer-img">
                    <div class="reviewer-info">
                        <h4>${review.name}</h4>
                        <p>${review.role}</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Initial render
    if (reviewSlider) {
        reviewSlider.innerHTML = testimonialsData.map((review, i) => renderReview(review, i === 0)).join('');

        let currentReviewIdx = 0;
        const reviewItems = reviewSlider.querySelectorAll('.review-item');

        // Auto rotate every 5 seconds
        setInterval(() => {
            // Remove active class from current
            reviewItems[currentReviewIdx].classList.remove('active');

            // Increment index
            currentReviewIdx = (currentReviewIdx + 1) % reviewItems.length;

            // Add active class to new
            reviewItems[currentReviewIdx].classList.add('active');
        }, 5000);
    }


    // --- AI Agent Icon Click (Future n8n implementation stub) ---
    const agentBtn = document.getElementById('agent-btn');
    agentBtn.addEventListener('click', () => {
        // alert or visual feedback indicating agent launch
        alert("AI Agent feature coming soon! (n8n backend integration pending)");
    });

});



const form = document.getElementById('form');

if (form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const formMessage = document.getElementById('form-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = "Sending...";
        submitBtn.disabled = true;

        if (formMessage) {
            formMessage.classList.add('hidden');
            formMessage.classList.remove('success', 'error');
        }

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                if (formMessage) {
                    formMessage.innerHTML = "Success! Your message has been sent.";
                    formMessage.classList.remove('hidden');
                    formMessage.classList.add('success');
                }
                form.reset();
            } else {
                if (formMessage) {
                    formMessage.innerHTML = "Error: " + data.message;
                    formMessage.classList.remove('hidden');
                    formMessage.classList.add('error');
                }
            }

        } catch (error) {
            if (formMessage) {
                formMessage.innerHTML = "Something went wrong. Please try again.";
                formMessage.classList.remove('hidden');
                formMessage.classList.add('error');
            }
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            // Auto-hide the message after 3 seconds
            setTimeout(() => {
                if (formMessage) {
                    formMessage.classList.add('hidden');
                    formMessage.classList.remove('success', 'error');
                }
            }, 3000);
        }
    });
}
