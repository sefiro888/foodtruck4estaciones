# Revisión web — 17 de septiembre de 2026

Revisión del proyecto local. No equivale a verificar el servidor publicado ni los procedimientos reales del negocio. Los textos legales quedan preparados, pero pendientes de los datos y comprobaciones que se detallan abajo.

## Cambios aplicados

- Sustituido el texto discreto de los rollos por un bloque dorado BACON / LOMO / POLLO, con acceso individual a cada producto.
- Retirados los anuncios de eventos y desplazamientos de páginas, menús, pies, metadatos, formulario, cintas y contenido oculto. Retirada también la reseña que describía un servicio de cumpleaños incompatible con la información facilitada por el titular.
- La antigua URL eventos.html dirige a Contacto, sin conservar el anuncio del servicio.
- Google Maps deja de cargarse como iframe. Ahora se abre mediante un enlace elegido por el visitante.
- Aviso legal y privacidad identifican a César Américo Prada Magallanes. NIF, domicilio legal y correo quedan expresamente pendientes; no se asume que la dirección comercial sea su domicilio legal.
- Ampliada privacidad y añadida información básica junto al formulario. Creada cookies.html y enlazada desde todos los pies.
- Corregida la frase «6 días» que contradecía la tabla semanal; eliminada la promesa de respuesta inmediata por WhatsApp.

## Antes de considerar terminada la parte legal

| Prioridad | Pendiente | Acción necesaria |
|---|---|---|
| Alta | Identificación del titular | Facilitar NIF, domicilio legal y correo. Confirmar otros datos registrales o autorizaciones cuando sean aplicables. El nombre comercial y teléfono por sí solos no completan el aviso. |
| Alta | Privacidad del negocio real | Confirmar quién accede a los mensajes, proveedores, copias, plazos de conservación, procedimiento de derechos y base jurídica de cada uso. Documentar la valoración del interés legítimo para consultas generales. |
| Alta | Alérgenos | Completar información por producto con recetas y fichas de proveedores, incluyendo salsas, extras y contacto cruzado. No deducirla de fotos o nombres. En venta a distancia debe estar disponible antes de comprar y en la entrega; una lista genérica de los 14 grupos no acredita la información de cada plato. |
| Alta | Alojamiento definitivo | Revisar HTTPS, cookies añadidas por el servidor, registros de acceso, ubicación del proveedor, contratos y transferencias internacionales. La prueba local no permite confirmar estos puntos. |
| Media | Venta y precios | Confirmar que el precio comunicado es final, con impuestos y costes aplicables; revisar información previa al pedido, confirmación, incidencias y reclamaciones según la operativa real de recogida y Glovo. La web no tiene pago integrado, pero los pedidos por WhatsApp también necesitan una operativa clara. |

Las páginas legales muestran avisos de información pendiente de forma deliberada. No retirar esos avisos hasta completar y validar los datos. La política de privacidad preparada debe reflejar la práctica real, no sustituir su definición.

## Cookies y conexiones: resultado técnico

En Chromium, navegando por las ocho páginas principales y legales, se observaron cero cookies, localStorage vacío y una entrada de sessionStorage: fullTrackIntroShown=true. Esta última recuerda que se ha mostrado la introducción durante la sesión de pestaña. No aparecen herramientas de analítica o publicidad en el código revisado.

Dominios solicitados sin pulsar enlaces externos: el servidor local, fonts.googleapis.com, fonts.gstatic.com y cdnjs.cloudflare.com. Los tres externos corresponden a tipografías e iconos. Una conexión externa comunica datos técnicos aunque no instale cookies.

No se ha añadido un banner genérico de aceptación: no se han detectado categorías publicitarias o analíticas que gestionar. Antes de publicar, debe comprobarse la configuración final y la clasificación del almacenamiento de presentación conforme a la guía de la AEPD. Si se añaden tecnologías no exentas, bloquearlas antes del consentimiento y ofrecer aceptar/rechazar con la misma facilidad y retirada posterior.

## Mejoras recomendadas para la siguiente fase

1. **Acortar la portada en móvil.** Mantener dos protagonistas y presentar el resto de favoritos de forma más compacta, evitando que nueve tarjetas largas alejen horarios y ubicación.
2. **Una única fuente para productos y precios.** Ahora portada, carta y el configurador oculto repiten información. Hay importes distintos en ese configurador; no activarlo sin sincronizarlo con la carta. Centralizar datos evita desajustes.
3. **Confirmar la ubicación que debe ver el cliente.** En varios lugares aparece «Calle Laredo, 9, 2.º» y los mapas buscan el número 9. Confirmar punto exacto de recogida y marcador del negocio; distinguirlo del domicilio legal. No se han inventado coordenadas ni cambiado el domicilio sin confirmación.
4. **Reseñas verificables y fotos del punto de recogida.** El bloque de reseñas sigue oculto y conserva textos sin enlaces individuales que acrediten su origen. Antes de activarlo, sustituirlos por reseñas reales verificadas. Una foto real del establecimiento ayudaría a encontrarlo.
5. **Carga y privacidad.** Alojar las fuentes e iconos localmente, con sus licencias, para evitar conexiones automáticas a Google Fonts y cdnjs. Revisar la introducción de unos tres segundos para que no retrase a quien solo busca pedir.
6. **Simplificar el mantenimiento.** Eliminar más adelante secciones ocultas obsoletas y estilos sin uso; sincronizar horarios y señal de abierto/cerrado desde una sola fuente. Revisar SEO, sitemap, canonicals y redirección HTTP de la URL antigua cuando se conozcan el dominio y el hosting.

## Comprobaciones realizadas

- Navegación por Inicio, Carta, Contacto, Nosotros, Aviso legal, Privacidad, Cookies y Alérgenos: sin errores de JavaScript.
- Ausencia de enlaces a la página retirada y de iframes en estas páginas; enlace de cookies presente en los ocho pies.
- Cabecera de rollos comprobada a 1440, 768, 390 y 320 px; sin desbordamiento del bloque.
- Formulario comprobado interceptando la apertura de WhatsApp: genera el mensaje correctamente sin enviar ninguna comunicación.
- Antigua URL comprobada: llega a Contacto.

## Fuentes oficiales consultadas

- [LSSI, artículo 10 y artículo 22.2 — BOE](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758): identificación del prestador y tecnologías de almacenamiento.
- [Derecho de información — AEPD](https://www.aepd.es/derechos-y-deberes/conoce-tus-derechos/derecho-de-informacion): información exigible sobre responsable, fines, bases, conservación y derechos.
- [Guía sobre el uso de las cookies — AEPD](https://www.aepd.es/guias/guia-cookies.pdf): alcance, excepciones y consentimiento.
- [Información alimentaria en venta a distancia — AESAN](https://www.aesan.gob.es/AECOSAN/docs/documentos/publicaciones/seguridad_alimentaria/venta_distancia.pdf): información de alérgenos antes de la compra y en la entrega.

## Actualización: alérgenos, Instagram y móvil

- Creado ALERGENOS-PARA-REVISAR.md con los nueve favoritos, indicios públicos de Glovo y las comprobaciones concretas para César. Es un borrador no validado, sin enlazar desde la carta pública; no contiene garantías de ausencia de alérgenos.
- La obligación de facilitar información no implica que una web meramente informativa tenga que mostrar necesariamente una ficha de cada plato. Hay que distinguir compra en el local de pedido cerrado por un canal remoto, aunque se recoja presencialmente. No se ha verificado qué fichas existen ya en el establecimiento.
- Todos los enlaces de Instagram apuntan a https://www.instagram.com/fulltruck4estaciones/ y se ha corregido el usuario visible.
- Pruebas con Chromium y emulación táctil a 320, 390 y 768 px: navegación móvil, filtros, buscador y visor de fotos. Sin errores de JavaScript. Corregidos desbordamientos de las tarjetas y contacto a 320 px y respetado el atributo hidden de secciones desactivadas.
- La validación es de navegador emulado, no una prueba en teléfonos físicos ni una certificación del hosting.
