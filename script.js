// ********* clases ************

// creación de objetos
class Usuario {
  constructor(DNI, nombre, contraseña, saldo, operaciones, PremioRecibido) {
    this.DNI = DNI;
    this.nombre = nombre;
    this.contraseña = contraseña;
    this.saldo = 0;
    this.operaciones = [];
    this.PremioRecibido = false;
  }
}

// ******* Objetos ************

/* ====================================
   ===          pantallas           ===
   ====================================
*/
// ******  variables *********
// obtención de pantallas principales
const formPantallaSignup = document.getElementById("signup");
const formPantallaLogin = document.getElementById("Login");
const pantallaMain = document.getElementById("main");
// definicion de estados
const mostrar = "block";
const ocultar = "none";
// alert success deny
const alertDiv = document.getElementById("alertDiv");
// obtención y asignación de botones
const btnOpcionSignup = document.getElementById("btnSignup");
const btnOpcionLogin = document.getElementById("btnLogin");
// obtención de boton de accion registrarse
const btnAccionSignup = document.getElementById("accionRegistrarse");
const btnAccionLogin = document.getElementById("accionLogin");
// obtención boton transferir
const btnAccionTransferir = document.getElementById("enviarTransferencia");
// obtencion boton depositar
const btnAccionDepositar = document.getElementById("realizarDeposito");
// definición de alertas
const danger = "danger";
const success = "success";
const warning = "warning";
const movimiento = "light";
const divNotis = document.getElementById("movimientosRecientes");
// inicialización de pantallas
formPantallaSignup.style.display = ocultar;
formPantallaLogin.style.display = ocultar;
pantallaMain.style.display = ocultar;

let notisLogin = document.getElementById("alertDiv3");

// opción elegida ingreso
const ingresar = btnOpcionLogin.addEventListener("click", () => {
  formPantallaLogin.style.display = mostrar;
  formPantallaSignup.style.display = ocultar;
});

// opción elegida registro
const registrarse = btnOpcionSignup.addEventListener("click", () => {
  formPantallaSignup.style.display = mostrar;
  formPantallaLogin.style.display = ocultar;
});

// definicion de mensajes de alerta
function alertMsg(type, msg) {
  return `<div class="alert alert-${type}" role="alert">${msg}</div>`;
}

function esconderFormularios() {
  formPantallaLogin.style.display = ocultar;
  btnOpcionLogin.style.display = ocultar;
  btnOpcionSignup.style.display = ocultar;
}

function mostrarPantallaPrincipal() {
  pantallaMain.style.display = mostrar;
}

function saludo(User) {
  let user = User;
  // ubica div "saludo"
  let divSaludo = document.getElementById("saludo");
  divSaludo.innerHTML = `<h1>Bienvenido ${user.nombre}</h1>`;
}

function cargarSaldoAlStorage(monto) {
  let saldoActualizado = monto;
  localStorage.setItem("saldo", JSON.stringify(saldoActualizado));
  
}

function traerSaldodeLocalStorage() {
  const saldoGuardado = localStorage.getItem("saldo");
  if (saldoGuardado) {
    let saldo = JSON.parse(saldoGuardado);
    
    return saldo;
  } else {
    
    return saldoGuardado;
  }
}

function muestraDineroActual(user) {
  let montoActual = user.saldo;
  let divMontoActual = document.getElementById("saldoActual");
  divMontoActual.innerHTML = `<div class="container monto">$${montoActual}</div>`;
  return montoActual;
}

function regaloNuevaCuenta(user) {
  let montoActual = user.saldo;
  montoActual = montoActual + 500;
  
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "success",
    title: "Te regalamos $500 por registrarte con nosotros",
  });
  muestraDineroActual(user);
  return montoActual;
}

function notificacionAlerta(icono, titulo, texto) {
  Swal.fire({
    icon: icono,
    title: titulo,
    text: texto,
  });
}
// guarda user en usuarios en LS
function cargarUsuariosALocalStorage() {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}
// trae user de usuarios en ls
function traerUsuariosdeLocalStorage() {
  const usuariosGuardados = localStorage.getItem("usuarios");
  if (usuariosGuardados) {
    usuarios = JSON.parse(usuariosGuardados);
    return usuarios;
  } else {
    // si no esta guardado se inicializa vacio
    usuarios = [];
  }
}

function cargarALSSiRecibioPremio(user) {
  localStorage.setItem("RecibióPremio", JSON.stringify(user.PremioRecibido));
}
function traerDatoPrimerIngresoLS() {
  let confirmacionPrimerLogin = localStorage.getItem("RecibióPremio");
  let confirmacion = JSON.parse(confirmacionPrimerLogin);
  
  return confirmacion;
}

function indicarQueYaRealizoElPrimerIngreso(user) {
  user.regaloNuevaCuenta = true;
}

function traerMovimientosDelDom() {
  let movimientos = document.getElementById("movimientosRecientes").innerHTML;
  return movimientos;
}

function subirMovimientosALS() {
  localStorage.setItem("movimientos_Recientes", traerMovimientosDelDom());
}

function traerMovimientosDeLS() {
  let movGuardados = localStorage.getItem("movimientos_Recientes");
  return movGuardados;
}


async function mostrarMovimientos() {
  await new Promise((resolve) => setTimeout(resolve, 3000)); // 3-second delay
  let savedMov = traerMovimientosDeLS();
  divNotis.innerHTML = savedMov;
}
function borrarNotificaciones() {
  notisLogin.innerHTML = "";
}

/* ====================================
   ===        transferencias        ===
   ====================================
*/
// accion transferencia
function transferir(user) {
  btnAccionTransferir.addEventListener("click", (event) => {
    // trae saldo de storage
    let SaldoActual = traerSaldodeLocalStorage();
    // obtiene datos de inputs
    let monto = Number(document.getElementById("monto").value);
    let destino = document.getElementById("alias").value;
    event.preventDefault();
    // ❌ERROR❌ campos de transferencia incompletos
    if (monto === "" || monto <= 0 || destino === "") {
      notificacionAlerta("error", "Error", "Los campos deben estar completos");
    } else {
      // ❌ERROR❌ saldo insuficiente
      if (monto > SaldoActual) {
        notificacionAlerta(
          "error",
          "TRANSFERENCIA FALLIDA",
          "Saldo insuficiente"
        );
      } else {
        // confirmación✔
        Swal.fire({
          title: "TRANSFERENCIA",
          text: `Estás a punto de transferir $${monto} a ${destino}`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, transferir!",
        }).then((result) => {
          // se confirma
          if (result.isConfirmed) {
            //✅SUCCESS✅ monto y destino correcto

            let montoActualizado = SaldoActual - monto;
            
            user.saldo = montoActualizado;

            // cargar a ls el saldo nuevo
            cargarSaldoAlStorage(montoActualizado);
            cargarUsuariosALocalStorage();
            event.preventDefault();
            // Blanqueo de inputs
            document.getElementById("monto").value = "";
            document.getElementById("alias").value = "";
            // se crea el objeto operacion
            let OperacionT = {
              tipo: "Transferencia",
              destino: destino,
              monto: monto,
            };
            const listaDeOperaciones = user.operaciones;
            // se guarda en la lista de operaciones del usuario
            listaDeOperaciones.push(OperacionT);

            // 🔄Actualizar la lista de operaciones en el elemento "divNotis"
            let listaMovimientosRealizados = `<ul id="no-padd">`;
            for (const operacion of listaDeOperaciones) {
              listaMovimientosRealizados += alertMsg(
                movimiento,
                `Enviaste una ${operacion.tipo} a <b>${operacion.destino}</b> por <span class ="montoDescontado">-$${operacion.monto}</span>`
              );
            }
            listaMovimientosRealizados += "</ul>";
            divNotis.innerHTML = listaMovimientosRealizados;
            muestraDineroActual(user);
            // 🔄se actualiza dato en usuario en storage
            cargarUsuariosALocalStorage;
            notificacionAlerta(
              "success",
              "Excelente!",
              "La operación fue exitosa"
            );
            //trae movmiento recien ingresado en el DOM 
            traerMovimientosDelDom();
            // lo carga en LS
            subirMovimientosALS();
          }
        });
      }
    }
  });
}

/* ====================================
   ===        Depositos             ===
   ====================================
*/
// accion deposito
function depositar(user) {
  btnAccionDepositar.addEventListener("click", (event) => {
    // trae saldo de LS
    let SaldoActual = traerSaldodeLocalStorage();
    // obtiene datos de inputs
    let monto = Number(document.getElementById("montoDeposito").value);
    event.preventDefault();

    // ❌ERROR❌ campos de deposito incompletos
    if (monto === "" || monto <= 0) {
      notificacionAlerta("error", "Error", "Los campos deben estar completos");
    } else {
      Swal.fire({
        title: "DEPOSITO",
        text: `Estás a punto de depositar $${monto} a tu caja de ahorro en pesos`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, depostar!",
      }).then((result) => {
        // ✔se confirma✔
        if (result.isConfirmed) {
          // ✅SUCCESS✅ monto y destino correcto

          let montoActualizado = SaldoActual + monto;
          
          user.saldo = montoActualizado;

          // cargar a ls el saldo nuevo
          cargarSaldoAlStorage(montoActualizado);
          // actualiza usuario en LS
          cargarUsuariosALocalStorage();
          event.preventDefault();
          // Blanqueo de inputs
          document.getElementById("montoDeposito").value = "";
          // se crea el objeto operacion
          let operacionD = {
            tipo: "Deposito",
            destino: "caja de ahorro en pesos",
            monto: monto,
          };
          const listaDeOperaciones = user.operaciones;
          // se guarda en la lista de operaciones del usuario
          listaDeOperaciones.push(operacionD);

          // Actualizar la lista de operaciones en el elemento "divNotis"
          let listaMovimientosRealizados = "<ul>";
          for (const operacion of listaDeOperaciones) {
            listaMovimientosRealizados += alertMsg(
              movimiento,
              `Realizaste un ${operacion.tipo} a <b>${operacion.destino}</b> por <span class ="montoAcreditado">+$${operacion.monto}</span>`
            );
          }
          listaMovimientosRealizados += "</ul>";
          divNotis.innerHTML = listaMovimientosRealizados;
          muestraDineroActual(user);

          cargarUsuariosALocalStorage;
          notificacionAlerta(
            "success",
            "Excelente!",
            "La operación fue exitosa"
          );
          // trae movimiento recien ingresado en DOM
          traerMovimientosDelDom();
          // guarda movimiento en LS
          subirMovimientosALS();
        }
      });
    }
  });
}

/* ====================================
   === creación de listas y objetos ===
   ====================================
*/

// lista de usuarios
let usuarios = [];


/* ====================================
   ===   funciones main account     ===
   ====================================
*/

/* ====================================
   ===           SIGNUP             ===
   ====================================
*/

// asignación de evento signup
btnAccionSignup.addEventListener("click", (event) => {
  let DNI = document.getElementById("DNI").value;
  let nombre = document.getElementById("name").value;
  let contraseña = document.getElementById("password").value;
  event.preventDefault();
  // Verifica si el DNI ya existe en la lista de usuarios
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].DNI === DNI) {
      // si ya existe un DNI en la lista no es posible realizar el registro
      notificacionAlerta(
        "error",
        "No fue posible realizar el registro",
        "Ya existe una cuenta con ese DNI"
      );
      // Detener el registro
      return;
    }
  }
  // Crea un nuevo objeto "usuario"
  const usuario = new Usuario(DNI, nombre, contraseña);
  // Agregar el usuario a la lista si cumple condición
  if (
    DNI === "" ||
    DNI.length !== 8 ||
    nombre === "" ||
    contraseña === "" ||
    contraseña.length < 8
  ) {
    notisLogin.innerHTML = alertMsg(
      warning,
      `Por favor, complete todos los campos de forma correcta<br>
      <u>Recordá</u>
      <li>El DNI debe tener 8 dígitos</li>
      <li>La contraseña debe tener al menos 8 caractéres</li>`
    );
    setTimeout(borrarNotificaciones, 3000);
  } else {
    usuarios.push(usuario);
    cargarUsuariosALocalStorage();
    notificacionAlerta(
      "success",
      "Registro exitoso",
      "Ya podés ingresar a tu cuenta"
    );
    // blanquear inputs
    document.getElementById("DNI").value = "";
    document.getElementById("name").value = "";
    document.getElementById("password").value = "";
  }
});


/* ====================================
   ===           lOGIN              ===
   ====================================
*/

// obtención de inputs Login

btnAccionLogin.addEventListener("click", (event) => {
  // obtiene datos de input
  const DNILogin = document.getElementById("dniLogin").value;
  const passLogin = document.getElementById("passLogin").value;
  event.preventDefault();
  // trae los usuarios de LS
  traerUsuariosdeLocalStorage(); 
  usuarios.forEach((usuario) => {
    // informa a LS si recibio premio
    cargarALSSiRecibioPremio(usuario);
    if (usuario.DNI === DNILogin && usuario.contraseña === passLogin) {
      // obtiene dato si es primer vez que ingresa
      traerDatoPrimerIngresoLS();
      

      if (traerDatoPrimerIngresoLS() === false) {
        // da regalo
        regaloNuevaCuenta(usuario);
        // actualiza saldo en objeto
        usuario.saldo = regaloNuevaCuenta(usuario);
        // da aviso que ya hizo el primer ingreso
        indicarQueYaRealizoElPrimerIngreso(usuario);
        // informa a LS que ya recibio premio
        cargarALSSiRecibioPremio(usuario);
        // actualiza información de usuario en LS
        cargarUsuariosALocalStorage();
        // actualiza saldo en LS
        cargarSaldoAlStorage(usuario.saldo);
      } else {
        mostrarMovimientos();
      }
      // esconde formularios
      esconderFormularios();
      // muestra pantalla principal
      mostrarPantallaPrincipal();
      // saluda
      saludo(usuario);
      // muestra en pantalla el saldo actual
      muestraDineroActual(usuario);
      usuario.PremioRecibido = true;
      // actualiza usuario en LS
      cargarUsuariosALocalStorage();
      transferir(usuario);
      depositar(usuario);

      // ❌ERROR❌ datos incorrectos
    } else if (usuario.DNI === DNILogin && usuario.contraseña != passLogin) {
      notificacionAlerta(
        "error",
        "Datos incorrectos",
        "Uno o mas datos ingresados no son correctos, verificalos y volvé a intentar"
      );
    }

    // ❌ERROR❌ datos vacios
    else if (DNILogin === "" || passLogin === "") {
      notisLogin.innerHTML = alertMsg(
        warning,
        `Por favor, complete todos los campos de forma correcta<br>
        <u>Recordá</u>
        <li>Los campos no pueden estar vacios ❌</li>
        <li>Los datos deben estar correctos 🧐</li>`
      );
      setTimeout(borrarNotificaciones, 3000);
      // blanquear inputs
      document.getElementById("dniLogin").value = "";
      document.getElementById("passLogin").value = "";
    }
  });
});

// ================================================================
