const fs = require("fs");
const path = require("path");

// Example of copying a static HTML file to the dist folder
fs.copyFileSync(
  path.join(__dirname, "../frontend/index.html"),
  path.join(__dirname, "../dist/index.html")
);
