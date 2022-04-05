import { cargarUsuario } from "../modules/mostrarEstadisticas.js";
const contenedor = document.querySelector('.container');
console.log(contenedor);

document.addEventListener('DOMContentLoaded',()=>{
    cargarUsuario(contenedor);
})