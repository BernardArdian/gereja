import { useState, useEffect } from "react";

import InputUmat from "../../component/umat/input/inputUmat";
import TableUmat from "../../component/umat/table/tableUmat";
import StatistikUmat from "../../component/umat/statistik/statistikUmat";
import { umatServiceApi } from "../../api/umatApi/umatServiceApi";
import { motion as Motion } from "framer-motion";

export default function Umat() {
  const [activeTab, setActiveTab] = useState("input");
  const [selectedUmat, setSelectedUmat] = useState(null);
  const [umatList, setUmatList] = useState([]);
  const [loading, setLoading] = useState(true);

  //fetch data dari backend
  useEffect(() => {
    const fetchUmatData = async () => {
      setLoading(true);
      const [response, err] = await umatServiceApi.displayDataUmat();
      if (!err && response) {
        // Handle nested response format { success: true, data: [...] }
        const dataArray = response.data || response;
        const arrayData = Array.isArray(dataArray) ? dataArray : [];

        const transformedData = arrayData.map((item) => ({
          id: item._id,
          name: item.nama || item.personal?.nama || "Unnamed",
          noKk: item.noKk || "-",
          lingkungan:
            item.stasiKeluarga || item.personal?.stasiIndividu || "Tanpa Stasi",
          status: item.statusNikah || "belum menikah",
          rawData: item,
        }));
        setUmatList(transformedData);
      }
      setLoading(false);
    };
    fetchUmatData();
  }, []);

  const handleSave = (payload) => {
    // Refresh data setelah simpan
    const fetchUmatData = async () => {
      const [response, err] = await umatServiceApi.displayDataUmat();
      if (!err && response) {
        const dataArray = response.data || response;
        const arrayData = Array.isArray(dataArray) ? dataArray : [];

        const transformedData = arrayData.map((item) => ({
          id: item._id,
          name: item.nama || item.personal?.nama || "Unnamed",
          noKk: item.noKk || "-",
          lingkungan:
            item.stasiKeluarga || item.personal?.stasiIndividu || "Tanpa Stasi",
          status: item.statusNikah || "belum menikah",
          rawData: item,
        }));
        setUmatList(transformedData);
      }
    };
    fetchUmatData();
    setActiveTab("table");
  };

  const renderContent = {
    input: (
      <InputUmat
        isEdit={!!selectedUmat}
        initialData={selectedUmat}
        onSuccess={handleSave}
      />
    ),
    table: (
      <TableUmat
        umatList={umatList}
        onEdit={(item) => {
          setSelectedUmat(item);
          setActiveTab("input");
        }}
        onAdd={() => {
          setSelectedUmat(null);
          setActiveTab("input");
        }}
      />
    ),
    statistik: <StatistikUmat />,
  };

  return (
    <main className="max-w-5xl mx-auto pl-0.5 pr-0.5">
      <section className="bg-gray-500/30 p-2">
        <header className="mb-5">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-xl font-serif text-gray-900 tracking-tight">
                Data Umat Paroki St.Fransiskus Assisi.
              </h2>
              <p className="text-[10px] font-serif text-gray-900 uppercase tracking-widest">
                Input, Table & Statistik Umat
              </p>
            </div>
          </div>
        </header>

        <section className="w-full max-w-full mb-4 overflow-hidden bg-slate-500/40 rounded backdrop-blur-sm p-2">
          <nav className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar select-none relative">
            {" "}
            {Object.keys(renderContent).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
          cursor-pointer relative px-6 py-3 text-[13px] font-serif font-black uppercase tracking-widest rounded-xl transition-colors duration-300 
          whitespace-nowrap flex-shrink-0 z-10
          ${activeTab === tab ? "text-white" : "text-gray-800 hover:bg-blue-500/20 hover:text-white"}
        `}
              >
                {/* TEKS MENU */}
                <span className="relative z-20">{tab}</span>

                {/* ANIMASI BACKGROUND PUTIH (SLIDING EFFECT) */}
                {activeTab === tab && (
                  <Motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-blue-500/70 rounded-xl z-10"
                    transition={{
                      type: "spring",
                      bounce: 0.2,
                      duration: 0.6,
                    }}
                  />
                )}
              </button>
            ))}
          </nav>
        </section>

        {/*Render sesuai state */}
        <section className="min-h-screen">{renderContent[activeTab]}</section>
      </section>
    </main>
  );
}
