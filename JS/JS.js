// Clase para la creación de cada institución como variable
class Clinica {
	constructor(nombre, cantidadPersonas, tiempoEspera, idPersonas, idTiempoEspera) {
		this.nombre = nombre;
		this.cantidadPersonas = cantidadPersonas;
		this.tiempoEspera = tiempoEspera;
		this.idPersonas = idPersonas;
		this.idTiempoEspera = idTiempoEspera;
	}
}

document.getElementById("mailsProfesionales").style.display = "none";






function eliminarNodo(elementoEliminar) {

	console.log(elementoEliminar);
	let nodoEliminar = document.getElementById(elementoEliminar);
	nodoEliminar.parentNode.removeChild(nodoEliminar);
	}






// Con las siguientes declaraciones luego se arma un array donde se acumularán los pacientes
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
			if (sedes[i].cantidadPersonas > 0){
			sedes[i].cantidadPersonas--;
			sedes[i].tiempoEspera -= 10;
		}
			document.querySelector(sedes[i].idPersonas).textContent = sedes[i].cantidadPersonas;
			mostrarEspera(sedes[i].tiempoEspera, sedes[i].idTiempoEspera);
			break;
		}
	}
}

// USO DE EXPRESIONES REGULARES PARA VALIDACIÓN DE DATOS
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
        <div class ="card text-center mb-4" name="tarjetaDelCulo" id="${id}-div">
            <div class="card-body">
                <strong>Nombre</strong>: ${Paciente.nombre}
                <strong>DNI/Credencial</strong>: ${Paciente.dniCred}
				<strong>Sede</strong>: ${Paciente.sede}
                <a href="#" class="btn btn-secondary botonBorrar" type="click" name="del" id="${id}">Borrar Paciente</a>
            </div>
        </div>`;
		console.log(id);
		console.log({id});
		console.log(document.getElementsByName("tarjetaDelCulo"));
		turnoAsignado.appendChild(elemento);
		this.resetForm();
	}

	exito() {
		Toastify({
			text: "Turno asignado con éxito",
			duration: 3000,
			position: "center",
			style: {
				background: "#56cc9d"
			}
		}).showToast();
	}

	resetForm() {
		document.getElementById("turnero").reset();
	}

	borrarPaciente(element, Paciente, id) {
		let quitarTurnoSede;
		// console.log(id);
		// console.log(Paciente);
		console.log(element);
		/* NECESITO DE UN ID DINÁMICO PARA EVITAR ACTIVAR TODOS LOS BOTONES Y BORRAR TODOS LOS ELEMENTOS. */
		
		/*document.getElementById(id).parentElement.parentElement.remove();
		quitarTurnoSede = Paciente.sede;*/

		eliminarNodo(id);
		quitarTurnoSede = Paciente.sede;
		eliminarTurno(quitarTurnoSede);
	}
}

let idBotonEliminar = 0;

document.getElementById("turnero")
	.addEventListener("submit", function (e) {
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

			
			$(document).on('click', '.botonBorrar', function () {
				document.querySelectorAll(".botonBorrar").forEach(function (botones) {
					botones.addEventListener("click", function (boton) {
						const id = boton.target.getAttribute("id");
						const divId = document.getElementById(id).parentElement.parentElement.getAttribute('id');
						console.log(divId);
						
						dom.borrarPaciente(boton.target, paciente, divId);
						
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
				errores += "* El nombre ingresado no es válido, por favor ingrese un nombre válido. No debe contener números ni símbolos. <br> <br>";
				errorEncontrado = true;
			}
			if (!validacionDNI(dniCred)) {
				errores += "* El DNI ingresado no es válido, por favor, ingrese un DNI válido. <br>";
				errorEncontrado = true;
			}
			if (errorEncontrado) {
				mensajesErrores.innerHTML = errores;
			}
			e.preventDefault();
			e.stopPropagation();
		} 
	})	

//Uso de API fake para mostrar un listado de datos

/*function tablaMails(){*/

	document.getElementById("mailsBtn")
	.addEventListener("click", function () {

	document.getElementById("mailsProfesionales").style.display = "block";

let url = 'https://jsonplaceholder.typicode.com/users/';
	fetch(url)
		.then(function (response) {
				return response.json();
			})
		.then(data => mostrarData(data))
		.catch(error => console.log(error))

		const mostrarData = (data) => {
			console.log(data)
			let body = ""
			for (var i = 0; i < data.length; i++) {      
			   body+=`<tr>
			   <td>${data[i].id}</td>
			   <td>${data[i].name}</td>
			   <td>${data[i].email}</td>
			   </tr>`
			}
			document.getElementById("data").innerHTML = body;
		}
		/*return data;*/
	});