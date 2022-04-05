let formulario = document.querySelector('form');
let botonEnviar = document.querySelector('.btn-enviar');
let edad = document.getElementById('edad');
let peso = document.getElementById('peso');
let altura = document.getElementById('altura');
let sexo = document.getElementById('sexo');
let opciones = document.getElementsByClassName('opcion');
const contenedorResultados = document.querySelector('.resultados');
const contenidoTotal = document.querySelector('.container');
console.log(contenidoTotal);
let resultado;

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    for (let check of opciones) {
        if (check.checked === true) {
            const usuario = {
                "sexo": check.value,
                "edad": edad.value,
                "peso": peso.value,
                "altura": altura.value,
            }
            guardarUsuarios(usuario);
            calcularIMC(peso.value, altura.value);
        }
    }
    formulario.reset();
})

document.addEventListener('DOMContentLoaded', () => {
    //Validar para solo escoger una
    let Checked = null;
    for (let CheckBox of opciones) {
        CheckBox.onclick = function () {
            if (Checked != null) {
                Checked.checked = false;
                Checked = CheckBox;
            }
            Checked = CheckBox;
        }
    }
})

function guardarUsuarios(usuario) {
    let array = JSON.parse(localStorage.getItem('usuarios')) || [];
    array.push(usuario);
    let arrayJson = JSON.stringify(array);
    localStorage.setItem('usuarios', arrayJson);
}

const calcularIMC = (peso, estatura) => {
    limpiarHTML();
    contenidoTotal.style.height ='860px';
    resultado = (peso / (estatura * estatura)).toFixed(1);
    const fieldResultado = document.createElement('p');
    fieldResultado.textContent = 'Resultado';
    fieldResultado.classList.add('textoResultado');
    contenedorResultados.appendChild(fieldResultado);

    const textResultado = document.createElement('p');
    textResultado.classList.add('resultado-numero');
    textResultado.style.textAlign = 'center';
    textResultado.style.color = '#67b639';
    textResultado.textContent = resultado;
    contenedorResultados.appendChild(textResultado);

    const input = document.createElement('input');
    input.type = 'range';
    input.min = '1';
    input.max = '40';
    input.step = 'any';
    input.value = resultado;
    input.disabled = true;
    contenedorResultados.appendChild(input);
    if (resultado < 18.5) {
        mostrarEstadoDeSalud(contenedorResultados, 'Por debajo del peso');
    } else if (resultado > 18.5 && resultado < 24.9) {
        mostrarEstadoDeSalud(contenedorResultados, 'Saludable');

    } else if (resultado > 25.0 && resultado < 29.9) {
        mostrarEstadoDeSalud(contenedorResultados, ' Con sobrepeso');

    } else if (resultado > 30.0 && resultado < 39.9) {
        mostrarEstadoDeSalud(contenedorResultados, 'Obeso');

    } else {
        mostrarEstadoDeSalud(contenedorResultados, 'Obesidad extrema');
    }
    const hr = document.createElement('hr')
    contenedorResultados.appendChild(hr);

    const informacion = document.createElement('div');
    informacion.innerHTML = `
    <br>
    <div class="especificaciones">
        <img src="assets/azul.png" alt=""><span class="info-peso">Bajo peso</span>
        <br>
        <img src="assets/verde.png" alt=""><span class="info-peso">Saludable</span>
        <br>
        <img src="assets/amarillo.png" alt=""><span class="info-peso">Exceso de peso</span>
        <br>
        <img src="assets/rojo.png" alt=""><span class="info-peso">Obeso</span>
    </div>
    `;
    contenedorResultados.appendChild(informacion);

}

function mostrarEstadoDeSalud(container, mensaje) {
    const texto = document.createElement('p');
    texto.classList.add('resultadoObtenido')
    texto.textContent = mensaje;
    container.appendChild(texto);
}

function limpiarHTML(){
    while (contenedorResultados.firstChild){
        contenedorResultados.removeChild(contenedorResultados.firstChild);
    }

}