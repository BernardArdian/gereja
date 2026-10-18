import { useNavigate, useParams } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import KontakDanLokasi from "./kontak-dan-lokasi/kontak-dan-lokasi";
import Pengumuman from "./pengumuman/pengumuman";
import Thumbnail from "./thumbnail/thumbnail";
import SejarahGereja from "./sejarah/sejarahgereja";
import VisiMisi from "./visi-dan-misi/visimisi";
import Pedoman from "./pedoman/pedoman";

const dashboardTabs = [
  {
    label: "Thumbnail & galeri",
    slug: "thumbnail-galeri",
    legacySlug: "thumbnail-&-gallery",
    content: Thumbnail,
  },
  {
    label: "Sejarah gereja",
    slug: "sejarah-gereja",
    content: SejarahGereja,
  },
  {
    label: "Visi & misi",
    slug: "visi-misi",
    legacySlug: "visi-&-misi",
    content: VisiMisi,
  },
  { label: "Pedoman pastoral", slug: "pedoman-pastoral", content: Pedoman },
  { label: "Pengumuman", slug: "pengumuman", content: Pengumuman },
  {
    label: "Alamat, kontak & lokasi",
    slug: "alamat-kontak-lokasi",
    legacySlug: "alamat,-kontak-&-lokasi",
    content: KontakDanLokasi,
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { tab } = useParams();
  const activeTab =
    dashboardTabs.find(
      (item) => item.slug === tab || item.legacySlug === tab,
    ) ?? dashboardTabs[0];
  const ActiveContent = activeTab.content;

  return (
    <section className="min-h-full w-full bg-slate-50">
      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        <header>
          <p className="text-sm font-semibold text-amber-700">
            Pengelolaan situs paroki
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Dashboard Paroki
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Kelola informasi dan konten yang ditampilkan kepada umat.
          </p>
        </header>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <nav
            aria-label="Bagian dashboard"
            className="overflow-x-auto border-b border-slate-200 px-3 pt-3 sm:px-5"
          >
            <div className="flex min-w-max items-center gap-1">
              {dashboardTabs.map((item) => {
                const isActive = activeTab.slug === item.slug;

                return (
                  <button
                    key={item.slug}
                    type="button"
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => navigate(`/dashboard/${item.slug}`)}
                    className={`relative cursor-pointer whitespace-nowrap rounded-t-lg px-4 py-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-600 ${
                      isActive
                        ? "text-amber-900"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <Motion.span
                        layoutId="dashboard-active-tab"
                        aria-hidden="true"
                        className="absolute inset-0 rounded-t-lg bg-amber-50"
                        transition={{
                          type: "spring",
                          bounce: 0.15,
                          duration: 0.35,
                        }}
                      />
                    )}
                    {isActive && (
                      <Motion.span
                        layoutId="dashboard-active-indicator"
                        aria-hidden="true"
                        className="absolute inset-x-3 bottom-0 z-20 h-0.5 rounded-full bg-amber-700"
                        transition={{
                          type: "spring",
                          bounce: 0.15,
                          duration: 0.35,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          <section
            aria-label={activeTab.label}
            className="min-h-72 p-4 sm:p-6"
          >
            <ActiveContent />
          </section>
        </section>
      </main>
    </section>
  );
}
