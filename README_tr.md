<div align="center">

[English](README.md) | **Türkçe**

# Employee Management — React Arayüz

[Employee-Management-.NET-6-WEB-API](https://github.com/gsekercisoy/Employee-Management-.NET-6-WEB-API)
backend'ini kullanan tek sayfalık çalışan CRUD uygulaması (React 18).

</div>

## Özellikler

- Çalışan tablosu (`ID / Name / Age / IsActive / Actions`)
- Üst formdan ekleme (isim + yaş + aktif kutusu)
- Modal pencerede düzenleme, onaylı silme
- Başarı/hata bildirimleri (`react-toastify`)

## Teknolojiler

- React 18.2 (Create React App), axios, Bootstrap 5 + react-bootstrap

## Çalıştırma

Önce backend ayağa kalkmalı — uygulama `https://localhost:7010/api/Employee/` adresini çağırır.

```bash
npm install
npm start   # http://localhost:3000
```

## Kullanılan API

| Yöntem | Uç nokta |
|---|---|
| GET | `/api/Employee/GetAll` |
| GET | `/api/Employee/GetById/{id}` |
| POST | `/api/Employee/Add` |
| PUT | `/api/Employee/Update/{id}` |
| DELETE | `/api/Employee/Delete/{id}` |

## Yapı

```
src/
  App.js    # CRUD render eder
  CRUD.js   # tablo + form + modal + API çağrıları
  index.js  # giriş noktası
```
