# Situs Gereja St. Fransiskus Assisi

Frontend publik untuk menyampaikan informasi Gereja Paroki St. Fransiskus Assisi Harapan Makmur, Merauke. Situs ini menyatukan informasi profil gereja, pedoman, katekese, pengumuman, berita, administrasi, dan galeri agar dapat diakses umat melalui web.

## Fitur Utama

- Beranda dengan ringkasan konten, berita, pengumuman, dan galeri.
- Halaman profil, sejarah, visi-misi, serta anggota Dewan Pastoral Paroki.
- Halaman pedoman pastoral, katekese, administratif, pengumuman, dan berita.
- Pencarian, filter, pagination, serta tampilan detail untuk beberapa daftar konten.
- Navigasi responsif dan pilihan tema yang disimpan di browser.

Saat ini sebagian konten berasal dari data contoh yang ditulis di frontend. Belum ada variabel environment atau integrasi API backend yang diperlukan untuk menjalankan situs ini.

## Tech Stack

- JavaScript, React 19, dan React Router 7
- Vite 7 dan React Compiler
- Tailwind CSS 4 dan Lucide React
- Axios tercantum sebagai dependency, tetapi frontend saat ini belum menggunakan klien API backend

## Prasyarat

- Node.js 20.19+ (atau 22.12+) dan npm

## Instalasi dan Menjalankan

Dari root repository:

```powershell
cd landingpage/frontend
npm ci
npm run dev
```

Vite menggunakan `http://localhost:5173` secara default. Jika panel admin sudah memakai port tersebut, jalankan landing page pada port lain:

```sh
npm run dev -- --port 5174
```

## Konfigurasi

Tidak ada variabel environment yang diperlukan saat ini. Jika konfigurasi API atau deployment ditambahkan kemudian, dokumentasikan nama variabel di sini tanpa nilai rahasia.

## Perintah

```sh
npm run dev      # server pengembangan
npm run lint     # ESLint
npm run build    # build produksi ke dist/
npm run preview  # pratinjau build produksi
```

Belum ada script test otomatis di `package.json`.

## Struktur Folder

- `src/pages/`: halaman dan rute situs
- `src/component/`: navigasi, daftar konten, detail, dan komponen bersama
- `src/assets/`: gambar dan aset yang diimpor oleh aplikasi
- `public/`: aset statis yang disajikan langsung

## Kontribusi

Status open-source belum ditetapkan. Koordinasikan kontribusi dengan pemilik repository. Pertahankan komponen responsif, gunakan data/API yang telah disepakati, jangan commit kredensial, dan jalankan `npm run lint` serta `npm run build` sebelum mengajukan perubahan.

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
