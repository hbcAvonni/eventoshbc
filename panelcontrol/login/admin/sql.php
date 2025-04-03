<?php
include("session.php");
include(ROOT_PATH."/informacion.php");
require_once(ROOT_PATH."/../class/Usuarios.php");
require_once(ROOT_PATH."/../class/Eventos.php");
require_once(ROOT_PATH."/../class/Informacion.php");
require_once(ROOT_PATH."/../class/Configuracion.php");

//-----------------------------------------------------POST-------------------------------------------------------------
$post = !empty($_POST["id"]) ? $_POST["id"] : 0;

//EDITAR INFORMACION EMPRESA
if ($post == 1) {
	if (empty($_POST["nomEmpresa"]) || empty($_POST["emailp"]) || empty($_POST["telp"])) {
		echo '<script type="text/javascript">window.location.href="confirmacion.php?msj=200"</script>';
		exit();
	}

	$predicado = [ "info_id" => ID_EMPRESA ];

	$datos = [
		"info_nombre_empresa"		=> $_POST["nomEmpresa"],
		"info_email_principal"		=> $_POST["emailp"],
		"info_telefono_principal"	=> $_POST["telp"],
		"info_emails"				=> $_POST["emails"],
		"info_telefonos"			=> $_POST["telefonos"],
		"info_terminos_condiciones"	=> $_POST["terminos"],
		"info_proteccion_datos"		=> $_POST["proteccionDatos"],
		"info_preguntas_frecuentes"	=> $_POST["preguntas"],
		"info_direccion"			=> $_POST["dir"],
		"info_mapa"					=> $_POST["mapa"],
		"info_pagina_web"			=> $_POST["pagina"],
		"info_logo_ancho"			=> $_POST["logoAncho"],
		"info_logo_alto"			=> $_POST["logoAlto"]
	];

	//IMAGENES
	if (!empty($_FILES['logo']['name'])) {
		$archivo = $_FILES['logo']['tmp_name'];
		$nombre = $_FILES['logo']['name'];
		$destino = "../files/logo/";
		move_uploaded_file($archivo, $destino . "/" . $nombre);

		$datos = array_merge($datos, [
			"info_logo"	=> $nombre
		]);
	}

	Informacion::Update($datos, $predicado);

	$consulta = Informacion::Select($predicado);
	$_SESSION["informacionPagina"] = $consulta->fetch(PDO::FETCH_ASSOC);
	
	echo '<script type="text/javascript">window.location.href="informacion.php"</script>';
	exit();
}

//CREAR EVENTO
if ($post == 2) {

	$datos = [
		"eve_nombre"		=> $_POST["titulo"],
		"eve_fecha"			=> $_POST["fecha"],
		"eve_cupos"			=> $_POST["cupos"],
		"eve_precio"		=> $_POST["precio"],
		"eve_activo"		=> $_POST["activo"],
		"eve_descripcion"	=> $_POST["descripcion"]
	];

	if( $_SESSION["datosUsuario"]['usr_tipo'] != TIPO_INVERSOR && $_SESSION["datosUsuario"]['usr_super_admin'] == SI ) {
		$datos = array_merge($datos, [
			"eve_costo_anual"		=> $_POST["cAnual"],
			"eve_costo_inversores"	=> $_POST["cInversores"]
		]);
	}

	if (!empty($_FILES['imagen']['name'])){
		$destino = "../files/eventos/";
		$archivo = $_FILES['imagen']['tmp_name'];
		$nombre = $_FILES['imagen']['name'];
		move_uploaded_file($archivo, $destino . "/" . $nombre);

		$datos = array_merge($datos, [
			"eve_imagen"		=> $nombre,
		]);
	}

	Eventos::Insert($datos);

	echo '<script type="text/javascript">window.location.href="eventos.php"</script>';
	exit();
}

//EDITAR EVENTO
if ($post == 3) {
	$predicado	= [ "eve_id"		=> $_POST["idE"] ];

	$datos = [
		"eve_nombre"		=> $_POST["titulo"],
		"eve_fecha"			=> $_POST["fecha"],
		"eve_cupos"			=> $_POST["cupos"],
		"eve_precio"		=> $_POST["precio"],
		"eve_activo"		=> $_POST["activo"],
		"eve_descripcion"	=> $_POST["descripcion"]
	];

	if( $_SESSION["datosUsuario"]['usr_tipo'] != TIPO_INVERSOR && $_SESSION["datosUsuario"]['usr_super_admin'] == SI ) {
		$datos = array_merge($datos, [
			"eve_costo_anual"		=> $_POST["cAnual"],
			"eve_costo_inversores"	=> $_POST["cInversores"]
		]);
	}

	if (!empty($_FILES['imagen']['name'])) {
		$archivo = $_FILES['imagen']['tmp_name'];
		$nombre = $_FILES['imagen']['name'];
		$destino = "../files/eventos/";
		move_uploaded_file($archivo, $destino . "/" . $nombre);

		$datos = array_merge($datos, [
			"eve_imagen"		=> $nombre,
		]);
	}
	Eventos::Update($datos, $predicado);
	
	echo '<script type="text/javascript">window.location.href="eventos.php"</script>';
	exit();
}

//CREAR USUARIOS
if ($post == 4) {
	$usuario = rand(10000, 99999);

	$datos = [
		"usr_login"		=> $usuario,
		"usr_clave"		=> SHA1($usuario),
		"usr_nombre"	=> $_POST["nombre"],
		"usr_email"		=> $_POST["email"],
		"usr_tipo"		=> $_POST["tipoUsuario"],
		"usr_activo"	=> $_POST["estado"],
		"usr_telefono"	=> $_POST["telefono"]
	];

	if (!empty($_POST["fondo"])) {
		$datos = array_merge($datos, [
			"usr_fondo" => $_POST["fondo"]
		]);
	}

	if (!empty($_FILES['foto']['name'])) {
		$extension = end(explode(".", $_FILES['foto']['name']));
		$foto = uniqid('usr_') . "." . $extension;
		$destino = "../files";
		move_uploaded_file($_FILES['foto']['tmp_name'], $destino . "/" . $foto);

		$datos = array_merge($datos, [
			"usr_foto"		=> $foto,
		]);
	}
	Usuarios::Insert($datos);
	
	echo '<script type="text/javascript">window.location.href="usuarios.php"</script>';
	exit();
}

//EDITAR USUARIOS
if ($post == 5) {
	$predicado	= [ "usr_id"		=> $_POST["idR"] ];

	$datos = [
		"usr_nombre"	=> $_POST["nombre"],
		"usr_email"		=> $_POST["email"],
		"usr_tipo"		=> $_POST["tipoUsuario"],
		"usr_telefono"	=> $_POST["telefono"],
		"usr_activo"	=> $_POST["estado"]
	];

	if (!empty($_POST["fondo"])) {
		$datos = array_merge($datos, [
			"usr_fondo" => $_POST["fondo"]
		]);
	}

	if (!empty($_FILES['foto']['name'])) {
		$extension = end(explode(".", $_FILES['foto']['name']));
		$foto = uniqid('usr_') . "." . $extension;
		$destino = "../files";
		move_uploaded_file($_FILES['foto']['tmp_name'], $destino . "/" . $foto);

		$datos = array_merge($datos, [
			"usr_foto"		=> $foto,
		]);
		
	}

	Usuarios::Update($datos, $predicado);
	
	echo '<script type="text/javascript">window.location.href="usuarios.php"</script>';
	exit();
}

//EDITAR CONFIGURACION
if ($post == 6) {
	$predicadoConfig = [ "conf_id" => ID_EMPRESA ];

	$datos = [
		"conf_fondo_encabezado"				=> $_POST["fondoEncabezado"],
		"conf_fondo_prefooter"				=> $_POST["fondoAntePie"],
		"conf_fondo_footer"					=> $_POST["fondoPie"],
		"conf_fondo_anuncio_especial"		=> $_POST["fondoAnuncioEspecial"],
		"conf_color_boton_menu"				=> $_POST["colorBoton"],
		"conf_color_boton_anuncio"			=> $_POST["colorAnuncio"],
		"conf_titulo_boletin"				=> $_POST["tituloBoletin"],
		"conf_texto_boletin"				=> $_POST["textoBoletin"],
		"conf_activo_clientes"				=> $_POST["mostrarClientes"],
		"conf_activo_productos_destacados"	=> $_POST["mostrarProductos"],
		"conf_boton_boletin"				=> $_POST["botonBoletin"],
		"conf_logo_posicion"				=> $_POST["pLogo"],
		"conf_noti_productos"				=> $_POST["notiProductos"],
		"conf_noti_blog"					=> $_POST["notiBlog"],
		"conf_noti_eventos"					=> $_POST["notiEvento"],
		"conf_noti_eventos_inscripcion"		=> $_POST["notiEventoInscripcion"],
		"conf_opacidad_menu"				=> $_POST["OpacidadMenu"],
		"conf_opacidad_prefooter"			=> $_POST["OpacidadPreFooter"],
		"conf_opacidad_footer"				=> $_POST["OpacidadFooter"]
	];
	Confiuracion::Update($datos, $predicado);

	$consultaConfig = Confiuracion::Select($predicadoConfig);
	$_SESSION["configuracionPagina"] = $consultaConfig->fetch(PDO::FETCH_ASSOC);

	echo '<script type="text/javascript">window.location.href="configuracion.php"</script>';
	exit();
}

//EDITAR PERFIL
if ($post == 7) {
	$predicado = [ "usr_id" => $_POST["usuarioActual"] ];

	$datos = [
		"usr_nombre"	=> $_POST["nombre"],
		"usr_email"		=> $_POST["email"]
	];

	if (!empty($_POST["clave"]) && $_POST["cambiarClave"] == 1) {
		$datos = array_merge($datos, [
			"usr_clave"		=> SHA1($_POST["clave"])
		]);
		
	}
	Usuarios::Update($datos, $predicado);

	$consulta = Usuarios::Select($predicado);
	$datosUsuario = $consulta->fetch(PDO::FETCH_ASSOC);
	$_SESSION["datosUsuario"] = $datosUsuario;
	
	echo '<script type="text/javascript">window.location.href="perfil.php"</script>';
	exit();
}


//========================================================GET========================================================
$get = !empty($_GET["get"]) ? base64_decode($_GET["get"]) : 0;

//ELIMINAR EVENTO
if ($get == 1) {

	$conexion->query("DELETE FROM eventos_inscripcion WHERE epi_id_evento='" . base64_decode($_GET["idE"]) . "'");
	$conexion->query("DELETE FROM eventos WHERE eve_id='" . base64_decode($_GET["idE"]) . "'");

	echo '<script type="text/javascript">window.location.href="eventos.php";</script>';
	exit();
}

//ELIMINAR USUARIOS
if ($get == 2) {
	$conexion->query("DELETE FROM usuarios WHERE usr_id='" . base64_decode($_GET["idu"]) . "'");
	echo '<script type="text/javascript">window.location.href="usuarios.php";</script>';
	exit();
}

//ELIMINAR CONTACTENOS
if ($get == 3) {
	$conexion->query("DELETE FROM f_contacto WHERE fcon_id='" . base64_decode($_GET["idR"]) . "'");
	echo '<script type="text/javascript">window.location.href="contacto.php";</script>';
	exit();
}

//APROBAR EVENTOS
if ($get == 18) {
	$conexion->query("UPDATE eventos_inscripcion SET epi_estado='2' WHERE epi_id=" . base64_decode($_GET["idR"]) . "");
	if ($_SESSION["configuracionPagina"][16] == 1) {
		$inscripcion = mysqli_fetch_array($conexion->query("SELECT * FROM eventos_inscripcion ei INNER JOIN eventos e ON ei.epi_id_evento=e.eve_id WHERE eve_id='" . base64_decode($_GET["idR"]) . "'"), MYSQLI_BOTH);
	}
	echo '<script type="text/javascript">window.location.href="inscripcion-eventos.php";</script>';
	exit();
}

//DESAPROBAR EVENTOS
if ($get == 19) {
	$conexion->query("UPDATE eventos_inscripcion SET epi_estado='3' WHERE epi_id=" . base64_decode($_GET["idR"]) . "");
	if ($_SESSION["configuracionPagina"][16] == 1) {
		$inscripcion = mysqli_fetch_array($conexion->query("SELECT * FROM eventos_inscripcion ei INNER JOIN eventos e ON ei.epi_id_evento=e.eve_id WHERE eve_id='" . base64_decode($_GET["idR"]) . "'"), MYSQLI_BOTH);
	}
	echo '<script type="text/javascript">window.location.href="inscripcion-eventos.php";</script>';
	exit();
}

//ELIMINAR INSCRIPCION EVENTOS
if ($get == 20) {
	$conexion->query("DELETE FROM inscripcion WHERE ins_id='" . base64_decode($_GET["idR"]) . "'");
	echo '<script type="text/javascript">window.location.href="' . $_SERVER["HTTP_REFERER"] . '";</script>';
	exit();
}

//ELIMINAR VISITAS
if ($get == 21) {
	$conexion->query("DELETE FROM visitas WHERE vis_id='" . base64_decode($_GET["idR"]) . "'");
	echo '<script type="text/javascript">window.location.href="visitas.php";</script>';
	exit();
}