import { useState, useMemo } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import Pagination from "../../../component/common/Pagination";
import DetailBerita from "../../../component/detail/detailBerita";
import HeroHeader from "../../../component/common/hero-header/hero-header";

// Gaya wadah daftar dan pesan kosong untuk tiap jenis layout.
const layouts = {
  list: {
    wrapper:
      "mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm",
    empty: "py-10 text-center text-sm text-slate-500",
  },
  grid: {
    wrapper: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
    empty:
      "col-span-full rounded-xl border border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-500",
  },
};

// Halaman daftar generik: hero + pencarian, daftar, pagination, dan detail.
export default function ContentPages({ config }) {
  const {
    data,
    searchKeys,
    itemsPerPage = 6,
    hero,
    search,
    layout = "grid",
    detailType,
    itemLabel,
    emptyText = "Tidak ada hasil ditemukan.",
    Card,
  } = config;
  const style = layouts[layout];

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Item terpilih berasal dari URL (?id=), jadi bisa di-refresh dan dibagikan.
  const selectedId = searchParams.get("id");
  const selectedItem = selectedId
    ? data.find((item) => String(item.id) === selectedId)
    : null;

  const openItem = (item) => {
    // Tambah entri riwayat agar tombol Back menutup detail.
    setSearchParams({ id: String(item.id) }, { state: { fromList: true } });
  };

  const closeItem = () => {
    // Dibuka dari daftar: mundur satu langkah. Dibuka lewat link langsung: ganti URL.
    if (location.state?.fromList) {
      navigate(-1);
      return;
    }
    setSearchParams({}, { replace: true });
  };

  // Cocokkan kata pencarian dengan semua field yang didaftarkan di config.
  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return data.filter((item) =>
      searchKeys.some((key) =>
        String(item[key] ?? "")
          .toLowerCase()
          .includes(query),
      ),
    );
  }, [searchQuery, data, searchKeys]);

  // Ambil hanya potongan data untuk halaman aktif.
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page) => {
    // Pindah halaman lalu gulir kembali ke paling atas.
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      className="w-full min-w-0 pb-8 sm:pb-12"
      children={[
        /* HERO + SEARCH */
        <HeroHeader
          key="hero"
          images={hero.images}
          eyebrow={hero.eyebrow}
          title={hero.title}
          children={
            <div
              className="relative"
              children={[
                <Search
                  key="icon"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                  aria-hidden="true"
                />,
                <input
                  key="input"
                  type="search"
                  aria-label={search.label}
                  placeholder={search.placeholder}
                  value={searchQuery}
                  onChange={(e) => {
                    // Mulai kembali dari halaman pertama saat hasil berubah.
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full rounded-xl border border-white/70 bg-white/95 py-2.5 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-amber-300 focus:ring-2 focus:ring-amber-100"
                />,
              ]}
            />
          }
        />,

        /* DAFTAR */
        <main
          key="list"
          className="px-1 pb-8 sm:px-2"
          children={
            <section
              className={style.wrapper}
              children={[
                paginatedData.length === 0 && (
                  <p key="empty" className={style.empty} children={emptyText} />
                ),
                ...paginatedData.map((item) => (
                  <Card key={item.id} item={item} onOpen={openItem} />
                )),
              ]}
            />
          }
        />,

        /* PAGINATION */
        totalPages > 1 && (
          <Pagination
            key="pagination"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemCount={paginatedData.length}
            totalCount={filteredData.length}
            itemLabel={itemLabel}
            className="mt-4"
          />
        ),

        /* DETAIL (overlay, halaman tetap ter-mount) */
        selectedItem && (
          <DetailBerita
            key="detail"
            item={selectedItem}
            type={detailType}
            onBack={closeItem}
          />
        ),
      ]}
    />
  );
}
