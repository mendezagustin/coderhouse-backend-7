  
const boton = document.querySelector('button');
const socket = io.connect();

socket.on('productos', data => {
    document.getElementById("demo").innerHTML = "";
    
    console.log(data);
    for (let x in data) {
       console.log(data[x])
       document.getElementById("demo").innerHTML += `
      <tr>
      <th scope="row">${data[x].id}</th>
      <td>${data[x].title}</td>
      <td>${data[x].price}</td>
      <td><img src="${data[x].img}" width="42" height="42"></td>
      </tr>  `
    }
boton.addEventListener('click', ()=>{
    let producto = {
        'id' : -1,
        'title' : document.getElementById('title').value,
        'price' : document.getElementById('price').value,
        'img' : document.getElementById('img').value
    }
    socket.emit('nuevo-producto', producto);
});


});
