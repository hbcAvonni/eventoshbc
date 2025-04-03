<?php include("head.php"); ?>

<body>
	<?php include("header.php"); ?>

	<div class="container">
		<div class="card">
			<h2>Mis Inversiones</h2>
			<!-- <div class="chart">Gráfico de inversiones</div> -->
			<div class="investments" id="investments"></div>
		</div>

		<div class="card">
			<h2>Proyectos Disponibles</h2>
			<div class="projects" id="projects"></div>
		</div>
	</div>

	<script>
		document.addEventListener("DOMContentLoaded", function() {
			<?php
			Eventos::foreignKey(Eventos::INNER, [
				"eve_id" => 'inver_id_evento'
			]);
			$inversiones = Eventos_Inversiones::SelectJoin(
				["inver_id_inversor" => $_SESSION['id']],
				"eve_nombre, SUM(inver_inversion) as inversion, ROUND(IFNULL((SUM(inver_inversion) * 100) / eve_costo_inversores, 0)) AS porcentaje",
				[Eventos::class],
				"",
				"inver_id_evento",
				"",
				"eve_id ASC, porcentaje DESC"
			);
			$dataInvestments = "";
			foreach ($inversiones as $mias) {
				$incentivo = $mias['inversion'] * 0.2;
				$promotor = $incentivo * 0.03;
				$total = $mias['inversion'] + ($incentivo - $promotor);
				$dataInvestments .= "{
							name: '" . $mias['eve_nombre'] . "',
							return: '20%',
							invested: '" . number_format($mias['inversion'], 0, ".", ".") . " €',
							incentivo: '" . number_format($incentivo, 0, ".", ".") . " €',
							promotor: '" . number_format($promotor, 0, ".", ".") . " €',
							total: '" . number_format($total, 0, ".", ".") . " €'
						},";
			}

			Eventos_Inversiones::foreignKey(Eventos_Inversiones::LEFT, [
				"inver_id_evento" => 'eve_id'
			]);
			$projectos = Eventos::SelectJoin(
				["eve_activo" => ACTIVO],
				"eve_id, eve_nombre, ROUND(IFNULL((SUM(inver_inversion) * 100) / eve_costo_inversores, 0)) AS porcentajeInvertido, (eve_costo_inversores - IFNULL(SUM(inver_inversion), 0)) AS disponible",
				[Eventos_Inversiones::class],
				"",
				"eve_id",
				"porcentajeInvertido < 100",
				"eve_id ASC, porcentajeInvertido DESC"
			);
			$dataProjects = "";
			foreach ($projectos as $projecto) {
				$dataProjects .= "{
							id: '" . base64_encode($projecto['eve_id']) . "',
							name: '" . $projecto['eve_nombre'] . "',
							return: '20%',
							minInvestment: '" . number_format(($projecto['disponible'] * 0.2), 0, ".", ".") . " €',
							maxInvestment: '" . number_format($projecto['disponible'], 0, ".", ".") . " €'
						},";
			}

			$urlInversion = $_SESSION["datosUsuario"]["usr_fondo"] == SI ? "fondos" : "invertir";
			?>

			const investmentsContainer = document.getElementById("investments");
			const projectsContainer = document.getElementById("projects");
			const investments = [<?= $dataInvestments; ?>];
			const projects = [<?= $dataProjects; ?>];

			investments.forEach(i => {
				const div = document.createElement("div");
				div.classList.add("item");
				div.innerHTML = `<h3>${i.name}</h3>
								<p>Invertido: ${i.invested}</p>
								<p>Rentabilidad: ${i.return}</p>
								<p>Incentivo: ${i.incentivo}</p>
								<p>Promotor (-3%): -${i.promotor}</p>
								<p>Total: ${i.total}</p>`;
				investmentsContainer.appendChild(div);
			});

			projects.forEach(p => {
				const a = document.createElement("a");
				a.href = `<?= $urlInversion; ?>.php?id=${p.id}`;
				a.classList.add("project-link");

				const div = document.createElement("div");
				div.classList.add("item");
				div.innerHTML = `<h3>${p.name}</h3>
								<p>Rentabilidad: ${p.return}</p>
								<p>Min. Inversión: ${p.minInvestment}</p>
								<p>Max. Inversión: ${p.maxInvestment}</p>`;
				a.appendChild(div);
				projectsContainer.appendChild(a);
			});
		});
	</script>

	<?php include("footer.php"); ?>
	<?php include("scripts.php"); ?>
</body>

</html>