/* DESCRIPCIÓN ------------------------------------------------------------------
Este fichero agrupa todas las funciones relativas a la clase Figure
------------------------------------------------------------------------------ */



/* CLASE Y FUNCIONES: OBJETOS DE LA CLASE FIGURE-------------------------------*/

// Contructor
class figure {
    constructor(x, y, array) {
        this.x = x              // Posición en x (columna)
        this.y = y              // Posición en y (fila)
        this.array = array      // Elemento estructurante
    }
}

// Añade la figura al tablero
figure.prototype.addToBoard = function() {
    for (var f = 0; f < this.array.length; f++) {
        for (var c = 0; c < this.array[0].length; c++) {
            if (this.array[f][c] != undefined) {
                board[this.y + f][this.x + c] = this.array[f][c];
            }
        }
    }
}

// Dibuja la figura sobre el Canvas 1
figure.prototype.draw = function(type) {
    
    for (var f = 0; f < this.array.length; f++) {
        for (var c = 0; c < this.array[0].length; c++) {
            if (this.array[f][c] != undefined) {

                ctx1.beginPath()
                ctx1.rect(square * (this.x + c) + 2*pad, square * (this.y + f) + 2*pad, square - 4*pad, square - 4*pad)
                
                if (type == "preview") {
                    ctx1.fillStyle = palette[7]
                    ctx1.strokeStyle = palette[15]

                } else {
                    ctx1.clearRect(square * (this.x + c) + 1*pad, square * (this.y + f) + 1*pad, square - 2*pad, square - 2*pad) // Evita solaparse con getPreview()
                    ctx1.fillStyle = palette[this.array[f][c]]
                    ctx1.strokeStyle = palette[this.array[f][c] + 8]
                }

                ctx1.fill()
                ctx1.stroke()
                ctx1.closePath()
            }
        }
    }
}

// Desdibuja la figura del Canvas 1
figure.prototype.undraw = function() {
    for (var f = 0; f < this.array.length; f++) {
        for (var c = 0; c < this.array.length; c++) {
            if (this.array[f][c] != undefined) {
                ctx1.clearRect(square * (this.x + c) + pad, square * (this.y + f) + pad, square - 2*pad, square - 2*pad)
            }
        }
    }
}

// Dibuja la figura en los canvas 2 o 3 (NEXT o HOLD)
figure.prototype.showInOtherCanvas = function(canvas, ctx) {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawGrid(canvas, ctx)

    if (this != undefined) {
        for (var f = 0; f < this.array.length; f++) {
            for (var c = 0; c < this.array[0].length; c++) {
                if (this.array[f][c] != undefined) {
                    ctx.beginPath()
                    ctx.rect((c + 1)*square + 2*pad, (f + 1)*square + 2*pad, square - 4*pad, square - 4*pad)
                    ctx.fillStyle = palette[this.array[f][c]]
                    ctx.strokeStyle = palette[this.array[f][c] + 8]
                    ctx.fill()
                    ctx.stroke()
                    ctx.closePath()
                }
            }
        }
    }
}

// Desplaza horizontal y/o verticalmente la figura
figure.prototype.move = function (dx, dy) {
    this.x += dx
    this.y += dy
}

// Rota la figura en sentido horario
figure.prototype.rotate = function(aux) {

    var choc = 0;
    for (var i = 0; i < this.array.length; i++) {
        for (var j = 0; j < this.array[0].length; j++) {
            this.array[i][j] = aux[(this.array.length - 1) - j][i];
        }
    }

    while (this.crash(0, 0)) {
        if (this.crash(0, 1)) {
            this.x--
            choc++
        }
        if (this.crash(0, -1)) {
            this.x++
            choc++
        }
        if (choc > 5) {
            this.array = JSON.parse(JSON.stringify(aux));
        }
    }
}

// Función booleana que dice si, para un hipotético desplazamiento, habría colisión
figure.prototype.crash = function(dy, dx) {

    for (var f = 0; f < this.array.length; f++) {
        for (var c = 0; c < this.array[0].length; c++) {

            if (this.y + f + dy < 0) {
                dy = 2
            }

            if (this.array[f][c] != undefined && (
                // Si sobrepaso por los lados...
                this.x + dx + c >= board[0].length || this.x + dx + c < 0
                // ... o excedo el board
                || this.y + f + dy >= board.length
                // ... o coincido con una figura congelada
                || board[this.y + f + dy][this.x + c + dx] >= 0
            )
            ) {
                return true;
            }
        }
    }
}

/* --------------------------------------------------------------------------- */






/* FUNCIONES: FUERA DE LA CLASE FIGURE --------------------------------------- */

/* Esta función devuelve un objeto de la clase Figure. Su elemento estructurante
es elegido de manera aleatoria, y la etiqueta de éste está asociada a un color,
también elegido de manera aleatoria. Dicho color está representado como un index
de la paleta de colores global. Los elementos estructurantes posibles son las
figuras del tetris: I, O, L, J, S, Z. */
function pickFigure() {

    allow_save_mode = true;
    var color = Math.floor(Math.random() * 7)
    var picker = Math.floor(Math.random() * 7)
    var array, x, y = [];

    switch (picker) {

        case 0:
            x = 3;
            y = -2;
            array = [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0]
            ];
            break;

        case 1:
            x = 3;
            y = -2;
            array = [
                [1, 1, 0],
                [0, 1, 0],
                [0, 1, 0]
            ];
            break;

        case 2:
            x = 3;
            y = -2;
            array = [
                [0, 1, 1],
                [0, 1, 0],
                [0, 1, 0]
            ];
            break;

        case 3:
            x = 4;
            y = -2;
            array = [
                [1, 1],
                [1, 1]
            ];
            break;

        case 4:
            x = 3;
            y = -1;
            array = [
                [0, 1, 1],
                [1, 1, 0],
                [0, 0, 0]
            ];
            break;

        case 5:
            x = 3;
            y = -1;
            array = [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0]
            ];
            break;

        case 6:
            x = 3;
            y = -1;
            array = [
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0]
            ];
            break;
    }

    // Asigna la etiqueta al color resultante del random
    for (i = 0; i < array.length; i++) {
        for (j = 0; j < array[0].length; j++) {
            if (array[i][j] == 0) {
                array[i][j] = undefined
            } else {
                array[i][j] = array[i][j] * color
            }
        }
    }
    
    return new figure(x, y, array)
}

// Devuelve la vista previa de la figura en juego: "¿Dónde caería si le doy a Drop?"
function getPreview() {

    var preview_figure = new figure(player.x, player.y, player.array);

    while (!preview_figure.crash(1, 0)) {
        preview_figure.move(0, 1);
    }

    return preview_figure;
}

/* --------------------------------------------------------------------------- */