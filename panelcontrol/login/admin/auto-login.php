<?php
include("session.php");
require_once(ROOT_PATH."/../class/Usuarios.php");
$_SESSION['admin'] = $_SESSION['id'];

$_SESSION['id'] = base64_decode($_GET['user']);

$predicadoAL = [ "usr_id" => $_SESSION['id'] ];
$consultaAL = Usuarios::Select($predicadoAL);
$fila = $consultaAL->fetch(PDO::FETCH_ASSOC);
$_SESSION["datosUsuario"] = $fila;

if($_SESSION["datosUsuario"]["usr_tipo"] == TIPO_INVERSOR) {
	header("Location:../inversores/");
    exit;
}

header("Location: ".$_SERVER['HTTP_REFERER']);
exit;