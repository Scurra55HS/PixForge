const seletorGrid = document.getElementById("gridSelect");
const canvas = document.getElementById("canvasPixel");

let tamanhoGrid = 16;
let desenhando = false;

function criarGrid(tamanho) {
    canvas.innerHTML = "";

    canvas.style.gridTemplateColumns = `repeat(${tamanho}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${tamanho}, 1fr)`;

    for (let i = 0; i < tamanho * tamanho; i++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");

        pixel.addEventListener("mousedown", () => {
            pixel.style.backgroundColor = "#fff";
            desenhando = true;
        });

        pixel.addEventListener("mouseover", () => {
            if (desenhando) {
                pixel.style.backgroundColor = "#fff";
            }
        });

        pixel.addEventListener("mouseup", () => {
            desenhando = false;
        });

        canvas.appendChild(pixel);
    }
}

seletorGrid.addEventListener("change", () => {
    tamanhoGrid = Number(seletorGrid.value);
    criarGrid(tamanhoGrid);
});

document.addEventListener("mouseup", () => {
    desenhando = false;
});

criarGrid(tamanhoGrid);
