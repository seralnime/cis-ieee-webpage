// === Blog Functionality ===

document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM para la página de blog
    const categoryItems = document.querySelectorAll('.category-item');
    const postCards = document.querySelectorAll('.post-card');
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    // === Filtrado por categorías ===
    if (categoryItems.length > 0 && postCards.length > 0) {
        categoryItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remover clase activa de todos los items
                categoryItems.forEach(cat => cat.classList.remove('active'));
                
                // Agregar clase activa al item seleccionado
                item.classList.add('active');
                
                const selectedCategory = item.dataset.category;
                
                // Filtrar artículos por categoría
                postCards.forEach(card => {
                    if (selectedCategory === 'all' || card.dataset.category === selectedCategory) {
                        card.style.display = 'block';
                        
                        // Animación para los cards visibles
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        // Ocultar cards que no coinciden con la categoría
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // === Funcionalidad de búsqueda ===
    if (searchInput && searchButton && postCards.length > 0) {
        // Función para realizar la búsqueda
        const performSearch = () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                // Si la búsqueda está vacía, mostrar todos los posts
                postCards.forEach(card => {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
                
                // Restablecer filtro de categoría
                categoryItems.forEach(cat => {
                    if (cat.dataset.category === 'all') {
                        cat.classList.add('active');
                    } else {
                        cat.classList.remove('active');
                    }
                });
                
                return;
            }
            
            // Recorrer cada card y verificar si el título o contenido contiene el término de búsqueda
            postCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const content = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || content.includes(searchTerm)) {
                    card.style.display = 'block';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // Desactivar filtros de categoría
            categoryItems.forEach(cat => cat.classList.remove('active'));
        };
        
        // Evento para búsqueda con click
        searchButton.addEventListener('click', performSearch);
        
        // Evento para búsqueda con Enter
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // === Paginación ===
    if (paginationButtons.length > 0) {
        paginationButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Solo para demostración, normalmente harías una petición AJAX
                // para cargar los siguientes artículos
                
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
                
                // Simular carga de nuevos artículos
                if (button.classList.contains('next')) {
                    // Encontrar el botón activo actual
                    const activeButton = document.querySelector('.pagination-btn.active');
                    const nextPage = parseInt(activeButton.textContent) + 1;
                    
                    // Si hay un botón para la siguiente página, activarlo
                    const nextPageButton = Array.from(paginationButtons).find(btn => 
                        !btn.classList.contains('next') && parseInt(btn.textContent) === nextPage
                    );
                    
                    if (nextPageButton) {
                        activeButton.classList.remove('active');
                        nextPageButton.classList.add('active');
                    }
                }
                
                // Scroll al inicio de los posts
                document.querySelector('.blog-posts').scrollIntoView({ behavior: 'smooth' });
                
                // En una implementación real, aquí cargarías los nuevos artículos
                // mediante una llamada AJAX y actualizarías el DOM
            });
        });
    }
    
    // === Formulario de Newsletter ===
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email === '') {
                // Mostrar error
                emailInput.classList.add('error');
                return;
            }
            
            // Simulación de envío exitoso
            // En una implementación real, enviarías los datos a un servidor
            
            // Mostrar mensaje de éxito
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.textContent = '¡Gracias por suscribirte a nuestro newsletter!';
            
            // Reemplazar el formulario con el mensaje de éxito
            newsletterForm.style.display = 'none';
            newsletterForm.parentNode.appendChild(successMessage);
            
            // Reiniciar formulario después de un tiempo
            setTimeout(() => {
                newsletterForm.reset();
                successMessage.remove();
                newsletterForm.style.display = 'flex';
            }, 5000);
        });
    }
    
    // === Detección de la página de post individual ===
    const isPostPage = window.location.pathname.includes('post.html');
    
    if (isPostPage) {
        // Obtener el ID del post de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');
        
        if (postId) {
            // En una implementación real, aquí cargarías los datos del artículo
            // mediante una llamada AJAX basada en el ID
            
            // Para esta demo, simplemente mostraremos un mensaje en la consola
            console.log(`Cargando artículo con ID: ${postId}`);
            
            // === Comentarios ===
            setupCommentFunctionality();
            
            // === Compartir en redes sociales ===
            setupShareButtons();
        }
    }
});

// === Funcionalidad de comentarios ===
function setupCommentFunctionality() {
    const commentForm = document.querySelector('.comment-form');
    const commentsList = document.querySelector('.comments-list');
    
    if (!commentForm || !commentsList) return;
    
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const textarea = commentForm.querySelector('textarea');
        const commentText = textarea.value.trim();
        
        if (commentText === '') return;
        
        // Crear un nuevo comentario (en una implementación real, enviarías esto al servidor)
        const newComment = createCommentElement({
            author: 'Usuario',
            date: 'Justo ahora',
            content: commentText,
            avatar: '../../assets/images/user-avatar.jpg'
        });
        
        // Agregar el comentario al inicio de la lista
        commentsList.prepend(newComment);
        
        // Limpiar el formulario
        textarea.value = '';
        
        // Animar el nuevo comentario
        setTimeout(() => {
            newComment.style.opacity = '1';
            newComment.style.transform = 'translateY(0)';
        }, 10);
    });
    
    // Manejador para las acciones de comentarios (responder, me gusta)
    document.addEventListener('click', (e) => {
        // Acción de "Me gusta"
        if (e.target.classList.contains('like-action') || e.target.parentElement.classList.contains('like-action')) {
            const likeAction = e.target.classList.contains('like-action') ? e.target : e.target.parentElement;
            const likeCount = likeAction.querySelector('span');
            
            if (likeAction.classList.contains('liked')) {
                // Quitar like
                likeAction.classList.remove('liked');
                likeCount.textContent = parseInt(likeCount.textContent) - 1;
            } else {
                // Dar like
                likeAction.classList.add('liked');
                likeCount.textContent = parseInt(likeCount.textContent) + 1;
            }
        }
        
        // Acción de "Responder"
        if (e.target.classList.contains('reply-action') || e.target.parentElement.classList.contains('reply-action')) {
            const comment = e.target.closest('.comment');
            let replyForm = comment.querySelector('.reply-form');
            
            if (replyForm) {
                // Si ya existe un formulario, alternamos su visibilidad
                replyForm.style.display = replyForm.style.display === 'none' ? 'block' : 'none';
            } else {
                // Crear formulario de respuesta
                replyForm = document.createElement('form');
                replyForm.classList.add('reply-form');
                replyForm.innerHTML = `
                    <textarea placeholder="Escribe tu respuesta..."></textarea>
                    <div class="form-actions">
                        <button type="button" class="btn secondary-btn cancel-reply">Cancelar</button>
                        <button type="submit" class="btn primary-btn">Responder</button>
                    </div>
                `;
                
                // Agregar el formulario
                const commentActions = comment.querySelector('.comment-actions');
                commentActions.after(replyForm);
                
                // Enfocar el textarea
                replyForm.querySelector('textarea').focus();
                
                // Manejar cancelación
                replyForm.querySelector('.cancel-reply').addEventListener('click', () => {
                    replyForm.remove();
                });
                
                // Manejar envío de respuesta
                replyForm.addEventListener('submit', (event) => {
                    event.preventDefault();
                    
                    const textarea = replyForm.querySelector('textarea');
                    const replyText = textarea.value.trim();
                    
                    if (replyText === '') return;
                    
                    // Encontrar o crear el contenedor de respuestas
                    let repliesContainer = comment.querySelector('.comment-replies');
                    if (!repliesContainer) {
                        repliesContainer = document.createElement('div');
                        repliesContainer.classList.add('comment-replies');
                        comment.appendChild(repliesContainer);
                    }
                    
                    // Crear el elemento de respuesta
                    const newReply = createCommentElement({
                        author: 'Usuario',
                        date: 'Justo ahora',
                        content: replyText,
                        avatar: '../../assets/images/user-avatar.jpg',
                        isReply: true
                    });
                    
                    // Agregar la respuesta
                    repliesContainer.appendChild(newReply);
                    
                    // Animar la nueva respuesta
                    setTimeout(() => {
                        newReply.style.opacity = '1';
                        newReply.style.transform = 'translateY(0)';
                    }, 10);
                    
                    // Eliminar el formulario
                    replyForm.remove();
                });
            }
        }
    });
}

// Función para crear elementos de comentario
function createCommentElement({ author, date, content, avatar, isReply = false }) {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    
    if (isReply) {
        commentElement.classList.add('comment-reply');
    }
    
    // Estilo inicial para animación
    commentElement.style.opacity = '0';
    commentElement.style.transform = 'translateY(20px)';
    commentElement.style.transition = 'all 0.3s ease';
    
    commentElement.innerHTML = `
        <div class="comment-header">
            <div class="comment-avatar">
                <img src="${avatar}" alt="${author}">
            </div>
            <div class="comment-info">
                <h4>${author}</h4>
                <div class="comment-date">${date}</div>
            </div>
        </div>
        <div class="comment-body">
            <p>${content}</p>
        </div>
        <div class="comment-actions">
            <a href="#" class="comment-action like-action">
                <i class="far fa-heart"></i> 
                <span>0</span>
            </a>
            ${!isReply ? '<a href="#" class="comment-action reply-action"><i class="far fa-comment"></i> Responder</a>' : ''}
        </div>
    `;
    
    return commentElement;
}

// === Funcionalidad de compartir ===
function setupShareButtons() {
    const shareButtons = document.querySelectorAll('.share-button');
    
    if (!shareButtons.length) return;
    
    shareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const shareUrl = encodeURIComponent(window.location.href);
            const shareTitle = encodeURIComponent(document.title);
            let shareLink;
            
            // Determinar la red social
            if (button.classList.contains('facebook')) {
                shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
            } else if (button.classList.contains('twitter')) {
                shareLink = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`;
            } else if (button.classList.contains('linkedin')) {
                shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
            }
            
            // Abrir ventana de compartir
            if (shareLink) {
                window.open(shareLink, '_blank', 'width=600,height=400');
            }
        });
    });
}