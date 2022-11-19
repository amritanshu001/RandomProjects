import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import svgrPlugin from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  plugins: [
    // reactRefresh(),
    react(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
  ],
});
