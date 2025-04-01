<?php
	require_once("../modelo/constantes.php");
	require_once(ROOT_PATH."/../class/Usuarios.php");
	require_once(ROOT_PATH."/../class/Utilidades.php");
	require_once(ROOT_PATH."/../class/EnviarEmail.php");

try {
    $contraseña = Utilidades::generarContrasenaSegura();

	$consultaUsuario = Usuarios::Select(
        [ Usuarios::OTHER_PREDICATE => "usr_email = '{$_POST["email"]}' OR usr_login = '{$_POST["email"]}'" ]
    );
    $datosUsuario = $consultaUsuario->fetch(PDO::FETCH_ASSOC);

    if ($datosUsuario) {

        Usuarios::Update(
            [ "usr_clave"   => SHA1($contraseña) ],
            [ "usr_id"      => $datosUsuario['usr_id'] ]
        );

        $data = [
            'usuario_id'       => $datosUsuario['usr_id'],
            'usuario_email'    => $datosUsuario['usr_email'],
            'usuario_nombre'   => $datosUsuario["usr_nombre"],
            'usuario_usuario'  => $datosUsuario["usr_login"],
            'usuario_clave'    => $contraseña
        ];
        $asunto = $datosUsuario["usr_nombre"] . ', Su datos de acceso han llegado';
        $bodyTemplateRoute = ROOT_PATH.'/../template/template-email-recuperar-clave.php';
        
        EnviarEmail::enviar($data, $asunto, $bodyTemplateRoute,null,null);

        header("Location: ../login/index.php?success=2");
        exit();
    } else {
        header("Location: ../login/index.php?error=5");
        exit();
    }
} catch (mysqli_sql_exception $e) {
	// Redirección en caso de error con el mensaje de excepción
	header("Location: ../login/index.php?error=4&msj=" . urlencode($e->getMessage()));
	exit();
}
