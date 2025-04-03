<?php
	include("header.php");
	require_once ROOT_PATH.'/../class/Usuarios.php';
?>
	<!-- BEGIN PAGE LEVEL STYLES -->
	<link rel="stylesheet" type="text/css" href="../assets/plugins/bootstrap-fileupload/bootstrap-fileupload.css" />
	<link rel="stylesheet" type="text/css" href="../assets/plugins/gritter/css/jquery.gritter.css" />
	<link rel="stylesheet" type="text/css" href="../assets/plugins/chosen-bootstrap/chosen/chosen.css" />
	<link rel="stylesheet" type="text/css" href="../assets/plugins/select2/select2_metro.css" />
	<link rel="stylesheet" type="text/css" href="../assets/plugins/clockface/css/clockface.css" />
	<link rel="stylesheet" type="text/css" href="../assets/plugins/bootstrap-wysihtml5/bootstrap-wysihtml5.css" />
	<link rel="stylesheet" type="text/css" href="../assets/plugins/bootstrap-datepicker/css/datepicker.css" />
	<link rel="stylesheet" type="text/css" href="../assets/plugins/bootstrap-timepicker/compiled/timepicker.css" />
	<link rel="stylesheet" type="text/css" href="../assets/plugins/bootstrap-colorpicker/css/colorpicker.css" />
	<link rel="stylesheet" type="text/css" href="../assets/plugins/bootstrap-toggle-buttons/static/stylesheets/bootstrap-toggle-buttons.css" />
	<link rel="stylesheet" type="text/css" href="../assets/plugins/bootstrap-daterangepicker/daterangepicker.css" />
	<link rel="stylesheet" type="text/css" href="../assets/plugins/bootstrap-datetimepicker/css/datetimepicker.css" />
	<link rel="stylesheet" type="text/css" href="../assets/plugins/jquery-multi-select/css/multi-select-metro.css" />
	<link href="../assets/plugins/bootstrap-modal/css/bootstrap-modal.css" rel="stylesheet" type="text/css"/>
	<link href="../assets/plugins/bootstrap-switch/static/stylesheets/bootstrap-switch-metro.css" rel="stylesheet" type="text/css"/>
	<link rel="stylesheet" type="text/css" href="../assets/plugins/jquery-tags-input/jquery.tagsinput.css" />
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
						<h3 class="page-title">
							Usuarios
						</h3>
						<ul class="breadcrumb">
							<li>
								<i class="icon-home"></i>
								<a href="index.php">Incio</a> 
								<span class="icon-angle-right"></span>
							</li>
							<li>
								<a href="usuarios.php">Usuarios</a>
								<span class="icon-angle-right"></span>
							</li>
							<li><a href="#">Informaci&oacute;n</a></li>
						</ul>
					</div>
				</div>
				<!-- END PAGE HEADER-->
				<!-- BEGIN PAGE CONTENT-->
				<div class="row-fluid">
					<div class="span12">
						<!-- BEGIN SAMPLE FORM PORTLET-->   
						<div class="portlet box blue">
							<div class="portlet-title">
								<div class="caption"><i class="icon-info"></i>Informaci&oacute;n</div>
							</div>
							<div class="portlet-body form">
								<!-- BEGIN FORM-->
                                
								<form action="sql.php" class="form-horizontal" method="post" enctype="multipart/form-data">
                                <?php
								if(base64_decode($_GET["a"]) == 1)
									echo '<input type="hidden" name="id" value="4">';
								elseif(base64_decode($_GET["a"]) == 2){
									echo '<input type="hidden" name="id" value="5">';
									echo '<input type="hidden" name="idR" value="'.base64_decode($_GET["idR"]).'">';

									$predicado = [ "usr_id" => base64_decode($_GET["idR"]) ];
									$consulta = Usuarios::Select($predicado);
									$resultado = $consulta->fetch(PDO::FETCH_ASSOC);
								}
								?>
                                
                                    
                                    <div class="control-group">
										<label class="control-label">Nombre</label>
										<div class="controls">
											<input type="text" class="span4 m-wrap" name="nombre" value="<?=!empty($resultado["usr_nombre"]) ? $resultado["usr_nombre"] : "";?>" style="text-transform:uppercase;" />
										</div>
									</div>
                                    <div class="control-group">
									  <label class="control-label">Email</label>
										<div class="controls">
											<input type="email" class="span4 m-wrap" name="email" value="<?=!empty($resultado["usr_email"]) ? $resultado["usr_email"] : "";?>"  style="text-transform:lowercase;" oninput="validarEmail(this)"/>
											<span id="email_error" style="color: red;"></span>
										</div>
									</div>

									<div class="control-group">
										<label class="control-label">Teléfonos</label>
										<div class="controls">
											<input type="text" class="span4 m-wrap" name="telefono" value="<?=!empty($resultado["usr_telefono"]) ? $resultado["usr_telefono"] : "";?>" />
										</div>
									</div>

									<div class="control-group">
										<label class="control-label">Tipo Usuario</label>
										<div class="controls">
											<select data-placeholder="Your Favorite Football Team" class="chosen span4" tabindex="-1" name="tipoUsuario" id="tipoUsuario" onchange="mostrarFondo(this)">
												<option value="">--Selecciones Tipo--</option>
												<?php
													$filtro = $_SESSION["datosUsuario"]["usr_tipo"] != TIPO_DEV ? "WHERE rol_id != ".TIPO_DEV : "";
													$consultaR = $conexion->query("SELECT * FROM rol $filtro");
													while($resultadoR = mysqli_fetch_array($consultaR, MYSQLI_BOTH)){
												?>
												<option value="<?=$resultadoR["rol_id"];?>" <?=!empty($resultado["usr_tipo"]) && $resultadoR["rol_id"] == $resultado["usr_tipo"] ? "selected" : "";?>><?=$resultadoR["rol_nombre"];?></option>
												<?php }?>
											</select>
										</div>
									</div>
                                    
                                    <div class="control-group" id="divFondo" style="display: none;">
										<label class="control-label">Es Fondo Inversión</label>
										<div class="controls">
                                            <select data-placeholder="Your Favorite Football Team" class="chosen span4" tabindex="-1" name="fondo" id="fondo" style="width: 100%;">
												<option value="">--Selecciones estado--</option>
												<option value="1" <?=!empty($resultado["usr_fondo"]) && $resultado["usr_fondo"] == SI ? "selected" : "";?>>Si</option>
												<option value="2" <?=!empty($resultado["usr_fondo"]) && $resultado["usr_fondo"] == NO ? "selected" : "";?>>No</option>
											</select>
										</div>
									</div>
                                    
                                    <div class="control-group">
										<label class="control-label">Estado</label>
										<div class="controls">
                                            <select data-placeholder="Your Favorite Football Team" class="chosen span4" tabindex="-1" name="estado">
												<option value="">--Selecciones estado--</option>
												<option value="1" <?=!empty($resultado["usr_activo"]) && $resultado["usr_activo"] == ACTIVO ? "selected" : "";?>>Activo</option>
												<option value="2" <?=!empty($resultado["usr_activo"]) && $resultado["usr_activo"] == INACTIVO ? "selected" : "";?>>Inactivo</option>
											</select>
										</div>
									</div>

									<div class="control-group">
										<label class="control-label">Foto<br>
                                        Medidas:(270 x 360) - Peso: (1 MB M&aacute;ximo)</label>
										<div class="controls">
											<div class="fileupload fileupload-new" data-provides="fileupload">
												<div class="fileupload-new thumbnail" style="width: 200px; height: 150px;">
                                                <?php if(!empty($resultado["usr_foto"])){?>
                                                <img src="../../files/<?=$resultado["usr_foto"]?>" alt="" />
												<?php }else{?>
													<img src="http://www.placehold.it/200x150/EFEFEF/AAAAAA&amp;text=Ninguna+imagen" alt="" />
												<?php }?>
                                                </div>
												<div class="fileupload-preview fileupload-exists thumbnail" style="max-width: 200px; max-height: 150px; line-height: 20px;"></div>
												<div>
													<span class="btn btn-file"><span class="fileupload-new">Select image</span>
													<span class="fileupload-exists">Change</span>
													<input type="file" class="default" name="foto" /></span>
													<a href="#" class="btn fileupload-exists" data-dismiss="fileupload">Remove</a>
												</div>
											</div>
											
											
										</div>
									</div>
									
									<div class="form-actions">
										<button type="submit" id="submit-btn" class="btn blue">Guardar</button>
										<button type="button" class="btn">Cancelar</button>     
									</div>
								</form>
								<!-- END FORM-->  
							</div>
						</div>
						<!-- END SAMPLE FORM PORTLET-->
					</div>
				</div>
				       
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
	<script type="text/javascript" src="../assets/plugins/ckeditor/ckeditor.js"></script>  
	<script type="text/javascript" src="../assets/plugins/bootstrap-fileupload/bootstrap-fileupload.js"></script>
	<script type="text/javascript" src="../assets/plugins/chosen-bootstrap/chosen/chosen.jquery.min.js"></script>
	<script type="text/javascript" src="../assets/plugins/select2/select2.min.js"></script>
	<script type="text/javascript" src="../assets/plugins/bootstrap-wysihtml5/wysihtml5-0.3.0.js"></script> 
	<script type="text/javascript" src="../assets/plugins/bootstrap-wysihtml5/bootstrap-wysihtml5.js"></script>
	<script type="text/javascript" src="../assets/plugins/bootstrap-toggle-buttons/static/js/jquery.toggle.buttons.js"></script>
	<script type="text/javascript" src="../assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js"></script>
	<script type="text/javascript" src="../assets/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js"></script>
	<script type="text/javascript" src="../assets/plugins/clockface/js/clockface.js"></script>
	<script type="text/javascript" src="../assets/plugins/bootstrap-daterangepicker/date.js"></script>
	<script type="text/javascript" src="../assets/plugins/bootstrap-daterangepicker/daterangepicker.js"></script> 
	<script type="text/javascript" src="../assets/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.js"></script>  
	<script type="text/javascript" src="../assets/plugins/bootstrap-timepicker/js/bootstrap-timepicker.js"></script>
	<script type="text/javascript" src="../assets/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js"></script>   
	<script type="text/javascript" src="../assets/plugins/jquery.input-ip-address-control-1.0.min.js"></script>
	<script type="text/javascript" src="../assets/plugins/jquery-multi-select/js/jquery.multi-select.js"></script>   
	<script src="../assets/plugins/bootstrap-modal/js/bootstrap-modal.js" type="text/javascript" ></script>
	<script src="../assets/plugins/bootstrap-modal/js/bootstrap-modalmanager.js" type="text/javascript" ></script> 
	<script src="../assets/plugins/jquery.pwstrength.bootstrap/src/pwstrength.js" type="text/javascript" ></script>
	<script src="../assets/plugins/bootstrap-switch/static/js/bootstrap-switch.js" type="text/javascript" ></script>
	<script src="../assets/plugins/jquery-tags-input/jquery.tagsinput.min.js" type="text/javascript" ></script>
	<!-- END PAGE LEVEL PLUGINS -->
	<!-- BEGIN PAGE LEVEL SCRIPTS -->
	<script src="../assets/scripts/app.js"></script>
	<script src="../assets/scripts/form-components.js"></script>     
	<!-- END PAGE LEVEL SCRIPTS -->
	<script>
		jQuery(document).ready(function() {       
		   // initiate layout and plugins
		   App.init();
		   FormComponents.init();
		});
		
		$(document).ready(function () {
			mostrarFondo(document.getElementById("tipoUsuario"));
		});
	</script>
	<!-- END JAVASCRIPTS -->   
</body>
<!-- END BODY -->
</html>