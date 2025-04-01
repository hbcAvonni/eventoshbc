<?php include("session.php");?>
<?php include("../../modelo/conexion.php");?>
<?php
$conexion->query("DELETE FROM anuncios");
$conexion->query("DELETE FROM blog");
$conexion->query("DELETE FROM blog_comentarios");
$conexion->query("DELETE FROM boletin");
$conexion->query("DELETE FROM clientes");
$conexion->query("DELETE FROM clientes_materiales");
$conexion->query("DELETE FROM contactenos");
$conexion->query("DELETE FROM eventos");
$conexion->query("DELETE FROM eventos_inscripcion");
$conexion->query("DELETE FROM pedidos");
$conexion->query("DELETE FROM pedidos_items WHERE ppi_estado=1");//LOS UNICOS QUE NO SE BORRAN SON LOS QUE ESTAN PIDIENDO EN EL MOMENTO
$conexion->query("DELETE FROM portafolio");
$conexion->query("DELETE FROM productos");
$conexion->query("DELETE FROM sitios_recomendados");
$conexion->query("DELETE FROM slider");
$conexion->query("DELETE FROM sub_categorias");
$conexion->query("DELETE FROM subpaginas");
$conexion->query("DELETE FROM testimonios");
$conexion->query("DELETE FROM tienda_items");
$conexion->query("DELETE FROM tienda_paquetes");
$conexion->query("DELETE FROM usuarios WHERE usr_tipo!=1");
$conexion->query("DELETE FROM videos");
$conexion->query("DELETE FROM visitas");

echo '<script type="text/javascript">window.location.href="index.php"</script>';
exit();
?>