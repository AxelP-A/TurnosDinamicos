class Clinica {
	constructor(nombre, cantidadPersonas, tiempoEspera, idPersonas, idTiempoEspera) {
		this.nombre = nombre;
		this.cantidadPersonas = cantidadPersonas;
		this.tiempoEspera = tiempoEspera;
		this.idPersonas = idPersonas;
		this.idTiempoEspera = idTiempoEspera;
	}
}

const clinicaDelSol = new Clinica("Clínica del Sol", 0, 0, "#clinica-del-sol-personas", "#clinica-del-sol-tiempo");
const clinicaPrivada = new Clinica("Clínica Privada", 0, 0, "#clinica-privada-personas", "#clinica-privada-tiempo");
const sanatorioCentral = new Clinica("Sanatorio Central", 0, 0, "#sanatorio-central-personas", "#sanatorio-central-tiempo");
const hospitalPrivadoSantaClara = new Clinica("Hospital Privado Santa Clara", 0, 0, "#hospital-privado-santa-clara-personas", "#hospital-privado-santa-clara-tiempo");

let sedes = [clinicaDelSol, clinicaPrivada, sanatorioCentral, hospitalPrivadoSantaClara];

function actualizarSede() {
	let sedeElegida = document.getElementById("inputSedeElegida").value;
	for (i = 0; i <= sedes.length; i++) {
		if (sedes[i] !== undefined) {
			if (sedeElegida == sedes[i].nombre) {
				sedes[i].cantidadPersonas++;
				sedes[i].tiempoEspera += 10;
				document.querySelector(sedes[i].idPersonas).textContent = sedes[i].cantidadPersonas;
				mostrarEspera(sedes[i].tiempoEspera, sedes[i].idTiempoEspera);
				break;
			}
		}
	}
}

function eliminarTurno(pacienteSede) {
	for (i = 0; i <= sedes.length - 1; i++) {
		if (pacienteSede == sedes[i].nombre) {
			sedes[i].cantidadPersonas--;
			sedes[i].tiempoEspera -= 10;
			document.querySelector(sedes[i].idPersonas).textContent = sedes[i].cantidadPersonas;
			mostrarEspera(sedes[i].tiempoEspera, sedes[i].idTiempoEspera);
			break;
		}
	}
}

function validacionNombre(texto) {
	const nombreYapellido = /^[\w'\-,.][^0-9_!¡?÷?¿\\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.exec(texto);
	const comprobarTexto = !!nombreYapellido;
	return comprobarTexto
}

function validacionDNI(numero) {
	const dni = /^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/.exec(numero);
	const comprobarDNI = !!dni;
	return comprobarDNI
}

function mostrarEspera(tiempo, idTiempo) {

	let horas = parseInt(tiempo / 60);
	let minutos = parseInt(tiempo % 60);
	if (tiempo >= 120) {
		if (minutos > 0) {
			document.querySelector(idTiempo).textContent = "Tiempo de espera estimado " + horas + " horas y " + minutos + " minutos";
		} else {
			document.querySelector(idTiempo).textContent = "Tiempo de espera estimado " + horas + " horas";
		}
	} else if (tiempo >= 60) {
		if (minutos > 0) {
			document.querySelector(idTiempo).textContent = "Tiempo de espera estimado " + horas + " hora y " + minutos + " minutos";
		} else {
			document.querySelector(idTiempo).textContent = "Tiempo de espera estimado " + horas + " hora";
		}
	} else {
		document.querySelector(idTiempo).textContent = "Tiempo de espera estimado " + tiempo + " minutos."
	}
}

/*const disponibilidad = [
	...centros,
	...cantidadPacientes,
];*/

class Paciente {
	constructor(nombre, dniCred, sede) {
		this.nombre = nombre;
		this.dniCred = dniCred;
		this.sede = sede;
	}
}

class DOM {

	insertarPaciente(Paciente, id) {
		const turnoAsignado = document.getElementById("turno-asig");
		const elemento = document.createElement("div");
		elemento.innerHTML = ` 
        <div class ="card text-center mb-4">
            <div class="card-body">
                <strong>Nombre</strong>: ${Paciente.nombre}
                <strong>DNI/Credencial</strong>: ${Paciente.dniCred}
                <a href="#" class="btn btn-danger botonBorrar" type="click" name="del" id="'.${id}.'">Borrar Paciente</a>
            </div>
        </div>`;
		turnoAsignado.appendChild(elemento);
		this.resetForm();
	}

	exito() {
		Toastify({
			text: "Turno asignado con éxito",
			duration: 3000,
			position: "center",
			style: {
				background: "linear-gradient(to right, #00b09b, #96c93d)"
			}
		}).showToast();
	}

	resetForm() {
		document.getElementById("turnero").reset();
	}

	borrarPaciente(element, Paciente, id) {
		let quitarTurnoSede;
		console.log(id);
		console.log(Paciente);
		console.log(element);
		/*element.parentElement.parentElement.remove();*/ /* NECESIDAD DE ID PARA EVITAR TOCAR TODOS LOS BOTONES. */
		/*let elemento = document.getElementById(id);
		elemento.parentNode.removeChild(elemento);*/
		document.getElementById(id).parentElement.parentElement.remove();
		quitarTurnoSede = Paciente.sede;
		eliminarTurno(quitarTurnoSede);
	}
}

let idBotonEliminar = 0;

document.getElementById("turnero")
	.addEventListener("submit", function(e) {
		const nombre = document.getElementById("nombre").value;
		const dniCred = document.getElementById("dniCred").value;
		const sede = document.getElementById("inputSedeElegida").value;

		const paciente = new Paciente(nombre, dniCred, sede);
		const dom = new DOM();

		let mensajesErrores = document.getElementById("errores");

		if (validacionNombre(nombre) && validacionDNI(dniCred)) {
			actualizarSede();
			idBotonEliminar++;
			console.log(idBotonEliminar);
			dom.insertarPaciente(paciente, idBotonEliminar);
			dom.exito();
			mensajesErrores.innerHTML = "";
			e.preventDefault();
			/*
						document.getElementById("turno-asig")
							.addEventListener("click", function(e) {
								const dom = new DOM();
								dom.borrarPaciente(e.target, paciente);
								e.preventDefault();
								e.stopPropagation();
							});
			*/

			$(document).on('click', '.botonBorrar', function() {
				document.querySelectorAll(".botonBorrar").forEach(function(botones) {
					botones.addEventListener("click", function(boton) {
						const id = boton.target.getAttribute("id");

						dom.borrarPaciente(boton.target, paciente, id);

						e.preventDefault();
						e.stopPropagation();
					});
				});
			});

		} else {
			let errores = "";
			let errorEncontrado = false;
			mensajesErrores.innerHTML = "";

			if (!validacionNombre(nombre)) {
				errores += "* El nombre ingresado no es válido por favor, ingrese un nombre válido, sin números ni símbolos. <br> <br>";
				errorEncontrado = true;
			}
			if (!validacionDNI(dniCred)) {
				errores += "* El DNI ingresado no es válido, por favor, ingrese un DNI válido. <br> <br>";
				errorEncontrado = true;
			}
			if (errorEncontrado) {
				mensajesErrores.innerHTML = errores;
			}
			e.preventDefault();
			e.stopPropagation();
		}
	})