
# API SIMRS - Sistem Informasi Manajemen Rumah Sakit

API Sistem Informasi Manajemen Rumah Sakit adalah API yang dibuat untuk membuat aplikasi Web,Moblie, dll

## Features

- Login Dokter
- Get data pasien Dokter
- Cek rekam medis


## API Reference

#### Login Dokter

```http
  POST /api/auth/login/dokter
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `body`    | `json`   | {"user": "xx","password" : "xx"} |
|`response` | `json` |
|   
{   "status": true,
    "message": "Login dokter Berhasil",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1hIjoiZHIuIFJVQ0hBTklIQURJLCBTcC5QRCIsIm5payI6IkQxIiwiamFiYXRhbiI6IkRva3RlciIsImprIjoiUHJpYSIsImlhdCI6MTY2MzQ4OTQzMn0.2SMOQ18S6_svMQLO0iKkOJT-EZORM4Ph2nlyfyn1AKs",
    "data": {
        "nama": "dr. RUCHANIHADI, Sp.PD",
        "nik": "D1",
        "jabatan": "Dokter",
        "jk": "Pria"
    }
|


##  Penbangan tidak laangsung Aplikasi SIMRS-Khanza

API ini menggunakan database SIMRS-Khanza yang buat oleh :
https://github.com/mas-elkhanza/SIMRS-Khanza


## Documentation

[Documentation](https://linktodocumentation)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`ANOTHER_API_KEY`

## Authors

- [Fakhry Hizballah](https://github.com/fakhryhizballah/)
- [@hizballah_al](https://www.instagram.com/hizballah_al/)
