<!-- BEGIN SIDEBAR -->
<div class="page-sidebar nav-collapse collapse">

	<!-- BEGIN SIDEBAR MENU -->
	<ul class="page-sidebar-menu">
		<li>
			<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
			<div class="sidebar-toggler hidden-phone"></div>
			<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
		</li>

		<div align="center">
			<img src="<?= $fileFoto; ?>" width="80">
		</div>

		<li class="start">
			<a href="index.php">
				<i class="icon-home"></i>
				<span class="title">Inicio</span>
				<span class="selected"></span>
			</a>
		</li>

		<li class="start">
			<a href="eventos.php">
				<i class="icon-list-alt"></i>
				<span class="title">Eventos</span>
				<span class="selected"></span>
			</a>
		</li>

		<li class="start">
			<a href="inversiones.php">
				<i class="icon-laptop"></i>
				<span class="title">Inversores</span>
				<span class="selected"></span>
			</a>
		</li>

		<?php if( $_SESSION["datosUsuario"]['usr_tipo'] != TIPO_INVERSOR ) { ?>
			<hr>

			<li class="start">
				<a href="informacion.php">
					<i class="icon-info-sign"></i>
					<span class="title">Información</span>
					<span class="selected"></span>
				</a>
			</li>

			<li class="start">
				<a href="usuarios.php">
					<i class="icon-group"></i>
					<span class="title">Usuarios</span>
					<span class="selected"></span>
				</a>
			</li>

			<li class="start">
				<a href="contacto.php">
					<i class="icon-envelope-alt"></i>
					<span class="title">Contáctenos</span>
					<span class="selected"></span>
				</a>
			</li>

			<li class="start">
				<a href="inscripcion-eventos.php">
					<i class="icon-edit"></i>
					<span class="title">Suscritos a Eventos</span>
					<span class="selected"></span>
				</a>
			</li>
		<?php } ?>
	</ul>
	<!-- END SIDEBAR MENU -->
</div>
<!-- END SIDEBAR -->