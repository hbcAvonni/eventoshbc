var Login = function () {

	var handleLogin = function() {
		$('.login-form').validate({
	            errorElement: 'label', //default input error message container
	            errorClass: 'help-inline', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            rules: {
	                username: {
	                    required: true
	                },
	                password: {
	                    required: true
	                },
	                remember: {
	                    required: false
	                }
	            },

	            messages: {
	                username: {
	                    required: "El usuerio es requerido."
	                },
	                password: {
	                    required: "La contaseña es requerida."
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   
	                $('.alert-error', $('.login-form')).show();
	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.control-group').addClass('error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.control-group').removeClass('error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	                error.addClass('help-small no-left-padding').insertAfter(element.closest('.input-icon'));
	            },

	            submitHandler: function (form) {
	                form.submit();
	            }
	        });

	        $('.login-form input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('.login-form').validate().form()) {
	                    $('.login-form').submit();
	                }
	                return false;
	            }
	        });
	}

	var handleForgetPassword = function () {
		$('.forget-form').validate({
	            errorElement: 'label', //default input error message container
	            errorClass: 'help-inline', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            ignore: "",
	            rules: {
	                email: {
	                    required: true
	                }
	            },

	            messages: {
	                email: {
	                    required: "Su usuario o email es requerido."
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   

	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.control-group').addClass('error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.control-group').removeClass('error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	                error.addClass('help-small no-left-padding').insertAfter(element.closest('.input-icon'));
	            },

	            submitHandler: function (form) {
	                form.submit();
	            }
	        });

	        $('.forget-form input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('.forget-form').validate().form()) {
	                    $('.forget-form').submit();
	                }
	                return false;
	            }
	        });

	        jQuery('#forget-password').click(function () {
	            jQuery('.login-form').hide();
	            jQuery('.forget-form').show();
	        });

	        jQuery('#back-btn').click(function () {
	            jQuery('.login-form').show();
	            jQuery('.forget-form').hide();
	        });

	}

	var handleRegister = function () {

		function format(state) {
            if (!state.id) return state.text; // optgroup
            return "<img class='flag' src='assets/img/flags/" + state.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + state.text;
        }

        $('#select2_sample1').select2({
            placeholder: "Selecciones una opción",
            allowClear: true
        });

		$("#select2_sample4").select2({
		  	placeholder: '<i class="icon-map-marker"></i>&nbsp;Seleccione su pais',
            allowClear: true,
            formatResult: format,
            formatSelection: format,
            escapeMarkup: function (m) {
                return m;
            }
        });


			$('#select2_sample4').change(function () {
                $('.register-form').validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
            });



         $('.register-form').validate({
	            errorElement: 'label', //default input error message container
	            errorClass: 'help-inline', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            ignore: "",
	            rules: {
	                
	                name: {
	                    required: true
	                },
	                email: {
	                    required: true,
	                    email: true
	                },
	                telephon: {
	                    required: true
	                },
	                tDoc: {
	                    required: true
	                },
	                nDoc: {
	                    required: true
	                },
	                address: {
	                    required: true
	                },
	                city: {
	                    required: true
	                },
	                country: {
	                    required: true
	                },

	                username: {
	                    required: true
	                },
	                password: {
	                    required: true
	                },
	                rpassword: {
	                    equalTo: "#register_password"
	                },

	                tnc: {
	                    required: true
	                }
	            },

	            messages: { // custom messages for radio buttons and checkboxes
	                tnc: {
	                    required: "Por favor acepte TNC primero"
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   

	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.control-group').addClass('error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.control-group').removeClass('error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	                if (element.attr("name") == "tnc") { // insert checkbox errors after the container                  
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

			$('.register-form input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('.register-form').validate().form()) {
	                    $('.register-form').submit();
	                }
	                return false;
	            }
	        });

	        jQuery('#register-btn').click(function () {
	            jQuery('.login-form').hide();
	            jQuery('.register-form').show();
	        });

	        jQuery('#register-back-btn').click(function () {
	            jQuery('.login-form').show();
	            jQuery('.register-form').hide();
	        });
	}
    
    return {
        //main function to initiate the module
        init: function () {
        	
            handleLogin();
            handleForgetPassword();
            handleRegister();        

            $.backstretch([
		        "assets/img/bg/1.jpg",
		        "assets/img/bg/2.jpg",
		        "assets/img/bg/3.jpg",
		        "assets/img/bg/4.jpg"
		        ], {
		          fade: 1000,
		          duration: 8000
		    });
	       
        }

    };

}();

function validarDocumento() {
	const tipoDocumento = document.getElementById("select2_sample1");
	const numeroDocumento = document.getElementById("nDoc");
	const spanNdocError = document.getElementById("nDoc_error");
	const btnRegister = document.getElementById("register-submit-btn");
	const tipo = tipoDocumento.value;
	const valor = numeroDocumento.value.trim();
	
	let regex;
	let mensajeError = "";

	if (tipo != ""){
		switch (tipo) {
			case "DNI":
				regex = /^[0-9]{8}[A-Za-z]$/;
				mensajeError = "El DNI debe tener 8 números seguidos de una letra (ej: 12345678Z).";
				break;

			case "PASSPORT":
				regex = /^[A-Za-z0-9]{6,9}$/;
				mensajeError = "El pasaporte debe tener entre 6 y 9 caracteres alfanuméricos.";
				break;

			case "NIF":
				regex = /^[XYZxyz]?[0-9]{7,8}[A-Za-z]$/;
				mensajeError = "El NIF debe ser como el DNI o empezar con X/Y/Z seguido de 7-8 números y una letra.";
				break;

			default:
				mensajeError = "";
				break;
		}

		if (valor != "") {
			if (!regex.test(valor)) {
				spanNdocError.innerHTML = mensajeError;
				btnRegister.disabled = true;
			} else {

				fetch('../../ajax/ajax-validar-documento.php?nDoc=' + valor, {
					method: 'GET'
				})
				.then(response => response.json())
				.then(data => {
					spanNdocError.innerHTML = data.message;
					if (data.success == 1) {
						btnRegister.disabled = true;
					} else {
						btnRegister.disabled = false;
					}
				})
				.catch(error => {
					spanNdocError.innerHTML = error;
					btnRegister.disabled = true;
				});
			}
		} else {
			spanNdocError.innerHTML = "";
		}
	} else {
		spanNdocError.innerHTML = "Escoja un tipo de documento";
	}
}

function validarEmail(data) {
	const spanEmailError = document.getElementById("email_error");
	const btnRegister = document.getElementById("register-submit-btn");
	const email = data.value.trim();

	if (email != "") {
		fetch('../../ajax/ajax-validar-email.php?email=' + email, {
			method: 'GET'
		})
		.then(response => response.json())
		.then(data => {
			spanEmailError.innerHTML = data.message;
			if (data.success == 1) {
				btnRegister.disabled = true;
			} else {
				btnRegister.disabled = false;
			}
		})
		.catch(error => {
			spanEmailError.innerHTML = error;
			btnRegister.disabled = true;
		});
	} else {
		spanEmailError.innerHTML = "";
	}
}