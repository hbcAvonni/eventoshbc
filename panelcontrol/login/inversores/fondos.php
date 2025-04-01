<?php 
	include("head.php");
	if (!isset($_GET["id"])) {
		header("Location: index.php");
	} elseif ($_SESSION["datosUsuario"]["usr_fondo"] == NO) {
		header("Location: invertir.php?id=".base64_decode($_GET["id"]));
	}
?>

<body>
	<?php
		include("header.php");
		
		$predicado = [ "eve_id" => base64_decode($_GET["id"]) ];
		$consulta = Eventos::Select($predicado, "eve_id, eve_costo_inversores");
		$resultado = $consulta->fetch(PDO::FETCH_ASSOC);
	?>

	<div class="container">
		<div class="card inversion">
			<form class="form-vertical inversion-form" action="inversion-guardar.php" method="post">
				<h2><b>INVERSIÓN</b></h2>
				<input type="hidden" name="eve_id" value="<?=$resultado["eve_id"]?>">
				<input type="hidden" name="tInver" value="<?=Eventos_Inversiones::TASACION?>">

				<div class="control-group">
					<label class="control-label visible-ie8 visible-ie9">Dirección</label>
					<div class="controls">
						<div class="input-icon left">
							<i class="icon-ok"></i>
							<input class="m-wrap placeholder-no-fix" type="text" placeholder="Dirección" name="address" id="address"/>
						</div>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label visible-ie8 visible-ie9">Ciudad</label>
					<div class="controls">
						<div class="input-icon left">
							<i class="icon-location-arrow"></i>
							<input class="m-wrap placeholder-no-fix" type="text" placeholder="Ciudad" name="city" id="city"/>
						</div>
					</div>
				</div>
				<div class="control-group">
					<div class="row-fluid">
						<label class="control-label visible-ie8 visible-ie9">Pais</label>
						<div class="controls">
							<select name="country" id="select2_sample2" class="m-wrap select2">
								<option value=""></option>
								<?php
								$conPais = Localidad_Paises::Select([], "*", "", "ORDER BY pais_nombre");
								while ($resPais = $conPais->fetch(PDO::FETCH_ASSOC)) {
								?>
									<option value="<?= $resPais['pais_siglas']; ?>" <?= $resPais['pais_siglas'] == "ES" ? "selected" : ""; ?>><?= $resPais['pais_nombre']; ?></option>
								<?php
								}
								?>
							</select>
						</div>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label visible-ie8 visible-ie9">Monto a Invertir</label>
					<div class="controls">
						<div class="input-icon left">
							<i class="icon-euro"></i>
							<input class="m-wrap placeholder-no-fix" type="number" placeholder="Monto a Invertir" name="monto" id="monto" data-min="<?=($resultado["eve_costo_inversores"] * 0.2)?>" value="<?=($resultado["eve_costo_inversores"] * 0.2)?>" oninput="calculosInversion(this)"/>
							<span id="spanError"></span>
						</div>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label visible-ie8 visible-ie9">Rentabilidad</label>
					<div class="controls">
						<div class="input-icon left">
							<i class="icon-upload"></i>
							<input class="m-wrap placeholder-no-fix" type="text" placeholder="Rentabilidad" value="20%" disabled/>
						</div>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label visible-ie8 visible-ie9">Incentivo</label>
					<div class="controls">
						<div class="input-icon left">
							<i class="icon-euro"></i>
							<input class="m-wrap placeholder-no-fix" type="text" placeholder="Incentivo" id="incentivo" disabled/>
						</div>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label visible-ie8 visible-ie9">Menos el 3% del incentivo para el promotor</label>
					<div class="controls">
						<div class="input-icon left">
							<i class="icon-euro"></i>
							<input class="m-wrap placeholder-no-fix" type="text" placeholder="Menos el 3% del incentivo para el promotor" id="promotor" disabled/>
						</div>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label visible-ie8 visible-ie9">Total</label>
					<div class="controls">
						<div class="input-icon left">
							<i class="icon-euro"></i>
							<input class="m-wrap placeholder-no-fix" type="text" placeholder="Total a recibir" id="total" disabled/>
						</div>
					</div>
				</div>
				<div class="form-actions">
					<button type="submit" id="register-submit-btn" class="btn green pull-right"> Invertir <i class="m-icon-swapright m-icon-white"></i></button>
				</div>
			</form>
		</div>
	</div>

	<?php include("footer.php"); ?>
	<?php include("scripts.php"); ?>
	<script>
		$(document).ready(function () {
			calculosInversion(document.getElementById("monto"));
		});
	</script>
</body>

</html>