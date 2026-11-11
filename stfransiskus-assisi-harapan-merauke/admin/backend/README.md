# Backend Gereja St. Fransiskus Assisi

REST API untuk panel administrasi Gereja Paroki St. Fransiskus Assisi Harapan Makmur, Merauke. Backend menyediakan endpoint untuk autentikasi admin dan pengelolaan data gereja sehingga data utama dapat disimpan di MongoDB dan diakses oleh aplikasi frontend.

## Fitur Utama

- API berbasis Express untuk admin, event, umat, administratif, pengumuman, dan berita.
- Penyimpanan dokumen menggunakan MongoDB dan Mongoose.
- Autentikasi admin menggunakan JWT dan hash password dengan bcrypt.
- Validasi data umat, sakramen, anggota DPP, homili, berita, serta pengumuman.
- Middleware untuk CORS, pemeriksaan input, dan pembatasan percobaan login.

Beberapa route dan service masih berupa placeholder atau belum lengkap. Periksa implementasi endpoint sebelum menggunakannya pada produksi.

## Tech Stack

- JavaScript (CommonJS) dan Node.js
- Express 5
- MongoDB dengan Mongoose 8
- JWT, bcrypt, dotenv, CORS, dan UUID

## Prasyarat

- Node.js 20.19+ (atau 22.12+) dan npm
- MongoDB lokal atau MongoDB Atlas yang dapat dijangkau dari komputer backend
- Akun admin yang sudah tersedia di koleksi database untuk melakukan login. Route pendaftaran admin saat ini juga memerlukan autentikasi.

## Instalasi

Dari root repository:

```powershell
cd admin/backend
npm ci
Copy-Item .env.example .env
```

Jika menggunakan Git Bash atau shell POSIX, gunakan `cp .env.example .env` untuk langkah penyalinan. Isi nilai environment lokal, lalu jalankan:

```sh
npm run dev
```

Server berjalan pada `http://localhost:5000`. Untuk menjalankan tanpa nodemon, gunakan `npm start`.

## Konfigurasi

Salin `.env.example` menjadi `.env`, lalu sesuaikan dengan database dan secret lokal. Jangan commit `.env` atau memasukkan kredensial nyata ke README.

```dotenv
MONGO_URI=mongodb://127.0.0.1:27017/stfransiskus_assisi
JWT=replace_with_a_long_random_secret
```

`MONGO_URI` adalah connection string MongoDB. `JWT` dipakai untuk menandatangani token autentikasi.

## Penggunaan

Perintah yang tersedia:

```sh
npm run dev  # server pengembangan dengan nodemon
npm start    # jalankan server dengan Node.js
```

Cek server dengan membuka `http://localhost:5000/` atau menjalankan `curl.exe http://localhost:5000/`.

Prefiks endpoint yang didaftarkan:

| Prefiks              | Kegunaan                           |
| -------------------- | ---------------------------------- |
| `/api/admin`         | Login dan pengelolaan admin        |
| `/api/events`        | Event gereja                       |
| `/api/inputmember`   | Data umat                          |
| `/api/administratif` | Data administratif dan anggota DPP |
| `/api/anouncement`   | Pengumuman dashboard               |
| `/api/news`          | Berita                             |

Automated test belum dikonfigurasi. Script `npm test` saat ini hanya mengeluarkan pesan `Error: no test specified` dan keluar dengan status gagal.

## Struktur Folder

- `config/`: koneksi database
- `helper/`: fungsi validasi input
- `midleware/`: autentikasi dan keamanan request
- `model/`: skema Mongoose
- `route/`: definisi endpoint HTTP
- `service/`: logika akses data dan bisnis

## Kontribusi

Status open-source belum ditetapkan. Koordinasikan perubahan dengan pemilik repository sebelum membuka kontribusi. Untuk setiap perubahan, jelaskan endpoint yang terdampak, jangan sertakan secret, dan tambahkan test ketika test suite tersedia.

## Lisensi dan Kontak

Metadata `admin/backend/package.json` mencantumkan lisensi ISC untuk paket backend. Lisensi repo secara keseluruhan belum ditetapkan. Kontak resmi belum dicantumkan; hubungi pengelola repository atau sekretariat paroki melalui kanal resmi.
