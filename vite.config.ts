import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ["src"],
      insertTypesEntry: true,
      outDir: "dist",
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ReactDynamicList",
      fileName: (format) => `react-dynamic-list.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
