// === Login Functionality ===

document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginCard = document.querySelector('.login-card');
    const registerCard = document.querySelector('.register-card');
    const showRegisterBtn = document.getElementById('show-register');
    const showLoginBtn = document.getElementById('show-login');
    const togglePasswordBtn = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    // === Alternar entre formularios ===
    if (showRegisterBtn && showLoginBtn) {
        showRegisterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Ocultar formulario de login
            loginCard.style.opacity = '0';
            loginCard.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                loginCard.style.display = 'none';
                registerCard.style.display = 'block';
                
                // Mostrar formulario de registro
                setTimeout(() => {
                    registerCard.style.opacity = '1';
                    registerCard.style.transform = 'translateY(0)';
                }, 10);
            }, 300);
        });
        
        showLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Ocultar formulario de registro
            registerCard.style.opacity = '0';
            registerCard.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                registerCard.style.display = 'none';
                loginCard.style.display = 'block';
                
                // Mostrar formulario de login
                setTimeout(() => {
                    loginCard.style.opacity = '1';
                    loginCard.style.transform = 'translateY(0)';
                }, 10);
            }, 300);
        });
    }
    
    // === Toggle de visibilidad de contraseña ===
    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            // Cambiar tipo de input entre password y text
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Cambiar icono
            togglePasswordBtn.classList.toggle('fa-eye');
            togglePasswordBtn.classList.toggle('fa-eye-slash');
        });
    }
    
    // === Validación de formulario de login ===
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = passwordInput.value;
            const rememberMe = document.getElementById('remember').checked;
            
            // Validación básica
            let isValid = true;
            
            // Limpiar mensajes de error previos
            const prevError = loginForm.querySelector('.error-message');
            if (prevError) {
                prevError.remove();
            }
            
            // Validar email
            if (!isValidEmail(email)) {
                showInputError(document.getElementById('email'), 'Ingresa un correo electrónico válido');
                isValid = false;
            } else {
                clearInputError(document.getElementById('email'));
            }
            
            // Validar contraseña
            if (password.length < 6) {
                showInputError(passwordInput, 'La contraseña debe tener al menos 6 caracteres');
                isValid = false;
            } else {
                clearInputError(passwordInput);
            }
            
            if (isValid) {
                // Esta es una simulación de autenticación
                // En una implementación real, enviarías estos datos a un servidor
                
                // Datos de prueba para simulación
                const testUser = {
                    email: 'admin@cis.ieee.com',
                    password: 'admin123'
                };
                
                if (email === testUser.email && password === testUser.password) {
                    // Login exitoso
                    showSuccessMessage(loginForm, 'Inicio de sesión exitoso. Redirigiendo...');
                    
                    // Guardar info de sesión si "Recordarme" está marcado
                    if (rememberMe) {
                        localStorage.setItem('cisUser', JSON.stringify({ email }));
                    }
                    
                    // Redirigir al panel de administración después de un breve delay
                    setTimeout(() => {
                        window.location.href = window.location.origin + '/pages/login/dashboard.html';
                        console.log('Redirigiendo a dashboard...');
                    }, 1500);
                } else {
                    // Login fallido
                    showErrorMessage(loginForm, 'Correo electrónico o contraseña incorrectos');
                }
            }
        });
    }
    
    // === Validación de formulario de registro ===
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('reg-name').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const role = document.getElementById('reg-role').value;
            const message = document.getElementById('reg-message').value.trim();
            
            // Validación básica
            let isValid = true;
            
            // Limpiar mensajes de error previos
            const prevError = registerForm.querySelector('.error-message');
            if (prevError) {
                prevError.remove();
            }
            
            // Validar nombre
            if (name.length < 3) {
                showInputError(document.getElementById('reg-name'), 'Por favor, ingresa tu nombre completo');
                isValid = false;
            } else {
                clearInputError(document.getElementById('reg-name'));
            }
            
            // Validar email
            if (!isValidEmail(email)) {
                showInputError(document.getElementById('reg-email'), 'Ingresa un correo electrónico válido');
                isValid = false;
            } else {
                clearInputError(document.getElementById('reg-email'));
            }
            
            // Validar rol
            if (!role) {
                showInputError(document.getElementById('reg-role'), 'Por favor, selecciona tu rol');
                isValid = false;
            } else {
                clearInputError(document.getElementById('reg-role'));
            }
            
            // Validar mensaje
            if (message.length < 10) {
                showInputError(document.getElementById('reg-message'), 'Por favor, escribe un mensaje más detallado');
                isValid = false;
            } else {
                clearInputError(document.getElementById('reg-message'));
            }
            
            if (isValid) {
                // En una implementación real, enviarías estos datos a un servidor
                // Simulación de envío exitoso
                showSuccessMessage(registerForm, 'Solicitud enviada correctamente. Te contactaremos pronto.');
                
                // Limpiar formulario después de un breve delay
                setTimeout(() => {
                    registerForm.reset();
                    
                    // Volver al formulario de login
                    showLoginBtn.click();
                }, 2000);
            }
        });
    }
    
    // === Auto-completar desde localStorage ===
    const savedUser = localStorage.getItem('cisUser');
    if (savedUser && loginForm) {
        try {
            const userInfo = JSON.parse(savedUser);
            document.getElementById('email').value = userInfo.email || '';
            document.getElementById('remember').checked = true;
        } catch (error) {
            console.error('Error al recuperar información de usuario:', error);
        }
    }
});

// === Funciones de utilidad para validación ===

// Validar formato de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Mostrar error en un campo
function showInputError(inputElement, message) {
    // Marcar el input como inválido
    inputElement.classList.add('invalid');
    
    // Buscar si ya hay un mensaje de error
    let errorText = inputElement.parentElement.querySelector('.error-text');
    
    if (!errorText) {
        // Si no existe, crear uno nuevo
        errorText = document.createElement('span');
        errorText.classList.add('error-text');
        
        // Determinar dónde insertar el mensaje de error
        if (inputElement.parentElement.classList.contains('input-icon')) {
            inputElement.parentElement.after(errorText);
        } else {
            inputElement.after(errorText);
        }
    }
    
    // Actualizar el mensaje
    errorText.textContent = message;
}

// Limpiar error de un campo
function clearInputError(inputElement) {
    // Quitar clase de inválido
    inputElement.classList.remove('invalid');
    
    // Buscar y eliminar mensaje de error si existe
    const parent = inputElement.parentElement.classList.contains('input-icon') 
        ? inputElement.parentElement.parentElement 
        : inputElement.parentElement;
    
    const errorText = parent.querySelector('.error-text');
    if (errorText) {
        errorText.remove();
    }
}

// Mostrar mensaje de error en el formulario
function showErrorMessage(formElement, message) {
    // Crear mensaje de error
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error-message');
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    
    // Insertar al inicio del formulario
    formElement.prepend(errorDiv);
    
    // Añadir animación
    setTimeout(() => errorDiv.style.opacity = '1', 10);
}

// Mostrar mensaje de éxito en el formulario
function showSuccessMessage(formElement, message) {
    // Crear mensaje de éxito
    const successDiv = document.createElement('div');
    successDiv.classList.add('success-message');
    successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    
    // Insertar al inicio del formulario
    formElement.prepend(successDiv);
    
    // Añadir animación
    setTimeout(() => successDiv.style.opacity = '1', 10);
}