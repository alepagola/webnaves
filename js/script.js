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

    // 3. ENVÍO DE FORMULARIO A NETLIFY CON MODAL BOOTSTRAP
    const contactForm = document.getElementById('formContacto');
    const btnEnviar = document.getElementById('btnEnviar');
    
    // Inicializamos el modal de Bootstrap (usando el JS que ya tenés cargado)
    const miModal = document.getElementById('modalExito') ? new bootstrap.Modal(document.getElementById('modalExito')) : null;

    if(contactForm){
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Deshabilitamos el botón y ponemos estado de carga
            btnEnviar.disabled = true;
            const originalContent = btnEnviar.innerHTML;
            btnEnviar.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Enviando...';

            const formData = new FormData(contactForm);

            // Envío asíncrono a Netlify
            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString(),
            })
            .then(() => {
                // Si sale bien, mostramos el modal lindo de Bootstrap
                if(miModal) miModal.show();
                contactForm.reset();
            })
            .catch((error) => {
                // Si falla la red, volvemos al alert simple por seguridad
                alert('Hubo un error de conexión. Por favor intente nuevamente.');
                console.error('Netlify Error:', error);
            })
            .finally(() => {
                // Reestablecemos el botón
                btnEnviar.disabled = false;
                btnEnviar.innerHTML = originalContent;
            });
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