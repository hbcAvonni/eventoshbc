<?php
	include("header.php");
	require_once ROOT_PATH.'/../class/Usuarios.php';
	require_once ROOT_PATH.'/../class/Eventos.php';
    require_once(ROOT_PATH."/../class/Eventos_Inversiones.php");
?>
	<!-- BEGIN PAGE LEVEL STYLES -->
	<link rel="stylesheet" type="text/css" href="../assets/plugins/select2/select2_metro.css" />
	<link rel="stylesheet" href="../assets/plugins/data-tables/DT_bootstrap.css" />
	<!-- END PAGE LEVEL STYLES -->
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<body class="page-header-fixed">

	<?php include("encabezado.php");?>
    
	<!-- BEGIN CONTAINER -->
	<div class="page-container row-fluid">
    
		<?php include("menu.php");?>
        
        
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
						Inversiones <small>...</small>
						</h3>
						<ul class="breadcrumb">
							<li>
								<i class="icon-home"></i>
								<a href="index.php">Inicio</a> 
								<i class="icon-angle-right"></i>
							</li>
                            
							<li><a href="#">Inversiones</a></li>
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
								<div class="caption"><i class="icon-group"></i>Inversiones</div>
							</div>
							<div class="portlet-body">
                                <table class="table table-striped table-bordered table-hover" id="sample_2">
									<thead>
										<tr>
											<th>Inversor</th>
											<th>Evento</th>
											<th>Total<br> Invertido (%)</th>
											<th>Incentivo<br> por Inversión</th>
											<th>Total (Inversores / Promotor)</th>
										</tr>
									</thead>
									<tbody>
										<?php
											Eventos_Inversiones::foreignKey(Eventos_Inversiones::LEFT, [
												"inver_id_evento" => 'eve_id'
											]);
											Usuarios::foreignKey(Usuarios::INNER, [
												"usr_id" => 'inver_id_inversor'
											]);

											$filaEventos = Eventos::SelectJoin(
												["eve_activo" => ACTIVO],
												"eve.*, usr_nombre, inver_inversion, ROUND(IFNULL((inver_inversion * 100) / eve_costo_inversores, 0)) AS porcentaje",
												[
													Eventos_Inversiones::class,
													Usuarios::class
												],
												"",
												"",
												"",
												"eve_id ASC, porcentaje DESC"
											);
											foreach ($filaEventos as $resultado){

												$disponible = $resultado["eve_costo_inversores"] - $resultado["inver_inversion"];
												$porcentajeDisponible = 100 - $resultado["porcentaje"];
												$incentivoInver = $resultado["inver_inversion"] * 0.2;
												$total = $resultado["inver_inversion"] + $incentivoInver;
												$promotor = $incentivoInver * 0.03;
												$inversores = $total - $promotor;
										?>
										<tr class="odd gradeX">
											<td><?=$resultado["usr_nombre"];?></td>
											<td><?=$resultado["eve_nombre"];?></td>
											<td style="text-align: right;">
												<?= !empty($resultado["inver_inversion"]) ? number_format($resultado["inver_inversion"],0,".",".").' € ('.$resultado["porcentaje"].'%)' : "0 €"?>
											</td>
											<td style="text-align: right;">
												<?= !empty($incentivoInver) ? number_format($incentivoInver,0,".",".") : "0"?> €
											</td>
											<td style="text-align: right;">
												<?= !empty($total) ? number_format($total,0,".",".").' € ('.number_format($inversores,0,".",".").' € / '.number_format($promotor,0,".",".").' €)' : "0 €"?>
											</td>
										</tr>
                                        <?php }?>
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
	
	<?php include("pie.php");?>
    
	<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
	<!-- BEGIN CORE PLUGINS -->   <script src="../assets/plugins/jquery-1.10.1.min.js" type="text/javascript"></script>
	<script src="../assets/plugins/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>
    
	<!-- IMPORTANT! Load jquery-ui-1.10.1.custom.min.js before bootstrap.min.js to fix bootstrap tooltip conflict with jquery ui tooltip -->
	<script src="../assets/plugins/jquery-ui/jquery-ui-1.10.1.custom.min.js" type="text/javascript"></script>      
	<script src="../assets/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script src="../assets/plugins/bootstrap-hover-dropdown/twitter-bootstrap-hover-dropdown.min.js" type="text/javascript" ></script>
	<!--[if lt IE 9]>
	<script src="assets/plugins/excanvas.min.js"></script>
	<script src="assets/plugins/respond.min.js"></script>  
	<![endif]-->   
    
	<script src="../assets/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
	<script src="../assets/plugins/jquery.blockui.min.js" type="text/javascript"></script>  
	<script src="../assets/plugins/jquery.cookie.min.js" type="text/javascript"></script>
	<script src="../assets/plugins/uniform/jquery.uniform.min.js" type="text/javascript" ></script>
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