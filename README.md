<div align="center">

**English** | [Türkçe](README_tr.md)

# Employee Management — React Frontend

Single-page employee CRUD app (React 18) that consumes the
[Employee-Management-.NET-6-WEB-API](https://github.com/gsekercisoy/Employee-Management-.NET-6-WEB-API)
backend.

</div>

## Features

- Employee table (`ID / Name / Age / IsActive / Actions`)
- Add employee via top form (name + age + active checkbox)
- Edit in a modal dialog, delete with confirmation
- Success/error toast notifications (`react-toastify`)

## Tech stack

- React 18.2 (Create React App), axios, Bootstrap 5 + react-bootstrap

## Getting started

The backend must run first — the app calls `https://localhost:7010/api/Employee/`.

```bash
npm install
npm start   # http://localhost:3000
```

## API used

| Method | Endpoint |
|---|---|
| GET | `/api/Employee/GetAll` |
| GET | `/api/Employee/GetById/{id}` |
| POST | `/api/Employee/Add` |
| PUT | `/api/Employee/Update/{id}` |
| DELETE | `/api/Employee/Delete/{id}` |

## Structure

```
src/
  App.js    # renders CRUD
  CRUD.js   # table + form + modal + API calls
  index.js  # entry point
```
