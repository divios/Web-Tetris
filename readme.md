EVENTOS MULTIMEDIA AÑADIDOS:
- Sergio: Ha creado un vídeo con una cuenta atrás de 3 segundos con un editor de vídeos (media/videos/countdown.mp4)
- Óscar: Metió dicho vídeo entre menú de nivel y juego usando un evento multimedia (js/web/nav_interactions.js línea 239)
- Daniel: Sustituyó el loop de las músicas por un re-play usando un evento multimedia (js/game/gameplay.js línea 100)
- Álex: Añadió eventos multimedia que informan por consola de errores relativos al vídeo de fondo (js/web/add-ons.js línea 149)




30/04:
Subida a github del codigo. 
Añadido lo de Alex, no se porque me da con el nombre de usuario elcocoloco (es mi username pero no se porque sale en github asi y no como antes)





26/04 (EVENTOS MULTIMEDIA):

- Nuevo vídeo introducido antes de empezar el juego: Ver js/web/nav_interactions.js línea 239
- La música ahora no se reproduce en bucle automáticamente, sino que se usa onended: Ver js/game/gameplay.js línea 99











08/04
SERGIO:

- Añadidos nuevas animaciones iniciales. Mejor que no las toqueis mucho, los tiempos estan ajustados para que queden bien
- Añadida la sección de desarrollo, falta implementar que el nav que sale vaya a cada lado, que por ahora no hace nada

03/04
ALEX:

-Como usar node js:
1. Instalar node.js (fácil)
2. Ir a la carpeta donde esa el index.js con el cmd, o la consola de visual studio, q es mucho mejor sinceramente.
3. Hacer el comando "node index.js" 
4. Ir a localhost:8080/ en el navegador.

Debería iros la web con esto, si os fijáis, iréis viendo que hay dos consolas, la del browser, y la de la consola de comandos del servidor (donde habéis hecho el comando). Esto diferencia las dos partes de la web:
frontened y backened. 

La parte de servidor cuando tengáis tiempo, si queréis os la miráis, aunq no creo q haga falta tocarla mucho más.




BUGS/ARREGLAR:

- El navegador hay que ajustarlo, ahora cuando navegas a otra pestaña se ralla, básicamente porque he hecho que se active cuando pones el cursor sobre el span, entonces al hacer click sobre este mismo, se resetea el estado, y no se reconoce el mouse out. Lo puedo arreglar yo sin problemas.
- Sobre el Level up de Oscar: No sé por qué, pero la animación de cada uno se ejecuta sólo una vez. Probad a hacer restart o a subir de nivel dos veces. 
- Nuevos paneles con colores y arreglados (se ve lo de video3.mp4), y nuevos videos con color definido para cada uno. Están, pero tenemos que añadir el panel de nivel con un nombre o algo.


IMPLEMENTAR:
- Animaciones de inicio de la web: Que el titulo aparezca con una animación, los botones igual, el texto diciendo lo de que es tetris de los 80...
- Voy a ver si puedo mejorar el nav en el sentido en el que haya un simbolito que aclare al usuario que tienes que acercar el cursor para que aparezca el navegador.
- Las pantallas de ranking/desarrollo/autores/banner de como jugar
- Versión móvil integral en toda la web.
- Ya se usa ajax, pero podríamos aprovecharlo un poco más (no corre prisa).
- se que alguna cosa me dejo en el tintero, pero queda poco jeje



03/04 v2
DANI:
-Ya se ven los botones, no se veían antes por un conflicto de nombres en css.
-Arreglados los bugs al pausar el juego, que hacía que se moviesen varias posiciones a la derecha, era simplemente eliminar los addeventlister de botright y botleft dentro de la funcion pause_game y en la funcion reste_game.
-Arreglo el pause que hacia que al darle consecutivamente la ficha bajase hacia abajo y además el fx de step seguía sonando, añadi un move(0,-1), despues del pause para que la ficha no bajase y se quedase en su posicion y retrase la actualizacion del booleano paused=false al update para solventar el problema del sonido.


02/04 v5
OSCAR:
- Añadida 2 animaciones add-on: una es LET'S GO! (al empezar) y otra LEVEL UP! (al subir de nivel)
- TIENEN UN BUG: No sé por qué, pero la animación de cada uno se ejecuta sólo una vez. Probad a hacer restart o a subir de nivel dos veces.
- Por si queréis intentar solucionarlo, dicha animación está en addon.css y la llamo desde la función set_level en gameplay.js

01/04 
ALEX:

-Devuelto al archivo anterior, iremos incorporando lo de sergio en la pestaña de desarrollo poco a poco
-Los botones del nav quedan por decidir como los hacemos, podemos probar a poner los botones blancos, y al bajar se esconden debajo de la pantalla y así no entorpecen tanto. Cuando el ratón se acerca por debajo, saldria de vuelta el nav. Es una idea, si queréis probar otras similares estaría guay verlo.
-Añadido

31/03 v3
SERGIO:

NOTA: ESTA AÑADIDO TODOS LOS CAMBIOS DE OSCAR

- Cambiado estetica de pagina principal, sobre todo cambios en index.html, web_style.css y nav_interaction
- Cambios al jquerry en nav_interaction al darle al boton Play, ya no es necesario el hidden, todo se hace por display:none;
- Scroll predefinido al pasar de seccion a seccion
- Añadidos al nav_interaction un nuevo apartado con los botones del header para hacer scroll automatico (home, about us....)
- Nuevo css en web/ donde se guardan todas las animaciones en relacion con el html


PENDIENTE: Ajax, Vídeo, Desarrollo (texto y apariencia) y Autores. Leveler y Conmutación movil/pc, comprobar cuando le das a los botones del head que estas jugando y actuar en consecuencia

BUGS:El boton fullscreen aparece pero no hace nada, no he tocado nada, no se por que no ira.

31/03 v3
OSCAR:

OJO: HE CAMBIADO PEQUEÑAS COSAS EN MUCHOS FICHEROS, SI HACÉIS UN COMMIT NO OS DEJÉIS NADA

- Mejora en la fluidez de reproducción en los sonidos del juego: ahora al reproducirse un sonido puede "pisarse" a sí mismo si ya estaba reproduciéndose 
- Añadidos los sonidos a la página web (serán modificados en función de la estética final)
- Shadow-box en los canvas que varía con cada nivel
- Añadido el resto de niveles al leveler (falta hacer su apariencia)
- reset_game y startGame ahora reciben un parámetro llamado "initial_level", se explica por sí solo
- Organizado por secciones el fichero nav_interaction.js
- Reañadidos los botones en la versión móvil (en la 29/03 v1 de Álex me aparecían borrados del mobile_game.css)
- Cambios menores (pero necesarios) en varios ficheros de game

Pendiente: Ajax, Vídeo, Desarrollo (texto y apariencia) y Autores. Botones de Sergio, Leveler y Conmutación movil/pc



29/03 v1
ALEX:

Mi idea es que usemos este readme.md como comunicación general, sin borrar eventos pasados, asi tenemos un documento que data todo lo que hemos ido haciendo y diciendo. Podeis usar esto igual como una especie de commit grande.
(intentare recuperar todos los readme que hemos escrito, datar su dia y hora) 
Si se hace muy grande que no creo, hacemos otro.

Reorganizado todo por carpetas, es tedioso estar navegando entre carpetas, pero ahora al menos se puede saber donde vas a acabar jajajaj. Espero que os parezca bien como lo he montado, estoy siguiendo la linea de lo que oscar me ha pedido. La cosa es, que esto es un proyecto enorme, y tenemos que entender que todo tiene que conectar como un puzzle, asique teneis razon, hay que ser bien organizados o aqui nos vamos a volver locos.

Sobre los botones: lo voy a arreglar ahora, no funcionaba bien porque habia conflictos entre unos archivos y otros, tengo que pacientemente leerme todo el codigo para entenderlo.

Version movil: Habréis visto que he hecho carpeta adicional para versión movil, esque si no no sabemos que es para cada web.

Como trasmitimos los archivos: yo voy a seguir enviando por git. Es tocahuevos que flipas, pero yo he aprendido que el git push --force hace maravillas (mirad en internet hay mazo memes de lo rastrero q es hacerlo xD).
De todas formas, seguiré enviando archivos .rar por we transfer, ya que no nos da tanto problema, aunq ahora que vamos a seguir un orden, git no deberia ser un problema. Los rar se me ocurre haacerlos asi: whala_(diames)_v(version del mismo dia que sea).rar   por ejemplo: whala_2903_v1.rar

Espero que os sea menos tedioso como está ahora!















VERSION 28/03
BUGS:

1. Cuando se llama al evento reset game, se duplica la velocidad de bajada. Funcion necesaria para realizar una partida despues de otra, o al navegar por la web.
2. El overflow hay q ajustarlo en firefox, entre desarrollo y jugar/autores, se cambia la pagina ligeramente.
3. El space bar y enter dan problemas a veces.
4. Ahora no me acuerdo, pero alguno hay.





POR HACER:

1. Multiples niveles. Una forma sencilla: 
Hacer una funcion que te meta bloques por debajo de vez en cuando, es decir, que te vayan subiendo las piezas y debas romper mas bloques, donde han quedado huecos. Como lo tengo pensado, es hacer una figura de 1 row que por ejemplo sea asi:
[1 1 1 1 0 0 1 1 1 1], es decir se llena todo menos esos dos 0, (undefined en esta nueva version). 
Y eso se añadiría por debajo. Por que esbastante util: Permite interaccion para el modo multijugador(cuando j1 llena 2 filas p. ej. j2 recibe 1 fila por debajo) y nos da pie un modo mas dificil donde cada 10 ciclos de reloj por ejemplo, se llena de manera automatica. (nos daría 3 modos en total!)

2. Video, puedo intentar hacerlo yo, un video background en cada nivel. En w3schools hay información clara por si queréis probar vosotros.

3. Que se muestre el ranking bien. Ahora se muestra en un fichero JSON. Hay que darle formato a la web /ranking/show. Eso hay que entender un poquito de Node.js (express.js) y JSON, no es muy complicado pero habría que hacerlo.

4. Implementar ajax de alguna forma. Abierto a ideas, no se me ocurre nada. Básicamente, algo como que llueva en el juego cuando en la realidad esté ocurriendo, o que los colores varien dependiendo de la hora del dia... Hay que echarle imaginacion.

5. En la parte desarrollo hay que empezar a escriir cosas!! Miraos la web para ver que información hay que poner.

6. Había pensado poner un banner antes de la partida para ver como jugar. Se puede hacer eso, o se puede poner un apartado en el navegador.

7. Indexar en el Node.js bien los ('/'). Para subdividir la web en varios apartados. No se hasta que punto se puede hacer.

8. Poner el formulario ranking bonito. 

9. Me habre dejado algo por ahi





++++++

Os dire como funciona node.js por skype si quereis, que escrito es muy complicado. Si no, mirad w3schools para ver un poco como funciona, y la web api de express para ver como he hecho la parte web server.
