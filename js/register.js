

function registerUSer () {
    const user = {
        nombre:document.querySelector("#nombreUser").value,
        apellido:document.querySelector("#apellidoUser").value,
        email:document.querySelector("#emailUser").value,
        password:document.querySelector("#passwordUser").value,
        repetirPassword:document.querySelector("#repetirPaswordUser").value
    }

    localStorage.setItem('user', JSON.stringify(user))
    console.log(user)
    alert("Usuario registrado")
    window.location.href = 'login.html'
}


