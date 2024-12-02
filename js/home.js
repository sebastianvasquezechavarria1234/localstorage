
// TITLE BIENVENIDO
const title = document.querySelector("#title")

const data = JSON.parse(localStorage.getItem('user'))
title.innerHTML = "Bienvenid@ " + `${data.nombre}` + " " + `${data.apellido}`

function exitUser () {
    const exit = confirm("Esta seguro de que quieres salir?")
    if(exit){
        window.location.replace('login.html')
    }
}

// FORMULARIO DESPLEGABLE

const btnAgregar = document.querySelector("#btn__agregar")
const btnClose = document.querySelectorAll("#btn__close")
const modalForm = document.querySelector("#modal__form")

btnAgregar.addEventListener("click", () => {
    modalForm.style.top = "0"
})

btnClose[0].addEventListener("click", () => {
    modalForm.style.top = "-100%"
})

btnClose[1].addEventListener("click", () => {
    modalForm.style.top = "-100%"
})

// REGISTER USER DATA


document.addEventListener("DOMContentLoaded", () => {
    const myForm = document.querySelector("form")

    // LLAMAMOS ALA TABLA
    const tableData = document.querySelector("#tableData tbody");

    const loadTableData = () => {
        const users  = JSON.parse(localStorage.getItem("users")) || []
        renderTable(users)
        
    }

    // ANTES DE REGISTRAR ALGUN DATOS HAY QUE AVERIGUAR SI EXISTEN DATOS EN EL LOCALSTORAGE


    // GUARDAR DATOS AL LOCALSTORAGE
    const saveUser = (userData) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        console.log(userData)

        // HACEMOS EL PUSH AL DARLE CLICK AL FORMULARIO
        users.push(userData)

        // GUARDAMOS DATOS DETRO DEL LOCALSTORAGE
        localStorage.setItem("users", JSON.stringify(users))

        // FUNCION PARA MOSTRAR DATOS EN LA TABLA
        renderTable(users);
        location.reload();

    };
    
    // VAMOS A RENDERISAR LA FUNCION PARA MOSTAR LOS DATOS EN LA TABLA
    const renderTable = (users) => {
    
        // Renderizar nuevas filas
        users.forEach((user, index) => {
           
            const row = document.createElement("tr");
            row.classList.add("filaStyle")
            row.innerHTML = `
                <div class="flex gap-[10px] mb-[20px]">
                    <span class="w-[50px] h-[50px] bg-blue-100 text-blue-700 rounded-full flex justify-center items-center">
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" /><path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" /></svg>
                    </span>
                    <div class="">
                        <p class="italic underline text-blue-700">Uid: ${index + 1}</p>
                        <p class="italic">Nombre: ${user.nombre}</p>
                    </div>

                    
                </div>
                <div class="flex flex-wrap gap-[10px] items-center italic">
                    <p>Edad: ${user.edad}</p>
                    <span class="w-[1px] h-[18px] bg-black"></span>
                    <p>Ciudad: ${user.ciudad}</p>
                    <span class="w-[1px] h-[18px] bg-black"></span>
                    <p>Email: ${user.email}</p>
                    <span class="w-[1px] h-[18px] bg-black"></span>
                    <p>Telefono: ${user.telefono}</p>
                    <span class="w-[1px] h-[18px] bg-black"></span>
                    <p>Direccion: ${user.direccion}</p>
                    <span class="w-[1px] h-[18px] bg-black"></span>
                    <p>Fecha: ${user.dateTime}</p>
                </div>

                <div class="flex mt-[20px] justify-end gap-[5px]">
                    <p 
                        class="bg-blue-700 cursor-pointer text-white flex items-center gap-[5px] py-[4px] px-[10px] text-[15px] rounded-[4px]"
                        onclick="consultUser(${index})">
                        Consulta
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="21"  height="21"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.5"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-eye-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M12 18c-.328 0 -.652 -.017 -.97 -.05c-3.172 -.332 -5.85 -2.315 -8.03 -5.95c2.4 -4 5.4 -6 9 -6c3.465 0 6.374 1.853 8.727 5.558" /><path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M20.2 20.2l1.8 1.8" /></svg>
                    </p>
                    <p 
                        class="bg-red-700 cursor-pointer text-white flex items-center gap-[5px] py-[4px] px-[10px] text-[15px] rounded-[4px]"
                        onclick="deleteUser(${index})">
                        Eliminar
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="21"  height="21"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.5"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-backspace"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 6a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-11l-5 -5a1.5 1.5 0 0 1 0 -2l5 -5z" /><path d="M12 10l4 4m0 -4l-4 4" /></svg>
                    </p>
                    <p 
                        class="bg-green-700 cursor-pointer text-white flex items-center gap-[5px] py-[4px] px-[10px] text-[15px] rounded-[4px]"
                        onclick="updateUser(${index})">
                        Actualizar
                       <svg  xmlns="http://www.w3.org/2000/svg"  width="21"  height="21"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.5"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                    </p>
                </div>
            `;
            tableData.appendChild(row);
        });
    };
    
   
    


    // MANEJO DEL ENVIO DEL FORMULARIO
    myForm.addEventListener("submit", (e) => {
       /*  e.preventDefault(); */
        const userData = {
            nombre: document.querySelector("#nombre").value,
            edad: document.querySelector("#edad").value,
            ciudad: document.querySelector("#ciudad").value,
            email: document.querySelector("#email").value,
            telefono: document.querySelector("#telefono").value,
            direccion: document.querySelector("#direccion").value,
            dateTime: document.querySelector("#dateTime").value
        };
        // ENVIO TODOS LOS DATOS DE LOS CAMPOS ALA FUCION LLAMADA SAVEUSER
        saveUser(userData)
        myForm.reset();


    });

    // ME CARGA LOS DATOS AUTOMATICAMENTE EN LA TABLE
    loadTableData();
});

// CONSULTA

consultUser = (index) => {
    const modalInfo = document.querySelector("#modalInfo")
    const users = JSON.parse(localStorage.getItem("users")) || []
    const user = users[index]

    modalInfoBtn = () => {
        modalInfo.style.top = "-100%"
    }
    
    if(user){
        modalInfo.style.top = "0%"
        modalInfo.innerHTML =`
            <article class="max-w-[500px] bg-white p-[20px] rounded-[20px]">
                <div class="flex gap-[10px] mb-[20px]">
                        <span class="w-[50px] h-[50px] bg-blue-100 text-blue-700 rounded-full flex justify-center items-center">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" /><path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" /></svg>
                        </span>
                        <div class="">
                            <p class="italic underline text-blue-700">Uid: ${index + 1}</p>
                            <p class="italic">Nombre: ${user.nombre}</p>
                        </div>

                        
                    </div>
                    <div class="flex flex-wrap gap-[10px] items-center italic">
                        <p>Edad: ${user.edad}</p>
                        <span class="w-[1px] h-[18px] bg-black"></span>
                        <p>Ciudad: ${user.ciudad}</p>
                        <span class="w-[1px] h-[18px] bg-black"></span>
                        <p>Email: ${user.email}</p>
                        <span class="w-[1px] h-[18px] bg-black"></span>
                        <p>Telefono: ${user.telefono}</p>
                        <span class="w-[1px] h-[18px] bg-black"></span>
                        <p>Direccion: ${user.direccion}</p>
                        <span class="w-[1px] h-[18px] bg-black"></span>
                        <p>Fecha: ${user.dateTime}</p>
                    </div>

                    <div class="flex justify-end mt-[20px]">
                        <p onclick="modalInfoBtn()" class="py-[8px] px-[18px] rounded-[6px] cursor-pointer bg-gray-700 text-white">Cerrar</p>
                    </div>
            </article>
        `
        
    }
}

// ELIMINAR DATOS

 const deleteUser = (index) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.splice(index, 1)
  
    // ELIMINA DEL JSON
    localStorage.setItem("users", JSON.stringify(users))

    // ACA RENDERISAMOS LA TABLA
   /*  tableData.innerHTML = "" */
    /* users.forEach((user, i) => renderTable(users)) */
    location.reload();
    renderTable(users)
}

// ACTUALIZAR DATOS
updateUser = (index) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users[index];

    const modalUpdate = document.querySelector("#modal__form__update");
    const formUpdate = document.querySelector("#myFormUpdate");

    // Cargar los datos actuales en el formulario
    formUpdate.nombre.value = user.nombre;
    formUpdate.edad.value = user.edad;
    formUpdate.ciudad.value = user.ciudad;
    formUpdate.email.value = user.email;
    formUpdate.telefono.value = user.telefono;
    formUpdate.direccion.value = user.direccion;
    formUpdate.dateTime.value = user.dateTime;

    // Mostrar el modal
    modalUpdate.style.top = "0%";

    // Cerrar el modal
    const closeModal = () => {
        modalUpdate.style.top = "-100%";
    };

    // Manejar el cierre del modal al hacer clic en el icono "Cerrar"
    document.querySelectorAll("#btn__close").forEach(btn => {
        btn.onclick = closeModal;
    });

    // Evento para actualizar los datos
    formUpdate.onsubmit = (e) => {
        e.preventDefault();

        // Obtener los nuevos valores desde el formulario
        const updatedUser = {
            nombre: formUpdate.nombre.value,
            edad: formUpdate.edad.value,
            ciudad: formUpdate.ciudad.value,
            email: formUpdate.email.value,
            telefono: formUpdate.telefono.value,
            direccion: formUpdate.direccion.value,
            dateTime: formUpdate.dateTime.value || user.dateTime,
        };

        // Actualizar el usuario en el array
        users[index] = updatedUser;

        // Guardar los cambios en localStorage
        localStorage.setItem("users", JSON.stringify(users));

        // Cerrar el modal
        closeModal();

        // Recargar la página
        location.reload();
    };
};