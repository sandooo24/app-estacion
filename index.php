<?php 
	// Router con auto carga de controladores 
	
	// se incluyen las variables de entorno
	include_once 'env.php';

	// se inicia o se continua con la sesion
	session_start();

	// incluimos el motor de plantillas
	include_once 'libs/motorMaster/MotorMaster.php';
	
	// por defecto seccion de landing
	$seccion = "landing";

	// si existe slug por GET
	if(strlen($_GET['slug'])>0 ){
		// se reemplaza seccion por el valor de slug	
		$seccion = $_GET['slug'];
	}

	// si no existe el archivo del controlador
	if(!file_exists('controllers/'.$seccion.'Controller.php')){
		// seccion se carga con el controlador de error 404
		$seccion = "error404";
	}

	// carga del controlador
	include 'controllers/'.$seccion.'Controller.php';
 ?>