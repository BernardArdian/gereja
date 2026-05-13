import { X } from "lucide-react";
import { useState } from "react";
import Admin_List from "./list/list_admin";
import Input_Admin from "./input/input_admin";

export default function AdminPages({ onClose }) {
  const [activeTab, setActiveTab] = useState("table");

  const renderContent = {
    table: <Admin_List />,
    input: <Input_Admin />,
  };

  return (
    // 1. Overlay tetap fixed
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      {/* 2. Gunakan max-h-[90vh] agar modal tidak melebihi tinggi layar
             Gunakan overflow-hidden agar rounded corners tidak terpotong */}
      <main className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col h-fit max-h-[90vh]">
        {/* Header - Dibuat ringkas */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="font-bold text-base text-gray-800">
            Manajemen Administrator
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* 3. Kontainer Isi dengan Overflow Auto 
               Ini kunci agar modal tidak terlalu tinggi jika kontennya panjang */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {/* Navigasi Tab */}
          <nav className="flex justify-center space-x-6 border-b border-gray-100 mb-6">
            {Object.keys(renderContent).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                  activeTab === tab
                    ? "border-b-2 border-indigo-600 text-indigo-600"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab === "table" ? "Admin List" : "Register Admin"}
              </button>
            ))}
          </nav>

          {/* Render Content */}
          <section>{renderContent[activeTab]}</section>
        </div>
      </main>
    </div>
  );
}
