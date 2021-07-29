/* DESCRIPCIÓN ------------------------------------------------------------------
Este fichero agrupa todas las constantes globales y funciones relativas a la música
y efectos de sonido exclusivos del juego.
------------------------------------------------------------------------------ */



/* CONSTANTES GLOBALES: EFECTOS DE SONIDO Y MÚSICA DE CADA NIVEL ------------- */
const SFX_POP = document.getElementById('SFX_POP')
const SFX_STEP = document.getElementById('SFX_STEP')
const SFX_MOVE = document.getElementById('SFX_MOVE')
const SFX_ROTATE = document.getElementById('SFX_ROTATE')
const SFX_ACCELERATE = document.getElementById('SFX_ACCELERATE')
const SFX_DROP = document.getElementById('SFX_DROP')
const SFX_CRASH = document.getElementById('SFX_CRASH')
const SFX_ROW = [
    document.getElementById('SFX_ROW'), // Al romper 1, 2 o 3 filas
    document.getElementById('SFX_ROW4') // Al romper 4 filas
]
const SFX_LVLUP = [
    document.getElementById('SFX_LVLUP_1'),
    document.getElementById('SFX_LVLUP_2'),
    document.getElementById('SFX_LVLUP_3'),
    document.getElementById('SFX_LVLUP_4')
]
const SFX_ENDGAME = document.getElementById('SFX_ENDGAME')
const SFX_PAUSE = document.getElementById('SFX_PAUSE')
const MUSIC_LVL = [
    document.getElementById('MUSIC_LVL_1'),
    document.getElementById('MUSIC_LVL_2'),
    document.getElementById('MUSIC_LVL_3'),
    document.getElementById('MUSIC_LVL_4')
]
/* --------------------------------------------------------------------------- */



// Ajusta los niveles de cada sonido
function setAudioLevels() {

    var att = 0.1  // Atenuador global

    /*---------------------(100%)-----(ind)-------(glb)--*/
    SFX_POP.volume         = 1     -   0.0     -   att
    SFX_STEP.volume        = 1     -   0.0     -   att
    /*---------------------------------------------------*/
    SFX_MOVE.volume        = 1     -   0.0     -   att
    SFX_ROTATE.volume      = 1     -   0.0     -   att
    SFX_ACCELERATE.volume  = 1     -   0.0     -   att
    SFX_DROP.volume        = 1     -   0.0     -   att
    /*---------------------------------------------------*/
    SFX_CRASH.volume       = 1     -   0.0     -   att
    /*---------------------------------------------------*/
    SFX_ROW[0].volume      = 1     -   0.0     -   att
    SFX_ROW[1].volume      = 1     -   0.0     -   att
    /*---------------------------------------------------*/
    SFX_LVLUP[0].volume    = 1     -   0.0     -   att
    SFX_LVLUP[1].volume    = 1     -   0.0     -   att
    SFX_LVLUP[2].volume    = 1     -   0.0     -   att
    SFX_LVLUP[3].volume    = 1     -   0.0     -   att
    /*---------------------------------------------------*/
    SFX_ENDGAME.volume     = 1     -   0.1     -   att
    SFX_PAUSE.volume       = 1     -   0.3     -   att
    /*---------------------------------------------------*/
    MUSIC_LVL[0].volume    = 1     -   0.1     -   att
    MUSIC_LVL[1].volume    = 1     -   0.2     -   att
    MUSIC_LVL[2].volume    = 1     -   0.1     -   att
    MUSIC_LVL[3].volume    = 1     -   0.1     -   att
    /*---------------------------------------------------*/
}