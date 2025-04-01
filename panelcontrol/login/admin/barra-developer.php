<?php if( $_SESSION["datosUsuario"]['usr_tipo'] == TIPO_DEV || !empty($_SESSION['admin']) ) { ?>
  <div style="
          position:relative;
          background-color: #e91e63; 
          color:#fff; 
          height: 40px; 
          width: 100%; 
          /* margin-bottom: 20px; 
          padding: 6px; */
          display:flex; 
          justify-content: center; 
          align-items: center;
          font-family:Arial;
          font-size:11px;
  ">

<?php
    $archivo = explode("/", $_SERVER['PHP_SELF']);
    $nombre_fichero = $archivo[4];
?>
    <b>Usuario actual:</b>&nbsp;<?=$_SESSION["datosUsuario"]['usr_id'];?>&nbsp;|&nbsp;
    <b>Tipo de Usuario:</b>&nbsp;<?=$_SESSION["datosUsuario"]['usr_tipo'];?>&nbsp;|&nbsp;
		<b>V PHP:&nbsp;</b> <?=phpversion(); ?>&nbsp;|&nbsp; 
		<b>Host:&nbsp;</b> <?=$_SERVER['HTTP_HOST']." (".http_response_code().")"; ?>&nbsp;|&nbsp;
    <!-- <b>ENV:&nbsp;</b> <?='ENVIROMENT';?>&nbsp;|&nbsp; -->

    <?php if( !empty($_SESSION['admin']) ){?>
			<b>User Admin:&nbsp;</b> <?=$_SESSION['admin']; ?>&nbsp;|&nbsp;
			<a href="return-admin-panel.php" style="color:white; text-decoration:underline;">VOLVER A MI PANEL</a>
		<?php }?>
</div>
<?php 
}
?>