# BarberApp - Aplicación web para barbería

Proyecto académico sencillo y funcional desarrollado con frontend y backend.

## Tecnologías
- React + Vite
- Node.js + Express
- MongoDB / NoSQL
- Axios
- React Router DOM
- Context API
- Swagger

## Módulos
- Clientes
- Barberos
- Servicios
- Citas
- Login demo
- Panel principal

## Ejecutar backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend:
http://localhost:4000

Swagger:
http://localhost:4000/api-docs

## Ejecutar frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend:
http://localhost:5173

## Base de datos
Usar MongoDB local:

```bash
mongodb://127.0.0.1:27017/barberia_db
```

Este proyecto usa NoSQL porque la información de clientes, citas, barberos y servicios puede crecer de forma flexible.
