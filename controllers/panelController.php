<?php 
	
	// carga la vista 
	$tpl = new MotorMaster('panel');

	// variables de remplazo de la vista
	$vars = [
		"PROYECT_SECTION" => "Estaciones"
	];

	// reemplza las variables
	$tpl->setVars($vars);

	// imprime la vista en pantalla
	$tpl->print();
 ?>