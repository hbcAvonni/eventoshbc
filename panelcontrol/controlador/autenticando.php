<?php 
include("../modelo/conexion.php");
require_once(ROOT_PATH."/../class/Usuarios.php");
require_once(ROOT_PATH."/../class/Informacion.php");
require_once(ROOT_PATH."/../class/Configuracion.php");

$pos = strstr($_POST["username"], '#');
if($pos){
	header("Location:http://www.eumed.net/rev/cccss/04/rbar2.pdf");
	exit();
}

$predicadoUsrName = [
	Usuarios::OTHER_PREDICATE => "usr_email = '{$_POST["username"]}' OR usr_login = '{$_POST["username"]}'"
];
$numE = Usuarios::numRows($predicadoUsrName);
if($numE==0){
	header("Location:../login/index.php?error=1");
	exit();
}

$predicadoUsr = [
	"usr_clave" => SHA1($_POST["password"]),
	Usuarios::OTHER_PREDICATE => "(usr_email = '{$_POST["username"]}' OR usr_login = '{$_POST["username"]}')"
];
$num = Usuarios::numRows($predicadoUsr);
if($num>0){
	if (!empty($_POST["valCorreo"]) && $_POST["valCorreo"] == "valCorreo") {
		Usuarios::Update(
			[ "usr_correo_verificado" => SI ], 
			$predicadoUsr
		);
	}
	session_start();
	$consulta = Usuarios::Select($predicadoUsr);
	$_SESSION["datosUsuario"] = $consulta->fetch(PDO::FETCH_ASSOC);
	$_SESSION["id"] = $_SESSION["datosUsuario"]["usr_id"];

	//SABER SI ESTA BLOQUEADO
	if($_SESSION["datosUsuario"]["usr_activo"]==INACTIVO){
		session_destroy();
		header("Location:../login/index.php?error=3");
		exit();
	}

	$predicadoInfo = [ "info_id" => ID_EMPRESA ];
	$consultaInfo = Informacion::Select($predicadoInfo);
	$_SESSION["informacionPagina"] = $consultaInfo->fetch(PDO::FETCH_ASSOC);

	$predicadoConfig = [ "conf_id" => ID_EMPRESA ];
	$consultaConfig = Confiuracion::Select($predicadoConfig);
	$_SESSION["configuracionPagina"] = $consultaConfig->fetch(PDO::FETCH_ASSOC);

	switch($_SESSION["datosUsuario"]["usr_tipo"]){		
		case TIPO_INVERSOR:
			$url = '../login/inversores/';
		break;
		
		default:
			$url = '../login/admin/';
		break;
	}
	header("Location:".$url);
	exit();
}else{
	header("Location:../login/index.php?error=2");
	exit();
}
?>