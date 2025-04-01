<?php include("header.php"); ?>
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
<link href="../assets/plugins/bootstrap-modal/css/bootstrap-modal.css" rel="stylesheet" type="text/css" />
<link href="../assets/plugins/bootstrap-switch/static/stylesheets/bootstrap-switch-metro.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="../assets/plugins/jquery-tags-input/jquery.tagsinput.css" />
<!-- END PAGE LEVEL STYLES -->

<?php include("codigo-editor.php"); ?>

</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->

<body class="page-header-fixed">
	<script>
		/*====TAGS INPUT====*/
	</script>
	<?php include("encabezado.php"); ?>

	<!-- BEGIN CONTAINER -->
	<div class="page-container row-fluid">

		<?php include("menu.php"); ?>
		<!-- BEGIN PAGE -->
		<div class="page-content">

			<?php include("ayuda-modal.php"); ?>

			<!-- BEGIN PAGE CONTAINER-->
			<div class="container-fluid">
				<!-- BEGIN PAGE HEADER-->
				<div class="row-fluid">
					<div class="span12">
						<h3 class="page-title">
							Informaci&oacute;n
							<small>...</small>
						</h3>
						<ul class="breadcrumb">
							<li>
								<i class="icon-home"></i>
								<a href="index.php">Incio</a>
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
									<input type="hidden" name="id" value="1">
									<div class="control-group">
										<label class="control-label">Nombre de la empresa</label>
										<div class="controls">
											<input type="text" class="span4" name="nomEmpresa" value="<?= $_SESSION["informacionPagina"]["info_nombre_empresa"]; ?>" required />
										</div>
									</div>

									<div class="control-group">
										<label class="control-label">Direcci&oacute;n Pagina Web</label>
										<div class="controls">
											<input type="text" class="span4" name="pagina" value="<?= $_SESSION["informacionPagina"]["info_pagina_web"]; ?>" required />
											<span><a href="#portlet-config2" data-toggle="modal"><img src="../../files/iconos/1440964868_live-help.png"></a></span>
										</div>
									</div>

									<div class="control-group">
										<label class="control-label">Email principal</label>
										<div class="controls">
											<input type="text" class="span4" name="emailp" value="<?= $_SESSION["informacionPagina"]["info_email_principal"]; ?>" required />
										</div>
									</div>


									<div class="control-group">
										<label class="control-label">Telefono principal</label>
										<div class="controls">
											<input type="text" class="span2" name="telp" value="<?= $_SESSION["informacionPagina"]["info_telefono_principal"]; ?>" required />
										</div>
									</div>

									<div class="control-group">
										<label class="control-label">Direcci&oacute;n principal</label>
										<div class="controls">
											<input type="text" class="span3" name="dir" value="<?= $_SESSION["informacionPagina"]['info_direccion']; ?>" required />
										</div>
									</div>

									<div class="control-group">
										<label class="control-label">Mapa del Lugar</label>
										<div class="controls">
											<input type="text" class="span12 m-wrap" name="mapa" value="<?= $_SESSION["informacionPagina"]['info_mapa']; ?>" /><br>
											<span style="color:#F00;">Inserte solo la URL. Esta URL la encuentra en <a href="http://maps.google.com" target="_blank">maps.google.com</a>.</span><br><br>
											<img src="../../files/imagenes-generales/mapagoogle.png">
										</div>
									</div>

									<div class="control-group">
										<label class="control-label">Emails</label>
										<div class="controls">
											<input id="tags_1" type="text" name="emails" class="tags span6" value="<?= $_SESSION["informacionPagina"]["info_emails"]; ?>" />
										</div>
									</div>

									<div class="control-group">
										<label class="control-label">Telefonos</label>
										<div class="controls">
											<input id="tags_2" type="text" name="telefonos" class="tags span6" value="<?= $_SESSION["informacionPagina"]["info_telefonos"]; ?>" />
										</div>
									</div>



									<div class="control-group">
										<label class="control-label">Imagen<br>
											Medidas:(100 x 90) - Peso: (2 MB M&aacute;ximo)</label>
										<div class="controls">
											<div class="fileupload fileupload-new" data-provides="fileupload">
												<div class="fileupload-new thumbnail" style="width: 200px; height: 150px;">
													<?php if (!empty($_SESSION["informacionPagina"]["info_logo"])) { ?>
														<img src="../../files/logo/<?= $_SESSION["informacionPagina"]["info_logo"] ?>" alt="" />
													<?php } else { ?>
														<img src="http://www.placehold.it/200x150/EFEFEF/AAAAAA&amp;text=Ninguna+imagen" alt="" />
													<?php } ?>
												</div>
												<div class="fileupload-preview fileupload-exists thumbnail" style="max-width: 200px; max-height: 150px; line-height: 20px;"></div>
												<div>
													<span class="btn btn-file"><span class="fileupload-new">Select image</span>
														<span class="fileupload-exists">Change</span>
														<input type="file" class="default" name="logo" /></span>
													<a href="#" class="btn fileupload-exists" data-dismiss="fileupload">Remove</a>
												</div>
											</div>
										</div>

										<div class="control-group">
											<label class="control-label">Tama&ntilde;o del logo</label>
											<div class="controls">
												Ancho <input type="text" class="span1" name="logoAncho" value="<?= $_SESSION["informacionPagina"]["info_logo_ancho"]; ?>" required />Px
												Alto <input type="text" class="span1" name="logoAlto" value="<?= $_SESSION["informacionPagina"]["info_logo_alto"]; ?>" required />Px
											</div>
										</div>

										<div class="control-group">
											<label class="control-label">T&eacute;rminos y condiciones</label>
											<div class="controls">
												<textarea name="terminos" class="span12"><?= $_SESSION["informacionPagina"]['info_terminos_condiciones']; ?></textarea>
											</div>
										</div>

										<div class="control-group">
											<label class="control-label">Protecci&oacute;n de datos</label>
											<div class="controls">
												<textarea class="span12" name="proteccionDatos" rows="6"><?= $_SESSION["informacionPagina"]['info_proteccion_datos']; ?></textarea>
											</div>
										</div>

										<div class="control-group">
											<label class="control-label">Preguntas frecuentes</label>
											<div class="controls">
												<textarea class="span12" name="preguntas" rows="6"><?= $_SESSION["informacionPagina"]['info_preguntas_frecuentes']; ?></textarea>
											</div>
										</div>
									</div>

									<div class="form-actions">
										<button type="submit" class="btn blue">Guardar</button>
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
	<script src="../assets/plugins/bootstrap-modal/js/bootstrap-modal.js" type="text/javascript"></script>
	<script src="../assets/plugins/bootstrap-modal/js/bootstrap-modalmanager.js" type="text/javascript"></script>
	<script src="../assets/plugins/jquery.pwstrength.bootstrap/src/pwstrength.js" type="text/javascript"></script>
	<script src="../assets/plugins/bootstrap-switch/static/js/bootstrap-switch.js" type="text/javascript"></script>
	<script src="../assets/plugins/jquery-tags-input/jquery.tagsinput.min.js" type="text/javascript"></script>
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
	</script>
	<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->

</html>