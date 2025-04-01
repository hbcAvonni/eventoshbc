function mostrarOcultarClave() {
    var campo = document.getElementById("passwordInput");
    var icoVer = document.getElementById("icoVer");

    if (campo.type === "password") {
        campo.type = "text";
        icoVer.classList.remove("icon-eye-open");
        icoVer.classList.add("icon-eye-close");
    } else {
        campo.type = "password";
        icoVer.classList.remove("icon-eye-close");
        icoVer.classList.add("icon-eye-open");
    }
}

function habilitarClave() {
    var cambiarClave = document.getElementById("cambiarClave");
    var clave = document.getElementById("passwordInput");
    var icoVer = document.getElementById("icoVer");
    
    if (cambiarClave.checked) {
        clave.disabled = false;
        clave.required = 'required';
        icoVer.style.display = 'contents';
    } else {
        clave.disabled = true;
        clave.required = '';
        clave.value = '';
        icoVer.style.display = 'none';
    }
}