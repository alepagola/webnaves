// --- script.js (Versión Final Corregida) ---
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. LOGICA MENU MÓVIL (Navbar)
    const menuBtn = document.getElementById('mobile-menu');
    const navLinksContainer = document.getElementById('navLinks');

    if(menuBtn && navLinksContainer) {
        menuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('nav-active');
        });
        
        navLinksContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('nav-active');
            });
        });
    }

    // 2. MARCAR ENLACE ACTIVO AUTOMÁTICAMENTE
    const currentLocation = location.href;
    const menuItems = document.querySelectorAll('.custom-nav-links a');
    
    menuItems.forEach(item => {
        item.classList.remove("active-link");
        if(item.href === currentLocation) {
            item.classList.add("active-link");
            const parentDropdown = item.closest('.dropdown-item');
            if (parentDropdown) {
                 const parentLink = parentDropdown.querySelector('a'); 
                 if(parentLink) parentLink.classList.add('active-link');
            }
        }
    });

    // 3. ENVÍO DE FORMULARIO A NETLIFY (Multilenguaje)
    const contactForm = document.getElementById('formContacto'); 
    const btnEnviar = document.getElementById('btnEnviar');
    const miModalElement = document.getElementById('modalExito');
    const miModal = miModalElement ? new bootstrap.Modal(miModalElement) : null;

    if(contactForm && btnEnviar){
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const isEn = document.documentElement.lang === 'en';
            const loadingText = isEn ? 'Sending...' : 'Enviando...';

            btnEnviar.disabled = true;
            const originalContent = btnEnviar.innerHTML;
            btnEnviar.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span> ${loadingText}`;

            const formData = new FormData(contactForm);

            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString(),
            })
            .then(() => {
                if(miModal) miModal.show();
                contactForm.reset();
            })
            .catch((error) => {
                const errorMsg = isEn ? 'Connection error. Please try again.' : 'Hubo un error de conexión. Por favor intente nuevamente.';
                alert(errorMsg);
                console.error('Netlify Error:', error);
            })
            .finally(() => {
                btnEnviar.disabled = false;
                btnEnviar.innerHTML = originalContent;
            });
        });
    }

    // 4. CONTADORES ANIMADOS (Sección Nosotros)
    const counters = document.querySelectorAll('.counter');
    const speed = 100;

    if (counters.length > 0) {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    // 5. SEGUIMIENTO DE WHATSAPP (GA4) - ¡NUEVO!
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp');
    
    whatsappButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const isEn = document.documentElement.lang === 'en';
            
            // Enviamos el evento a Google Analytics
            if (typeof gtag === 'function') {
                gtag('event', 'click_whatsapp', {
                    'event_category': 'Engagement',
                    'event_label': isEn ? 'WhatsApp English' : 'WhatsApp Español',
                    'transport_type': 'beacon'
                });
                console.log('Evento WhatsApp enviado: ' + (isEn ? 'EN' : 'ES'));
            }
        });
    });
});