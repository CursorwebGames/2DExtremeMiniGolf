import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    base: "",
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                levelEditor: resolve(__dirname, "level-editor/index.html"),
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