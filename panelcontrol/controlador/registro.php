<?php
	require_once("../modelo/constantes.php");
	require_once(ROOT_PATH."/../class/Usuarios.php");
	require_once(ROOT_PATH."/../class/EnviarEmail.php");

try {
	$usuario = str_replace([' ', '.', ','], '', $_POST["nDoc"]);
	$usuario = preg_replace('/[ .,]/', '', $usuario);

	$datos = [
		"usr_login"				=> trim($usuario),
        "usr_clave"				=> SHA1($_POST["password"]),
        "usr_nombre"			=> $_POST["name"],
        "usr_email"				=> $_POST["email"],
        "usr_telefono"			=> $_POST["telephon"],
        "usr_tipo_documento"	=> $_POST["tDoc"],
        "usr_documento"			=> $_POST["nDoc"],
        "usr_direccion"			=> $_POST["address"],
        "usr_ciudad"			=> $_POST["city"],
        "usr_pais"				=> $_POST["country"],
        "usr_tipo"				=> 3
	];
	$userID = Usuarios::Insert($datos);

	$data = [
		'usuario_id'       => $userID,
		'usuario_email'    => $_POST['email'],
		'usuario_nombre'   => $_POST["name"],
		'usuario_usuario'  => trim($usuario),
		'usuario_clave'    => $_POST["password"]
	];
	$asunto = $_POST["name"] . ', Bienvenido a la Plataforma #1 en DEDUCIONES';
	$bodyTemplateRoute = ROOT_PATH.'/../template/template-email-bienvenida.php';
	
	EnviarEmail::enviar($data, $asunto, $bodyTemplateRoute,null,null);

	// Redirección en caso de éxito
	header("Location: ../login/index.php?success=1");
	exit();
} catch (mysqli_sql_exception $e) {
	// Redirección en caso de error con el mensaje de excepción
	header("Location: ../login/index.php?error=4&msj=" . urlencode($e->getMessage()));
	exit();
}
