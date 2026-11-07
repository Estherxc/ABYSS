const diveButton = document.getElementById("diveButton");

let diving = false;

diveButton.addEventListener("click", () => {

    if (diving) return;

    diving = true;

    const diveScreen = document.createElement("div");
    diveScreen.className = "dive-screen";

    diveScreen.innerHTML = `
        <div class="dive-depth">
            <span>PROFUNDIDADE</span>
            <strong id="diveDepth">0 m</strong>
        </div>

        <div class="dive-progress">
            <div id="diveProgress"></div>
        </div>

        <div class="dive-center">
            <span>ABYSS EXPEDITION</span>
            <p>INICIANDO MERGULHO</p>
        </div>
    `;

    document.body.appendChild(diveScreen);

    const depthElement = document.getElementById("diveDepth");
    const progressElement = document.getElementById("diveProgress");

    const startTime = performance.now();
    const duration = 5500;
    const maxDepth = 200;

    function diveAnimation(currentTime) {

        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Deixa o início mais suave e acelera no meio
        const smoothProgress =
            progress * progress * (3 - 2 * progress);

        const depth = Math.floor(maxDepth * smoothProgress);

        depthElement.textContent = `${depth} m`;
        progressElement.style.height = `${progress * 100}%`;

        // Escurece o oceano conforme descemos
        const darkness = smoothProgress * 0.55;

        diveScreen.style.background = `
            linear-gradient(
                to bottom,
                rgba(0, 30, 55, ${0.35 + darkness * 0.4}),
                rgba(0, 5, 15, ${0.65 + darkness * 0.3})
            )
        `;

        if (progress < 1) {
            requestAnimationFrame(diveAnimation);
        } else {

            depthElement.textContent = "200 m";

            setTimeout(() => {

                diveScreen.classList.add("dive-finish");

                setTimeout(() => {

                    document.getElementById("explorar").scrollIntoView({
                        behavior: "smooth"
                    });

                    setTimeout(() => {
                        diveScreen.remove();
                        diving = false;
                    }, 900);

                }, 500);

            }, 500);
        }
    }

    requestAnimationFrame(diveAnimation);
});
