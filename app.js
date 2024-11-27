const textoTarea = document.getElementById('texto-tarea');
const listaTareas = document.getElementById('tareas');
const botonAgregar = document.getElementById('boton-agregar');

async function obtenerTareas() {
    const response = await fetch('http://localhost:3000/tareas');
    const data = await response.json();

    listaTareas.innerHTML = '';

    data.tareas.forEach((tarea) => {
        const li = document.createElement('li');
        li.classList.add('tarea');

        const descripcion = document.createElement('span');
        descripcion.textContent = tarea.descripcion;
        li.appendChild(descripcion);

        const botonBorrar = document.createElement('button');
        botonBorrar.classList.add('boton-borrar');
        botonBorrar.textContent = 'Borrar';
        botonBorrar.onclick = () => borrarTarea(tarea.id);
        li.appendChild(botonBorrar);

        listaTareas.appendChild(li);
    });
}

async function agregarTarea() {
    const descripcion = textoTarea.value.trim();

    if (!descripcion) {
        alert('Ingresa una tarea.');
        return;
    }

    const response = await fetch('http://localhost:3000/tareas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ descripcion: descripcion })
    });

    textoTarea.value = '';
    obtenerTareas();
}

async function borrarTarea(id) {
    const response = await fetch(`http://localhost:3000/tareas/${id}`, { method: 'DELETE' });
    obtenerTareas();
}

botonAgregar.addEventListener('click', agregarTarea);
document.addEventListener('DOMContentLoaded', obtenerTareas);