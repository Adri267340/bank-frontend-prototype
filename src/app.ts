// src/app.ts
import express from "express";
import dotenv from "dotenv";
import path from "path";
import cuentasRouter from "./routes/cuentas.routes";
import { errorHandler } from "./middlewares/errorHandler";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// 🧩 Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  res.locals.title = "Banco Adri"; // título por defecto para todas las vistas
  next();
});

// ⚙️ Motor de vistas (EJS)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 🚀 Rutas principales
app.use("/cuentas", cuentasRouter);

// 🌐 Página principal
app.get("/", (req, res) => {
  res.redirect("/cuentas");
});
// ✅ Ruta de prueba para verificar conexión con el backend
import axios from "axios";

app.get("/test-backend", async (req, res) => {
  try {
    const { data } = await axios.get(`${process.env.API_BASE_URL}/cuentas`);
    res.send(`✅ Backend responde correctamente: ${data.length} cuentas encontradas`);
  } catch (error: any) {
    console.error("❌ Error al conectar con backend:", error.message);
    res.status(500).send("❌ No se puede conectar con el backend.");
  }
});


// 🛠️ Middleware para manejo de errores
app.use(errorHandler);

// 🔥 Servidor en marcha
app.listen(port, () => {
  console.log("🏦 Servidor bancario funcionando correctamente 💸");
  console.log(`🌐 Servidor ejecutándose en http://localhost:${port}`);
});
