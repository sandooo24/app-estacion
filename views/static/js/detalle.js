// optione los parametros de la url
const search = window.location.search.substring(1).split('=')

// Si no hay un id de referencia
if (search=='') {
	window.location.href='./panel'
}

let dataGlobal;

let fec = []; // fecha
let tem = []; // temperatura
let hum = []; // humedad
let vie = []; // viento
let fue = []; // fuego
let pre = []; // presion
let chart; // variable del grafico

// almacena el chid
const chipid = search[1]

let sectionSelect="temperatura";// se debe cargar la seccion por defecto

const MAX_DATOS = 7;

// muertra los datos
mostrarData()

// cada 1 minuto trae un nuevo data y lo actuliza
setInterval(mostrarData, 60000, 1)

// obtiene todos los botones de opciones
const btnsOptions = document.querySelectorAll('.box-option')

btnsOptions.forEach( (btn) => {

	// preguna cual seccion es seleccionada por defecto
	if (sectionSelect == btn.classList[btn.classList.length-1]) {
		document.querySelector(`.container-${sectionSelect}`).style.display='block'
	}

	// si click en in boton
	btn.addEventListener('click', e =>{
		e.preventDefault()

		const btnSelect = btn.classList[btn.classList.length-1]	

		// foreach para buscar la seccion seleccionado
		btnsOptions.forEach( btn2 => {
			if (btnSelect == btn2.classList[btn2.classList.length-1]) {
				sectionSelect = btnSelect
				document.querySelector(`.container-${btnSelect}`).style.display='block'
			}
			else{
				document.querySelector(`.container-${btn2.classList[btn2.classList.length-1]}`).style.display='none'
			}
		})

		mostrarData(1,false)
	})
})

// trae los datos
async function getDatos(cantfilas){
	const response = await fetch(` https://mattprofe.com.ar/proyectos/app-estacion/datos.php?chipid=${chipid}&cant=${cantfilas}`)
	const data = await response.json()

	return data
}

async function mostrarData(cant = MAX_DATOS, valF = true) {
	if (valF) {
		dataGlobal = await getDatos(cant)// almacena los datos traidos
	}

	let fecha = new Date(dataGlobal[0].fecha)
	// Obtener los componentes de la fecha
	var dia = String(fecha.getDate()).padStart(2, '0');      // Día (con dos dígitos)
	var mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Mes (recuerda que getMonth() devuelve 0-11)
	var año = fecha.getFullYear();                           // Año (4 dígitos)
	var horas = String(fecha.getHours()).padStart(2, '0');   // Horas (formato 24 horas)
	var minutos = String(fecha.getMinutes()).padStart(2, '0'); // Minutos
	var segundos = String(fecha.getSeconds()).padStart(2, '0'); // Segundos

	// Formatear la fecha en el formato d/m/Y H:m:i
	fecha = dia + '/' + mes + '/' + año + ' ' + horas + ':' + minutos + ':' + segundos;

	console.log(dataGlobal)

	// muestra el nombre y ubicacion  de la estacion
	nombre_estacion.innerHTML=dataGlobal[0].estacion
	ubi_estacion.innerHTML=dataGlobal[0].ubicacion
	fecha_estacion.innerHTML=fecha

	if (valF) {
		orderData(dataGlobal)
	}

	// SECCION TEMPERATURA
	col_temp_btn.innerHTML=`${dataGlobal[0].temperatura.split('.')[0]}ºC`
	col_temp.innerHTML=`${dataGlobal[0].temperatura}ºC`
	col_temp_max.innerHTML=`${dataGlobal[0].tempmax}ºC`
	col_temp_min.innerHTML=`${dataGlobal[0].tempmin}ºC`

	col_senc.innerHTML=`${dataGlobal[0].sensacion}ºC`
	col_senc_max.innerHTML=`${dataGlobal[0].sensamax}ºC`
	col_senc_min.innerHTML=`${dataGlobal[0].sensamin}ºC`

	// SECCION FUEGO
	col_fueg_btn.innerHTML = estadoFuego(dataGlobal[0].fwi)
	col_fueg_ffmc.innerHTML = dataGlobal[0].ffmc
	col_fueg_dmc.innerHTML = dataGlobal[0].dmc
	col_fueg_dc.innerHTML = dataGlobal[0].dc
	col_fueg_isi.innerHTML = dataGlobal[0].isi
	col_fueg_bui.innerHTML = dataGlobal[0].bui
	col_fueg_fwi.innerHTML = dataGlobal[0].fwi

	// SECCION HUMEDAD
	col_hume_btn.innerHTML = `${parseFloat(dataGlobal[0].humedad)}%`
	col_hume.innerHTML = `${dataGlobal[0].humedad}%`

	// SECCION PRESION
	col_pres_btn.innerHTML = `${parseFloat(dataGlobal[0].presion)}hPa`
	col_pres.innerHTML = `${dataGlobal[0].presion}hPa`
	col_vien_dir.innerHTML = dataGlobal[0].veleta

	// SECCION PRESION
	col_vien_btn.innerHTML = `${parseFloat(dataGlobal[0].viento)}Km/H`
	col_vien.innerHTML = `${parseFloat(dataGlobal[0].viento)}Km/H`
	col_vien_max.innerHTML = `${dataGlobal[0].maxviento}Km/H`
	col_vien_dir.innerHTML = dataGlobal[0].veleta

	if (sectionSelect == 'temperatura') graficoLinea(fec,'Temperatura',tem,'orange','grafico_temperatura')
	if (sectionSelect == 'fuego') graficoLinea(fec,'FWI',fue,'red','grafico_fuego')
	if (sectionSelect == 'humedad') graficoLinea(fec,'Humedad',hum,'deepskyblue','grafico_humedad')
	if (sectionSelect == 'presion') graficoLinea(fec,'Presion',pre,'green','grafico_presion')
	if (sectionSelect == 'viento') graficoLinea(fec,'Viento',vie,'grey','grafico_viento')
}

// ordenar los datos recibidos 
function orderData(data) {

	for (let i = data.length-1; i >= 0; i--) {
		hora = data[i].fecha.split(" ")[1]

		// Carga de vectores para generar el grÃ¡fico
		fec.push(hora.split(":")[0]+":"+hora.split(":")[1]);
		tem.push(data[i].temperatura);
		hum.push(data[i].humedad);
		vie.push(data[i].viento);
		fue.push(data[i].fwi);
		pre.push(data[i].presion);
	}

	// Elimina los ultimos datos de los vectores si el Ãºltimo fec es igual al anteÃºltimo.
	if(fec[fec.length-1] == fec[fec.length-2]){
		fec.splice(fec.length-1,1);
		hum.splice(fec.length-1,1);
		tem.splice(fec.length-1,1);
		vie.splice(fec.length-1,1);
		fue.splice(fec.length-1,1);
		pre.splice(fec.length-1,1);
	}else{ // Elimina el primer dato de los vectores
		fec.splice(0,1);
		hum.splice(0,1);
		tem.splice(0,1);
		vie.splice(0,1);
		fue.splice(0,1);
		pre.splice(0,1);
	}
}

// determina el estado del fuego
function estadoFuego(fuego) {
	const dataFuego = parseFloat(fuego)

	if (dataFuego>=50)	return 'Extremo'
	else if (dataFuego>=38) return 'Muy alto'
	else if (dataFuego>=21.3) return 'Alto'
	else if (dataFuego>=11.2) return 'Moderado'
	else if (dataFuego>=5.2) return 'Bajo'
	else return 'Muy bajo'
}

// funcion para hacer el grafico
function graficoLinea(labelLinea,nombrePop,dataGrafico,colorGra,id) {
    // si el grafico ya existe
    if (chart) {
        chart.destroy()// lo destruye
    }

    // datos del grafico
    const data = {
    	labels: labelLinea,
    	datasets: [
    		{
    			label: nombrePop,
    			data: dataGrafico,
    			borderColor: colorGra
    		}
    	]
    }

    // opciones del grafico
    const options = {
        responsive: true,
        plugins: {
        	legend: {
        		display: false
        	},
            tooltip: {
                enabled: true, // Habilitar el tooltip
                backgroundColor: colorGra, // Fondo del tooltip
                titleColor: '#ffffff', // Color del título del tooltip
                bodyColor: '#ffffff', // Color del cuerpo del tooltip
                borderColor: '#000', // Color del borde
                borderWidth: 2, // Ancho del borde
                cornerRadius: 5, // Radio de esquina
                displayColors: false, // No mostrar el color de la serie en el tooltip
                padding:10,
                // Aumentar el tamaño de la fuente
	            titleFont: {
	                size: 35, // Tamaño del título
	                weight: 'bold', // Peso del título
	                family: 'Arial', // Fuente del título
	            },
	            bodyFont: {
	                size: 20, // Tamaño del cuerpo del tooltip
	                weight: 'normal', // Peso del cuerpo
	                family: 'Arial', // Fuente del cuerpo
	            },
                callbacks: {
                    // Modificar los contenidos del tooltip
                    label: function(tooltipItem) {
                        return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
                    }
                }
            }
        },
		elements: {
			line: {
				borderWidth: 2,
				fill: false,
			},
			point: {
				radius: 6,
				borderWidth: 4,
				backgroundColor: 'white',
				hoverRadius: 8,
				hoverRadiusWidth: 4,	
			}
		},
        scales: {// modifica la cuadricula de atras del grafico
            x: {
               	beginAtZero: true,
                grid: {
                    color: 'rgba(0,0,0,.5)', // Color de las líneas de la cuadrícula en el eje X
                    lineWidth: 1, // Ancho de la línea
                },
                ticks: {
                    font: {
                        size: 15, // Cambiar el tamaño de la fuente de las etiquetas del eje X
                        weight: 'bold', // Peso de la fuente (opcional)
                        family: 'Arial' // Familia tipográfica (opcional)
                    }
                }
            },
            y: {
               	beginAtZero: true,
                grid: {
                    color: 'rgba(0,0,0,.5)', // Color de las líneas de la cuadrícula en el eje Y
                    lineWidth: 1, // Ancho de la línea
                },
                ticks: {
                    font: {
                        size: 15, // Cambiar el tamaño de la fuente de las etiquetas del eje X
                        weight: 'normal', // Peso de la fuente (opcional)
                        family: 'Arial' // Familia tipográfica (opcional)
                    }
                }
            }
        },
		animation: {
			duration: 0
		},
		responsiveAnimationDuration: 0,
    }

    // obtiene el elemento del grafico
    const ctx = document.getElementById(id).getContext('2d')

    // crea un nuevo grafico
    chart= new Chart(ctx,{ type: "line",data,options });
}
