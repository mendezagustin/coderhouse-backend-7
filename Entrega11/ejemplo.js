const fs = require('fs');

const express = require('express');
const app = express();+
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const handlebars = require('express-handlebars');

const puerto = 8080;
let productos = [
	{
        "id":1,
		"title":"Escuadra",
		"price": 123.45,
        "img" : "https://png.pngtree.com/png-vector/20190618/ourmid/pngtree-pencil-and-set-square-line-black-icon-png-image_1503621.jpg"
        
	},
	{
        "id":"2",
		"title":"Calculadora",
		"price": 223.45,
        "img" : "https://img2.freepng.es/20180525/gjq/kisspng-calculator-computer-icons-clip-art-calculator-5b081e1d2365a8.158348391527258653145.jpg"
        
        
	},
	{
        "id":3,
		"title":"Mesa",
		"price": 323.45,
        "img" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREnG9pc4MZBsPqSXX-6Yf88rh7sp6bt5Jwxg&usqp=CAU"
        
	}

]

app.use(express.static('public'));

app.set('view engine', 'ejs');

const routerApi = express.Router();


routerApi.get('/productos/vista',(req,res) =>{
    console.log('request recibido!');
    res.render('main',{productos: productos})
});
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
    let price = parseInt(req.body.price);
    let img = "" + req.body.img;
    let idbandera = productos[productos.length - 1].id
    if (title != "" && price != 0){
        let payload = {
            "id" : idbandera+1,
            "title" : `${title}`,
            "price" : price,
            "img" : `${img}`
        }
    
        let array = productos.push(payload);
       return res.json({title: title,price: price, img : img});
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