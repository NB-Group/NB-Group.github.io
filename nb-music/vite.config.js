import { defineConfig } from 'vite';

function iframeSrcPlugin() {
  return {
    name: 'iframe-src-plugin',
    transformIndexHtml(html) {
      return html.replace(
        /<iframe\s+[^>]*src="([^"]+)"[^>]*><\/iframe>/g,
        (match, src) => {
          // 在这里处理 iframe 的 src 属性，例如将其替换为 Vite 的资源路径
          const newSrc = `.${src}`;
          return match.replace(src, newSrc);
        }
      );
    },
  };
}

export default defineConfig({
  plugins: [iframeSrcPlugin()],
  base: "./"
});