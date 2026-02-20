document.addEventListener('DOMContentLoaded', function() {
  const checkbox = document.getElementById('hideOneHead');
  const statusDiv = document.getElementById('status');

  // Cargar configuración guardada
  chrome.storage.sync.get(['hideOneHead'], function(result) {
    checkbox.checked = result.hideOneHead !== false; // Por defecto true si no existe
  });

  // Guardar configuración al cambiar
  checkbox.addEventListener('change', function() {
    const isChecked = checkbox.checked;
    
    chrome.storage.sync.set({ hideOneHead: isChecked }, function() {
      // Mostrar mensaje de guardado
      statusDiv.textContent = 'Configuración guardada.';
      setTimeout(() => {
        statusDiv.textContent = '';
      }, 1500);

      // Enviar mensaje al content script para actualizar inmediatamente
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: "updateConfig",
            config: { hideOneHead: isChecked }
          });
        }
      });
    });
  });
});
