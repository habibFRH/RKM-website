        const canvasContainer = document.getElementById('canvas-container');
        const cursorDot = document.querySelector('.custom-cursor-dot');
        const cursorOutline = document.querySelector('.custom-cursor-outline');

        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            if (canvasContainer) {
                canvasContainer.style.setProperty('--mouse-x', x + '%');
                canvasContainer.style.setProperty('--mouse-y', y + '%');
            }

            // Custom cursor move
            if (cursorDot && cursorOutline) {
                gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0 });
                gsap.to(cursorOutline, { x: e.clientX, y: e.clientY, duration: 0.15 });
            }
        });

        // Magnetic and hover effects for links & buttons
        document.querySelectorAll('a, button, .rkms-slider, .rkm-stack-section').forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (cursorOutline) gsap.to(cursorOutline, { scale: 1.5, duration: 0.3 });
            });
            el.addEventListener('mouseleave', () => {
                if (cursorOutline) gsap.to(cursorOutline, { scale: 1, duration: 0.3 });
            });
        });

        const ctaBtn = document.querySelector('.hero .cta-btn');
        if (ctaBtn) {
            ctaBtn.addEventListener('mousemove', (e) => {
                const rect = ctaBtn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(ctaBtn, {
                    x: x * 0.35,
                    y: y * 0.35,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });
            ctaBtn.addEventListener('mouseleave', () => {
                gsap.to(ctaBtn, { x: 0, y: 0, duration: 0.4, ease: "power2.out" });
            });
        }

        // ===== THREE.JS SHAPES CODE - COMMENTED OUT FOR REMAKE =====
        /*
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        canvasContainer.appendChild(renderer.domElement);
        
        const geometry1 = new THREE.IcosahedronGeometry(1.6, 2);
        const geometry3 = new THREE.TetrahedronGeometry(1, 0);
        const geometry2 = new THREE.OctahedronGeometry(1.8, 0);
        
        const material = new THREE.MeshBasicMaterial({
            color: 0xfc4103,
            wireframe: true,
            transparent: true,
            opacity: 0.7
        });
        
        const mesh1 = new THREE.Mesh(geometry1, material);
        const mesh2 = new THREE.Mesh(geometry2, material);
        const mesh3 = new THREE.Mesh(geometry3, material);
        
        scene.add(mesh1, mesh2, mesh3);
        camera.position.y = 1;
        camera.position.z = 6;
        
        let mouseX = 0;
        let mouseY = 0;
        let scrollY = 0;
        
        window.addEventListener('scroll', () => {
            scrollY = window.scrollY;
        });
        
        function animate() {
            requestAnimationFrame(animate);
            const scrollProgress = Math.min(scrollY / window.innerHeight, 1);
            
            mesh1.rotation.x += 0.005;
            mesh1.rotation.y += 0.005;
            mesh2.rotation.x -= 0.003;
            mesh2.rotation.y += 0.007;
            mesh3.rotation.x += 0.004;
            mesh3.rotation.z += 0.006;
            
            mesh1.position.x = -3 + mouseX * 0.5 - scrollProgress * 4;
            mesh1.position.y = 1 + mouseY * 0.5 + scrollProgress * 3;
            mesh1.scale.setScalar(1 + scrollProgress * 2);
            mesh2.position.x = 3 + mouseX * 0.3 + scrollProgress * 5;
            mesh2.position.y = -1 + mouseY * 0.3 - scrollProgress * 2;
            mesh2.scale.setScalar(1 + scrollProgress * 1.5);
            mesh3.position.x = mouseX * 0.4 + scrollProgress * 2;
            mesh3.position.y = 3.5 + mouseY * 0.4 + scrollProgress * 4;
            mesh3.position.z = -2 - scrollProgress * 3;
            mesh3.scale.setScalar(1 + scrollProgress * 2.5);
            material.opacity = 0.3 - scrollProgress * 0.25;
            renderer.render(scene, camera);
        }
        animate();
        
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
        */
        // ===== END OF COMMENTED THREE.JS CODE =====

        // Overlay cards scroll animation
const overlaySection = document.querySelector('.overlay-cards-section');
const card2 = document.querySelector('.card-2');

function updateCardOverlay() {
    if (overlaySection && card2) {
        const rect = overlaySection.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Start animation when section enters viewport
        if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
            // Calculate progress (0 to 1) based on scroll through section
            const scrollProgress = Math.max(0, Math.min(1, 
                (windowHeight - sectionTop) / (windowHeight + sectionHeight / 2)
            ));
            
            // Move card 2 from 100% down to 0% (fully overlapping card 1)
            const translateY = 125 - (scrollProgress * 100);
            card2.style.transform = `translateY(${translateY}%)`;
        }
    }
}

window.addEventListener('scroll', updateCardOverlay);
updateCardOverlay(); // Initial call

// Handle window resize for Three.js (if it's active)
window.addEventListener('resize', () => {
    if (typeof camera !== 'undefined' && typeof renderer !== 'undefined') {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});

// Smooth scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .timeline-item, .culture-card, .client-logo').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenuEl = document.querySelector('.mobile-menu');
const themeToggleBtn = document.querySelector('.theme-toggle');

if (hamburger && mobileMenuEl) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenuEl.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    mobileMenuEl.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuEl.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ===== LOGO SCROLL ROTATION =====
(function initLogoRotation() {
    const logoImg = document.getElementById('nav-logo-img');
    if (!logoImg) return;

    const heroSection = document.getElementById('home');
    const getThreshold = () => heroSection ? heroSection.offsetHeight * 0.3 : window.innerHeight * 0.3;

    function onLogoScroll() {
        if (window.scrollY > getThreshold()) {
            logoImg.classList.add('logo-rotated');
        } else {
            logoImg.classList.remove('logo-rotated');
        }
    }

    window.addEventListener('scroll', onLogoScroll, { passive: true });
    onLogoScroll();
})();

// Theme toggle
function applyTheme(theme) {
    const signatureImage = document.getElementById('signature-image');
    if (theme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        if (themeToggleBtn) {
            themeToggleBtn.textContent = '🌙';
            themeToggleBtn.setAttribute('aria-label', 'Switch to dark theme');
        }
        if (signatureImage) {
            signatureImage.src = './RKM Signature Grey.svg';
        }
    } else {
        document.body.removeAttribute('data-theme');
        if (themeToggleBtn) {
            themeToggleBtn.textContent = '☀️';
            themeToggleBtn.setAttribute('aria-label', 'Switch to light theme');
        }
        if (signatureImage) {
            signatureImage.src = './RKM Signature White.svg';
        }
    }
}

const savedTheme = localStorage.getItem('theme');
applyTheme(savedTheme === 'light' ? 'light' : 'dark');

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const isLight = document.body.getAttribute('data-theme') === 'light';
        const next = isLight ? 'dark' : 'light';
        localStorage.setItem('theme', next);
        applyTheme(next);
        
        // Update map colors if it exists
        if (typeof initGlobalMap === 'function') {
            initGlobalMap();
        }
    });
}

// ===== WORD-BY-WORD ANIMATION FOR HERO SUBLINE =====
function animateSublineByWord() {
    const sublineEl = document.getElementById('hero-subline');
    if (!sublineEl) return;

    const text = sublineEl.textContent;
    const words = text.split(' ');
    
    sublineEl.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
    
    const wordElements = sublineEl.querySelectorAll('.word');
    const delayBetweenWords = 100; // milliseconds
    const titleAnimationDuration = 1000; // match title animation duration
    
    wordElements.forEach((word, index) => {
        word.style.animationDelay = `${titleAnimationDuration + (index * delayBetweenWords)}ms`;
    });
}

// Run word animation when page loads
animateSublineByWord();

// ===== KINETIC TYPOGRAPHY ANIMATION =====
function initializeKineticText() {
    const elements = document.querySelectorAll('[data-kinetic-text]');
    const charAnimationDuration = 60; // ms per character
    const defaultDelay = 3200; // Start after hero animations complete

    elements.forEach((element, elementIndex) => {
        const text = element.getAttribute('data-kinetic-text') || element.textContent;
        
        // Clear original text
        element.innerHTML = '';
        
        // Split into characters and wrap each in a span
        const chars = text.split('');
        chars.forEach((char, charIndex) => {
            const charSpan = document.createElement('span');
            charSpan.className = 'kinetic-char';
            
            if (char === ' ') {
                charSpan.innerHTML = '&nbsp;';
            } else {
                charSpan.textContent = char;
            }
            
            // Calculate delay for this character
            const totalDelay = defaultDelay + (charIndex * charAnimationDuration);
            charSpan.style.animationDelay = `${totalDelay}ms`;
            charSpan.style.animation = `kineticStamp 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards`;
            
            element.appendChild(charSpan);
        });
    });
}

// Initialize kinetic text animations
initializeKineticText();

// ===== SERVICE PROGRESSION GALLERY =====
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // ===== NAV CTA BUTTON APPEARANCE ON SCROLL =====
    const heroCtaBtn = document.querySelector('.hero-cta-positioner .cta-btn');
    const navCtaWrapper = document.querySelector('.nav-cta-wrapper');

    if (heroCtaBtn && navCtaWrapper) {
        ScrollTrigger.create({
            trigger: ".hero-content",
            start: "bottom top",
            onEnter: () => {
                if (window.innerWidth <= 768) return;
                gsap.to(navCtaWrapper, { 
                    opacity: 1, 
                    maxWidth: "250px", 
                    duration: 0.6, 
                    ease: "power3.inOut", 
                    pointerEvents: "auto" 
                });
            },
            onLeaveBack: () => {
                if (window.innerWidth <= 768) return;
                gsap.to(navCtaWrapper, { 
                    opacity: 0, 
                    maxWidth: "0px", 
                    duration: 0.4, 
                    ease: "power3.inOut", 
                    pointerEvents: "none" 
                });
            }
        });
    }

    const stickySection = document.querySelector(".service-sticky");
    if (stickySection) {
        const stickyHeight = window.innerHeight * 5;
        const outlineCanvas = document.querySelector(".service-outline-layer");
        const fillCanvas = document.querySelector(".service-fill-layer");
        const outlineCtx = outlineCanvas.getContext("2d");
        const fillCtx = fillCanvas.getContext("2d");

        function setCanvasSize(canvas, ctx) {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);
        }
        setCanvasSize(outlineCanvas, outlineCtx);
        setCanvasSize(fillCanvas, fillCtx);

        const triangleSize = 150;
        const lineWidth = 1;
        const SCALE_THRESHOLD = 0.01;
        const triangleStates = new Map();
        let animationFrameId = null;
        let canvasXPosition = 0;

        function drawTriangle(ctx, x, y, fillScale = 0, flipped = false) {
            const halfSize = triangleSize / 2;

            if (fillScale < SCALE_THRESHOLD) {
                ctx.beginPath();
                if (!flipped) {
                    ctx.moveTo(x, y - halfSize);
                    ctx.lineTo(x + halfSize, y + halfSize);
                    ctx.lineTo(x - halfSize, y + halfSize);
                } else {
                    ctx.moveTo(x, y + halfSize);
                    ctx.lineTo(x + halfSize, y - halfSize);
                    ctx.lineTo(x - halfSize, y - halfSize);
                }
                ctx.closePath();
                ctx.strokeStyle = "rgba(255, 255, 255, 0.075)";
                ctx.lineWidth = lineWidth;
                ctx.stroke();
            }

            if (fillScale >= SCALE_THRESHOLD) {
                ctx.save();
                ctx.translate(x, y);
                ctx.scale(fillScale, fillScale);
                ctx.translate(-x, -y);

                ctx.beginPath();
                if (!flipped) {
                    ctx.moveTo(x, y - halfSize);
                    ctx.lineTo(x + halfSize, y + halfSize);
                    ctx.lineTo(x - halfSize, y + halfSize);
                } else {
                    ctx.moveTo(x, y + halfSize);
                    ctx.lineTo(x + halfSize, y - halfSize);
                    ctx.lineTo(x - halfSize, y - halfSize);
                }
                ctx.closePath();
                ctx.fillStyle = "#fc4103";
                ctx.strokeStyle = "#fc4103";
                ctx.lineWidth = lineWidth;
                ctx.stroke();
                ctx.fill();
                ctx.restore();
            }
        }

        function drawGrid(scrollProgress = 0) {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }

            outlineCtx.clearRect(0, 0, outlineCanvas.width, outlineCanvas.height);
            fillCtx.clearRect(0, 0, fillCanvas.width, fillCanvas.height);

            const animationProgress =
                scrollProgress <= 0.65 ? 0 : (scrollProgress - 0.65) / 0.35;

            let needsUpdate = false;
            const animationSpeed = 0.15;

            triangleStates.forEach((state, key) => {
                if (state.scale < 1) {
                    const x =
                        state.col * (triangleSize * 0.5) + triangleSize / 2 + canvasXPosition;
                    const y = state.row * triangleSize + triangleSize / 2;
                    const flipped = (state.row + state.col) % 2 !== 0;
                    drawTriangle(outlineCtx, x, y, 0, flipped);
                }
            });

            triangleStates.forEach((state, key) => {
                const shouldBeVisible = state.order <= animationProgress;
                const targetScale = shouldBeVisible ? 1 : 0;
                const newScale =
                    state.scale + (targetScale - state.scale) * animationSpeed;

                if (Math.abs(newScale - state.scale) > 0.001) {
                    state.scale = newScale;
                    needsUpdate = true;
                }

                if (state.scale >= SCALE_THRESHOLD) {
                    const x =
                        state.col * (triangleSize * 0.5) + triangleSize / 2 + canvasXPosition;
                    const y = state.row * triangleSize + triangleSize / 2;
                    const flipped = (state.row + state.col) % 2 !== 0;
                    drawTriangle(fillCtx, x, y, state.scale, flipped);
                }
            });

            if (needsUpdate) {
                animationFrameId = requestAnimationFrame(() => drawGrid(scrollProgress));
            }
        }

        function initializeTriangles() {
            const cols = Math.ceil(window.innerWidth / (triangleSize * 0.5));
            const rows = Math.ceil(window.innerHeight / (triangleSize * 0.5));
            const totalTriangles = rows * cols;

            const positions = [];
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    positions.push({ row: r, col: c, key: `${r}-${c}` });
                }
            }

            for (let i = positions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [positions[i], positions[j]] = [positions[j], positions[i]];
            }

            positions.forEach((pos, index) => {
                triangleStates.set(pos.key, {
                    order: index / totalTriangles,
                    scale: 0,
                    row: pos.row,
                    col: pos.col,
                });
            });
        }

        // Initialize Word-by-Word Animations using SplitType perfectly preserving nested HTML spans
        document.querySelectorAll('[data-word-anim]').forEach(el => {
            new SplitType(el, { types: "words" });
        });

        // ===== HORIZONTAL GALLERY GSAP MATCHMEDIA =====
        let mm = gsap.matchMedia();

        mm.add("(min-width: 769px)", () => {
            initializeTriangles();
            drawGrid();

            window.addEventListener("resize", () => {
                setCanvasSize(outlineCanvas, outlineCtx);
                setCanvasSize(fillCanvas, fillCtx);
                triangleStates.clear();
                initializeTriangles();
                drawGrid();
            });

            ScrollTrigger.create({
                trigger: stickySection,
                start: "top top",
                end: `+=${stickyHeight}px`,
                pin: true,
                onUpdate: (self) => {
                    canvasXPosition = -self.progress * 200;
                    drawGrid(self.progress);

                    const cards = document.querySelector(".service-cards");
                    const progress = Math.min(self.progress / 0.654, 1);
                    gsap.set(cards, {
                        x: -progress * window.innerWidth * 4,
                    });

                    if (progress > 0 && progress < 1) {
                        document.querySelectorAll('[data-word-anim] .word').forEach(word => {
                            const rect = word.getBoundingClientRect();
                            if (rect.left < window.innerWidth * 0.85 && rect.right > window.innerWidth * 0.02) {
                                word.classList.add('active');
                            }
                        });

                        document.querySelectorAll('.service-cards .scroll-highlight').forEach(span => {
                            const rect = span.getBoundingClientRect();
                            if (rect.left < window.innerWidth * 0.85 && rect.right > window.innerWidth * 0.05) {
                                if (!span.classList.contains('active')) {
                                    // Assign random flicker timing on first activation
                                    const duration = (2.5 + Math.random() * 3).toFixed(2); // 2.5s – 5.5s
                                    const delay    = (Math.random() * 2).toFixed(2);        // 0s – 2s
                                    span.style.setProperty('--flicker-duration', `${duration}s`);
                                    span.style.setProperty('--flicker-delay',    `${delay}s`);
                                    span.classList.add('active');
                                }
                            } else {
                                span.classList.remove('active');
                                span.style.removeProperty('--flicker-duration');
                                span.style.removeProperty('--flicker-delay');
                            }
                        });
                    }
                },
            });
            
            return () => {
                // optional cleanup
            };
        });

        mm.add("(max-width: 768px)", () => {
            // Un-pinned vertically stacked logic 
            // Words show up sequentially as you scroll past them individually via normal intersection
            document.querySelectorAll('[data-word-anim] .word').forEach((word, index) => {
                ScrollTrigger.create({
                    trigger: word,
                    start: "top 80%",
                    onEnter: () => word.classList.add('active'),
                });
            });
            
            document.querySelectorAll('.service-cards .service-card').forEach((card, index) => {
                ScrollTrigger.create({
                    trigger: card,
                    start: "top 85%",
                    onEnter: () => {
                        gsap.to(card, {
                            opacity: 1,
                            y: 0,
                            duration: 1,
                            ease: "power3.out"
                        });
                    },
                });
            });

            document.querySelectorAll('.service-cards .scroll-highlight').forEach((span) => {
                ScrollTrigger.create({
                    trigger: span,
                    start: "top 80%",
                    onEnter: () => span.classList.add('active'),
                });
            });
        });



        // ===== PROCESS TIMELINE ANIMATION =====
        gsap.to(".timeline-progress", {
            height: "100%",
            ease: "none",
            scrollTrigger: {
                trigger: ".timeline-container",
                start: "top center",
                end: "bottom center",
                scrub: true
            }
        });

        document.querySelectorAll(".timeline-step").forEach((step) => {
            ScrollTrigger.create({
                trigger: step,
                start: "top 80%",
                onEnter: () => step.classList.add("active"),
                onLeaveBack: () => step.classList.remove("active")
            });
        });

        // ===== CINEMATIC LOADER & HERO ENTRANCE =====
        const masterTl = gsap.timeline();

        // Reveal Brand Logo
        masterTl.to(".loader-svg", { opacity: 1, duration: 0.3 })
                .to(".brand-path", {
                    strokeDashoffset: 0,
                    duration: 2.2,
                    ease: "power2.inOut",
                    stagger: 0.04
                })
                .to(".brand-path", {
                    fillOpacity: 1,
                    duration: 0.8,
                    onStart: function() {
                        gsap.to(".brand-path", { strokeOpacity: 0, duration: 0.5 });
                    }
                })
                // Reveal Text
                .to(".brand-name", {
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=0.3")
                .to(".brand-tagline.primary", {
                    opacity: 1,
                    duration: 0.5,
                }, "-=0.2")
                .to(".brand-tagline.secondary", {
                    opacity: 1,
                    duration: 0.5,
                }, "-=0.2")
                .to(".loader-content", {
                    y: -30,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power4.in",
                    delay: 0.2
                })
                .to(".loader-split-line", {
                    height: "100%",
                    duration: 0.5,
                    ease: "power4.inOut"
                })
                .to(".loader-panel.left", {
                    x: "-100%",
                    duration: 0.8,
                    ease: "power4.inOut"
                }, "split")
                .to(".loader-panel.right", {
                    x: "100%",
                    duration: 0.8,
                    ease: "power4.inOut"
                }, "split")
                .to(".loader-split-line.left", {
                    x: "-50vw",
                    duration: 0.8,
                    ease: "power4.inOut"
                }, "split")
                .to(".loader-split-line.right", {
                    x: "50vw",
                    duration: 0.8,
                    ease: "power4.inOut"
                }, "split")
                .to(".loader-split-line", {
                    opacity: 0,
                    duration: 0.2
                }, "split+=0.3")
                .to(".loader-wrapper", {
                    display: "none"
                })
                .call(() => {
                    document.body.classList.remove("is-loading");
                });

        // Hero entrance linked to loader
        masterTl.fromTo(".hero-image", 
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 2, ease: "power4.out" }, 
            "-=0.8"
        )
        .fromTo(".scroll-text", 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power4.out" }, 
            "-=1.5"
        )
        .to(".hero-description .word", {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.02,
            ease: "power4.out"
        }, "-=1.2")
        .fromTo(".stats-flipper", 
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power4.out" }, 
            "-=1.4"
        )
        .fromTo(".nav", 
            { y: -20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 }, 
            "-=1.0"
        )
        .fromTo(".hero .cta-btn", 
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6 }, 
            "-=0.8"
        );

        // Existing animations triggered after intro
        // (Wait for masterTl if needed, but GSAP handles it lineally here)


        // ===== RKM MODULAR CAROUSEL =====
        let rkmsCurrentIndex = 1;
        let rkmsTotalSlides = 7;

        const updateRkmsActiveSlide = () => {
            document.querySelectorAll(".rkms-title").forEach((el, index) => {
                if (index === rkmsCurrentIndex) {
                    el.classList.add("active");
                } else {
                    el.classList.remove("active");
                }
            });
        };

        const updateRkmsImages = (imageNumber) => {
            const imgSrc = `./assets/assets/img${imageNumber}.jpg`;
            const imgTop = document.createElement("img");
            const imgBottom = document.createElement("img");

            imgTop.src = imgSrc;
            imgBottom.src = imgSrc;

            imgTop.style.clipPath = "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";
            imgBottom.style.clipPath = "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";
            imgTop.style.transform = "scale(2)";
            imgBottom.style.transform = "scale(2)";

            document.querySelector(".rkms-img-top").appendChild(imgTop);
            document.querySelector(".rkms-img-bottom").appendChild(imgBottom);

            gsap.to([imgTop, imgBottom], {
                clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
                transform: "scale(1)",
                duration: 2,
                ease: "power4.out",
                stagger: 0.15,
                onComplete: () => {
                    [".rkms-img-top", ".rkms-img-bottom"].forEach((selector) => {
                        const container = document.querySelector(selector);
                        const images = Array.from(container.querySelectorAll("img"));
                        if (images.length > 5) {
                            images.slice(0, images.length - 5).forEach(img => container.removeChild(img));
                        }
                    });
                }
            });
        };

        const handleRkmsSlider = () => {
            if (rkmsCurrentIndex < rkmsTotalSlides) {
                rkmsCurrentIndex++;
            } else {
                rkmsCurrentIndex = 1;
            }

            gsap.to(".rkms-slide-titles", {
                onStart: () => {
                    setTimeout(updateRkmsActiveSlide, 100);
                    updateRkmsImages(rkmsCurrentIndex + 1);
                },
                x: `-${(rkmsCurrentIndex - 1) * 11.1111}%`,
                duration: 2,
                ease: "power4.out",
            });
        };

        const sliderEl = document.querySelector('.rkms-slider');
        if (sliderEl) {
            sliderEl.addEventListener("click", handleRkmsSlider);
            updateRkmsImages(2);
            updateRkmsActiveSlide();
        }

        // ===== MARQUEE GALLERY ANIMATION =====
        const splitText = new SplitType(".marquee-item h1", { types: "chars" });
        const marqueeContainers = document.querySelectorAll(".marquee-container");

        marqueeContainers.forEach((container, index) => {
            let start = "0%";
            let end = "-15%";
            if (index % 2 === 0) {
                start = "0%";
                end = "10%";
            }

            const marqueeInner = container.querySelector(".marquee-inner");
            const words = marqueeInner.querySelectorAll("h1");

            gsap.fromTo(marqueeInner, 
                { x: start },
                {
                    x: end,
                    scrollTrigger: {
                        trigger: container,
                        start: "top bottom",
                        end: "150% top",
                        scrub: true,
                    }
                }
            );

            words.forEach((word) => {
                const chars = word.querySelectorAll(".char");
                if (chars.length) {
                    const reverse = index % 2 !== 0;
                    gsap.fromTo(chars,
                        { fontWeight: 100 },
                        {
                            fontWeight: 900,
                            duration: 1,
                            ease: "none",
                            stagger: {
                                each: 0.35,
                                from: reverse ? "start" : "end",
                                ease: "linear",
                            },
                            scrollTrigger: {
                                trigger: container,
                                start: "50% bottom",
                                end: "top top",
                                scrub: true,
                            },
                        }
                    );
                }
            });
        });

        // ===== PAIN POINTS SECTION ANIMATION =====
        gsap.from(".pain-point-card", {  
            scrollTrigger: {
                trigger: ".pain-points-grid",
                start: "top 80%",
            },
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out"
        });

        // ===== RKM 3D STACK SLIDER =====
        CustomEase.create("rkms-cubic", "0.83, 0, 0.17, 1");
        let stackIsAnimating = false;

        function splitStackText(selector) {
            document.querySelectorAll(selector).forEach((el) => {
                let text = el.innerText;
                el.innerHTML = text.split("").map(c => `<span>${c === " " ? "&nbsp;&nbsp;" : c}</span>`).join("");
            });
        }

        function initStackCards() {
            let cards = Array.from(document.querySelectorAll(".rkm-stack-card"));
            gsap.to(cards, {
                y: (i) => -15 + 15 * i + "%",
                z: (i) => 15 * i,
                opacity: 1,
                duration: 1,
                ease: "rkms-cubic",
                stagger: -0.1,
            });
        }

        splitStackText(".rkm-stack-copy h1");
        initStackCards();
        gsap.set(".rkm-stack-copy h1 span", { y: -200 });
        gsap.set(".rkm-stack-slider .rkm-stack-card:last-child h1 span", { y: 0 });

        const stackSection = document.querySelector('.rkm-stack-section');
        if (stackSection) {
            stackSection.addEventListener("click", function () {
                if (stackIsAnimating) return;
                stackIsAnimating = true;

                let slider = document.querySelector(".rkm-stack-slider");
                let cards = Array.from(slider.querySelectorAll(".rkm-stack-card"));
                let lastCard = cards.pop();
                let nextCard = cards[cards.length - 1];

                gsap.to(lastCard.querySelectorAll("h1 span"), {
                    y: 200,
                    duration: 0.75,
                    ease: "rkms-cubic",
                });

                gsap.to(lastCard, {
                    y: "+=150%",
                    duration: 0.75,
                    ease: "rkms-cubic",
                    onComplete: () => {
                        slider.prepend(lastCard);
                        initStackCards();
                        gsap.set(lastCard.querySelectorAll("h1 span"), { y: -200 });
                        setTimeout(() => { stackIsAnimating = false; }, 1000);
                    },
                });

                gsap.to(nextCard.querySelectorAll("h1 span"), {
                    y: 0,
                    duration: 1,
                    ease: "rkms-cubic",
                    stagger: 0.05,
                });
            });
        }

        // ===== COUNTER ANIMATION =====
        document.querySelectorAll(".counter").forEach((counter) => {
            const target = +counter.getAttribute("data-target");
            ScrollTrigger.create({
                trigger: counter,
                start: "top 90%",
                onEnter: () => {
                    gsap.to(counter, {
                        innerText: target,
                        duration: 2,
                        snap: { innerText: 1 },
                        ease: "power2.out"
                    });
                }
            });
        });

        // ===== VISION REVEAL ANIMATION =====
        document.querySelectorAll('.reveal-line').forEach((line) => {
            const imgSpan = line.querySelector('.reveal-img-span');
            if (imgSpan) {
                gsap.to(imgSpan, {
                    width: 200,
                    ease: "none",
                    scrollTrigger: {
                        trigger: line,
                        start: "top 90%",
                        end: "top 40%",
                        scrub: 1,
                    }
                });
            }
        });

        // ===== SCROLL HIGHLIGHT ANIMATION (inside DOMContentLoaded so ScrollTrigger is registered) =====
        gsap.utils.toArray('.scroll-highlight').forEach((span) => {
            // Skip spans inside .service-cards — those are handled by the horizontal scroll onUpdate
            if (span.closest('.service-cards')) return;

            ScrollTrigger.create({
                trigger: span,
                start: "top 85%",
                end: "bottom 35%",
                onEnter: () => span.classList.add('active'),
                onLeave: () => span.classList.remove('active'),
                onEnterBack: () => span.classList.add('active'),
                onLeaveBack: () => span.classList.remove('active'),
            });
        });
        // ===== PARAGRAPH WORD-BY-WORD REVEAL =====
        document.querySelectorAll('p').forEach(p => {
            // Skip excluded contexts
            if (
                p.closest('.loader-wrapper') ||
                p.closest('[data-word-anim]') ||
                p.closest('.service-cards') ||
                p.closest('.stat-flip-item') ||
                p.closest('.thumbnail-text') ||
                p.closest('.mobile-menu')
            ) return;

            const split = new SplitType(p, { types: 'words' });
            if (!split.words || split.words.length === 0) return;

            gsap.from(split.words, {
                opacity: 0,
                y: 14,
                duration: 0.55,
                stagger: 0.018,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: p,
                    start: 'top 88%',
                }
            });
        });
    }
});

// ===== GLOBAL PRESENCE MAP LOGIC =====
let globalMaps = null;

function initGlobalMap() {
    const mapElement = document.getElementById('map-container');
    if (!mapElement) return;

    // Clear existing map if any
    mapElement.innerHTML = '';

    const isLight = document.body.getAttribute('data-theme') === 'light';
    const accentColor = '#fc4103';
    const countryFill = isLight ? '#dcdcdc' : '#1a1a1a';
    const borderColor = isLight ? '#ffffff' : '#0a0a0a';

    globalMaps = new Datamap({
        element: mapElement,
        projection: 'mercator',
        responsive: true,
        fills: {
            defaultFill: countryFill,
            accent: accentColor
        },
        data: {},
        done: function(datamap) {
            // Manual hover logic
            datamap.svg.selectAll('.datamaps-subunit').on('mouseover', function(geography) {
                const current = d3.select(this);
                current.style('fill', accentColor);
            }).on('mouseout', function(geography) {
                const current = d3.select(this);
                current.style('fill', countryFill);
            });

            // Mobile zoom logic
            if (window.innerWidth <= 768) {
                const zoom = d3.behavior.zoom()
                    .scaleExtent([1, 8])
                    .on("zoom", function() {
                        datamap.svg.selectAll("g").attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
                    });
                datamap.svg.call(zoom);
            }
        },
        geographyConfig: {
            highlightOnHover: false, // Disable built-in hover to use our manual one
            popupTemplate: function(geo, data) {
                return `<div class="hoverinfo"><strong>${geo.properties.name}</strong></div>`;
            },
            borderWidth: 1,
            borderColor: borderColor
        }
    });

    // Add Cities
    globalMaps.bubbles([
        {
            name: 'RKM Global Hub (Constantine)',
            radius: 12,
            latitude: 36.36,
            longitude: 6.61,
            fillKey: 'accent',
            url: 'https://www.google.com/maps/search/Constantine'
        },
        {
            name: 'RKM Studio (Algiers)',
            radius: 8,
            latitude: 36.75,
            longitude: 3.05,
            fillKey: 'accent',
            url: 'https://www.google.com/maps/search/Algiers'
        }
    ], {
        highlightFillColor: '#ffffff',
        highlightBorderColor: accentColor,
        popupTemplate: function(geo, data) {
            return `<div class="hoverinfo">SITE: <strong>${data.name}</strong><br><small>(Click to view on map)</small></div>`;
        }
    });

    // Add click functionality to bubbles
    globalMaps.svg.selectAll('.datamaps-bubble')
        .on('click', function(data) {
            if (data.url) window.open(data.url, '_blank');
        })
        .on('mouseenter', function() {
            const cursorOutline = document.querySelector('.custom-cursor-outline');
            if (cursorOutline) gsap.to(cursorOutline, { scale: 1.5, duration: 0.3 });
        })
        .on('mouseleave', function() {
            const cursorOutline = document.querySelector('.custom-cursor-outline');
            if (cursorOutline) gsap.to(cursorOutline, { scale: 1, duration: 0.3 });
        });
}

document.addEventListener("DOMContentLoaded", () => {
    initGlobalMap();
    window.addEventListener('resize', () => {
        if (globalMaps && typeof globalMaps.resize === 'function') {
            globalMaps.resize();
        }
    });
});

// Initialize AOS
AOS.init();

// ===== HERO STATS FLIPPER =====
function initStatsFlipper() {
    const items = document.querySelectorAll('.stat-flip-item');
    if (items.length === 0) return;
    
    let currentIndex = 0;
    
    setInterval(() => {
        const current = items[currentIndex];
        if (current) {
            current.classList.remove('active');
            current.classList.add('exit');
        }
        
        currentIndex = (currentIndex + 1) % items.length;
        
        const next = items[currentIndex];
        if (next) {
            next.classList.remove('exit');
            next.classList.add('active');
        }
        
        setTimeout(() => {
            if (current) {
                current.classList.remove('exit');
            }
        }, 800);
    }, 4000);
}

// Initialize when window loads or immediately
initStatsFlipper();

// ===== SCROLL HIGHLIGHT ANIMATION =====
function initScrollHighlight() {
    gsap.utils.toArray('.scroll-highlight').forEach((span) => {
        ScrollTrigger.create({
            trigger: span,
            start: "top 85%",
            end: "bottom 35%",
            onEnter: () => span.classList.add('active'),
            onLeave: () => span.classList.remove('active'),
            onEnterBack: () => span.classList.add('active'),
            onLeaveBack: () => span.classList.remove('active'),
        });
    });
}

// Call it
// (scroll highlights for non-service-card sections are now handled inside DOMContentLoaded)
// initScrollHighlight() — moved inside DOMContentLoaded

// ===== WORK SECTION ANIMATIONS =====
document.addEventListener("DOMContentLoaded", () => {
    const projects = gsap.utils.toArray('.project')
    const thumbnails = gsap.utils.toArray('.thumbnail')
    const projectThumbnail = document.querySelector('.project-thumbnail')
    const projectsContainer = document.querySelector('.projects')

    if (projectsContainer && projectThumbnail) {
        gsap.set(projectThumbnail, { scale: 0, xPercent: -50, yPercent: -50 })

        const xTo = gsap.quickTo(projectThumbnail, 'x', {
            duration: 0.4,
            ease: 'power3.out',
        })
        const yTo = gsap.quickTo(projectThumbnail, 'y', {
            duration: 0.4,
            ease: 'power3.out',
        })

        projectsContainer.addEventListener('mousemove', e => {
            xTo(e.clientX)
            yTo(e.clientY)
        })

        projectsContainer.addEventListener('mouseleave', () => {
            gsap.to(projectThumbnail, {
                scale: 0,
                duration: 0.3,
                ease: 'power2.out',
                overwrite: 'auto',
            })
        })

        projects.forEach((project, index) => {
            project.addEventListener('mouseenter', () => {
                gsap.to(projectThumbnail, {
                    scale: 1,
                    duration: 0.4,
                    ease: 'power2.out',
                    overwrite: 'auto',
                })

                gsap.to(thumbnails, {
                    yPercent: -100 * index,
                    duration: 0.4,
                    ease: 'power2.out',
                    overwrite: 'auto',
                })
            })
        })
    }
});

// ===== NODE CODING SECTION LOGIC =====
document.addEventListener("DOMContentLoaded", () => {
    if (typeof Draggable !== 'undefined') {
        const svgW = document.getElementById("node-wires");
        if (!svgW) return;

        const connections = [
            { from: '#node-1 [data-port="out-1"] .port-dot', to: '#node-4 [data-port="in-1"] .port-dot' },
            { from: '#node-1 [data-port="out-2"] .port-dot', to: '#node-2 [data-port="in-1"] .port-dot' },
            { from: '#node-2 [data-port="out-1"] .port-dot', to: '#node-3 [data-port="in-1"] .port-dot' },
            { from: '#node-3 [data-port="out-1"] .port-dot', to: '#node-4 [data-port="in-2"] .port-dot' }
        ];

        let paths = [];

        // Create SVG paths
        connections.forEach(() => {
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.classList.add("node-wire");
            svgW.appendChild(path);
            paths.push(path);
        });

        // Update wire paths
        function updateConnections() {
            const svgRect = svgW.getBoundingClientRect();
            
            connections.forEach((conn, i) => {
                const fromEl = document.querySelector(conn.from);
                const toEl = document.querySelector(conn.to);
                
                if (fromEl && toEl) {
                    const fromRect = fromEl.getBoundingClientRect();
                    const toRect = toEl.getBoundingClientRect();
                    
                    const x1 = fromRect.left + fromRect.width/2 - svgRect.left;
                    const y1 = fromRect.top + fromRect.height/2 - svgRect.top;
                    const x2 = toRect.left + toRect.width/2 - svgRect.left;
                    const y2 = toRect.top + toRect.height/2 - svgRect.top;
                    
                    // Creates a smooth cubic bezier bezier curve simulating a wire
                    const offset = Math.abs(x2 - x1) * 0.4;
                    const pathString = `M ${x1} ${y1} C ${x1 + Math.max(offset, 40)} ${y1}, ${x2 - Math.max(offset, 40)} ${y2}, ${x2} ${y2}`;
                    
                    paths[i].setAttribute("d", pathString);
                }
            });
        }

        // Delay to make sure fonts/layout load
        setTimeout(updateConnections, 100);
        window.addEventListener('resize', updateConnections);

        // Make nodes draggable and update wires on drag
        Draggable.create(".bim-node", {
            type: "x,y",
            bounds: ".node-canvas-container",
            onDrag: () => {
                // Ensure wires stay attached smoothly during drag frames
                requestAnimationFrame(updateConnections);
            }
        });
    }
});

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 200
});


// ===== STATS ICON PATH ANIMATION =====
function initStatIconAnimations() {
    const paths = document.querySelectorAll('.stat-path');
    paths.forEach(path => {
        const length = path.getTotalLength();
        
        // Set initial state
        gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length
        });

        // Animate on scroll
        gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: path.closest('.stat-complex-item'),
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initStatIconAnimations);
