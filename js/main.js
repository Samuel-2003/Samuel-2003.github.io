document.addEventListener('DOMContentLoaded', () => {
    // Navbar Toggle
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    const menuCloseBtn = document.getElementById('menu-close-btn');
    
    navbarToggle.addEventListener('click', () => {
        navbarToggle.classList.toggle('active');
        navbarMenu.classList.toggle('active');
        document.body.style.overflow = 'hidden'; // Impedir scroll del fondo
    });
    
    // Cerrar menú con el botón de cierre
    menuCloseBtn.addEventListener('click', () => {
        navbarToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll
    });
    
    // Close navbar when clicking a menu item
    const navLinks = document.querySelectorAll('.navbar-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbarToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
            document.body.style.overflow = ''; // Restaurar scroll
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active nav link on scroll
    const sections = document.querySelectorAll('section');
    
    function changeLinkState() {
        let index = sections.length;
        
        while(--index && window.scrollY + 80 < sections[index].offsetTop) {}
        
        navLinks.forEach(link => link.classList.remove('active'));
        if (navLinks[index]) {
            navLinks[index].classList.add('active');
        }
    }
    
    window.addEventListener('scroll', changeLinkState);
    
    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else if (card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Form submission with Firebase
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Verificamos si Firebase está disponible
            if (typeof firebase !== 'undefined') {
                try {
                    // Guardar el mensaje en Firestore
                    firebase.firestore().collection('mensajes').add({
                        nombre: name,
                        email: email,
                        asunto: subject,
                        mensaje: message,
                        fecha: new Date()
                    })
                    .then(() => {
                        // Registrar evento en Analytics
                        firebase.analytics().logEvent('formulario_enviado');
                        
                        // Mostrar mensaje de éxito
                        alert('¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.');
                        
                        // Limpiar formulario
                        contactForm.reset();
                    })
                    .catch((error) => {
                        console.error("Error al guardar el mensaje: ", error);
                        alert('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo más tarde.');
                    });
                } catch (error) {
                    console.error("Error al procesar el formulario: ", error);
                    alert('Por el momento no podemos procesar tu solicitud. Por favor, contáctame directamente por correo o WhatsApp.');
                }
            } else {
                // Firebase no está disponible, mostrar mensaje alternativo
                console.log({ name, email, subject, message });
                alert('¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.');
                contactForm.reset();
            }
        });
    }
    
    // Animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.timeline-item, .project-card, .education-item, .skill-item, .ia-model-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Add animate class to CSS
    const style = document.createElement('style');
    style.textContent = `
        .timeline-item, .project-card, .education-item, .skill-item, .ia-model-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .timeline-item.animate, .project-card.animate, .education-item.animate, .skill-item.animate, .ia-model-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .timeline-item:nth-child(odd) {
            transform: translateX(-30px);
        }
        
        .timeline-item:nth-child(even) {
            transform: translateX(30px);
        }
        
        .timeline-item.animate:nth-child(odd),
        .timeline-item.animate:nth-child(even) {
            transform: translateX(0);
        }
    `;
    document.head.appendChild(style);
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    
    // Typing effect for hero section
    const typingEffect = () => {
        const text = "Desarrollando sistemas inteligentes para cambiar el mundo.";
        const typingElement = document.querySelector('.hero-content p');
        
        if (typingElement) {
            typingElement.textContent = "";
            
            let i = 0;
            const typing = setInterval(() => {
                if (i < text.length) {
                    typingElement.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                }
            }, 50);
        }
    };
    
    // Run typing effect after a short delay
    setTimeout(typingEffect, 1000);
    
    // Year for copyright
    const yearElement = document.querySelector('.footer-copyright p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = `© ${currentYear} Samuel García Turpo. Todos los derechos reservados.`;
    }
    
    // Inicialización de Firebase y carga dinámica de proyectos
    const initFirebase = () => {
        try {
            if (typeof firebase !== 'undefined') {
                // Cargar proyectos desde Firestore
                const loadProjects = async () => {
                    try {
                        const projectsRef = firebase.firestore().collection('proyectos');
                        const snapshot = await projectsRef.get();
                        
                        if (!snapshot.empty) {
                            const projectsGrid = document.querySelector('.projects-grid');
                            // Limpiar el grid actual
                            projectsGrid.innerHTML = '';
                            
                            snapshot.forEach(doc => {
                                const projectData = doc.data();
                                
                                // Crear elemento de proyecto
                                const projectCard = document.createElement('div');
                                projectCard.className = 'project-card';
                                projectCard.setAttribute('data-category', projectData.categoria || 'web');
                                
                                projectCard.innerHTML = `
                                    <div class="project-img">
                                        <img src="${projectData.imagen || 'assets/img/project-default.jpg'}" alt="${projectData.titulo}">
                                    </div>
                                    <div class="project-info">
                                        <h3>${projectData.titulo || 'Proyecto'}</h3>
                                        <p>${projectData.descripcion || 'Descripción del proyecto'}</p>
                                        <div class="project-tech">
                                            ${(projectData.tecnologias || []).map(tech => `<span>${tech}</span>`).join('')}
                                        </div>
                                        <div class="project-links">
                                            ${projectData.github ? `<a href="${projectData.github}" target="_blank"><i class="fab fa-github"></i></a>` : ''}
                                            ${projectData.demo ? `<a href="${projectData.demo}" target="_blank"><i class="fas fa-external-link-alt"></i></a>` : ''}
                                        </div>
                                    </div>
                                `;
                                
                                projectsGrid.appendChild(projectCard);
                            });
                            
                            // Reiniciar filtros
                            const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
                            if (allFilterBtn) {
                                allFilterBtn.click();
                            }
                        }
                    } catch (error) {
                        console.error("Error al cargar proyectos:", error);
                    }
                };
                
                // Intentar cargar proyectos
                loadProjects();
                
                // Registrar visita en Analytics
                firebase.analytics().logEvent('page_view', {
                    page_title: 'Portafolio de Samuel',
                    page_location: window.location.href
                });
            }
        } catch (error) {
            console.error("Error al inicializar Firebase:", error);
        }
    };
    
    // Inicializar Firebase después de que se haya cargado completamente
    if (document.readyState === 'complete') {
        initFirebase();
    } else {
        window.addEventListener('load', initFirebase);
    };
})