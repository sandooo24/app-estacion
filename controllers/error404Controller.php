<?php 
	
	// carga la vista 
	$tpl = new MotorMaster('error404');

	// variables de remplazo de la vista
	$vars = [
		"PROYECT_SECTION" => "Pagina no encontrada"
	];

	// reemplza las variables
	$tpl->setVars($vars);

	// imprime la vista en pantalla
	$tpl->print();
 ?>