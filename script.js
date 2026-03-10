 const TOTAL_SNOWFLAKES = 35;

    function createSnowflake() {
        const snowflake = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        snowflake.setAttribute("class", "snowflake");
        snowflake.setAttribute("width", "20");
        snowflake.setAttribute("height", "20");
        snowflake.setAttribute("viewBox", "0 0 24 24");

        // Posición y animación aleatorias
        snowflake.style.left = Math.random() * 100 + "vw";
        snowflake.style.animationDuration = Math.random() * 5 + 5 + "s"; 
        snowflake.style.animationDelay = Math.random() * 5 + "s"; 

        // SVG del copo de nieve
       snowflake.innerHTML = `
       <!-- Pétalos exteriores -->
       <path fill="#8B0000" d="M12 21.5c-4.5 0-9-3.5-9-8 0-3.5 3-6.5 6-7.5-1-2 1-4 3-4s4 2 3 4c3 1 6 4 6 7.5 0 4.5-4.5 8-9 8z""")/>>
       <!-- Capas internas para dar profundidad -->
       <path fill="#B22222" d="M12 19c-3 0-6-2.5-6-6 0-2.5 2-4.5 4-5.5-.5-1 0-2.5 2-2.5s2.5 1.5 2 2.5c2 1 4 3 4 5.5 0 3.5-3 6-6 6z""")/>>
       <!-- El núcleo (espiral) -->
       <path fill="#FF4D6D" d="M12 14.5c-1.5 0-2.5-1-2.5-2.5s1-2.5 2.5-2.5 2.5 1 2.5 2.5-1 2.5-2.5 2.5zm0-1c.8 0 1.5-.7 1.5-1.5S12.8 10.5 12 10.5 10.5 11.2 10.5 12s.7 1.5 1.5 1.5z""")/>>
       `;


        document.body.appendChild(snowflake);

        // Eliminar después de que termine la animación
        snowflake.addEventListener("animationend", () => {
            snowflake.remove();
            createSnowflake(); // Crear un nuevo copo
        });
    }

    // Crear copos de nieve
    for (let i = 0; i < TOTAL_SNOWFLAKES; i++) {
        setTimeout(createSnowflake, i * 200);
    }

const generateSpaceLayer = (size, selector) => {
  const layer = [];
  const totalStars = 200;

  for (let i = 0; i < totalStars; i++) {
    const x = Math.floor(Math.random() * 100);
    const y = Math.floor(Math.random() * 100);
    // Use backticks (`) for template literals
    layer.push(`${x}vw ${y}vh 0 white`);
  }

  const container = document.querySelector(selector);
  if (container) {
    // Remove the spaces in the variable names
    container.style.setProperty("--space-layer", layer.join(","));
    container.style.setProperty("--size", size);
  }
};
generateSpaceLayer("1px", ".space-1");

// --- flores: abrir en 15s ---
const flowers = document.querySelectorAll('.flower');
let flowersOpened = false;

const audio = document.getElementById("musica");
const contenedorMensaje = document.querySelector(".mensaje");

const lyrics = [

{time:15, text:"We could leave the Christmas lights up 'til January"},
{time:22, text:"And this is our place, we make the rules"},
{time:28, text:"And there's a dazzling haze, a mysterious way about you, dear"},
{time:36, text:"Have I known you twenty seconds or twenty years?"},

{time:42, text:"Can I go where you go?"},
{time:49, text:"Can we always be this close?"},
{time:54, text:"Forever and ever, ah"},
{time:57, text:"Take me out and take me home"},
{time:63, text:"You're my, my, my, my lover"},

{time:78, text:"We could let our friends crash in the living room"},
{time:85, text:"This is our place, we make the call"},
{time:92, text:"And I'm highly suspicious that everyone who sees you wants you"},
{time:98, text:"I've loved you three summers now, honey, but I want 'em all"},

{time:105, text:"Can I go where you go?"},
{time:112, text:"Can we always be this close?"},
{time:117, text:"Forever and ever, ah"},
{time:119, text:"Take me out and take me home (Forever and ever)"},
{time:127, text:"You're my, my, my, my lover"},

{time:133, text:"Ladies and gentlemen, will you please stand?"},
{time:137, text:"With every guitar string scar on my hand"},
{time:140, text:"I take this magnetic force of a man to be my lover"},
{time:147, text:"My heart's been borrowed and yours has been blue"},
{time:151, text:"All's well that ends well to end up with you"},
{time:154, text:"Swear to be overdramatic and true to my lover"},
{time:162, text:"And you'll save all your dirtiest jokes for me"},
{time:167, text:"And at every table, I'll save you a seat, lover"},

{time:175, text:"Can I go where you go?"},
{time:182, text:"Can we always be this close?"},
{time:188, text:"Forever and ever, ah"},
{time:190, text:"Take me out and take me home (Forever and ever)"},
{time:196, text:"You're my, my, my, my"},
{time:203, text:"Oh, you're my, my, my, my"},
{time:210, text:"Darling, you're my, my, my, my lover"}

];

let lyricIndex = 0;


// función que escribe el texto
function setLyric(text){
    contenedorMensaje.innerText = text;
}


// sincronización
function syncLyrics(){

    const current = audio.currentTime;

    // abrir flores al segundo 15 (una sola vez, con retraso por flor)
    if (!flowersOpened && current >= 15) {
         flowersOpened = true;
         flowers.forEach((f, i) => {
            // escalona la apertura por flor (i * 350ms)
            setTimeout(() => {
                f.classList.add('open');
            }, i * 350);
        });
    }

    if(lyricIndex < lyrics.length && current >= lyrics[lyricIndex].time){

        setLyric(lyrics[lyricIndex].text);
        lyricIndex++;

    }

    requestAnimationFrame(syncLyrics);
}


// cuando empieza el audio
audio.addEventListener("play", () => {

    lyricIndex = 0;
    syncLyrics();

});


// iniciar música con click
window.addEventListener("click", ()=>{

    if(!audio.paused) return;

    audio.currentTime = 14;
    audio.play();

}, {once:true});

// Al final de tu script.js
const botonCarta = document.querySelector('.boton-carta');
const carta = document.querySelector('.carta');
let estaAnimando = false; // Bloqueo para evitar bugs

botonCarta.addEventListener('click', () => {
    if (estaAnimando) return; // Si está en medio de una animación, no hace nada

    estaAnimando = true;
    carta.classList.toggle('mostrar');

    // El tiempo (1000ms) debe coincidir con el 'transition' de tu CSS
    setTimeout(() => {
        estaAnimando = false;
    }, 1000);
});

audio.addEventListener("ended", () => {
    // cantidad de pétalos
    const totalPetalos = 50;

    for(let i = 0; i < totalPetalos; i++) {
        const petalo = document.createElement("div");
        petalo.classList.add("confetti");

        // posición horizontal aleatoria
        petalo.style.left = Math.random() * 100 + "vw";

        // tamaño aleatorio
        const size = Math.random() * 12 + 8;
        petalo.style.width = size + "px";
        petalo.style.height = size + "px";

        // color aleatorio rosa-rojo
        const r = 255;
        const g = Math.floor(Math.random() * 80);
        const b = Math.floor(Math.random() * 100);
        petalo.style.backgroundColor = `rgb(${r},${g},${b})`;

        document.body.appendChild(petalo);

        // eliminar después de animar
        setTimeout(() => {
            petalo.remove();
        }, 4000 + Math.random()*2000); // duración de animación + margen
    }

    // mensaje final
    contenedorMensaje.innerText = "Feliz cumpleaños, Ceci 💖";
});