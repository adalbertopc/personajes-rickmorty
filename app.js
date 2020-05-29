const formulario = document.querySelector('.formulario');
formulario.addEventListener('submit', cargarNombres);

// separar las funciones
function cargarNombres(e) {
	e.preventDefault();
	const statusSelect = document.querySelector('#status');
	const statusSelected = statusSelect.options[statusSelect.selectedIndex].value;

	const genderSelect = document.querySelector('#gender');

	const genderSelected = genderSelect.options[genderSelect.selectedIndex].value;

    let cantidad = Number(document.querySelector('#cantidad').value);
    
    if (cantidad === 0){
        cantidad =1000;
    }
    
	let parametros = '';
	if (statusSelected !== '') {
		parametros += `&status=${statusSelected}`;
		if (genderSelected !== '') {
			parametros += `&gender=${genderSelected}`;
		}
	} else if (genderSelected !== '') {
		parametros += `&gender=${genderSelected}`;
	}
	//limpiar
	while (document.querySelector('.generados').firstChild) {
		document
			.querySelector('.generados')
			.removeChild(document.querySelector('.generados').firstChild);
	}

	for (let i = 1; i < 32; i++) {
		const xhr = new XMLHttpRequest();
		let url = `https://rickandmortyapi.com/api/character/?page=${i}${parametros}`;

		xhr.open('GET', url, false);

		xhr.onload = function () {
			if (this.status === 200) {
				const obj = JSON.parse(this.responseText);
				const personajes = obj.results;
				personajes.forEach((personaje) => {
					if (document.querySelector('.generados').childElementCount < cantidad) {
						const p = document.createElement('p');
						p.innerHTML = `${personaje.name}`;
						document.querySelector('.generados').appendChild(p);
					}
				});
			}
		};

		xhr.send();
		if (xhr.status === 404) {
			break;
		}
	}
}
