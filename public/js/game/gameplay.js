/* DESCRIPCIÓN ------------------------------------------------------------------
Este fichero agrupa todas las funciones encargadas de manejar el flujo del juego,
su puntuación y la interacción del usuario con las teclas
------------------------------------------------------------------------------ */



/* FUNCIONES: ADMINISTRACIÓN DE PUNTUACIÓN Y NIVEL --------------------------- */

// Añade los puntos ganados y actualiza el nivel en consecuencia
function addPoints(points){

    score += points

    if (score >= score_to_level_up && lvl < 4) {
        setLevel(lvl + 1);
        score_to_level_up = 1000*lvl;
    }

    if (points != 4*score_per_row) {
        // Si se rompen 1, 2 o 3 filas reproduzco un SFX
        SFX_ROW[0].pause();
        SFX_ROW[0].currentTime = 0;
        SFX_ROW[0].play();
    } else {
        // Si se rompen 4 de golpe, reproduzco un SFX distinto
        SFX_ROW[1].pause();
        SFX_ROW[1].currentTime = 0;
        SFX_ROW[1].play();
    }
}

// Actualiza el nivel y todas las animaciones y sonidos asociados a dicho nivel
function setLevel(new_level) {

    if (lvl > 0 && lvl < 5) {
        MUSIC_LVL[lvl-1].pause()
        MUSIC_LVL[lvl-1].currentTime = 0
    }

    if (MUSIC_LVL[lvl-1] != undefined && MUSIC_LVL[lvl-1].muted) {
        // Si el usuario ha muteado la música:
        MUSIC_LVL[lvl-1].muted = false // Desmuteo el nivel actual
        lvl = new_level 
        MUSIC_LVL[lvl-1].muted = true // Muteo el siguiente
        MUSIC_LVL[lvl-1].play()
        SFX_LVLUP[lvl-1].play()
    } else {
        // Si el usuario no ha muteado la música:
        lvl = new_level
        MUSIC_LVL[lvl-1].play()
        SFX_LVLUP[lvl-1].play()
    }

    // Actualización del shadow-box del juego
    $(".canvas, progress, .canvas_title, .controls_box").
    css("box-shadow", "0 0 " + shadow_box_blurring + " " + palette[17+lvl])

    // Actualización del fondo de pantalla
    document.getElementById("selected_video").src = background_video[lvl-1]
    document.getElementById("myVideo").load()
    $("#backing_video").css("display","block")

    // Animación de level up y start game   
    if (new_level == initial_level_selected) {
        $(".start_game_animation").css("text-shadow", "0px 0px 3px " + palette[17+lvl] + ", 0px 0px 10px " + palette[17+lvl])
        $(".start_game_animation").css("animation", "level_up_fx 3s")      
    } else {
        $(".level_up_animation").css("text-shadow", "0px 0px 3px " + palette[17+lvl] + ", 0px 0px 10px " + palette[17+lvl])
        $(".level_up_animation").css("animation", "level_up_fx 3s")  
    }
}

// Muestra la puntuación y el nivel actual en el Canvas 4 y la barra de progreso
function showPoints() {

    ctx4.clearRect(0, 0, canvas4.width, canvas4.height)
    ctx4.font = "15px Arial"
    ctx4.fillStyle = "white"
    ctx4.textAlign = "center"
    ctx4.fillText("LEVEL: " + lvl, canvas4.width/2 + 100, canvas4.height/2 + 5)
    ctx4.fillText("SCORE: " + score, canvas4.width/2 - 100, canvas4.height/2 + 5)
    
    document.getElementById("score_progress").value = score
}

/* --------------------------------------------------------------------------- */






// Comprueba la situación de la figura en juego en el tablero y actualiza su estado
var_reset = 0
function update() {

    // Reproducción en bucle mediante evento multimedia
    if (MUSIC_LVL[lvl-1] != undefined) {
        MUSIC_LVL[lvl-1].onended = function() {
            MUSIC_LVL[lvl-1].play()
            console.log("Re-reproducción")
        }
    }

    // Adaptación de la versión móvil
    display_nav.style.display = "none"
    if (window.matchMedia("(max-width: 600px)").matches || window.matchMedia("(max-width: 1050px)").matches) {

        if (window.matchMedia("(max-width: 600px)").matches) {
            document.getElementById("myVideo").style.right = "-200%"
        } else {
            document.getElementById("myVideo").style.left = "-50%" 
        }

        botRight.style.background = "grey"
        botLeft.style.background = "grey"
        botSave.style.background = "grey"
        botUp.style.background = "grey"
        botDrop.style.background = "grey"
        botDown.style.background = "grey"

        if (var_reset != 1) {
            botReset.style.background = "grey"
        }

        var_reset = 0

    } else {
        document.getElementById("myVideo").style.right = "0px"
        document.getElementById("myVideo").style.left = "0px"
    }


    
    if (!player.crash(1, 0)) {  // No hay colisión
        
        player.undraw()
        getPreview().undraw();
        player.move(0, 1)
        getPreview().draw("preview");
        player.draw()

        if (!player.crash(1, 0)){
            if (paused == false){
                SFX_STEP.pause()
                SFX_STEP.currentTime = 0    
                SFX_STEP.play()
            }
            paused = false
            
        } else {
            SFX_CRASH.play()
        }

    } else if (player.crash(1, 0) && player.y < 0) {    // No caben más piezas
        
        endgame()
        lvl =0

    } else {    // La figura en juego ha colisionado
        
        player.addToBoard()
        aux = checkrows()

        if ((Array.isArray(aux[0])) && aux[0].length) {
            // Si aux no está vacío...
            breakblock(aux[1]); // Rompe las filas llenas
            gravity(aux[0]) // Separa en figuras el tablero y las baja

            addPoints(score_per_row * aux[1].length);
            showPoints();
        }

        // Actualizamos las figuras y dibujamos
        player = next_figure;
        next_figure = pickFigure()
        SFX_POP.play()
        
        getPreview().draw("preview");
        player.draw()
        next_figure.showInOtherCanvas(canvas2, ctx2)
    }
    
    interval = setTimeout(update, 1000/lvl)
}






/* FUNCIONES: ACCIONES ASOCIADAS A CADA BOTÓN/TECLA -------------------------- */

// Asigna una función a cada tecla
function keys(e) {

    switch (e.keyCode) {
        
        case 13: // ENTER
            drop_player(e)
            break

        case 37: // IZQUIERDA
            move_player(-1)
            break;

        case 38: // ARRIBA
            rotate_player(e)
            break;

        case 39: // DERECHA
            move_player(+1)
            break;

        case 40: // ABAJO
            accelerate_player()
            break;

        case 32: // ESPACIO
            save_player()
            break;

        case 27: // ESC
            pause_game()
            break

        case 8: // RETURN
            reset_game(initial_level_selected)
            break
    }
}

// Baja de golpe la figura en juego
function drop_player (e){

    if (!paused && !e.repeat) {
        if (window.matchMedia("(max-width: 600px)").matches || window.matchMedia("(max-width: 1050px)").matches){
            botDrop.style.background = "rgb(200,200,200)"
        }
        while (!player.crash(1, 0)) {
            player.undraw()
            player.move(0, +1)
            player.draw()
        }

        SFX_CRASH.play()
        SFX_DROP.play()
    }
}

// Desplaza horizontalmente la figura en juego "d" posiciones
function move_player(d) {

    if (!paused && !player.crash(0, d)) {
        if (window.matchMedia("(max-width: 600px)").matches || window.matchMedia("(max-width: 1050px)").matches) {
            if(d==1){
                botRight.style.background = "rgb(200,200,200)"
            }else{
                botLeft.style.background = "rgb(200,200,200)"
            }
        }

        player.undraw()
        getPreview().undraw()
        player.move(d, 0)
        getPreview().draw("preview")
        player.draw()
        
        SFX_MOVE.pause()
        SFX_MOVE.currentTime = 0
        SFX_MOVE.play()
    }
}

// Rota la figura en juego 90 grados en sentido horario
function rotate_player(e) {

    if(!paused && !e.repeat) {
        var aux = JSON.parse(JSON.stringify(player.array))
        if (window.matchMedia("(max-width: 600px)").matches || window.matchMedia("(max-width: 1050px)").matches) {
            botUp.style.background = "rgb(200,200,200)"
        }

        player.undraw()
        getPreview().undraw()
        player.rotate(aux)
        getPreview().draw("preview")
        player.draw()

        SFX_ROTATE.pause()
        SFX_ROTATE.currentTime = 0
        SFX_ROTATE.play()
    }
}

// Acelera la caída de la figura en juego
function accelerate_player() {

    if (!paused && !player.crash(1, 0)) {
        if (window.matchMedia("(max-width: 600px)").matches || window.matchMedia("(max-width: 1050px)").matches) {
            botDown.style.background = "rgb(200,200,200)"
        }

        player.undraw()
        player.move(0, +1)
        player.draw()

        if (!player.crash(1, 0)){
            SFX_ACCELERATE.pause()
            SFX_ACCELERATE.currentTime = 0
            SFX_ACCELERATE.play()
        } else {
            SFX_CRASH.play()
        }
    }
}

// Mueve la figura en juego a la caja HOLD
function save_player() {

    if (!paused && allow_save_mode) {
        if (window.matchMedia("(max-width: 600px)").matches || window.matchMedia("(max-width: 1050px)").matches) {
            botSave.style.background = "rgb(200,200,200)"
        }

        player.undraw()
        getPreview().undraw()

        aux = JSON.parse(JSON.stringify(player.array))

        if (saved_figure.array != undefined) {
            player = pickFigure()
            player.array = JSON.parse(JSON.stringify(saved_figure.array))
            saved_figure.array = JSON.parse(JSON.stringify(aux))
        } else {
            player = next_figure
            saved_figure.array = JSON.parse(JSON.stringify(aux))
            next_figure = pickFigure()
        }

        SFX_POP.play();

        saved_figure.showInOtherCanvas(canvas3, ctx3)
        next_figure.showInOtherCanvas(canvas2, ctx2)

        getPreview().draw("preview")
        player.draw()

        allow_save_mode = false
    }
}

// Conmuta el estado del juego: Pausado o No pausado
function pause_game() {

    if (!paused) {

        if (window.matchMedia("(max-width: 600px)").matches || window.matchMedia("(max-width: 1050px)").matches) {
            botPause.style.background = "rgb(200,200,200)"
        }

        // Paro el timeout y actualizo paused
        clearTimeout(interval)
        paused = true

        // Impresión de la pantalla de paused
        ctx1.rect(0, 0, canvas1.width, canvas1.height)
        ctx1.fillStyle = palette[17]
        ctx1.fill()
        ctx1.font = "30px Arial"
        ctx1.fillStyle = 'rgba(255, 255, 255)';
        ctx1.fillText("Pause", canvas1.width / 2 - 43, canvas1.height / 2)

        // Deshabilito teclas y botones
        if (window.matchMedia("(max-width: 600px)").matches || window.matchMedia("(max-width: 1050px)").matches) {
            botUp.removeEventListener("touchstart", rotate_player)
            botDown.removeEventListener("touchstart", accelerate_player)
            botLeft.removeEventListener("touchstart", function(){move_player(-1)})
            botRight.removeEventListener("touchstart", function(){move_player(+1)})
            botSave.removeEventListener("touchstart", save_player)
            botDrop.removeEventListener("touchstart", drop_player)
        } else {
            botUp.removeEventListener("click", rotate_player)
            botDown.removeEventListener("click", accelerate_player)
            botLeft.removeEventListener("click", function(){move_player(-1)})
            botRight.removeEventListener("click", function(){move_player(+1)})
            botSave.removeEventListener("click", save_player)
            botDrop.removeEventListener("click", drop_player)
        }

        document.getElementById("myVideo").pause()
        MUSIC_LVL[lvl - 1].pause()
        SFX_PAUSE.play()

    } else {

        if (window.matchMedia("(max-width: 600px)").matches || window.matchMedia("(max-width: 1050px)").matches) {
            botPause.style.background = "grey"
        }

        // Re-impresión del tablero
        ctx1.clearRect(0, 0, canvas1.width, canvas1.height)
        drawGrid(canvas1,ctx1)
        redraw()

        // Habilito las teclas y botones
        if (window.matchMedia("(max-width: 600px)").matches || window.matchMedia("(max-width: 1050px)").matches) {
            botUp.addEventListener("touchstart", rotate_player)
            botDown.addEventListener("touchstart", accelerate_player)
            botSave.addEventListener("touchstart", save_player)
            botDrop.addEventListener("touchstart", drop_player)
        } else {
            botUp.addEventListener("click", rotate_player)
            botDown.addEventListener("click", accelerate_player)
            botSave.addEventListener("click", save_player)
            botDrop.addEventListener("click", drop_player)
        }

        player.move(0,-1)

        document.getElementById("myVideo").play()
        MUSIC_LVL[lvl - 1].play()

        update()
    }
}

// Reinicia el juego al nivel inicial elegido en el menú Leveler
function reset_game(initial_level) {

    if (window.matchMedia("(max-width: 600px)").matches || window.matchMedia("(max-width: 1050px)").matches) {
        botReset.style.background = "rgb(200,200,200)"
        var_reset = 1
    }

    // Para e inicia los sonidos
    SFX_LVLUP[lvl-1].pause()
    SFX_LVLUP[lvl-1].currentTime = 0
    MUSIC_LVL[lvl-1].pause()
    MUSIC_LVL[lvl-1].currentTime = 0
    document.getElementById("myVideo").pause()
    document.getElementById("myVideo").currentTime = 0
    
    // Limpio el timeout
    clearTimeout(interval)

    // En caso de resetear estando en pause, recupero eventos
    if (paused) {
        if (window.matchMedia("(max-width: 600px)").matches || window.matchMedia("(max-width: 1050px)").matches) {
            botPause.style.background = "grey"
        }
        paused = false
        if (window.matchMedia("(max-width: 600px)").matches || window.matchMedia("(max-width: 1050px)").matches) {
            botUp.addEventListener("touchstart", rotate_player)
            botDown.addEventListener("touchstart", accelerate_player)
            botSave.addEventListener("touchstart", save_player)
            botDrop.addEventListener("touchstart", drop_player)
        } else {
            document.addEventListener('keydown', keys)
            botUp.addEventListener("click", rotate_player)
            botDown.addEventListener("click", accelerate_player)
            botSave.addEventListener("click", save_player)
            botDrop.addEventListener("click", drop_player)
        }

        // Corto el tail de SFX_PAUSE
        SFX_PAUSE.pause()
        SFX_PAUSE.currentTime = 0
    }

    // Creo nuevas figuras
    player = pickFigure()
    next_figure = pickFigure()
    saved_figure = pickFigure()
    saved_figure.array = undefined

    // Borro los canvas
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height)
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height)
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height)

    // ------------ Preparación e impresión -------------//
    board = createBoard()
    score = 0
    setLevel(initial_level)
    addPoints(0)
    showPoints()
    drawGrid(canvas1, ctx1)
    drawGrid(canvas2, ctx2)
    drawGrid(canvas3, ctx3)
    player.draw()
    next_figure.showInOtherCanvas(canvas2, ctx2)

    // Re-ejecuto
    update()
}

/* --------------------------------------------------------------------------- */