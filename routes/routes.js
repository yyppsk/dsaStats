const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");

const frontendPath = path.join(__dirname, "../frontend");
const logFilePath = path.join(__dirname, "../logs.json");

const setNoCacheHeaders = (res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
};

router.get("/healthchecker", (req, res) => {
  setNoCacheHeaders(res);
  //IMPORTANT CHECK!!
  res.status(200).send("<h1>All Systems Working !</h1>");
});

router.get("/about", (req, res) => {
  setNoCacheHeaders(res);
  res.status(200).sendFile(`${frontendPath}${req.path}.html`);
});

router.get("/contact", (req, res) => {
  setNoCacheHeaders(res);
  res.status(200).sendFile(`${frontendPath}${req.path}.html`);
});

router.get("/usage", (req, res) => {
  setNoCacheHeaders(res);
  res.status(200).sendFile(`${frontendPath}${req.path}.html`);
});

router.get("/", (req, res) => {
  setNoCacheHeaders(res);
  res.status(200).sendFile(`${frontendPath}${req.path}.html`);
});

router.get("/checklogs", (req, res) => {
  fs.readFile(logFilePath, (err, data) => {
    if (err) {
      return res.status(500).send("Error reading log file");
    }
    const logs = JSON.parse(data);
    res.json(logs);
  });
});

module.exports = router;
