

function loginUser(){
    let email = document.getElementById("emailUser").value
    let password = document.getElementById("passwordUser").value

    const data = JSON.parse(localStorage.getItem('user'))
    if(data.email === email && data.password === password){
        alert("Bienvenido")
        window.location.replace('./home.html')
    }else{
        alert("no registrado")
    }
}