/* DESCRIPCIÓN ------------------------------------------------------------------
Este fichero agrupa todas las variables y constantes globales del juego, así como
su función de inicialización y arranque
------------------------------------------------------------------------------ */



/* CONSTANTES GLOBALES: APARIENCIA ------------------------------------------- */
const square = 30, pad = 1, shadow_box_blurring = '8px'
const   /* Canvas 1 */ board_width = 10,    board_height = 20,  // Tablero
        /* Canvas 2 */ next_width = 5,      next_height = 5,    // Next
        /* Canvas 3 */ saved_width = 5,     saved_height = 5,   // Hold
        /* Canvas 4 */ score_width = 15.5,  score_height = 1    // Score

const palette = [
    // Paleta de colores global para figuras y tablero
    /*(i)------------------- Relleno ---------------------*/
    /* 0    CYAN */     "rgba(0,   255,      255,    0.3)",
    /* 1    VERD */     "rgba(17,  237,      172,    0.3)",
    /* 2    AMRL */     "rgba(237, 229,      17,     0.3)",
    /* 3    NARA */     "rgba(237, 126,      17,     0.3)",
    /* 4    AZUL */     "rgba(17,  48,       237,    0.3)",
    /* 5    VILT */     "rgba(162, 17,       237,    0.3)",
    /* 6    ROSA */     "rgba(238,   48,     218,    0.3)",
    /* 7    PREW */     "transparent",
    /* --------------------- Stroke ----------------------*/
    /* 8    CYAN */     "rgba(0,   255,      255,    1)",
    /* 9    VERD */     "rgba(17,  237,      172,    1)",
    /* 10   AMRL */     "rgba(237, 229,      17,     1)",
    /* 11   NARA */     "rgba(237, 126,      17,     1)",
    /* 12   AZUL */     "rgba(17,  48,       237,    1)",
    /* 13   VILT */     "rgba(162, 17,       237,    1)",
    /* 14   ROSA */     "rgba(238,   48,     218,    1)",
    /* 15   PREW */     "#ebebeb",
    /* ---------------------- Board ----------------------*/
    /* 16   GRID */     "black",
    /* 17   PAUS */     "rgba( 38,   38,     38,    0.7)",
    /* -------------------- Shadow-Box -------------------*/
    /* 18   AZUL */     "rgb(0,       0,    255)",
    /* 19   ROSA */     "rgb(255,     0,    190)",
    /* 20   VERD */     "rgb(0,    255,     135)",
    /* 21   ROJO */     "rgb(255,   135,      0)"
]

const background_video = [
    // Strings de ruta de los vídeos de fondo
    "./media/videos/level1.m4v",
    "./media/videos/level2.m4v",
    "./media/videos/level3.m4v",
    "./media/videos/level4.m4v"
]
/* --------------------------------------------------------------------------- */





/* VARIABLES Y CONSTANTES GLOBALES: FUNCIONAMIENTO --------------------------- */
var board           // Tablero Tetris
var player,         // Figura en juego
    saved_figure,   // Figura en HOLD
    next_figure     // Figura en NEXT
var allow_save_mode = true
var display_nav = document.getElementById("navigator")
const score_per_row = 100
var score_to_level_up, score, lvl, initial_level_selected
var interval, paused
/* --------------------------------------------------------------------------- */





/* FUNCIÓN: ARRANQUE DEL JUEGO ------------------------------------------------ */
 function startGame(initial_level) {
    
    // ---------- Inicialización de Canvas 1 ------------ //
    canvas1 = document.getElementById('canvas_1')
    ctx1 = canvas1.getContext('2d')
    canvas1.width = board_width * square
    canvas1.height = board_height * square

    // ---------- Inicialización de Canvas 2 ------------ //
    canvas2 = document.getElementById('canvas_2')
    ctx2 = canvas2.getContext('2d')
    canvas2.width = next_width * square
    canvas2.height = next_height * square

    // ---------- Inicialización de Canvas 3 ------------ //
    canvas3 = document.getElementById('canvas_3')
    ctx3 = canvas3.getContext('2d')  
    canvas3.width = saved_width * square
    canvas3.height = saved_height * square

    // ---------- Inicialización de Canvas 4 ------------ //
    canvas4 = document.getElementById('canvas_4')
    ctx4 = canvas4.getContext('2d')
    canvas4.width = score_width * square;
    canvas4.height= score_height * square;

    // ------ Inicialización botones y sus eventos ------ //
    botUp = document.getElementById("movUp")
    botDown = document.getElementById("movDown")
    botLeft = document.getElementById("movLeft")
    botRight = document.getElementById("movRight")
    botSave = document.getElementById("savePlayer")  
    botDrop = document.getElementById("drop")
    botReset = document.getElementById("reset")
    botPause = document.getElementById("pause")
    
    if (window.matchMedia("(max-width: 600px)").matches || window.matchMedia("(max-width: 1050px)").matches) {
        // Adaptación para la versión móvil
        botUp.addEventListener("touchstart", rotate_player)
        botDown.addEventListener("touchstart", accelerate_player)
        botLeft.addEventListener("touchstart", function(){move_player(-1)})
        botRight.addEventListener("touchstart", function(){move_player(+1)})
        botSave.addEventListener("touchstart", save_player)
        botDrop.addEventListener("touchstart", drop_player)
        botReset.addEventListener("touchstart", function(){reset_game(initial_level_selected)})
        botPause.addEventListener("touchstart", pause_game)
    } else {
        // Adaptación para la versión PC
        botUp.addEventListener("click", rotate_player)
        botDown.addEventListener("click", accelerate_player)
        botLeft.addEventListener("click", function(){move_player(-1)})
        botRight.addEventListener("click", function(){move_player(+1)})
        botSave.addEventListener("click", save_player)
        botDrop.addEventListener("click", drop_player)
        botReset.addEventListener("click", function(){reset_game(initial_level_selected)})
        botPause.addEventListener("click", pause_game)
    }
    
    // ------- Inicialización de eventos de tecla ------- //
    document.addEventListener('keydown', keys)

    // ---------- Inicialización de figuras -------------//
    player = pickFigure()
    next_figure = pickFigure()
    saved_figure = pickFigure()
    saved_figure.array = undefined
    paused = false

    // ------------ Preparación e impresión -------------//
    setAudioLevels()
    board = createBoard()
    score = 0
    score_to_level_up = 1000
    setLevel(initial_level)
    addPoints(0)
    showPoints()
    drawGrid(canvas1, ctx1)
    drawGrid(canvas2, ctx2)
    drawGrid(canvas3, ctx3)
    player.draw()
    next_figure.showInOtherCanvas(canvas2, ctx2)
    
    // ------------- Ejecución del juego ----------------//
    update()
}
/* --------------------------------------------------------------------------- */