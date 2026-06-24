import { X } from "lucide-react";
import { useState } from "react";
import Admin_List from "./list/list_admin";
import Input_Admin from "./input/input_admin";

export default function AdminPages({ isOpen, handlers }) {
  const [activeTab, setActiveTab] = useState("table");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    nama: "",
    password: "",
  });

  const resetForm = () => {
    setFormData({
      nama: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDevault();
    setIsSubmitting(true);
  };

  const handleInputChange = (setter) => async (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const renderContent = {
    table: <Admin_List />,
    input: (
      <Input_Admin
        formData={formData}
        isSubmitting={isSubmitting}
        validations={() => {
          !!(formData?.nama && formData?.password);
        }}
        handlers={{
          reset: () => {
            resetForm();
          },
          input: handleInputChange(setFormData),
          submit: handleSubmit,
        }}
        onClose={handlers.cancel}
      />
    ),
  };

  if (!isOpen) return null;

  return (
    <section className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <main className="w-full max-w-2xl bg-white rounded-xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col h-fit max-h-[90vh]">
        {/* Header - Dibuat ringkas */}
        <header className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="font-bold text-base text-gray-800">
            Manajemen Administrator
          </h2>
          <button
            onClick={handlers.cancel}
            className="cursor-pointer p-2 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all text-red-600"
          >
            <X size={18} />
          </button>
        </header>

        <section className="p-6 overflow-y-auto custom-scrollbar">
          {/* Navigasi Tab */}
          <nav className="flex justify-center space-x-6 border-b border-gray-100 mb-6">
            {Object.keys(renderContent).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer pb-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
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
        </section>
      </main>
    </section>
  );
}
