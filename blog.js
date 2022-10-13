document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault();
    
    
    const newProduct={
        name: document.getElementById("nombre").value,
        descrip: document.getElementById("nick").value,
    }  


    const peticion=new XMLHttpRequest();
    peticion.open('POST', 'http://localhost:3000/users');
    peticion.setRequestHeader('Content-type', 'application/json');
    peticion.send(JSON.stringify(newProduct));  

    peticion.addEventListener('load', function() {
       
    
    })


})


