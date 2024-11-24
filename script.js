const baseUrl = "http://localhost:8000/";
const vista = document.getElementById("vista");

// Navegación
document.getElementById("btnUsuarios").addEventListener("click", () => cargarUsuarios());
document.getElementById("btnVehiculos").addEventListener("click", () => cargarVehiculos());
document.getElementById("btnCeldas").addEventListener("click", () => cargarCeldas());
document.getElementById("btnPagos").addEventListener("click", () => cargarPagos());

// Función para cargar la gestión de usuarios
async function cargarUsuarios() {
  vista.innerHTML = `
    <h2>Gestión de Usuarios</h2>
    <form id="formUsuario">
      <input type="text" name="id" placeholder="ID del Usuario" required>
      <input type="text" name="nombre" placeholder="Nombre del Usuario" required>
      <input type="email" name="correo" placeholder="Correo Electrónico" required>
      <input type="tel" name="telefono" placeholder="Teléfono" required>
      <button type="submit">Crear Usuario</button>
    </form>
    <div id="listaUsuarios"></div>
  `;

  document.getElementById("formUsuario").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const usuario = {
      id: form.id.value,
      nombre: form.nombre.value,
      correo: form.correo.value,
      telefono: form.telefono.value,
    };
    try {
      const res = await fetch(`${baseUrl}usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });
      if (res.ok) {
        alert("Usuario creado exitosamente");
        cargarUsuarios();
      } else {
        alert("Error al crear el usuario");
      }
    } catch (error) {
      console.error("Error al crear usuario: ", error);
    }
  });

  // Cargar lista de usuarios
  try {
    const res = await fetch(`${baseUrl}usuarios`);
    const usuarios = await res.json();
    const lista = document.getElementById("listaUsuarios");
    lista.innerHTML = `<h3>Usuarios Registrados</h3>`;
    lista.innerHTML += `
      <table>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Teléfono</th>
        </tr>
        ${usuarios.map(u => `
          <tr>
            <td>${u.id}</td>
            <td>${u.nombre}</td>
            <td>${u.correo}</td>
            <td>${u.telefono}</td>
          </tr>
        `).join('')}
      </table>
    `;
  } catch (error) {
    console.error("Error al cargar usuarios: ", error);
  }
}

// Función para cargar la gestión de vehículos
async function cargarVehiculos() {
  vista.innerHTML = `
    <h2>Gestión de Vehículos</h2>
    <form id="formVehiculo">
      <input type="text" name="placa" placeholder="Placa del Vehículo" required>
      <input type="text" name="usuario_id" placeholder="ID del Usuario" required>
      <button type="submit">Registrar Vehículo</button>
    </form>
    <div id="listaVehiculos"></div>
  `;

  document.getElementById("formVehiculo").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const vehiculo = {
      placa: form.placa.value,
      usuario_id: form.usuario_id.value,
    };
    try {
      const res = await fetch(`${baseUrl}vehiculos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vehiculo),
      });
      if (res.ok) {
        alert("Vehículo registrado exitosamente");
        cargarVehiculos();
      } else {
        alert("Error al registrar el vehículo");
      }
    } catch (error) {
      console.error("Error al registrar vehículo: ", error);
    }
  });

  // Cargar lista de vehículos
  try {
    const res = await fetch(`${baseUrl}vehiculos`);
    const vehiculos = await res.json();
    const lista = document.getElementById("listaVehiculos");
    lista.innerHTML = `<h3>Vehículos Registrados</h3>`;
    lista.innerHTML += `
      <table>
        <tr>
          <th>Placa</th>
          <th>ID Usuario</th>
          <th>Fecha Entrada</th>
          <th>Fecha Salida</th>
        </tr>
        ${vehiculos.map(v => `
          <tr>
            <td>${v.placa}</td>
            <td>${v.usuario_id}</td>
            <td>${v.fecha_entrada}</td>
            <td>${v.fecha_salida || "Pendiente"}</td>
          </tr>
        `).join('')}
      </table>
    `;
  } catch (error) {
    console.error("Error al cargar vehículos: ", error);
  }
}

// Función para cargar la gestión de celdas
async function cargarCeldas() {
  vista.innerHTML = `
    <h2>Gestión de Celdas</h2>
    <form id="formCelda">
      <input type="text" name="id" placeholder="ID de la Celda" required>
      <input type="text" name="descripcion" placeholder="Descripción" required>
      <button type="submit">Registrar Celda</button>
    </form>
    <div id="listaCeldas"></div>
  `;

  document.getElementById("formCelda").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const celda = {
      id: form.id.value,
      descripcion: form.descripcion.value,
    };
    try {
      const res = await fetch(`${baseUrl}celdas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(celda),
      });
      if (res.ok) {
        alert("Celda registrada exitosamente");
        cargarCeldas();
      } else {
        alert("Error al registrar la celda");
      }
    } catch (error) {
      console.error("Error al registrar celda: ", error);
    }
  });

  // Cargar lista de celdas
  try {
    const res = await fetch(`${baseUrl}celdas`);
    const celdas = await res.json();
    const lista = document.getElementById("listaCeldas");
    lista.innerHTML = `<h3>Celdas Registradas</h3>`;
    lista.innerHTML += `
      <table>
        <tr>
          <th>ID</th>
          <th>Descripción</th>
          <th>Estado</th>
          <th>Vehículo Asignado</th>
        </tr>
        ${celdas.map(c => `
          <tr>
            <td>${c.id}</td>
            <td>${c.descripcion}</td>
            <td>${c.estado}</td>
            <td>${c.vehiculo_id || "Ninguno"}</td>
          </tr>
        `).join('')}
      </table>
    `;
  } catch (error) {
    console.error("Error al cargar celdas: ", error);
  }
}

// Función para cargar la gestión de pagos
async function cargarPagos() {
  vista.innerHTML = `
    <h2>Gestión de Pagos</h2>
    <form id="formPago">
      <input type="text" name="vehiculo_id" placeholder="ID del Vehículo" required>
      <input type="number" name="monto" placeholder="Monto" required>
      <button type="submit">Registrar Pago</button>
    </form>
    <div id="listaPagos"></div>
  `;

  document.getElementById("formPago").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const pago = {
      vehiculo_id: form.vehiculo_id.value,
      monto: parseFloat(form.monto.value),
    };
    try {
      const res = await fetch(`${baseUrl}pagos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pago),
      });
      if (res.ok) {
        alert("Pago registrado exitosamente");
        cargarPagos();
      } else {
        alert("Error al registrar el pago");
      }
    } catch (error) {
      console.error("Error al registrar pago: ", error);
    }
  });

  // Cargar lista de pagos
  try {
    const res = await fetch(`${baseUrl}pagos`);
    const pagos = await res.json();
    const lista = document.getElementById("listaPagos");
    lista.innerHTML = `<h3>Pagos Registrados</h3>`;
    lista.innerHTML += `
      <table>
        <tr>
          <th>ID Pago</th>
          <th>ID Vehículo</th>
          <th>Monto</th>
          <th>Fecha</th>
        </tr>
        ${pagos.map(p => `
          <tr>
            <td>${p.id}</td>
            <td>${p.vehiculo_id}</td>
            <td>${p.monto}</td>
            <td>${p.fecha}</td>
          </tr>
        `).join('')}
      </table>
    `;
  } catch (error) {
    console.error("Error al cargar pagos: ", error);
  }
}
