// --- 1. ACTIVE NAVIGATION ON SCROLL ---
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");

window.addEventListener("scroll", () => {
    let currentSection = "";
    
    // Malalaman kung nasa pinaka-baba na ng page ang scrollbar
    const isAtBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50;

    if (isAtBottom) {
        // Kung nasa dulo na, awtomatikong kuhain ang huling section (Finals)
        currentSection = sections[sections.length - 1].getAttribute("id");
    } else {
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }
        });
    }

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
});

const menuToggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');
const icon = menuToggle.querySelector('i');

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark'); // nagiging X kapag bukas
});

// isara ang menu kapag may pinindot na link
navbar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
    });
});

// ===== VIEW PHOTO FEATURE =====
const imageModal = document.getElementById('image-modal');
const modalImg = document.getElementById('image-modal-img');
const modalCaption = document.getElementById('image-modal-caption');
const modalClose = document.getElementById('image-modal-close');

function openImage(img) {
    modalImg.src = img.src;
    modalCaption.textContent = img.alt;
    imageModal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeImage() {
    imageModal.classList.remove('open');
    document.body.style.overflow = '';
}

document.querySelectorAll(
    '.quizzes-card, .longquizzes-card, .lab-card, .midterm-card, .finals-card'
).forEach(card => {
    const img = card.querySelector('img');
    const info = card.querySelector('[class$="-info"]');
    if (!img || !info) return;

    const btn = document.createElement('button');
    btn.className = 'view-btn';
    btn.type = 'button';
    btn.textContent = 'View Photo';
    btn.addEventListener('click', () => openImage(img));
    info.appendChild(btn);

    img.addEventListener('click', () => openImage(img));
});

modalClose.addEventListener('click', closeImage);
imageModal.addEventListener('click', e => {
    if (e.target === imageModal) closeImage(); // click sa labas ng picture = close
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeImage();
});