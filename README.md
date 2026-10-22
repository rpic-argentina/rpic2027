# RPIC 2027

Sitio web de la XXII Reunión de Trabajo en Procesamiento de la Información y Control (Río Cuarto, 22–24 de septiembre de 2027). Hecho con [Hugo](https://gohugo.io/).

# Instructivo para editores del sitio RPIC

Guía para actualizar la web de la RPIC. No hace falta saber programar: casi todo se hace editando archivos de texto en formato Markdown.

## 1. Cómo funciona (resumen)

```
Editás un archivo  →  lo subís a GitHub  →  Cloudflare compila el sitio  →  queda publicado
   (.md)               (en una rama)          (vista previa)                 (al aprobar el cambio)
```

- El sitio se genera con **Hugo** a partir de archivos de texto. No hay base de datos ni panel de administración.
- **GitHub** guarda los archivos y el historial de cambios. Si algo sale mal, siempre se puede volver atrás.
- **Cloudflare** compila y publica automáticamente cada vez que cambia la rama `main`.
- Los cambios que se hacen en **otra rama** no afectan a la web pública: generan una **vista previa** para revisarlos antes.

**Regla de oro:** trabajar siempre en una rama propia, revisar la vista previa y recién después publicar.

## 2. Qué archivo editar

| Para cambiar… | Editar |
|---|---|
| Textos, fechas, temas y sede de la portada (español) | `content/_index.md` |
| Lo mismo en inglés | `content/_index.en.md` |
| Menú, enlaces a ediciones anteriores, redes sociales, dirección del sitio | `hugo.toml` |
| Textos fijos de la interfaz ("Faltan N días", etc.) | `i18n/es.yaml` y `i18n/en.yaml` |
| Logos e imágenes | carpeta `static/img/` |
| Una página nueva (novedades, autores, turismo…) | ver sección 9 |

**Todo contenido va en los dos idiomas.** Si cambiás `_index.md`, cambiá también `_index.en.md`.

No tocar la carpeta `layouts/` ni `assets/` salvo que se trate de cambios de diseño, que conviene consultar antes.

## 3. Opción A: editar desde la web de GitHub (sin instalar nada)

Es la forma más simple para cambios de texto.

1. Entrá al repositorio en GitHub e iniciá sesión.
2. Abrí el archivo a editar (por ejemplo `content/_index.md`) y hacé clic en el **lápiz** (*Edit this file*).
3. Hacé el cambio.
4. Hacé clic en **Commit changes…** (arriba a la derecha).
5. Escribí un mensaje corto que describa el cambio (por ejemplo "Actualizar fecha de notificación").
6. Elegí **Create a new branch for this commit and start a pull request** y poné un nombre de rama sin espacios (por ejemplo `fechas-notificacion`).
7. Confirmá y, en la pantalla siguiente, hacé clic en **Create pull request**.
8. Continuá en la sección 6 (vista previa).

> No elijas *Commit directly to the main branch* salvo que sea una corrección urgente: eso publica el cambio sin revisión.

## 4. Opción B: trabajar en tu computadora (probar antes de subir)

Recomendada para cambios grandes: páginas nuevas, imágenes, menús o varias ediciones juntas.

### 4.1 Instalación (una sola vez)

1. **Git**: https://git-scm.com/downloads
2. **Hugo (versión "extended")**: https://gohugo.io/installation/
   - Windows: `winget install Hugo.Hugo.Extended`
   - macOS: `brew install hugo`
   - Linux: seguir las instrucciones de la web de Hugo
3. Verificá con `hugo version`. Debe decir `extended`. Usá la misma versión que la variable `HUGO_VERSION` configurada en Cloudflare, o una cercana.
4. Un editor de texto cómodo, por ejemplo **VS Code**.

### 4.2 Descargar el proyecto (una sola vez)

```
git clone https://github.com/ORGANIZACION/REPOSITORIO.git
cd REPOSITORIO
```

(Reemplazar por la dirección real del repositorio.)

### 4.3 Empezar un cambio

Antes de cada tarea, actualizá y creá una rama nueva:

```
git switch main
git pull
git switch -c nombre-del-cambio
```

El nombre de la rama no debe tener espacios ni tildes, por ejemplo `novedades-octubre`.

### 4.4 Probar localmente

```
hugo server
```

Abrí **http://localhost:1313/** (español) y **http://localhost:1313/en/** (inglés). La página se recarga sola cada vez que guardás un archivo. Para detener el servidor: `Ctrl + C`.

Qué revisar antes de seguir:

- Que el cambio se vea bien en español **y** en inglés.
- Que los enlaces funcionen.
- Que se vea bien en pantalla angosta (achicá la ventana del navegador).
- Que la terminal no muestre errores en rojo (`ERROR`).

> No abras directamente los archivos de la carpeta `public/` con doble clic: no se ven bien porque necesitan un servidor. Para probar siempre usar `hugo server`.

### 4.5 Subir el cambio

```
git status                       # ver qué archivos cambiaron
git add .
git commit -m "Descripción breve del cambio"
git push -u origin nombre-del-cambio
```

La primera vez, Git puede pedir que inicies sesión en GitHub. Después de subir, GitHub muestra un enlace para crear el *pull request*; también podés crearlo desde la pestaña **Pull requests** → **New pull request**, eligiendo tu rama.

## 5. El pull request

Un *pull request* (PR) es la propuesta de unir tu rama con `main`. Sirve para revisar el cambio y obtener la vista previa. Al crearlo:

- Poné un título claro y, si hace falta, una descripción de lo que cambia.
- Pedí revisión a otro editor (*Reviewers*) si el cambio es importante.

## 6. Probar la vista previa (antes de publicar)

Cuando subís una rama y abrís el PR, Cloudflare compila el sitio con tus cambios en una dirección aparte, sin tocar la web pública.

1. En la página del PR, esperá uno o dos minutos y buscá un **comentario de Cloudflare** (bot) con el estado del build.
2. Cuando diga que terminó bien, abrí el enlace **Branch Preview URL**. Tiene la forma `nombre-de-rama-NOMBRE.subdominio.workers.dev`.
3. Revisá ahí el resultado, en español e inglés. El enlace se mantiene igual aunque sigas agregando cambios a la misma rama: con cada `push` se actualiza.
4. Si algo no está bien, corregilo (en la web o en tu computadora) y volvé a subir. La vista previa se actualiza sola.

Si el build falla, el comentario lo indica. Abrí el enlace de detalles del build y leé las últimas líneas del log: casi siempre el error es una tabulación o comilla mal puesta en el encabezado de un `.md` (ver sección 10).

**Si no aparece ningún comentario ni vista previa:** avisar a un administrador. Se resuelve activando la opción *Builds for non-production branches* en Cloudflare (Settings → Build → Branch control) y verificando que estén habilitadas las *Preview URLs* del proyecto.

## 7. Publicar

1. Con la vista previa revisada y aprobada, entrá al PR y hacé clic en **Merge pull request** (o *Squash and merge*) → **Confirm merge**.
2. Cloudflare detecta el cambio en `main` y publica automáticamente. Tarda alrededor de uno a tres minutos.
3. Abrí la web pública y verificá el cambio (puede hacer falta recargar con `Ctrl + F5` para saltear la caché del navegador).
4. Podés borrar la rama (GitHub ofrece el botón *Delete branch* después del merge).

Para ver el estado de una publicación: en GitHub, el tilde o la cruz junto al commit en `main`; en Cloudflare, dentro del proyecto, la pestaña **Deployments** / **Builds**.

### Si algo salió mal después de publicar

- **Rápido:** en el PR ya mergeado, botón **Revert**. Crea un PR nuevo que deshace el cambio; mergearlo.
- **Alternativa:** en Cloudflare, en el historial de despliegues del proyecto, volver a una versión anterior (un administrador debe hacerlo).

## 8. Cambios frecuentes: ejemplos

### Cambiar una fecha importante

En `content/_index.md`, sección `dates:`. Cambiar las dos partes de cada ítem: `date` (formato `AAAA-MM-DD`, lo usan los buscadores) y `label` (lo que se ve en pantalla):

```yaml
    - { date: "2027-07-12", label: "12 jul 2027", text: "Notificación de aceptación" }
```

Hacer lo mismo en `_index.en.md`.

### Cambiar la fecha límite y la cuenta regresiva

En el mismo archivo, bloque `status:`: cambiar `text` (texto visible) y `deadline` (fecha y hora usadas para calcular "Faltan N días"). Respetar el formato `2027-05-03T23:59:00-03:00`.

### Cambiar el enlace de Instagram o Facebook

En `hugo.toml`, bloque `[params.social]`. El enlace de Facebook apunta temporalmente a Instagram: cuando exista la página, reemplazarlo.

### Agregar una edición anterior al menú

En `hugo.toml`, copiar uno de los bloques `[[languages.es.menus.main]]` con `parent = "previous"`, cambiar `name`, `url` y `weight` (el número ordena), y repetir en el bloque de `languages.en`.

### Cambiar un texto de la portada

Los párrafos del llamado son el cuerpo del archivo (debajo del segundo `---`). Se escriben en Markdown normal.

### Agregar una imagen

1. Copiar la imagen a `static/img/` (ideal: menos de 500 KB; evitar nombres con espacios o tildes).
2. Usarla en un archivo `.md` así: `![Descripción de la imagen](/img/nombre.jpg)`

## 9. Agregar una página nueva (novedades, autores, turismo…)

1. Crear una carpeta en `content/` con el nombre de la sección en minúsculas y sin tildes, por ejemplo `content/novedades/`.
2. Dentro, crear **dos archivos**:
   - `_index.md` (español)
   - `_index.en.md` (inglés)
3. Cada uno comienza con un encabezado mínimo:

   ```
   ---
   title: "Novedades"
   ---

   Texto en **Markdown**…
   ```

4. Para agregar la página al menú, en `hugo.toml` añadir un bloque por idioma:

   ```toml
   [[languages.es.menus.main]]
     name = "Novedades"
     url = "/novedades/"
     weight = 25

   [[languages.en.menus.main]]
     name = "News"
     url = "/en/novedades/"
     weight = 25
   ```

   El `weight` determina el orden en el menú (menor = más a la izquierda).
5. Para una **novedad individual**, crear dentro de la carpeta un archivo como `2027-01-15-titulo.md` con `date: 2027-01-15` en el encabezado: la lista de la sección las muestra automáticamente.

## 10. Guía rápida de Markdown

| Quiero | Escribo |
|---|---|
| Título de sección | `## Título` |
| Subtítulo | `### Subtítulo` |
| **Negrita** | `**texto**` |
| *Cursiva* | `*texto*` |
| Lista | `- elemento` (una línea por elemento) |
| Lista numerada | `1. elemento` |
| Enlace | `[texto](https://dirección)` |
| Imagen | `![descripción](/img/archivo.jpg)` |
| Párrafo nuevo | dejar una línea en blanco |

**El encabezado de los archivos (entre las dos líneas `---`) es delicado:**

- Respetar los espacios de sangría: no usar tabulaciones, solo espacios.
- Los textos con dos puntos (`:`) o comillas deben ir entre comillas: `text: "Fecha: 3 de mayo"`.
- Una sola coma o comilla fuera de lugar rompe el build. Si falla, revisar lo último que se tocó.

## 11. Problemas frecuentes

| Problema | Causa probable | Qué hacer |
|---|---|---|
| El build falla con un error de "front matter" o "YAML" | Sangría, comillas o dos puntos mal puestos en un encabezado | Revisar la línea indicada en el log; comparar con un ejemplo que funcione |
| La vista previa no aparece | Rama no subida, PR no creado o builds de ramas desactivados | Verificar que existe el PR; si sigue sin aparecer, avisar a un administrador |
| Subí el cambio y no veo nada en la web pública | El cambio sigue en una rama sin mergear, o es la caché del navegador | Revisar que el PR esté mergeado; recargar con `Ctrl + F5` |
| `hugo server` dice que no encuentra la configuración | Se ejecutó fuera de la carpeta del proyecto | `cd` a la carpeta que contiene `hugo.toml` |
| No se ven los logos en local | Faltan archivos en `static/img/` | Confirmar `logo-corto-negro.png` y `logo-completo-negro.png` |
| Git rechaza el `push` | La rama cambió en GitHub | `git pull` y volver a intentar; si persiste, consultar |

## 12. Lista de verificación antes de publicar

- [ ] Se ve bien en español e inglés.
- [ ] Los enlaces (menú, redes, ediciones anteriores) abren a donde corresponden.
- [ ] Se ve bien en un celular.
- [ ] Fechas y datos revisados dos veces.
- [ ] La vista previa de Cloudflare funciona y fue revisada.
- [ ] Otra persona del equipo la miró, si el cambio es importante.

## 13. Ante cualquier duda

No hay cambio que no se pueda deshacer: todo queda en el historial de GitHub. Ante la duda, trabajar en una rama, revisar la vista previa y consultar antes de hacer merge.
