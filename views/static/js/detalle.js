const search = window.location.search.substring(1).split('=')

// Si no hay un id de referencia
if (search=='') {
	window.location.href='./panel'
}

const chipid = search[1]

const MAX_DATOS = 1;

// trae los datos
async function getDatos(cantfilas){
	const response = await fetch(` https://mattprofe.com.ar/proyectos/app-estacion/datos.php?chipid=${chipid}&cant=${cantfilas}`)
	const data = await response.json()

	return data
}

getDatos(MAX_DATOS).then(data=>{
	nombre_estacion.innerHTML=data[0].estacion
	ubi_estacion.innerHTML=data[0].ubicacion
})

