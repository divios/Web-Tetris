

//Indroducimos paquetes que vamos a usar
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser")
const data = require("./custom_modules/data_manager")



//Definimos paquetes en uso
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static('./public'));

//Esta función es llamada desde el form 'ranking' en index.html, coge el valor del username, su score y lo mete en el archivo JSON. Posteriormente,
//se envía a una dirección donde se mostrará el ranking
app.post('/ranking', (req, res) => {
    
  
  data(req.body);

  res.sendFile(__dirname + '/public/ranking.html')
  
 
}); 

app.get('/ranking', (req, res) => {
    
  
  

  res.sendFile(__dirname + '/public/ranking.html')
  
}); 
app.get('/ranking/show', (req,res)=>{

  res.sendFile(__dirname + '/local_files/ranking.json')
});





//Pone la app en escucha
app.listen(port,'0.0.0.0',(req,res)=>{ 
    console.log(`Escuchando por el puerto ${port}...`);
});

