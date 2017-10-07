const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');

app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use("/styles",  express.static(__dirname + '/public/styles'));
app.use("/scripts", express.static(__dirname + '/public/scripts'));
app.use("/sounds",  express.static(__dirname + '/public/sounds'));

app.get('',
  (req, res) => res.sendFile(__dirname + '/public/index.html')
);

app.listen(8080);
