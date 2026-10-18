import { createElement, useState } from "react";
import { Globe, Map as MapIcon, MapPin, Phone, Save } from "lucide-react";

const fieldClass =
  "min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100";

function ContactField({ id, label, icon, ...inputProps }) {
  return (
    <label htmlFor={id} className="block space-y-2">
      <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        {createElement(icon, {
          size: 16,
          className: "text-amber-800",
          "aria-hidden": true,
        })}
        {label}
      </span>
      <input id={id} className={fieldClass} {...inputProps} />
    </label>
  );
}

function isGoogleMapsEmbedUrl(value) {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      (url.hostname === "google.com" ||
        url.hostname.endsWith(".google.com") ||
        url.hostname === "maps.google.com")
    );
  } catch {
    return false;
  }
}

export default function KontakDanLokasi() {
  const [contact, setContact] = useState({
    phone: "",
    address: "",
    mapUrl: "",
  });
  const [savedContact, setSavedContact] = useState(contact);
  const [statusMessage, setStatusMessage] = useState("");

  const isMapUrlValid = !contact.mapUrl || isGoogleMapsEmbedUrl(contact.mapUrl);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isMapUrlValid) {
      setStatusMessage("Gunakan URL sematan Google Maps yang valid.");
      return;
    }
    setSavedContact(contact);
    setStatusMessage("Perubahan kontak dan lokasi tersimpan pada sesi ini.");
  };

  const handleReset = () => {
    setContact(savedContact);
    setStatusMessage("");
  };

  return (
    <section className="mx-auto w-full max-w-5xl space-y-5">
      <header>
        <p className="text-sm font-semibold text-amber-800">Informasi paroki</p>
        <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Alamat, kontak & lokasi
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Perbarui cara umat menghubungi dan menemukan gereja.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
      >
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ContactField
            id="kontak"
            label="Nomor telepon / WhatsApp"
            icon={Phone}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Contoh: +62 812 3456 789"
            value={contact.phone}
            onChange={(event) => {
              setContact((previous) => ({
                ...previous,
                phone: event.target.value,
              }));
              setStatusMessage("");
            }}
          />
          <ContactField
            id="alamat"
            label="Alamat lengkap"
            icon={MapPin}
            name="address"
            autoComplete="street-address"
            placeholder="Nama jalan, kelurahan, kota"
            value={contact.address}
            onChange={(event) => {
              setContact((previous) => ({
                ...previous,
                address: event.target.value,
              }));
              setStatusMessage("");
            }}
          />
        </section>

        <section className="space-y-3">
          <label htmlFor="map" className="block space-y-2">
            <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Globe size={16} className="text-amber-800" aria-hidden="true" />
              URL sematan Google Maps
            </span>
            <input
              name="mapUrl"
              id="map"
              type="url"
              className={fieldClass}
              placeholder="https://www.google.com/maps/embed?..."
              value={contact.mapUrl}
              aria-invalid={!isMapUrlValid}
              aria-describedby="map-help map-error"
              onChange={(event) => {
                setContact((previous) => ({
                  ...previous,
                  mapUrl: event.target.value,
                }));
                setStatusMessage("");
              }}
            />
          </label>
          <p id="map-help" className="text-xs leading-5 text-slate-500">
            Dari Google Maps, pilih <strong>Bagikan → Sematkan peta</strong>,
            lalu salin URL yang ada pada atribut src.
          </p>
          {!isMapUrlValid && (
            <p id="map-error" role="alert" className="text-sm text-rose-700">
              URL harus berasal dari domain Google Maps yang aman (HTTPS).
            </p>
          )}

          <div className="flex min-h-56 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 sm:min-h-80">
            {contact.mapUrl && isMapUrlValid ? (
              <iframe
                title="Pratinjau lokasi Google Maps"
                src={contact.mapUrl}
                className="h-56 w-full border-0 sm:h-80"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="space-y-2 p-6 text-center">
                <MapIcon
                  size={30}
                  className="mx-auto text-slate-400"
                  aria-hidden="true"
                />
                <p className="text-sm font-semibold text-slate-700">
                  Pratinjau peta belum tersedia
                </p>
                <p className="mx-auto max-w-sm text-xs leading-5 text-slate-500">
                  Masukkan URL sematan Google Maps untuk melihat pratinjau di
                  sini.
                </p>
              </div>
            )}
          </div>
        </section>

        <footer className="flex flex-col-reverse gap-2 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p role="status" className="text-sm text-emerald-800">
            {statusMessage}
          </p>
          <div className="flex flex-col-reverse gap-2 sm:flex-row">
            <button
              type="button"
              onClick={handleReset}
              className="min-h-11 cursor-pointer rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
            >
              Batalkan perubahan
            </button>
            <button
              type="submit"
              className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-amber-700 px-5 text-sm font-semibold text-white transition hover:bg-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2"
            >
              <Save size={17} aria-hidden="true" />
              Simpan
            </button>
          </div>
        </footer>
      </form>
    </section>
  );
}
