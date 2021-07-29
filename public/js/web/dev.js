/* DESCRIPCIÓN ------------------------------------------------------------------
Este fichero agrupa todas las funciones relativas a la interacción del usuario en
la sección de desarrollo
------------------------------------------------------------------------------ */


$(document).ready(function () {

  // Mueve el scroll a Vídeo
  $("#video_button").click(function () {
    $("*").css("scroll-snap-type", "none")
    $('html,body').animate({scrollTop: $("#video").offset().top})
    setTimeout( function () { $("*").css("scroll-snap-type", "y mandatory") }, 300)
  })

  // Mueve el scroll a Controles
  $("#controls_button").click(function () {
    $("*").css("scroll-snap-type", "none")
    $('html,body').animate({scrollTop: $("#controls").offset().top})
    setTimeout( function () { $("*").css("scroll-snap-type", "y mandatory") }, 300)
  })

  // Mueve el scroll a Sobre Nosotros
  $("#about_us_button").click(function () {
    $("*").css("scroll-snap-type", "none")
    $('html,body').animate({scrollTop: $("#about_us").offset().top})
    setTimeout( function () { $("*").css("scroll-snap-type", "y mandatory") }, 300)
  })

})