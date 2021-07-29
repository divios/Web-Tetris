/* DESCRIPCIÓN ------------------------------------------------------------------
Este fichero controla la interacción y las animaciones de los "add-ons". Estos son
por ejemplo: botón fullscreen, menú lateral en el juego, animación al abrir la página
y otros.
------------------------------------------------------------------------------ */


// Animación de inicio
$(document).ready(() => {

  // Animacion loading
  $("#loading").stop(true, true).delay(400).animate({ opacity: '0%' }, 1000)

  // Fondos y letras
  setTimeout(function () {
    $("#loading").css("display", "none")
    $("#letters").css("display", "block")
    $("#navigator").css("display", "grid")
    $("#title").css("display", "block")
    $(".background").css("display", "block")
    $("#fullscreen").css("display", "block")
    $("#separator").animate({ width: '230px' }, 1000)
    $("#letters h2, #letters h3, #navigator, #title, .background").stop(true, true).delay(1000).animate({ opacity: '100%' }, 1200)
  }, 1200)

})

// Botón Fullscreen: Conmutación
$(document).ready(function(){
  $("#fullscreen").click(function(){
    if ($("#fscsym").hasClass("fas fa-expand-arrows-alt")) {
        openFulscreen()
        $("#fscsym").removeClass("fas fa-expand-arrows-alt")
        $("#fscsym").addClass("fas fa-compress-arrows-alt")
    } else {
      closeFullscreen()
      $("#fscsym").removeClass("fas fa-compress-arrows-alt")
      $("#fscsym").addClass("fas fa-expand-arrows-alt")
    }
  })
})
  
// Botón Fullscreen: Activar
function openFulscreen(){
  var elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen()
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen()
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen()
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen()
  }
}

// Botón Fullscreen: Desactivar
function closeFullscreen() {
  var elem = document.documentElement;
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen()
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen()
  }
}

// Interacción con los botones in-game
$(document).ready(function(){

  // Botón in-game Parar vídeo
  $("#stop_video").click(()=>{
    my_video = document.getElementById("myVideo")
    if (my_video.paused) {
      my_video.play();
      $("#stop_video").html("Video: ON")
    } else {
      my_video.paused = true
      my_video.pause()
      $("#stop_video").html("Video: OFF")
    }
  })

  // Boton in-game Back
  $("#back").click(function () {
    $("#backing_video").css("display", "none");
    $("#leveler").removeClass("hide");
    $("#leveler").addClass("leveler");
    $("#Tetris1").css("display", "none");
    $("#navigator").css("display","grid");
    $("#hoverme").css("display", "grid")
    if (!paused) {
      pause_game()
    }
  })

  // Botón in-game Música ON/OFF
  $("#music").click(function () {
    if (MUSIC_LVL[lvl-1].muted == false) {
      MUSIC_LVL[lvl-1].muted = true
      this.innerHTML = "Música: OFF"
    } else {
      MUSIC_LVL[lvl-1].muted = false
      this.innerHTML = "Música: ON"
    }
  })

  // Impide que la tecla ENTER active los botones in-game
  $(".interactive").on('keydown', function(event) {
    if (event.key == "Enter") event.preventDefault()
  })

  // Impide que la tecla ENTER active el fullscreen
  $("#fullscreen").on('keydown', function(event) {
    if (event.key == "Enter") event.preventDefault()
  })

})


// Funciones para el desarrollo de la web y consola, para encontrar errores y debuggear.


//Para poder acceder al formulario web desde la pagina de inicio, y asi poder diseñarlo desde ahí
function showForm(){
  animations_fade_out()
  $("#game").css("display", "block")
  $("#dev").css("display", "none")
  $("#authors").css("display", "none")
  $("#leveler").css("display", "none")
  $(".background").css("opacity", "0.8")
  $("#ranking").css("display", "block")
}



//Poder conocer el estado del video.

$(document).ready(()=>{
  selected_video.addEventListener("error",video_logger("error"));
  selected_video.addEventListener("waiting",video_logger("waiting"));
  selected_video.addEventListener("stalled",video_logger("waiting"));
});


function video_logger(event){
  if (event=="error"){
    pause_game();
    alert("El video no pudo reproducirse debido a un error, pruebe a recargar la página");
  }
  if (event=="waiting"){
    my_video = document.getElementById("myVideo");
    console.log("Video pausado por mala conexion.")
    my_video.paused = true
    my_video.pause()
    $("#stop_video").html("Video: OFF")

  }
  if (event=="stalled"){
    
    alert("El video fue parado por decision del usuario, si deasea poder volver a verlo, cambie sus preferencias y recargue la pagina");
  }
}