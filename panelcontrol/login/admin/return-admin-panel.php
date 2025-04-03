<?php
include("session.php");
require_once(ROOT_PATH."/../class/Usuarios.php");
if (!empty($_SESSION["admin"])) {
    $_SESSION['id'] = $_SESSION['admin'];
    $_SESSION['admin'] = '';
    unset($_SESSION["admin"]);
}

if (empty($_SESSION["id"])) {
    header("Location:../../controlador/salir.php");
    exit();
}

$predicadoAL = [ "usr_id" => $_SESSION['id'] ];
$consultaAL = Usuarios::Select($predicadoAL);
$fila = $consultaAL->fetch(PDO::FETCH_ASSOC);
$_SESSION["datosUsuario"] = $fila;

header("Location: ".$_SERVER['HTTP_REFERER']);