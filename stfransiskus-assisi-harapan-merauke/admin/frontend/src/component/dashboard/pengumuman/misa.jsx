import FormField from "../../formField";
import { User, Users2 } from "lucide-react";
export default function Misa({ data }) {
  return (
    <section className="space-y-4 p-5 bg-gray-50 border border-gray-200 rounded-2xl">
      <h4 className="font-bold text-gray-700 flex items-center gap-2 border-b border-gray-200 pb-2">
        <Users2 size={15} /> Petugas Misa {data.judul}
      </h4>
      <section className="grid grid-col-1 gap-4">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label={"Pemimpin ibadah"}
            children={
              <input
                className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                type="text"
                value={data.pemimpin}
                placeholder="pemimpin ibadah"
              />
            }
          />
          <FormField
            label={"Dirigen"}
            children={
              <input
                className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                type="text"
                value={data.dirigen}
                placeholder="dirigen"
              />
            }
          />
          <FormField
            label={"Organis"}
            children={
              <input
                className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                type="text"
                value={data.organis}
                placeholder="organis"
              />
            }
          />
          <FormField
            label={"Doa Umat"}
            children={
              <input
                className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                type="text"
                value={data.doa}
                placeholder="organis"
              />
            }
          />
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label={"Bacaan"}
            children={
              <input
                className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                type="text"
                value={data.bacaan}
                placeholder="bacaan"
              />
            }
          />
          <FormField
            label={"Misdinar"}
            children={
              <input
                className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                type="text"
                value={data.misdinar}
                placeholder="misdinar"
              />
            }
          />
        </section>
      </section>
    </section>
  );
}
