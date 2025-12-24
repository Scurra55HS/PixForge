const seletorGrid = document.getElementById("gridSelect");
const canvas = document.getElementById("canvasPixel");
const seletorCor = document.getElementById("seletorCor");


let corAtual = seletorCor.value;
let tamanhoGrid = 16;
let desenhando = false;

seletorCor.addEventListener("change", () => {
    corAtual = seletorCor.value;
});

function criarGrid(tamanho) {
    canvas.innerHTML = "";

    canvas.style.gridTemplateColumns = `repeat(${tamanho}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${tamanho}, 1fr)`;

    for (let i = 0; i < tamanho * tamanho; i++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");

        pixel.addEventListener("mousedown", () => {
            pixel.style.backgroundColor = corAtual;
            desenhando = true;
        });

        pixel.addEventListener("mouseover", () => {
            if (desenhando) {
                pixel.style.backgroundColor = corAtual;
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

const btnLimpar = document.getElementById("btnLimpar");

btnLimpar.addEventListener("click", () => {
    document.querySelectorAll(".pixel").forEach(pixel => {
        pixel.style.backgroundColor = "#111";
    });
});
