# Sabor & Salsa — landing

Sitio estático para el restaurante, generado con [Astro](https://astro.build) 6 y [Tailwind CSS](https://tailwindcss.com) 4. Producción habitual: `./dist/` (modo **static**, sin servidor Node en runtime).

Sitio público configurado en `astro.config.mjs`: `site: "https://sabor-y-salsa.msarknet.es"`.

## Requisitos

- [Node.js](https://nodejs.org/) **≥ 22.12.0** (ver `engines` en `package.json`).

## Comandos

| Comando        | Acción                                               |
| -------------- | ---------------------------------------------------- |
| `npm install`  | Instala dependencias                                  |
| `npm run dev`  | Servidor de desarrollo (por defecto `localhost:4321`) |
| `npm run build`| Genera el sitio en `./dist/`                          |
| `npm run preview` | Sirve `./dist/` en local tras un build           |

Tras cada `npm install` se ejecuta [`scripts/patch-vite-plugin-container.mjs`](scripts/patch-vite-plugin-container.mjs) (postinstall): aplica una mitigación en Vite 7 para un fallo conocido con Astro + React (ver abajo).

## Variables de entorno

Copia `.env.example` a `.env` y ajusta los valores antes de hacer `build`:

| Variable | Descripción |
| -------- | ----------- |
| `PUBLIC_N8N_RESERVA_WEBHOOK_URL` | URL de **producción** del nodo **Webhook** en [n8n](https://n8n.io/) (POST con cuerpo JSON). Si queda vacía, el formulario de reserva no llama al webhook y solo se registra aviso en consola; WhatsApp puede seguir usándose. |

Las variables con prefijo `PUBLIC_` se inyectan en el bundle del cliente en tiempo de compilación.

## Formulario de reservas (inicio, `#reservas`)

El bloque está en [`src/pages/index.astro`](src/pages/index.astro):

- Validación en el cliente (fecha, hora entre 9:00 y 23:00, personas, datos obligatorios, alergias opcionales). Los fallos se listan en `console.error` con prefijo `[Reserva]`.
- Si `PUBLIC_N8N_RESERVA_WEBHOOK_URL` está definida: `POST` JSON al webhook (campos tipo `tipo`, `origen`, `enviado_en`, `nombre`, `telefono`, `fecha`, `hora`, `personas`, `alguien_alergico`, `detalle_alergias`).
- Tras intentar el envío a n8n, se abre WhatsApp con el texto resumido de la reserva (mismo comportamiento habitual del flujo público).

**CORS:** el `fetch` al webhook se ejecuta desde el dominio donde está alojada la landing. Si el servidor n8n (o el proxy delante) no devuelve cabeceras CORS adecuadas para ese origen, el navegador bloqueará la petición; revísalo en la instalación del workflow o en Nginx/Ingress.

En n8n debes usar la **Production URL** del nodo Webhook (suele ser `https://<host>/webhook/…`), no la URL del panel tipo `/projects/…/folders/…`.

## Estructura del código (orientativa)

```text
src/
├── layouts/          # Plantilla base
├── pages/           # Rutas (/ index, contacto, privacidad, términos)
├── shared/          # Nav, Footer, WhatsAppFloat, LocationMapEmbed, utilidades UI
├── features/        # Componentes React (mapa) y piezas opcionales de home
├── core/             # Contratos/dominio (p. ej. venue)
├── infrastructure/   # Repositorios estáticos
└── styles/           # Estilos globales
```

## Documentación Astro

Plantilla inicial del proyecto documentada también en [`README.astro.md`](README.astro.md). La referencia oficial es [documentación Astro](https://docs.astro.build).

## Vite: `TypeError: Cannot read properties of undefined (reading 'call')`

Ese mensaje en `EnvironmentPluginContainer.transform` (p. ej. `vite/.../config.js` ~28797) es un [problema abierto en Vite](https://github.com/vitejs/vite/issues/21162) que suele aparecer con **Astro 6 + Vite 7 + `@astrojs/react`**, sobre todo al recargar la config de Vite en dev, tras cambios grandes o al alternar ramas.

**En este repo:** el `postinstall` inserta un `if (!handler) continue;` en el bucle de `transform` del contenedor de plugins cuando detecta el patrón de Vite 7.3.x, para no llamar a `.call` si el plugin (p. ej. React) ya ha eliminado el hook.

Si tras actualizar **Vite** el script avisa de que no encontró el patrón, habrá que revisar el issue de Vite o actualizar la lógica en `scripts/patch-vite-plugin-container.mjs`.

**Pasos manuales si sigue fallando en dev:** parar el servidor, borrar cachés (`rm -rf .astro node_modules/.vite`) y volver a ejecutar `npm run dev`. A veces basta con reiniciar el dev server tras un cambio en `astro.config.mjs` o en dependencias.
