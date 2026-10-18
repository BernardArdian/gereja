import { useCallback, useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

import InputUmat from "../../component/umat/input/inputUmat";
import TableUmat from "../../component/umat/table/tableUmat";
import StatistikUmat from "../../component/umat/statistik/statistikUmat";
import { umatServiceApi } from "../../api/umatApi/umatServiceApi";

const tabs = [
  { id: "input", label: "Input data" },
  { id: "table", label: "Daftar umat" },
  { id: "statistik", label: "Statistik" },
];
const UMAT_PAGE_SIZE = 20;

function normalizeUmat(item) {
  const personal = item.single || item.personal || {};
  const family = item.keluarga || {};
  const statusNikah = (item.statusNikah || "belum menikah").toLowerCase();
  const normalizedStatus =
    statusNikah === "sudah menikah" ? "menikah" : statusNikah;
  const stasi =
    typeof item.stasiKeluarga === "string"
      ? item.stasiKeluarga
      : item.stasiKeluarga?.nama_stasi ||
        item.stasiKeluarga?.nama ||
        personal.stasiIndividu ||
        "Tanpa Stasi";

  return {
    id: item._id || item.id,
    name:
      item.nama ||
      personal.nama ||
      family.namaSuami ||
      family.namaIstri ||
      "Nama tidak tersedia",
    noKk: item.noKk || "-",
    stasiKeluarga: stasi,
    lingkungan: stasi,
    status: normalizedStatus,
    statusNikah: normalizedStatus,
    statusHidup:
      personal.statusHidup ||
      family.statusSuami ||
      family.statusIstri ||
      "hidup",
    baptis: personal.baptis || item.baptis || {},
    komuni: personal.komuni || item.komuni || {},
    krisma: personal.krisma || item.krisma || {},
    rawData: item,
  };
}

function parseUmatResponse(response, error) {
  if (error) {
    return {
      data: null,
      error:
        typeof error === "string"
          ? error
          : "Data umat gagal dimuat. Silakan coba lagi.",
    };
  }

  if (!response) {
    return { data: null, error: "Server tidak mengembalikan data umat." };
  }

  const data = response.data || response;
  if (!Array.isArray(data)) {
    return { data: null, error: "Format data umat dari server tidak valid." };
  }

  return { data: data.map(normalizeUmat), error: "" };
}

export default function Umat() {
  const navigate = useNavigate();
  const { tab } = useParams();
  const activeTab = tabs.some((item) => item.id === tab) ? tab : "input";
  const [selectedUmat, setSelectedUmat] = useState(null);
  const [umatList, setUmatList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [tablePage, setTablePage] = useState(1);
  const [highlightedUmatId, setHighlightedUmatId] = useState(null);

  const setActiveTab = (nextTab) => {
    navigate(`/umat/${nextTab}`);
  };

  const loadUmatData = useCallback(async () => {
    setLoading(true);
    const [response, error] = await umatServiceApi.displayDataUmat();
    const result = parseUmatResponse(response, error);
    if (result.error) {
      setLoadError(result.error);
    } else {
      setUmatList(result.data);
      setLoadError("");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    let isCurrent = true;

    umatServiceApi
      .displayDataUmat()
      .then(([response, error]) => {
        if (!isCurrent) return;
        const result = parseUmatResponse(response, error);
        if (result.error) setLoadError(result.error);
        else {
          setUmatList(result.data);
          setLoadError("");
        }
        setLoading(false);
      })
      .catch((error) => {
        if (!isCurrent) return;
        setLoadError(
          error instanceof Error
            ? error.message
            : "Data umat gagal dimuat. Silakan coba lagi.",
        );
        setLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  const handleSave = (savedUmat, isEdit) => {
    setLoadError("");
    if (!(savedUmat?._id || savedUmat?.id)) {
      setLoadError("Data berhasil dikirim, tetapi server tidak mengembalikan ID umat.");
      return false;
    }

    const normalized = normalizeUmat(savedUmat);
    const currentIndex = umatList.findIndex((item) => item.id === normalized.id);
    setUmatList((current) => {
      const exists = current.some((item) => item.id === normalized.id);
      return exists
        ? current.map((item) => (item.id === normalized.id ? normalized : item))
        : [normalized, ...current];
    });

    if (!isEdit) {
      setTablePage(1);
      return true;
    }

    const itemIndex = currentIndex >= 0 ? currentIndex : 0;
    setTablePage(Math.floor(itemIndex / UMAT_PAGE_SIZE) + 1);
    setHighlightedUmatId(normalized.id);
    setSelectedUmat(null);
    setActiveTab("table");
    return true;
  };

  const clearHighlightedUmat = useCallback(() => {
    setHighlightedUmatId(null);
  }, []);

  const handleDelete = async (id) => {
    setDeleteError("");
    const [, error] = await umatServiceApi.deleteDataUmat(id);
    if (error) {
      setDeleteError(
        typeof error === "string"
          ? error
          : "Data umat gagal dihapus. Silakan coba lagi.",
      );
      return false;
    }
    setUmatList((current) => current.filter((item) => item.id !== id));
    return true;
  };

  const renderContent = {
    input: (
      <InputUmat
        key={selectedUmat?.id || "new"}
        isEdit={!!selectedUmat}
        editId={selectedUmat?.id}
        initialData={selectedUmat?.rawData || selectedUmat}
        onSuccess={handleSave}
      />
    ),
    table: (
      <TableUmat
        umatList={umatList}
        loading={loading}
        deleteError={deleteError}
        currentPage={tablePage}
        onPageChange={setTablePage}
        highlightedUmatId={highlightedUmatId}
        onHighlightComplete={clearHighlightedUmat}
        onEdit={(item) => {
          setSelectedUmat(item);
          setActiveTab("input");
        }}
        onAdd={() => {
          setSelectedUmat(null);
          setActiveTab("input");
        }}
        onDelete={handleDelete}
      />
    ),
    statistik: <StatistikUmat umatList={umatList} />,
  };
  const selected = tabs.find((item) => item.id === activeTab);

  return (
    <section className="min-h-full w-full bg-slate-50">
      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        <header>
          <p className="text-sm font-semibold text-amber-700">
            Data komunitas
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Data umat paroki
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Kelola data keluarga, sakramen, dan statistik umat Paroki
            St. Fransiskus Assisi.
          </p>
        </header>

        {loadError && (
          <div
            role="alert"
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
          >
            <span>{loadError}</span>
            <button
              type="button"
              onClick={() => {
                setLoading(true);
                setLoadError("");
                loadUmatData();
              }}
              className="cursor-pointer font-semibold underline underline-offset-2"
            >
              Coba lagi
            </button>
          </div>
        )}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <nav
            aria-label="Bagian data umat"
            className="overflow-x-auto border-b border-slate-200 px-3 pt-3 sm:px-5"
          >
            <div className="flex min-w-max items-center gap-1">
              {tabs.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setActiveTab(item.id)}
                    className={`relative cursor-pointer whitespace-nowrap rounded-t-lg px-4 py-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-600 ${
                      isActive
                        ? "text-amber-900"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <Motion.span
                        layoutId="umat-active-tab"
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
                        layoutId="umat-active-indicator"
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
            aria-label={selected?.label}
            className="min-w-0 p-3 sm:p-5 lg:p-6"
          >
            {renderContent[activeTab]}
          </section>
        </section>
      </main>
    </section>
  );
}
