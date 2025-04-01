<?php include("modal-verificacion.php"); ?>
<div class="header">
	<a href="index.php"><h1>DASHBOARD</h1></a>
	<div class="profile">
		<?php $fileFoto = !empty($_SESSION["datosUsuario"]["usr_foto"]) && file_exists("../../files/" . $_SESSION["datosUsuario"]["usr_foto"]) ? "../../files/" . $_SESSION["datosUsuario"]["usr_foto"] : "../../files/logo/" . $_SESSION["informacionPagina"]["info_logo"]; ?>
		<img src="<?= $fileFoto ?>" height="50" width="50" alt="Usuario">
		<h1 class="userName"><?= $_SESSION["datosUsuario"]["usr_nombre"]; ?></h1>
		<span>&#9662;</span>
		<div class="profile-menu">
			<a href="../../controlador/salir.php">Cerrar sesión</a>
		</div>
	</div>
</div>