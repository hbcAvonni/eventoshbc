<?php include("header.php"); ?>
<!-- BEGIN PAGE LEVEL PLUGIN STYLES -->
<link href="../assets/plugins/gritter/css/jquery.gritter.css" rel="stylesheet" type="text/css" />
<link href="../assets/plugins/bootstrap-daterangepicker/daterangepicker.css" rel="stylesheet" type="text/css" />
<link href="../assets/plugins/fullcalendar/fullcalendar/fullcalendar.css" rel="stylesheet" type="text/css" />
<link href="../assets/plugins/jqvmap/jqvmap/jqvmap.css" rel="stylesheet" type="text/css" media="screen" />
<link href="../assets/plugins/jquery-easy-pie-chart/jquery.easy-pie-chart.css" rel="stylesheet" type="text/css" media="screen" />
<!-- END PAGE LEVEL PLUGIN STYLES -->

<!-- BEGIN PAGE LEVEL STYLES -->
<link href="../assets/css/pages/tasks.css" rel="stylesheet" type="text/css" media="screen" />
<!-- END PAGE LEVEL STYLES -->

</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<body class="page-header-fixed">
	<?php include("encabezado.php"); ?>
	<!-- BEGIN CONTAINER -->
	<div class="page-container">
		<?php include("menu.php"); ?>
		<!-- BEGIN PAGE -->
		<div class="page-content">
			<!-- BEGIN PAGE CONTAINER-->
			<div class="container-fluid">
				<!-- BEGIN PAGE HEADER-->
				<div class="row-fluid">
					<div class="span12">
						<!-- BEGIN PAGE TITLE & BREADCRUMB-->
						<h3 class="page-title">
							Escritorio <small>Inicio</small>
						</h3>
						<ul class="breadcrumb">
							<li>
								<i class="icon-home"></i>
								<a href="index.php">Inicio</a>
							</li>
						</ul>
						<!-- END PAGE TITLE & BREADCRUMB-->
					</div>
				</div>
				<!-- END PAGE HEADER-->
				<div id="dashboard">
					<!-- BEGIN DASHBOARD STATS -->
					<?php
						$inscritos = mysqli_num_rows($conexion->query("SELECT * FROM eventos_inscripcion"));
						$eventos = mysqli_num_rows($conexion->query("SELECT * FROM eventos"));
						$contacto = mysqli_num_rows($conexion->query("SELECT * FROM contactenos"));
					?>
					<div class="row-fluid">

						<div class="span3 responsive" data-tablet="span6  fix-offset" data-desktop="span3">
							<div class="dashboard-stat purple">
								<div class="visual">
									<i class="icon-list-alt"></i>
								</div>
								<div class="details">
									<div class="number"><?= $eventos; ?></div>
									<div class="desc">Módulo de Eventos</div>
								</div>
								<a class="more" href="eventos.php">Ver todo <i class="m-icon-swapright m-icon-white"></i></a>
							</div>
						</div>

						<?php if ($_SESSION["datosUsuario"]["usr_tipo"] != TIPO_INVERSOR) { ?>
						<div class="span3 responsive" data-tablet="span6" data-desktop="span3">
							<div class="dashboard-stat yellow">
								<div class="visual">
									<i class="icon-envelope-alt"></i>
								</div>
								<div class="details">
									<div class="number"><?= $contacto; ?></div>
									<div class="desc">Contáctenos</div>
								</div>
								<a class="more" href="contacto.php">Ver todo <i class="m-icon-swapright m-icon-white"></i></a>
							</div>
						</div>

						<div class="span3 responsive" data-tablet="span6" data-desktop="span3">
							<div class="dashboard-stat blue">
								<div class="visual">
									<i class="icon-edit"></i>
								</div>
								<div class="details">
									<div class="number"><?= $inscritos; ?></div>
									<div class="desc">Suscritos a Eventos</div>
								</div>
								<a class="more" href="inscripcion-eventos.php"> Ver todo <i class="m-icon-swapright m-icon-white"></i>
								</a>
							</div>
						</div>
						<?php } ?>
					</div>
					<!--FILA 3-->
				</div>
			</div>
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
	<script src="../assets/plugins/jqvmap/jqvmap/jquery.vmap.js" type="text/javascript"></script>
	<script src="../assets/plugins/jqvmap/jqvmap/maps/jquery.vmap.russia.js" type="text/javascript"></script>
	<script src="../assets/plugins/jqvmap/jqvmap/maps/jquery.vmap.world.js" type="text/javascript"></script>
	<script src="../assets/plugins/jqvmap/jqvmap/maps/jquery.vmap.europe.js" type="text/javascript"></script>
	<script src="../assets/plugins/jqvmap/jqvmap/maps/jquery.vmap.germany.js" type="text/javascript"></script>
	<script src="../assets/plugins/jqvmap/jqvmap/maps/jquery.vmap.usa.js" type="text/javascript"></script>
	<script src="../assets/plugins/jqvmap/jqvmap/data/jquery.vmap.sampledata.js" type="text/javascript"></script>
	<script src="../assets/plugins/flot/jquery.flot.js" type="text/javascript"></script>
	<script src="../assets/plugins/flot/jquery.flot.resize.js" type="text/javascript"></script>
	<script src="../assets/plugins/jquery.pulsate.min.js" type="text/javascript"></script>
	<script src="../assets/plugins/bootstrap-daterangepicker/date.js" type="text/javascript"></script>
	<script src="../assets/plugins/bootstrap-daterangepicker/daterangepicker.js" type="text/javascript"></script>
	<script src="../assets/plugins/gritter/js/jquery.gritter.js" type="text/javascript"></script>
	<script src="../assets/plugins/fullcalendar/fullcalendar/fullcalendar.min.js" type="text/javascript"></script>
	<script src="../assets/plugins/jquery-easy-pie-chart/jquery.easy-pie-chart.js" type="text/javascript"></script>
	<script src="../assets/plugins/jquery.sparkline.min.js" type="text/javascript"></script>
	<!-- END PAGE LEVEL PLUGINS -->

	<!-- BEGIN PAGE LEVEL SCRIPTS -->
	<script src="../assets/scripts/app.js" type="text/javascript"></script>
	<script src="../assets/scripts/index.js" type="text/javascript"></script>
	<script src="../assets/scripts/tasks.js" type="text/javascript"></script>
	<!-- END PAGE LEVEL SCRIPTS -->

	<script>
		jQuery(document).ready(function() {
			App.init(); // initlayout and core plugins
			Index.init();
			Index.initJQVMAP(); // init index page's custom scripts
			Index.initCalendar(); // init index page's custom scripts
			Index.initCharts(); // init index page's custom scripts
			Index.initChat();
			Index.initMiniCharts();
			Index.initDashboardDaterange();
			Index.initIntro();
			Tasks.initDashboardWidget();
		});
	</script>
	<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->

</html>