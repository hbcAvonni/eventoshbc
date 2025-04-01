<!DOCTYPE html>
<html lang="en">

<head>
	<?php include('include/head.php'); ?>
</head>

<body>
	<?php include('include/header.php'); ?>
	<!--/#header-->

	<section id="contact" class="registro-contact">
		<div class="contact-section contact-registro">
			<div class="container">
				<div class="row">
					<div class="col-sm-3 col-sm-offset-4 container-registro">
						<div class="contact-text">
							<h3>Contactanos</h3>
							<address>
								E-mail: info@sbksocialclub.com<br>
								Phone: +34 (613) 68 53 04
							</address>
						</div>
						<div class="contact-address">
							<h3>Contactanos</h3>
							<address>
								Calle virgen del luján, 6.<br>
								Sevilla, Andalucia,<br>
								41011, España
							</address>
						</div>
					</div>
					<div class="col-sm-9">
						<div id="contact-section">
							<h3>Registro al Evento</h3>
							<div id="result"></div>
							<form id="main-contact-form" class="contact-form" name="contact-form" method="POST" action="https://script.google.com/macros/s/AKfycbxqB8rp7AfebUdrz87Q4F988GyBGBKX0gvyk19F98xCh4afGcJlTydzatRN-FJ6Otge/exec" enctype="multipart/form-data">
								<div class="col-sm-6">
									<div class="form-group">
										<input type="text" name="name" class="form-control" required="required" placeholder="Nombre Completo">
									</div>
									<div class="form-group">
										<select class="form-control" name="plaza" required="required">
											<option value=""> -- Elegir Establecimiento -- </option>
											<option value="WESSEX">Wessex</option>
											<option value="BUYPASS">Buypass</option>
										</select>
									</div>
									<div class="form-group">
										<input type="text" name="edad" class="form-control" placeholder="Edad">
									</div>
									<div class="form-group">
										<input type="text" name="celular" class="form-control" required="required" placeholder="Celular">
									</div>
									<div class="form-group">
										<input type="email" name="email" class="form-control" required="required" placeholder="Email">
									</div>
									<div class="form-group">
										<select class="form-control" name="mPago" required="required">
											<option value=""> -- Metodo de Pago -- </option>
											<option value="EFECTIVO">Efectivo</option>
											<option value="TRANSFERENCIA">Transferencia</option>
										</select>
									</div>
									<div class="form-group btnComprar">
										<button type="submit" class="btn btn-primary pull-right">Comprar Entrada</button>
									</div>
								</div>
								<div class="col-sm-6">
									<div class="form-group">
										<label>Subir una Foto:</label>
										<img src="https://placehold.co/400x600" class="img-form" alt="Foto usuario" id="imgUsuario"/>
										<input type="file" id="customFile" accept="imagen/*" name="foto" class="form-control" onchange="actualizarFoto()" required="required">

										<script>
											function actualizarFoto() {
												let img = document.getElementById("imgUsuario");
												let input = document.getElementById("customFile");
						
												if(img && input.files[0]){
													img.src= URL.createObjectURL(input.files[0]);
												}
											}
										</script>
									</div>
									<div class="form-group btnComprar2">
										<button type="submit" class="btn btn-primary pull-right">Comprar Entrada</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!--/#contact-->
	
	<section id="explore" class="explore-registro">
		<div class="container">
			<div class="row">
				<div class="watch">
					<img class="img-responsive" src="images/watch.png" alt="">
				</div>
				<div class="col-md-4 col-md-offset-2 col-sm-5">
					<h2>Días para el evento</h2>
				</div>
				<div class="col-sm-7 col-md-6">
					<ul id="countdown-registro" class="countdown">
						<li>
							<span class="days time-font">00</span>
							<p class="timeRefDays">days </p>
						</li>
						<li>
							<span class="hours time-font">00</span>
							<p class="timeRefHours">hours </p>
						</li>
						<li>
							<span class="minutes time-font">00</span>
							<p class="timeRefMinutes">minutes</p>
						</li>
						<li>
							<span class="seconds time-font">00</span>
							<p class="timeRefSeconds">seconds</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
	<!--/#explore-->

	<?php include('include/footer.php'); ?>
	<!--/#footer-->
	<!-- jQuery -->
	<?php include('include/scripts.php'); ?>
</body>

</html>