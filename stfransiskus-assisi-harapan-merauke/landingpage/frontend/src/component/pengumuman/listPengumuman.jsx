import { MapPin, Calendar, Clock } from "lucide-react";

const bgColor = (status) => {
  if (status === "pernikahan") return "bg-rose-50 hover:bg-rose-100";
  if (status === "misa") return "bg-sky-50 hover:bg-sky-100";
  return "bg-white hover:bg-gray-50";
};

const badgeColor = (status) => {
  if (status === "pernikahan") return "border-red-500 text-red-600";
  return "border-gray-300 text-gray-800";
};

export default function ListPengumuman({ data, handler }) {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 divide-gray-100 divide-x gap-1 rounded overflow-hidden"
      children={data.map((item) => (
        <section
          key={item.id}
          onClick={() => handler.showDetail(item)}
          className={`border border-gray-100 rounded border border-stone-300 transition-colors cursor-pointer flex flex-col p-8 group ${bgColor(item.status)}`}
        >
          <span
            className={`self-start text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded border mb-6 ${badgeColor(item.status)}`}
            children={item.status}
          />

          <h3
            className="font-serif text-lg text-gray-900 leading-snug mb-3 group-hover:text-gray-500 transition-colors"
            children={
              item.status === "pernikahan" ? (
                <span className="italic">
                  {item.pernikahanData.namaPria} &{" "}
                  {item.pernikahanData.namaWanita}
                </span>
              ) : (
                `Pengumuman ${item.status}`
              )
            }
          />

          <p
            className="text-xs text-gray-900 leading-relaxed font-light line-clamp-3 flex-1"
            children={item.description}
          />

          <footer className="mt-6 pt-6 border-t border-gray-100 flex flex-col gap-2">
            <div
              className="flex items-center gap-2 text-[16px] font-bold text-gray-900 uppercase tracking-widest"
              children={[
                <MapPin size={14} />,
                <span children={[`Stasi ${item.stasi}`]} />,
              ]}
            />
            <div className="flex justify-between text-[10px] text-gray-900 uppercase tracking-widest">
              <section
                className="flex items-center gap-1.5 text-[16px] font-bold"
                children={[
                  <Calendar size={11} />,
                  item.status === "pernikahan"
                    ? item.pernikahanData.tanggalPernikahan
                    : item.tanggal,
                ]}
              />
              <section
                className="flex items-center gap-1.5 text-[16px] font-bold"
                children={[<Clock size={14} />, item.waktu, ` WITA`]}
              />
            </div>
          </footer>
        </section>
      ))}
    />
  );
}
