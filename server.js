  
const express = require('express');
const app = express();
const http = require('http').Server(app);

const io = require('socket.io')(http);
let productos = [
	{
        "id":1,
		"title":"Escuadra",
		"price": 123.45,
        "img" : "https://png.pngtree.com/png-vector/20190618/ourmid/pngtree-pencil-and-set-square-line-black-icon-png-image_1503621.jpg"
        
	},
	{
        "id":2,
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

app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

io.on('connection', socket =>{
    console.log('nuevo cliente conectado');
    socket.emit('productos', productos);

    socket.on('nuevo-producto', data =>{ 
        if (data.id == -1){
            data.id = (productos[productos.length - 1].id)+1;
            productos.push(data);
            io.sockets.emit('productos',productos);
        }
    });
   

})


http.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});