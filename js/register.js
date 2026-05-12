

function registerUSer() {
    const nombre = document.querySelector("#nombreUser").value;
    const apellido = document.querySelector("#apellidoUser").value;
    const email = document.querySelector("#emailUser").value;
    const password = document.querySelector("#passwordUser").value;
    const repetirPassword = document.querySelector("#repetirPaswordUser").value;

    if (!nombre || !apellido || !email || !password || !repetirPassword) {
        alert("Por favor, completa todos los campos");
        return;
    }

    if (password !== repetirPassword) {
        alert("Las contraseñas no coinciden");
        return;
    }

    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    const userExists = registeredUsers.find(u => u.email === email);
    if (userExists) {
        alert("El correo electrónico ya está registrado");
        return;
    }

    const newUser = {
        id: crypto.randomUUID(),
        nombre,
        apellido,
        email,
        password
    };

    registeredUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    
    alert("Usuario registrado con éxito");
    window.location.href = 'login.html';
}


