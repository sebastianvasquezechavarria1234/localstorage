function loginUser() {
    const email = document.getElementById("emailUser").value;
    const password = document.getElementById("passwordUser").value;

    if (!email || !password) {
        alert("Por favor, ingresa correo y contraseña");
        return;
    }

    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    
    const user = registeredUsers.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('activeUser', JSON.stringify(user));
        alert("Bienvenido, " + user.nombre);
        window.location.replace('./home.html');
    } else {
        alert("Correo o contraseña incorrectos");
    }
}