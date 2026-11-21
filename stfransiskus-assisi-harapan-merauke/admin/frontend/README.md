# Panel Admin Gereja St. Fransiskus Assisi

Frontend administrasi untuk mengelola data umat dan konten gereja melalui satu dashboard. Aplikasi menggunakan API backend Express dan MongoDB untuk fitur data yang sudah terhubung.

## Fitur Utama

- Halaman data umat dengan pencarian, filter, statistik, dan pratinjau cetak.
- Halaman dashboard, katekese, berita, administrasi, dan pengelolaan admin.
- Login admin melalui API, route guard, dan logout yang menghapus sesi lokal.
- Klien Axios yang menyertakan Bearer token dan menolak mutasi JSON identik yang masih berjalan.
- Komponen bersama untuk field formulir, dropdown, pagination, editor konten, dan konfirmasi penghapusan.

Beberapa halaman masih menggunakan data contoh atau integrasi API yang belum lengkap. Verifikasi endpoint sebelum memakai fitur untuk mengubah data produksi.

## Tech Stack

- JavaScript, React 19, React Router 7, Vite 7, dan React Compiler
- Tailwind CSS 4, Framer Motion, dan Lucide React
- Axios untuk komunikasi dengan backend

## Prasyarat

- Node.js 20.19+ (atau 22.12+) dan npm
- Backend berjalan di `http://localhost:5000` untuk fungsi yang memakai API
- Akun admin yang terdaftar pada database backend

## Instalasi

```powershell
cd admin/frontend
npm ci
Copy-Item .env.example .env
npm run dev
```

Vite menggunakan `http://localhost:5173` secara default.

## Konfigurasi

`.env.example` berisi alamat dasar API:

```dotenv
VITE_BASE_URL=http://localhost:5000/api
```

`VITE_BASE_URL` bukan secret. Jangan menaruh password, JWT secret, atau encryption key di variabel `VITE_*`, karena nilai tersebut dikirim ke browser.

## Cara Penggunaan dan Perintah

Buka `/login`, masuk dengan akun admin, lalu gunakan dashboard. Route admin diarahkan kembali ke login saat token tidak tersedia atau ditolak backend.

```sh
npm run dev      # server pengembangan
npm run lint     # ESLint
npm run build    # build produksi ke dist/
npm run preview  # pratinjau build produksi
```

Belum ada script test frontend. Backend menyediakan tes security dengan `npm test` dari direktori backend.

## Catatan Keamanan

- Backend adalah otoritas autentikasi dan validasi; guard browser hanya meningkatkan UX dan bukan pengganti pemeriksaan server.
- React meng-escape teks secara default. Hindari `dangerouslySetInnerHTML`; gunakan sanitizer yang terawat bila kelak perlu menampilkan HTML.
- Token saat ini disimpan di `localStorage`; gunakan HTTPS pada deployment dan jangan menyimpan secret server di frontend.
- Deduplikasi mutasi di Axios hanya berlaku untuk request identik yang sedang berlangsung dari browser ini.

## Struktur Folder

- `src/pages/`: halaman dashboard
- `src/component/`: komponen UI dan formulir bersama
- `src/api/`: klien HTTP dan service API
- `src/security/`: validasi input request, login limit lokal, dan deduplikasi request
- `public/`: aset statis

## Kontribusi

Status open-source belum ditetapkan. Koordinasikan kontribusi dengan pemilik repository. Gunakan komponen dan API bersama yang sudah tersedia, jangan commit `.env`, lalu jalankan `npm run lint` dan `npm run build`.

## Lisensi dan Kontak

Lisensi frontend belum dinyatakan di `package.json` atau file lisensi khusus. Kontak resmi belum dicantumkan; hubungi pengelola repository atau sekretariat paroki melalui kanal resmi.
