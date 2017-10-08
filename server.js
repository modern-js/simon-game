const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');

app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use("/styles",  express.static(__dirname + '/public/styles'));
app.use("/scripts", express.static(__dirname + '/public/scripts'));
app.use("/sounds",  express.static(__dirname + '/public/sounds'));

app.get('', (req, res) => res.sendFile(__dirname + '/public/index.html'));

app.post('/high', (req,res) => {
    tryUpdate(req.query.name, req.query.score);
    res.end();
});

app.listen(8080);

const tryUpdate = function(name, score) {
  fs.readFile('highscores.txt', 'utf8', function (err,data) {
    let arr = [];
    if (data) {
      let list = data.split('\n');
      arr = list.map((s)=>[parseInt(s.split(' ')[0]),s.split(' ')[1]]);
    }
    arr.push([parseInt(score), name]);
    arr.sort((a,b)=>(a[0]<b[0]));

    let text = arr.map((x)=>""+x[0]+" "+x[1]).join('\n');

    console.log("New high scores:");
    console.log(text);
    console.log("--");

    fs.writeFile("highscores.txt", text, ()=>{});
  });
}
