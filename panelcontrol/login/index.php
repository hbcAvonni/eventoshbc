<?php
	session_start();
	require_once("../modelo/constantes.php");
	$get = base64_encode("valCorreo");
	if (!empty($_SESSION["id"])) {
		switch($_SESSION["datosUsuario"]["usr_tipo"]){		
			case TIPO_INVERSOR:
				$url = 'inversores/';
			break;
			
			default:
				$url = 'admin/';
			break;
		}
		if (isset($_GET[$get])) {
			require_once(ROOT_PATH."/../class/Usuarios.php");

			$_SESSION["datosUsuario"]["usr_correo_verificado"] = SI;
			Usuarios::Update(
				[ "usr_correo_verificado" => SI ], 
				[ "usr_id" => $_SESSION["datosUsuario"]["usr_id"] ]
			);
		}
		header("Location:".$url);
		exit();
	}
	require_once(ROOT_PATH."/../class/Informacion.php");
	require_once(ROOT_PATH."/../class/Localidad_Paises.php");

	$predicado = [ "info_id" => ID_EMPRESA ];
	$consulta = Informacion::Select($predicado);
	$rInfo = $consulta->fetch(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">
<!-- BEGIN HEAD -->
<head>
	<meta charset="utf-8" />
	<title>::<?=$rInfo["info_nombre_empresa"]?> | Ingreso al Sistema::</title>
	<meta content="width=device-width, initial-scale=1.0" name="viewport" />
	<meta content="" name="description" />
	<meta content="" name="author" />
	<!-- BEGIN GLOBAL MANDATORY STYLES -->
	<link href="assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
	<link href="assets/plugins/bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css"/>
	<link href="assets/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
	<link href="assets/css/style-metro.css" rel="stylesheet" type="text/css"/>
	<link href="assets/css/style.css" rel="stylesheet" type="text/css"/>
	<link href="assets/css/style-responsive.css" rel="stylesheet" type="text/css"/>
	<link href="assets/css/themes/default.css" rel="stylesheet" type="text/css" id="style_color"/>
	<link href="assets/plugins/uniform/css/uniform.default.css" rel="stylesheet" type="text/css"/>
	<link rel="stylesheet" type="text/css" href="assets/plugins/select2/select2_metro.css" />
	<!-- END GLOBAL MANDATORY STYLES -->
	<!-- BEGIN PAGE LEVEL STYLES -->
	<link href="assets/css/pages/login-soft.css" rel="stylesheet" type="text/css"/>
	<!-- END PAGE LEVEL STYLES -->
	<link rel="shortcut icon" href="../files/logo/<?=$rInfo["info_logo"]?>" />
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<body class="login">

	<!-- BEGIN LOGO -->
	<div class="logo" style="margin-bottom:-12px;">
		<img src="../files/logo/<?=$rInfo["info_logo"]?>" alt="" /> 
	</div>
	<!-- END LOGO -->
	<!-- BEGIN LOGIN -->
	<div class="content">
		<!-- BEGIN LOGIN FORM -->
		<form class="form-vertical login-form" action="../controlador/autenticando.php" method="post">
			<h3 class="form-title" align="center">Acceso al sistema </h3>
			<input type="hidden" name="valCorreo" value="<?=isset($_GET[$get]) ? "valCorreo" : "";?>">
			<div class="alert alert-error hide">
				<button class="close" data-dismiss="alert"></button>
				<span>Ingrese su usuario y contraseña.</span>
			</div>
			<?php
				if (!empty($_GET['error']) || !empty($_GET['success'])) {
					if (!empty($_GET['error'])) {
						$alert = 'error';
						switch ($_GET['error']) {
							case 1:
								$msj = 'El usuario no existe';
								break;

							case 2:
								$msj = 'La clave no es correcta';
								break;

							case 3:
								$msj = 'Su usuario se encuentra bloqueado';
								break;

							case 4:
								$msj = 'Ocurrio un problema al registrarte,<br> por favor intenta nuevamente mas tarde.<br>'.$_GET['msj'];
								break;

							case 5:
								$msj = 'Su usuario o email no fue encontrado';
								break;
						}
					}

					if (!empty($_GET['success'])) {
						$alert = 'success';
						switch ($_GET['success']) {
							case 1:
								$msj = 'Registro exitoso,<br> hemos enviado un correo con los datos de acceso';
								break;
							case 2:
								$msj = 'Hemos enviado tus datos de acceso a tu email registrado';
								break;
						}
					}
			?>
				<div class="alert alert-<?=$alert ?? "";?>">
					<button class="close" data-dismiss="alert"></button>
					<span><?=$msj ?? "";?>.</span>
				</div>
			<?php } ?>
			<div class="control-group">
				<!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
				<label class="control-label visible-ie8 visible-ie9">Usuario o Email</label>
				<div class="controls">
					<div class="input-icon left">
						<i class="icon-user"></i>
						<input class="m-wrap placeholder-no-fix" type="text" autocomplete="off" placeholder="Usuario o Email" name="username"/>
					</div>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label visible-ie8 visible-ie9">Contraseña</label>
				<div class="controls">
					<div class="input-icon left">
						<i class="icon-lock"></i>
						<input class="m-wrap placeholder-no-fix" type="password" autocomplete="off" placeholder="Contraseña" name="password"/>
					</div>
				</div>
			</div>
			<div class="form-actions">
				<label class="checkbox"><input type="checkbox" name="remember" value="1"/>Recordarme</label>
				<button type="submit" class="btn blue pull-right">Entrar <i class="m-icon-swapright m-icon-white"></i></button>            
			</div>
			<div class="forget-password">
				<h4>Olvidaste la contraseña ?</h4>
				<p>haz click <a href="javascript:void(0);" id="forget-password">aquí</a> para recuperarla</p>
			</div>
            <div class="create-account">
				<p>No tienes una cuenta? <a href="javascript:void(0);" id="register-btn" >Crea tu cuenta</a></p>
			</div>
		</form>
		<!-- END LOGIN FORM -->        
		<!-- BEGIN FORGOT PASSWORD FORM -->
		<form class="form-vertical forget-form" action="../controlador/recuperar-contraseña.php" method="post">
			<h3 >Olvidaste la contraseña?</h3>
			<p>Ingresa tu usuario o email registrado y te enviaremos los datos.</p>
			<div class="control-group">
				<div class="controls">
					<div class="input-icon left">
						<i class="icon-user"></i>
						<input class="m-wrap placeholder-no-fix" type="text" placeholder="Email o Usuario" autocomplete="off" name="email" />
					</div>
				</div>
			</div>
			<div class="form-actions">
				<button type="button" id="back-btn" class="btn"><i class="m-icon-swapleft"></i> Iniciar Sesión</button>
				<button type="submit" class="btn blue pull-right"> Enviar <i class="m-icon-swapright m-icon-white"></i></button>            
			</div>
		</form>
		<!-- END FORGOT PASSWORD FORM -->
		<!-- BEGIN REGISTRATION FORM -->
		<form class="form-vertical register-form" action="../controlador/registro.php" method="post">
			<h3 >Registrate</h3>
			<p>Introduzca sus datos personales a continuación:</p>
			<div class="control-group">
				<label class="control-label visible-ie8 visible-ie9">Nombre Completo</label>
				<div class="controls">
					<div class="input-icon left">
						<i class="icon-font"></i>
						<input class="m-wrap placeholder-no-fix" type="text" placeholder="Nombre Completo" name="name"/>
					</div>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label visible-ie8 visible-ie9">Email</label>
				<div class="controls">
					<div class="input-icon left">
						<i class="icon-envelope"></i>
						<input class="m-wrap placeholder-no-fix" type="text" placeholder="Email" name="email" oninput="validarEmail(this)"/>
						<span id="email_error" style="color: red;"></span>
					</div>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label visible-ie8 visible-ie9">Telefono</label>
				<div class="controls">
					<div class="input-icon left">
						<i class="icon-envelope"></i>
						<input class="m-wrap placeholder-no-fix" type="text" placeholder="Telefono" name="telephon"/>
					</div>
				</div>
			</div>
			<div class="control-group">
				<div class="row-fluid">
					<label class="control-label visible-ie8 visible-ie9">Tipo Documento</label>
					<div class="controls">
						<select name="tDoc" id="select2_sample1" class="span12 select2" onchange="validarDocumento()">
							<option value=""></option>
							<option value="DNI">DNI</option>
							<option value="PASSPORT">PASAPORTE</option>
							<option value="NIF">NIF/CIF</option>
						</select>
					</div>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label visible-ie8 visible-ie9">Documento</label>
				<div class="controls">
					<div class="input-icon left">
						<i class="icon-user"></i>
						<input class="m-wrap placeholder-no-fix" type="text" autocomplete="off" placeholder="Documento" name="nDoc" id="nDoc" oninput="validarDocumento()"/>
						<span id="nDoc_error" style="color: red;"></span>
					</div>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label visible-ie8 visible-ie9">Dirección</label>
				<div class="controls">
					<div class="input-icon left">
						<i class="icon-ok"></i>
						<input class="m-wrap placeholder-no-fix" type="text" placeholder="Dirección" name="address"/>
					</div>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label visible-ie8 visible-ie9">Ciudad</label>
				<div class="controls">
					<div class="input-icon left">
						<i class="icon-location-arrow"></i>
						<input class="m-wrap placeholder-no-fix" type="text" placeholder="Ciudad" name="city"/>
					</div>
				</div>
			</div>
			<div class="control-group">
				<div class="row-fluid">
					<label class="control-label visible-ie8 visible-ie9">Pais</label>
					<div class="controls">
						<select name="country" id="select2_sample4" class="span12 select2">
							<option value=""></option>
							<?php
								$conPais = Localidad_Paises::Select([], "*", "", "ORDER BY pais_nombre");
								while($resPais = $conPais->fetch(PDO::FETCH_ASSOC)){
							?>
								<option value="<?=$resPais['pais_siglas'];?>" <?= $resPais['pais_siglas'] == "ES" ? "selected" : ""; ?>><?=$resPais['pais_nombre'];?></option>
							<?php
							}
							?>
						</select>
					</div>
				</div>
			</div>
			<p>Ingrese los detalles de su cuenta a continuación:</p>
			<div class="control-group">
				<label class="control-label visible-ie8 visible-ie9">Contraseña</label>
				<div class="controls">
					<div class="input-icon left">
						<i class="icon-lock"></i>
						<input class="m-wrap placeholder-no-fix" type="password" autocomplete="off" id="register_password" placeholder="Contraseña" name="password"/>
					</div>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label visible-ie8 visible-ie9">Repita la contraseña</label>
				<div class="controls">
					<div class="input-icon left">
						<i class="icon-ok"></i>
						<input class="m-wrap placeholder-no-fix" type="password" autocomplete="off" placeholder="Repita la contraseña" name="rpassword"/>
					</div>
				</div>
			</div>
			<div class="control-group">
				<div class="controls">
					<label class="checkbox">
					<input type="checkbox" name="tnc"/> Estoy de acuerdo con los <a href="<?=REDIRECT_ROUTE?>aviso-legal.php" target="_blank">Terminos de servicios</a> y <a href="<?=REDIRECT_ROUTE?>politica-de-privacidad.php" target="_blank">Politicas de Privacidad</a>
					</label>  
					<div id="register_tnc_error"></div>
				</div>
			</div>
			<div class="form-actions">
				<button id="register-back-btn" type="button" class="btn"><i class="m-icon-swapleft"></i> Iniciar Sesión</button>
				<button type="submit" id="register-submit-btn" class="btn green pull-right"> Resgistrarme<i class="m-icon-swapright m-icon-white"></i></button>            
			</div>
		</form>
		<!-- END REGISTRATION FORM -->
	</div>
	<!-- END LOGIN -->
	<!-- BEGIN COPYRIGHT -->
	<div class="copyright">
		Copyright &copy; <?=date("Y");?> <a href="https://developers.oceanblue.es" target="_blank">Ocean Blue Developers ®™</a>
	</div>
	<!-- END COPYRIGHT -->
	<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
	<!-- BEGIN CORE PLUGINS -->   <script src="assets/plugins/jquery-1.10.1.min.js" type="text/javascript"></script>
	<script src="assets/plugins/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>
	<!-- IMPORTANT! Load jquery-ui-1.10.1.custom.min.js before bootstrap.min.js to fix bootstrap tooltip conflict with jquery ui tooltip -->
	<script src="assets/plugins/jquery-ui/jquery-ui-1.10.1.custom.min.js" type="text/javascript"></script>      
	<script src="assets/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script src="assets/plugins/bootstrap-hover-dropdown/twitter-bootstrap-hover-dropdown.min.js" type="text/javascript" ></script>
	<!--[if lt IE 9]>
	<script src="assets/plugins/excanvas.min.js"></script>
	<script src="assets/plugins/respond.min.js"></script>  
	<![endif]-->   
	<script src="assets/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
	<script src="assets/plugins/jquery.blockui.min.js" type="text/javascript"></script>  
	<script src="assets/plugins/jquery.cookie.min.js" type="text/javascript"></script>
	<script src="assets/plugins/uniform/jquery.uniform.min.js" type="text/javascript" ></script>
	<!-- END CORE PLUGINS -->
	<!-- BEGIN PAGE LEVEL PLUGINS -->
	<script src="assets/plugins/jquery-validation/dist/jquery.validate.min.js" type="text/javascript"></script>
	<script src="assets/plugins/backstretch/jquery.backstretch.min.js" type="text/javascript"></script>
	<script type="text/javascript" src="assets/plugins/select2/select2.min.js"></script>
	<!-- END PAGE LEVEL PLUGINS -->
	<!-- BEGIN PAGE LEVEL SCRIPTS -->
	<script src="assets/scripts/app.js" type="text/javascript"></script>
	<script src="assets/scripts/login-soft.js" type="text/javascript"></script>      
	<!-- END PAGE LEVEL SCRIPTS --> 
	<script>
		jQuery(document).ready(function() {     
		  App.init();
		  Login.init();
		});
	</script>
	<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>