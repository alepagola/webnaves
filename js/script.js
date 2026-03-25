// --- script.js ---
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. LOGICA MENU MÓVIL (Navbar)
    const menuBtn = document.getElementById('mobile-menu');
    const navLinksContainer = document.getElementById('navLinks');

    if(menuBtn && navLinksContainer) {
        menuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('nav-active');
        });
        
        // Cerrar menú al hacer clic en un link
        navLinksContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('nav-active');
            });
        });
    }

    // 2. MARCAR ENLACE ACTIVO AUTOMÁTICAMENTE (CORREGIDO)
    const currentLocation = location.href;
    const menuItems = document.querySelectorAll('.custom-nav-links a');
    
    menuItems.forEach(item => {
        // PASO CLAVE: Primero removemos la clase 'active-link' de TODOS los items
        // Esto soluciona que "Inicio" se quede pintado siempre.
        item.classList.remove("active-link");

        // Luego, si el link coincide con la página actual, se la agregamos
        if(item.href === currentLocation) {
            item.classList.add("active-link");
            
            // (Opcional) Si el link está dentro de un dropdown (ej: un producto), 
            // pintamos también el botón padre "Productos" para que quede prolijo.
            const parentDropdown = item.closest('.dropdown-item');
            if (parentDropdown) {
                 // Buscamos el primer link dentro del dropdown (que sería el título "Productos")
                 const parentLink = parentDropdown.querySelector('a'); 
                 if(parentLink) parentLink.classList.add('active-link');
            }
        }
    });

    // 3. VALIDACIÓN SIMPLE DE FORMULARIO
    const contactForm = document.querySelector('form');
    if(contactForm){
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Mensaje enviado correctamente. Gracias por contactar a Naves Del Sur.');
            contactForm.reset();
        });
    }

    // 4. CONTADORES ANIMADOS (Sección Nosotros)
    const counters = document.querySelectorAll('.counter');
    const speed = 100; // Velocidad de la animación (mientras más bajo, más rápido)

    if (counters.length > 0) {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                
                // Calculamos el incremento
                const inc = target / speed;

                // Si el contador es menor al objetivo, sumamos
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20); // ms de delay por frame
                } else {
                    counter.innerText = target;
                }
            };
            
            updateCount();
        });
    }
});