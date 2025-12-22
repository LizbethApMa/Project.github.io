// Elementos del DOM
const form = document.getElementById('imcForm');
const pesoInput = document.getElementById('peso');
const alturaInput = document.getElementById('altura');
const edadInput = document.getElementById('edad');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

// Elementos del Modal
const confirmationModal = document.getElementById('confirmationModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalCancel = document.getElementById('modalCancel');
const modalConfirm = document.getElementById('modalConfirm');

// Historial de cálculos (Carga inicial)
let history = JSON.parse(localStorage.getItem('imcHistory')) || [];

/**
 * Muestra el modal genérico (ahora usado también para resultados)
 */
function showModal(title, message, showCancel = true, confirmText = 'Confirmar') {
    return new Promise((resolve) => {
        modalTitle.textContent = title;
        modalMessage.innerHTML = message; // Usamos innerHTML para permitir formato
        modalConfirm.textContent = confirmText;
        
        modalCancel.style.display = showCancel ? 'block' : 'none';
        confirmationModal.classList.add('active');

        modalConfirm.onclick = () => {
            confirmationModal.classList.remove('active');
            resolve(true);
        };
        modalCancel.onclick = () => {
            confirmationModal.classList.remove('active');
            resolve(false);
        };
    });
}

/**
 * Lógica de Negocio
 */
const calcularIMC = (peso, alturaCm) => peso / Math.pow(alturaCm / 100, 2);

function obtenerCategoria(imc) {
    if (imc < 18.5) return { nombre: 'Bajo peso', color: '#007fd4ff' };
    if (imc < 25) return { nombre: 'Normal', color: '#00e45fff' };
    if (imc < 30) return { nombre: 'Sobrepeso', color: '#ff8c00' };
    return { nombre: 'Obesidad', color: '#e4240fff' };
}

/**
 * Guarda el cálculo en LocalStorage y actualiza la lista
 */
function guardarEnHistorial(peso, altura, imc, categoriaObj) {
    const nuevoCalculo = {
        peso,
        altura,
        imc: imc.toFixed(1),
        categoria: categoriaObj.nombre,
        color: categoriaObj.color,
        fecha: new Date().toLocaleString('es-ES', { hour12: false })
    };
    
    history.unshift(nuevoCalculo); // Agregar al inicio
    if (history.length > 10) history.pop(); // Limitar a 10 registros
    
    localStorage.setItem('imcHistory', JSON.stringify(history));
    renderizarHistorial(true);
}

/**
 * Dibuja el historial en el HTML
 */
function renderizarHistorial(isNew = false) {
    if (history.length === 0) {
        historyList.innerHTML = '<p class="empty-history">No hay cálculos previos</p>';
        clearHistoryBtn.style.display = 'none';
        return;
    }
    
    clearHistoryBtn.style.display = 'block';
    historyList.innerHTML = history.map((item, index) => `
        <div class="history-item ${isNew && index === 0 ? 'new-item' : ''}">
            <div class="history-info">
                <div><strong>${item.peso}kg</strong> | ${item.altura}cm</div>
                <div class="history-date">${item.fecha}</div>
            </div>
            <div style="text-align: right">
                <div class="history-imc" style="color: ${item.color}">${item.imc}</div>
                <small style="color: ${item.color}">${item.categoria}</small>
            </div>
        </div>
    `).join('');
}

/**
 * Manejador del Formulario
 */
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const peso = parseFloat(pesoInput.value);
    const altura = parseFloat(alturaInput.value);
    
    if (isNaN(peso) || isNaN(altura)) return;

    const imc = calcularIMC(peso, altura);
    const cat = obtenerCategoria(imc);

    // 1. Mostrar Resultado en el Modal
    const mensajeResultado = `
        <div style="font-size: 2.5rem; font-weight: bold; color: ${cat.color}; margin: 10px 0;">
            ${imc.toFixed(1)}
        </div>
        <p style="color: ${cat.color}; font-weight: bold; text-transform: uppercase;">
            Categoría: ${cat.nombre}
        </p>
    `;

    await showModal('📊 Resultado del Cálculo', mensajeResultado, false, 'Entendido');

    // 2. Guardar en Historial
    guardarEnHistorial(peso, altura, imc, cat);
    
    // 3. Limpiar formulario
    form.reset();
});

// Limpiar historial con confirmación
clearHistoryBtn.addEventListener('click', async () => {
    const confirmar = await showModal(
        '¿Eliminar Historial?', 
        'Esta acción borrará todos tus registros permanentemente.',
        true,
        'Sí, eliminar'
    );
    
    if (confirmar) {
        history = [];
        localStorage.removeItem('imcHistory');
        renderizarHistorial();
    }
});

// Inicialización
renderizarHistorial();