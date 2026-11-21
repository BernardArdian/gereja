# Backend Gereja St. Fransiskus Assisi

REST API untuk panel administrasi Gereja Paroki St. Fransiskus Assisi Harapan Makmur, Merauke. Backend menyediakan endpoint untuk autentikasi admin dan pengelolaan data gereja sehingga data utama dapat disimpan di MongoDB dan diakses oleh aplikasi frontend.

## Fitur Utama

- API berbasis Express untuk admin, event, umat, administratif, pengumuman, dan berita.
- Penyimpanan dokumen menggunakan MongoDB dan Mongoose.
- Autentikasi admin menggunakan JWT dan hash password dengan bcrypt.
- Validasi data umat, sakramen, anggota DPP, homili, berita, serta pengumuman.
- Header keamanan HTTP, pemeriksaan struktur input NoSQL, dan rate limit API/login.
- Enkripsi field pribadi umat menggunakan AES-256-GCM; indeks KK menggunakan HMAC-SHA-256.

Beberapa route dan service masih berupa placeholder atau belum lengkap. Periksa implementasi endpoint sebelum menggunakannya pada produksi.

## Tech Stack

- JavaScript (CommonJS) dan Node.js
- Express 5
- MongoDB dengan Mongoose 8
- JWT, bcrypt, dotenv, CORS, Helmet, express-rate-limit, AES-256-GCM, dan UUID

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

Jika menggunakan Git Bash atau shell POSIX, gunakan `cp .env.example .env` untuk langkah penyalinan. Isi nilai environment dan buat backup MongoDB. Migrasi enkripsi harus dijalankan sekali pada semua database, termasuk database baru; bila database sudah berisi umat, hentikan write traffic sebelum migrasi:

```sh
npm run migrate:umat-encryption
npm run dev
```

Server berjalan pada `http://localhost:5000`. Untuk menjalankan tanpa nodemon, gunakan `npm start`.

## Konfigurasi

Salin `.env.example` menjadi `.env`, lalu sesuaikan dengan database dan secret lokal. Jangan commit `.env` atau memasukkan kredensial nyata ke README.

```dotenv
MONGO_URI=mongodb://127.0.0.1:27017/stfransiskus_assisi
MONGO_TLS=false
TRUST_PROXY_HOPS=0
JWT=replace_with_a_long_random_secret
DATA_ENCRYPTION_KEY=generate_a_private_32_byte_base64_key
```

`MONGO_URI` adalah connection string MongoDB. `MONGO_TLS=true` memaksa TLS untuk URI non-SRV; MongoDB Atlas `mongodb+srv://` sudah menggunakan TLS secara default. `TRUST_PROXY_HOPS` tetap `0` kecuali server berada di belakang reverse proxy tepercaya; isi dengan jumlah hop yang benar, jangan memakai trust proxy tanpa batas. `JWT` dipakai untuk menandatangani token autentikasi. `DATA_ENCRYPTION_KEY` harus merupakan base64 dari 32 byte acak; buat nilainya secara lokal dan jangan commit `.env`:

```sh
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64'))"
```

AES-256-GCM mengenkripsi field identitas umat. Nomor KK disimpan terenkripsi dan dideduplikasi melalui HMAC-SHA-256. Kehilangan kunci membuat data tidak dapat didekripsi; simpan key backup secara terpisah dan lakukan prosedur rotasi sebelum mengganti key.

Backend menolak start bila kunci tidak valid atau marker migrasi `umat-aes-gcm-v1` belum ada. Migrasi harus dilakukan dengan backup database dan tanpa write traffic. Skrip migrasi memeriksa duplikasi KK sebelum mengubah dokumen.

## Penggunaan

Perintah yang tersedia:

```sh
npm run dev  # server pengembangan dengan nodemon
npm start    # jalankan server dengan Node.js
npm test     # tes security bawaan Node.js
npm run migrate:umat-encryption  # migrasi data umat ke AES-GCM
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

Rate limit membatasi API hingga 180 request per 15 menit dan login hingga 5 kegagalan per 15 menit per alamat IP. Penyimpanan limiter bawaan berada di memori satu proses; deployment multi-instance perlu shared store seperti Redis.

MongoDB adalah satu-satunya database di proyek ini, jadi perlindungan query yang relevan adalah NoSQL operator injection; helper query juga meng-escape regex pencarian. React melakukan escaping teks secara default dan source admin tidak menggunakan sink HTML mentah. Jangan gunakan `dangerouslySetInnerHTML` tanpa sanitizer tepercaya.

## Struktur Folder

- `config/`: koneksi database
- `helper/`: fungsi validasi input
- `midleware/`: autentikasi dan keamanan request
- `security/`: limiter, input guard, regex aman, header, dan enkripsi
- `scripts/`: migrasi data
- `tests/`: tes keamanan
- `model/`: skema Mongoose
- `route/`: definisi endpoint HTTP
- `service/`: logika akses data dan bisnis

## Kontribusi

Status open-source belum ditetapkan. Koordinasikan perubahan dengan pemilik repository sebelum membuka kontribusi. Untuk setiap perubahan, jelaskan endpoint yang terdampak, jangan sertakan secret, dan tambahkan test ketika test suite tersedia.

## Lisensi dan Kontak

Metadata `admin/backend/package.json` mencantumkan lisensi ISC untuk paket backend. Lisensi repo secara keseluruhan belum ditetapkan. Kontak resmi belum dicantumkan; hubungi pengelola repository atau sekretariat paroki melalui kanal resmi.
