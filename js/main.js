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
	var form = $('.contact-form');
	form.submit(function () {'use strict',
		$this = $(this);
		$.post($(this).attr('action'), function(data) {
			$this.prev().text(data.message).fadeIn().delay(3000).fadeOut();
		},'json');
		return false;
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