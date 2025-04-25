// === Dashboard Functionality ===

document.addEventListener('DOMContentLoaded', () => {
    // === Elementos del DOM ===
    const dashboardContainer = document.querySelector('.dashboard-container');
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    const notificationBtn = document.querySelector('.notification-btn');
    const notificationsDropdown = document.querySelector('.notifications-dropdown');
    const topbarUser = document.querySelector('.topbar-user');
    const userDropdown = document.querySelector('.user-dropdown');
    const logoutBtn = document.getElementById('logout-btn');
    const topbarLogout = document.getElementById('topbar-logout');
    const logoutModal = document.getElementById('logout-modal');
    const closeModal = document.querySelector('.close-modal');
    const cancelLogout = document.querySelector('.cancel-logout');
    const confirmLogout = document.querySelector('.confirm-logout');
    
    // === Toggle Sidebar ===
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                // En móviles, expandir/colapsar el sidebar
                document.querySelector('.dashboard-sidebar').classList.toggle('expanded');
            } else {
                // En escritorio, alternar la clase para todo el contenedor
                dashboardContainer.classList.toggle('sidebar-collapsed');
            }
        });
    }
    
    // === Navegación entre secciones ===
    if (sidebarLinks.length > 0) {
        sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Obtener el ID de la sección
                const sectionId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(`${sectionId}-content`);
                
                if (!targetSection) return;
                
                // Remover clase activa de todos los enlaces
                sidebarLinks.forEach(item => {
                    item.parentElement.classList.remove('active');
                });
                
                // Agregar clase activa al enlace seleccionado
                link.parentElement.classList.add('active');
                
                // Ocultar todas las secciones
                document.querySelectorAll('.dashboard-section').forEach(section => {
                    section.classList.remove('active');
                });
                
                // Mostrar la sección seleccionada
                targetSection.classList.add('active');
                
                // En móviles, cerrar el sidebar después de seleccionar
                if (window.innerWidth < 992) {
                    document.querySelector('.dashboard-sidebar').classList.remove('expanded');
                }
            });
        });
    }
    
    // === Dropdown de notificaciones ===
    if (notificationBtn && notificationsDropdown) {
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Cerrar cualquier otro dropdown abierto
            if (userDropdown.classList.contains('show')) {
                userDropdown.classList.remove('show');
            }
            
            // Alternar dropdown de notificaciones
            notificationsDropdown.classList.toggle('show');
        });
    }
    
    // === Dropdown de usuario ===
    if (topbarUser && userDropdown) {
        topbarUser.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Cerrar cualquier otro dropdown abierto
            if (notificationsDropdown.classList.contains('show')) {
                notificationsDropdown.classList.remove('show');
            }
            
            // Alternar dropdown de usuario
            userDropdown.classList.toggle('show');
        });
    }
    
    // === Cerrar dropdowns al hacer clic fuera ===
    document.addEventListener('click', () => {
        if (notificationsDropdown.classList.contains('show')) {
            notificationsDropdown.classList.remove('show');
        }
        
        if (userDropdown.classList.contains('show')) {
            userDropdown.classList.remove('show');
        }
    });
    
    // === Modal de cierre de sesión ===
    const openLogoutModal = () => {
        logoutModal.classList.add('show');
    };
    
    const closeLogoutModal = () => {
        logoutModal.classList.remove('show');
    };
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', openLogoutModal);
    }
    
    if (topbarLogout) {
        topbarLogout.addEventListener('click', (e) => {
            e.preventDefault();
            openLogoutModal();
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', closeLogoutModal);
    }
    
    if (cancelLogout) {
        cancelLogout.addEventListener('click', closeLogoutModal);
    }
    
    if (confirmLogout) {
        confirmLogout.addEventListener('click', () => {
            // En una implementación real, aquí cerrarías la sesión
            // Para esta demo, simplemente redireccionamos a la página de login
            window.location.href = '/index.html';
        });
    }
    
    // Cerrar modal con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && logoutModal.classList.contains('show')) {
            closeLogoutModal();
        }
    });
    
    // === Check "Marcar todas como leídas" ===
    const markAllRead = document.querySelector('.mark-all-read');
    if (markAllRead) {
        markAllRead.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remover clase "unread" de todas las notificaciones
            document.querySelectorAll('.notification-item.unread').forEach(item => {
                item.classList.remove('unread');
            });
            
            // Actualizar el contador de notificaciones
            const badge = document.querySelector('.notification-badge');
            if (badge) {
                badge.textContent = '0';
                badge.style.display = 'none';
            }
        });
    }
    
    // === Funcionalidad de tablas ===
    // Select All Checkbox
    const selectAllCheckbox = document.querySelector('.select-all-checkbox');
    const rowCheckboxes = document.querySelectorAll('.row-checkbox');
    
    if (selectAllCheckbox && rowCheckboxes.length > 0) {
        selectAllCheckbox.addEventListener('change', () => {
            rowCheckboxes.forEach(checkbox => {
                checkbox.checked = selectAllCheckbox.checked;
            });
        });
        
        // Actualizar "Seleccionar todos" cuando se cambian los checkboxes individuales
        rowCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const allChecked = Array.from(rowCheckboxes).every(cb => cb.checked);
                const someChecked = Array.from(rowCheckboxes).some(cb => cb.checked);
                
                selectAllCheckbox.checked = allChecked;
                selectAllCheckbox.indeterminate = someChecked && !allChecked;
            });
        });
    }
    
    // === Paginación ===
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    if (paginationButtons.length > 0) {
        paginationButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remover clase activa de todos los botones
                paginationButtons.forEach(btn => {
                    if (!btn.classList.contains('next')) {
                        btn.classList.remove('active');
                    }
                });
                
                // Agregar clase activa al botón seleccionado
                if (!button.classList.contains('next')) {
                    button.classList.add('active');
                }
                
                // Lógica para botón "next"
                if (button.classList.contains('next')) {
                    const activeButton = document.querySelector('.pagination-btn.active');
                    if (activeButton && activeButton.nextElementSibling && 
                        !activeButton.nextElementSibling.classList.contains('next')) {
                        activeButton.classList.remove('active');
                        activeButton.nextElementSibling.classList.add('active');
                    }
                }
                
                // En una implementación real, aquí cargarías los nuevos datos
                // Para esta demo, simplemente simulamos un cambio de página
                console.log('Cambiando a la página:', button.textContent || 'siguiente');
            });
        });
    }
    
    // === Filtros de tabla ===
    const filterStatus = document.querySelector('.filter-status');
    const filterCategory = document.querySelector('.filter-category');
    
    if (filterStatus) {
        filterStatus.addEventListener('change', () => {
            const selectedStatus = filterStatus.value;
            console.log('Filtrando por estado:', selectedStatus);
            
            // En una implementación real, aquí filtrarías los datos
            // Para esta demo, solo mostramos el valor seleccionado
        });
    }
    
    if (filterCategory) {
        filterCategory.addEventListener('change', () => {
            const selectedCategory = filterCategory.value;
            console.log('Filtrando por categoría:', selectedCategory);
            
            // En una implementación real, aquí filtrarías los datos
            // Para esta demo, solo mostramos el valor seleccionado
        });
    }
    
    // === Acciones de comentarios y entradas ===
    const setupActionButtons = () => {
        // Botones de acción de comentarios
        document.querySelectorAll('.comment-actions .action-btn').forEach(button => {
            button.addEventListener('click', () => {
                const action = button.classList.contains('view') ? 'ver' :
                               button.classList.contains('approve') ? 'aprobar' :
                               button.classList.contains('spam') ? 'marcar como spam' :
                               'eliminar';
                
                console.log(`Acción: ${action} comentario`);
                
                // En una implementación real, aquí manejarías la acción
                // Para esta demo, solo mostramos la acción seleccionada
                if (action === 'eliminar') {
                    // Simulación de eliminación
                    const commentRow = button.closest('tr');
                    if (commentRow) {
                        commentRow.style.opacity = '0.5';
                        setTimeout(() => {
                            commentRow.remove();
                        }, 500);
                    }
                }
            });
        });
        
        // Botones de acción de entradas
        document.querySelectorAll('.post-actions .action-btn').forEach(button => {
            button.addEventListener('click', () => {
                const action = button.classList.contains('edit') ? 'editar' :
                               button.classList.contains('view') ? 'ver' :
                               'eliminar';
                
                console.log(`Acción: ${action} entrada`);
                
                // En una implementación real, aquí manejarías la acción
                // Para esta demo, solo mostramos la acción seleccionada
                if (action === 'eliminar') {
                    // Simulación de eliminación
                    const postRow = button.closest('tr');
                    if (postRow) {
                        postRow.style.opacity = '0.5';
                        setTimeout(() => {
                            postRow.remove();
                        }, 500);
                    }
                }
            });
        });
    };
    
    setupActionButtons();
    
    // === Formulario de borrador rápido ===
    const draftForm = document.querySelector('.draft-form');
    
    if (draftForm) {
        draftForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const title = draftForm.querySelector('input[type="text"]').value;
            const content = draftForm.querySelector('textarea').value;
            const category = draftForm.querySelector('select').value;
            
            if (!title || !content || !category) {
                alert('Por favor completa todos los campos');
                return;
            }
            
            // Mostrar mensaje de éxito
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Borrador guardado correctamente';
            
            draftForm.appendChild(successMessage);
            
            // Limpiar formulario
            draftForm.reset();
            
            // Remover mensaje después de un tiempo
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        });
    }
    
    // === Responsividad ===
    // Ajustar el layout en función del tamaño de la pantalla
    const handleResize = () => {
        if (window.innerWidth < 992) {
            dashboardContainer.classList.remove('sidebar-collapsed');
        }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Inicialización
    handleResize();
});