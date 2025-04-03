<!-- BEGIN HEADER -->   
	<div class="header navbar navbar-inverse navbar-fixed-top">

		<?php include("barra-developer.php");?>
		<!-- BEGIN TOP NAVIGATION BAR -->
		<div class="navbar-inner">
			<div class="container-fluid">
				<!-- BEGIN LOGO -->
				<a class="brand" href="index.php" style="margin-top:-8px;">
				<img src="../../files/logo/<?=$_SESSION["informacionPagina"]["info_logo"]?>" height="37" width="40" alt="logo" />
				</a>
				<!-- END LOGO -->
                
				<!-- BEGIN RESPONSIVE MENU TOGGLER -->
				<a href="javascript:;" class="btn-navbar collapsed" data-toggle="collapse" data-target=".nav-collapse">
				<img src="../assets/img/menu-toggler.png" alt="" />
				</a>          
				<!-- END RESPONSIVE MENU TOGGLER -->
				<!-- BEGIN TOP NAVIGATION MENU -->    
				<?php $fileFoto = !empty($_SESSION["datosUsuario"]["usr_foto"]) && file_exists("../../files/".$_SESSION["datosUsuario"]["usr_foto"]) ? "../../files/".$_SESSION["datosUsuario"]["usr_foto"] : "../../files/logo/".$_SESSION["informacionPagina"]["info_logo"]; ?>
				<ul class="nav pull-right">
					<li class="dropdown user">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
						<img alt="" src="<?=$fileFoto?>" height="30" width="30" />
						<span class="username"><?=$_SESSION["datosUsuario"]["usr_nombre"];?></span>
						<i class="icon-angle-down"></i>
						</a>
						<ul class="dropdown-menu">
							<li><a href="<?=$_SESSION["informacionPagina"]["info_pagina_web"]?>" target="_blank"><i class="icon-globe"></i> Ver pagina</a></li>
                            <li class="divider"></li>
                            <li><a href="perfil.php"><i class="icon-user"></i> Mi perfil</a></li>
							<?php if( $_SESSION["datosUsuario"]['usr_tipo'] != TIPO_INVERSOR ) { ?>
                            	<li><a href="configuracion.php"><i class="icon-cogs"></i> Configuración</a></li>
							<?php } ?>
							<li class="divider"></li>
							<li><a href="javascript:;" id="trigger_fullscreen"><i class="icon-move"></i> Pantalla completa</a></li>
                            <li class="divider"></li>
							
							<?php if( !empty($_SESSION['admin']) ){?>
								<li><a href="return-admin-panel.php"><i class="icon-key"></i> Volver a mi panel</a></li>
							<?php } else { ?>
								<li><a href="../../controlador/salir.php"><i class="icon-key"></i> Salir</a></li>
							<?php } ?>
						</ul>
					</li>
					<!-- END USER LOGIN DROPDOWN -->
					<!-- END USER LOGIN DROPDOWN -->
				</ul>
				<!-- END TOP NAVIGATION MENU --> 
			</div>
		</div>
		<!-- END TOP NAVIGATION BAR -->
	</div>
	<!-- END HEADER -->