// === Elementos del DOM ===
const chatbotToggle = document.querySelector('.chatbot-toggle');
const chatbotContainer = document.querySelector('.chatbot-container');
const closeChat = document.querySelector('.close-chat');
const chatMessages = document.querySelector('.chatbot-messages');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-btn');

// === Configuración del chatbot ===
// Información sobre CIS para entrenar el chatbot
const cisInfo = {
    nombre: "Capítulo CIS (Computational Intelligence Society) de IEEE - Universidad de La Sabana",
    descripcion: "Espacio de colaboración para entusiastas de la inteligencia artificial y la computación.",
    objetivos: [
        "Facilitar el conocimiento: Proporcionar recursos para el desarrollo de habilidades técnicas y conocimiento especializado en IA.",
        "Fomentar la colaboración: Promover la colaboración entre miembros y facilitar la creación de proyectos innovadores.",
        "Impulsar el crecimiento profesional: Brindar oportunidades para el crecimiento profesional y la expansión de la red de contactos.",
        "Abordar temas de vanguardia: Incentivar la investigación y el desarrollo de tecnologías vanguardistas en las ciencias de la computación y la inteligencia artificial."
    ],
    actividades: [
        "Talleres y seminarios: Organización de eventos para el intercambio de conocimientos y discusión de tendencias emergentes.",
        "Proyectos innovadores: Desarrollo colaborativo de proyectos punteros en inteligencia artificial y sistemas computacionales.",
        "Competencias: Participación en hackathons donde los estudiantes miden sus habilidades con otros de cualquier parte del mundo."
    ],
    beneficios: [
        "Aprendizaje continuo: Acceso a recursos educativos y oportunidades para adquirir nuevas habilidades.",
        "Networking profesional: Conexiones con profesionales influyentes y oportunidades de colaboración a nivel internacional.",
        "Reconocimiento global: Participación en eventos y proyectos que elevan el perfil y la visibilidad profesional."
    ],
    contacto: {
        email: "cis.ieee@unisabana.edu.co",
        ubicacion: "Universidad de La Sabana, Chía, Colombia"
    }
};

// Respuestas comunes pregrabadas
const presetResponses = {
    "saludo": "¡Hola! Soy el asistente virtual del Capítulo CIS. ¿En qué puedo ayudarte hoy?",
    "quienes_son": `Somos el ${cisInfo.nombre}, ${cisInfo.descripcion}`,
    "objetivos": `Nuestros principales objetivos son: ${cisInfo.objetivos.join(". ")}`,
    "actividades": `Organizamos diversas actividades como: ${cisInfo.actividades.join(". ")}`,
    "beneficios": `Ser miembro del capítulo te brinda: ${cisInfo.beneficios.join(". ")}`,
    "contacto": `Puedes contactarnos en ${cisInfo.contacto.email} o visitarnos en ${cisInfo.contacto.ubicacion}`,
    "inteligencia_artificial": "La inteligencia artificial es un campo en constante evolución. En nuestro capítulo exploramos las últimas tendencias y aplicaciones de la IA.",
    "unirse": "¡Genial! Para unirte al Capítulo CIS, puedes asistir a nuestras reuniones o enviarnos un correo a cis.ieee@unisabana.edu.co",
    "eventos": "Realizamos eventos periódicamente como talleres, charlas y hackathons. Puedes revisar la sección de Actividades en nuestra web para más información.",
    "fallback": "Lo siento, no tengo información sobre eso. ¿Puedes preguntar de otra manera o consultar sobre nuestros objetivos, actividades o cómo unirte al capítulo?"
};

// === Funcionalidad del chatbot ===
// Mostrar/ocultar el chatbot
if (chatbotToggle) {
    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.add('active');
    });
}

if (closeChat) {
    closeChat.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
    });
}

// Enviar mensaje presionando Enter
if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Enviar mensaje con el botón
if (sendButton) {
    sendButton.addEventListener('click', sendMessage);
}

// Función para enviar mensaje
function sendMessage() {
    const userMessage = chatInput.value.trim();
    
    if (userMessage === '') return;
    
    // Añadir mensaje del usuario al chat
    addMessage(userMessage, 'user');
    
    // Limpiar input
    chatInput.value = '';
    
    // Mostrar indicador de "escribiendo..."
    showTypingIndicator();
    
    // Procesar mensaje y obtener respuesta
    getResponse(userMessage);
}

// Añadir mensaje al chat
function addMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    
    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.textContent = text;
    
    messageElement.appendChild(messageContent);
    chatMessages.appendChild(messageElement);
    
    // Scroll al final del chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Mostrar indicador de "escribiendo..."
function showTypingIndicator() {
    const typingElement = document.createElement('div');
    typingElement.classList.add('message', 'bot', 'typing-indicator');
    
    const typingContent = document.createElement('div');
    typingContent.classList.add('message-content');
    typingContent.innerHTML = '<span>.</span><span>.</span><span>.</span>';
    
    typingElement.appendChild(typingContent);
    chatMessages.appendChild(typingElement);
    
    // Scroll al final del chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Quitar indicador de "escribiendo..."
function removeTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Obtener respuesta basada en el mensaje del usuario
async function getResponse(userMessage) {
    try {
        // Primero intentamos con respuestas pregrabadas
        const response = getPresetResponse(userMessage);
        
        if (response) {
            // Pequeño delay para simular procesamiento
            setTimeout(() => {
                removeTypingIndicator();
                addMessage(response, 'bot');
            }, 1000);
            return;
        }
        
        // Si no hay respuesta pregrabada, usamos API de Hugging Face (versión gratuita)
        // Nota: En una implementación real, necesitarías registrarte en Hugging Face y obtener un token API
        // https://huggingface.co/docs/api-inference/quicktour
        
        const API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-base";
        const API_TOKEN = "hf_XXXXXXX"; // Reemplazar con tu token real al implementar
        
        const promptText = `Responde a la siguiente pregunta sobre el Capítulo CIS de IEEE: "${userMessage}"
        
        Información sobre CIS:
        - Nombre: ${cisInfo.nombre}
        - Descripción: ${cisInfo.descripcion}
        - Objetivos principales: ${cisInfo.objetivos.join("; ")}
        - Actividades: ${cisInfo.actividades.join("; ")}
        - Beneficios: ${cisInfo.beneficios.join("; ")}
        - Contacto: Email: ${cisInfo.contacto.email}, Ubicación: ${cisInfo.contacto.ubicacion}
        
        Responde de manera breve, amable y profesional. Máximo 3 oraciones.`;
        
        // Para fines de demostración, usamos un timeout para simular la API
        // En producción, descomentar el fetch y comentar el timeout
        
        /*
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: promptText })
        });
        
        if (!response.ok) {
            throw new Error("Error en la API");
        }
        
        const data = await response.json();
        const aiResponse = data[0].generated_text || presetResponses.fallback;
        */
        
        // Simulación de respuesta de API (para demo)
        setTimeout(() => {
            removeTypingIndicator();
            const aiResponse = presetResponses.fallback;
            addMessage(aiResponse, 'bot');
        }, 1500);
        
    } catch (error) {
        console.error("Error al obtener respuesta:", error);
        
        setTimeout(() => {
            removeTypingIndicator();
            addMessage("Lo siento, estoy teniendo problemas para responder en este momento. Por favor, inténtalo de nuevo más tarde.", 'bot');
        }, 1000);
    }
}

// Identificar si hay una respuesta pregrabada adecuada
function getPresetResponse(userMessage) {
    // Convertir mensaje a minúsculas para comparación
    const lowerMessage = userMessage.toLowerCase();
    
    // Patrones para reconocimiento básico de intención
    const patterns = {
        "saludo": /^(hola|saludos|buenos días|buenas tardes|buenas noches|hey|hi|hello)/i,
        "quienes_son": /(quiénes son|qué es|cuál es el capítulo|info sobre el capítulo|acerca del capítulo|qué hacen)/i,
        "objetivos": /(objetivos|propósitos|metas|fines|qué buscan)/i,
        "actividades": /(actividades|eventos|qué organizan|talleres|seminarios|proyectos)/i,
        "beneficios": /(beneficios|ventajas|qué gano|por qué unirme|qué me aporta)/i,
        "contacto": /(contacto|email|correo|ubicación|dónde están|cómo contactar)/i,
        "inteligencia_artificial": /(inteligencia artificial|IA|AI|machine learning|aprendizaje automático)/i,
        "unirse": /(unirse|cómo me uno|ser miembro|formar parte|entrar|participar)/i,
        "eventos": /(próximos eventos|calendario|cuándo|fechas|cuándo son los eventos)/i
    };
    
    // Verificar patrones
    for (const [key, pattern] of Object.entries(patterns)) {
        if (pattern.test(lowerMessage)) {
            return presetResponses[key];
        }
    }
    
    // Si no hay coincidencia, devolvemos null para usar la API
    return null;
}

// Inicialización automática del chatbot después de un tiempo
setTimeout(() => {
    if (chatbotContainer && !chatbotContainer.classList.contains('active')) {
        const notification = document.createElement('div');
        notification.classList.add('chatbot-notification');
        notification.textContent = '¿Tienes alguna pregunta?';
        
        if (chatbotToggle) {
            chatbotToggle.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('show');
                
                // Remover la notificación después de un tiempo
                setTimeout(() => {
                    notification.classList.remove('show');
                    setTimeout(() => {
                        notification.remove();
                    }, 300);
                }, 5000);
            }, 100);
        }
    }
}, 10000); // 10 segundos después de cargar la página