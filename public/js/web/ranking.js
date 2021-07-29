/* DESCRIPCIÓN ------------------------------------------------------------------
Este fichero se encarga de recoger los archivos con Ajax del servidor y colocarlos
en sus posiciones 
------------------------------------------------------------------------------ */

$(document).ready( ()=> {
    $.getJSON("/ranking/show", function(list){
        $('#user1').html(list.rank[0].username)
        $('#score1').html(list.rank[0].score)
        $('#user2').html(list.rank[1].username)
        $('#score2').html(list.rank[1].score)
        $('#user3').html(list.rank[2].username)
        $('#score3').html(list.rank[2].score)
        $('#user4').html(list.rank[3].username)
        $('#score4').html(list.rank[3].score)
        $('#user5').html(list.rank[4].username)
        $('#score5').html(list.rank[4].score)
        $("#error_ranking").css("display", "none")
    })
})