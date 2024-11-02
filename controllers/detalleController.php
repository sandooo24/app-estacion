<?php 
	if ($_SERVER['HTTP_REFERER']==null) {
		header("Location: ./panel");
	}
	
	// carga la vista 
	$tpl = new MotorMaster('detalle');

	// variables de remplazo de la vista
	$vars = [
		"PROYECT_SECTION" => "Detalle Estanción",
		"BTN_VOLVER_URL" => $_SERVER['HTTP_REFERER']
	];

	// reemplza las variables
	$tpl->setVars($vars);

	// imprime la vista en pantalla
	$tpl->print();
 ?>