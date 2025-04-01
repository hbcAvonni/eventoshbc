<!DOCTYPE html>
<html lang="en">

<head>
	<?php include('include/head.php'); ?>
</head>

<body>
	<?php include('include/header.php'); ?>
	<!--/#header-->

	<section id="home">
		<div id="main-slider" class="carousel slide" data-ride="carousel">
			<ol class="carousel-indicators">
				<li data-target="#main-slider" data-slide-to="0" class="active"></li>
				<li data-target="#main-slider" data-slide-to="1"></li>
				<li data-target="#main-slider" data-slide-to="2"></li>
				<li data-target="#main-slider" data-slide-to="3"></li>
			</ol>
			<div class="carousel-inner carousel-inner2">
				<div class="item active">
					<img class="img-responsive" src="images/Poster-Flyers/IMG-20250219-WA0004.jpg" alt="slider">
					<div class="carousel-caption">
						<h2><b>BACHATASIA</b></h2>
						<h4>06 al 09 de Marzo 2025,<br> Sevilla Sensual Congress<br> Hotel Vértice Aljarafe</h4>
						<a href="form-info.php">COMPRA TUS ENTRADAS <i class="fa fa-angle-right"></i></a>
					</div>
				</div>
				<div class="item">
					<img class="img-responsive" src="images/Poster-Flyers/IMG-20250219-WA0008.jpg" alt="slider">
					<div class="carousel-caption">
						<h2><b>XIV <i>Tumba & Tumbao Beach</i></b></h2>
						<h4>29, 30, 31 Mayo y 01 de Junio 2025,<br> C/ Diego de Almagro, 1<br> Cartaya | Huelva</h4>
						<a href="form-info.php">COMPRA TUS ENTRADAS <i class="fa fa-angle-right"></i></a>
					</div>
				</div>
				<div class="item">
					<img class="img-responsive" src="images/Poster-Flyers/IMG-20250219-WA0010.jpg" alt="slider">
					<div class="carousel-caption">
						<h2><b>SUMMER FESTIVAL 2025</b></h2>
						<h4>18 al 20 de Junio 2025,<br> Miguel & Sandra<br> EXE GRAN HOTEL SÓLUCAR</h4>
						<a href="form-info.php">COMPRA TUS ENTRADAS <i class="fa fa-angle-right"></i></a>
					</div>
				</div>
				<div class="item">
					<img class="img-responsive" src="images/Poster-Flyers/IMG-20250219-WA0007.jpg" alt="slider">
					<div class="carousel-caption">
						<h2><b>BACHATA SPAIN</b></h2>
						<h4>06 - 11 de Mayo 2025,<br> World Congress<br> Huelva</h4>
						<a href="form-info.php">COMPRA TUS ENTRADAS <i class="fa fa-angle-right"></i></a>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!--/#home-->

	<section id="services">
		<div class="title-services">
			<h2>Servicios SBK</h2>
		</div>
		<div class="container-services">
			<div class="card-services sonido" onClick="abrirPopPup(event)" data-hover="images/slider/Sonido-Slider-1024x320.png">
				<div class="card-services-text">SONIDO PROFESIONAL</div>
			</div>
			<div class="card-services iluminacion" onClick="abrirPopPup(event)" data-hover="images/slider/Iluminacion-slider-1024x320.png">
				<div class="card-services-text">ILUMINACIÓN</div>
			</div>
			<div class="card-services escenario" onClick="abrirPopPup(event)" data-hover="images/slider/Escenario-slider-1024x320.png">
				<div class="card-services-text">ESCENARIOS</div>
			</div>
			<div class="card-services led" onClick="abrirPopPup(event)" data-hover="images/slider/LED-slider-1024x320.png">
				<div class="card-services-text">PANTALLAS LED</div>
			</div>
			<div class="card-services otrosSer" onClick="abrirPopPup(event)" data-hover="images/slider/Otros-slider-1024x320.png">
				<div class="card-services-text">OTROS SERVICIOS</div>
			</div>
		</div>
	
		<script>
			const cards = document.querySelectorAll('.card-services');

			function handleHoverEffect() {
				if (window.matchMedia('(min-width: 768px)').matches) { 
					cards.forEach(card => {
						card.addEventListener('mouseenter', () => {
							const newImage = card.getAttribute('data-hover');
							cards.forEach((c, index) => {
								c.style.backgroundImage = `url(${newImage})`;
								c.style.backgroundSize = '500% 100%';
								c.style.backgroundPosition = `${index * 25}% 0`;
							});
						});
					});
				} else {
					// Si la pantalla es más pequeña, eliminamos los eventos
					cards.forEach(card => {
						card.removeEventListener('mouseenter', () => {});
					});
				}
			}
			
			// Ejecutar la función cuando se carga la página y cuando cambia el tamaño de la ventana
			handleHoverEffect();
			window.addEventListener('resize', handleHoverEffect);
		</script>
	</section>
	<!--/#explore1-->

	<section id="espacios">
		<div class="title-espacios">
			<h2>Nuestro Espacios</h2>
		</div>
		<div class="container-espacios">
			<div class="espacios-publicos" onClick="abrirPopPup(event)" data-hover="images/FUENLABRADA-scaled-1.jpg">
				<div class="card-espacios-text">ESPACIOS PÚBLICOS</div>
			</div>
			<div class="espacios-privados" onClick="abrirPopPup(event)" data-hover="images/Brutal-Show-10.jpg">
				<div class="card-espacios-text">ESPACIOS PRIVADOS</div>
			</div>
			<div class="espacios-cubiertos" onClick="abrirPopPup(event)" data-hover="images/Las-ventas-Madrid.jpg">
				<div class="card-espacios-text">ESPACIOS CUBIERTOS</div>
			</div>
			<div class="espacios-libres" onClick="abrirPopPup(event)" data-hover="images/l_pandora_sala.jpg">
				<div class="card-espacios-text">ESPACIOS AIRE LIBRE</div>
			</div>
		</div>
	</section>
	<!--/#explore1-->

	<section id="explore" class="explore-sbk">
		<div class="container">
			<div class="row">
				<div class="watch">
					<img class="img-responsive" src="images/watch.png" alt="">
				</div>
				<div class="col-md-4 col-md-offset-2 col-sm-5">
					<h2>Nuestro próximo evento SEVILLA SENSUAL CONGRESS</h2>
				</div>
				<div class="col-sm-7 col-md-6">
					<ul id="countdown-sbk" class="countdown">
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
			<div class="cart">
				<a href="form-info.php"><i class="fa fa-shopping-cart"></i> <span>Comprar Entradas</span></a>
			</div>
		</div>
	</section>
	<!--/#explore-->

	<section id="next-event">
		<div class="title-next-event">
			<h2>Proximos Eventos</h2>
		</div>
		<div class="container-next-event">
			<div class="next-event-publicos" onClick="abrirPopPup(event)" data-hover="images/Poster-Flyers/IMG-20250219-WA0004.jpg">
				<div class="card-next-event-text">BACHATASIA</div>
			</div>
			<div class="next-event-privados" onClick="abrirPopPup(event)" data-hover="images/Poster-Flyers/IMG-20250219-WA0007.jpg">
				<div class="card-next-event-text">BOCHATA WORLD CONGRESS</div>
			</div>
			<div class="next-event-cubiertos" onClick="abrirPopPup(event)" data-hover="images/Poster-Flyers/IMG-20250219-WA0008.jpg">
				<div class="card-next-event-text">TAMBA & TUMBAO</div>
			</div>
			<div class="next-event-libres" onClick="abrirPopPup(event)" data-hover="images/Poster-Flyers/IMG-20250219-WA0010.jpg">
				<div class="card-next-event-text">SUMMER FESTIVAL 2025</div>
			</div>
		</div>
	</section>
	<!--/#explore1-->

	<section class="info-event">
		<div class="title-info-event">
			<h2>&#x1F4CD; Local: Wessex, Avenida de la Buhaira 5, Local 19 Sevilla</h2>
			<h2>&#x1F4CD; Local: Buypass, Calle Terral 16, Dos Hermanas</h2>
		</div>
	</section>

	<section id="previous-event">
		<div class="title-previous-event">
			<h2>Eventos Realizados</h2>
		</div>
		<div class="container-previous-event">
			<div class="previous-event-publicos" onClick="abrirPopPup(event)" data-hover="images/Poster-Flyers/IMG-20250219-WA0001.jpg">
				<div class="card-previous-event-text">SAN VALENTIN PARTY</div>
			</div>
			<div class="previous-event-privados" onClick="abrirPopPup(event)" data-hover="images/Poster-Flyers/IMG-20250219-WA0002.jpg">
				<div class="card-previous-event-text">DJ KEVIN RG</div>
			</div>
			<div class="previous-event-cubiertos" onClick="abrirPopPup(event)" data-hover="images/Poster-Flyers/IMG-20250219-WA0003.jpg">
				<div class="card-previous-event-text">SAN VALENTIN</div>
			</div>
			<div class="previous-event-libres" onClick="abrirPopPup(event)" data-hover="images/Poster-Flyers/IMG-20250219-WA0005.jpg">
				<div class="card-previous-event-text">TALLER DE BACHATA</div>
			</div>
		</div>
	</section>
	<!--/#explore1-->

	<section class="info-event">
		<h3>CONFIAN EN NOSOTROS</h3>
		<div class="title-info-event">
			<img src="images/sponsor/fibroaljarafe-rbg.png" alt="Fibroaljarafe">
			<h2>Fibroaljarafe</h2>
		</div>
		<div class="title-info-event">
			<img src="images/sponsor/albatros.png" alt="Albatros">
			<h2>Albatros</h2>
		</div>
	</section>

	<?php include('include/contact.php'); ?>
	<!--/#contact-->
	<?php include('include/footer.php'); ?>
	<!--/#footer-->
	<!-- jQuery -->
	<?php include('include/scripts.php'); ?>
</body>

</html>