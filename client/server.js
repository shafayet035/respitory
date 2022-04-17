const express = require("express");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");

const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    if (dev) {
      server.use(
        "/api",
        createProxyMiddleware({
          target: "http://localhost:8000/v1",
          changeOrigin: true,
        })
      );
    }

    server.all("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, () => console.log("Custom Dev Server Running"));
  })
  .catch((err) => console.log(err));
