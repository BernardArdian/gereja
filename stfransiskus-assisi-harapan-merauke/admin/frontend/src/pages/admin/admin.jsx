import { Church, Users, UserRound } from "lucide-react";
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
  const [editingStasi, setEditingStasi] = useState(null);
  const [editingDpp, setEditingDpp] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isStasiModalOpen) {
      if (
        !formData.stasi ||
        !formData.namaGereja ||
        !formData.desa ||
        !formData.alamat ||
        !formData.jumlahUmat
      ) {
        return;
      }

      const updatedStasi = {
        ...formData,
        jumlahUmat: Number(formData.jumlahUmat),
      };
      setStasiList((prev) =>
        editingStasi
          ? prev.map((item) => (item === editingStasi ? updatedStasi : item))
          : [...prev, updatedStasi],
      );
      setIsStasiModalOpen(false);
      resetForm();
      setEditingStasi(null);
      return;
    }

    if (
      !isDppModalOpen ||
      (!selectedDivisi && !editingDpp) ||
      !dppFormData.nama ||
      !dppFormData.jabatan ||
      !dppFormData.periode
    ) {
      return;
    }

    const updatedDpp = {
      ...dppFormData,
      divisi: selectedDivisi || editingDpp?.divisi || "",
    };
    setDppList((prev) =>
      editingDpp
        ? prev.map((item) => (item === editingDpp ? updatedDpp : item))
        : [...prev, updatedDpp],
    );
    setIsDppModaOpen(false);
    dppResetForm();
    setSelectedDivisi("");
    setEditingDpp(null);
  };

  const handleDivisiChange = (e) => {
    setSelectedDivisi(e.target.value);
  };

  const [formData, setFormData] = useState({
    stasi: "",
    jumlahUmat: "",
    namaGereja: "",
    desa: "",
    alamat: "",
  });

  const resetForm = () =>
    setFormData({
      stasi: "",
      jumlahUmat: "",
      namaGereja: "",
      desa: "",
      alamat: "",
    });

  const [dppFormData, setDppFormData] = useState({
    nama: "",
    jabatan: "",
    periode: "",
  });
  const dppResetForm = () =>
    setDppFormData({ nama: "", jabatan: "", periode: "" });

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

  const handleDeleteDpp = (data) =>
    setDppList((prev) => prev.filter((item) => item.nama !== data.nama));
  const handleDeleteStasi = (stasi) =>
    setStasiList((prev) => prev.filter((item) => item.stasi !== stasi.stasi));
  const handleInputChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };
  // const totalUmat = stasiList.reduce(
  //   (total, stasi) => total + Number(stasi.jumlahUmat || 0),
  //   0,
  // );

  return (
    <section
      className="min-h-full w-full bg-slate-50"
      children={
        <>
          <header
            className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur"
            children={
              <div
                className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6"
                children={
                  <>
                    <div
                      className="min-w-0"
                      children={
                        <>
                          <p
                            className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700"
                            children={"Panel Pengelolaan"}
                          />
                          <h1
                            className="truncate text-sm font-semibold text-slate-900 sm:text-base"
                            children={"Paroki St.Fransiskus Assisi"}
                          />
                        </>
                      }
                    />
                    <button
                      onClick={() => setIsAdminModaOpen(true)}
                      type="button"
                      aria-label="Buka pengaturan administrator"
                      className="flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white py-1.5 pl-1.5 pr-3 hover:border-amber-300 hover:bg-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                      children={
                        <>
                          <span
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-700 text-xs font-bold text-white"
                            children={"AD"}
                          />
                          <span
                            className="hidden text-sm font-bold text-slate-700 sm:block"
                            children={"Administrator"}
                          />
                        </>
                      }
                    />
                  </>
                }
              />
            }
          />

          <main
            className="mx-auto max-w-7xl space-y-7 px-4 py-6 sm:px-6 sm:py-8"
            children={
              <>
                <section
                  className="flex flex-col gap-2"
                  children={
                    <>
                      <p
                        className="text-sm font-semibold text-amber-700"
                        children={"Administrasi paroki"}
                      />
                      <div
                        children={
                          <>
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                              Kelola komunitas paroki
                            </h2>
                            <p
                              className="mt-2 max-w-2xl text-sm leading-6 text-slate-600"
                              children={
                                "Pantau data stasi dan anggota Dewan Pastoral Paroki dalam satu tempat."
                              }
                            />
                          </>
                        }
                      />
                    </>
                  }
                />

                <section
                  className="space-y-5"
                  aria-label="Data komunitas paroki"
                  children={
                    <>
                      <ListAnggotaDpp
                        data={dppList}
                        actionLabel="Tambah anggota"
                        handlers={{
                          edit: (data) => {
                            setEditingDpp(data);
                            setDppFormData({
                              nama: data.nama,
                              jabatan: data.jabatan,
                              periode: data.periode,
                            });
                            setSelectedDivisi(data.divisi || "");
                            setIsDppModaOpen(true);
                          },
                          delete: handleDeleteDpp,
                          onInputClick: () => setIsDppModaOpen(true),
                        }}
                      />
                      <ListStatidanParoki
                        data={stasiList}
                        actionLabel="Tambah Stasi"
                        handlers={{
                          edit: (stasi) => {
                            setEditingStasi(stasi);
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
                          onInputClick: () => setIsStasiModalOpen(true),
                        }}
                      />
                    </>
                  }
                />
              </>
            }
          />

          <AdminPages
            isOpen={isAdminModalOpen}
            handlers={{
              open: isAdminModalOpen,
              cancel: () => setIsAdminModaOpen(false),
            }}
          />

          <InputStasi
            isOpen={isStasiModalOpen}
            isSubmitting={false}
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
                setEditingStasi(null);
              },
              reset: () => {
                resetForm();
                setEditingStasi(null);
              },
              submit: handleSubmit,
              input: handleInputChange(setFormData),
            }}
          />

          <InputDpp
            isOpen={isDppModalOpen}
            isSubmitting={false}
            selectedDivisi={selectedDivisi}
            formData={dppFormData}
            validations={() =>
              !!(
                (selectedDivisi || editingDpp) &&
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
                setEditingDpp(null);
              },
              reset: () => {
                dppResetForm();
                setSelectedDivisi("");
                setEditingDpp(null);
              },
              divisi: handleDivisiChange,
              submit: handleSubmit,
              input: handleInputChange(setDppFormData),
            }}
          />
        </>
      }
    />
  );
}
