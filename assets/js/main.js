// === Elementos del DOM ===
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// === Inicialización de AOS (Animate On Scroll) ===
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar AOS con configuraciones personalizadas
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // Asegurarse de que las animaciones se reinicien si se cambia el tamaño de la ventana
    window.addEventListener('resize', () => {
        AOS.refresh();
    });
});

// === Navegación ===
// Cambiar estilo del navbar al hacer scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Menú hamburguesa para móviles
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Cerrar menú móvil al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        }
    });
});

// === Animaciones personalizadas ===
// Animación de entrada para elementos que no usan AOS
const animateElements = document.querySelectorAll('.animate');
animateElements.forEach(element => {
    element.classList.add('animated');
});

// === Scroll suave para enlaces internos ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navbarHeight = navbar.getBoundingClientRect().height;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// === Detección de tema del sistema ===
// Verificar si el usuario prefiere el tema oscuro en su sistema
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// No necesitamos hacer nada ya que nuestra web es dark mode por defecto
// Pero podríamos adaptar otros elementos según esta preferencia

// === Lazy Loading para imágenes ===
// Implementación básica de lazy loading para mejorar rendimiento
if ('loading' in HTMLImageElement.prototype) {
    // El navegador soporta lazy loading nativo
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback para navegadores que no soportan lazy loading nativo
    // Podríamos implementar una solución basada en Intersection Observer
    // pero lo mantenemos simple por ahora
}

// === Preloader ===
window.addEventListener('load', () => {
    // Si tuviéramos un preloader, lo eliminaríamos aquí
    // Por ejemplo:
    // document.querySelector('.preloader').style.display = 'none';
    // document.body.classList.remove('no-scroll');
});