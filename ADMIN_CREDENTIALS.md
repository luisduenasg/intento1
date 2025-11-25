# Credenciales de Administrador

## Acceso al Panel de Historial y Exportación

**Email:** `admin@recicla.app`
**Contraseña:** `Admin123!@#ReciclaApp`

---

## Cómo acceder:

1. En la pantalla de login, presiona el botón "Admin" (texto pequeño en la parte inferior)
2. Los campos se llenarán automáticamente con las credenciales
3. Presiona "Iniciar Sesión"
4. Navega a la pestaña "Historial" en el menú inferior

---

## Funcionalidades exclusivas de Admin:

- **Ver todos los registros de reciclaje** de todos los usuarios
- **Estadísticas globales:**
  - Total de registros
  - Peso total reciclado
  - Puntos totales distribuidos
  - CO₂ total ahorrado

- **Exportar a Excel** con:
  - Hoja 1: Detalle de todos los registros
  - Hoja 2: Resumen de estadísticas
  - Archivo descargable en formato .xlsx

---

## Características de seguridad:

- ✓ Solo usuarios con `is_admin = true` pueden ver el historial
- ✓ Solo administradores ven TODOS los registros globales
- ✓ Usuarios regulares no pueden acceder a esta funcionalidad
- ✓ Los registros se guardan automáticamente en Supabase cuando se registra reciclaje
- ✓ Protección RLS en todas las tablas

---

## Notas técnicas:

- Los registros se almacenan en la tabla `recycling_records` de Supabase
- Cada registro incluye: tipo de material, peso, ubicación, puntos, CO₂ ahorrado y timestamp
- El Excel se descarga con el nombre: `Historial_Reciclaje_[YYYY-MM-DD].xlsx`
- Los datos se pueden usar como base de datos para análisis posterior
