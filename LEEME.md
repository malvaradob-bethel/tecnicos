# Registro de Operaciones · Bethel — Paquete PWA

App web instalable para los técnicos de la red nacional Bethel.

## 📦 Contenido del paquete

```
tecnicos/
├── index.html          ← la aplicación
├── manifest.json       ← configuración de la PWA (nombre, iconos)
├── sw.js               ← service worker (funciona sin conexión)
└── icons/              ← iconos en todos los tamaños
```

## 🚀 Cómo publicarlo en GitHub Pages

Tu ruta destino es: **https://malvaradob-bethel.github.io/tecnicos/**

### Paso a paso

1. Entra a tu repositorio en GitHub (el que usa `malvaradob-bethel.github.io`).
2. Sube la **carpeta `tecnicos` completa** (con todo su contenido) a la raíz del repositorio.
   - Puedes arrastrar la carpeta directamente en la página del repositorio, o usar
     "Add file → Upload files".
   - Importante: que se mantenga la estructura — `index.html`, `manifest.json`, `sw.js`
     y la subcarpeta `icons/` deben quedar dentro de `tecnicos/`.
3. Confirma con "Commit changes".
4. En 1-2 minutos la app estará disponible en:
   **https://malvaradob-bethel.github.io/tecnicos/**

## 📱 Cómo lo instalan los técnicos

Una vez publicada, cada técnico:

1. Abre **https://malvaradob-bethel.github.io/tecnicos/** en el navegador del celular
   (Chrome en Android, Safari en iPhone).
2. **Android (Chrome):** aparece un aviso "Agregar a pantalla de inicio" o desde el menú
   ⋮ → "Instalar aplicación".
3. **iPhone (Safari):** botón compartir (cuadro con flecha) → "Agregar a inicio".
4. La app queda con su icono propio en la pantalla del celular y abre a pantalla completa,
   como una app normal.

## 🔄 Cómo actualizar la app más adelante

Cuando haya una versión nueva del `index.html`:

1. Reemplaza el archivo en GitHub.
2. **Importante:** edita `sw.js` y sube el número de versión
   (cambia `bethel-v1` por `bethel-v2`, etc.). Esto obliga a que todos los
   dispositivos descarguen la versión nueva la próxima vez que abran con internet.

## ⚙️ Conexión con Google Sheets

La app ya viene con la URL de tu Apps Script embebida, así que los técnicos
quedan conectados automáticamente. No necesitan configurar nada.

- Los registros se envían a tu hoja de cálculo al guardar.
- El historial del técnico y la vista de admin leen los datos desde la hoja.
- Funciona sin internet: guarda localmente y reenvía cuando vuelve la conexión.
