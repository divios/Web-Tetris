/* DESCRIPCIÓN ------------------------------------------------------------------
Este fichero agrupa todas las constantes globales y funciones relativas a los
efectos de sonido exclusivos de la página web.
------------------------------------------------------------------------------ */


/* CONSTANTES GLOBALES: EFECTOS DE SONIDO DE LA WEB -------------------------- */
const WSFX_CLICK_1 = document.getElementById('WSFX_CLICK_1')
const WSFX_CLICK_2 = document.getElementById('WSFX_CLICK_2')
const WSFX_CLICK_3 = document.getElementById('WSFX_CLICK_3')
const WSFX_HOVER_1 = document.getElementById('WSFX_HOVER_1')
const WSFX_HOVER_2 = document.getElementById('WSFX_HOVER_2')
const WSFX_HOVER_3 = document.getElementById('WSFX_HOVER_3')
const WSFX_RETURN = document.getElementById('WSFX_RETURN')
/* --------------------------------------------------------------------------- */


// Ajusta los niveles de cada sonido
function setWebAudioLevels() {

    var att = 0.5  // Atenuador global

    /*---------------------(100%)-----(ind)-------(glb)--*/
    WSFX_CLICK_1.volume    = 1     -   0.0     -   att
    WSFX_CLICK_2.volume    = 1     -   0.0     -   att
    WSFX_CLICK_3.volume    = 1     -   0.0     -   att
    /*---------------------------------------------------*/
    WSFX_HOVER_1.volume    = 1     -   0.0     -   att
    WSFX_HOVER_2.volume    = 1     -   0.3     -   att
    WSFX_HOVER_3.volume    = 1     -   0.3     -   att
    /*---------------------------------------------------*/
    WSFX_RETURN.volume     = 1     -   0.3     -   att
    /*---------------------------------------------------*/
}