<?php
switch($_SERVER['HTTP_HOST']){
	case 'localhost':
        define('RUTA_PROYECTO', $_SERVER['DOCUMENT_ROOT'].'/AVONNI/productiontaiko.com/');
        define('REDIRECT_ROUTE', 'http://localhost/AVONNI/productiontaiko.com/');
        break;

        case 'sbksocialclub.com';
        define('RUTA_PROYECTO', $_SERVER['DOCUMENT_ROOT'].'/');
        define('REDIRECT_ROUTE', 'https://sbksocialclub.com/');
        error_reporting (E_ALL ^ E_NOTICE ^ E_WARNING);
        break;
}

include(RUTA_PROYECTO."model/sensitive.php");

switch (ENVIROMENT) {
        case 'LOCAL':
	include(RUTA_PROYECTO."model/conexion-datos.php");
	break;

	case 'TEST':
	include(RUTA_PROYECTO."model/conexion-datos-developer.php");
	break;

        case 'PROD':
        include(RUTA_PROYECTO."model/conexion-datos-production.php");
        break;

        default:
        include(RUTA_PROYECTO."model/conexion-datos.php");
        break;
}