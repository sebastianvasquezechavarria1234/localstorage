

function registerUSer() {
    const nombre = document.querySelector("#nombreUser").value;
    const apellido = document.querySelector("#apellidoUser").value;
    const email = document.querySelector("#emailUser").value;
    const password = document.querySelector("#passwordUser").value;
    const repetirPassword = document.querySelector("#repetirPaswordUser").value;

    if (!nombre || !apellido || !email || !password || !repetirPassword) {
        notify("Por favor, completa todos los campos", "error");
        return;
    }

    if (password !== repetirPassword) {
        notify("Las contraseñas no coinciden", "error");
        return;
    }

    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    const userExists = registeredUsers.find(u => u.email === email);
    if (userExists) {
        notify("El correo electrónico ya está registrado", "error");
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
    
    notify("Usuario registrado con éxito", "success");
    window.location.href = 'login.html';
}


