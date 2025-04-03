<?php
include("../../modelo/conexion.php");
include("header.php");
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
<script>
	/*====TAGS INPUT====*/
   
</script>
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
							Informaci&oacute;n
							<small>...</small>
						</h3>
						<ul class="breadcrumb">
							<li>
								<i class="icon-home"></i>
								<a href="index.php">Incio</a> 
								<span class="icon-angle-right"></span>
							</li>

							<li><a href="#">Configuraci&oacute;n</a></li>
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
								<div class="caption"><i class="icon-info"></i>Configuraci&oacute;n</div>
							</div>
							<div class="portlet-body form">
								<!-- BEGIN FORM-->
                                
								<form action="sql.php" class="form-horizontal" method="post" enctype="multipart/form-data">
									<input type="hidden" name="id" value="6">
                                    <div class="control-group">
										<label class="control-label">Color Fondo Encabezado/Men&uacute;</label>
										<div class="controls">
											<input type="color" class="span2 m-wrap" name="fondoEncabezado" value="<?=$_SESSION["configuracionPagina"][1];?>"/><br>
                                            <span style="color:#F00;"> Este ser&aacute; el Color principal. Se aplicar&aacute; en varias p&aacute;ginas.</span>
										</div>
									</div>
                                    
                                    <div class="control-group">
										<label class="control-label">Opacidad Men&uacute;</label>
										<div class="controls">
                                            <select class="small" name="OpacidadMenu">
                                            	<?php
													$i=0.1;
													while($i<=1){
														if($_SESSION["configuracionPagina"][17]==$i){
															'<option value="'.$i.'" selected>'.$i.'</option>';
														}
														else 
															echo '<option value="'.$i.'">'.$i.'</option>';
														$i = $i + 0.1;
													}
												?>
											       
											   </select>
                                               <input type="text" class="span1"value="<?=$_SESSION["configuracionPagina"][17];?>"/>
										</div>
									</div>
                                    
                                    <div class="control-group">
										<label class="control-label">Color Boton Men&uacute;</label>
										<div class="controls">
											<input type="color" class="span2 m-wrap" name="colorBoton" value="<?=$_SESSION["configuracionPagina"][5];?>"/>
										</div>
									</div>
                                    
                                    <div class="control-group">
										<label class="control-label">Color Fondo Pre-Footer</label>
										<div class="controls">
											<input type="color" class="span2 m-wrap" name="fondoAntePie" value="<?=$_SESSION["configuracionPagina"][2];?>"/>
										</div>
									</div>
                                    
                                    <div class="control-group">
										<label class="control-label">Opacidad Pre-Footer</label>
										<div class="controls">
                                            <select class="small" name="OpacidadPreFooter">
                                            	<?php
													$i=0.1;
													while($i<=1){
														if($_SESSION["configuracionPagina"][18]==$i)echo '<option value="'.$i.'" selected>'.$i.'</option>';
														else echo '<option value="'.$i.'">'.$i.'</option>';
														$i = $i + 0.1;
													}
												?>
											       
											   </select>
                                               <input type="text" class="span1"value="<?=$_SESSION["configuracionPagina"][18];?>"/>
										</div>
									</div>
                                    
                                    
                                    <div class="control-group">
										<label class="control-label">Color Fondo Footer</label>
										<div class="controls">
											<input type="color" class="span2 m-wrap" name="fondoPie" value="<?=$_SESSION["configuracionPagina"][3];?>"/>
										</div>
									</div>
                                    
                                    <div class="control-group">
										<label class="control-label">Opacidad Footer</label>
										<div class="controls">
                                            <select class="small" name="OpacidadFooter">
                                            	<?php
													$i=0.1;
													while($i<=1){
														if($_SESSION["configuracionPagina"][19]==$i)echo '<option value="'.$i.'" selected>'.$i.'</option>';
														else echo '<option value="'.$i.'">'.$i.'</option>';
														$i = $i + 0.1;
													}
												?>
											       
											   </select>
                                               <input type="text" class="span1"value="<?=$_SESSION["configuracionPagina"][19];?>"/>
										</div>
									</div>
                                    
                                    <div class="control-group">
										<label class="control-label">Color Fondo Anuncio Especial</label>
										<div class="controls">
											<input type="color" class="span2 m-wrap" name="fondoAnuncioEspecial" value="<?=$_SESSION["configuracionPagina"][4];?>"/>
										</div>
									</div>
                                    
                                    <div class="control-group">
										<label class="control-label">Color Boton Anuncio Especial</label>
										<div class="controls">
											<input type="color" class="span2 m-wrap" name="colorAnuncio" value="<?=$_SESSION["configuracionPagina"][6];?>"/>
										</div>
									</div>
                                    
                                    <div class="control-group">
										<label class="control-label">Titulo Bolet&iacute;n (Pie de pagina)</label>
										<div class="controls">
											<input type="text" class="span6 m-wrap" name="tituloBoletin" value="<?=$_SESSION["configuracionPagina"][7];?>"/>
										</div>
									</div>
                                    
                                    <div class="control-group">
										<label class="control-label">Texto Bolet&iacute;n (Pie de pagina)</label>
										<div class="controls">
											<input type="text" class="span6 m-wrap" name="textoBoletin" value="<?=$_SESSION["configuracionPagina"][8];?>"/>
										</div>
									</div>
                                    
                                    <div class="control-group">
										<label class="control-label">Texto Bot&oacute;n Bolet&iacute;n (Pie de pagina)</label>
										<div class="controls">
											<input type="text" class="span3 m-wrap" name="botonBoletin" value="<?=$_SESSION["configuracionPagina"][11];?>"/>
										</div>
									</div>
                                    
                                    <div class="control-group">
										<label class="control-label">Mostrar Clientes en el Inicio</label>
										<div class="controls">
                                            <select class="small m-wrap" name="mostrarClientes" tabindex="1">
											       <option value="1" <?php if($_SESSION["configuracionPagina"][9]==1){echo "selected";}?>>SI</option>
                                                   <option value="0" <?php if($_SESSION["configuracionPagina"][9]==0){echo "selected";}?>>NO</option>
											   </select>
										</div>
									</div>
                                    
                                    <div class="control-group">
										<label class="control-label">Mostrar Productos destacados en el Inicio</label>
										<div class="controls">
                                            <select class="small m-wrap" name="mostrarProductos" tabindex="1">
											       <option value="1" <?php if($_SESSION["configuracionPagina"][10]==1){echo "selected";}?>>SI</option>
                                                   <option value="0" <?php if($_SESSION["configuracionPagina"][10]==0){echo "selected";}?>>NO</option>
											   </select>
										</div>
									</div>
                                    
                                    
                                    
                                    <div class="control-group">
										<label class="control-label">Posici&oacute;n del logo</label>
											<div class="controls">
											   <select class="small m-wrap" name="pLogo" tabindex="1">
											       <option value="1" <?php if($_SESSION["configuracionPagina"][12]==1){echo "selected";}?>>Izquierda</option>
                                                   <option value="2" <?php if($_SESSION["configuracionPagina"][12]==2){echo "selected";}?>>Derecha</option>
                                                   <option value="3" <?php if($_SESSION["configuracionPagina"][12]==3){echo "selected";}?>>No mostrar logo</option>
											   </select>
											</div>
								  </div>
                                  <hr>
                                  <h2>Notificaciones a los Suscritos</h2>
                                  <p style="color:#F00;">Enviarle una notificaci&oacute;n via Email a los suscritos a mi sitio cuando...</p>
                                  
                                  <div class="control-group">
										<label class="control-label">Agregue un nuevo producto</label>
										<div class="controls">
                                            <select class="small m-wrap" name="notiProductos" tabindex="1">
											       <option value="1" <?php if($_SESSION["configuracionPagina"][13]==1){echo "selected";}?>>SI</option>
                                                   <option value="0" <?php if($_SESSION["configuracionPagina"][13]==0){echo "selected";}?>>NO</option>
											   </select>
										</div>
									</div>
                                    
                                    <div class="control-group">
										<label class="control-label">Agregue un nuevo art&iacute;culo al blog</label>
										<div class="controls">
                                            <select class="small m-wrap" name="notiBlog" tabindex="1">
											       <option value="1" <?php if($_SESSION["configuracionPagina"][14]==1){echo "selected";}?>>SI</option>
                                                   <option value="0" <?php if($_SESSION["configuracionPagina"][14]==0){echo "selected";}?>>NO</option>
											   </select>
										</div>
									</div>
                                    
                                    <div class="control-group">
										<label class="control-label">Cree un nuevo evento que requiera inscripci&oacute;n</label>
										<div class="controls">
                                            <select class="small m-wrap" name="notiEvento" tabindex="1">
											       <option value="1" <?php if($_SESSION["configuracionPagina"][15]==1){echo "selected";}?>>SI</option>
                                                   <option value="0" <?php if($_SESSION["configuracionPagina"][15]==0){echo "selected";}?>>NO</option>
											   </select>
										</div>
									</div>
                                    
                                    <div class="control-group">
										<label class="control-label">Apruebe o desaprueb la isncripci&oacute;n a un evento</label>
										<div class="controls">
                                            <select class="small m-wrap" name="notiEventoInscripcion" tabindex="1">
											       <option value="1" <?php if($_SESSION["configuracionPagina"][16]==1){echo "selected";}?>>SI</option>
                                                   <option value="0" <?php if($_SESSION["configuracionPagina"][16]==0){echo "selected";}?>>NO</option>
											   </select>
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
	
	</script>
	<!-- END JAVASCRIPTS -->   
</body>
<!-- END BODY -->
</html>