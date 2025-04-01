<?php
	include("header.php");
	require_once ROOT_PATH.'/../class/Usuarios.php';
?>
<!-- BEGIN PAGE LEVEL STYLES -->
<link rel="stylesheet" type="text/css" href="../assets/plugins/select2/select2_metro.css" />
<link rel="stylesheet" href="../assets/plugins/data-tables/DT_bootstrap.css" />
<!-- END PAGE LEVEL STYLES -->



</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->

<body class="page-header-fixed">

	<?php include("encabezado.php"); ?>

	<!-- BEGIN CONTAINER -->
	<div class="page-container row-fluid">

		<?php include("menu.php"); ?>


		<!-- BEGIN PAGE -->
		<div class="page-content">
			<!-- BEGIN SAMPLE PORTLET CONFIGURATION MODAL FORM-->
			<div id="portlet-config" class="modal hide">
				<div class="modal-header">
					<button data-dismiss="modal" class="close" type="button"></button>
					<h3>portlet Settings</h3>
				</div>
				<div class="modal-body">
					<p>Here will be a configuration form</p>
				</div>
			</div>
			<!-- END SAMPLE PORTLET CONFIGURATION MODAL FORM-->
			<!-- BEGIN PAGE CONTAINER-->
			<div class="container-fluid">
				<!-- BEGIN PAGE HEADER-->
				<div class="row-fluid">
					<div class="span12">
						<!-- BEGIN PAGE TITLE & BREADCRUMB-->
						<h3 class="page-title">
						Usuarios <small>...</small>
						</h3>
						<ul class="breadcrumb">
							<li>
								<i class="icon-home"></i>
								<a href="index.php">Inicio</a>
								<i class="icon-angle-right"></i>
							</li>

							<li><a href="#">Usuarios</a></li>
						</ul>
						<!-- END PAGE TITLE & BREADCRUMB-->
					</div>
				</div>
				<!-- END PAGE HEADER-->
				<!-- BEGIN PAGE CONTENT-->
				<div class="row-fluid">
					<div class="span12">
						<!-- BEGIN EXAMPLE TABLE PORTLET-->
						<div class="portlet box purple">
							<div class="portlet-title">
								<div class="caption"><i class="icon-group"></i>Usuarios</div>
							</div>
							<div class="portlet-body">
								<div class="table-toolbar">
									<div class="btn-group">
										<a href="usuarios-info.php?a=<?=base64_encode(1);?>" class="btn green">Agregar <i class="icon-plus"></i></a>
									</div>
									<div class="btn-group pull-right">
									</div>
								</div>
								<?php
									$filtro = $_SESSION["datosUsuario"]["usr_tipo"] != TIPO_DEV ? "AND usr_tipo!=".TIPO_DEV : "";
									$consulta = $conexion->query("SELECT * FROM usuarios u 
									INNER JOIN rol r ON u.usr_tipo=r.rol_id
									WHERE usr_id!='".$_SESSION["id"]."' $filtro");
								?>
								<table class="table table-striped table-bordered table-hover" id="sample_2">
									<thead>
										<tr>
											<th>Foto</th>
											<th>Usuario</th>
											<th>Nombre</th>
											<th>Email</th>
											<th>Tipo</th>
											<th>Activo</th>
											<th>Teléfonos</th>
											<th>Acciones</th>
										</tr>
									</thead>
									<tbody>
										<?php
										while ($resultado = mysqli_fetch_array($consulta, MYSQLI_BOTH)) {
											$nomTipo = $resultado["rol_nombre"];
											$tipeLebel = "success";
											if ($resultado["usr_tipo"] == TIPO_INVERSOR) {
												$tipeLebel = "grey";
												if ($resultado["usr_fondo"] == SI) {
													$nomTipo = "Fondo ".$nomTipo;
													$tipeLebel = "warning";
												}
											}
											$tipo = '<span class="label label-' . $tipeLebel . '">' . $nomTipo . '</span>';

											switch ($resultado["usr_activo"]) {
												case ACTIVO;
													$activo = '<span class="label label-success">ACTIVO</span>';
													break;
												case INACTIVO;
													$activo = '<span class="label label-grey">INACTIVO</span>';
													break;
											}

											$fileFotoU = !empty($resultado["usr_foto"]) && file_exists("../../files/".$resultado["usr_foto"]) ? "../../files/".$resultado["usr_foto"] : "../../files/logo/".$_SESSION["informacionPagina"]["info_logo"];
										?>
											<tr class="odd gradeX">
												<td><img src="<?= $fileFotoU; ?>" width="100"> </td>
												<td><?= $resultado["usr_login"]; ?></td>
												<td><?= $resultado["usr_nombre"]; ?></td>
												<td><?= $resultado["usr_email"]; ?></td>
												<td><?= $tipo; ?></td>
												<td><?= $activo; ?></td>
												<td><?= $resultado["usr_telefono"]; ?></td>
												<td>
													<?php if ($_SESSION["datosUsuario"]["usr_tipo"] == TIPO_DEV) { ?>
														<a href="auto-login.php?user=<?= base64_encode($resultado['usr_id']); ?>"><img src="../../files/iconos/viewuser.png" title="Auto Login"></a>
													<?php } ?>

													<a href="usuarios-info.php?a=<?=base64_encode(2);?>&idR=<?= base64_encode($resultado["usr_id"]); ?>"><img src="../../files/iconos/edit.png" title="Editar"></a>
													<a href="sql.php?get=<?=base64_encode(2);?>&idu=<?= base64_encode($resultado["usr_id"]); ?>"><img src="../../files/iconos/deletle.png" title="Eliminar"></a>
												</td>
											</tr>
										<?php } ?>

									</tbody>
								</table>
							</div>
						</div>
						<!-- END EXAMPLE TABLE PORTLET-->
					</div>
				</div>
				<!-- END PAGE CONTENT-->
			</div>
			<!-- END PAGE CONTAINER-->
		</div>
		<!-- END PAGE -->
	</div>
	<!-- END CONTAINER -->

	<?php include("pie.php"); ?>

	<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
	<!-- BEGIN CORE PLUGINS -->
	<script src="../assets/plugins/jquery-1.10.1.min.js" type="text/javascript"></script>
	<script src="../assets/plugins/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>

	<!-- IMPORTANT! Load jquery-ui-1.10.1.custom.min.js before bootstrap.min.js to fix bootstrap tooltip conflict with jquery ui tooltip -->
	<script src="../assets/plugins/jquery-ui/jquery-ui-1.10.1.custom.min.js" type="text/javascript"></script>
	<script src="../assets/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script src="../assets/plugins/bootstrap-hover-dropdown/twitter-bootstrap-hover-dropdown.min.js" type="text/javascript"></script>
	<!--[if lt IE 9]>
	<script src="assets/plugins/excanvas.min.js"></script>
	<script src="assets/plugins/respond.min.js"></script>  
	<![endif]-->

	<script src="../assets/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
	<script src="../assets/plugins/jquery.blockui.min.js" type="text/javascript"></script>
	<script src="../assets/plugins/jquery.cookie.min.js" type="text/javascript"></script>
	<script src="../assets/plugins/uniform/jquery.uniform.min.js" type="text/javascript"></script>
	<!-- END CORE PLUGINS -->

	<!-- BEGIN PAGE LEVEL PLUGINS -->
	<script type="text/javascript" src="../assets/plugins/select2/select2.min.js"></script>
	<script type="text/javascript" src="../assets/plugins/data-tables/jquery.dataTables.js"></script>
	<script type="text/javascript" src="../assets/plugins/data-tables/DT_bootstrap.js"></script>
	<!-- END PAGE LEVEL PLUGINS -->

	<!-- BEGIN PAGE LEVEL SCRIPTS -->
	<script src="../assets/scripts/app.js"></script>
	<script src="../assets/scripts/table-managed.js"></script>
	<script>
		jQuery(document).ready(function() {
			App.init();
			TableManaged.init();
		});
	</script>
</body>
<!-- END BODY -->

</html>