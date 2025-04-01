<div class="modal fade" id="modalVerificacion" tabindex="-1"   role="dialog" data-backdrop="static" aria-labelledby="modalVerificacionLabel" aria-hidden="true">
	<div class="modal-dialog" style="max-width: 1350px">
		<div class="modal-content" style="border-radius: 20px;max-width: 1350px!important; ">

			<div class="modal-header panel-heading-purple">
				<h4 class="modal-title" id="modalVerificacionLabel">VALIDAR INFORMCIÓN</h4>
			</div>

			<div class="modal-body">
				<p id="confirmacionCorreo" style="font-size: 18px; text-align: center; color: #fff; margin: 10px 0;">
					✉️ Para iniciar a operar en nuestra plataforma, enviaremos un correo 
					de verificación a tu correo registrado <b>(<?=$_SESSION["datosUsuario"]["usr_email"]?>)</b>.<br>
					Por favor revisa tu correo y sigue las instrucciones.  
					Si no lo encuentras, revisa tu carpeta de spam.
				</p>
			</div>

			<div class="modal-footer-veri">
				<button id="reenviarCorreo" onclick="verificarCorreo()" style="display: none;" class="btn btn-secondary">Reenviar correo</button>
				<button type="button" class="btn btn-primary" id="confirmarCorreo">Confirmar</button>
			</div>
		</div>
	</div>
</div>