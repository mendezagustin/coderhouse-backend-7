const fs = require('fs');

const express = require('express');
const app = express();+
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const puerto = 8080;
let productos = [
	{
        "id":1,
		"title":"Escuadra",
		"price": 123.45	
	},
	{
        "id":2,
		"title":"Calculadora",
		"price": 223.45
	},
	{
        "id":3,
		"title":"Mesa",
		"price": 323.45
	}

]


app.get('/productos/listar',(req,res) =>{
    console.log('request recibido!');
    if (productos.length > 0){
        res.json(productos)
        }else{
        res.json({error : 'producto no encontrado'});

        }
});

app.get('/productos/listar/:id',(req,res) =>{
    let id = req.params.id;
    console.log('request recibido!');
    for (x in productos){
        if (productos[x].id == id){
            res.json(productos[x]);
        }else{
            res.json({error : 'No se encontro el producto con el id = '+id});
        }
    }
    
    
});
app.post('/productos/guardar2/',(req,res) =>{
    return res.json({ mensaje : "hola"+req.body.title})
})
app.post('/productos/guardar/',(req,res) =>{
    console.log('request recibido!');
    let title = "" + req.body.title;
    let price = 0 + req.body.price;
    let idbandera = productos[productos.length - 1].id
    if (title != "" && price != 0){
        let payload = {
            "id" : idbandera+1,
            "title" : `${title}`,
            "price" : price
        }
    
        let array = productos.push(payload);
       return res.json({title: title,price: price});
        idbandera += 1;
    }else{
        return res.json({error:"Error, title: "+ title + "Price: "+price})
    }
    

});

const server = app.listen(puerto, () => {
    console.log('servidor escuchando en http://localhost:'+puerto)
})