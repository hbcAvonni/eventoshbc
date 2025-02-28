jQuery(function($) {'use strict',
	
	//Countdown js
	 $("#countdown-tribute").countdown({
		date: "11 October 2025 23:59:59",
		format: "on"
	});
	
	$("#countdown-sbk").countdown({
		date: "06 June 2025 13:59:59",
		format: "on"
	});

	//Scroll Menu
	function menuToggle()
	{
		var windowWidth = $(window).width();

		if(windowWidth > 767 ){
			$(window).on('scroll', function(){
				if( $(window).scrollTop()>405 ){
					$('.main-nav').addClass('fixed-menu animated slideInDown');
				} else {
					$('.main-nav').removeClass('fixed-menu animated slideInDown');
				}
			});
		}else{
			
			$('.main-nav').addClass('fixed-menu animated slideInDown');
				
		}
	}

	menuToggle();
	
	
	// Carousel Auto Slide Off
	$('#event-carousel, #twitter-feed, #sponsor-carousel ').carousel({
		interval: false
	});


	// Contact form validation
	document.querySelector("#main-contact-form").addEventListener("submit", async function (event) {
		event.preventDefault(); // Evita el envío tradicional del formulario
	
		let img = document.getElementById("imgUsuario");
		let formData = new FormData(this); // Captura los datos del formulario
		let fileInput = this.querySelector("input[name='foto']"); // Selecciona el input de la imagen
		let file = fileInput.files[0]; // Obtiene el archivo seleccionado
	
		if (file) {
			let reader = new FileReader();
			reader.readAsDataURL(file); // Convierte la imagen a base64
			reader.onload = async function () {
				let base64Image = reader.result.split(",")[1]; // Extrae solo la parte de datos base64
				formData.append("fotoBase64", base64Image); // Agrega la imagen al formulario
	
				let response = await fetch(event.target.action, {
					method: "POST",
					body: formData
				});
	
				let data = await response.text();
				$("#result").hide().html('<div class="status alert alert-success">' + data + '</div>').slideDown(200);
				event.target.reset(); // Borra el formulario después de enviarlo
				img.src= 'https://placehold.co/400x600';
			};
		} else {
			// Si no hay imagen, envía solo los datos del formulario
			let response = await fetch(event.target.action, {
				method: "POST",
				body: formData
			});
	
			let data = await response.text();
			$("#result").hide().html('<div class="status alert alert-success">' + data + '</div>').slideDown(200);
			event.target.reset(); // Borra el formulario después de enviarlo
			img.src= 'https://placehold.co/400x600';
		}
	});

	$( window ).resize(function() {
		menuToggle();
	});

	$(document).ready(function () {
		$('.scroll a').on('click', function (event) {	
			var target = $(this).attr('href'); // Obtiene el ID del destino
			if ($(target).length) {
				$('html, body').animate({
					scrollTop: $(target).offset().top
				}, 900);
	
				// Elimina la clase "active" de todos los elementos y la añade al clicado
				$('.scroll').removeClass('active');
				$(this).parent().addClass('active');
			}
		});
	
		// Detectar el scroll y actualizar la clase "active" en el menú
		$(window).on('scroll', function () {
			var scrollPos = $(window).scrollTop();
	
			$('.scroll a').each(function () {
				var target = $(this).attr('href');
				if ($(target).length) {
					var sectionTop = $(target).offset().top - 50; // Ajuste para detectar correctamente
					var sectionBottom = sectionTop + $(target).outerHeight();
	
					if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
						$('.scroll').removeClass('active');
						$(this).parent().addClass('active');
					}
				}
			});
		});
	});

});

function googleTranslateElementInit() {
	new google.translate.TranslateElement({ pageLanguage: 'es' }, 'google_translate_element');
}

function changeLanguage(item) {
	var lang = item.getAttribute("data-lang");
	var select = document.querySelector(".goog-te-combo");
	if (select) {
		select.value = lang;
		select.dispatchEvent(new Event("change"));
	}
}

function abrirPopPup(event) {
    var imgSrc = event.currentTarget.getAttribute("data-hover");

    var popup = document.getElementById("customPopup");
    var popupImage = document.getElementById("popupImage");

    if (!popup) {
        popup = document.createElement("div");
        popup.id = "customPopup";
        popup.className = "popup-container";

        popupImage = document.createElement("img");
        popupImage.id = "popupImage";
        popupImage.className = "popup-image";

        var closeButton = document.createElement("span");
        closeButton.innerHTML = "&times;";
        closeButton.className = "popup-close";

        closeButton.onclick = function() {
            popup.style.display = "none";
        };

        popup.appendChild(closeButton);
        popup.appendChild(popupImage);
        document.body.appendChild(popup);

        // **Evento para cerrar el popup al hacer clic fuera de la imagen**
        popup.addEventListener("click", function(e) {
            if (e.target === popup) {
                popup.style.display = "none";
            }
        });
    }

    popupImage.src = imgSrc;
    popup.style.display = "flex";
}

function validateEmail() {
	$email = $("#email").val();
	if ($email == "") {
		return false;
	}
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	return emailReg.test($email);
}