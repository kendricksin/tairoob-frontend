import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
    base: "/",
    plugins: [react()],
    define: {
        'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
    },
    preview: {
        port: 8080,
        strictPort: true,
    },
    server: {
        port: 8080,
        strictPort: true,
        host: true,
        origin: "http://localhost:8080",
    },
});
