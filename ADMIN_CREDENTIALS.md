# Credenciales de Administrador

## Acceso al Panel de Historial y Exportación

**Email:** `admin@recicla.app`
**Contraseña:** `Admin123!@#ReciclaApp`

---

## Cómo acceder:

1. En la pantalla de login, presiona el botón "Admin" (texto pequeño en la parte inferior)
2. Los campos se llenarán automáticamente con las credenciales
3. Presiona "Iniciar Sesión"
4. Como admin, verás la pestaña **"Historial"** en el menú inferior (no disponible para usuarios regulares)

---

## Funcionalidades exclusivas de Admin:

### 1. Pestaña "Historial" (Solo para Admin)
- **Ver TODOS los registros de reciclaje** de todos los usuarios en tiempo real
- **Estadísticas globales en vivo:**
  - Total de registros registrados
  - Peso total reciclado por todos
  - Puntos totales distribuidos
  - CO₂ total ahorrado

### 2. Exportar a Excel
- Botón para descargar todos los datos
- Archivo con 2 hojas:
  - **Hoja 1: "Registros"** - Detalle completo de cada reciclaje:
    - Fecha y hora
    - Material (plástico, papel, vidrio, electrónico)
    - Peso registrado
    - Centro de reciclaje
    - Puntos ganados
    - CO₂ ahorrado
  - **Hoja 2: "Resumen"** - Estadísticas totales
- Archivo descargable: `Historial_Reciclaje_[YYYY-MM-DD].xlsx`

### 3. Sistema de Notificaciones Funcional
- Ver un feed en tiempo real de la actividad de todos los usuarios
- Notificaciones de:
  - Nuevos reciclajes registrados
  - Logros desbloqueados
  - Misiones completadas
  - Recompensas obtenidas
- Marca notificaciones como leídas
- Limpia todas las notificaciones

---

## Características de seguridad:

- ✓ Pestaña "Historial" **SOLO visible** para `is_admin = true`
- ✓ Solo administradores ven TODOS los registros globales
- ✓ Usuarios regulares no pueden acceder a esta funcionalidad
- ✓ Los registros se guardan automáticamente cuando se registra reciclaje
- ✓ Sistema de notificaciones centralizado para monitorear actividad

---

## Datos de ejemplo en Historial:

Cuando entres como admin, verás datos de ejemplo como:
- Juan: 2.5kg de plástico - 50 puntos - 1.25kg CO₂
- María: 4.0kg de papel - 80 puntos - 2.0kg CO₂
- Carlos: 3.0kg de vidrio - 60 puntos - 1.5kg CO₂

---

## Notas técnicas:

- Los registros se almacenan en la tabla `recycling_records` de Supabase
- Cada registro captura: tipo de material, peso, ubicación, puntos, CO₂ y timestamp
- El sistema mantiene un log de todas las actividades del usuario
- La pestaña Historial solo aparece si `profile.is_admin === true`
- Los datos se pueden exportar como base de datos para análisis
