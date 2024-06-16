import { defineConfig } from "vite";
export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    p5: ["p5"]
                }
            }
        }
    }
});