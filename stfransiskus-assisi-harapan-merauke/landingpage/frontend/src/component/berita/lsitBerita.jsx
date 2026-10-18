import { Calendar, User, ExternalLink, Newspaper } from "lucide-react";

export default function ListBerita({ data, handler }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-24 text-gray-300">
        <Newspaper size={36} className="mx-auto mb-4" />
        <p className="text-xs uppercase tracking-widest">
          Berita tidak ditemukan
        </p>
      </div>
    );
  }

  return (
    <section
      className="flex flex-col gap-1"
      children={data.map((item) => (
        <section
          key={item.id}
          onClick={() => handler.showDetail(item)}
          className="flex flex-col md:flex-row border border-stone-300 gap-6 py-8 px-6 border border-gray-100 group cursor-pointer bg-gray-50 hover:bg-slate-200/60 rounded transition-colors"
        >
          {/* IMAGE */}
          <section
            className="md:w-48 h-32 md:h-auto flex-shrink-0 overflow-hidden rounded"
            children={[
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />,
            ]}
          />

          {/* CONTENT */}
          <section className="flex-1 flex flex-col justify-between">
            <div>
              <section
                className="flex items-center gap-4 text-[0.8em] text-gray-800 uppercase tracking-widest mb-3"
                children={[
                  <span
                    className="flex items-center gap-1"
                    children={[<Calendar size={11} />, item.date]}
                  />,
                  <span
                    className="flex items-center gap-1"
                    children={[<User size={11} />, item.author]}
                  />,
                ]}
              />
              <h3
                className="font-serif text-xl text-gray-900 leading-snug"
                children={item.title}
              />
              {item.excerpt && (
                <p
                  className="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-2"
                  children={item.excerpt}
                />
              )}
            </div>
            <div
              className="mt-4"
              children={
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handler.showDetail(item);
                  }}
                  className="text-[10px] text-gray-800 uppercase tracking-widest flex items-center gap-1 hover:text-gray-700 transition-colors"
                  children={["Baca ", <ExternalLink size={11} />]}
                />
              }
            />
          </section>
        </section>
      ))}
    />
  );
}
