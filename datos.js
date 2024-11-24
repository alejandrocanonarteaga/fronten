const baseUrl = "http://localhost:8000/";
const contenedor = document.getElementById("contenedor");

// Función para cargar usuarios
async function cargarUsuarios() {
  contenedor.innerHTML = "<h2>Cargando usuarios...</h2>";
  try {
    const res = await fetch(`${baseUrl}usuarios`, { method: "GET" });
    if (!res.ok) {
      throw new Error(`Error al obtener usuarios: ${res.status} ${res.statusText}`);
    }
    const usuarios = await res.json();

    // Filtrar datos vacíos y mostrar solo usuarios válidos
    const usuariosValidos = usuarios.filter(u => u.id && u.nombre && u.correo && u.telefono);

    // Mostrar la tabla con los datos correctos
    mostrarTabla("Usuarios Registrados", ["ID", "Nombre", "Correo", "Teléfono"], 
      usuariosValidos.map(u => [u.id, u.nombre, u.correo, u.telefono]));
  } catch (error) {
    console.error(error);
    contenedor.innerHTML = "<h2>Error al cargar usuarios.</h2>";
  }
}

// Función para cargar vehículos
async function cargarVehiculos() {
  contenedor.innerHTML = "<h2>Cargando vehículos...</h2>";
  try {
    const res = await fetch(`${baseUrl}vehiculos`, { method: "GET" });
    if (!res.ok) {
      throw new Error(`Error al obtener vehículos: ${res.status} ${res.statusText}`);
    }
    const vehiculos = await res.json();

    // Mostrar la tabla con los datos correctos
    mostrarTabla("Vehículos Registrados", ["Placa", "ID Usuario", "Fecha Entrada", "Fecha Salida"], 
      vehiculos.map(v => [v.placa, v.usuario_id, v.fecha_entrada, v.fecha_salida]));
  } catch (error) {
    console.error(error);
    contenedor.innerHTML = "<h2>Error al cargar vehículos.</h2>";
  }
}

// Función para cargar celdas
async function cargarCeldas() {
  contenedor.innerHTML = "<h2>Cargando celdas...</h2>";
  try {
    const res = await fetch(`${baseUrl}celdas`, { method: "GET" });
    if (!res.ok) {
      throw new Error(`Error al obtener celdas: ${res.status} ${res.statusText}`);
    }
    const celdas = await res.json();

    // Mostrar la tabla con los datos correctos
    mostrarTabla("Celdas Registradas", ["ID", "Estado", "Vehículo Asignado"], 
      celdas.map(c => [c.id, c.estado, c.vehiculo_id || "Ninguno"]));
  } catch (error) {
    console.error(error);
    contenedor.innerHTML = "<h2>Error al cargar celdas.</h2>";
  }
}

// Función para cargar pagos
async function cargarPagos() {
  contenedor.innerHTML = "<h2>Cargando pagos...</h2>";
  try {
    const res = await fetch(`${baseUrl}pagos`, { method: "GET" });
    if (!res.ok) {
      throw new Error(`Error al obtener pagos: ${res.status} ${res.statusText}`);
    }

    // Imprime la respuesta para depurar
    const pagos = await res.json();
    console.log(pagos);  // Esto te ayudará a ver la estructura de los datos recibidos.

    // Verifica si la respuesta es un arreglo y tiene datos
    if (!Array.isArray(pagos) || pagos.length === 0) {
      throw new Error("No se encontraron pagos.");
    }

    // Mostrar la tabla con los datos correctos (ajusta los campos según la API)
    mostrarTabla("Pagos Registrados", ["ID Vehículo", "Monto", "Fecha de Pago"], 
      pagos.map(p => [p.vehiculo_id, p.monto, new Date(p.fecha_pago).toLocaleString()]));
  } catch (error) {
    console.error(error);
    contenedor.innerHTML = "<h2>Error al cargar pagos.</h2>";
  }
}


// Función para mostrar la tabla de datos
function mostrarTabla(titulo, encabezados, datos) {
  let tablaHTML = `<h3>${titulo}</h3><table><tr>`;
  
  // Agregar encabezados
  encabezados.forEach(header => {
    tablaHTML += `<th>${header}</th>`;
  });
  
  tablaHTML += "</tr>";
  
  // Agregar filas de datos
  datos.forEach(fila => {
    tablaHTML += "<tr>";
    fila.forEach(celda => {
      tablaHTML += `<td>${celda}</td>`;
    });
    tablaHTML += "</tr>";
  });
  
  tablaHTML += "</table>";
  contenedor.innerHTML = tablaHTML;
}

// Función para navegar y cargar las diferentes secciones
document.getElementById("btnUsuarios").addEventListener("click", () => cargarUsuarios());
document.getElementById("btnVehiculos").addEventListener("click", () => cargarVehiculos());
document.getElementById("btnCeldas").addEventListener("click", () => cargarCeldas());
document.getElementById("btnPagos").addEventListener("click", () => cargarPagos());

// Inicialización
cargarUsuarios();  // Puedes llamarlo cuando lo necesites para cargar la vista inicial
