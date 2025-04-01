<?php
$rutaConSlash = str_replace('\\', '/', dirname(__DIR__));
define('ROOT_PATH', $rutaConSlash);
include(ROOT_PATH."/sensitive.php");

switch($_SERVER['HTTP_HOST']){
	case 'localhost':
        // define('RUTA_PROYECTO', $_SERVER['DOCUMENT_ROOT'].'/AVONNI/hbcinnovation/');
        define('REDIRECT_ROUTE', 'http://localhost/AVONNI/hbcinnovation/');
        //error_reporting (E_ALL ^ E_NOTICE ^ E_WARNING);
        break;

        case 'hbcinnnovatons.hbcavonni.com';
        // define('RUTA_PROYECTO', '/var/www/vhosts/41140010.servicio-online.net/hbcinnnovatons.hbcavonni.com/');
        define('REDIRECT_ROUTE', 'https://hbcinnnovatons.hbcavonni.com/');
        error_reporting (E_ALL ^ E_NOTICE ^ E_WARNING);
        break;
}

switch (ENVIROMENT) {
        case 'LOCAL':
	include(ROOT_PATH."/modelo/conexion-datos.php");
	break;

	case 'TEST':
	include(ROOT_PATH."/modelo/conexion-datos.php");
	break;

        case 'PROD':
        include(ROOT_PATH."/modelo/conexion-datos.php");
        break;

        default:
        include(ROOT_PATH."/modelo/conexion-datos.php");
        break;
}

define('ACTIVO', 'ACTIVO');
define('INACTIVO', 'INACTIVO');

define('SI', 'SI');
define('NO', 'NO');

define('TIPO_DEV', 1);
define('TIPO_ADMIN', 2);
define('TIPO_INVERSOR', 3);