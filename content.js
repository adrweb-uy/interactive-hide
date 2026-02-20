// Este script se ejecuta en la página web.
// Aquí puedes seleccionar elementos y ocultarlos.

console.log("Extensión Interactive Hide cargada en: " + window.location.href);

// Función para ocultar elementos
function hideElements() {
  // Aquí pondremos los selectores que el usuario nos indique
  const selectors = [
    // Ejemplo: '.banner-publicidad', '#header-molesto'
  ];

  selectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.style.display = 'none';
      console.log(`Ocultado: ${selector}`);
    });
  });
}

// Ejecutar al cargar y también observar cambios en el DOM (para SPAs)
hideElements();
const observer = new MutationObserver(hideElements);
observer.observe(document.body, { childList: true, subtree: true });

