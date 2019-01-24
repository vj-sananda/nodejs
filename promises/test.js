//var q = require('q');
var fs = require('fs');

function readFile(filename, enc){
  return new Promise( (resolve, reject) => {
    fs.readFile(filename, enc, (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
}

function asyncFunc1() {
  return new Promise( (resolve,reject) => {
    setTimeout( ()=> resolve('DONE'), 2000 );
  });
}
readFile('file.txt','utf8')
.then( data => {
  console.log(data) ;
  return asyncFunc1();
})
.then( data => console.log(data))
.catch( error => console.log(error));
