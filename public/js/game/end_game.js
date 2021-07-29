/* DESCRIPCIÓN ------------------------------------------------------------------
Este fichero gestiona el final del juego
------------------------------------------------------------------------------ */



// Mandar la puntuación al ranking
function sendScoreData(){
    $("#hidInput").val(score);
}

// Mostrar pantalla y sonidos de fin de juego
function endgame(){
    MUSIC_LVL[lvl-1].pause()
    SFX_ENDGAME.play();
    
    $(".background").animate({opacity: "0.8"}, "slow");
    
    sendScoreData();
    showRanking();
}