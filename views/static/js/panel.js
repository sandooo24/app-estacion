
loadEstaciones().then( data => {
	console.log(data)
	data.forEach( item => {
		cardEstacion(item)
	})
})

// peticion a la lista de estaciones
async function loadEstaciones(){
	const response = await fetch("https://mattprofe.com.ar/proyectos/app-estacion/datos.php?mode=list-stations")
	const data = await response.json()

	return data
}

// crea la estructura del boton
function cardEstacion(info){

	let tpl = tpl_card
	let clon = tpl.content.cloneNode(true)
	
	clon.querySelector(".card-station").onclick = ()=>{
		window.location.href=`./detalle?chipid=${info.chipid}`
	} 
	clon.querySelector(".card-station-ubi").innerHTML= info.ubicacion
	clon.querySelector(".card-station-views").innerHTML = info.visitas
	clon.querySelector(".card-station-name").innerHTML = info.apodo

	// si una estacion lleva mas de un dia inactiva
	if (info.dias_inactivo>0) {
		const span = document.createElement('span')
		span.classList.add('card-state')
		span.innerHTML='Inactiva'
		clon.querySelector('.card-station').appendChild(span)
	}

	// agrega al clon al documento
	estaciones.appendChild(clon)
}