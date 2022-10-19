
const nameEl = document.querySelector('#nombre');
const nickEl = document.querySelector('#nick');
const formulario = document.querySelector('#formulario');


const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}


const checkUsername = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const name = nameEl.value.trim();

    if (!isRequired(name)) {
        showError(nameEl, 'El nombre de usuario no puede estar en blanco.');
    } else if (!isBetween(name.length, min, max)) {
        showError(nameEl, `El nombre de usuario debe estar entre ${min} y ${max} caracteres.`)
    } else {
        showSuccess(nameEl);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;

    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};

//POST
document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault();
    
    checkUsername;
    
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


formulario.addEventListener('input', function (e) {
    switch (e.target.id) {
        case 'nombre':
            checkUsername();
            break;
        case 'nickname':
            checkEmail();
            break;
    }
}) ;









//GET
let peticion = new XMLHttpRequest();
let miUl = document.getElementById("ul1");


peticion.open('GET', 'http://localhost:3000/posts');
peticion.send();
peticion.addEventListener('readystatechange', function() {
    console.log("Estado de la petición: " + peticion.readyState);
    if (peticion.readyState === 4) {
        if (peticion.status === 200) {
            console.log("Datos recibidos:");
            let posts = JSON.parse(peticion.responseText);  // Convertirmos los datos JSON a un objeto
            for (const post of posts) {
               let li = document.createElement("li");
               li.textContent=`Titulo del post : ${post.title} , autor : ${post.authorId}`;
               miUl.appendChild(li);
               //document.appendChild()
               console.log(post);
            }
        } else {
            console.log("Error " + peticion.status + " (" + peticion.statusText + ") en la petición");
        }
    }
})


