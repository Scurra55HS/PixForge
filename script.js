const seletorGrid = document.getElementById("gridSelect");
const canvas = document.getElementById("canvasPixel");
const seletorCor = document.getElementById("seletorCor");


let corAtual = seletorCor.value;
let tamanhoGrid = 16;
let desenhando = false;

canvas.addEventListener("touchstart", e => {
    desenhando = true;
});

canvas.addEventListener("touchend", () => {
    desenhando = false;
});


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
            pixel.style.backgroundColor = modoBorracha ? "#111" : corAtual
            desenhando = true;
        });

        pixel.addEventListener("mouseover", () => {
            if (desenhando) {
                pixel.style.backgroundColor = modoBorracha ? "#111" : corAtual
            }
        });

        pixel.addEventListener("mouseup", () => {
            desenhando = false;
        });

        pixel.addEventListener("touchmove", () => {
            if (desenhando) {
                pixel.style.backgroundColor = modoBorracha ? "#111" : corAtual;
            }
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

const btnBorracha = document.getElementById("btnBorracha");
let modoBorracha = false;

btnBorracha.addEventListener("click", () => {
    modoBorracha = !modoBorracha;
    btnBorracha.textContent = modoBorracha ? "Pintar" : "Borracha";
});

const btnSalvar = document.getElementById("btnSalvar");

btnSalvar.addEventListener("click", () => {
    html2canvas(canvas).then(canvasImg => {
        const link = document.createElement("a");
        link.download = "pixforge.png";
        link.href = canvasImg.toDataURL();
        link.click();
    });
});


const inputBg = document.getElementById("inputBg");

inputBg.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        canvas.style.backgroundImage = `url(${reader.result})`;
    };
    reader.readAsDataURL(file);
});
