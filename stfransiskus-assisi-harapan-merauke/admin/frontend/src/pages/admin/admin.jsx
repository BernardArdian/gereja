import { Bell, Church, Edit, User, X } from "lucide-react";

import { useState } from "react";

import AdminPages from "../../component/admins/admin_page";
import InputStasi from "../../component/admins/input/input_stasi";
import InputDpp from "../../component/admins/input/input_dpp";
import StasiDanDppCard from "../../component/admins/card/stasiDppCard";
import ListStatidanParoki from "../../component/admins/list/listStasiModal";
import ListAnggotaDpp from "../../component/admins/list/listAnggotaDpp";

export default function Admin() {
  const [isStasiModalOpen, setIsStasiModalOpen] = useState(false);
  const [isDppModalOpen, setIsDppModaOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModaOpen] = useState(false);

  const [selectedDivisi, setSelectedDivisi] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  //const [currentPage, setCurrentPage] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDevault();
    setIsSubmitting(true);
  };

  const handleDivisiChange = (e) => {
    setSelectedDivisi(e.target.value);
    // setCurrentPage(1);
  };

  // stasi
  const [formData, setFormData] = useState({
    stasi: "",
    jumlahUmat: "",
    namaGereja: "",
    desa: "",
    alamat: "",
  });

  const resetForm = () => {
    setFormData({
      stasi: "",
      jumlahUmat: "",
      namaGereja: "",
      desa: "",
      alamat: "",
    });
  };

  // dpp
  const [dppFormData, setDppFormData] = useState({
    nama: "",
    jabatan: "",
    periode: "",
  });

  const dppResetForm = () => {
    setDppFormData({
      nama: "",
      jabatan: "",
      periode: "",
    });
  };

  const [dppList, setDppList] = useState([
    { nama: "mawar", jabatan: "Anggota", periode: "2022 - 2025" },
    { nama: "irwan", jabatan: "Anggota", periode: "2022 - 2025" },
    { nama: "linda", jabatan: "Anggota", periode: "2022 - 2025" },
  ]);

  const [stasiList, setStasiList] = useState([
    {
      stasi: "St. Yohanes",
      namaGereja: "st.Yohanes",
      alamat: "Jl. Merdeka No. 10",
      desa: "kurik",
      jumlahUmat: 150,
    },
    {
      stasi: "Stasi St. Maria",
      namaGereja: "st.Maria",
      alamat: "Jl. Mawar No. 5",
      desa: "harapan",
      jumlahUmat: 85,
    },
    {
      stasi: "Stasi St. Petrus",
      namaGereja: "st.Petrus",
      alamat: "Jl. Melati No. 22",
      desa: "candra jaya",
      jumlahUmat: 120,
    },
  ]);

  const handleDeleteDpp = (data) => {
    setDppList((prev) => prev.filter((item) => item.nama !== data.nama));
  };

  const handleDeleteStasi = (stasi) => {
    setStasiList((prev) => prev.filter((item) => item.nama !== stasi.nama));
  };

  const handleInputChange = (setter) => async (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="w-full min-h-screen pl-0.5 pr-0.5">
      {/* Header Section */}
      <header className="flex flex-col h-16 bg-slate-700/40 items-center p-2 top-0 z-30 border-b border-white md:flex-row  justify-between gap-4">
        <section>
          <section className="flex items-center gap-4">
            <div>
              <h2
                className="text-xl font-serif text-gray-900 tracking-tight"
                children={"Admin Paroki St.Fransiskus Assisi."}
              />
              <p
                className="text-[10px] font-serif text-gray-900 uppercase tracking-widest"
                children={"Admin, Stasi & Anggota Dewan Pastoral"}
              />
            </div>
          </section>
        </section>
        <section className="flex items-center justify-center gap-3">
          <button className="cursor-pointer p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-all">
            <Bell size={20} color="black" />
          </button>
          <div className="h-10 w-[1px] bg-white mx-2 hidden md:block" />
          <button
            onClick={() => setIsAdminModaOpen(true)}
            className="cursor-pointer flex items-center gap-3 bg-white border border-gray-200 p-1.5 pr-4 rounded-2xl"
          >
            <p className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              AD
            </p>
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
          <ListAnggotaDpp
            data={dppList}
            handlers={{
              edit: (data) => {
                setDppFormData({
                  nama: data.nama,
                  jabatan: data.jabatan,
                  periode: data.periode,
                });
                setSelectedDivisi(data.jabatan);
                setIsDppModaOpen(true);
              },
              delete: handleDeleteDpp,
            }}
          />

          {/* stasi secion */}
          <ListStatidanParoki
            data={stasiList}
            handlers={{
              edit: (stasi) => {
                setFormData({
                  stasi: stasi.stasi,
                  jumlahUmat: stasi.jumlahUmat,
                  namaGereja: stasi.namaGereja,
                  desa: stasi.desa || "",
                  alamat: stasi.alamat,
                });
                setIsStasiModalOpen(true);
              },
              delete: handleDeleteStasi,
            }}
          />
        </section>
      </main>

      <AdminPages
        isOpen={isAdminModalOpen}
        handlers={{
          open: isAdminModalOpen,
          cancel: () => {
            setIsAdminModaOpen(false);
          },
        }}
      />

      <InputStasi
        isOpen={isStasiModalOpen}
        isSubmitting={isSubmitting}
        formdata={formData}
        validations={() =>
          !!(
            formData?.stasi &&
            formData?.namaGereja &&
            formData?.desa &&
            formData?.alamat &&
            formData?.jumlahUmat
          )
        }
        handlers={{
          cancel: () => {
            setIsStasiModalOpen(false);
            resetForm();
          },
          reset: () => {
            resetForm();
          },
          submit: handleSubmit,
          input: handleInputChange(setFormData),
        }}
      />

      <InputDpp
        isOpen={isDppModalOpen}
        isSubmitting={isSubmitting}
        selectedDivisi={selectedDivisi}
        formData={dppFormData}
        validations={() =>
          !!(
            selectedDivisi &&
            dppFormData?.nama &&
            dppFormData?.jabatan &&
            dppFormData?.periode
          )
        }
        handlers={{
          cancel: () => {
            setIsDppModaOpen(false);
            dppResetForm();
            setSelectedDivisi("");
          },
          reset: () => {
            dppResetForm();
            setSelectedDivisi("");
          },
          divisi: handleDivisiChange,
          submit: handleSubmit,
          input: handleInputChange(setDppFormData),
        }}
      />
    </section>
  );
}
