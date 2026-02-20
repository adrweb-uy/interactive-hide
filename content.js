// Este script se ejecuta en la página web.
// Aquí puedes seleccionar elementos y ocultarlos.

console.log("Extensión Interactive Hide cargada en: " + window.location.href);

// Definir los estilos CSS para ocultar elementos
const STYLES = {
  hideOneHead: '.one-head { display: none !important; }'
};

// Crear elemento de estilo global
const styleElement = document.createElement('style');
styleElement.id = 'interactive-hide-styles';
document.head.appendChild(styleElement);

// Función para actualizar estilos según configuración
function updateStyles(config) {
  let cssContent = '';
  
  if (config.hideOneHead) {
    cssContent += STYLES.hideOneHead + '\n';
  }
  
  styleElement.textContent = cssContent;
  console.log("Estilos actualizados:", config);
}

// Cargar configuración inicial
chrome.storage.sync.get(['hideOneHead'], function(result) {
  // Por defecto true si es undefined
  const config = {
    hideOneHead: result.hideOneHead !== false
  };
  updateStyles(config);
});

// Escuchar cambios desde el popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "updateConfig") {
    updateStyles(request.config);
  }
});

// Escuchar cambios en storage (por si se cambia desde otra pestaña)
chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace === 'sync' && changes.hideOneHead) {
    const newValue = changes.hideOneHead.newValue;
    updateStyles({ hideOneHead: newValue });
  }
});


