var Inversores = function () {
	var handleInversion = function () {

		function format(state) {
			if (!state.id) return state.text;
			return "<img class='flag' src='../assets/img/flags/" + state.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + state.text;
		}

		$('#select2_sample').select2({
			placeholder: "::-- Tipo de Inversión --::",
			allowClear: true
		});

		$("#select2_sample2").select2({
			placeholder: '<i class="icon-map-marker"></i>&nbsp;Seleccione su pais',
			allowClear: true,
			formatResult: format,
			formatSelection: format,
			escapeMarkup: function (m) {
				return m;
			}
		});

		$('#select2_sample2').change(function () {
			$('.inversion-form').validate().element($(this));
		});

		$('.inversion-form').validate({
			errorElement: 'label',
			errorClass: 'help-inline',
			focusInvalid: false,
			ignore: "",
			rules: {

				address: {
					required: true
				},
				city: {
					required: true
				},
				country: {
					required: true
				},
				monto: {
					required: true
				}
			},

			invalidHandler: function (event, validator) {  

			},

			highlight: function (element) {
				$(element)
					.closest('.control-group').addClass('error');
			},

			success: function (label) {
				label.closest('.control-group').removeClass('error');
				label.remove();
			},

			errorPlacement: function (error, element) {
				if (element.attr("name") == "tnc") {                
					error.addClass('help-small no-left-padding').insertAfter($('#register_tnc_error'));
				} else if (element.closest('.input-icon').size() === 1) {
					error.addClass('help-small no-left-padding').insertAfter(element.closest('.input-icon'));
				} else {
					error.addClass('help-small no-left-padding').insertAfter(element);
				}
			},

			submitHandler: function (form) {
				form.submit();
			}
		});

		$('.inversion-form input').keypress(function (e) {
			if (e.which == 13) {
				if ($('.inversion-form').validate().form()) {
					$('.inversion-form').submit();
				}
				return false;
			}
		});

		jQuery('#register-btn').click(function () {
			jQuery('.login-form').hide();
			jQuery('.inversion-form').show();
		});
		jQuery('#register-back-btn').click(function () {
			jQuery('.login-form').show();
			jQuery('.inversion-form').hide();
		});
	}

	return {
		init: function () {
			handleInversion();

			$.backstretch([
				"../assets/img/bg/1.jpg",
				"../assets/img/bg/2.jpg",
				"../assets/img/bg/3.jpg",
				"../assets/img/bg/4.jpg"
			], {
				fade: 1000,
				duration: 8000
			});
		}
	};
}();

function verificarCorreo() {
	var pConfirmacionCorreo = document.getElementById('confirmacionCorreo');
	var btnReenviarCorreo = document.getElementById('reenviarCorreo');
	var btnConfirmarCorreo = document.getElementById('confirmarCorreo');

	fetch('../../../ajax/ajax-correo-verificacion.php', {
		method: 'GET'
	})
	.then(response => response.json())
	.then(data => {
		pConfirmacionCorreo.innerHTML = data.message;
		btnReenviarCorreo.style.display = "block";
		btnConfirmarCorreo.style.display = "none";
	})
	.catch(error => {
		pConfirmacionCorreo.innerHTML = error;
		btnReenviarCorreo.style.display = "block";
		btnConfirmarCorreo.style.display = "none";
	});
}

$('#confirmarCorreo').off('click').on('click', function () {
	verificarCorreo();
});

/**
 * Formatea un número con separadores de miles y decimales personalizables.
 * @param {number} number - El número a formatear.
 * @param {number} [decimals=0] - La cantidad de decimales a mostrar (por defecto, 0).
 * @param {string} [decPoint=','] - El separador decimal (por defecto, ',').
 * @param {string} [thousandsSep='.'] - El separador de miles (por defecto, '.').
 * @returns {string} - El número formateado como cadena.
 */
function numberFormat(number, decimals = 0, decPoint = ',', thousandsSep = '.') {
    // Validar que number sea un número
    if (isNaN(number) || number === '' || number === null) {
        return '';
    }

    // Redondear el número al número especificado de decimales
    number = parseFloat(number.toFixed(decimals));

    // Convertir el número a una cadena y separar los miles
    var parts = number.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSep);

    // Unir la parte entera y decimal con el separador decimal
    var result = parts.join(decPoint);

    return result;
}

/**
 * Realiza los cálculos de inversión basados en el monto ingresado.
 * Calcula el incentivo (20% del monto), el descuento del promotor (3% del incentivo)
 * y el total resultante después de aplicar ambos valores.
 *
 * @param {HTMLInputElement} data - El campo de entrada que contiene el monto de la inversión.
 */
function calculosInversion(data) {
	var spanError = document.getElementById('spanError');

	var monto = parseFloat(data.value);
	var min = parseFloat(data.getAttribute('data-min'));
	var inputIncentivo = document.getElementById('incentivo');
	var inputPromotor = document.getElementById('promotor');
	var inputTotal = document.getElementById('total');

	if (monto >= min) {
		spanError.textContent = "";

		var incentivo = (monto * 0.2);
		var promotor = (incentivo * 0.03);
		var total = (monto + incentivo - promotor);

		inputIncentivo.value = numberFormat(incentivo, 0, ',', '.') + " (Incentivo)";
		inputPromotor.value = "-" + numberFormat(promotor, 0, ',', '.') + " (Menos el 3% del incentivo para el promotor)";
		inputTotal.value = numberFormat(total, 0, ',', '.') + " (Total a recibir)";
	} else {
		spanError.textContent = "El monto ingresado debe ser mayor o igual a € " + numberFormat(min, 0, ',', '.');
		inputIncentivo.value = "";
		inputPromotor.value = "";
		inputTotal.value = "";
	}
}