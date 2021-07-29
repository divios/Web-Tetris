/* DESCRIPCIÓN ------------------------------------------------------------------
Este fichero agrupa todas las funciones relativas a la impresión del tablero, del
Juego, así como otras encargadas de comprobar si existen filas completadas para
eliminarlas y recolocar el resto de figuras del tablero
------------------------------------------------------------------------------ */



/* FUNCIONES: INICIALIZACIÓN E IMPRESIÓN DEL TABLERO ------------------------- */

// Crea un tablero de dimensiones proporcionales al canvas
function createBoard() {
    newBoard = new Array(canvas1.height / square)

    for (i = 0; i < newBoard.length; i++) {
        newBoard[i] = new Array(canvas1.width / square)
    }

    return newBoard
}

// Borra todos los cuadrados ocupados del tablero
function clearBoard() {
    for (i = 0; i < board.length; i++) {
        for (j = 0; j < board[0].length; j++) {
            board[i][j] = undefined
        }
    }
}

// Dibuja la regilla en el canvas recibido como parámetro
function drawGrid(canvas, ctx) {
    
    var j = 0
    for (var i = 0; i < canvas.height * square; i = i + square) {

        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width * square, i)
        ctx.strokeStyle = palette[16]
        ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
        ctx.moveTo(j, 0)
        ctx.lineTo(j, canvas.height * square)
        ctx.strokeStyle = palette[16]
        ctx.stroke()
        ctx.closePath()

        if (j < canvas.width * square) {
            j = j + square
        }
    }
}

// Redibuja el tablero entero y las figuras contenidas en él
function redraw() {

    ctx1.clearRect(0, 0, canvas1.width, canvas1.height)

    for (i = 0; i < board.length; i++) {
        for (j = 0; j < board[0].length; j++) {
            if (board[i][j] != undefined) {
                ctx1.beginPath()
                ctx1.rect(square * j + 2*pad, square * i + 2*pad, square - 4*pad, square - 4*pad)
                ctx1.fillStyle = palette[board[i][j]]
                ctx1.strokeStyle = palette[board[i][j] + 8]       
                ctx1.stroke()
                ctx1.fill();
                ctx1.closePath()
            }
        }
    }

    drawGrid(canvas1, ctx1);
}

/* --------------------------------------------------------------------------- */








/* FUNCIONES: SUPRESIÓN DE FILAS COMPLETADAS --------------------------------- */

// Vacía el tablero hasta una determinada posición
function deleteAbove(pos) {

    for (i = 0; i < pos; i++) {
        for (j = 0; j < board[0].length; j++) {
            board[i][j] = undefined
        }
    }
}

// Devuelve una copia de la sección del tablero comprendida entre las filas [a, b]
function initArray(a, b) {

    var array = new Array(b - a - 1);

    if (a != 0) {
        a++
    }

    for (i = a; i < b; i++) {
        array[i - a] = new Array(board[0].length)
        for (j = 0; j < board[0].length; j++) {
            array[i - a][j] = board[i][j]
        }
    }

    return array
}

// Vacía las filas completadas, cuyos índices se reciben como parámetro en el array "row_index"
function breakblock(row_index) {

    for (i = 0; i < row_index.length; i++) {
        for (j = 0; j < board[0].length; j++) {
            board[ row_index[i] ][j] = undefined;
        }
    }
}

// Comprueba si existen filas completadas, y en caso afirmativo devuelve sus índices
function checkrows() {

    var non_successive_rows = []    // Lista de índices de filas completadas no consecutivas
    var all_rows = []               // Lista de indices de todas las filas completadas
    var FullArray = [2]             // Array que contiene ambas listas
    var previous = -8

    for (i = 0; i < player.array.length; i++) {
        for (j = 0; j < board[0].length; j++) {

            if (player.y + i < board.length) {

                if (board[player.y + i][j] == undefined) {
                    break

                } else if (j == board[0].length - 1) {

                    if (player.y + i != previous + 1) {    
                        previous = player.y + i 
                        non_successive_rows.push(previous)
                    } else {
                        previous++
                    }

                    all_rows.push(player.y + i)
                }
            }
        }
    }

    FullArray[0] = non_successive_rows 
    FullArray[1] = all_rows 

    return FullArray
}

// Efecto gravedad: Recoloca el resto de figuras tras haber eliminado las filas completadas
function gravity(rows) {

    /* Esta función aprovecha la clase Figure para fragmentar el tablero en Objetos
    y facilitar su recolocación. */
     
    if (rows.length == 1) {
        // Si tan solo nos pasan una fila:
        var board_1 = new figure(0, 0, initArray(0, rows[0]))
        deleteAbove(rows[0])

        // Bajamos las fichas hasta que haya un crash
        while (!board_1.crash(1, 0)) {
            board_1.move(0, 1)  
        }
        board_1.addToBoard()

    } else {
        // Si nos pasan dos:
        var board_1 = new figure(0, 0, initArray(0, rows[0]))
        var board_2 = new figure(0, (rows[0] + 1), initArray(rows[0], rows[1]))
        deleteAbove(rows[1])

        // Bajamos las fichas hasta que haya un crash: primero las de abajo... 
        while (!board_2.crash(1, 0)) {
            board_2.move(0, 1)
        }
        board_2.addToBoard()

        // ... y luego las de arriba
        while (!board_1.crash(1, 0)) {
            board_1.move(0, 1)
        }
        board_1.addToBoard()
    }

    redraw()
}

/* --------------------------------------------------------------------------- */