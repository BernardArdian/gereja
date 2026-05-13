import { Bell, Church, User, X } from "lucide-react";

import { useState } from "react";

import AdminPages from "../../component/admins/admin_page";
import InputStasi from "../../component/admins/input/input_stasi";
import InputDpp from "../../component/admins/input/input_dpp";
import StasiDanDppCard from "../../component/admins/card/stasiDppCard";
import ListStatiParoki from "../../component/admins/list/listStasiModal";
import ListAnggotaDpp from "../../component/admins/list/listAnggotaDpp";

export default function Admin() {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <section className="w-full min-h-screen pl-0.5 pr-0.5">
      <main className="max-w-6xl bg-slate-700/40 shadow-sm mx-auto space-y-8 p-2">
        {/* Header Section */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <section>
            <header className="flex items-center gap-4">
              <div>
                <h2 className="text-xl font-serif text-gray-900 tracking-tight">
                  Admin Paroki St.Fransiskus Assisi.
                </h2>
                <p className="text-[10px] font-serif text-gray-900 uppercase tracking-widest">
                  Arsip Admin,Stasi & Dewan Pastoral
                </p>
              </div>
            </header>
          </section>
          <section className="flex items-center gap-3">
            <button className="cursor-pointer p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-all">
              <Bell size={20} color="black" />
            </button>
            <div className="h-10 w-[1px] bg-gray-900 mx-2 hidden md:block"></div>
            <button
              onClick={() => setActiveModal("admin")}
              className="cursor-pointer flex items-center gap-3 bg-white border border-gray-200 p-1.5 pr-4 rounded-2xl"
            >
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                AD
              </div>
              <span className="text-sm font-bold text-gray-700">
                Administrator
              </span>
            </button>
          </section>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StasiDanDppCard
            title="Anggota Dpp"
            value="12"
            icon={<User size={20} />}
            color="bg-green-500"
            onInputClick={() => setActiveModal("dpp")}
          />
          <StasiDanDppCard
            title="Total Stasi"
            value="08"
            icon={<Church size={20} />}
            color="bg-amber-500"
            onInputClick={() => setActiveModal("stasi")}
          />
        </section>

        {/* Main Content Area */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* section anggota dewan paroki */}
          <ListAnggotaDpp />

          {/* stasi secion */}
          <ListStatiParoki />
        </main>
      </main>
      {activeModal === "admin" && (
        <AdminPages onClose={() => setActiveModal(null)} />
      )}

      {activeModal === "stasi" && (
        <InputStasi onClose={() => setActiveModal(null)} />
      )}

      {activeModal === "dpp" && (
        <InputDpp onClose={() => setActiveModal(null)} />
      )}
    </section>
  );
}
