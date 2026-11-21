const express = require("express");
const connectDB = require("./config/config");
const cors = require("cors");
const securityHeaders = require("./security/httpHeaders");
const { apiLimiter } = require("./security/rateLimits");
const { inputSecurityMiddleware } = require("./security/inputSecurity");

const eventRoute = require("./route/eventroute");
const adminRoute = require("./route/adminroute");
const memberRoute = require("./route/memberroute");
const anouncementRoute = require("./route/anouncementroute");
const newsRoute = require("./route/newsroute");
const administratifRoute = require("./route/administrativeroute");

// Buat aplikasi Express dan tetapkan port serta origin frontend yang diizinkan.
const app = express();
const port = 5000;
const trustProxyHops = Number(process.env.TRUST_PROXY_HOPS || 0);
if (!Number.isInteger(trustProxyHops) || trustProxyHops < 0) {
  throw new Error("TRUST_PROXY_HOPS harus bilangan bulat nol atau lebih.");
}
if (trustProxyHops > 0) app.set("trust proxy", trustProxyHops);
const allowedOrigins = new Set([
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);

// Middleware menyiapkan CORS, parsing body, dan pemeriksaan keamanan request.
app.use(securityHeaders);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.has(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} tidak diizinkan oleh CORS`));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
// Batasi semua endpoint API sebelum body diproses atau route dijalankan.
app.use("/api", apiLimiter);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));
app.use(inputSecurityMiddleware);

// Mulai koneksi database sebelum endpoint digunakan oleh klien.
connectDB();

// Daftarkan kelompok endpoint API pada prefiks masing-masing.
app.use("/api/admin", adminRoute);

//pengumuman dan berita terkini
app.use("/api/events", eventRoute);

//route for input member
app.use("/api/inputmember", memberRoute);

//route for administratif
app.use("/api/administratif", administratifRoute);

//route dasboard
app.use("/api/anouncement", anouncementRoute);

//route news
app.use("/api/news", newsRoute);

app.get("/", (req, res) => {
  res.send(`server is running on port ${port}, mongoDB is connected`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
