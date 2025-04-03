<script src="../assets/plugins/jquery-1.10.1.min.js" type="text/javascript"></script>
<script src="../assets/plugins/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>
<script src="../assets/plugins/jquery-ui/jquery-ui-1.10.1.custom.min.js" type="text/javascript"></script>
<script src="../assets/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="../assets/plugins/bootstrap-hover-dropdown/twitter-bootstrap-hover-dropdown.min.js" type="text/javascript"></script>

<script src="../assets/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
<script src="../assets/plugins/jquery.blockui.min.js" type="text/javascript"></script>
<script src="../assets/plugins/jquery.cookie.min.js" type="text/javascript"></script>
<script src="../assets/plugins/uniform/jquery.uniform.min.js" type="text/javascript"></script>
<script src="../assets/plugins/backstretch/jquery.backstretch.min.js" type="text/javascript"></script>
<script src="../assets/plugins/jquery-validation/dist/jquery.validate.min.js" type="text/javascript"></script>
<script src="../assets/plugins/select2/select2.min.js" type="text/javascript"></script>

<!-- BEGIN PAGE LEVEL SCRIPTS -->
<script src="../assets/scripts/app.js"></script>
<script src="../assets/scripts/inversores.js"></script>
<script>
	jQuery(document).ready(function() {
		<?php if ($_SESSION["datosUsuario"]["usr_correo_verificado"] == NO) { ?>
			$('#modalVerificacion').modal('show');
		<?php }?>
		App.init();
		Inversores.init();
	});
</script>