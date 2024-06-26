import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    base: '',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                useful: resolve(__dirname, "useful/index.html"),
            },
            /*
            output: {
                manualChunks: {
                    p5: ["p5"]
                }
            }
            */
        },
    },
});