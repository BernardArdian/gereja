import { Bell, Church, User, X } from "lucide-react";

import { useState } from "react";

import AdminPages from "../../component/admins/admin_page";
import InputStasi from "../../component/admins/input/input_stasi";
import InputDpp from "../../component/admins/input/input_dpp";
import StasiDanDppCard from "../../component/admins/card/stasiDppCard";
import ListStatiParoki from "../../component/admins/list/listStasiModal";
import ListAnggotaDpp from "../../component/admins/list/listAnggotaDpp";

export default function Admin() {
  const [isStasiModalOpen, setIsStasiModalOpen] = useState(false);
  const [isDppModalOpen, setIsDppModaOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModaOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const handleColse = () => {
  //   setIsStasiModalOpen(false);
  //   setIsDppModaOpen(false);
  //   setIsAdminModaOpen(false);
  // };

  const handleSubmit = async (e) => {
    e.preventDevault();
    setIsSubmitting(true);
  };

  const [formData, setFormData] = useState({
    stasi: "",
    totalumat: "",
    gereja: "",
    desa: "",
    alamat: "",
  });

  const resetForm = () => {
    setFormData({
      stasi: "",
      totalumat: "",
      gereja: "",
      desa: "",
      alamat: "",
    });
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="w-full min-h-screen pl-0.5 pr-0.5">
      {/* Header Section */}
      <header className="flex flex-col h-16 bg-slate-700/40 items-center p-2 top-0 z-30 border-b border-white md:flex-row  justify-between gap-4">
        <section>
          <section className="flex items-center gap-4">
            <div>
              <h2 className="text-xl font-serif text-gray-900 tracking-tight">
                Admin Paroki St.Fransiskus Assisi.
              </h2>
              <p className="text-[10px] font-serif text-gray-900 uppercase tracking-widest">
                Arsip Admin,Stasi & Dewan Pastoral
              </p>
            </div>
          </section>
        </section>
        <section className="flex items-center justify-center gap-3">
          <button className="cursor-pointer p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-all">
            <Bell size={20} color="black" />
          </button>
          <div className="h-10 w-[1px] bg-white mx-2 hidden md:block"></div>
          <button
            onClick={() => setIsAdminModaOpen(true)}
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
      </header>

      <main className="max-w-6xl bg-slate-700/40 mx-auto space-y-5 p-2">
        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StasiDanDppCard
            title="Anggota Dpp"
            value="12"
            icon={<User size={20} />}
            color="bg-green-500"
            onInputClick={() => setIsDppModaOpen(true)}
          />
          <StasiDanDppCard
            title="Total Stasi"
            value="08"
            icon={<Church size={20} />}
            color="bg-amber-500"
            onInputClick={() => {
              setIsStasiModalOpen(true);
            }}
          />
        </section>

        {/* Main Content Area */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* section anggota dewan paroki */}
          <ListAnggotaDpp />

          {/* stasi secion */}
          <ListStatiParoki />
        </section>
      </main>

      <AdminPages
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModaOpen(false)}
      />

      <InputStasi
        isOpen={isStasiModalOpen}
        isSubmitting={isSubmitting}
        formdata={formData}
        validations={() =>
          !!(
            formData?.stasi &&
            formData?.totalumat &&
            formData?.desa &&
            formData?.gereja &&
            formData?.alamat
          )
        }
        handlers={{
          cancel: () => {
            setIsStasiModalOpen(false);
            resetForm();
          },
          submit: handleSubmit,
          input: handleInputChange,
        }}
      />

      <InputDpp
        isOpen={isDppModalOpen}
        onClose={() => setIsDppModaOpen(false)}
      />
    </section>
  );
}
