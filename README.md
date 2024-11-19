<div align="center" style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">
    <img src="/public/favicon.png" alt="Logo de la Clínica Online" width="200" height="200">
    <h1 style="margin-top: 10px; font-weight: 700;">Clinica OnLine</h1>
</div>

La Clínica Online es una plataforma integral diseñada para la gestión eficiente de turnos médicos, atención especializada y administración de pacientes. Esta aplicación facilita tanto a pacientes como a especialistas la organización de consultas y tratamientos de salud de manera eficaz y accesible.

## 📋 Descripción General

La Clínica Online dispone de seis consultorios, dos laboratorios físicos y una sala de espera general. Operando de lunes a viernes de 8:00 a 19:00 y sábados de 8:00 a 14:00, la clínica ofrece servicios a través de profesionales de diversas especialidades, quienes atienden a pacientes con turnos solicitados previamente por la web, permitiendo la selección de profesionales o especialidades específicas.

## 💡 Pantallas Principales y Funcionalidades

### Sprint 1

#### Página de Bienvenida 
- Accesos rápidos al login y registro en el sistema.
<img src="https://firebasestorage.googleapis.com/v0/b/clinicaonlinelaboiv-f6b94.firebasestorage.app/o/readme%2Fbienvenido.jpg?alt=media&token=043602f0-f616-4a8c-9e65-d70b154bdb53" alt="Logo de la Clínica Online"  height="200">

#### Registro de Usuarios
- **Pacientes:**
  - Nombre, Apellido, Edad, DNI, Obra Social, Mail, Password.
  - Subida de 2 imágenes para perfil.
- **Especialistas:**
  - Nombre, Apellido, Edad, DNI, Especialidad (con opción de agregar nuevas), Mail, Password.
  - Subida de imagen de perfil.
- Validación de campos según corresponda.

    <img src="https://firebasestorage.googleapis.com/v0/b/clinicaonlinelaboiv-f6b94.firebasestorage.app/o/readme%2Fregistro-clinica.jpg?alt=media&token=baaa89c5-0b38-496e-a945-c65d05a9fa6f" alt="Logo de la Clínica Online"  height="200">
#### Login
- Acceso seguro al sistema con botones de acceso rápido.
- Validación de usuarios: Especialistas requieren aprobación de administrador y verificación de email; Pacientes deben verificar email al registrarse.

    <img src="https://firebasestorage.googleapis.com/v0/b/clinicaonlinelaboiv-f6b94.firebasestorage.app/o/readme%2Flogin-clinica.jpg?alt=media&token=4e0011d8-c3cf-40d8-8bb3-5868173e6149" alt="Logo de la Clínica Online"  height="200">
#### Sección Usuarios (Administrador)
- Visualización y gestión de información de usuarios.
- Habilitación/inhabilitación de acceso para Especialistas.
- Creación de nuevos usuarios, incluyendo Administradores.

    <img src="https://firebasestorage.googleapis.com/v0/b/clinicaonlinelaboiv-f6b94.firebasestorage.app/o/readme%2Fusuarios-admin.jpg?alt=media&token=ff521215-dd48-44f3-8907-02a6ed5e689d" alt="Logo de la Clínica Online"  height="200">
### Sprint 2

#### Mis Turnos

##### Paciente
- Visualización de turnos solicitados con filtro por Especialidad y Especialista.
- Acciones disponibles:
  - Cancelar turno con comentario.
  - Ver reseña si está disponible.
  - Completar encuesta de atención.
  - Calificar atención post-turno.

    <img src="https://firebasestorage.googleapis.com/v0/b/clinicaonlinelaboiv-f6b94.firebasestorage.app/o/readme%2FmisTurnos-usuarios.jpg?alt=media&token=c3ecdb5b-8544-4605-bc8b-9857d9e92538" alt="Logo de la Clínica Online"  height="200">
##### Especialista
- Visualización de turnos asignados con filtro por Especialidad y Paciente.
- Acciones disponibles:
  - Cancelar turno con comentario.
  - Rechazar turno con motivo.
  - Aceptar turno pendiente.
  - Finalizar turno con reseña.
 

    <img src="https://firebasestorage.googleapis.com/v0/b/clinicaonlinelaboiv-f6b94.firebasestorage.app/o/readme%2Fturnos-especialista.jpg?alt=media&token=2f2ebfc1-1ed7-4c16-ab74-99e81e818fd3" alt="Logo de la Clínica Online"  height="200">

#### Solicitar Turno
- Acceso para Pacientes y Administradores.
- Selección de Especialidad y Especialista.
- Elección de día y horario de consulta dentro de los próximos 15 días según disponibilidad.
- Asignación de paciente por Administrador.

    <img src="https://firebasestorage.googleapis.com/v0/b/clinicaonlinelaboiv-f6b94.firebasestorage.app/o/readme%2FsolicitarTurno.jpg?alt=media&token=0edd50db-776c-49c2-aeeb-431e9f0ef18d" alt="Logo de la Clínica Online"  height="200">
#### Mi Perfil
- Visualización y edición de datos de usuario (nombre, apellido, imágenes, etc.).
- **Especialistas:**
  - Gestión de disponibilidad horaria por especialidad.

    <img src="https://firebasestorage.googleapis.com/v0/b/clinicaonlinelaboiv-f6b94.firebasestorage.app/o/readme%2FmiPerfilUsuario.jpg?alt=media&token=78bb1f2d-bbce-4dc1-afc5-09f31cbd1c5f" alt="Logo de la Clínica Online"  height="200">
### Sprint 3

#### Historia Clínica

##### Paciente
- Acceso desde Mi Perfil.
- Registro de atenciones y controles:
  - Datos fijos: Altura, Peso, Temperatura, Presión.
  - Datos dinámicos (hasta tres pares clave-valor personalizables).

##### Administrador
- Acceso desde Sección Usuarios.
- Visualización de historias clínicas de pacientes atendidos al menos una vez por el Especialista.

#### Mejora de Filtro de Turnos
- Búsqueda por cualquier campo del turno, incluyendo datos de la Historia Clínica (datos fijos y dinámicos).

#### Descargas

- **Administrador:** Exportar datos de usuarios a Excel desde Sección Usuarios.
- **Paciente:** Descargar PDF de Historia Clínica con logo de la clínica, título del informe y fecha de emisión.

    <img src="https://firebasestorage.googleapis.com/v0/b/clinicaonlinelaboiv-f6b94.firebasestorage.app/o/readme%2Fhistorial.jpg?alt=media&token=8faea2ad-4dfd-48de-a8a6-a0777512e9ca" alt="Logo de la Clínica Online"  height="200">

