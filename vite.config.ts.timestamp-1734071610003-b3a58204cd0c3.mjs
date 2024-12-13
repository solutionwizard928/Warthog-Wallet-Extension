// vite.config.ts
import { defineConfig } from "file:///E:/Work/BlockChain/Warthog/wallet-extension/Me/warthog-extension/node_modules/vite/dist/node/index.js";
import react from "file:///E:/Work/BlockChain/Warthog/wallet-extension/Me/warthog-extension/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { viteStaticCopy } from "file:///E:/Work/BlockChain/Warthog/wallet-extension/Me/warthog-extension/node_modules/vite-plugin-static-copy/dist/index.js";
import { nodePolyfills } from "file:///E:/Work/BlockChain/Warthog/wallet-extension/Me/warthog-extension/node_modules/vite-plugin-node-polyfills/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "public/manifest.json",
          dest: "."
        }
      ]
    }),
    nodePolyfills({
      include: ["buffer"],
      globals: {
        Buffer: true,
        process: true,
        global: true
      }
    })
  ],
  build: {
    outDir: "build",
    rollupOptions: {
      input: {
        main: "./index.html"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxXb3JrXFxcXEJsb2NrQ2hhaW5cXFxcV2FydGhvZ1xcXFx3YWxsZXQtZXh0ZW5zaW9uXFxcXE1lXFxcXHdhcnRob2ctZXh0ZW5zaW9uXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxXb3JrXFxcXEJsb2NrQ2hhaW5cXFxcV2FydGhvZ1xcXFx3YWxsZXQtZXh0ZW5zaW9uXFxcXE1lXFxcXHdhcnRob2ctZXh0ZW5zaW9uXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9Xb3JrL0Jsb2NrQ2hhaW4vV2FydGhvZy93YWxsZXQtZXh0ZW5zaW9uL01lL3dhcnRob2ctZXh0ZW5zaW9uL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5pbXBvcnQgeyB2aXRlU3RhdGljQ29weSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1zdGF0aWMtY29weVwiO1xuaW1wb3J0IHsgbm9kZVBvbHlmaWxscyB9IGZyb20gXCJ2aXRlLXBsdWdpbi1ub2RlLXBvbHlmaWxsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICB2aXRlU3RhdGljQ29weSh7XG4gICAgICB0YXJnZXRzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBzcmM6IFwicHVibGljL21hbmlmZXN0Lmpzb25cIixcbiAgICAgICAgICBkZXN0OiBcIi5cIixcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSksXG4gICAgbm9kZVBvbHlmaWxscyh7XG4gICAgICBpbmNsdWRlOiBbXCJidWZmZXJcIl0sXG4gICAgICBnbG9iYWxzOiB7XG4gICAgICAgIEJ1ZmZlcjogdHJ1ZSxcbiAgICAgICAgcHJvY2VzczogdHJ1ZSxcbiAgICAgICAgZ2xvYmFsOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6IFwiYnVpbGRcIixcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBpbnB1dDoge1xuICAgICAgICBtYWluOiBcIi4vaW5kZXguaHRtbFwiLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdZLFNBQVMsb0JBQW9CO0FBQzdaLE9BQU8sV0FBVztBQUNsQixTQUFTLHNCQUFzQjtBQUMvQixTQUFTLHFCQUFxQjtBQUU5QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixlQUFlO0FBQUEsTUFDYixTQUFTO0FBQUEsUUFDUDtBQUFBLFVBQ0UsS0FBSztBQUFBLFVBQ0wsTUFBTTtBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxjQUFjO0FBQUEsTUFDWixTQUFTLENBQUMsUUFBUTtBQUFBLE1BQ2xCLFNBQVM7QUFBQSxRQUNQLFFBQVE7QUFBQSxRQUNSLFNBQVM7QUFBQSxRQUNULFFBQVE7QUFBQSxNQUNWO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0wsTUFBTTtBQUFBLE1BQ1I7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
