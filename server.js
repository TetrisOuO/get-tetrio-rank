import http from "http";
import { readFile } from "fs";
import { extname } from "path";

const server = http.createServer((req, res) => {
  let filePath = req.url === "/" ? "./index.html" : `.${req.url}`;
  let ext = extname(filePath);
  let contentType = "text/html";

  const mimeTypes = {
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
  };

  if (mimeTypes[ext]) contentType = mimeTypes[ext];

  readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("404 Not Found");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

server.listen(8080, () =>
  console.log("Server running at http://localhost:8080")
);
