# Random Users

Lista de usuarios aleatorios de la API randomuser.me con filtro por país, ordenación, coloreado de filas y borrado.

**Demo:** https://mballesterdev.github.io/react-random-users/

## Funcionalidades

- Consumo de la API [randomuser.me](https://randomuser.me) con `fetch` y `useEffect`
- Filtro por país en tiempo real (usando `useRef` para conservar los datos originales)
- Ordenación por país, coloreado de filas y borrado de usuarios
- Botón para restaurar el estado inicial

## Tecnologías

React 19 · Vite · TypeScript · Tailwind CSS 4

## Uso en local

```bash
npm install
npm run dev
```

## Despliegue en GitHub Pages

El proyecto ya está configurado para GitHub Pages:

- `vite.config.ts` define `base: '/react-random-users/'` (el nombre del repositorio).
- `package.json` incluye `homepage` y los scripts `predeploy` y `deploy` (paquete `gh-pages`).

Para publicar una nueva versión:

```bash
npm run deploy
```

Esto genera `dist/` y lo sube a la rama `gh-pages`. En el repositorio, **Settings → Pages** debe tener como origen la rama `gh-pages` y la carpeta `/ (root)`.
