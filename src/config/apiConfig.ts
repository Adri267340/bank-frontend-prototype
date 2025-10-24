// src/config/apiConfig.ts

// ⚙️ Detectar entorno de ejecución y definir la URL base de la API
let apiBaseUrl: string;

// Si Jest o Node (no hay Vite)
if (typeof process !== "undefined" && process.env && process.env.VITE_API_URL) {
  apiBaseUrl = process.env.VITE_API_URL;
} else {
  // @ts-ignore: Vite sí tiene import.meta.env
  const viteEnv = (globalThis as any)?.import?.meta?.env;
  // Si estamos en Vite
  if (viteEnv && viteEnv.VITE_API_URL) {
    // @ts-ignore
    apiBaseUrl = viteEnv.VITE_API_URL;
  } else {
    // Fallback
    apiBaseUrl = "http://localhost:8080/api";
  }
}

export default apiBaseUrl;
