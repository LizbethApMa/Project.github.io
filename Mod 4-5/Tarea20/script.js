// Selección de elementos del DOM
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

// Evento click
hamburger.addEventListener("click", () => {
    // Toggle (alternar) la clase 'active' en el menú y el botón
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});

// Opcional: Cerrar el menú al hacer click en un enlace
document.querySelectorAll(".nav-links li a").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
}));