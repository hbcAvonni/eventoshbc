<?php
if(empty($_SESSION["id"])){
	$usuarioActivo = $_SERVER['REMOTE_ADDR'];
}else{
	$usuarioActivo = $_SESSION["id"];
}
?>
<?php
$consultaVisita = $conexion->query("SELECT * FROM visitas WHERE vis_usuario='".$usuarioActivo."'");
$numVisita = mysqli_num_rows($consultaVisita);
$datoVisita = mysqli_fetch_array($consultaVisita, MYSQLI_BOTH);
if($numVisita>0){
	$suma = $datoVisita[4]+1;
	$conexion->query("UPDATE visitas SET vis_cantidad='".$suma."' WHERE vis_usuario='".$usuarioActivo."' AND date(vis_fecha)='".date("Y-m-d")."'");
}else{
	$conexion->query("INSERT INTO visitas(vis_fecha, vis_usuario, vis_referencia, vis_cantidad, vis_url_pagina)VALUES(now(),'".$usuarioActivo."', '".$_SERVER['HTTP_REFERER']."',1,'".$_SERVER['PHP_SELF']."?".$_SERVER['QUERY_STRING']."')");
}
?>