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

	<section id="about-sbk">
		<div class="guitar2">
			<img class="img-responsive" src="images/logo-sbk.png" alt="guitar">
		</div>
		<div class="about-content">
			<h1><b><i>SBK SOCIAL</i></b></h1>
			<p>En <b><i>SBK SOCIAL</i></b>, vivimos y respiramos la pasión por el baile. Somos la <b>marca líder</b> en eventos de bachata, salsa y kizomba en la vibrante ciudad de Sevilla, creando experiencias inolvidables para <b>amantes</b> del baile de todos los niveles.<br><br>
			<b>Nuestra misión</b> es conectar a las personas a través del <b>ritmo, la música y la energía única de cada género</b>, ofreciendo clases de <b>alta calidad</b> y eventos que hacen <b>vibrar la pista de baile</b>. Contamos con un equipo de instructores y organizadores apasionados, comprometidos con llevar cada evento a un nivel <b>superior</b>.<br><br>
			Pero esto es solo el comienzo. Nuestro sueño es <b>expandirnos</b> y llevar nuestra esencia a toda España, creando espacios donde la <b>pasión</b> por el baile se viva en cada rincón del país. Ya sea que quieras aprender desde cero, perfeccionar tu estilo o simplemente disfrutar de un evento inolvidable, en <b><i>SBK SOCIAL</i> te estamos esperando</b>.<br><br>
			<b><i>¡Únete a la experiencia y siente el ritmo con nosotros!</i></b>.</p>
			<!-- <a href="https://open.spotify.com/intl-es/artist/6bW3XJqQrNppHJO1ks2Z8V" target="_blank" class="btn btn-primary">Escuchalo en Spotify <i class="fa fa-angle-right"></i></a> -->

		</div>
	</section>
	<!--/#about1-->

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

	<?php include('include/contact.php'); ?>
	<!--/#contact-->
	<?php include('include/footer.php'); ?>
	<!--/#footer-->
	<!-- jQuery -->
	<?php include('include/scripts.php'); ?>
</body>

</html>