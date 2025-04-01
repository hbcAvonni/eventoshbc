<?php 
session_start();
require_once("../../modelo/constantes.php");
if($_SESSION["id"]=="") {
	header("Location:../../controlador/salir.php");
} else {
	include("../../modelo/conexion.php");
	if($_SESSION["datosUsuario"]["usr_tipo"] != TIPO_DEV && $_SESSION["datosUsuario"]["usr_tipo"] != TIPO_ADMIN) {
?>
		<span style='font-family:Arial; color:red;'>Su usuario no puede ingresar a esta parte de la plataforma.</samp>
		<script type="text/javascript">
		function sacar(){
			window.location.href="../inversores/";
		} 
		setInterval('sacar()', 1500);
		</script>
<?php	
		exit();		
	}
	//SABER SI ESTA BLOQUEADO
	if($_SESSION["datosUsuario"]["usr_activo"] == INACTIVO) {
?>		
		<span style='font-family:Arial; color:red;'>Su usuario ha sido bloqueado. Por tanto no tiene permisos para acceder a la plataforma.</samp>
        <script type="text/javascript">
		function sacar(){
			window.location.href="../../controlador/salir.php";
		} 
		setInterval('sacar()', 1500);
        </script>
<?php	
		exit();		
	}	
}
?>
