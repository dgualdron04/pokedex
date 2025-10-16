# Pokedex — Vue 3 + TypeScript

Esta es una Pokedex construida con amor y con Neovim a la lata. Es una Pokedex moderna construida con Vue 3 (Composition API) y TypeScript.  
La app consume **PokeAPI** y ofrece **infinite scroll**, **búsqueda local con debounce**, **favoritos** persistentes y **detalle de Pokémon** mediante un enrutamiento flexible (factory pattern para la ruta de detalle).  
El objetivo fue resolver el caso “simple” pensando desde el día 1 en **gran volumen de datos**, **performance** y **evolutividad**.

---

## Características

- **Listado con infinite scroll** (paginación cliente → servidor).
- **Búsqueda local** (filtro en memoria con `debounce` y `minChars`).
- **Favoritos persistentes** (Local Storage).
- **Página de detalle** reutilizable en distintos flows (ruta construida vía “factory”).
- **Manejo de carga y errores** (loader reutilizable, estados `loading/error`).
- **Cancelación de requests** (AbortController).
- **Metadatos de documento** (títulos por ruta).
- **Pensamiento Atómico (Atomic Design)** aplicado a la construcción de componentes para garantizar escalabilidad visual y coherencia entre niveles de UI.

---

## Cómo pensé el problema (y decisiones técnicas)

1. **Arquitectura por features + capa `shared/`**
   - `features/` encapsula dominio y UI (p.ej., `features/pokedex`, `features/favorites`, `features/search`).
   - `shared/` reúne _composables_ genéricos (`UseApi`, utilidades), UI reutilizable (e.g., `SearchBar`), tipos.
   - Beneficio: **modularidad**, **bajo acoplamiento** y **alta cohesión** para escalar de forma mantenible.

2. **Composables para orquestar lógica**
   - `UseApi<TParams, TData>`: centraliza _fetching_, estados, cancelación y _autoFetch_.
   - `UsePokedexList(pageSize)` y `UsePokedexDetail(name)`: especializan `UseApi` para el dominio Pokedex.
   - `UseLocalSearch(source, { selector, minChars, debounceMs })`: búsqueda en memoria desacoplada del listado.

3. **Rendimiento con grandes datasets**
   - **Paginación incremental**: nunca cargamos todo; pedimos _chunks_ (`limit`, `offset`).
   - **Debounce en búsqueda**: evita recomputaciones excesivas.
   - **Cancelación de requests** al cambiar de página/búsqueda para no “pisar” estados.
   - **Estado mínimo**: guardamos listas y _flags_ imprescindibles; el resto se deriva (computed).
   - **Estrategias previstas** (futuro): _virtual scrolling_, cache por página, prefetch de imágenes, _image lazy-loading_.

4. **Rutas flexibles (factory pattern)**
   - El **detalle** se puede invocar desde distintos contextos (p.ej., `pokedex/:name` o `favorites/:name`).
   - Se pasó una **prop de ruta** a `PokedexItem` para construir el enlace correcto sin duplicar componentes.

5. **Persistencia ligera para favoritos**
   - **Local Storage** para rapidez y simplicidad (clave única, estructura plana).
   - Si el dataset crece masivamente o hay multi-dispositivo, se migra a **IndexedDB** o backend.

6. **Patrón Container/Presentational**
   - Los componentes _container_ manejan la lógica, estado y conexión con servicios.
   - Los componentes _presentational_ se enfocan únicamente en la **visualización y reactividad pura**.
   - Esto permite mantener un **flujo de datos unidireccional**, fácil de testear y de mantener a gran escala.

7. **Composition Pattern**
   - `SearchWrapper` y `BaseButton` siguen el patrón de **composición**, exponiendo slots y lógica compartida.
   - Este enfoque promueve **reutilización**, **extensibilidad** y **composición declarativa**, mejorando la escalabilidad visual de la app.

8. **Atomic Design aplicado**
   - La UI se estructura bajo el pensamiento atómico:
     - **Átomos**: componentes básicos (`BaseButton`, `Loader`, `Icon`, inputs, etc.)
     - **Moléculas**: combinaciones simples (`SearchBar`, `PokemonItem`, etc.)
     - **Organismos**: estructuras completas (`PokedexList`, `Header`, `CardGrid`).
   - Esto facilita la **consistencia visual**, el **reuso jerárquico** y el crecimiento ordenado del sistema de diseño.

9. **UI/UX**
   - **Loader** consistente y _error states_ claros.
   - Mensajes de “sin resultados” cuando la búsqueda está activa y la lista filtrada es vacía.
   - **Accesibilidad** básica (labels en Search, focus states).

---

## Tech Stack

- **Framework:** Vue 3 (Composition API) + **TypeScript**
- **Build tool:** Vite
- **HTTP:** Axios (+ `AbortController` vía helper `LoadAbort`)
- **Estado local y lógica:** Composables (`UseApi`, `UsePokedexList`, `UseLocalSearch`, `UseFavorites`)
- **Ruteo:** Vue Router (ruta de detalle con _factory pattern_)
- **Persistencia client:** Local Storage para favoritos
- **Estilo/UI:** componentes atómicos y moleculares en `shared/ui/*` (loader, search, etc.)
- **Diseño:** Atomic Design + Container/Presentational + Composition Pattern

---

## Estructura (resumen)

```
/pokedex
├─ public/
│  └─ pokeball.svg
│
├─ src/
│  ├─ app/
│  │  ├─ assets/
│  │  │  ├─ icones/
│  │  │  │  ├─ Loader.svg
│  │  │  │  ├─ Search.svg
│  │  │  │  ├─ Star.svg
│  │  │  │  ├─ Tabs.svg
│  │  │  │  └─ x-mark.svg
│  │  │  ├─ images/
│  │  │  │  ├─ background.svg
│  │  │  │  └─ pikachu.svg
│  │  │  └─ styles/
│  │  │      ├─ base.css
│  │  │      └─ tokens.css
│  │  │
│  │  ├─ components/
│  │  │  └─ organisms/
│  │  │      └─ AppTabBar.vue
│  │  │
│  │  ├─ router/
│  │  │  └─ index.ts
│  │  │
│  │  ├─ store/
│  │  │  └─ UseLoadingStore.ts
│  │  │
│  │  └─ views/
│  │      ├─ App.vue
│  │      └─ WelcomeView.vue
│  │
│  ├─ features/
│  │  ├─ details/
│  │  │  ├─ composables/
│  │  │  │  └─ UsePokedexDetail.ts
│  │  │  ├─ routes/
│  │  │  │  └─ index.ts
│  │  │  └─ views/
│  │  │      └─ PokemonDetailView.vue
│  │  │
│  │  ├─ favorites/
│  │  │  ├─ composables/
│  │  │  │  ├─ UseFavorites.ts
│  │  │  │  └─ UseFavoritesList.ts
│  │  │  ├─ routes/
│  │  │  │  └─ index.ts
│  │  │  ├─ store/
│  │  │  │  └─ UseFavoritesStore.ts
│  │  │  └─ views/
│  │  │      └─ PokemonFavoritesView.vue
│  │  │
│  │  ├─ pokedex/
│  │  │  ├─ adapters/
│  │  │  │  └─ PokemonListAdapter.ts
│  │  │  ├─ components/
│  │  │  │  ├─ molecules/
│  │  │  │  │  └─ PokemonItem.vue
│  │  │  │  └─ organisms/
│  │  │  │     └─ PokedexList.vue
│  │  │  ├─ composables/
│  │  │  │  └─ UsePokedexList.ts
│  │  │  ├─ containers/
│  │  │  │  └─ PokedexListContainer.vue
│  │  │  ├─ layouts/
│  │  │  │  └─ PokedexLayout.vue
│  │  │  ├─ routes/
│  │  │  │  └─ index.ts
│  │  │  ├─ services/
│  │  │  │  └─ PokeApiService.ts
│  │  │  └─ views/
│  │  │      └─ PokedexListView.vue
│  │  │
│  │  └─ search/
│  │      ├─ components/
│  │      │  └─ SearchWrapper.vue
│  │      └─ composables/
│  │          └─ UseLocalSearch.ts
│  │
│  ├─ shared/
│  │  ├─ composables/
│  │  │  ├─ UseApi.ts
│  │  │  └─ UseFunctions.ts
│  │  ├─ models/
│  │  │  └─ pokemon/
│  │  │      ├─ EmptyPokemon.ts
│  │  │      ├─ PokemonMapper.ts
│  │  │      ├─ PokemonTypes.ts
│  │  │      ├─ UseApiCall.ts
│  │  │      └─ index.ts
│  │  ├─ ui/
│  │  │  ├─ atoms/
│  │  │  │  ├─ ButtonBase.vue
│  │  │  │  ├─ Loader.vue
│  │  │  │  └─ StarSvg.vue
│  │  │  ├─ molecules/
│  │  │  │  └─ SearchBar.vue
│  │  │  └─ organisms/
│  │  │      └─ (componentes de UI más grandes)
│  │  ├─ utilities/
│  │  │  └─ LoadAbort.ts
│  │  └─ main.ts
│  │
│  └─ main.ts
│
├─ README.md
├─ index.html
├─ package.json
├─ package-lock.json
├─ vite.config.ts
├─ tsconfig.json
├─ tsconfig.app.json
└─ tsconfig.node.json
```

---

## 🔌 API

- **Base:** `https://pokeapi.co/api/v2`
- **Listado:** `GET /pokemon?offset={n}&limit={m}`
- **Detalle:** `GET /pokemon/{name}`

> Se tipan las respuestas (`PokemonListResponse`, `PokemonApiResponse`) y se mapean a modelos internos para evitar _leaks_ del esquema externo.

---

## Empezar

### Requisitos

- Node.js 18+
- PNPM (o npm/yarn)

### Instalación

```bash
pnpm install
# o
npm install
# o
yarn
```

### Desarrollo

```bash
pnpm dev
# o npm run dev / yarn dev
```

### Build

```bash
pnpm build
# o npm run build / yarn build
```

> **Variables de entorno:** no se requieren para PokeAPI pública.

---

## Configuraciones útiles

- **Tamaño de página (infinite scroll):** en `UsePokedexList(pageSize)` puedes ajustar `pageSize` (e.g., 20, 50).
- **Búsqueda local:** en `UseLocalSearch` ajusta `minChars` y `debounceMs` (p. ej., 150–250 ms).
- **Rutas de detalle:** `PokedexItem` recibe la **ruta objetivo** para que favorites/list usen el mismo componente sin confusión.

---

## Licencia

MIT — siéntete libre de usar y mejorar el proyecto.

---

## Contribuir

Issues y PRs son bienvenidos.

---

**TL;DR**: Aunque la app es “sencilla”, fue diseñada con **composables reutilizables**, **rutas flexibles**, **cancelación de requests**, y **controles de rendimiento** listos para escalar a **gran volumen de datos** sin rehacer la base.
