import http from "http";
import { readFile, watchFile } from "fs";
import { extname } from "path";

let currentUserID = null;
const port = 8080;

const server = http.createServer((req, res) => {
  //api/userid
  if (req.url === "/api/userid") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ userID: currentUserID }));
    return;
  }

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

//get file ./userID.txt data
const userIDLoad = async () => {
  readFile("./userID.txt", "utf-8", (err, data) => {
    if (!err) currentUserID = data.trim();
    console.log(`抓取${currentUserID}資料中...`);
  });
};
userIDLoad();

//watch user.txt and make event
watchFile("./userID.txt", () => {
  userIDLoad();
  console.log("偵測 userID.txt 變更");
});

server.listen(port, () => {
  console.log(`連結: http://localhost:${port}`);
});
