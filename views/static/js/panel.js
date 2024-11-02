
loadEstaciones().then( data => {
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
	
	// agrega al clon al documento
	estaciones.appendChild(clon)
}