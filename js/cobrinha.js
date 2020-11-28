let canvas = document.getElementById("cobrinha");
let context = canvas.getContext("2d");
let box = 32;
let direction = "direita";
let velocidade = 300;
let cobrinha = [];
cobrinha[0] = {
    x: 8 * box,
    y: 8 * box
};

let cobrinhaX = cobrinha[0].x;
let cobrinhaY = cobrinha[0].y;
let novaCabeca = {
    x: cobrinhaX,
    y: cobrinhaY,
};

let comida = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
};

function criarCampo() {
    context.fillStyle = "lightblue";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
    for (i = 0; i < cobrinha.length; i++) {
        context.fillStyle = "yellow";
        context.fillRect(cobrinha[i].x, cobrinha[i].y, box, box)
    }
}

function criarComida() {
    context.fillStyle = "red";
    context.fillRect(comida.x, comida.y, box, box);
}

document.addEventListener('keydown', atualiza);

function atualiza(event) {
    if (event.keyCode == 37 && direction != "direita") direction = "esquerda";
    if (event.keyCode == 38 && direction != "desce") direction = "sobe";
    if (event.keyCode == 39 && direction != "esquerda") direction = "direita";
    if (event.keyCode == 40 && direction != "sobe") direction = "desce";
}

function iniciarJogo() {

    if (cobrinha[0].x > 15 * box && direction == "direita") cobrinha[0].x = 0;
    if (cobrinha[0].x <= 0 && direction == "esquerda") cobrinha[0].x = 15 * box;
    if (cobrinha[0].y > 15 * box && direction == "desce") cobrinha[0].y = 0;
    if (cobrinha[0].y <= 0 && direction == "sobe") cobrinha[0].y = 15 * box;

    for (i = 1; i < cobrinha.length; i++) {
        if (cobrinha[0].x == cobrinha[i].x && cobrinha[0].y == cobrinha[i].y) {
            clearInterval(jogo);
            alert('GameOver :(');
        }
    }

    criarCampo();
    criarCobrinha();
    criarComida();

    cobrinhaX = cobrinha[0].x;
    cobrinhaY = cobrinha[0].y;

    if (direction == "direita") cobrinhaX += box;
    if (direction == "esquerda") cobrinhaX -= box;
    if (direction == "sobe") cobrinhaY -= box;
    if (direction == "desce") cobrinhaY += box;

    if (cobrinhaX != comida.x || cobrinhaY != comida.y) {
        cobrinha.pop();
    } else {
        comida.x = Math.floor(Math.random() * 15 + 1) * box,
            comida.y = Math.floor(Math.random() * 15 + 1) * box;
        jogo = setInterval(iniciarJogo, velocidade - 30);
    }

    novaCabeca = {
        x: cobrinhaX,
        y: cobrinhaY,
    };

    cobrinha.unshift(novaCabeca);
}

let jogo = setInterval(iniciarJogo, velocidade);