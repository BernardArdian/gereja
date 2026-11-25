# Situs Gereja St. Fransiskus Assisi

Frontend publik untuk menyampaikan informasi Gereja Paroki St. Fransiskus Assisi Harapan Makmur, Merauke. Situs ini menyatukan informasi profil gereja, pedoman, katekese, pengumuman, berita, administrasi, dan galeri agar dapat diakses umat melalui web.

## Fitur Utama

- Beranda dengan ringkasan konten, berita, pengumuman, dan galeri.
- Halaman profil, sejarah, visi-misi, serta anggota Dewan Pastoral Paroki.
- Halaman pedoman pastoral, katekese, administratif, pengumuman, dan berita.
- Pencarian, filter, pagination, serta tampilan detail untuk beberapa daftar konten.
- Navigasi responsif dan pilihan tema yang disimpan di browser.

Sebagian konten masih berasal dari data contoh di frontend. Situs saat ini tidak memerlukan API backend untuk dijalankan.

## Tech Stack

- JavaScript, React 19, dan React Router 7
- Vite 7 dan React Compiler
- Tailwind CSS 4 dan Lucide React
- Axios tercantum sebagai dependency, tetapi belum digunakan untuk request backend pada landing page

## Prasyarat

- Node.js 20.19+ (atau 22.12+) dan npm

## Instalasi

Dari root repository:

```powershell
cd landingpage/frontend
npm ci
```

## Konfigurasi

Tidak ada variabel environment yang diperlukan saat ini. Bila konfigurasi API atau deployment ditambahkan, catat nama variabel di sini tanpa nilai rahasia.

## Cara Menjalankan

```sh
npm run dev      # server pengembangan
npm run lint     # ESLint
npm run build    # build produksi ke dist/
npm run preview  # pratinjau build produksi
```

Vite berjalan pada `http://localhost:5173` secara default. Jika port tersebut sudah dipakai, pilih port lain:

```sh
npm run dev -- --port 5174
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
