const fs = require('fs');

let rawdata = fs.readFileSync('productos.txt');
let productos = JSON.parse(rawdata);
var contador = 0;
var contador2 =0;

const express = require('express');
const app = express();
const puerto = 8080;


app.get('/items',(req,res) =>{
    console.log('request recibido!');
    res.json(productos)
    ++contador 
});

app.get('/item-random',(req,res) =>{
    console.log('request recibido!');
    var x = Math.floor((Math.random() * 3));
    res.json(productos[x]);
    ++contador2
});

app.get('/visitas',(req,res) =>{
    console.log('request recibido!');
    res.json({visitas : {items: contador, item : contador2} })
});

const server = app.listen(puerto, () => {
    console.log('servidor escuchando en http://localhost:'+puerto)
})