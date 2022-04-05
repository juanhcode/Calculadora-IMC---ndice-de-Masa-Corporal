export const cargarUsuario =(container)=>{
    let i= 0;
    fetch('../data/datos.json')
    .then(respuesta => respuesta.json()) //Formato
    .then(usuario => {
        usuario.forEach((usuario,index)=>{
            const {id,edad,IMC,sexo} = usuario
            i+=edad;
            let promedio = i / id;
            container.innerHTML = `
            <br>
            <div class="promedio">
                <p>la cantidad de personas fueron ${id}</p>
                <br>
                <div class="table">
                    <p>Tabla de promedio</p>
                    <p>Hombres</p><span>7</span>
                    <br>
                    <p>Mujeres</p><span>8</span>
                    <br>
                    <p>promedio del IMC</p><span>${IMC}</span>
                    <br>
                    <p>promedio de edad</p><span>${promedio}</span>                  
                </div>
            </div>          
            `;
        })
    })
}

const contarHombres=(sexo) => {
    let m=0;
    if(sexo === 'Masculino'){
        m++;    
    }
    return m;
    
}

const contarMujeres=(sexo) => {
    let m=0;
    if(sexo === 'Femenino'){
        m++;    
    }
    return m;
    
}