
// ELEMENTOS DEL DOM
const title = document.querySelector("#title");
const btnAgregar = document.querySelector("#btn__agregar");
const modalUser = document.querySelector("#modal__user");
const userForm = document.querySelector("#userForm");
const modalTitle = document.querySelector("#modalTitle");
const btnSubmit = document.querySelector("#btnSubmit");
const tableBody = document.querySelector("#tableData tbody");
const modalInfo = document.querySelector("#modalInfo");

// ESTADO DE LA APLICACIÓN
let users = JSON.parse(localStorage.getItem("users")) || [];
const activeUser = JSON.parse(localStorage.getItem('activeUser'));

// INICIALIZACIÓN
document.addEventListener("DOMContentLoaded", () => {
    if (activeUser) {
        title.innerHTML = `Bienvenid@ ${activeUser.nombre} ${activeUser.apellido}`;
    }
    renderTable();
});

// FUNCIONES DE UTILIDAD
const showModal = (titleText, buttonText, userData = null) => {
    modalTitle.innerText = titleText;
    btnSubmit.innerText = buttonText;
    
    if (userData) {
        userForm.userId.value = userData.id;
        userForm.nombre.value = userData.nombre;
        userForm.edad.value = userData.edad;
        userForm.ciudad.value = userData.ciudad;
        userForm.email.value = userData.email;
        userForm.telefono.value = userData.telefono;
        userForm.direccion.value = userData.direccion;
        userForm.dateTime.value = userData.dateTime;
    } else {
        userForm.reset();
        userForm.userId.value = "";
    }
    
    modalUser.style.top = "0";
};

const hideModal = () => {
    modalUser.style.top = "-100%";
    userForm.reset();
};

const saveToLocalStorage = () => {
    localStorage.setItem("users", JSON.stringify(users));
};

// CRUD LOGIC
const renderTable = () => {
    tableBody.innerHTML = "";
    users.forEach((user) => {
        const row = document.createElement("tr");
        row.classList.add("filaStyle");
        row.innerHTML = `
            <div class="flex gap-[10px] mb-[20px]">
                <span class="w-[50px] h-[50px] bg-blue-100 text-blue-700 rounded-full flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" /><path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" /></svg>
                </span>
                <div class="">
                    <p class="italic underline text-blue-700 text-xs">ID: ${user.id.substring(0, 8)}</p>
                    <p class="font-bold">${user.nombre}</p>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm italic">
                <p><b>Edad:</b> ${user.edad}</p>
                <p><b>Ciudad:</b> ${user.ciudad}</p>
                <p class="col-span-2"><b>Email:</b> ${user.email}</p>
                <p><b>Tel:</b> ${user.telefono}</p>
                <p><b>Fecha:</b> ${user.dateTime}</p>
            </div>
            <div class="flex mt-4 justify-end gap-2">
                <button onclick="viewUser('${user.id}')" class="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                </button>
                <button onclick="editUser('${user.id}')" class="bg-green-600 hover:bg-green-700 text-white p-2 rounded transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                </button>
                <button onclick="deleteUser('${user.id}')" class="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                </button>
            </div>
        `;
        tableBody.appendChild(row);
    });
};

userForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const id = userForm.userId.value;
    const userData = {
        id: id || crypto.randomUUID(),
        nombre: userForm.nombre.value,
        edad: userForm.edad.value,
        ciudad: userForm.ciudad.value,
        email: userForm.email.value,
        telefono: userForm.telefono.value,
        direccion: userForm.direccion.value,
        dateTime: userForm.dateTime.value
    };

    if (id) {
        // UPDATE
        const index = users.findIndex(u => u.id === id);
        users[index] = userData;
    } else {
        // CREATE
        users.push(userData);
    }

    saveToLocalStorage();
    renderTable();
    hideModal();
    notify(id ? "Usuario actualizado" : "Usuario agregado", "success");
});

window.deleteUser = (id) => {
    if (confirm("¿Estás seguro de eliminar este registro?")) {
        users = users.filter(u => u.id !== id);
        saveToLocalStorage();
        renderTable();
        notify("Usuario eliminado", "success");
    }
};

window.editUser = (id) => {
    const user = users.find(u => u.id === id);
    if (user) {
        showModal("Actualizar Usuario", "Actualizar", user);
    }
};

window.viewUser = (id) => {
    const user = users.find(u => u.id === id);
    if (user) {
        modalInfo.style.top = "0%";
        modalInfo.innerHTML = `
            <article class="max-w-[500px] bg-white p-[20px] rounded-[20px] shadow-xl">
                <div class="flex justify-between items-start mb-4">
                    <div class="flex gap-3 items-center">
                        <span class="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" /><path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" /></svg>
                        </span>
                        <div>
                            <h2 class="text-xl font-bold">${user.nombre}</h2>
                            <p class="text-gray-500 text-xs">ID: ${user.id}</p>
                        </div>
                    </div>
                </div>
                <div class="space-y-2 text-gray-700">
                    <p><b>Edad:</b> ${user.edad} años</p>
                    <p><b>Ciudad:</b> ${user.ciudad}</p>
                    <p><b>Email:</b> ${user.email}</p>
                    <p><b>Teléfono:</b> ${user.telefono}</p>
                    <p><b>Dirección:</b> ${user.direccion}</p>
                    <p><b>Fecha Registro:</b> ${user.dateTime}</p>
                </div>
                <div class="flex justify-end mt-6">
                    <button onclick="modalInfo.style.top = '-100%'" class="py-2 px-6 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition-colors">Cerrar</button>
                </div>
            </article>
        `;
    }
};

window.exitUser = () => {
    if (confirm("¿Estás seguro de que quieres salir?")) {
        localStorage.removeItem('activeUser');
        window.location.replace('login.html');
    }
};

// EVENT LISTENERS
btnAgregar.addEventListener("click", () => showModal("Agregar un usuario", "Entregar"));

document.querySelectorAll(".btn__close").forEach(btn => {
    btn.addEventListener("click", hideModal);
});