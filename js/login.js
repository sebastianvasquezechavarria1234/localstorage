function loginUser() {
    const email = document.getElementById("emailUser").value;
    const password = document.getElementById("passwordUser").value;

    if (!email || !password) {
        notify("Por favor, ingresa correo y contraseña", "error");
        return;
    }

    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    
    const user = registeredUsers.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('activeUser', JSON.stringify(user));
        notify("Bienvenido, " + user.nombre, "success");
        window.location.replace('./home.html');
    } else {
        notify("Correo o contraseña incorrectos", "error");
    }
}