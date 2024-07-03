class Persona {
    constructor(id, nombre, apellido, edad) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
}

class Empleado extends Persona {
    constructor(id, nombre, apellido, edad, sueldo, ventas) {
        super(id, nombre, apellido, edad);
        this.sueldo = sueldo;
        this.ventas = ventas;
    }
}

class Cliente extends Persona {
    constructor(id, nombre, apellido, edad, compras, telefono) {
        super(id, nombre, apellido, edad);
        this.compras = compras;
        this.telefono = telefono;
    }
}



let listaElementos = [];





function mostrarSpinner() {
    document.getElementById('spinner').style.display = 'block';
}
function ocultarSpinner() {
    
    document.getElementById('spinner').style.display = 'none';
}


function mostrarFormularioLista() {

    
        document.getElementById('formularioLista').classList.remove('hidden');
        document.getElementById('formularioABM').classList.add('hidden');
        document.getElementById('spinner').style.display = 'none';
        renderizarTabla();
     
    
}

function mostrarFormularioABM(accion, elemento = {}) {
    
    document.getElementById('accionABM').textContent = accion;

    
    document.getElementById('formularioLista').classList.add('hidden');
    document.getElementById('formularioABM').classList.remove('hidden');

    
    document.getElementById('tipo-container').style.display = 'none';

    
    document.getElementById('id').value = elemento.id || '';
    document.getElementById('nombre').value = elemento.nombre || '';
    document.getElementById('apellido').value = elemento.apellido || '';
    document.getElementById('edad').value = elemento.edad || '';

    
    const sueldoContainer = document.getElementById('sueldo-container');
    const sueldoInput = document.getElementById('sueldo');
    const comprasContainer = document.getElementById('compras-container');
    const comprasInput = document.getElementById('compras');
    const ventasContainer = document.getElementById('ventas-container');
    const ventasInput = document.getElementById('ventas');
    const telefonoContainer = document.getElementById('telefono-container');
    const telefonoInput = document.getElementById('telefono');

    
    if ('sueldo' in elemento || 'ventas' in elemento) {
        
        sueldoContainer.style.display = 'block';
        sueldoInput.value = elemento.sueldo || '';

        ventasContainer.style.display = 'block';
        ventasInput.value = elemento.ventas || '';

        comprasContainer.style.display = 'none';
        comprasInput.value = '';

        telefonoContainer.style.display = 'none';
        telefonoInput.value = '';
    } else if ('compras' in elemento || 'telefono' in elemento) {
        
        comprasContainer.style.display = 'block';
        comprasInput.value = elemento.compras || '';

        telefonoContainer.style.display = 'block';
        telefonoInput.value = elemento.telefono || '';

        sueldoContainer.style.display = 'none';
        sueldoInput.value = '';

        ventasContainer.style.display = 'none';
        ventasInput.value = '';
    } else {
        
        sueldoContainer.style.display = 'none';
        sueldoInput.value = '';

        comprasContainer.style.display = 'none';
        comprasInput.value = '';

        ventasContainer.style.display = 'none';
        ventasInput.value = '';

        telefonoContainer.style.display = 'none';
        telefonoInput.value = '';
    }
}

function mostrarFormularioAlta() {
    mostrarFormularioABM('Alta');
    document.getElementById('nombre-container').style.display = 'block';
    document.getElementById('apellido-container').style.display = 'block';
    document.getElementById('edad-container').style.display = 'block';
    document.getElementById('tipo-container').style.display = 'block';
    document.getElementById('sueldo-container').style.display = 'none';
    document.getElementById('compras-container').style.display = 'none';
    document.getElementById('ventas-container').style.display = 'none';
    document.getElementById('telefono-container').style.display = 'none';
}

function mostrarCamposTipo() {
    const tipoSelect = document.getElementById('tipo').value;
    const sueldoContainer = document.getElementById('sueldo-container');
    const comprasContainer = document.getElementById('compras-container');
    const ventasContainer = document.getElementById('ventas-container');
    const telefonoContainer = document.getElementById('telefono-container');
    const aceptarBtn = document.getElementById('aceptar-btn');
    const cancelarBtn = document.getElementById('cancelar-btn');

    if (tipoSelect === 'empleado') {
        sueldoContainer.style.display = 'block';
        ventasContainer.style.display = 'block';
        comprasContainer.style.display = 'none';
        telefonoContainer.style.display = 'none';
        aceptarBtn.style.display = 'block';
        cancelarBtn.style.display = 'block';
    } else if (tipoSelect === 'cliente') {
        comprasContainer.style.display = 'block';
        telefonoContainer.style.display = 'block';
        sueldoContainer.style.display = 'none';
        ventasContainer.style.display = 'none';
        aceptarBtn.style.display = 'block';
        cancelarBtn.style.display = 'block';
    } else {
        sueldoContainer.style.display = 'none';
        comprasContainer.style.display = 'none';
        ventasContainer.style.display = 'none';
        telefonoContainer.style.display = 'none';
        aceptarBtn.style.display = 'none';
        cancelarBtn.style.display = 'none';
    }
    aceptarBtn.style.float = 'left';
    aceptarBtn.style.marginRight = '10px';
}

function renderizarTabla() {
    const tbody = document.getElementById('tablaElementos').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    listaElementos.forEach(elemento => {
        const fila = tbody.insertRow();
        fila.insertCell().textContent = elemento.id;
        fila.insertCell().textContent = elemento.nombre;
        fila.insertCell().textContent = elemento.apellido;
        fila.insertCell().textContent = elemento.edad;
        fila.insertCell().textContent = elemento.sueldo || 'N/A';
        fila.insertCell().textContent = elemento.compras || 'N/A';
        fila.insertCell().textContent = elemento.ventas || 'N/A';
        fila.insertCell().textContent = elemento.telefono || 'N/A';

        const celdaAcciones = fila.insertCell();
        const botonModificar = document.createElement('button');
        botonModificar.textContent = 'Modificar';
        botonModificar.onclick = () => mostrarFormularioABM('Modificar', elemento);
        celdaAcciones.appendChild(botonModificar);
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.onclick = () => mostrarFormularioABM('Eliminar', elemento);
        celdaAcciones.appendChild(botonEliminar);
    });
}

function obtenerPersonas() {
    mostrarSpinner();
    setTimeout(function() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'PersonasEmpleadosClientes.php', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            ocultarSpinner();
            if (xhr.status === 200) {
                listaElementos = JSON.parse(xhr.responseText);
                mostrarFormularioLista();
            } else {
                alert('No se pudo obtener la lista de personas.');
            }
        };
        xhr.onerror = function() {
            ocultarSpinner();
            alert('Error de red al intentar obtener la lista de personas.');
        };
        xhr.send();
    }, 2000); 
}


function agregarPersona(elemento) {
    
    mostrarSpinner();
    setTimeout(function() {
        
        fetch('PersonasEmpleadosClientes.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(elemento)//lo paso a una cadena JSON y lo mando como el cuerpo de la solicitud
        })
        .then(response => {//espero al servidor
            
            ocultarSpinner();

            if (response.ok) {
                return response.json(); 
            } else {
                throw new Error('No se pudo agregar la persona.');
            }
        })
        .then(respuesta => {
            // actualiza el ID con el valor q da el servidor
            elemento.id = respuesta.id;
            listaElementos.push(elemento);

            // mostrar el formulario de lista actualizado
            mostrarFormularioLista();
        })
        .catch(error => {
            console.error('Error al agregar persona:', error);
            alert('Error al agregar la persona. Por favor, intenta nuevamente.');

            ocultarSpinner();
            mostrarFormularioLista(); 
        });
    }, 2000);
}



async function modificarPersona(elemento) {
    mostrarSpinner();
    
    try {
        const response = await fetch('PersonasEmpleadosClientes.php', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(elemento)
        });

        if (!response.ok) {
            throw new Error('No se pudo modificar la persona.');
        }

        const respuesta = await response.json();

        
        const indice = listaElementos.findIndex(e => e.id === respuesta.id);
        if (indice !== -1) {
            listaElementos[indice] = respuesta;
            
        }

        // Actualizar datos.json con la lista de personas obtenida
        const updateResponse = await fetch('PersonasEmpleadosClientes.php', {
            method: 'GET'
        });

        if (!updateResponse.ok) {
            throw new Error('Error al obtener la lista de personas del servidor');
        }

        const personas = await updateResponse.json();
        
        const actualizarResponse = await fetch('PersonasEmpleadosClientes.php', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(personas)
        });

        if (!actualizarResponse.ok) {
            throw new Error('Error al actualizar datos.json');
        }

        setTimeout(() => {
            ocultarSpinner();
            mostrarFormularioLista(); 
        }, 1000); 

    } catch (error) {
        console.error('Error al modificar persona o actualizar datos.json:', error);
        alert('Error al modificar la persona o actualizar datos.json. Por favor, intenta nuevamente.');

        ocultarSpinner();
        mostrarFormularioLista(); // Mostrar nuevamente el formulario de lista
    }
}






function eliminarPersona(id) {
    mostrarSpinner();
    setTimeout(function() {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', 'PersonasEmpleadosClientes.php', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            ocultarSpinner();
            if (xhr.status === 200) {
                listaElementos = listaElementos.filter(e => e.id !== id);//filtro listaElementos para eliminar el elemento con el ID que pase
                mostrarFormularioLista();
            } else {
                alert('No se pudo eliminar la persona.');
            }
        };
        xhr.onerror = function() {
            ocultarSpinner();
            alert('Error de red al intentar eliminar la persona.');
        };
        xhr.send(JSON.stringify({ id }));
    }, 2000); 
}


function aceptarABM() {
    const accion = document.getElementById('accionABM').textContent.toLowerCase();
    const id = document.getElementById('id').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = document.getElementById('edad').value;
    const sueldo = document.getElementById('sueldo').value;
    const compras = document.getElementById('compras').value;
    const ventas = document.getElementById('ventas').value;
    const telefono = document.getElementById('telefono').value;
    

    const elemento = {
        id,
        nombre,
        edad,
        apellido,
        ...(compras ? { compras, telefono } : {}),  // agrega compras solo si existe
        ...(ventas ? { sueldo, ventas } : {})  // agrega sueldo y ventas solo si ventas existe
    };

    

    if (accion === 'alta') {
        agregarPersona(elemento);
    } else if (accion === 'modificar') {
        modificarPersona(elemento);
    } else if (accion === 'eliminar') {
        eliminarPersona(id);
    }
}

function cancelarABM() {
    mostrarFormularioLista();
}


obtenerPersonas();

            
