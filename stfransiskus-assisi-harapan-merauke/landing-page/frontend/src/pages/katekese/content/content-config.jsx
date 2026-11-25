import { heroImages } from "../../../component/common/hero-header/hero-image";
import {
  SaintCard,
  RenunganCard,
  DevosiCard,
  TradisiCard,
} from "../../../component/common/cards";
// Data contoh; nanti cukup diganti dengan data dari backend.
const saintsBase = [
  {
    id: 1,
    name: "St. Fransiskus Asisi",
    postDay: "04 Okt",
    patronOf: "Hewan & Lingkungan",
    summary:
      "Dikenal karena cintanya pada kemiskinan dan persaudaraan dengan alam semesta.",
    image: "https://picsum.photos/seed/saints1/400/400",
  },
  {
    id: 2,
    name: "St. Teresa dari Kalkuta",
    postDay: "05 Sep",
    patronOf: "Orang Miskin",
    summary:
      "Pendiri Misionaris Kasih yang melayani orang yang paling miskin di antara yang miskin.",
    image: "https://picsum.photos/seed/saints2/400/400",
  },
  {
    id: 3,
    name: "St. Yohanes Paulus II",
    postDay: "22 Okt",
    patronOf: "Keluarga & Kaum Muda",
    summary:
      "Paus yang membawa gereja memasuki milenium baru dengan semangat dialog.",
    image: "https://picsum.photos/seed/saints3/400/400",
  },
  {
    id: 4,
    name: "St. Antonius Padua",
    postDay: "13 Jun",
    patronOf: "Barang Hilang",
    summary:
      "Pujangga Gereja yang dikenal sebagai pengkhotbah ulung dan pembuat mukjizat.",
    image: "https://picsum.photos/seed/saints4/400/400",
  },
  {
    id: 5,
    name: "St. Monika",
    postDay: "27 Ags",
    patronOf: "Ibu & Istri",
    summary:
      "Teladan kesabaran doa seorang ibu bagi pertobatan anaknya, St. Agustinus.",
    image: "https://picsum.photos/seed/saints5/400/400",
  },
  {
    id: 6,
    name: "St. Sebastianus",
    postDay: "20 Jan",
    patronOf: "Olahragawan",
    summary:
      "Martir gereja perdana yang menunjukkan keberanian iman yang luar biasa.",
    image: "https://picsum.photos/seed/saints6/400/400",
  },
];
// Data 7-12 identik dengan 1-6, jadi cukup disalin dengan id baru.
const saints = [
  ...saintsBase,
  ...saintsBase.map((item) => ({ ...item, id: item.id + 6 })),
];

const renungan = [
  {
    id: 1,
    date: "03 Feb 2026",
    title: "Menemukan Kedamaian dalam Badai",
    verse: "Matius 8:26",
    excerpt:
      "Mengapa kamu takut, kamu yang kurang percaya? Lalu bangunlah Yesus menghardik angin dan danau itu...",
    author: "Rm. Yohanes, Pr",
    category: "Harian",
  },
  {
    id: 2,
    date: "02 Feb 2026",
    title: "Setia dalam Perkara Kecil",
    verse: "Lukas 16:10",
    excerpt:
      "Barangsiapa setia dalam perkara-perkara kecil, ia setia juga dalam perkara-perkara besar...",
    author: "Rm. Petrus, Pr",
    category: "Harian",
  },
  {
    id: 3,
    date: "01 Feb 2026",
    title: "Kasih yang Memulihkan",
    verse: "1 Korintus 13:4",
    excerpt: "Kasih itu sabar; kasih itu murah hati; ia tidak cemburu...",
    author: "Rm. Markus, SVD",
    category: "Mingguan",
  },
  {
    id: 4,
    date: "31 Jan 2026",
    title: "Garam dan Terang Dunia",
    verse: "Matius 5:13-14",
    excerpt:
      "Kamu adalah garam dunia. Jika garam itu menjadi tawar, dengan apakah ia diasinkan?...",
    author: "Rm. Andreas, Pr",
    category: "Harian",
  },
  {
    id: 5,
    date: "30 Jan 2026",
    title: "Memikul Salib Setiap Hari",
    verse: "Lukas 9:23",
    excerpt:
      "Setiap orang yang mau mengikut Aku, ia harus menyangkal dirinya, memikul salibnya setiap hari...",
    author: "Rm. Stefanus, Pr",
    category: "Khusus",
  },
  {
    id: 6,
    date: "29 Jan 2026",
    title: "Roti Hidup yang Turun dari Surga",
    verse: "Yohanes 6:35",
    excerpt:
      "Akulah roti hidup; barangsiapa datang kepada-Ku, ia tidak akan lapar lagi...",
    author: "Rm. Thomas, Pr",
    category: "Harian",
  },
];

const devosi = [
  {
    id: 1,
    title: "Doa Koronka",
    schedule: "Setiap Jam 15.00",
    location: "Kapel Adorasi",
    members: "45 Orang",
    category: "Rutin",
    image: "https://picsum.photos/seed/pray1/800/600",
  },
  {
    id: 2,
    title: "Novena Tiga Salam Maria",
    schedule: "9 Hari Berturut",
    location: "Gereja Pusat",
    members: "Umum",
    category: "Khusus",
    image: "https://picsum.photos/seed/pray2/800/600",
  },
  {
    id: 3,
    title: "Legio Mariae",
    schedule: "Setiap Sabtu 16.00",
    location: "Aula Paroki",
    members: "20 Orang",
    category: "Grup",
    image: "https://picsum.photos/seed/pray3/800/600",
  },
  {
    id: 4,
    title: "Adorasi Sakramen Mahakudus",
    schedule: "Kamis Pertama",
    location: "Gereja Utama",
    members: "Seluruh Umat",
    category: "Rutin",
    image: "https://picsum.photos/seed/pray4/800/600",
  },
  {
    id: 5,
    title: "Devosi Hati Kudus Yesus",
    schedule: "Jumat Pertama",
    location: "Gereja Utama",
    members: "Umum",
    category: "Rutin",
    image: "https://picsum.photos/seed/pray5/800/600",
  },
  {
    id: 6,
    title: "Kelompok Doa Karismatik",
    schedule: "Setiap Rabu Malam",
    location: "Aula Stasi",
    members: "35 Orang",
    category: "Grup",
    image: "https://picsum.photos/seed/pray6/800/600",
  },
  {
    id: 7,
    title: "Doa Rosario Lingkungan",
    schedule: "Senin & Kamis",
    location: "Lingkungan",
    members: "Warga",
    category: "Rutin",
    image: "https://picsum.photos/seed/pray7/800/600",
  },
];

const tradisiBase = [
  {
    id: 1,
    title: "Perarakan Patung Maria",
    location: "Gereja Pusat",
    period: "Mei & Oktober",
    description:
      "Tradisi doa Rosario keliling lingkungan setiap malam di bulan Maria.",
    image: "https://picsum.photos/seed/maria/800/600",
    category: "LITURGI",
  },
  {
    id: 2,
    title: "Pesta Pelindung Paroki",
    location: "Pusat Paroki",
    period: "15 Agustus",
    description: "Perayaan syukur pelindung paroki dengan pesta rakyat.",
    image: "https://picsum.photos/seed/pesta/800/600",
    category: "BUDAYA",
  },
  {
    id: 3,
    title: "Misa Inkulturasi",
    location: "Stasi Kurik",
    period: "Acara Khusus",
    description: "Perpaduan tata gerak musik tradisional dalam Ekaristi.",
    image: "https://picsum.photos/seed/culture/800/600",
    category: "BUDAYA",
  },
  {
    id: 4,
    title: "Visualisasi Jalan Salib",
    location: "Pusat Paroki",
    period: "Jumat Agung",
    description: "Tablo kisah sengsara Yesus Kristus oleh OMK.",
    image: "https://picsum.photos/seed/salib/800/600",
    category: "LITURGI",
  },
  {
    id: 5,
    title: "Pemberkatan Benih",
    location: "Stasi Harapan",
    period: "Musim Tanam",
    description: "Syukur atas hasil bumi dan pemberkatan bibit tani.",
    image: "https://picsum.photos/seed/seed/800/600",
    category: "SOSIAL",
  },
  {
    id: 6,
    title: "Api Unggun Paskah",
    location: "Seluruh Stasi",
    period: "Vigili Paskah",
    description: "Tradisi penyalaan lilin Paskah dari api suci.",
    image: "https://picsum.photos/seed/fire/800/600",
    category: "LITURGI",
  },
];
// Data 7-12 identik dengan 1-6, jadi cukup disalin dengan id baru.
const tradisi = [
  ...tradisiBase,
  ...tradisiBase.map((item) => ({ ...item, id: item.id + 6 })),
];

// Satu config per halaman; ContentPage membaca semuanya dari sini.
export const contentConfig = {
  orangKudus: {
    data: saints,
    searchKeys: ["name"],
    itemsPerPage: 6,
    hero: {
      images: heroImages.orangKudus,
      eyebrow: "Perjalanan iman",
      title: "Orang Kudus",
    },
    search: {
      label: "Cari orang kudus",
      placeholder: "Cari nama tokoh...",
    },
    layout: "list",
    detailType: "orang-kudus",
    itemLabel: "orang kudus",
    emptyText: "Tidak ada hasil ditemukan.",
    Card: SaintCard,
  },
  renungan: {
    data: renungan,
    searchKeys: ["title", "verse"],
    itemsPerPage: 5,
    hero: {
      images: heroImages.renungan,
      eyebrow: "Santapan rohani",
      title: "Renungan",
    },
    search: {
      label: "Cari renungan",
      placeholder: "Cari judul atau ayat Alkitab...",
    },
    layout: "list",
    detailType: "renungan",
    itemLabel: "renungan",
    emptyText: "Tidak ada hasil ditemukan.",
    Card: RenunganCard,
  },
  devosi: {
    data: devosi,
    searchKeys: ["title"],
    itemsPerPage: 6,
    hero: {
      images: heroImages.devosi,
      eyebrow: "Doa & persekutuan iman",
      title: "Devosi",
    },
    search: {
      label: "Cari devosi",
      placeholder: "Cari jadwal atau nama devosi...",
    },
    layout: "grid",
    detailType: "devosi",
    itemLabel: "devosi",
    emptyText: "Tidak ada devosi yang cocok dengan pencarian.",
    Card: DevosiCard,
  },
  tradisiGereja: {
    data: tradisi,
    searchKeys: ["title"],
    itemsPerPage: 6,
    hero: {
      images: heroImages.tradisiGereja,
      eyebrow: "Warisan Budaya & Iman",
      title: "Tradisi Gereja",
    },
    search: {
      label: "Cari tradisi gereja",
      placeholder: "Cari nama tradisi...",
    },
    layout: "grid",
    detailType: "tradisi",
    itemLabel: "tradisi gereja",
    emptyText: "Tidak ada tradisi yang cocok dengan pencarian.",
    Card: TradisiCard,
  },
};
