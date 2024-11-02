<?php 
	
	// carga la vista 
	$tpl = new MotorMaster('landing');

	// variables de remplazo de la vista
	$vars = [
		"PROYECT_SECTION" => "Landing"
	];

	// reemplza las variables
	$tpl->setVars($vars);

	// imprime la vista en pantalla
	$tpl->print();
 ?>