const http = require("http");
const fs = require("fs");
const path = require("path");
const { WebSocketServer } = require("ws");

const PORT = 3000;
const PUBLIC_DIR = path.resolve(__dirname, "dist");

const mimeTypes = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

// Serve static files with fallback to index.html
const server = http.createServer((req, res) => {
  let filePath = path.join(
    PUBLIC_DIR,
    req.url === "/" ? "index.html" : req.url,
  );
  const ext = path.extname(filePath);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      // fallback to index.html for SPAs
      if (req.url !== "/" && ext === "") {
        fs.readFile(
          path.join(PUBLIC_DIR, "index.html"),
          (errFallback, fallbackContent) => {
            if (errFallback) {
              res.writeHead(500);
              res.end("500 - Internal Server Error");
            } else {
              res.writeHead(200, { "Content-Type": "text/html" });
              res.end(fallbackContent, "utf-8");
            }
          },
        );
      } else {
        res.writeHead(404);
        res.end("404 - Not Found");
      }
    } else {
      const contentType = mimeTypes[ext] || "application/octet-stream";
      res.writeHead(200, { "Content-Type": contentType });

      // Inject reload script into HTML
      if (ext === ".html") {
        const injected = content.toString().replace(
          "</body>",
          `<script>
            const ws = new WebSocket('ws://' + location.host);
            ws.onmessage = (e) => { if (e.data === 'reload') location.reload(); };
          </script></body>`,
        );
        res.end(injected, "utf-8");
      } else {
        res.end(content, "utf-8");
      }
    }
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// WebSocket server for auto-reload
const wss = new WebSocketServer({ server });

fs.watch(PUBLIC_DIR, { recursive: true }, (eventType, filename) => {
  if (filename && /\.(html|js|css)$/.test(filename)) {
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send("reload");
      }
    });
  }
});
