# RPIC 2027

Sitio web de la XXII Reunión de Trabajo en Procesamiento de la Información y Control (Río Cuarto, 22–24 de septiembre de 2027). Hecho con [Hugo](https://gohugo.io/).

## Estructura

```
hugo.toml               configuración, idiomas y menú
content/_index.md       portada en español (textos, fechas, temas, sede)
content/_index.en.md    portada en inglés
i18n/                   textos de interfaz por idioma
layouts/                plantillas HTML
assets/css, assets/js   estilos y script (se minifican y fingerprintean)
static/img/             logos (ver abajo)
```

## Imágenes necesarias

Copiar a `static/img/`:

- `logo-corto-negro.png`
- `logo-completo-negro.png`

## Desarrollo local

```
hugo server
```

## Editar contenido

La portada se edita en `content/_index.md` (español) y `content/_index.en.md` (inglés). Las fechas, temas y sede están en el *front matter*; el texto del llamado es el cuerpo Markdown.

### Agregar secciones nuevas

Crear un `.md` por idioma, con el mismo nombre base y sufijo `.en` para inglés:

```
content/novedades/_index.md        content/novedades/_index.en.md
content/autores/_index.md          content/autores/_index.en.md
content/turismo/_index.md          content/turismo/_index.en.md
```

Con front matter mínimo:

```
---
title: "Información para autores"
---
Contenido en Markdown…
```

Y agregar la entrada al menú en `hugo.toml` (por idioma), por ejemplo:

```
[[languages.es.menus.main]]
  name = "Autores"
  url = "/autores/"
  weight = 25
```

Para novedades como entradas individuales, crear `content/novedades/2027-01-15-titulo.md` con `date:` en el front matter; `list.html` las lista automáticamente.

## Despliegue en Cloudflare Pages

Conectar el repositorio de GitHub en Cloudflare Pages con:

| Campo | Valor |
|---|---|
| Framework preset | Hugo |
| Build command | `hugo --minify` |
| Build output directory | `public` |
| Variable de entorno | `HUGO_VERSION` = `0.147.0` (o superior) |

Para que las vistas previas usen su propia URL, usar como build command: `hugo --minify -b $CF_PAGES_URL`.
Cuando haya dominio definitivo, actualizar `baseURL` en `hugo.toml`.
