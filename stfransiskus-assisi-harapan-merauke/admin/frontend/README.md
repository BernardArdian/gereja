# Panel Admin Gereja St. Fransiskus Assisi

Aplikasi web untuk membantu pengelola paroki mengakses halaman data umat, katekese, berita, administrasi gereja, pengumuman, dan pengelolaan admin. Frontend ini menyediakan satu antarmuka untuk tugas administrasi yang sebelumnya tersebar di berbagai bagian.

## Fitur Utama

- Navigasi dashboard dengan halaman umat, katekese, berita, administratif, dan admin.
- Tampilan data umat, pencarian, filter, statistik, detail, dan pratinjau cetak.
- Formulir pengelolaan konten gereja dan dialog konfirmasi untuk aksi tertentu.
- Klien Axios untuk komunikasi dengan backend dan penyertaan token Bearer bila tersedia.
- Layout responsif dan pilihan tema.

Beberapa halaman masih menggunakan data contoh atau memiliki integrasi API yang belum lengkap. Periksa status tiap fitur sebelum dipakai untuk mengubah data produksi.

## Tech Stack

- JavaScript, React 19, dan React Router 7
- Vite 7 dan React Compiler
- Tailwind CSS 4, Framer Motion, dan Lucide React
- Axios untuk request HTTP

## Prasyarat

- Node.js 20.19+ (atau 22.12+) dan npm
- Backend berjalan pada `http://localhost:5000` untuk fitur yang memerlukan API

## Instalasi dan Menjalankan

Dari root repository:

```powershell
cd admin/frontend
npm ci
npm run dev
```

Vite membuka panel pada `http://localhost:5173` secara default. Jalankan backend pada terminal lain jika halaman yang digunakan memerlukan API.

## Konfigurasi

File `.env.example` sudah menyediakan konfigurasi lokal. Salin menjadi `.env` sebelum menjalankan aplikasi:

```powershell
Copy-Item .env.example .env
```

```dotenv
VITE_BASE_URL=http://localhost:5000/api
```

Variabel `VITE_BASE_URL` adalah alamat dasar API. Nilai ini bukan rahasia; jangan menaruh secret di variabel `VITE_*` karena nilainya dikirim ke browser.

## Perintah

```sh
npm run dev      # server pengembangan
npm run lint     # ESLint
npm run build    # build produksi ke dist/
npm run preview  # pratinjau build produksi
```

Belum ada script test otomatis di `package.json`.

## Struktur Folder

- `src/pages/`: halaman dashboard
- `src/component/`: komponen UI dan formulir
- `src/api/`: klien HTTP dan service API
- `src/security/`: validasi request frontend
- `public/`: aset statis

## Kontribusi

Status open-source belum ditetapkan. Koordinasikan kontribusi dengan pemilik repository. Gunakan pola komponen dan API yang sudah ada, jangan commit `.env`, dan jalankan `npm run lint` serta `npm run build` sebelum mengajukan perubahan.

## Lisensi dan Kontak

Lisensi frontend belum dinyatakan di `package.json` atau file lisensi khusus. Kontak resmi belum dicantumkan; hubungi pengelola repository atau sekretariat paroki melalui kanal resmi.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
