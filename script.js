/* ========================================
   Dark Mode Toggle dengan LocalStorage
   ======================================== */

// Ambil elemen toggle button
const themeToggle = document.getElementById('themeToggle');

// Fungsi untuk set tema
function setTheme(theme) {
    // Set attribute data-theme di body
    document.documentElement.setAttribute('data-theme', theme);
    
    // Simpan pilihan tema ke LocalStorage
    localStorage.setItem('theme', theme);
}

// Fungsi untuk toggle tema (light <-> dark)
function toggleTheme() {
    // Cek tema saat ini
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    // Toggle ke tema sebaliknya
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Set tema baru
    setTheme(newTheme);
}

// Fungsi untuk load tema dari LocalStorage saat halaman dimuat
function loadTheme() {
    // Ambil tema dari LocalStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Jika ada tema tersimpan, gunakan itu
    // Jika tidak, gunakan light mode sebagai default
    const theme = savedTheme || 'light';
    
    setTheme(theme);
}

/* ========================================
   Event Listeners
   ======================================== */

// Saat tombol toggle diklik
themeToggle.addEventListener('click', toggleTheme);

// Load tema saat halaman pertama kali dimuat
// Ini memastikan tema yang dipilih user tetap aktif setelah refresh
loadTheme();

/* ========================================
   Smooth Scroll untuk Button CTA (Bonus)
   ======================================== */

// Ambil semua link dengan href yang dimulai dengan #
const smoothLinks = document.querySelectorAll('a[href^="#"]');

smoothLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Ambil target section
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Smooth scroll ke section
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ========================================
   Card Animation on Scroll (Optional)
   ======================================== */

// Tambahkan animasi saat card masuk ke viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe semua service cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach((card, index) => {
        // Set initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        
        // Observe card
        observer.observe(card);
    });
});
/* ========================================
   Glassmorphism Header on Scroll
   ======================================== */
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/* ========================================
   Workflow Cards Animation
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    const workflowCards = document.querySelectorAll('.workflow-card');
    
    // Set initial state untuk workflow cards
    workflowCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.15}s`;
    });
    
    // Observe workflow cards
    const workflowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    workflowCards.forEach(card => {
        workflowObserver.observe(card);
    });
});

/* ========================================
   WhatsApp Button Click Tracking (Optional)
   ======================================== */
const whatsappButton = document.querySelector('.whatsapp-float');

if (whatsappButton) {
    whatsappButton.addEventListener('click', () => {
        // Bisa ditambahkan analytics tracking di sini
        console.log('WhatsApp button clicked');
    });
}
/* ========================================
   Testimonials Data & Rendering
   ======================================== */

// Data testimoni (bisa diubah sesuai kebutuhan)
const testimonialsData = [
    {
        name: "Budi Santoso",
        role: "Owner - Toko Elektronik Online",
        avatar: "https://ui-avatars.com/api/?name=Budi+Santoso&background=6366f1&color=fff&size=200",
        rating: 5,
        text: "Website yang dibuat sangat profesional dan loading-nya cepat! Penjualan toko online saya meningkat 40% setelah menggunakan jasa Hisam Tech. Highly recommended!"
    },
    {
        name: "Siti Nurhaliza",
        role: "Founder - Kursus Online",
        avatar: "https://ui-avatars.com/api/?name=Siti+Nurhaliza&background=6366f1&color=fff&size=200",
        rating: 5,
        text: "Pelayanan cepat dan responsif. Semua request saya dipenuhi dengan detail. Website kursus saya jadi terlihat lebih kredibel dan siswa baru terus berdatangan!"
    },
    {
        name: "Ahmad Rizki",
        role: "Marketing Manager - PT Maju Jaya",
        avatar: "https://ui-avatars.com/api/?name=Ahmad+Rizki&background=6366f1&color=fff&size=200",
        rating: 5,
        text: "Desainnya modern dan elegan, cocok banget untuk company profile kami. Tim Hisam Tech sangat memahami kebutuhan bisnis dan memberikan solusi terbaik!"
    }
];

// Function untuk render stars
function renderStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        stars += `<span class="star">${i < rating ? '⭐' : '☆'}</span>`;
    }
    return stars;
}

// Function untuk render testimonials
function renderTestimonials() {
    const container = document.getElementById('testimonialsGrid');
    
    if (!container) return; // Guard clause
    
    container.innerHTML = ''; // Clear existing content
    
    testimonialsData.forEach(testimonial => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        
        card.innerHTML = `
            <div class="testimonial-header">
                <img src="${testimonial.avatar}" 
                     alt="${testimonial.name}" 
                     class="testimonial-avatar"
                     loading="lazy">
                <div class="testimonial-info">
                    <h4 class="testimonial-name">${testimonial.name}</h4>
                    <p class="testimonial-role">${testimonial.role}</p>
                </div>
            </div>
            <div class="testimonial-rating">
                ${renderStars(testimonial.rating)}
            </div>
            <p class="testimonial-text">${testimonial.text}</p>
        `;
        
        container.appendChild(card);
    });
}

/* ========================================
   FAQ Data & Accordion Logic
   ======================================== */

// Data FAQ (bisa diubah sesuai kebutuhan)
const faqData = [
    {
        question: "Berapa lama waktu pengerjaan website?",
        answer: "Waktu pengerjaan bervariasi tergantung kompleksitas proyek. Landing page sederhana bisa selesai dalam 3-5 hari, sedangkan website dengan fitur lebih kompleks membutuhkan 1-2 minggu. Kami akan memberikan timeline yang jelas setelah konsultasi awal."
    },
    {
        question: "Apakah bisa revisi jika ada yang kurang sesuai?",
        answer: "Tentu saja! Kami menyediakan revisi hingga Anda puas dengan hasilnya. Untuk paket standar, kami memberikan hingga 3x revisi gratis. Revisi tambahan bisa dibicarakan dengan biaya yang sangat terjangkau."
    },
    {
        question: "Apakah website yang dibuat mobile-friendly?",
        answer: "Ya, 100%! Semua website yang kami buat sudah responsive dan dioptimalkan untuk semua perangkat (smartphone, tablet, dan desktop). Kami menggunakan pendekatan mobile-first untuk memastikan pengalaman terbaik di semua layar."
    },
    {
        question: "Berapa biaya pembuatan website?",
        answer: "Biaya bervariasi tergantung kebutuhan dan kompleksitas. Landing page dimulai dari 500K, micro-app dari 1.5jt, dan custom web app dari 3jt. Hubungi kami untuk konsultasi gratis dan penawaran yang sesuai budget Anda."
    },
    {
        question: "Apakah saya bisa request fitur tertentu?",
        answer: "Absolutely! Kami sangat terbuka dengan custom request. Sampaikan kebutuhan spesifik Anda, dan kami akan carikan solusi terbaik. Mulai dari form booking, payment gateway, hingga dashboard admin semuanya bisa kami kerjakan."
    },
    {
        question: "Apakah ada garansi atau support setelah website selesai?",
        answer: "Ya, kami memberikan garansi bug-fix selama 30 hari setelah website launching. Kami juga menyediakan panduan lengkap cara menggunakan dan maintain website. Untuk support jangka panjang, tersedia paket maintenance bulanan."
    }
];

// Function untuk render FAQ accordion
function renderFAQ() {
    const container = document.getElementById('faqContainer');
    
    if (!container) return; // Guard clause
    
    container.innerHTML = ''; // Clear existing content
    
    faqData.forEach((faq, index) => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.setAttribute('data-index', index);
        
        faqItem.innerHTML = `
            <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${index}">
                <span class="faq-question-text">${faq.question}</span>
                <span class="faq-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
            </button>
            <div class="faq-answer" id="faq-answer-${index}">
                <p class="faq-answer-text">${faq.answer}</p>
            </div>
        `;
        
        container.appendChild(faqItem);
    });
    
    // Add click event listeners to all FAQ questions
    attachFAQListeners();
}

// Function untuk attach event listeners ke FAQ items
function attachFAQListeners() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items (optional - hapus jika ingin multi-open)
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    otherQuestion.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                question.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

/* ========================================
   Initialize Everything on DOM Load
   ======================================== */

// Tambahkan ke existing DOMContentLoaded event atau buat baru
document.addEventListener('DOMContentLoaded', () => {
    // Render testimonials
    renderTestimonials();
    
    // Render FAQ
    renderFAQ();
    
    // ... kode DOMContentLoaded lainnya yang sudah ada
});
/* ========================================
   Pricing Data & Rendering
   ======================================== */

// Data pricing packages (mudah diupdate!)
const pricingData = [
    {
        name: "Basic",
        icon: "🎨",
        description: "Sempurna untuk landing page bisnis",
        price: 500000,
        period: "proyek",
        popular: false,
        features: [
            "1 Halaman Landing Page",
            "Desain Modern & Responsive",
            "Mobile-Friendly Design",
            "Fast Loading Speed",
            "Basic SEO Setup",
            "1x Revisi Gratis",
            "Panduan Upload & Maintenance",
            "Support 7 Hari"
        ],
        ctaText: "Pesan Sekarang",
        ctaLink: "https://wa.me/6288994227807?text=Halo,%20saya%20tertarik%20dengan%20paket%20Basic"
    },
    {
        name: "Pro",
        icon: "⚡",
        description: "Untuk aplikasi web interaktif",
        price: 1500000,
        period: "proyek",
        popular: true, // Paket paling populer
        features: [
            "Multi-Page Website/App",
            "Interactive Features",
            "Custom Functionality",
            "Dashboard Admin (opsional)",
            "Database Integration",
            "Advanced SEO",
            "3x Revisi Gratis",
            "Source Code Included",
            "Support 30 Hari"
        ],
        ctaText: "Pilih Pro",
        ctaLink: "https://wa.me/6288994227807?text=Halo,%20saya%20tertarik%20dengan%20paket%20Pro"
    },
    {
        name: "Custom",
        icon: "🚀",
        description: "Solusi enterprise & full-stack",
        price: 3000000,
        period: "proyek",
        popular: false,
        features: [
            "Full-Stack Development",
            "Custom Backend API",
            "Payment Gateway Integration",
            "Real-time Features",
            "Cloud Deployment",
            "Security Implementation",
            "Unlimited Revisi",
            "Complete Source Code",
            "1 Bulan Free Maintenance",
            "Priority Support 24/7"
        ],
        ctaText: "Konsultasi Gratis",
        ctaLink: "https://wa.me/6288994227807?text=Halo,%20saya%20tertarik%20dengan%20paket%20Custom"
    }
];

// Function untuk format harga ke Rupiah
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID').format(price);
}

// Function untuk render pricing cards
function renderPricing() {
    const container = document.getElementById('pricingGrid');
    
    if (!container) return; // Guard clause
    
    container.innerHTML = ''; // Clear existing content
    
    pricingData.forEach(pkg => {
        const card = document.createElement('div');
        card.className = `pricing-card${pkg.popular ? ' popular' : ''}`;
        
        // Build features HTML
        const featuresHTML = pkg.features.map(feature => `
            <li class="pricing-feature">
                <span class="feature-icon">✓</span>
                <span>${feature}</span>
            </li>
        `).join('');
        
        // Build card HTML
        card.innerHTML = `
            ${pkg.popular ? '<div class="pricing-badge">Paling Populer</div>' : ''}
            
            <div class="pricing-header">
                <div class="pricing-icon">${pkg.icon}</div>
                <h3 class="pricing-name">${pkg.name}</h3>
                <p class="pricing-description">${pkg.description}</p>
                <div class="pricing-price">
                    <span class="pricing-currency">Rp</span>
                    <span class="pricing-amount">${formatPrice(pkg.price / 1000)}K</span>
                    <span class="pricing-period">/${pkg.period}</span>
                </div>
            </div>
            
            <ul class="pricing-features">
                ${featuresHTML}
            </ul>
            
            <a href="${pkg.ctaLink}" class="pricing-cta" target="_blank" rel="noopener noreferrer">
                ${pkg.ctaText}
            </a>
        `;
        
        container.appendChild(card);
    });
}

/* ========================================
   Pricing Card Scroll Animation (Optional)
   ======================================== */
function initPricingAnimation() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    const pricingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    pricingCards.forEach(card => {
        card.style.animationPlayState = 'paused';
        pricingObserver.observe(card);
    });
}

/* ========================================
   Initialize Pricing on DOM Load
   ======================================== */

// Tambahkan ke existing DOMContentLoaded atau update yang sudah ada
document.addEventListener('DOMContentLoaded', () => {
    // Render pricing
    renderPricing();
    
    // Optional: Init scroll animation
    setTimeout(initPricingAnimation, 100);
    
    // ... kode DOMContentLoaded lainnya yang sudah ada
    // (testimonials, FAQ, dll)
});
