

const fs = require('fs');





function manageInternalData(reqBody){
    fs.readFile('./local_files/ranking.json', (err, data)=>{
      if (err){
          console.log("There was an error opening the file.");
      } else {
        
        
      list = JSON.parse(data);
      list.rank.push(reqBody); 
      
      orderedList = bubble_Sort(list.rank);
      
      json = JSON.stringify(list,null,2); 
      fs.writeFile('./local_files/ranking.json', json, 'utf8', (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    }});
  }

function orderByScore(list){
console.log(list.rank[0].username);
}


function bubble_Sort(a)
{
    var swapp;
    var n = a.length-1;
    var x=a;
    do {
        swapp = false;
        for (var i=0; i < n; i++)
        {
            if (parseInt(x[i].score, 10) < parseInt(x[i+1].score, 10))
            {
               var temp = x[i];
               x[i] = x[i+1];
               x[i+1] = temp;
               swapp = true;
            }
        }
        n--;
    } while (swapp);
 return x; 
}



  module.exports = manageInternalData;