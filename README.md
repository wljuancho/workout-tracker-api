# Workout Tracker API

API RESTful con Node.js y Express para usuarios, entrenamientos, ejercicios y progreso.

## Ejecutar

```powershell
npm install
npm run dev
```

URL base: `http://localhost:8000`

## Estructura

```text
workout-tracker-api/
├── .env
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
└── src/
    ├── app.js
    ├── config/
    │   └── env.js
    ├── controllers/
    │   ├── exercises.controller.js
    │   ├── progress.controller.js
    │   ├── users.controller.js
    │   └── workouts.controller.js
    └── routes/
        ├── index.js
        └── v1/
            ├── exercises.routes.js
            ├── index.js
            ├── progress.routes.js
            ├── users.routes.js
            └── workouts.routes.js
```

## Rutas

Todas las rutas de recursos usan `/api/v1`:

- `/api/v1/users`
- `/api/v1/workouts`
- `/api/v1/exercises`
- `/api/v1/progress`

Cada recurso implementa `GET`, `GET /:id`, `POST`, `PUT`, `PATCH` y `DELETE`.

## Prueba en Postman

Selecciona **Body > raw > JSON** y agrega `Content-Type: application/json`.

### POST de usuario

```text
POST http://localhost:8000/api/v1/users
```

```json
{
  "name": "Ana Torres",
  "email": "ana@example.com",
  "role": "admin"
}
```

Respuesta: `201 Created`.

### GET y filtros

```text
GET http://localhost:8000/api/v1/users
GET http://localhost:8000/api/v1/users?role=admin&search=ana
GET http://localhost:8000/api/v1/users/ID_USUARIO
```

### PUT y PATCH

```text
PUT http://localhost:8000/api/v1/users/ID_USUARIO
PATCH http://localhost:8000/api/v1/users/ID_USUARIO
```

Body PUT:

```json
{
  "name": "Ana Actualizada",
  "email": "ana.actualizada@example.com",
  "role": "user"
}
```

Body PATCH:

```json
{
  "role": "admin"
}
```

### DELETE

```text
DELETE http://localhost:8000/api/v1/workouts/ID_ENTRENAMIENTO
```

Respuesta: `204 No Content`; si no existe, `404 Not Found`.

## Códigos HTTP

- `200`: consulta o actualización correcta.
- `201`: recurso creado.
- `204`: recurso eliminado.
- `400`: datos inválidos o JSON malformado.
- `404`: recurso no encontrado.
- `500`: error interno.

## Ramas

- `main`: versión estable.
- `develop`: integración.
- `feat/users`: usuarios.
- `feat/workouts`: entrenamientos.
- `feat/exercises`: ejercicios.
- `feat/progress`: progreso.

Para crear una versión 2, se crea `src/routes/v2`, se registra en `src/routes/index.js` y se conserva `/api/v1` para no romper clientes existentes.

La implementación actual usa memoria para las demostraciones. `mysql2`, `.env` y `src/config/env.js` dejan preparada la conexión futura con MySQL.
