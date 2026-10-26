/**
 * Torres / Towers: endpoint privado de registro para la hoja de solicitudes.
 * Configura SPREADSHEET_ID y SHARED_SECRET en Project Settings > Script properties.
 */
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    const properties = PropertiesService.getScriptProperties();
    const expectedSecret = properties.getProperty('SHARED_SECRET');
    if (!expectedSecret || payload.secret !== expectedSecret) return output({ ok: false, error: 'unauthorized' });
    if (!validPayload(payload)) return output({ ok: false, error: 'invalid_data' });

    const spreadsheetId = properties.getProperty('SPREADSHEET_ID');
    if (!spreadsheetId) throw new Error('Falta SPREADSHEET_ID');
    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('Solicitudes');
    if (!sheet) throw new Error('Crea la pestaña Solicitudes antes de desplegar');

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        const knownIds = sheet.getRange(2, 1, lastRow - 1, 1).getDisplayValues().flat();
        const existingIndex = knownIds.indexOf(payload.lead_id);
        if (existingIndex !== -1) {
          sheet.getRange(existingIndex + 2, 1, 1, 7).setValues([rowValues(payload)]);
          return output({ ok: true, duplicate: true });
        }
      }
      sheet.appendRow(rowValues(payload));
    } finally {
      lock.releaseLock();
    }
    return output({ ok: true });
  } catch (error) {
    console.error(error);
    return output({ ok: false, error: 'sheet_write_failed' });
  }
}

function rowValues(payload) {
  return [payload.lead_id, safeCell(payload.name), safeCell(payload.email), safeCell(payload.phone),
    safeCell(payload.class_name), safeCell(payload.source), new Date(payload.registered_at)];
}

function validPayload(data) {
  return typeof data.lead_id === 'string' && /^[0-9a-f-]{36}$/i.test(data.lead_id)
    && typeof data.name === 'string' && data.name.trim().length >= 2 && data.name.length <= 100
    && typeof data.email === 'string' && data.email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
    && typeof data.phone === 'string' && data.phone.length <= 30
    && typeof data.class_name === 'string' && data.class_name.length >= 2 && data.class_name.length <= 120
    && typeof data.source === 'string' && data.source.length >= 1 && data.source.length <= 200
    && typeof data.registered_at === 'string' && !Number.isNaN(Date.parse(data.registered_at));
}

// Evita que datos enviados por usuarios se interpreten como fórmulas en Sheets.
function safeCell(value) {
  const text = String(value || '').trim();
  return /^[=+\-@\t\r]/.test(text) ? "'" + text : text;
}

function output(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
