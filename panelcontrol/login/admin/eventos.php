<?php
	include("header.php");
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
							Eventos <small>...</small>
						</h3>
						<ul class="breadcrumb">
							<li>
								<i class="icon-home"></i>
								<a href="index.php">Inicio</a> 
								<i class="icon-angle-right"></i>
							</li>
                            
							<li><a href="#">Eventos</a></li>
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
								<div class="caption"><i class="icon-group"></i>Eventos</div>
							</div>
							<div class="portlet-body">
								<?php if( $_SESSION["datosUsuario"]['usr_tipo'] != TIPO_INVERSOR ) { ?>
									<div class="table-toolbar">
										<div class="btn-group">
											<a href="eventos-info.php?a=<?=base64_encode(1);?>" class="btn green">Agregar <i class="icon-plus"></i></a>
										</div>
										<div class="btn-group pull-right">
										</div>
									</div>
								<?php } ?>
                                <table class="table table-striped table-bordered table-hover" id="sample_2">
									<thead>
										<tr>
											<th>Titulo</th>
                                            <th>Fecha</th>
                                            <th>Cupos</th>
											<th>Precio<br> Entradas</th>
											<?php if( $_SESSION["datosUsuario"]['usr_tipo'] != TIPO_INVERSOR && $_SESSION["datosUsuario"]['usr_super_admin'] == SI ) { ?>
												<th>Presupuesto</th>
												<th>Incentivo</th>
												<th>Total<br> Invertido (%)</th>
												<th>Incentivo<br> por Inversión</th>
												<th>Total (Inversores / Promotor)</th>
												<th>Disponible<br> a Inversión (%)</th>
											<?php } ?>
                                            <th>Estado</th>
                                            <th>Acciones</th>
										</tr>
									</thead>
									<tbody>
										<?php
											Eventos_Inversiones::foreignKey(Eventos_Inversiones::LEFT, [
												"inver_id_evento" => 'eve_id'
											]);

											$filaEventos = Eventos::SelectJoin(
												["eve_activo" => ACTIVO],
												"eve.*, SUM(inver_inversion) AS inversion, ROUND(IFNULL((SUM(inver_inversion) * 100) / eve_costo_inversores, 0)) AS porcentaje",
												[Eventos_Inversiones::class],
												"",
												"eve_id",
												"",
												""
											);
											foreach ($filaEventos as $resultado){

												switch ($resultado["eve_activo"]) {
													case ACTIVO;
														$activo = '<span class="label label-success">ACTIVO</span>';
														break;
													case INACTIVO;
														$activo = '<span class="label label-grey">INACTIVO</span>';
														break;
												}

												$disponible = $resultado["eve_costo_inversores"] - $resultado["inversion"];
												$porcentajeDisponible = 100 - $resultado["porcentaje"];
												$incentivoInver = $resultado["inversion"] * 0.2;
												$total = $resultado["inversion"] + $incentivoInver;
												$promotor = $incentivoInver * 0.03;
												$inversores = $total - $promotor;
										?>
										<tr class="odd gradeX">
											<td><?=$resultado["eve_nombre"];?></td>
                                            <td><?=$resultado["eve_fecha"];?></td>
                                            <td><?=$resultado["eve_cupos"]?></td>
											<td style="text-align: right;">
												<?= !empty($resultado["eve_precio"]) ? number_format($resultado["eve_precio"],0,".",".") : "0"?> €
											</td>
											<?php if( $_SESSION["datosUsuario"]['usr_tipo'] != TIPO_INVERSOR && $_SESSION["datosUsuario"]['usr_super_admin'] == SI ) { ?>
												<td style="text-align: right;">
													<?= !empty($resultado["eve_costo_anual"]) ? number_format($resultado["eve_costo_anual"],0,".",".") : "0"?> €
												</td>
												<td style="text-align: right;">
													<?= !empty($resultado["eve_costo_inversores"]) ? number_format($resultado["eve_costo_inversores"],0,".",".") : "0"?> €
												</td>
												<td style="text-align: right;">
													<?= !empty($resultado["inversion"]) ? number_format($resultado["inversion"],0,".",".").' € ('.$resultado["porcentaje"].'%)' : "0 €"?>
												</td>
												<td style="text-align: right;">
													<?= !empty($incentivoInver) ? number_format($incentivoInver,0,".",".") : "0"?> €
												</td>
												<td style="text-align: right;">
													<?= !empty($total) ? number_format($total,0,".",".").' € ('.number_format($inversores,0,".",".").' € / '.number_format($promotor,0,".",".").' €)' : "0 €"?>
												</td>
												<td style="text-align: right;">
													<?= !empty($disponible) ? number_format($disponible,0,".",".").' € ('.$porcentajeDisponible.'%)' : "0 € (0%)"?>
												</td>
											<?php } ?>
                                            <td><?=$activo?></td>
                                            <td>
												<?php if( $_SESSION["datosUsuario"]['usr_tipo'] != TIPO_INVERSOR ) { ?>
													<a href="eventos-info.php?a=<?=base64_encode(2);?>&id=<?=base64_encode($resultado["eve_id"]);?>"><img src="../../files/iconos/edit.png"></a>
													<a href="sql.php?idE=<?=base64_encode($resultado["eve_id"]);?>&get=<?=base64_encode(1);?>" onClick="if(!confirm('Desea eliminar este registro?')){return false;}"><img src="../../files/iconos/deletle.png"></a>
												<?php } ?>
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