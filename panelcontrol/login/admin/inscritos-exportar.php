<?php
	header("Content-Type: application/vnd.ms-excel");
	header("Expires: 0");
	header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
	header("content-disposition: attachment;filename=Eventos_Inscritos_" . date("d/m/Y") . ".xls");
?>
<?php include("../../modelo/conexion.php"); ?>

<!doctype html>
<html>
<head>
	<meta charset="utf-8">
</head>

<body>
	<div align="center">
		<table border="1" rules="all">
			<thead>
				<tr>
					<th>Fecha</th>
					<th>Evento</th>
					<th>Nombre</th>
					<th>Cedula</th>
					<th>Email</th>
					<th>Telefono</th>
					<th>Celular</th>
					<th>Ciudad</th>
				</tr>
			</thead>
			<tbody>
				<?php
					$filtro = '';
					if ($_GET["webi"] == 1) {
						$filtro .= ' AND YEAR(ins_fecha)=2021 AND MONTH(ins_fecha)=02 AND DAY(ins_fecha)>=24';
					}

					$consulta = $conexion->query("SELECT * FROM inscripcion 
					INNER JOIN eventos ON eve_id=ins_id_evento
					WHERE ins_id_evento='" . $_GET["evento"] . "' $filtro");
					
					while ($resultado = mysqli_fetch_array($consulta, MYSQLI_BOTH)) {
				?>
					<tr>
						<td><?= $resultado["ins_fecha"]; ?></td>
						<td><?= $resultado["eve_nombre"]; ?></td>
						<td><?= $resultado["ins_asistente"]; ?></td>
						<td><?= $resultado["ins_cedula"]; ?></td>
						<td><?= $resultado["ins_email"]; ?></td>
						<td><?= $resultado["ins_telefono"]; ?></td>
						<td><?= $resultado["ins_celular"]; ?></td>
						<td><?= $resultado["ins_ciudad"]; ?></td>
					</tr>
				<?php
				}
				?>
			</tbody>
		</table>
</body>
</html>