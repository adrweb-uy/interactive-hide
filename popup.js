document.addEventListener('DOMContentLoaded', function() {
  const checkboxOneHead = document.getElementById('hideOneHead');
  const checkboxNavItems = document.getElementById('hideNavItems');
  const checkboxQuoteHeader = document.getElementById('hideQuoteHeader');
  const statusDiv = document.getElementById('status');

  // Función genérica para guardar
  function saveConfig() {
    const config = {
      hideOneHead: checkboxOneHead.checked,
      hideNavItems: checkboxNavItems.checked,
      hideQuoteHeader: checkboxQuoteHeader.checked
    };
    
    chrome.storage.sync.set(config, function() {
      // Mostrar mensaje de guardado
      statusDiv.textContent = 'Configuración guardada.';
      setTimeout(() => {
        statusDiv.textContent = '';
      }, 1500);

      // Enviar mensaje al content script
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: "updateConfig",
            config: config
          });
        }
      });
    });
  }

  // Cargar configuración guardada
  chrome.storage.sync.get(['hideOneHead', 'hideNavItems', 'hideQuoteHeader'], function(result) {
    checkboxOneHead.checked = result.hideOneHead !== false; // Por defecto true
    checkboxNavItems.checked = result.hideNavItems !== false; // Por defecto true
    checkboxQuoteHeader.checked = result.hideQuoteHeader !== false; // Por defecto true
  });

  // Listeners
  checkboxOneHead.addEventListener('change', saveConfig);
  checkboxNavItems.addEventListener('change', saveConfig);
  checkboxQuoteHeader.addEventListener('change', saveConfig);
});
