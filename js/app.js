const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');
const container = document.querySelector('.container');

document.addEventListener('DOMContentLoaded', () => {
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e){
    e.preventDefault();

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(pais === '' || ciudad === ''){
        imprimirAlerta('Ambos campos son obligatorios', 'error');
        return;
    }

    //Consultar API
    consultarAPI(ciudad, pais);
}

function imprimirAlerta(mensaje, tipo){
    const div = document.createElement('DIV');
    const error = document.querySelector('.error');
    if(!error){
        div.textContent = mensaje;
        div.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center', 'error');
        if(tipo === 'error'){
            div.classList.add('danger');
        }else{
            div.classList.add('success');
        }
        formulario.appendChild(div)
        setTimeout(() => {
            div.remove();
        }, 2000);
    }
}
function consultarAPI(ciudad, pais){
    const appID = '3825d5e41b0b0240253578b46b6ffdb9';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;

    
    fetch(url)
        .then(resolve => resolve.json())
        .then(datos => {
            console.log(datos);
            limpiarHTML();
            if(datos.cod === '404'){
                imprimirAlerta('Ciudad no encontrada', 'error');
                return;
            }
            mostrarClima(datos);
        })
}

function mostrarClima(clima){
    const {name,main: {temp, temp_max, temp_min, humidity}, sys: {country} } = clima;

    const temperatura = kelvinaCentrigrados(temp);
    const max = kelvinaCentrigrados(temp_max);
    const min = kelvinaCentrigrados(temp_min);

    const nombre = document.createElement('P');
    nombre.textContent = `${name}, ${country}`;
    nombre.classList.add('text-3xl', 'text-center');

    const resultadoTemp = document.createElement('P');
    resultadoTemp.innerHTML = `${temperatura} &#8451;`
    resultadoTemp.classList.add('font-bold', 'text-6xl');

    const maxTemp = document.createElement('P');
    maxTemp.innerHTML = `Max: ${max} &#8451;`
    maxTemp.classList.add('text-xl');

    const minTemp = document.createElement('P');
    minTemp.innerHTML = `Min: ${min} &#8451;`
    minTemp.classList.add('text-xl');

    const humedad = document.createElement('P');
    humedad.innerHTML = `Humedad: ${humidity}%;`
    humedad.classList.add('text-xl');

    const resultadoDiv = document.createElement('DIV');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombre);
    resultadoDiv.appendChild(resultadoTemp);
    resultadoDiv.appendChild(maxTemp);
    resultadoDiv.appendChild(minTemp);
    resultadoDiv.appendChild(humedad);

    resultado.appendChild(resultadoDiv);
}
const kelvinaCentrigrados = grados => parseInt(grados - 273.15);

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}
function spinner(){
    console.log('spinner');
    limpiarHTML();
    const divSpinner = document.createElement('DIV') ;
    divSpinner.classList.add('.sk-fading-circle');
    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;
    resultado.appendChild(divSpinner);
}