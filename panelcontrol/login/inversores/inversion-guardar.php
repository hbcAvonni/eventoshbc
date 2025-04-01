<?php
include("session.php");
include(ROOT_PATH."/informacion.php");
require_once(ROOT_PATH."/../class/Eventos_Inversiones.php");

$datos = [
    "inver_id_evento"	=> $_POST["eve_id"],
    "inver_id_inversor"	=> $_SESSION["id"],
    "inver_inversion"	=> $_POST["monto"],
    "inver_tipo"		=> $_POST["tInver"]
];

if( $_SESSION["datosUsuario"]['usr_fondo'] == SI ) {
    $datos = array_merge($datos, [
        "inver_direccion"	=> $_POST["address"],
        "inver_ciudad"	    => $_POST["city"],
        "inver_pais"	    => $_POST["country"]
    ]);
}

Eventos_Inversiones::Insert($datos);

echo '<script type="text/javascript">window.location.href="index.php"</script>';
exit();