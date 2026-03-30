# Google Sheets Lead Tracking - Setup Guide

Integración automática de leads en Google Sheets. Los contactos se guardarán en tiempo real cuando se envíen desde el formulario.

## Paso 1: Crear la Hoja de Google Sheets

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja llamada `"LYNX Leads"` (o tu preferencia)
3. En la primera fila, crea las columnas:
   - **A**: Timestamp (ej: `2026-03-30 14:30:45`)
   - **B**: Name (nombre del contacto)
   - **C**: Email (email)
   - **D**: Business (empresa/negocio)
   - **E**: Message (mensaje)
   - **F**: Source (siempre será `"web-contact"`)
   - **G**: Status (valores: `"new"`, `"contacted"`, `"qualified"`, `"closed"`)

Ejemplo de primera fila:
```
Timestamp | Name | Email | Business | Message | Source | Status
```

4. Guarda la hoja

## Paso 2: Crear el Google Apps Script

1. En la misma hoja, ve a **Extensiones > Apps Script**
2. Se abrirá una pestaña nueva con el editor de Apps Script
3. Reemplaza todo el contenido por esto:

```javascript
// Google Apps Script para recibir leads desde Railway
const SPREADSHEET_ID = '<<REEMPLAZA_CON_TU_ID>>'; // Ver instrucciones abajo
const SHEET_NAME = 'Sheet1'; // Cambiar si lo nombraste diferente

function doPost(e) {
  try {
    // Parsear JSON del body
    const payload = JSON.parse(e.postData.contents);
    
    // Validar campos requeridos
    if (!payload.name || !payload.email || !payload.business || !payload.message) {
      return ContentService.createTextOutput(
        JSON.stringify({ ok: false, error: 'Missing required fields' })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Obtener la hoja de cálculo
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    
    // Crear timestamp
    const timestamp = new Date().toLocaleString('es-ES', {
      timeZone: 'America/Bogota' // Cambia a tu zona horaria
    });
    
    // Agregar fila
    sheet.appendRow([
      timestamp,
      payload.name,
      payload.email,
      payload.business,
      payload.message,
      payload.source || 'web-contact',
      payload.status || 'new'
    ]);
    
    return ContentService.createTextOutput(
      JSON.stringify({ ok: true, message: 'Lead saved' })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Paso 3: Obtener el ID de tu Spreadsheet

1. En la hoja de Google Sheets, copia la URL:
   ```
   https://docs.google.com/spreadsheets/d/AQUI_ESTA_EL_ID/edit#gid=0
   ```
2. El ID es la parte larga entre `/d/` y `/edit`
3. Ejemplo: `1A2B3C4D5E6F7G8H9I0J` ← este es el ID
4. Vuelve al Apps Script y reemplaza `<<REEMPLAZA_CON_TU_ID>>` con el ID real

## Paso 4: Desplegar como API Web

1. En el editor de Apps Script, haz clic en **Desplegar** (arriba a la derecha)
2. Selecciona **Nueva implementación** (ícono de engranaje)
3. En el menú desplegable, selecciona **Aplicación web**
4. Configuración:
   - **Ejecutar como**: Tu cuenta de Google
   - **Ejecutar como**: [Tu correo de Google]
   - **Quién puede acceder**: **Cualquiera**
5. Haz clic en **Desplegar**
6. **COPIAR Y GUARDAR** la URL que aparece:
   ```
   https://script.google.com/macros/d/[ID_LARGO]/usercopy
   ```

## Paso 5: Agregar URL a Railway

1. Ve a tu proyecto en [Railway Dashboard](https://railway.app)
2. Abre variables de entorno
3. Agrega nueva variable:
   - **Key**: `GOOGLE_SHEETS_WEBHOOK_URL`
   - **Value**: La URL que copiaste en Paso 4
4. Deploy

Ejemplo:
```
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/d/1A2B3C_4D5E6F7G8H9I0J/usercopy
```

## Paso 6: Verificar que funciona

1. Ve a tu sitio en Railway
2. Envía un test desde el formulario de contacto
3. Vuelve a la hoja de Google Sheets
4. Deberías ver una fila nueva con el lead

## Solucionar problemas

### La hoja no se actualiza
- Verifica el SPREADSHEET_ID es correcto (Paso 3)
- Verifica el SHEET_NAME coincide con el nombre real de la hoja
- Revisa los logs en Apps Script: **Ejecuciones** (reloj en el editor)

### Error 404 en webhook
- La URL no está configurada en Railway
- O la URL está incorrecta
- Verifica el prefijo: `https://script.google.com/macros/d/` ✅

### Permission denied
- En Paso 4, asegúrate de seleccionar **"Cualquiera"** en "Quién puede acceder"
- Si aún falla, intenta re-desplegar

## Cambiar zona horaria

En el Apps Script, línea con `timeZone: 'America/Bogota'`, cambia a tu zona horaria:
- `'America/New_York'` (EST)
- `'America/Los_Angeles'` (PST)
- `'Europe/Madrid'` (CET)
- [Lista completa](https://www.unicode.org/reports/tr35/tr35-dates.html#Using_Time_Zone_Names)

## Automatizaciones futuras en Sheets

Una vez que tengas los leads en Sheets, puedes:
- ✅ Crear gráficos de leads por día
- ✅ Usar Google Forms para filtrar leads
- ✅ Conectar Zapier para notificaciones por Slack
- ✅ Crear vista de kanban en Data Studio

---

**¡Configurado!** Los leads se guardarán automáticamente en tu hoja cada vez que alguien envíe el formulario.
