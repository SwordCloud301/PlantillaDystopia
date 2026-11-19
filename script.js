// DYSTOPIA BOWLING — script.js
// Menú hamburguesa móvil

const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// ============================================
// SLIDESHOW CON EFECTO DISOLVER (CROSSFADE)
// ============================================
const capasFondo = document.querySelectorAll('.hero-bg-layer');

const imagenesFondo = [
    'fondos/DystopiaFondo.png',
    'fondos/DystopiaFondo2.png'
];

// Degradado oscuro superpuesto a cada foto
const filtroOscuro = `
    linear-gradient(
        180deg, 
        rgba(8, 4, 15, 0.72) 0%, 
        rgba(8, 4, 15, 0.55) 50%, 
        #08040f 100%
    )
`;

// Precargar imágenes
imagenesFondo.forEach(ruta => {
    const img = new Image();
    img.src = ruta;
});

let indiceImagen = 0;
let capaActiva = 0;

// Inicializar la primera capa inmediatamente al cargar
capasFondo[0].style.backgroundImage = `${filtroOscuro}, url('${imagenesFondo[0]}')`;

setInterval(() => {
    // Calcular la siguiente imagen y la capa que está oculta
    indiceImagen = (indiceImagen + 1) % imagenesFondo.length;
    const siguienteCapa = (capaActiva + 1) % 2;

    // Cargar la nueva imagen en la capa oculta
    capasFondo[siguienteCapa].style.backgroundImage = `${filtroOscuro}, url('${imagenesFondo[indiceImagen]}')`;

    // Hacer el fundido cruzado intercambiando la clase 'active'
    capasFondo[siguienteCapa].classList.add('active');
    capasFondo[capaActiva].classList.remove('active');

    capaActiva = siguienteCapa;
}, 5000);

// ============================================
// GALERÍA INFINITA DE FOTOS (SECCIÓN BOWLING)
// ============================================
const galleryTrack = document.getElementById('gallery-track');

const fotosGaleria = [
    'galeria/fotodystopia1.jpg',
    'galeria/fotodystopia2.jpg',
    'galeria/fotodystopia3.jpg',
    'galeria/fotodystopia4.jpg',
    'galeria/fotodystopia5.jpg',
    'galeria/fotodystopia6.jpg',
    'galeria/fotodystopia7.jpg',
    'galeria/fotodystopia8.jpg',
    'galeria/fotodystopia9.jpg'
];

// Duplicamos el arreglo para lograr un bucle continuo sin saltos visuales
const secuenciaInfinita = [...fotosGaleria, ...fotosGaleria];

secuenciaInfinita.forEach((ruta, index) => {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'gallery-item';

    const imagen = document.createElement('img');
    imagen.src = ruta;
    imagen.alt = `Instalaciones Dystopia Bowling ${(index % fotosGaleria.length) + 1}`;
    imagen.loading = 'lazy';

    tarjeta.appendChild(imagen);
    galleryTrack.appendChild(tarjeta);
});