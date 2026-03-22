document.addEventListener("DOMContentLoaded", () => {
    const startBtn        = document.getElementById("start-btn");
    const landingSection  = document.getElementById("landing");
    const messageSection  = document.getElementById("message-section");
    const textContainer   = document.getElementById("typed-text-container");
    const finalAnimation  = document.getElementById("final-animation");
    const musicToggle     = document.getElementById("music-toggle");
    const bgMusic         = document.getElementById("bg-music");

    const message = [
        "Sabes lo muy especial que eres para mi, ya un año desde que volvimos a ser amigos, no sabes lo mucho que agradezco que lo fuéramos.",
        "Me has ayudado y apoyado tanto que en verdad no acabaría jamás en agradecerte todo, y sé que dirías que no lo tengo que hacer, que lo haces porque me quieres muchísimo, aún así me gustaría poder agradecértelo algún día.",
        "Así que toma esto como una promesa de que tendrás tus flores amarillas en algún otro 21 de marzo, a menos que me dejes de hablar pq algún inseguro no entienda nuestra amistad :b.",
        "Te quiero mucho Jatz, en verdad que me hubiera encantado poder darte unas reales, pero así como tú luego me dices que algún día me vas a llevar a esa convención de anime, que me vas a comprar juegos...",
        "Bueno, ahora yo te digo que algún día te voy a comprar las flores que te mereces."
    ];

    // Control de música
    let isMusicPlaying = false;
    musicToggle.addEventListener("click", () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicToggle.textContent = "🎵 Música: Off";
        } else {
            bgMusic.play();
            musicToggle.textContent = "🎵 Música: On";
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // Botón de inicio
    startBtn.addEventListener("click", () => {
        if (!isMusicPlaying) {
            bgMusic.play().catch(e => console.log("Interacción requerida para audio"));
            isMusicPlaying = true;
            musicToggle.textContent = "🎵 Música: On";
        }

        landingSection.classList.add("fade-out");

        setTimeout(() => {
            landingSection.classList.add("hidden");
            messageSection.classList.remove("hidden");
            messageSection.classList.add("fade-in");
            setTimeout(typeMessage, 800);
        }, 800);
    });

    // Máquina de escribir
    let paragraphIndex = 0;
    let charIndex = 0;
    let currentParagraphElement = null;

    function typeMessage() {
        if (paragraphIndex < message.length) {
            if (charIndex === 0) {
                currentParagraphElement = document.createElement("p");
                currentParagraphElement.className = "paragraph";
                textContainer.appendChild(currentParagraphElement);
            }

            const currentString = message[paragraphIndex];
            currentParagraphElement.textContent += currentString.charAt(charIndex);
            charIndex++;

            let typeSpeed = 40;
            if (currentString.charAt(charIndex - 1) === ',' || currentString.charAt(charIndex - 1) === '.') {
                typeSpeed = 400;
            }

            if (charIndex < currentString.length) {
                setTimeout(typeMessage, typeSpeed);
            } else {
                paragraphIndex++;
                charIndex = 0;
                setTimeout(typeMessage, 800);
            }
        } else {
            // Termina el texto → transición de escena
            setTimeout(transitionToFlowers, 1200);
        }
    }

    function transitionToFlowers() {
        // 1. La carta se desvanece
        messageSection.classList.add("fade-out");

        setTimeout(() => {
            // 2. Esconder la carta
            messageSection.classList.add("hidden");

            // 3. Mostrar la escena de flores a pantalla completa
            const flowerScene = document.getElementById("flower-scene-fullscreen");
            flowerScene.classList.remove("hidden");
            flowerScene.classList.add("scene-enter");
        }, 900);
    }

    // Sistema de pétalos cayendo
    const petalsContainer = document.getElementById("petals-container");
    const totalPetals = 30;

    function createPetal() {
        const petal = document.createElement("div");
        petal.classList.add("petal");

        const size = Math.random() * 15 + 10;
        petal.style.width  = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left   = `${Math.random() * 100}vw`;

        const fallDuration = Math.random() * 5 + 5;
        petal.style.animationDuration = `${fallDuration}s`;
        petal.style.animationDelay    = `${Math.random() * 5}s`;

        petalsContainer.appendChild(petal);

        setTimeout(() => {
            petal.remove();
            createPetal();
        }, (fallDuration + 5) * 1000);
    }

    for (let i = 0; i < totalPetals; i++) {
        createPetal();
    }
});