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
        "id":"2",
		"title":"Calculadora",
		"price": 223.45
	},
	{
        "id":3,
		"title":"Mesa",
		"price": 323.45
	}

]

app.use(express.static('public'));

const routerApi = express.Router();


routerApi.get('/productos/listar',(req,res) =>{
    console.log('request recibido!');
    if (productos.length > 0){
        res.json(productos)
        }else{
        res.json({error : 'producto no encontrado'});

        }
});
routerApi.put('/productos/actualizar/:id',(req,res) =>{
    let idS = parseInt(req.params.id);
    for (x in productos){

    
        if (productos[x].id == idS){
            productos[x].title = req.body.title;
            productos[x].price = req.body.price;

        return res.json({id: productos[x].id, title: productos[x].title, price: productos[x].price });
    }
    }
});
routerApi.delete('productos/borrar/:id',(req,res) =>{
    let idS = parseInt(req.params.id);
    
    for (x in productos){

    
        if (productos[x].id == idS){
            delete productos[x];

        return res.json({Proceso: "Se elimino el producto con id: "+idS});
    }
    }
    console.log('DELETE recibido!');

})
routerApi.get('/productos/listar/:id',(req,res) =>{
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

routerApi.post('/productos/guardar/',(req,res) =>{
    console.log('request recibido!');
    let title = "" + req.body.title;
    let price = Integer.parseInt(req.body.price);
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
routerApi.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).send('Algo salio mal!');
});
app.use('/api',routerApi);
const server = app.listen(puerto, () => {
    console.log('servidor escuchando en http://localhost:'+puerto)
})